/* Geprüfte Forever-Termine – Stand 24.10.2026 */
(function(){
'use strict';
function render(){
 const home=document.getElementById('p-news');
 if(!home)return;
 let box=document.getElementById('forever-beta-notice');
 if(!box){
  box=document.createElement('aside');
  box.id='forever-beta-notice';
  box.className='card';
  const before=home.querySelector('.forever-changes');
  if(before)home.insertBefore(box,before);else home.append(box);
 }
 box.setAttribute('aria-label','Aktuelle Forever-Termine und Beta-Vorbehalte');
 box.replaceChildren();
 const h=document.createElement('h3');
 h.textContent='📣 Forever: Beta beendet – nächste Termine';
 box.append(h);
 function item(info,url,label){
  const p=document.createElement('p');
  p.append(document.createTextNode(info+' '));
  const a=document.createElement('a');
  a.href=url;a.textContent=label;a.target='_blank';a.rel='noopener noreferrer';
  p.append(a);box.append(p);
 }
 item('Stand 24. Oktober 2026: Die Beta endete am 23. Oktober um 19:00 Uhr MESZ. Der öffentliche Stresstest fand am 21. Oktober statt; dabei erstellte Charaktere und Namen wurden anschließend gelöscht.','https://www.zockify.de/forever/roadmap/','Zeitplan und Quellen ↗');
 item('Ab 27. Oktober beginnt die angekündigte Namensreservierung für Berechtigte. Der weltweite Start ist für den 5. November 2026 um 00:00 Uhr MEZ vorgesehen. Bitte Berechtigung und genaue Reservierungszeit vorab prüfen.','https://www.zockify.de/forever/roadmap/','Roadmap ↗');
 item('Die Beta war zuletzt auf Stufe 30 begrenzt. Talentpunkte, Klassenquests und Dungeon-Voraussetzungen für Stufe 31–60 sind deshalb nicht vollständig durch Betatests bestätigt; bestehende Guides bleiben vorläufig.','https://www.zockify.de/forever/dungeons/','Dungeon- und Questquellen ↗');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
document.addEventListener('forever-maintenance-end',render);
})();