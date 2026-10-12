// WoW Forever: Admin-Kontoanlage; nur forever1; keine Secrets im Client.
const base=Deno.env.get("SUPABASE_URL")||"";
const secret=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||"";
const origin="https://lekasus-creator.github.io";
const cors={"Access-Control-Allow-Origin":origin,"Access-Control-Allow-Headers":"authorization, apikey, content-type, x-client-info","Access-Control-Allow-Methods":"POST, OPTIONS","Vary":"Origin"};
const reply=(data,status=200)=>new Response(status===204?null:JSON.stringify(data),{status,headers:{...cors,"Content-Type":"application/json","Cache-Control":"no-store"}});
async function asService(path,method="GET",data){
 const res=await fetch(base+path,{method,headers:{apikey:secret,Authorization:"Bearer "+secret,"Content-Type":"application/json"},body:data===undefined?undefined:JSON.stringify(data),signal:AbortSignal.timeout(15000)});
 let parsed=null;try{parsed=await res.json()}catch{}
 return {ok:res.ok,status:res.status,data:parsed};
}
Deno.serve(async request=>{
 if(request.method==="OPTIONS")return reply({},204);
 if(request.method!=="POST")return reply({error:"Methode nicht erlaubt"},405);
 if(!base||!secret)return reply({error:"Serverkonfiguration fehlt"},503);
 const authorization=request.headers.get("Authorization")||"";
 if(!/^Bearer [^.]+\.[^.]+\.[^.]+$/.test(authorization)||authorization.length>10000)return reply({error:"Anmeldung erforderlich"},401);
 let input;try{input=await request.json()}catch{return reply({error:"Ungültige Eingabe"},400)}
 const username=String(input?.username||"").trim().toLowerCase(),password=String(input?.password||"");
 if(!/^[a-z][a-z0-9_-]{2,31}$/.test(username)||password.length<12||password.length>200)return reply({error:"Benutzername oder Passwort ungültig"},400);
 try{
  const identity=await fetch(base+"/auth/v1/user",{headers:{apikey:secret,Authorization:authorization},signal:AbortSignal.timeout(15000)});
  if(!identity.ok)return reply({error:"Anmeldung abgelaufen"},401);
  const user=await identity.json();
  if(!/^[0-9a-f-]{36}$/i.test(String(user?.id||"")))return reply({error:"Anmeldung ungültig"},401);
  const check=await asService("/rest/v1/forever_members?select=slot&slot=eq.1&user_id=eq."+encodeURIComponent(user.id)+"&limit=1");
  if(!check.ok||!Array.isArray(check.data)||check.data.length!==1)return reply({error:"Nur forever1 darf Benutzer anlegen"},403);
  const maintenance=await asService("/rest/v1/forever_site_maintenance?select=enabled,expires_at&id=eq.1");
  if(maintenance.ok&&maintenance.data?.[0]?.enabled&&Date.parse(maintenance.data[0].expires_at)>Date.now())return reply({error:"Wartung aktiv"},503);
  const created=await asService("/auth/v1/admin/users","POST",{email:username+"@users.example.com",password,email_confirm:true});
  if(!created.ok||!created.data?.id)return reply({error:created.status===422?"Benutzername vergeben":"Benutzer konnte nicht erstellt werden"},created.status===422?409:503);
  const registration=await asService("/rest/v1/rpc/forever_admin_register","POST",{p_user_id:created.data.id,p_username:username,p_password:password});
  if(!registration.ok){
    const rollback=await asService("/auth/v1/admin/users/"+created.data.id,"DELETE");
    if(!rollback.ok)console.error("Rollback eines neu angelegten Auth-Accounts fehlgeschlagen");
    return reply({error:"Profil wurde nicht angelegt. Bitte später erneut versuchen."},503);
  }
  return reply({ok:true,username,slot:registration.data});
 }catch(error){console.error("Admin-Funktion fehlgeschlagen:",String(error));return reply({error:"Serverfehler bei der Benutzeranlage"},503)}
});