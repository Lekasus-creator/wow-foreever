// Supabase Edge Function: geschützte Anmeldung aller registrierten Horde-Mitglieder.
// Das öffentliche GitHub-Portal enthält weder Kennwörter noch Passwortprüfsummen.
const HOST = Deno.env.get('SUPABASE_URL') || '';
const ADMIN = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}').default || '';
const PUBLIC_KEY = Deno.env.get('SUPABASE_ANON_KEY') || JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS') || '{}').default || '';
const CORS = { 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Methods':'POST, OPTIONS', 'Access-Control-Allow-Headers':'apikey, authorization, content-type, x-client-info', 'Cache-Control':'no-store' };
const j = (body: unknown, status=200) => new Response(JSON.stringify(body), {status, headers:{...CORS,'Content-Type':'application/json; charset=utf-8'}});
function keyHeaders(key:string):Record<string,string> {
 const headers:Record<string,string>={'apikey':key,'Content-Type':'application/json'};
 if(key.startsWith('eyJ'))headers.Authorization='Bearer '+key;
 return headers;
}
async function call(path:string,key:string,init:RequestInit={}) {
 const res = await fetch(HOST+path,{...init,headers:{...keyHeaders(key),...(init.headers as Record<string,string>||{})}});
 const raw=await res.text();
 let data:any;try{data=JSON.parse(raw)}catch{data=null}
 return {res,data};
}
Deno.serve(async (req:Request)=>{
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers:CORS});
 if(req.method!=='POST')return j({error:'Nur POST zulässig'},405);
 if(!HOST||!ADMIN||!PUBLIC_KEY)return j({error:'Anmeldedienst nicht konfiguriert'},503);
 const n=Number(req.headers.get('content-length')||'0');if(n>4096)return j({error:'Eingabe zu lang'},413);
 try{
   const data=await req.json();
   const username=typeof data?.username==='string'?data.username.trim().toLowerCase():'';
   const password=typeof data?.password==='string'?data.password:'';
   if(!/^[a-z][a-z0-9_-]{2,31}$/.test(username)||password.length<12||password.length>200) return j({error:'Benutzername oder Passwort stimmt nicht.'},401);
   // Ausschließlich service_role darf diese Funktion ausführen; die Datenbank sperrt nach Fehlversuchen.
   const check=await call('/rest/v1/rpc/forever_verify_login',ADMIN,{method:'POST',body:JSON.stringify({p_username:username,p_password:password})});
   if(!check.res.ok)return j({error:'Anmeldedienst vorübergehend nicht verfügbar.'},503);
   const slot=Number(check.data);
   if(!Number.isInteger(slot)||slot<1||slot>32767)return j({error:'Benutzername oder Passwort stimmt nicht.'},401);
   const member=await call('/rest/v1/forever_members?slot=eq.'+slot+'&select=slot,user_id&limit=1',ADMIN);
   if(!member.res.ok||!Array.isArray(member.data)||member.data.length!==1)return j({error:'Spielerplatz ist nicht erreichbar.'},503);
   const email=username+'@users.example.com'; // Technische Login-Adresse, niemals für E-Mails verwenden
   if(!member.data[0].user_id){
     const created=await call('/auth/v1/admin/users',ADMIN,{method:'POST',body:JSON.stringify({email,password,email_confirm:true})});
     if(!created.res.ok||!created.data?.id){
       // Bei einer unterbrochenen Erstaktivierung kann der technische Account existieren.
       // Keine zweite Mitgliedschaft zuweisen, sondern eine interne Korrektur verlangen.
       return j({error:'Ersteinrichtung konnte nicht abgeschlossen werden. Bitte die Gruppenleitung kontaktieren.'},503);
     }
     const attach=await call('/rest/v1/forever_members?slot=eq.'+slot,ADMIN,{
       method:'PATCH',
       headers:{'Prefer':'return=minimal'},
       body:JSON.stringify({user_id:created.data.id})
     });
     if(!attach.res.ok)return j({error:'Spielerplatz konnte nicht verbunden werden. Bitte Gruppenleitung kontaktieren.'},503);
   }
   const login=await call('/auth/v1/token?grant_type=password',PUBLIC_KEY,{method:'POST',body:JSON.stringify({email,password})});
   if(!login.res.ok||!login.data?.access_token||!login.data?.refresh_token)
     return j({error:'Anmeldung ist gerade nicht möglich. Bitte Gruppenleitung kontaktieren.'},503);
   return j({access_token:login.data.access_token,refresh_token:login.data.refresh_token,expires_in:login.data.expires_in,token_type:'bearer'});
 }catch(_err){
   return j({error:'Anmeldung vorübergehend nicht verfügbar.'},503);
 }
});