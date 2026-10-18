/* Öffentliches, versioniertes Änderungsprotokoll – kein serverseitiger Schreibzugriff im Browser */
(function(){
'use strict';
async function render(){
 const dest=document.getElementById('forever-latest-changes');
 if(!dest)return;
 try{
 const response=await fetch('forever-changelog.json',{cache:'no-store'});
 if(!response.ok)throw Error('Änderungsprotokoll nicht erreichbar');
 const entries=await response.json();
 if(!Array.isArray(entries))throw Error('Fehlerhaftes Änderungsprotokoll');
 const next=document.createDocumentFragment();
 for(const item of entries.slice(0,5)){
  if(typeof item.title!=='string'||typeof item.date!=='string')continue;
  const li=document.createElement('li'),date=document.createElement('time');
  date.dateTime=item.date;date.textContent=new Date(item.date+'T12:00:00').toLocaleDateString('de-DE');
  li.append(date,document.createTextNode(' – '));
  if(typeof item.commit==='string' && /^[a-f0-9]{40}$/.test(item.commit)){
   const a=document.createElement('a');a.href='https://github.com/Lekasus-creator/wow-foreever/commit/'+item.commit;a.textContent=item.title;a.target='_blank';a.rel='noopener noreferrer';li.append(a);
  } else li.append(document.createTextNode(item.title));
  if(item.description){const note=document.createElement('p');note.className='small';note.textContent=item.description;li.append(note)}
  next.append(li);
 }
 if(next.childNodes.length)dest.replaceChildren(next);
 }catch(err){console.info('Verwende lokal eingeblendete Updatehistorie:',err?.message||err)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
document.addEventListener('forever-maintenance-end',render);
function loadBetaNotes(){
 if(document.querySelector('script[src*="forever-beta-notices.js"]'))return;
 const script=document.createElement('script');script.src='forever-beta-notices.js?v=1';script.defer=true;document.head.append(script);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadBetaNotes);else loadBetaNotes();
})();
