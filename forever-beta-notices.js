/* Geprüfte Beta-Hinweise vom 18.10.2026 */
(function(){
'use strict';
function render(){
 const home=document.getElementById('p-news');
 if(!home||document.getElementById('forever-beta-notice'))return;
 const box=document.createElement('aside');box.id='forever-beta-notice';box.className='card';
 box.setAttribute('aria-label','Offizielle Beta-Hinweise');
 const h=document.createElement('h3');h.textContent='📣 Aktuelle Forever-Beta-Hinweise';box.append(h);
 function item(text,url,label){
  const p=document.createElement('p');p.textContent=text+' ';
  const a=document.createElement('a');a.href=url;a.textContent=label;a.target='_blank';a.rel='noopener noreferrer';p.append(a);box.append(p);
 }
 if(Date.now()<Date.parse('2026-10-20T00:00:00+02:00')){
  item('19. Oktober 2026, 19:00 Uhr MESZ: öffentlicher Forever-Stresstest ohne Einladung, Spielzeit oder Abo. Testcharaktere und Namen werden danach gelöscht.','https://worldofwarcraft.blizzard.com/en-gb/news/24302072','Blizzard-Ankündigung ↗');
 }
 item('Offizielle Beta-Änderungen vom 15./16. Oktober: Dungeonquests geben 50 % weniger zusätzliche Erfahrung über den normalen Questwert hinaus. Klassen und Volksfähigkeiten wurden ebenfalls geändert. Talentempfehlungen sind deshalb vorläufig.','https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-october-15/2360696/6','Blizzard-Betanotizen ↗');
 const before=home.querySelector('.forever-changes');if(before)home.insertBefore(box,before);else home.append(box);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
document.addEventListener('forever-maintenance-end',render);
})();