
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

function n(tag,txt,cls){const x=document.createElement(tag);if(txt!==undefined)x.textContent=String(txt);if(cls)x.className=cls;return x}
function btn(label,fn){const x=n('button',label,'smallbtn');x.type='button';x.onclick=fn;return x}
function block(t,d,ctrl){const x=n('div',undefined,'entry'),g=n('div',undefined,'grow');g.append(n('strong',t),n('p',d));x.append(g);if(ctrl)x.append(ctrl);return x}
function message(id,s){const e=el(id);if(e)e.textContent=s}
function link(url,label){const a=n('a',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}
function save(v){sess={access_token:v.access_token,refresh_token:v.refresh_token,expires_at:Date.now()+(v.expires_in||3600)*1000};sessionStorage.setItem('forever-auth-v2',JSON.stringify(sess))}
function logout(){sess=own=userid=null;team=[];sessionStorage.removeItem('forever-auth-v2');el('app').hidden=true;el('login').hidden=false}
try{sess=JSON.parse(sessionStorage.getItem('forever-auth-v2')||'null')}catch(e){}
async function token(){if(!sess?.access_token)return null;if(Date.now()>(sess.expires_at||0)-90000){const r=await fetch(BASE+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:sess.refresh_token})});if(!r.ok){logout();return null}save(await r.json())}return sess.access_token}
async function api(path,method='GET',payload,auth=true,extra={}){
 const h={apikey:KEY,'Content-Type':'application/json',...extra};if(auth){const t=await token();if(!t)throw Error('Bitte erneut anmelden');h.Authorization='Bearer '+t}
 const r=await fetch(BASE+path,{method,headers:h,body:payload===undefined?undefined:JSON.stringify(payload),cache:'no-store'});
 let d=null;try{d=await r.json()}catch(e){}if(!r.ok)throw Error(d?.message||d?.error_description||d?.error||('HTTP '+r.status));return d;
}
const get=(table,params)=>api('/rest/v1/'+table+'?'+params);
const put=(table,data,query='')=>api('/rest/v1/'+table+query,'POST',data,true,{Prefer:'resolution=merge-duplicates,return=minimal'});
const patch=(table,data,query)=>api('/rest/v1/'+table+query,'PATCH',data,true,{Prefer:'return=minimal'});
const rpc=(name,params)=>api('/rest/v1/rpc/'+name,'POST',params);
const fmtDate=d=>{try{return new Date(d+'T12:00:00').toLocaleDateString('de-DE',{day:'2-digit',month:'long',year:'numeric'})}catch{return d}};
let routeProgress=[],professionData=[],calMonth=new Date();calMonth.setDate(1);
const professionNames=['Alchemie','Bergbau','Ingenieurskunst','Kräuterkunde','Kürschnerei','Lederverarbeitung','Schmiedekunst','Schneiderei','Verzauberkunst'];
const professionSlots=['Hauptberuf 1','Hauptberuf 2','Angeln','Kochkunst','Erste Hilfe'];
const professionExamples=[
 ['Schneiderei','Leinentasche',45,'Alle Gruppenmitglieder','Stofftaschen für mehr Platz beim Erkunden'],
 ['Schneiderei','Wolltasche',80,'Alle Gruppenmitglieder','Mehr Platz für Beute und Questgegenstände'],
 ['Lederverarbeitung','Leichte Lederrüstung',35,'Jäger, Druiden und Schurken','Ausrüstung je nach tatsächlichem Rezept vergleichen'],
 ['Schmiedekunst','Kupferne Ausrüstung',30,'Paladin, Krieger und Schamane','Nur wenn Rüstungsklasse und Werte passen'],
 ['Alchemie','Geringer Heiltrank',55,'Alle Gruppenmitglieder','Zusätzliche Überlebenshilfe im Dungeon'],
 ['Ingenieurskunst','Mechanische Hilfsmittel',50,'Alle Gruppenmitglieder','Werkzeuge und Verbrauchsgegenstände nach Rezept prüfen'],
 ['Kochkunst','Nahrungs-Buffs',50,'Alle Gruppenmitglieder','Gekochte Mahlzeiten für längere Abenteuer']
];
const classBuilds={
 Paladin:{Tank:{tree:'Schutz als Schwerpunkt; danach gruppentaugliche Überlebens- und Bedrohungstalente',stats:'Ausdauer → Rüstung/Verteidigung → Stärke → Trefferchance',rotation:'Segen aktiv halten → passendes Siegel → Richturteil → Weihe bei mehreren Gegnern → defensive Fähigkeiten bei Gefahr',prof:'Bergbau + Schmiedekunst oder Ingenieurskunst'},Schaden:{tree:'Vergeltung; unterstützende Talente in Heilig oder Schutz nach Bedarf',stats:'Stärke → Trefferchance → kritische Trefferchance → Ausdauer',rotation:'Siegel aktiv → Richturteil → Nahkampf → situative Unterstützung',prof:'Bergbau + Schmiedekunst'}},
 Druide:{Heiler:{tree:'Wiederherstellung mit Manaeffizienz und stärkeren Heilzaubern',stats:'Heilbonus/Intelligenz → Willenskraft → Ausdauer',rotation:'Schaden voraussehen → Heilung über Zeit → direkte Heilung bei Bedarf → Gruppe entgiften',prof:'Kräuterkunde + Alchemie'},Tank:{tree:'Wilder Kampf für Bärengestalt und Überleben',stats:'Ausdauer → Rüstung → Beweglichkeit → Stärke',rotation:'Bärengestalt → Bedrohung sichern → Mehrfachgegner kontrollieren → defensive Hilfen',prof:'Kürschnerei + Lederverarbeitung'},Schaden:{tree:'Wilder Kampf oder Gleichgewicht nach bevorzugter Form',stats:'Beweglichkeit/Stärke im Nahkampf; Intelligenz/Zauberschaden für Zauber',rotation:'Gestalt passend zum Ziel → Ressourcen planen → Gegner kontrollieren → Schaden',prof:'Kräuterkunde + Alchemie'}},
 Hexenmeister:{Schaden:{tree:'Gebrechen oder Dämonologie für sicheres Leveln',stats:'Zauberschaden → Trefferchance → Intelligenz → Ausdauer',rotation:'Begleiter einsetzen → Fluch → Schaden über Zeit → Schattenblitz nach Gelegenheit → Mana mit Aderlass verwalten',prof:'Schneiderei + Verzauberkunst'}},
 Jäger:{Schaden:{tree:'Tierherrschaft fürs Leveln; Treffsicherheit als Alternative',stats:'Beweglichkeit → Trefferchance → Angriffskraft → Ausdauer',rotation:'Begleiter vorschicken → Aspekt prüfen → Schussfähigkeiten und automatische Schüsse → Falle/Unterbrechen → Begleiter heilen',prof:'Kürschnerei + Lederverarbeitung'}},
 Magier:{Schaden:{tree:'Frost für Kontrolle und sicheres Leveln; Feuer als Alternative',stats:'Zauberschaden → Trefferchance → Intelligenz → kritische Trefferchance',rotation:'Frostzauber/Kontrolle → Verwandlung bei Zusatzgegnern → Schadenszauber → Mana und Schutzbarrieren verwalten',prof:'Schneiderei + Verzauberkunst oder Ingenieurskunst'}},
 Priester:{Heiler:{tree:'Heilig/Disziplin für effiziente Gruppenheilung',stats:'Heilbonus → Intelligenz → Willenskraft → Ausdauer',rotation:'Schutz/Heilung über Zeit situationsabhängig → direkte Heilung → Notfallzauber → Mana einteilen',prof:'Schneiderei + Verzauberkunst'},Schaden:{tree:'Schatten für Leveln',stats:'Zauberschaden → Trefferchance → Intelligenz → Willenskraft',rotation:'Schattenschaden über Zeit → Einzelzielschaden → Kontrolle → Mana verwalten',prof:'Schneiderei + Verzauberkunst'}},
 Schamane:{Heiler:{tree:'Wiederherstellung mit hilfreichen Gruppentalenten',stats:'Heilbonus → Intelligenz → Manaregeneration → Ausdauer',rotation:'Totems für die Gruppe → passende Heilung → reinigen/unterstützen → Mana sparen',prof:'Kräuterkunde + Alchemie'},Schaden:{tree:'Verstärkung im Nahkampf oder Elementar für Zauber',stats:'Stärke/Beweglichkeit im Nahkampf; Zauberschaden/Intelligenz für Elementar',rotation:'Totems setzen → Waffeneffekte aktiv halten → Schockzauber situativ → Nahkampf oder Blitzschläge',prof:'Bergbau + Ingenieurskunst'}},
 Schurke:{Schaden:{tree:'Kampf für stabile Nahkampfschäden',stats:'Trefferchance → Beweglichkeit → Angriffskraft → Ausdauer',rotation:'Schleichen nach Bedarf → Kombopunkte sammeln → Finisher → Unterbrechen → Bedrohung beachten',prof:'Kürschnerei + Lederverarbeitung'}},
 Krieger:{Tank:{tree:'Schutz für zähe Dungeonkämpfe; geeignete Talente aus Waffen/Furor beim Leveln',stats:'Ausdauer → Rüstung/Verteidigung → Trefferchance → Stärke',rotation:'Verteidigungshaltung → Bedrohung aufbauen → mehrere Gegner binden → defensive Abklingzeiten',prof:'Bergbau + Schmiedekunst'},Schaden:{tree:'Waffen oder Furor je nach Waffe und Tempo',stats:'Trefferchance → Stärke → kritische Trefferchance → Ausdauer',rotation:'Wut aufbauen → Hauptangriffe → Unterbrechen → Bedrohung beachten',prof:'Bergbau + Schmiedekunst'}}
};
const classQuestHints={
 Paladin:['Klassen- und Waffenquests bei den Paladinlehrern regelmäßig prüfen','Burg Schattenfang: persönliche Paladin-Dungeonquest prüfen'],
 Hexenmeister:['Dämonenbeschwörungen und neue Begleiterfähigkeiten regelmäßig freischalten','Burg Schattenfang: persönliche Hexenmeister-Dungeonquest prüfen'],
 Druide:['Bärengestalt und spätere Gestalten über die Klassenquests freischalten','Klassenlehrer und Mondlichtung besuchen'],
 Jäger:['Begleiter-/Zähmen-Questreihe früh erledigen','Begleiterfähigkeiten und Futter regelmäßig prüfen'],
 Magier:['Magierlehrer, Teleport- und Portalfähigkeiten prüfen','Uldaman: Magierquest „Macht in Uldaman“ prüfen'],
 Schamane:['Totemquests (Erde, Feuer, Wasser, Luft) entsprechend der Stufe erledigen'],
 Priester:['Volks- und Klassenfähigkeiten beim Lehrer prüfen'],
 Schurke:['Gifte-/Klassenquest und Werkzeuge nach Verfügbarkeit freischalten'],
 Krieger:['Haltungs-, Waffen- und Klassenquests beim Lehrer prüfen']
};
const earlyQuests={
 'Ragefireabgrund':[
  {title:'Die Suche nach dem verloren gegangenen Ranzen',source:'Rahauro · Donnerfels',inside:false},
  {title:'Wiederbeschaffung des verloren gegangenen Ranzens',source:'Maur Grimmtotem · erst im Dungeon',inside:true,pre:['Die Suche nach dem verloren gegangenen Ranzen']},
  {title:'Die Kraft des Feindes wird auf die Probe gestellt',source:'Rahauro · Donnerfels'},
  {title:'Vernichtung der Bestie',source:'Neeru Fireblade · Orgrimmar'},
  {title:'Die Macht der Zerstörung…',source:'Varimathras · Unterstadt'},
  {title:'Verborgene Feinde',source:'Thrall · Orgrimmar',pre:['Verborgene Feinde – erste Aufträge von Thrall abgeben','Verborgene Feinde – bei Neeru ausspionieren und abgeben']}
 ],
 'Höhlen des Wehklagens':[
  {title:'Schlangenflaum',source:'Apothekerin Zamah · Donnerfels'},
  {title:'Anführer der Giftzähne',source:'Nara Wildmane · Donnerfels',pre:['Die vergessenen Teiche','Die brackige Oase','Veränderte Wesen','Hamuul Runetotem','Nara Wildmane']},
  {title:'Klugheitstränke',source:'Mebok Mizzyrix · Ratchet',pre:['Raptorhörner']},
  {title:'Ärger auf den Docks',source:'Kranführer Bigglefuzz · Ratchet'},
  {title:'Deviatbälge',source:'Nalpak · Eingangshöhle'},
  {title:'Ausrottung der Deviat',source:'Ebru · Eingangshöhle'},
  {title:'Der leuchtende Splitter',source:'Startet nach Mutanus im Dungeon',inside:true}
 ],
 'Burg Schattenfang':[
  {title:'Das Buch von Ur',source:'Bewahrer Bel’dugur · Unterstadt'},
  {title:'Arugal muss sterben',source:'Horde · Silberwald'},
  {title:'Paladin-Klassenquest',cls:'Paladin',source:'Klassenquest – genaue Voraussetzungen im Guide prüfen'},
  {title:'Hexenmeister-Klassenquest',cls:'Hexenmeister',source:'Klassenquest – genaue Voraussetzungen im Guide prüfen'}
 ]
};
function isAdmin(){return own?.slot===1}
function memberName(id){const p=team.find(x=>x.user_id===id);return p?p.alias+' ('+(p.username||'Account')+')':'Ehemaliges Mitglied'}
function nav(){const items=[['news','📰 Aktuelles'],['team','🗺️ Route'],['dungeon','🏰 Dungeons'],['todos','✅ To-dos'],['prof','🛠️ Berufe'],['calendar','📅 Termine'],['wishes','💬 Wünsche']];for(const p of team)items.push(['player'+p.slot,(icons[p.klasse]||'🎒')+' '+p.alias]);if(isAdmin())items.push(['admin','🔐 Verwaltung']);const menu=el('tabs');menu.replaceChildren();for(const [id,label] of items){const b=btn(label,()=>show(id));b.dataset.page=id;menu.append(b)}show(active)}
function show(id){if(id==='admin'&&!isAdmin())return;active=id;document.querySelectorAll('.page').forEach(x=>x.hidden=x.id!=='p-'+id);document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('on',x.dataset.page===id));if(id==='dungeon')loadDungeons();if(id==='todos')loadTodos();if(id==='prof')loadProf();if(id==='calendar')loadCalendar();if(id==='wishes')loadWishes();if(id.startsWith('player'))loadOwnProf().catch(()=>{})}
function classes(){const f=el('profile'),s=f.elements.klasse,old=s.value;s.replaceChildren();for(const c of combos[f.elements.volk.value]||[])s.add(new Option(c,c));if([...s.options].some(x=>x.value===old))s.value=old}
function profileFields(){const f=el('profile');f.elements.alias.value=own.alias||'';f.elements.stufe.value=own.stufe||1;f.elements.volk.value=own.volk||'Untoter';f.elements.rolle.value=own.rolle||'Flexibel';classes();if(own.klasse)f.elements.klasse.value=own.klasse}
function chapterFor(level){const i=stages.findIndex(s=>level<=s[1]);return i<0?stages.length-1:i}
function openDungeon(name){requestedDungeon=name;show('dungeon')}
let requestedDungeon=null;
function currentStage(){const first=stages.findIndex((_,i)=>!routeProgress.some(x=>x.stage===i+1&&x.done));return first<0?stages.length-1:first}
function renderRoute(){const box=el('stages');box.replaceChildren();const current=currentStage(),done=routeProgress.filter(x=>x.done).length;message('route-progress','Fortschritt: '+done+' von '+stages.length+' Abschnitten abgeschlossen. Erledigte Abschnitte sind eingeklappt.');for(let i=0;i<stages.length;i++){
 const s=stages[i],finished=routeProgress.some(x=>x.stage===i+1&&x.done),det=n('details',undefined,'route-stage');det.open=i===current&&!finished;const summary=n('summary',undefined,'route-summary');const head=n('span',undefined,'route-label');head.append(n('strong',(finished?'✅ ':i===current?'📍 Jetzt · ':'')+'Abschnitt '+(i+1)+' · Stufe '+s[0]+'–'+s[1]+' · '+s[2]),n('span','Abschluss: '+s[5]+' · '+(finished?'erledigt':'offen'),'route-subtitle'));summary.append(head);det.append(summary);
 const area=n('div',undefined,'route-content');area.append(n('p','Gebiet: '+s[3]),n('p',s[4]));
 const note=n('div',undefined,'dungeon-goal');note.append(n('strong','📜 Nicht vergessen: wichtige Quests'),n('p','Die Weltquests bleiben frei wählbar. Diese Liste enthält nur bekannte Dungeon- und Klassenhinweise.'));
 const qs=n('ul');const list=(earlyQuests[s[5]]||[]).filter(q=>!q.inside).map(q=>q.title);for(const q of (list.length?list:s[8].filter(x=>!/prüfen|noch |alle |zusätzlich |guide/i.test(x)).slice(0,7)))qs.append(n('li',q));if(!qs.children.length)qs.append(n('li','Noch keine vollständig bestätigte Questliste – den Dungeon-Guide prüfen.'));note.append(qs);
 const classesHere=[...new Set(team.map(p=>p.klasse).filter(Boolean))];const classList=n('ul');for(const cls of classesHere){const hints=classQuestHints[cls]||[];for(const hint of hints.filter(x=>i===0||x.toLowerCase().includes(s[5].toLowerCase())||(i===6&&x.includes('Uldaman')))){classList.append(n('li',cls+': '+hint))}}if(classList.children.length){note.append(n('strong','✨ Klassenquests unserer Gruppe'),classList)}
 note.append(link(s[7],'Questguide und Voraussetzungen öffnen ↗'),btn('Quests bei den Dungeons abhaken',()=>openDungeon(s[5])));area.append(note);
 const row=n('label',undefined,'check'),cb=n('input');cb.type='checkbox';cb.checked=finished;cb.onchange=async()=>{cb.disabled=true;try{await put('forever_route_progress',{stage:i+1,done:cb.checked,updated_by:userid,updated_at:new Date().toISOString()},'?on_conflict=stage');routeProgress=await get('forever_route_progress','select=stage,done,updated_by&order=stage');renderRoute();updateNext()}catch(err){cb.checked=!cb.checked;message('general',err.message)}finally{cb.disabled=false}};row.append(cb,n('span',finished?'Als abgeschlossen markiert – Haken zum Wiederöffnen entfernen':'Abschnitt gemeinsam als abgeschlossen markieren (nach dem Dungeon)'));area.append(row);det.append(area);box.append(det)}
}
function updateNext(){const s=stages[currentStage()];message('next','Aktueller Abschnitt: '+s[2]+' (Stufe '+s[0]+'–'+s[1]+'). Nächster Gruppenabschluss: '+s[5]+'. Quests annehmen, danach zusammen losziehen!')}
async function refreshTeam(){
 const [people,progress]=await Promise.all([rpc('forever_group_profiles_v2',{}),get('forever_route_progress','select=stage,done,updated_by&order=stage')]);team=Array.isArray(people)?people:[];routeProgress=progress||[];own=team.find(x=>x.user_id===userid)||own;
 const activePeople=team.filter(p=>p.aktiv&&p.klasse&&p.volk),levels=activePeople.map(p=>p.stufe),min=Math.min(60,...levels),max=Math.max(1,...levels);
 message('team-status',activePeople.length+' aktive Charaktere · '+team.filter(p=>p.rolle==='Tank'&&p.klasse).length+' Tank · '+team.filter(p=>p.rolle==='Heiler'&&p.klasse).length+' Heiler · Stufen '+min+'–'+max);const holder=el('team-list');holder.replaceChildren(n('p','Gruppenmitglieder: '+team.map(p=>p.alias+' ('+(p.klasse||'Klasse noch offen')+')').join(' · '),'small'));updateNext();renderRoute();renderPlayers();nav()
}
function renderPlayers(){const root=el('players'),profile=el('profile-wrapper');root.replaceChildren();for(const p of team){
 const page=n('section',undefined,'page');page.id='p-player'+p.slot;page.hidden=true;page.append(n('h2',(icons[p.klasse]||'🎒')+' '+p.alias+' · '+(p.klasse||'Charakter wird erstellt')),n('p',(p.volk||'Volk offen')+' · '+(p.rolle||'Flexibel')+' · Stufe '+p.stufe+' · '+(p.username||''),'fine'));
 if(p.user_id===userid&&profile)page.append(profile);
 const guide=n('article',undefined,'card');guide.append(n('h3','🎯 Dein Klassenguide: '+(p.klasse||'Klasse wählen')));
 const roleGuide=(classBuilds[p.klasse]||{})[p.rolle]||(classBuilds[p.klasse]||{}).Schaden||(classBuilds[p.klasse]||{}).Heiler||(classBuilds[p.klasse]||{}).Tank;
 if(roleGuide){guide.append(n('h4','🌳 Talentbaum und Spezialisierung'),n('p',roleGuide.tree),n('p','Orientierung bis Stufe 60 – die exakte Punkteverteilung im aktuellen Forever-Talentrechner prüfen. Beta-Änderungen können Talente verschieben.','fine'),link('https://www.zockify.de/forever/talentrechner/','Interaktiven Forever-Talentbaum öffnen ↗'),n('h4','📊 Werte-Priorität'),n('p',roleGuide.stats),n('h4','⚔️ Grobe Rotation / Prioritäten'),n('p',roleGuide.rotation),n('h4','🛠️ Berufsempfehlung'),n('p',roleGuide.prof))}
 else guide.append(n('p','Bitte im eigenen Profil Volk, Klasse und Rolle wählen. Die rollenspezifischen Empfehlungen erscheinen anschließend.'));
 const quests=n('h4','📜 Wichtige persönliche Klassenquests'),list=n('ul');for(const x of classQuestHints[p.klasse]||['Klassenquests sind nach der Charaktererstellung sichtbar.'])list.append(n('li',x));guide.append(quests,list,link('https://www.zockify.de/forever/','Aktuelle Klassenguides / Questbedingungen prüfen ↗'),n('p','Stand: 12.10.2026 · Beta-Empfehlungen, keine verbindlichen Talentpunkt-Skillungen.','fine'));page.append(guide);
 if(p.user_id===userid){const wrap=n('article',undefined,'card');wrap.append(n('h3','🛠️ Meine Berufe und Fertigkeiten'),n('p','Hier pflegst du deine zwei Hauptberufe und die drei Nebenberufe. Die Gruppenübersicht ist schreibgeschützt.'));const dest=n('div');dest.id='personal-professions';wrap.append(dest);page.append(wrap)}
 root.append(page);
 }}
