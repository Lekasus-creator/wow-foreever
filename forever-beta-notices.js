/* Geprüfte Forever-Termine – Stand 26.10.2026 */
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
 item('Stand 25. Oktober 2026: Die Beta endete am 23. Oktober um 19:00 Uhr MESZ. Der öffentliche Stresstest fand am 21. Oktober statt; dabei erstellte Charaktere und Namen wurden anschließend gelöscht.','https://www.zockify.de/forever/roadmap/','Zeitplan und Quellen ↗');
 item('Namensreservierung: Dienstag, 27. Oktober 2026, ab 18:00 Uhr MEZ bis 3. November. Berechtigte Vorbesteller können dabei insgesamt bis zu drei Charaktere über alle Regelsets reservieren; die Grenze gilt nur für die frühe Reservierung. Der Release ist für den 5. November um 00:00 Uhr MEZ angekündigt.','https://worldofwarcraft.blizzard.com/en-us/news/24303866','Offizielle Blizzard-Ankündigung ↗');
 item('Wichtig für unsere Horde-Gruppe: Gemeinsam Dungeons spielen geht nur innerhalb desselben Regelsets. Zur Wahl stehen Normal, PvP und Rollenspiel; Hardcore soll erst später folgen. Vor der Charaktererstellung das Regelset miteinander abstimmen.','https://worldofwarcraft.blizzard.com/en-us/news/24302070','Blizzard: Regelsets und Gruppenspiel ↗');
 item('Offizieller Dungeon-Ausblick (Blizzard, 20. Oktober): Neun neue Fünferinstanzen decken Stufe 13 bis 60 ab. Für den Zugang zu Dalaran (vorgesehener Dungeonbereich 28–33) beginnt die Horde die Zugangsquestreihe bei Magus Wordeen Voidglare in Tarrens Mühle mit „Key to the City“ und „Prison Break-In“ (englische Originalnamen zur sicheren Identifikation). Vor dem Lauf die aktuellen Annahmevoraussetzungen prüfen; diese sind hier nicht als vollständig bestätigt ausgewiesen.','https://worldofwarcraft.blizzard.com/en-us/news/24301455','Blizzard: neue Dungeons und Horde-Zugang ↗');
 item('Die Beta war zuletzt auf Stufe 30 begrenzt. Talentpunkte, Klassenquests und Dungeon-Voraussetzungen für Stufe 31–60 sind deshalb nicht vollständig durch Betatests bestätigt; bestehende Guides bleiben vorläufig.','https://www.zockify.de/forever/dungeons/','Dungeon- und Questquellen ↗');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
document.addEventListener('forever-maintenance-end',render);
})();