
(function(){
'use strict';
const BASE='https://tsfjsbjjqfpaaizikunv.supabase.co', KEY="sb_publishable_UOC11ecblHgQ1KErkraWBQ_7HuXJeyA";
const el=id=>document.getElementById(id);
let sess=null,own=null,userid=null,team=[],active='news';
const combos={
'Untoter':['Magier','Paladin','Priester','Schurke','Hexenmeister','Krieger'],
'Tauren':['Druide','Jäger','Schamane','Krieger'],
'Orc':['Jäger','Magier','Schurke','Schamane','Hexenmeister','Krieger'],
'Troll':['Jäger','Magier','Priester','Schurke','Schamane','Hexenmeister','Krieger'],
'Himmelsgeborene (Horde)':['Druide','Jäger','Schurke','Schamane','Krieger']};
const icons={Paladin:'🛡️',Druide:'🌿',Hexenmeister:'🔮',Jäger:'🏹',Magier:'❄️',Priester:'✨',Schamane:'⚡',Schurke:'🗡️',Krieger:'⚔️'};
const tips={
Paladin:['Tank: Einhandwaffe und Schild, Überleben und Bedrohung.','Schilde, Weihe/Siegel, Segen, Trainer und Reparaturen vor dem Abend prüfen.'],
Druide:['Heiler: Mana vorausschauend einsetzen, Heilzauber und Unterstützung abstimmen.','Intelligenz/Willenskraft, Klassenformen, Heilvorräte und Zauberränge prüfen.'],
Hexenmeister:['Schaden/Kontrolle: Dämonen, Flüche, Gesundheitssteine und Beschwörung.','Seelensplitter, Dämonenfähigkeiten, Zauberränge und Inventar vorbereiten.'],
Jäger:['Fernkampfschaden: Begleiter kontrollieren, Fallen und Bedrohung abstimmen.','Futter, Begleiterfähigkeiten, Fernkampfwaffe und Verbrauchsgüter prüfen.'],
Magier:['Schaden/Kontrolle: Verwandlung, Verlangsamung und Frost als mögliche Levelrichtung.','Wasser und Nahrung für alle herstellen, Intelligenz und Zauberboni nutzen, neue Forever-Talente überprüfen.'],
Priester:['Je nach Rolle Heilen oder Schattenschaden; Schilde und Stärkungen helfen der Gruppe.','Zauberränge, Heilvorräte und Intelligenz/Willenskraft prüfen.'],
Schamane:['Totems und Gruppenunterstützung; Heilung oder Schaden je nach Rolle.','Totemquests, Lehrer, Waffen, Totempositionen und Mana vorbereiten.'],
Schurke:['Nahkampfschaden und Kontrolle: Unterbrechen, Betäuben und Schleichen.','Waffen, Gifte soweit verfügbar und Kontrollfähigkeiten vor dem Dungeon prüfen.'],
Krieger:['Tank oder Nahkampfschaden mit Wut- und Haltungsmanagement.','Waffenlehrer, Schild bei Tankrolle, Verbände und Reparaturen prüfen.']};
const stages=[
 [
  1,
  14,
  "Startgebiete → Orgrimmar",
  "Tirisfal, Mulgore und Durotar",
  "Wählt eure Lieblingswege durch die Startgebiete. Sobald alle bereit sind, treffen wir uns in Orgrimmar.",
  "Ragefireabgrund",
  13,
  "https://www.zockify.de/forever/dungeons/ragefireabgrund/",
  [
   "Die Suche nach dem verloren gegangenen Ranzen",
   "Die Kraft des Feindes wird auf die Probe gestellt",
   "Vernichtung der Bestie",
   "Die Macht der Zerstörung",
   "Verborgene Feinde (Vorquestkette)"
  ]
 ],
 [
  14,
  19,
  "Brachland & Oasen",
  "Wegekreuz, Üppige Oase und Ratchet",
  "Gemeinsam ankommen, die Oasen entdecken und Quests ohne festgelegte Laufroute spielen.",
  "Höhlen des Wehklagens",
  17,
  "https://www.zockify.de/forever/dungeons/hoehlen-des-wehklagens/",
  [
   "Schlangenflaum (Horde)",
   "Anführer der Giftzähne (Horde)",
   "Zusätzliche neutrale Dungeonquests im Guide prüfen"
  ]
 ],
 [
  19,
  23,
  "Silberwald",
  "Grabmal, Dorf Pyrewood und Burg Schattenfang",
  "Gemeinsam den düsteren Silberwald erkunden. Die Burg bildet den stimmungsvollen Abschluss.",
  "Burg Schattenfang",
  18,
  "https://www.zockify.de/forever/dungeons/burg-shadowfang/",
  [
   "Das Buch von Ur (Horde)",
   "Arugal muss sterben (Horde)",
   "Eventuelle Klassenquests prüfen"
  ]
 ],
 [
  23,
  27,
  "Eschental",
  "Zoramstrand und die Wälder von Eschental",
  "Erkundet Küste und Wald ohne vorgeschriebene Questfolge; der Dungeon liegt am Zoramstrand.",
  "Tiefschwarze Grotte",
  22,
  "https://www.zockify.de/forever/dungeons/blackfathom-tiefe/",
  [
   "Die Essenz von Aku'mai (Vorbereitung)",
   "Inmitten der Ruinen (Horde)",
   "Treue zu den Alten Göttern (Horde-Vorquest beachten)",
   "Blackfathom-Schurkerei (Quest beginnt im Dungeon)"
  ]
 ],
 [
  27,
  31,
  "Vorgebirge von Hillsbrad",
  "Tarrens Mühle und Alteracgebirge",
  "Untersucht die Gegend um Tarrens Mühle und helft bei der Schlüsselbeschaffung.",
  "Dalaran",
  28,
  "https://www.zockify.de/forever/dungeons/dalaran/",
  [
   "Gefängnis-Einbruch (Horde-Zugang)",
   "Schlüssel zur Stadt (Horde-Zugang)",
   "Patrouillen von Dalaran",
   "Blut in den Straßen",
   "Das Herz der Störung (Kanalisationsschlüssel)"
  ]
 ],
 [
  31,
  35,
  "Tirisfal & Vorgebirge",
  "Scharlachrote Vorposten, Tarrens Mühle und Kloster",
  "Spielt frei durch die Scharlachrote Geschichte; zum Schluss besucht ihr das Kloster.",
  "Scharlachrotes Kloster",
  30,
  "https://www.zockify.de/forever/dungeons/scharlachrotes-kloster/",
  [
   "In das Scharlachrote Kloster (Horde)",
   "Test der Lehre und Vorquests",
   "Vorrels Rache (beginnt im Friedhof)",
   "Weitere Horde- und Magierquests im Guide prüfen"
  ]
 ],
 [
  35,
  40,
  "Ödland",
  "Kargath, Titanenruinen und Uldaman",
  "Der Wüsten-Ausflug: verstreute Lager, Rätsel und Ruinen selbst entdecken.",
  "Uldaman",
  35,
  "https://www.zockify.de/forever/dungeons/uldaman/",
  [
   "Wiederbeschaffte Schätze (Horde)",
   "Induriumerz, Kraftsteine, Lösung der Verdammnis (neutral)",
   "Macht in Uldaman (Magierklasse)",
   "Übrige Horde-/neutrale Quests im Guide prüfen"
  ]
 ],
 [
  40,
  45,
  "Tanaris",
  "Gadgetzan, Sanddünen und Trollruinen",
  "Ein offener Wüstenabschnitt mit selbst gewählten Begegnungen und Trollgeschichten.",
  "Zul’Farrak",
  42,
  "https://www.zockify.de/forever/dungeons/",
  [
   "Alle Horde-, neutralen und Klassenquests mit der verlinkten Dungeonübersicht abgleichen"
  ]
 ],
 [
  45,
  49,
  "Desolace & Feralas",
  "Maraudon und die Waldgrenze von Feralas",
  "Farbenfrohe Höhlen und wilde Küsten: erkundet nach Lust und Laune.",
  "Maraudon",
  42,
  "https://www.zockify.de/forever/dungeons/",
  [
   "Alle Horde-, neutralen und Klassenquests mit der verlinkten Dungeonübersicht abgleichen"
  ]
 ],
 [
  49,
  54,
  "Sengende Schlucht",
  "Schwarzfels, Thoriumspitze und der Berg",
  "Erkundet die Schwarzfelsregion – der große Dungeonabschluss braucht gegebenenfalls mehr als einen Abend.",
  "Schwarzfelstiefen",
  48,
  "https://www.zockify.de/forever/dungeons/",
  [
   "Alle Dungeon- und Zugangsvorquests vor dem ersten Besuch im Guide prüfen"
  ]
 ],
 [
  54,
  57,
  "Feralas",
  "Camp Mojache und die Ruinen von Eldre’Thalas",
  "Urwald und uralte Ruinen; ihr entscheidet selbst, was ihr auf dem Weg entdeckt.",
  "Düsterbruch",
  54,
  "https://www.zockify.de/forever/dungeons/",
  [
   "Alle Dungeon- und Zugangsvorquests sowie mögliche Klassentasks im Guide prüfen"
  ]
 ],
 [
  57,
  60,
  "Westliche Pestländer",
  "Andorhal, Caer Darrow und Scholomance",
  "Zum Ziel Stufe 60 durch die düsteren Pestländer. Keine Hektik – ein großer Dungeonabschluss.",
  "Scholomance",
  57,
  "https://www.zockify.de/forever/dungeons/",
  [
   "Schlüssel und Dungeon-Vorquests für die gesamte Gruppe prüfen",
   "Alle Horde-, neutralen und Klassenquests aus dem Guide übernehmen"
  ]
 ]
];
const dungeons=[
['Ragefireabgrund',13,'Orgrimmar'],['Ruinen von Lordaeron',15,'Tirisfal'],['Höhlen des Wehklagens',17,'Brachland'],
['Burg Schattenfang',18,'Silberwald'],['Tiefschwarze Grotte',22,'Eschental'],['Kral von Razorfen',24,'Brachland'],
['Dalaran',28,'Alterac'],['Scharlachrotes Kloster',30,'Tirisfal'],['Hügel von Razorfen',34,'Brachland'],
['Uldaman',35,'Ödland'],['Zul’Farrak',42,'Tanaris'],['Maraudon',42,'Desolace'],
['Schwarzfelstiefen',48,'Schwarzfels'],['Düsterbruch',54,'Feralas'],
['Schwarzschlundfeste',55,'Azshara'],['Stratholme',55,'Pestländer'],['Scholomance',57,'Pestländer'],
['Terrasse des Formers',58,'Krater von Un’Goro']];
const questExtras={
'Ragefireabgrund':['Horde: Verborgene Feinde (Thrall) vorbereiten','Horde: Vernichtung der Bestie (Neeru) annehmen','Horde: Die Macht der Zerstörung (Unterstadt) prüfen'],
'Ruinen von Lordaeron':['Horde: Der Zorn von Rath’mael annehmen','Horde: Gerechtigkeit des Lichts annehmen'],
'Höhlen des Wehklagens':['Horde: Anführer der Giftzähne nach Oasen-Questreihe','Horde: Schlangenflaum in Donnerfels annehmen','Klugheitstränke nach Raptorhörnern vorbereiten'],
'Burg Schattenfang':['Horde: Das Buch von Ur in Unterstadt annehmen','Horde: Arugal muss sterben prüfen','Paladin/Hexenmeister: Klassenquest prüfen'],
'Scharlachrotes Kloster':['Horde: Vorrels Rache und Test der Lehre prüfen'],
'Dalaran':['Horde: Kanalisationsschlüssel von Dalaran beschaffen']
};
const dungeonLinks={
'Ragefireabgrund':'https://www.zockify.de/forever/dungeons/ragefireabgrund/',
'Ruinen von Lordaeron':'https://www.zockify.de/forever/dungeons/ruinen-von-lordaeron/',
'Höhlen des Wehklagens':'https://www.zockify.de/forever/dungeons/hoehlen-des-wehklagens/',
'Burg Schattenfang':'https://www.zockify.de/forever/dungeons/burg-shadowfang/',
'Scharlachrotes Kloster':'https://www.zockify.de/forever/dungeons/scharlachrotes-kloster/',
'Dalaran':'https://www.zockify.de/forever/dungeons/dalaran/'
};
function n(tag,txt,cls){const o=document.createElement(tag);if(txt!==undefined)o.textContent=String(txt);if(cls)o.className=cls;return o}
function btn(text,action){const o=n('button',text,'smallbtn');o.type='button';o.onclick=action;return o}
function block(t,d,control){const o=n('div',undefined,'entry'),i=n('div',undefined,'grow');i.append(n('strong',t),n('p',d));o.append(i);if(control)o.append(control);return o}
function showMessage(id,text){el(id).textContent=text}
function save(data){sess={access_token:data.access_token,refresh_token:data.refresh_token,expires_at:Date.now()+(data.expires_in||3600)*1000};sessionStorage.setItem('forever-auth-v2',JSON.stringify(sess))}
function signout(){sess=null;own=null;userid=null;sessionStorage.removeItem('forever-auth-v2');el('app').hidden=true;el('login').hidden=false}
try{sess=JSON.parse(sessionStorage.getItem('forever-auth-v2')||'null')}catch(e){}
async function token(){
 if(!sess?.access_token)return null;
 if(Date.now()>(sess.expires_at||0)-90000){
  const r=await fetch(BASE+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:sess.refresh_token})});
  if(!r.ok){signout();return null}save(await r.json());
 }
 return sess.access_token;
}
async function api(path,method='GET',body,auth=true,extra={}){
 const headers={apikey:KEY,'Content-Type':'application/json',...extra};
 if(auth){const t=await token();if(!t)throw Error('Bitte erneut anmelden');headers.Authorization='Bearer '+t}
 const r=await fetch(BASE+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body),cache:'no-store'});
 let d=null;try{d=await r.json()}catch(e){}
 if(!r.ok)throw Error(d?.message||d?.error_description||d?.error||('HTTP '+r.status));
 return d;
}
const get=(t,q)=>api('/rest/v1/'+t+'?'+q);
const put=(t,b,q='')=>api('/rest/v1/'+t+q,'POST',b,true,{Prefer:'resolution=merge-duplicates,return=minimal'});
const change=(t,b,q)=>api('/rest/v1/'+t+q,'PATCH',b,true,{Prefer:'return=minimal'});
function nav(){const v=active,menu=el('tabs');menu.replaceChildren();const items=[
['news','📰 Aktuelles'],['team','🗺️ Route'],['dungeon','🏰 Dungeons'],['todos','✅ To-dos'],
['prof','🛠️ Berufe'],['calendar','📅 Termine'],['wishes','💬 Wünsche']];
 for(const p of team)items.push(['player'+p.slot,(icons[p.klasse]||'🎒')+' '+p.alias+' · '+(p.klasse||'offen')]);
 for(const [id,label] of items){const b=btn(label,()=>show(id));b.dataset.page=id;menu.append(b)}
 show(v);
}
function show(id){
 active=id;
 document.querySelectorAll('.page').forEach(x=>x.hidden=x.id!=='p-'+id);
 document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('on',x.dataset.page===id));
 if(id==='dungeon')loadDungeons();
 if(id==='todos')loadTodos();
 if(id==='prof')loadProf();
 if(id==='calendar')loadCalendar();
 if(id==='wishes')loadWishes();
}
function classes(){const f=el('profile'),sel=f.elements.klasse,old=sel.value;sel.replaceChildren();for(const c of combos[f.elements.volk.value]||[])sel.add(new Option(c,c));if([...sel.options].some(x=>x.value===old))sel.value=old}
function profileFields(){const f=el('profile');for(const k of ['alias','stufe','volk','rolle'])f.elements[k].value=own[k];classes();f.elements.klasse.value=own.klasse}
function chapterFor(level){return stages.findIndex(s=>level<=s[1])>=0?stages.findIndex(s=>level<=s[1]):stages.length-1}
function guideAnchor(url,label){const a=n('a',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}
function renderRoute(current){
 const box=el('stages');box.replaceChildren();
 for(let i=0;i<stages.length;i++){const s=stages[i],details=n('details',undefined,'route-stage');details.open=i===current;
 const summary=n('summary',undefined,'route-summary');const label=n('span',undefined,'route-label');label.append(n('strong',(i===current?'📍 Jetzt · ':'')+'Abschnitt '+(i+1)+' · Stufe '+s[0]+'–'+s[1]+' · '+s[2]),n('span','Abschluss: '+s[5]+' (empf. Stufe '+s[6]+')','route-subtitle'));summary.append(label);details.append(summary);
 const content=n('div',undefined,'route-content');content.append(n('p','Gebiet: '+s[3]),n('p',s[4]));
 const callout=n('div',undefined,'dungeon-goal');callout.append(n('strong','🏰 Gemeinsamer Abschluss: '+s[5]),n('p','Vor dem Dungeon: alle verfügbaren Hordequests, neutralen Quests und persönlichen Klassenquests samt Vorbedingungen prüfen. Fehlen für Beta-Dungeons noch vollständige Questinformationen, bleibt die Vorbereitung ausdrücklich vorläufig. Normale Gebietsquests bleiben komplett euch überlassen.'));
 const quest=n('ul');for(const q of s[8])quest.append(n('li',q));callout.append(n('p','Wichtige Quest-Hinweise (nicht als vollständige Liste verstehen):','fine'),quest);
 callout.append(guideAnchor(s[7],s[7].endsWith('/dungeons/')?'Dungeonübersicht öffnen · Questdetails in der Beta noch ergänzen ↗':'Vollständige Dungeonquestliste und Voraussetzungen prüfen ↗'),' ');
 callout.append(btn('Dungeon-Questcheckliste öffnen',()=>showDungeonFor(s[5])));
 content.append(callout);details.append(content);box.append(details);
 }
}
let requestedDungeon=null;
function showDungeonFor(name){requestedDungeon=name;show('dungeon')}
async function refreshTeam(){
 team=await api('/rest/v1/rpc/forever_group_profiles','POST',{});
 if(!Array.isArray(team))team=[];
 const players=team.filter(x=>x.aktiv&&x.klasse&&x.volk),low=Math.min(60,...players.map(x=>x.stufe));
 const high=Math.max(1,...players.map(x=>x.stufe)),tank=players.filter(x=>x.rolle==='Tank').length,heal=players.filter(x=>x.rolle==='Heiler').length;
 showMessage('team-status',players.length+'/5 aktiv · '+tank+' Tank · '+heal+' Heiler · Stufen '+low+'–'+high+(high-low>5?' · Aufhol-Spielabend sinnvoll':''));
 const holder=el('team-list');holder.replaceChildren();holder.append(n('p','Aktuelle Gruppe: '+team.map(p=>p.alias+' ('+(p.klasse||'Klasse offen')+', '+p.stufe+')').join(' · '),'small'));
 const idx=chapterFor(low),s=stages[idx];
 showMessage('next','Jetzt '+s[2]+' (Stufe '+s[0]+'–'+s[1]+'). Erkundet frei, helft euch gegenseitig und sammelt die Dungeonquests für '+s[5]+'. Erst wenn alle soweit sind, gemeinsam zum Dungeon. '+(tank&&heal?'Tank/Heiler bereit.':'Vor dem Dungeon Tank und Heiler abstimmen.'));
 renderRoute(idx);renderPlayers();nav();
}
function renderPlayers(){
 const holder=el('players');holder.replaceChildren();
 for(const p of team){
 const page=n('section',undefined,'page');page.id='p-player'+p.slot;page.hidden=true;
 const guide=tips[p.klasse]||['Vor dem Abend die eigene Gruppenrolle festlegen.','Trainer, Berufe und Ausrüstung prüfen.'];
 page.append(n('h2',(icons[p.klasse]||'🎒')+' '+p.alias+' · '+(p.klasse||'Klasse offen')),n('p',p.volk+' · '+p.rolle+' · Stufe '+p.stufe));
 const card=n('article',undefined,'card');card.append(n('h3','Rolle und Spielweise'),n('p',guide[0]),n('h3','Vorbereitung und Ausrüstung'),n('p',guide[1]),
 n('h3','Talentplanung'),n('p','Stufe 10–60 anhand aktueller Forever-Talente planen. Beta-Änderungen können feste Punkterouten entwerten. Bei Rollenwechsel zuerst Gruppenzusammensetzung prüfen.'));page.append(card);
 const plan=n('article',undefined,'card');plan.append(n('h3','Zusammen mit der Gruppe'),n('p','Eure aktuelle Gebiets-Etappe und der nächste Dungeon werden im Reiter „Route“ angezeigt. Hier bleiben die wichtigsten Klassen-Hinweise, damit ihr während des Erkundens flexibel bleibt.'));page.append(plan);
 const a=n('a','Aktuelle Klassenguides und Talentrechner');a.href=p.klasse==='Magier'?'https://www.zockify.de/forever/magier/':'https://www.zockify.de/forever/';a.target='_blank';a.rel='noopener noreferrer';page.append(a);
 holder.append(page);
 }
}
async function begin(){
 const me=await get('forever_members','select=slot,alias,volk,klasse,rolle,stufe&limit=1');
 if(!me?.length)throw Error('Kein Spielerplatz zugeordnet');
 own=me[0];const user=await api('/auth/v1/user');userid=user.id;
 el('login').hidden=true;el('app').hidden=false;profileFields();
 showMessage('greet','Schön, dass du wieder dabei bist, '+own.alias+'! Gemeinsam bis Stufe 60 – mit unseren aktuellen Rollen und Wünschen.');
 await refreshTeam();
}
el('login-form').onsubmit=async e=>{e.preventDefault();try{showMessage('login-result','Anmeldung wird geprüft …');const r=await api('/functions/v1/forever-login','POST',{username:el('user').value.trim().toLowerCase(),password:el('pass').value},false);save(r);el('pass').value='';await begin()}catch(err){showMessage('login-result','Anmeldung: '+err.message)}};
el('logout').onclick=signout;
el('profile').elements.volk.onchange=classes;
el('profile').onsubmit=async e=>{
 e.preventDefault();const f=e.target,d={};for(const k of ['alias','volk','klasse','rolle'])d[k]=f.elements[k].value;d.stufe=Number(f.elements.stufe.value);
 if(!combos[d.volk]?.includes(d.klasse)){showMessage('profile-result','Nur gültige Hordekombinationen erlaubt');return}
 try{await change('forever_members',d,'?slot=eq.'+own.slot);Object.assign(own,d);await refreshTeam();showMessage('profile-result','✓ Gespeichert – persönliche Reiter aktualisiert')}catch(err){showMessage('profile-result',err.message)}
};
for(const s of stages)el('stages').append(block('Stufe '+s[0]+'–'+s[1],s[2]));
async function loadDungeons(){
 const box=el('dungeon-list');box.replaceChildren(n('p','Dungeon-Questchecklisten werden geladen …'));
 try{
 const data=await get('forever_dungeon_checks','select=dungeon,item,checked&user_id=eq.'+userid+'&limit=500');box.replaceChildren();
 const i=chapterFor(Math.min(60,...team.filter(p=>p.aktiv).map(p=>p.stufe)));
 for(const [idx,stage] of stages.entries()){
 const name=stage[5],panel=n('details',undefined,'route-stage');panel.dataset.dungeon=name;panel.open=idx===i;
 const heading=n('summary',name+' · Stufe '+stage[6]+' · '+stage[2],'route-summary');panel.append(heading);
 const inner=n('div',undefined,'route-content');inner.append(n('p','Nur Dungeonquests vorbereiten – keine normalen Gebietsquests vorgeschrieben.'));
 const ul=n('ul');for(const q of stage[8])ul.append(n('li',q));inner.append(n('p','Bekannte Quest-Hinweise (nicht zwingend vollständig):'),ul);
 inner.append(guideAnchor(stage[7],stage[7].endsWith('/dungeons/')?'Dungeonübersicht: noch keine geprüfte vollständige Questliste ↗':'Questguide: Horde-, neutrale, Klassen- und Vorquests ↗'));
 const items=['Alle Horde-Dungeonquests aus der vollständigen Liste geprüft','Alle neutralen Dungeonquests geprüft','Persönliche Klassen-Dungeonquests und Voraussetzungen geprüft','Benötigte Vorquestketten/Aufträge abgeschlossen oder für den Dungeon vorgemerkt'];
 for(const item of items){
 const label=n('label',undefined,'check'),cb=n('input');cb.type='checkbox';cb.checked=data.some(x=>x.dungeon===name&&x.item===item&&x.checked);
 cb.onchange=async()=>{const wanted=cb.checked;try{await put('forever_dungeon_checks',{user_id:userid,dungeon:name,item,checked:wanted},'?on_conflict=user_id,dungeon,item')}catch(err){cb.checked=!wanted;showMessage('general',err.message)}};
 label.append(cb,n('span',item));inner.append(label);
 }
 panel.append(inner);box.append(panel);
 }
 if(requestedDungeon){const target=[...box.querySelectorAll('details')].find(x=>x.dataset.dungeon===requestedDungeon);if(target){target.open=true;target.scrollIntoView({block:'start',behavior:'smooth'})}requestedDungeon=null;}
 }catch(err){box.replaceChildren(n('p','Die persönliche Dungeonliste konnte nicht geladen werden: '+err.message))}
}
async function loadTodos(){
 const box=el('todo-list');try{const data=await get('forever_session_todos','select=id,title,done&order=id.desc&limit=100');box.replaceChildren();
 for(const t of data)box.append(block(t.title,t.done?'✓ erledigt':'offen',btn(t.done?'Öffnen':'Abhaken',async()=>{try{await change('forever_session_todos',{done:!t.done},'?id=eq.'+t.id);loadTodos()}catch(err){showMessage('todo-result',err.message)}})));
 if(!data.length)box.append(n('p','Noch keine gemeinsamen Aufgaben.'))}catch(err){showMessage('todo-result',err.message)}
}
el('todo-form').onsubmit=async e=>{e.preventDefault();try{await put('forever_session_todos',{user_id:userid,title:el('todo-title').value.trim()});e.target.reset();await loadTodos()}catch(err){showMessage('todo-result',err.message)}};
async function loadProf(){
 const box=el('prof-list');try{const data=await get('forever_professions','select=owner_alias,profession,skill&order=profession.asc&limit=100');box.replaceChildren();
 for(const x of data)box.append(block(x.owner_alias||'Mitspieler',x.profession+' · Fertigkeit '+x.skill));
 if(!data.length)box.append(n('p','Noch keine Berufe eingetragen.'))}catch(err){showMessage('prof-result',err.message)}
}
el('prof-form').onsubmit=async e=>{e.preventDefault();try{await put('forever_professions',{user_id:userid,owner_alias:own.alias,profession:el('prof-name').value.trim(),skill:Number(el('prof-skill').value)},'?on_conflict=user_id,profession');await loadProf()}catch(err){showMessage('prof-result',err.message)}};
async function loadCalendar(){
 const box=el('meeting-list');
 try{const [dates,votes]=await Promise.all([get('forever_meetings','select=id,day,start_time,note&order=day.asc&limit=100'),get('forever_meeting_votes','select=meeting_id,user_id,vote&limit=200')]);box.replaceChildren();
 for(const d of dates){
 const all=votes.filter(x=>x.meeting_id===d.id),yes=all.filter(x=>x.vote==='Ja').length,maybe=all.filter(x=>x.vote==='Vielleicht').length;
 const ctrl=n('div',undefined,'vote');
 for(const kind of ['Ja','Vielleicht','Nein'])ctrl.append(btn(kind,async()=>{try{await put('forever_meeting_votes',{meeting_id:d.id,user_id:userid,vote:kind},'?on_conflict=meeting_id,user_id');loadCalendar()}catch(err){showMessage('meeting-result',err.message)}}));
 box.append(block(d.day+' · '+d.start_time.slice(0,5),(d.note||'Gemeinsamer Abend')+' · '+yes+' Ja / '+maybe+' Vielleicht',ctrl));
 }
 if(!dates.length)box.append(n('p','Noch kein Termin vorgeschlagen.'))
 }catch(err){showMessage('meeting-result',err.message)}
}
el('meeting-form').onsubmit=async e=>{e.preventDefault();try{await put('forever_meetings',{user_id:userid,day:el('meeting-day').value,start_time:el('meeting-time').value,note:el('meeting-note').value.trim()});e.target.reset();await loadCalendar()}catch(err){showMessage('meeting-result',err.message)}};
async function loadWishes(){const box=el('wish-list');try{const data=await get('forever_wishes','select=category,message,status,created_at&order=created_at.desc&limit=100');box.replaceChildren();for(const x of data)box.append(block(x.category+' · '+x.status,x.message));if(!data.length)box.append(n('p','Noch keine Wünsche.'))}catch(err){showMessage('wish-result',err.message)}}
el('wish-form').onsubmit=async e=>{e.preventDefault();try{await put('forever_wishes',{user_id:userid,category:el('wish-category').value,message:el('wish-text').value.trim()});e.target.reset();await loadWishes()}catch(err){showMessage('wish-result',err.message)}};
window.addEventListener('focus',()=>{if(own)refreshTeam().catch(()=>{})});
if(sess)begin().catch(err=>{signout();showMessage('login-result','Bitte erneut anmelden: '+err.message)});
})();