async function begin(){const me=await get('forever_members','select=slot,alias,volk,klasse,rolle,stufe&limit=1');if(!me.length)throw Error('Kein Mitgliedskonto gefunden');own=me[0];userid=(await api('/auth/v1/user')).id;el('login').hidden=true;el('app').hidden=false;profileFields();message('greet','Willkommen am Lagerfeuer, '+own.alias+'!');await refreshTeam();if(!own.klasse||!own.volk){show('player'+own.slot);message('profile-result','Bitte zuerst Volk, Klasse und Rolle für deinen neuen Charakter wählen.')}await loadNextMeeting()}
el('login-form').onsubmit=async e=>{e.preventDefault();message('login-result','Anmeldung wird geprüft …');try{const v=await api('/functions/v1/forever-login','POST',{username:el('user').value.trim().toLowerCase(),password:el('pass').value},false);save(v);el('pass').value='';await begin()}catch(err){message('login-result','Anmeldung fehlgeschlagen: '+err.message)}};
el('logout').onclick=logout;
el('profile').elements.volk.onchange=classes;
el('profile').onsubmit=async e=>{e.preventDefault();const f=e.target,d={};for(const k of ['alias','volk','klasse','rolle'])d[k]=f.elements[k].value;d.stufe=Number(f.elements.stufe.value);if(!combos[d.volk]?.includes(d.klasse)){message('profile-result','Bitte gültige Horde-Kombination wählen');return}try{await patch('forever_members',d,'?slot=eq.'+own.slot);Object.assign(own,d);await refreshTeam();show('player'+own.slot);message('profile-result','✓ Profil gespeichert')}catch(err){message('profile-result',err.message)}};
function dungeonQuests(name){if(earlyQuests[name])return earlyQuests[name];const s=stages.find(x=>x[5]===name);if(!s)return[];return [...new Set(s[8].filter(x=>!(/prüfen|alle |zusätzlich |guide|noch keine|weitere |übrige /i).test(x)).map(x=>x.replace(/ \(Horde\)| \(neutral\)| \(Vorbereitung\)| \(Vorquestkette\)/g,'').trim()).filter(Boolean))].map(title=>({title,source:'Questgeber/Voraussetzungen im Guide prüfen'}))}
async function loadDungeons(){const box=el('dungeon-list');box.replaceChildren(n('p','Dungeonquests werden geladen …'));try{const checks=await get('forever_dungeon_checks','select=dungeon,item,checked,user_id&limit=5000');box.replaceChildren();const currentName=stages[currentStage()][5];for(const [name,level,zone] of dungeons){
 const quests=dungeonQuests(name),stage=stages.find(x=>x[5]===name),det=n('details',undefined,'route-stage');det.dataset.dungeon=name;det.open=name===(requestedDungeon||currentName);const summary=n('summary',name+' · ab etwa Stufe '+level+' · '+zone,'route-summary');det.append(summary);const area=n('div',undefined,'route-content');const url=dungeonLinks[name]||stage?.[7]||'https://www.zockify.de/forever/dungeons/';area.append(n('p','Ziel: Jeder nimmt vor dem Besuch seine verfügbaren Quests an. Häkchen bedeuten „angenommen“, nicht „abgeschlossen“.'));area.append(link(url,'Dungeon-Guide: genaue Questgeber und Vorquests ↗'));if(!quests.length)area.append(n('p','Für diesen Dungeon ist noch keine ausreichend geprüfte Horde-Questliste hinterlegt. Bitte vor dem Besuch den verlinkten Guide nutzen; hier werden keine erfundenen Quests angezeigt.','fine'));
 for(const q of quests){if(q.cls&&!team.some(p=>p.klasse===q.cls))continue;const qCard=n('div',undefined,'dungeon-goal');qCard.append(n('strong',q.title),n('p',q.source||'Questgeber im Guide prüfen','fine'));if(q.inside)qCard.append(n('p','Diese Quest kann erst im Dungeon begonnen werden.','fine'));if(q.cls)qCard.append(n('p','Klassenquest: '+q.cls,'fine'));
 const key='Quest: '+q.title,checked=checks.some(x=>x.dungeon===name&&x.item===key&&x.user_id===userid&&x.checked);const row=n('label',undefined,'check'),cb=n('input');cb.type='checkbox';cb.checked=checked;cb.onchange=async()=>{try{await put('forever_dungeon_checks',{user_id:userid,dungeon:name,item:key,checked:cb.checked,updated_at:new Date().toISOString()},'?on_conflict=user_id,dungeon,item');await loadDungeons()}catch(err){cb.checked=!cb.checked;message('general',err.message)}};row.append(cb,n('span',q.inside?'Quest im Dungeon angenommen':'Ich habe die Hauptquest angenommen'));qCard.append(row);
 const state=n('div',undefined,'taglist');for(const p of team.filter(p=>p.user_id)){if(q.cls&&p.klasse!==q.cls)continue;const has=checks.some(x=>x.dungeon===name&&x.item===key&&x.user_id===p.user_id&&x.checked);const badge=n('span',(has?'✅ ':'◻️ ')+p.alias,'mini-tag'+(has?' is-done':''));state.append(badge)}qCard.append(state);
 if(q.pre?.length){const inner=n('details',undefined,'quest-pre'),title=n('summary','Vorquests abgeben – '+q.pre.length+' Schritte');inner.append(title);for(const p of q.pre){const k='Vorquest: '+q.title+' / '+p,pr=n('label',undefined,'check'),pc=n('input');pc.type='checkbox';pc.checked=checks.some(x=>x.dungeon===name&&x.item===k&&x.user_id===userid&&x.checked);pc.onchange=async()=>{try{await put('forever_dungeon_checks',{user_id:userid,dungeon:name,item:k,checked:pc.checked},'?on_conflict=user_id,dungeon,item')}catch(err){pc.checked=!pc.checked;message('general',err.message)}};pr.append(pc,n('span',p+' abgegeben'));inner.append(pr)}qCard.append(inner)}
 area.append(qCard)}
 det.append(area);box.append(det)}
 if(requestedDungeon){const t=[...box.querySelectorAll('details.route-stage')].find(x=>x.dataset.dungeon===requestedDungeon);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});requestedDungeon=null}
 }catch(err){box.replaceChildren(n('p','Dungeonliste konnte nicht geladen werden: '+err.message))}
}
async function loadTodos(){const box=el('todo-list');try{const data=await get('forever_session_todos','select=id,title,done&order=id.desc&limit=200');box.replaceChildren();for(const t of data)box.append(block(t.title,t.done?'✓ erledigt':'offen',btn(t.done?'Öffnen':'Abhaken',async()=>{try{await patch('forever_session_todos',{done:!t.done},'?id=eq.'+t.id);await loadTodos()}catch(err){message('todo-result',err.message)}})));if(!data.length)box.append(n('p','Noch keine Aufgaben.'))}catch(err){message('todo-result',err.message)}}
el('todo-form').onsubmit=async e=>{e.preventDefault();try{await put('forever_session_todos',{user_id:userid,title:el('todo-title').value.trim()});e.target.reset();await loadTodos()}catch(err){message('todo-result',err.message)}};
async function loadOwnProf(){const dest=el('personal-professions');if(!dest)return;if(!dest.closest('.page')?.id.endsWith(String(own?.slot)))return;try{professionData=await get('forever_profession_slots','select=user_id,slot,profession,skill&limit=2000');const ownRows=professionData.filter(x=>x.user_id===userid);dest.replaceChildren();const form=n('form',undefined,'stack'),grid=n('div',undefined,'grid');for(const slot of professionSlots){const row=ownRows.find(x=>x.slot===slot),line=n('label',slot),wrap=n('div',undefined,'row');let sel;
 if(slot.startsWith('Hauptberuf')){sel=n('select');sel.name='profession_'+slot;sel.add(new Option('Bitte wählen',''));for(const item of professionNames)sel.add(new Option(item,item));sel.value=row?.profession||'';sel.required=true}else{sel=n('input');sel.value=slot;sel.readOnly=true;sel.name='profession_'+slot}
 sel.className='prof-choice';const skill=n('input');skill.type='number';skill.min='1';skill.max='300';skill.required=true;skill.value=row?.skill||1;skill.name='skill_'+slot;skill.className='prof-skill';wrap.append(sel,skill);line.append(wrap);grid.append(line)}form.append(grid,btn('Meine Berufe speichern',async()=>{const selected=professionSlots.slice(0,2).map(s=>form.elements['profession_'+s].value);if(selected.some(x=>!x)||selected[0]===selected[1]){message('my-prof-result','Bitte zwei verschiedene Hauptberufe wählen');return}try{const rows=professionSlots.map(s=>({user_id:userid,slot:s,profession:form.elements['profession_'+s].value,skill:Number(form.elements['skill_'+s].value),updated_at:new Date().toISOString()}));await put('forever_profession_slots',rows,'?on_conflict=user_id,slot');message('my-prof-result','✓ Fertigkeitsstände gespeichert');await loadOwnProf()}catch(err){message('my-prof-result',err.message)}}));dest.append(form);const status=n('p',undefined,'small');status.id='my-prof-result';dest.append(status)
 }catch(err){dest.replaceChildren(n('p','Berufe konnten nicht geladen werden: '+err.message))}}
