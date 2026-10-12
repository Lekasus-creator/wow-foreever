(function(){
'use strict';
const root=document.getElementById('forever-extra-panel');if(!root)return;
const base='https://tsfjsbjjqfpaaizikunv.supabase.co/rest/v1/';
const key=root.dataset.key;const msg=document.getElementById('extra-status');
async function request(table,method='GET',q='',payload){
 const token=await window.foreverAuth.getToken();if(!token)throw Error('Bitte anmelden');
 const headers={apikey:key,Authorization:'Bearer '+token,'Content-Type':'application/json'};
 if(method==='POST')headers.Prefer='resolution=merge-duplicates,return=minimal';
 if(method==='PATCH')headers.Prefer='return=minimal';
 const r=await fetch(base+table+q,{method,headers,body:payload?JSON.stringify(payload):undefined,cache:'no-store'});
 if(!r.ok)throw Error('HTTP '+r.status+' bei '+table);
 return r.status===204?null:await r.json().catch(()=>null);
}
async function uid(){const token=await window.foreverAuth.getToken();const r=await fetch('https://tsfjsbjjqfpaaizikunv.supabase.co/auth/v1/user',{headers:{apikey:key,Authorization:'Bearer '+token}});if(!r.ok)throw Error('Bitte neu anmelden');return(await r.json()).id}
function entry(text,more,action){const p=document.createElement('p'),b=document.createElement('b');b.textContent=text;p.append(b,document.createTextNode(' · '+more));if(action)p.append(action);return p}
function button(label,cb){const b=document.createElement('button');b.type='button';b.className='toolbutton';b.textContent=label;b.onclick=cb;return b}
async function load(){try{
 const [todo,prof,dates]=await Promise.all([
 request('forever_session_todos','GET','?select=id,title,done&order=id.desc&limit=60'),
 request('forever_professions','GET','?select=profession,skill&order=profession.asc&limit=60'),
 request('forever_meetings','GET','?select=day,start_time,note&order=day.asc&limit=60')]);
 const a=document.getElementById('extra-todos');a.replaceChildren();
 for(const t of todo)a.append(entry(t.title,t.done?'✓ erledigt':'offen',button(t.done?'Öffnen':'Abhaken',async()=>{try{await request('forever_session_todos','PATCH','?id=eq.'+t.id,{done:!t.done});load()}catch(e){msg.textContent=e.message}})));
 const b=document.getElementById('extra-professions');b.replaceChildren();for(const x of prof)b.append(entry(x.profession,'Fertigkeit '+x.skill));
 const c=document.getElementById('extra-dates');c.replaceChildren();for(const x of dates)c.append(entry(x.day+' '+x.start_time.slice(0,5),x.note||'Spielabend'));
 msg.textContent='✓ Gruppenlisten aktualisiert';
 }catch(e){msg.textContent='⚠ '+e.message}}
async function submit(id,fn){document.getElementById(id).addEventListener('submit',async ev=>{ev.preventDefault();try{await fn();ev.target.reset();await load()}catch(e){msg.textContent='Speichern fehlgeschlagen: '+e.message}})}
submit('extra-todo-form',async()=>request('forever_session_todos','POST','',{title:document.getElementById('extra-todo').value.trim(),user_id:await uid()}));
submit('extra-prof-form',async()=>request('forever_professions','POST','?on_conflict=user_id,profession',{profession:document.getElementById('extra-prof').value.trim(),skill:Number(document.getElementById('extra-skill').value),user_id:await uid()}));
submit('extra-date-form',async()=>request('forever_meetings','POST','',{day:document.getElementById('extra-day').value,start_time:document.getElementById('extra-time').value,note:document.getElementById('extra-note').value.trim(),user_id:await uid()}));
document.getElementById('extra-refresh').onclick=load;
const portal=document.getElementById('forever-portal');
if(!portal.hidden)load();else{const ob=new MutationObserver(()=>{if(!portal.hidden){ob.disconnect();load()}});ob.observe(portal,{attributes:true,attributeFilter:['hidden']})}
})();