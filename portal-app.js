
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
[1,10,'Getrennte Startgebiete, Trainer und Taschen – noch kein Gruppenzwang'],
[10,17,'Wegekreuz im Brachland: Oasen, Flugpunkte, Klassenaufgaben'],
[17,23,'Höhlen des Wehklagens, Silberwald und passende Questreihen'],
[23,31,'Eschental, Kral von Razorfen, Dalaran/Ausgrabung nur mit bestätigtem Zugang'],
[31,40,'Scharlachrotes Kloster, Hügel von Razorfen, Desolace und Alterac'],
[40,50,'Tanaris, Zul’Farrak, Maraudon und Forever-Gebiete nach Prüfung'],
[50,60,'Schwarzfels, Feralas, Pestländer, Düsterbruch und späte Dungeons']];
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
 items.push(['book','📖 Handbuch']);
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
 if(id==='book')loadBook();
}
function classes(){const f=el('profile'),sel=f.elements.klasse,old=sel.value;sel.replaceChildren();for(const c of combos[f.elements.volk.value]||[])sel.add(new Option(c,c));if([...sel.options].some(x=>x.value===old))sel.value=old}
function profileFields(){const f=el('profile');for(const k of ['alias','stufe','volk','rolle'])f.elements[k].value=own[k];classes();f.elements.klasse.value=own.klasse}
async function refreshTeam(){
 team=await api('/rest/v1/rpc/forever_group_profiles','POST',{});
 if(!Array.isArray(team))team=[];
 const holder=el('team-list');holder.replaceChildren();
 const players=team.filter(x=>x.aktiv&&x.klasse&&x.volk),low=Math.min(60,...players.map(x=>x.stufe));
 const high=Math.max(1,...players.map(x=>x.stufe));
 const tank=players.filter(x=>x.rolle==='Tank').length,heal=players.filter(x=>x.rolle==='Heiler').length;
 showMessage('team-status',players.length+'/5 aktiv · '+tank+' Tank · '+heal+' Heiler · Stufen '+low+'–'+high
 +(tank&&heal?'':'. Vor Dungeonabend Tank/Heiler besetzen')+(high-low>5?' · Aufholquests einplanen':''));
 for(const p of team)holder.append(block((icons[p.klasse]||'🎒')+' '+p.alias,(p.volk||'Volk offen')+' · '+(p.klasse||'Klasse offen')+' · '+p.rolle+' · Stufe '+p.stufe));
 const stage=stages.find(x=>low<=x[1])||stages[stages.length-1];
 showMessage('next','15 Min. Lehrer/Material → 65 Min. '+stage[2]+' → Pause → 45–60 Min. gemeinsame Quests → 10 Min. Abgaben/Treffpunkt.');
 renderPlayers();nav();
}
function renderPlayers(){
 const holder=el('players');holder.replaceChildren();
 for(const p of team){
 const page=n('section',undefined,'page');page.id='p-player'+p.slot;page.hidden=true;
 const guide=tips[p.klasse]||['Vor dem Abend die eigene Gruppenrolle festlegen.','Trainer, Berufe und Ausrüstung prüfen.'];
 page.append(n('h2',(icons[p.klasse]||'🎒')+' '+p.alias+' · '+(p.klasse||'Klasse offen')),n('p',p.volk+' · '+p.rolle+' · Stufe '+p.stufe));
 const card=n('article',undefined,'card');card.append(n('h3','Rolle und Spielweise'),n('p',guide[0]),n('h3','Vorbereitung und Ausrüstung'),n('p',guide[1]),
 n('h3','Talentplanung'),n('p','Stufe 10–60 anhand aktueller Forever-Talente planen. Beta-Änderungen können feste Punkterouten entwerten. Bei Rollenwechsel zuerst Gruppenzusammensetzung prüfen.'));page.append(card);
 const plan=n('article',undefined,'card');plan.append(n('h3','Meine Etappen bis Stufe 60'));
 for(const s of stages)plan.append(block('Stufe '+s[0]+'–'+s[1],s[2]+' · Persönliche Vorbereitung: '+guide[1]));
 page.append(plan);
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
 const box=el('dungeon-list');box.replaceChildren(n('p','Dungeonhäkchen werden geladen …'));
 try{const data=await get('forever_dungeon_checks','select=dungeon,item,checked&user_id=eq.'+userid+'&limit=200');box.replaceChildren();
 for(const [name,level,location] of dungeons){
 const card=n('article',undefined,'card');card.append(n('h3',name+' · Richtwert '+level),n('p',location+' · Zugangsbedingungen im Spiel prüfen'));
 const items=['Dungeon- und Vorquests angenommen','Eingang und Anreise geklärt','Vorräte und Reparaturen vorbereitet','Beuteprioritäten abgestimmt'];
 if(questExtras[name])items.push(...questExtras[name]);
 for(const item of items){
 const lab=n('label',undefined,'check'),cb=n('input');cb.type='checkbox';cb.checked=data.some(x=>x.dungeon===name&&x.item===item&&x.checked);
 cb.onchange=async()=>{const v=cb.checked;try{await put('forever_dungeon_checks',{user_id:userid,dungeon:name,item,checked:v},'?on_conflict=user_id,dungeon,item')}catch(e){cb.checked=!v;showMessage('general',e.message)}};
 lab.append(cb,n('span',item));card.append(lab);
 }
 const link=n('a','Quests, Eingang und Loot bei Zockify');link.href=dungeonLinks[name]||'https://www.zockify.de/forever/dungeons/';link.target='_blank';link.rel='noopener noreferrer';card.append(link);box.append(card);
 }
 }catch(err){box.textContent=err.message}
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
let book=false;
function loadBook(){if(book)return;book=true;const frame=n('iframe');frame.src='index.html';frame.title='Bisheriges vollständiges Gruppenhandbuch';frame.loading='lazy';el('book-frame').append(frame)}
el('book-btn').onclick=loadBook;
window.addEventListener('focus',()=>{if(own)refreshTeam().catch(()=>{})});
if(sess)begin().catch(err=>{signout();showMessage('login-result','Bitte erneut anmelden: '+err.message)});
})();