async function loadProf(){const box=el('prof-list');try{professionData=await get('forever_profession_slots','select=user_id,slot,profession,skill&limit=2000');box.replaceChildren();for(const p of team){const rows=professionData.filter(x=>x.user_id===p.user_id),details=n('div',undefined,'entry'),summary=n('div',undefined,'grow');summary.append(n('strong',p.alias+' · '+(p.klasse||'Klasse offen')),n('p',professionSlots.map(s=>{const d=rows.find(x=>x.slot===s);return s+': '+(d?d.profession+' ('+d.skill+')':'–')}).join(' · ')));details.append(summary);box.append(details)}const recom=n('article',undefined,'card');recom.append(n('h3','🧰 Sinnvolle Herstellung für die Gruppe'),n('p','Vorschläge auf Basis eingetragener Fertigkeitsstufen. Rezeptkenntnis, Materialien und konkrete Beta-Gegenstandswerte müssen vor der Herstellung geprüft werden.','fine'));let count=0;for(const p of team){for(const d of professionData.filter(x=>x.user_id===p.user_id)){for(const [profession,item,skill,to,desc] of professionExamples){if(d.profession!==profession||d.skill<skill-35)continue;const ready=d.skill>=skill;const grade=ready?'Fertigkeit erreicht':'Bald interessant (+ '+(skill-d.skill)+')';recom.append(block((ready?'🧪 ':'⏳ ')+item+' · '+grade,p.alias+' · '+profession+' '+d.skill+' / Richtwert '+skill+' · Für: '+to+' · '+desc));count++}}}if(!count)recom.append(n('p','Nach der Berufswahl erscheinen hier passende Herstellungsideen.'));box.append(recom)
 }catch(err){box.replaceChildren(n('p','Berufe konnten nicht geladen werden: '+err.message))}}
