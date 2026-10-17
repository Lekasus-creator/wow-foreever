/* WoW Forever Wartungsanzeige – Europe/Berlin */
(function(){
'use strict';
const API='https://tsfjsbjjqfpaaizikunv.supabase.co/rest/v1/forever_site_maintenance?select=enabled,expires_at,started_at,last_completed_at,planned_start_at&id=eq.1';
const KEY='sb_publishable_UOC11ecblHgQ1KErkraWBQ_7HuXJeyA';
const warning=document.getElementById('maintenance-warning');
const countdown=document.getElementById('maintenance-countdown');
const screen=document.getElementById('maintenance-screen');
const berlinFormat=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
let server={enabled:false,expires_at:null};
let blocked=false;
function berlinParts(){const fields={};for(const x of berlinFormat.formatToParts(new Date()))if(x.type!=='literal')fields[x.type]=Number(x.value);return fields}
function render(){
 const previous=blocked;
 blocked=Boolean(server.enabled && server.expires_at && Date.parse(server.expires_at)>Date.now());
 document.body.classList.toggle('portal-offline',blocked);
 if(screen)screen.hidden=!blocked;
 if(warning){
  const d=berlinParts();
  const day=Math.round((Date.UTC(d.year,d.month-1,d.day)-Date.UTC(2026,9,12))/86400000);
  const seconds=d.hour*3600+d.minute*60+d.second;
  const remaining=4*3600-seconds;
  const plannedLeft=server.planned_start_at ? Math.ceil((Date.parse(server.planned_start_at)-Date.now())/1000) : null;
  const manual=plannedLeft!==null && plannedLeft>0 && plannedLeft<=300;
  const shortly=manual||(day>=0 && remaining>0 && remaining<=300);
  warning.hidden=blocked||!shortly;
  if(shortly&&!blocked&&countdown){
   const left=manual?plannedLeft:remaining;
   const minutes=String(Math.floor(left/60)).padStart(2,'0');
   const secondsLeft=String(left%60).padStart(2,'0');
   countdown.textContent='In '+minutes+':'+secondsLeft+' Minuten beginnt die Wartung. Bitte offene Eingaben speichern.';
  }
 }
 if(previous&&!blocked)document.dispatchEvent(new Event('forever-maintenance-end'));
}
async function refresh(){
 try{
  const r=await fetch(API,{headers:{apikey:KEY,Accept:'application/json'},cache:'no-store'});
  if(!r.ok)throw Error('Status: HTTP '+r.status);
  const items=await r.json();
  if(!Array.isArray(items)||!items.length)throw Error('Wartungsstatus fehlt');
  server=items[0];
 }catch(error){console.warn('Wartungsstatus vorübergehend nicht erreichbar',error)}
 render();
}
window.ForeverMaintenance={get blocked(){return blocked},ready:null,refresh};
window.ForeverMaintenance.ready=refresh();
setInterval(render,1000);
setInterval(refresh,12000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
})();