/* Horde: persönliche Klassen- und Zauberstab-Hinweise. */
(function(){
'use strict';
const specs={
'Paladin':['Heilig','Schutz','Vergeltung'],'Druide':['Gleichgewicht','Wilder Kampf','Wiederherstellung'],
'Hexenmeister':['Gebrechen','Dämonologie','Zerstörung'],'Jäger':['Tierherrschaft','Treffsicherheit','Überleben'],
'Magier':['Arkan','Feuer','Frost'],'Priester':['Disziplin','Heilig','Schatten'],
'Schamane':['Elementar','Verstärkung','Wiederherstellung'],'Schurke':['Meucheln','Kampf','Täuschung'],
'Krieger':['Waffen','Furor','Schutz']};
const details={
'Heilig':'Heilung und Unterstützung der Gruppe; Solokämpfe dauern oft länger.',
'Schutz':'Robustheit, Schilde und Tanken; ideal für die Dungeonfront.',
'Vergeltung':'Offensiver Nahkampf und Segen; flexible Unterstützung.',
'Gleichgewicht':'Distanzzauber und Kontrolle; Mana gut einteilen.',
'Wilder Kampf':'Bär für Tankaufgaben, Katze für Nahkampfschaden.',
'Wiederherstellung':'Heilung und Überlebensfähigkeit der Gruppe.',
'Gebrechen':'Flüche und Schaden über Zeit; gut für längere Kämpfe.',
'Dämonologie':'Begleiter, Widerstandskraft und sichere Solokämpfe.',
'Zerstörung':'Direkter Zauberschaden und kritische Treffer.',
'Tierherrschaft':'Begleiter im Mittelpunkt; entspanntes gemeinsames Leveln.',
'Treffsicherheit':'Fernkampfschaden und Waffennutzung.',
'Überleben':'Fallen, Kontrolle und flexible Nahkampffähigkeiten.',
'Arkan':'Mana und vielseitige Zauberei.',
'Feuer':'Offensiver Zauberschaden; weniger defensiv.',
'Frost':'Verlangsamung und Kontrolle; sicher in der Gruppe.',
'Disziplin':'Schutzschilde und unterstützende Heilung.',
'Schatten':'Schaden über Zeit; stark im Solospiel.',
'Elementar':'Distanzzauber und Totemunterstützung.',
'Verstärkung':'Nahkampfschaden mit Totems.',
'Meucheln':'Gifte und kritische Treffer.',
'Kampf':'Konstanter Nahkampfschaden.',
'Täuschung':'Schleichen und Kontrolle.',
'Waffen':'Kontrollierter Nahkampf mit Waffenfokus.',
'Furor':'Offensiver Nahkampf und Tempo.'
};
const api='https://tsfjsbjjqfpaaizikunv.supabase.co/rest/v1/';
function e(tag,txt){const x=document.createElement(tag);if(txt!==undefined)x.textContent=txt;return x}
function current(){try{return JSON.parse(localStorage.getItem('forever_session')||'null')}catch{return null}}
function getToken(){const x=Object.keys(localStorage).filter(k=>/forever|session/i.test(k));for(const k of x){try{const v=JSON.parse(localStorage.getItem(k));if(v?.access_token)return v.access_token;if(v?.session?.access_token)return v.session.access_token}catch{}}return null}
async function request(table,token,query,body){const key=document.querySelector('meta[name="forever-public-key"]')?.content;const js=document.querySelector('script[src*="portal-v4.js"]');const source=js?null:null;const headers={'Authorization':'Bearer '+token,'Content-Type':'application/json','Prefer':'return=representation,resolution=merge-duplicates'};if(window.ForeverPublicKey)headers.apikey=window.ForeverPublicKey;else return null;const res=await fetch(api+table+query,{method:body?'POST':'GET',headers,body:body?JSON.stringify(body):undefined});if(!res.ok)throw Error('Speicherung fehlgeschlagen ('+res.status+')');return res.json()}
function decorate(){document.querySelectorAll('#players .page').forEach(page=>{if(page.querySelector('.forever-personal-extra'))return;const title=page.querySelector('h2')?.textContent||'';const classes=Object.keys(specs);const cls=classes.find(c=>title.includes(c)||page.textContent.includes('Klassenguide: '+c));if(!cls)return;const own=document.querySelector('#profile-wrapper')?.closest('.page')===page;const box=e('article');box.className='card forever-personal-extra';box.append(e('h3','🌳 Alle Talentwege: '+cls),e('p','Die Wahl ist persönlich und unabhängig von der Rolle. Forever-Beta-Talentnamen und exakte Punkteverteilungen bitte im aktuellen Talentbaum prüfen.'));const select=e('select');select.append(new Option('Spezialisierung auswählen',''));for(const sp of specs[cls]){box.append(e('h4',sp),e('p',details[sp]||'Gruppenrolle und Spielstil im aktuellen Talentbaum vergleichen.'));select.append(new Option(sp,sp))}
const key='forever-spec-'+page.id;select.value=localStorage.getItem(key)||'';const info=e('p',select.value?'Gewählt: '+select.value:'Noch keine Spezialisierung gewählt.');select.disabled=!own;select.onchange=()=>{localStorage.setItem(key,select.value);info.textContent='Gewählt: '+select.value+' (nur auf diesem Gerät gespeichert)'};box.append(e('h4','Meine Wahl'),select,info);const source=e('a','Aktuellen Forever-Talentrechner prüfen ↗');source.href='https://www.zockify.de/forever/talentrechner/';source.target='_blank';source.rel='noopener noreferrer';box.append(source);
if(['Magier','Priester','Hexenmeister'].includes(cls)){box.append(e('h3','🪄 Horde-Zauberstab-Guide'),e('p','Zauberstäbe nach Mindeststufe vergleichen. Nur wechseln, wenn der angezeigte Schaden tatsächlich höher ist. Forever-Beta-Quests und Dungeonbelohnungen sind noch nicht vollständig bestätigt.'));const a=e('a','Zauberstäbe nach Stufe und Schaden vergleichen ↗');a.href='https://www.wowhead.com/forever/items/weapons/wands';a.target='_blank';a.rel='noopener noreferrer';box.append(a);box.append(e('p','Frühe Kandidaten: Geringer Zauberstab (Verzauberkunst), Großer Zauberstab (Verzauberkunst). Weitere Horde-Quest- und Dungeon-Upgrades erst nach Prüfung der tatsächlichen Beta-Werte aufnehmen.'))}
page.append(box)})}
const observer=new MutationObserver(()=>{if(!document.querySelector('#players'))return;observer.disconnect();decorate();observer.observe(document.querySelector('#players'),{childList:true})});document.addEventListener('DOMContentLoaded',()=>{const root=document.querySelector('#players');if(root){decorate();observer.observe(root,{childList:true})}});
})();