function monthKey(y,m){return String(y)+'-'+String(m+1).padStart(2,'0')}
function renderCalendar(dates){const grid=el('calendar-grid');grid.replaceChildren();const y=calMonth.getFullYear(),m=calMonth.getMonth(),bar=n('div',undefined,'calendar-bar');bar.append(btn('‹',()=>{calMonth.setMonth(calMonth.getMonth()-1);loadCalendar()}),n('strong',calMonth.toLocaleDateString('de-DE',{month:'long',year:'numeric'})),btn('›',()=>{calMonth.setMonth(calMonth.getMonth()+1);loadCalendar()}));grid.append(bar);const days=n('div',undefined,'month-grid');for(const w of ['Mo','Di','Mi','Do','Fr','Sa','So'])days.append(n('span',w,'calendar-weekday'));const empty=(new Date(y,m,1).getDay()+6)%7;for(let i=0;i<empty;i++)days.append(n('span',''));const nDays=new Date(y,m+1,0).getDate();for(let d=1;d<=nDays;d++){const iso=monthKey(y,m)+'-'+String(d).padStart(2,'0'),match=dates.filter(x=>x.day===iso),b=n('button',String(d)+(match.length?' · '+match.length+' 📅':''),'calendar-day'+(match.some(x=>x.status==='Bestätigt')?' confirmed':''));b.type='button';b.onclick=()=>{el('meeting-day').value=iso;const x=[...el('meeting-list').querySelectorAll('[data-day]')].find(x=>x.dataset.day===iso);if(x)x.scrollIntoView({behavior:'smooth',block:'center'})};days.append(b)}grid.append(days)}
async function loadNextMeeting(){try{const dates=await get('forever_meetings','select=day,start_time,note,status&status=eq.Best%C3%A4tigt&day=gte.'+new Date().toISOString().slice(0,10)+'&order=day.asc&limit=1');message('next-meeting',dates?.length?'📅 Nächster bestätigter Abend: '+fmtDate(dates[0].day)+' um '+dates[0].start_time.slice(0,5)+' Uhr · '+(dates[0].note||'Gemeinsam spielen'):'📅 Noch kein bestätigter Spielabend – schlagt im Kalender einen Termin vor!')}catch(e){}}
async function loadCalendar(){const box=el('meeting-list');try{const [dates,votes]=await Promise.all([get('forever_meetings','select=id,day,start_time,note,status,user_id&order=day.asc&limit=300'),get('forever_meeting_votes','select=meeting_id,user_id,vote&limit=3000')]);renderCalendar(dates);box.replaceChildren();for(const d of dates){const all=votes.filter(x=>x.meeting_id===d.id),yes=all.filter(x=>x.vote==='Ja'),maybe=all.filter(x=>x.vote==='Vielleicht'),no=all.filter(x=>x.vote==='Nein'),boxItem=n('article',undefined,'card');boxItem.dataset.day=d.day;boxItem.append(n('h3',fmtDate(d.day)+' · '+d.start_time.slice(0,5)+' Uhr · '+d.status),n('p',d.note||'Gemütlicher Gruppenabend'),n('p','Vorgeschlagen von '+memberName(d.user_id),'fine'),n('p','✅ Ja: '+yes.map(x=>memberName(x.user_id)).join(', ')+' ('+yes.length+')'),n('p','❔ Vielleicht: '+maybe.map(x=>memberName(x.user_id)).join(', ')+' ('+maybe.length+')'),n('p','❌ Nein: '+no.map(x=>memberName(x.user_id)).join(', ')+' ('+no.length+')'));
 const controls=n('div',undefined,'vote');for(const kind of ['Ja','Vielleicht','Nein'])controls.append(btn((all.find(x=>x.user_id===userid)?.vote===kind?'✓ ':'')+kind,async()=>{try{await put('forever_meeting_votes',{meeting_id:d.id,user_id:userid,vote:kind},'?on_conflict=meeting_id,user_id');await loadCalendar()}catch(err){message('meeting-result',err.message)}}));if(d.status!=='Bestätigt'&&(d.user_id===userid||isAdmin()))controls.append(btn('Termin bestätigen',async()=>{try{await rpc('forever_confirm_meeting',{p_meeting_id:d.id});await loadCalendar();await loadNextMeeting()}catch(err){message('meeting-result',err.message)}}));boxItem.append(controls);box.append(boxItem)}if(!dates.length)box.append(n('p','Noch kein Termin vorgeschlagen.'))}catch(err){message('meeting-result',err.message)}}
el('meeting-form').onsubmit=async e=>{e.preventDefault();try{await put('forever_meetings',{user_id:userid,day:el('meeting-day').value,start_time:el('meeting-time').value,note:el('meeting-note').value.trim()});e.target.reset();await loadCalendar()}catch(err){message('meeting-result',err.message)}};
async function loadWishes(){const box=el('wish-list');try{const [data,comments]=await Promise.all([get('forever_wishes','select=id,user_id,category,message,status,created_at&order=created_at.desc&limit=300'),get('forever_wish_comments','select=wish_id,user_id,message,created_at&order=created_at.asc&limit=3000')]);box.replaceChildren();for(const x of data){const card=n('article',undefined,'card'),status=n('p','Status: '+x.status,'fine');card.append(n('h3',x.category),n('p',x.message),n('p','Eingereicht von '+memberName(x.user_id)+' · '+new Date(x.created_at).toLocaleDateString('de-DE'),'fine'),status);
 if(isAdmin()&&x.status!=='Geschlossen'){const options=n('div',undefined,'vote');for(const s of ['In Prüfung','In Umsetzung','Wartet auf Bestätigung','Nachbesserung erforderlich','Zurückgestellt'])options.append(btn(s,async()=>{try{await rpc('forever_wish_action',{p_wish_id:x.id,p_action:s});await loadWishes()}catch(e){message('wish-result',e.message)}}));card.append(options)}
 if(x.user_id===userid&&['Wartet auf Bestätigung','Geschlossen'].includes(x.status)){const area=n('div',undefined,'vote');if(x.status==='Wartet auf Bestätigung')area.append(btn('👍 Gut so – schließen',async()=>{try{await rpc('forever_wish_action',{p_wish_id:x.id,p_action:'bestätigen'});await loadWishes()}catch(e){message('wish-result',e.message)}}));area.append(btn('🔁 Nachbesserung erforderlich',async()=>{try{await rpc('forever_wish_action',{p_wish_id:x.id,p_action:'nachbessern'});await loadWishes()}catch(e){message('wish-result',e.message)}}));card.append(area)}
 const replies=n('details',undefined,'quest-pre');replies.append(n('summary','💬 Rückmeldungen ('+comments.filter(c=>c.wish_id===x.id).length+')'));for(const c of comments.filter(c=>c.wish_id===x.id))replies.append(block(memberName(c.user_id),c.message));const input=n('textarea');input.placeholder='Verbesserungen oder Fragen zur Umsetzung …';input.maxLength=800;input.rows=2;replies.append(input,btn('Kommentar senden',async()=>{const txt=input.value.trim();if(txt.length<2)return;try{await put('forever_wish_comments',{wish_id:x.id,user_id:userid,message:txt});await loadWishes()}catch(e){message('wish-result',e.message)}}));card.append(replies);box.append(card)}if(!data.length)box.append(n('p','Noch keine Wünsche.'))}catch(err){message('wish-result',err.message)}}
el('wish-form').onsubmit=async e=>{e.preventDefault();try{await put('forever_wishes',{user_id:userid,category:el('wish-category').value,message:el('wish-text').value.trim()});e.target.reset();await loadWishes()}catch(err){message('wish-result',err.message)}};
const adminForm=el('admin-form');if(adminForm)adminForm.onsubmit=async e=>{e.preventDefault();if(!isAdmin())return;const uname=el('admin-user').value.trim().toLowerCase(),password=el('admin-password').value;message('admin-result','Account wird angelegt …');try{const result=await api('/functions/v1/forever-member-admin','POST',{username:uname,password});message('admin-result','✓ '+result.username+' erstellt. Gib das Passwort dem Spieler über einen sicheren Kanal.');adminForm.reset();await refreshTeam()}catch(err){message('admin-result','Account konnte nicht erstellt werden: '+err.message)}};
window.addEventListener('focus',()=>{if(own)refreshTeam().catch(()=>{})});
if(sess)begin().catch(err=>{logout();message('login-result','Bitte erneut anmelden: '+err.message)});
})();
