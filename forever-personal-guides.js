/* WoW Forever · persönlicher Talentweg und Klassenquests · 18.10.2026 */
(function(){
'use strict';
const BASE='https://tsfjsbjjqfpaaizikunv.supabase.co';
const PUBLIC='sb_publishable_UOC11ecblHgQ1KErkraWBQ_7HuXJeyA';
const treeDescriptions={
Paladin:{Heilig:'Gruppenheiler: starke Einzelheilung und Segen; weniger Solo-Schaden.',Schutz:'Schildtank: kontrollierte Bedrohung und Gruppenverteidigung; langsameres Solo-Spiel.',Vergeltung:'Nahkämpfer: Siegel, Richturteile und Unterstützung; geeignet für lockeres Questen.'},
Druide:{Gleichgewicht:'Zauberfernschaden und Kontrolle; Mana im Auge behalten.','Wilder Kampf':'Bär als Tank oder Katze für Nahkampfschaden; schnelle Wechsel im Team.',Wiederherstellung:'Heilung über Zeit und Gruppenunterstützung; für gemütliche Dungeons.'},
Hexenmeister:{Gebrechen:'Schaden über Zeit, Lebensentzug und wenig Trinkpausen; ausdauernd.',Dämonologie:'Dämonen und Überleben im Mittelpunkt; sehr entspanntes Solo-Leveln.',Zerstörung:'Direkte Feuer-/Schattenzauber, harte Treffer; höherer Manaverbrauch.'},
Jäger:{Tierherrschaft:'Der Begleiter macht den Großteil der Arbeit; entspannt und sicher.',Treffsicherheit:'Gezielter Fernkampfschaden mit guten Waffen; nützlich im Dungeon.',Überleben:'Fallen, Kontrolle und Nahkampfoptionen; beweglicher Spielstil.'},
Magier:{Arkan:'Effiziente Zauber und Mana-Kontrolle; flexible Gruppenrolle.',Feuer:'Hoher Direktschaden; Vorsicht bei Gruppenbedrohung und Mana.',Frost:'Verlangsamen, kontrollieren und sicher leveln; hervorragend zum gemeinsamen Spielen.'},
Priester:{Disziplin:'Schilde, Manaeffizienz und Unterstützung für Heiler oder Solo-Spiel.',Heilig:'Starke Heilzauber und Gruppenrettung; eher für feste Gruppe.',Schatten:'Schattenschaden, Manaverwaltung und Solospiel; kann unterstützen.'},
Schamane:{Elementar:'Blitz-/Feuerzauber und Totems aus der Distanz.',Verstärkung:'Nahkampf mit Waffenverzauberung und Totems, bei Bedarf robust.',Wiederherstellung:'Wasser-/Heilzauber und Totems; vielseitiger Gruppenheiler.'},
Schurke:{Meucheln:'Kritische Treffer und Gifte; viel Schaden auf Einzelziele.',Kampf:'Stetiger Nahkampfschaden und gute Waffenwahl; unkompliziert.',Täuschung:'Schleichen, Kontrolle und taktische Eröffnung.'},
Krieger:{Waffen:'Kontrollierter Zweihandkampf und Überwältigen.',Furor:'Offensive Wutnutzung und Tempo; hohe Ausrüstungsskalierung.',Schutz:'Schild, defensive Haltung und zuverlässig Gegner binden.'}
};
/* Redaktionelle Beta-Prioritäten: Talentname/Ränge je Stufe ab 10. Keine erfundenen
   Punkte ab der letzten überprüften Empfehlung; nachfolgende Bereiche als offen ausweisen. */
const paths={
Paladin:{
Heilig:[['Göttliche Weisheit',5],['Heilendes Licht',3],['Spiritueller Fokus',2],['Andacht',3],['Reinigende Macht',2],['Illumination',5],['Göttliche Gunst',1],['Heiliger Schock',1]],
Schutz:[['Verschanzen',5],['Präzision',3],['Vorahnung',5],['Verbesserter Zorn der Gerechtigkeit',3],['Schild-Spezialisierung',3],['Zähigkeit',5],['Heiliger Schild',1]],
Vergeltung:[['Verbessertes Siegel der Macht',5],['Benediktion',5],['Überzeugung',5],['Siegel des Befehls',1]]
},
Druide:{
Gleichgewicht:[['Sternenfeuerzorn',5],['Griff der Natur',1],['Verbesserter Griff der Natur',4],['Naturreichweite',2]],
'Wilder Kampf':[['Wildheit',5],['Wilde Instinkte',5],['Dickes Fell',5],['Geschärfte Klauen',3]],
Wiederherstellung:[['Verbessertes Mal der Wildnis',5],['Ingrimm',5],['Naturfokus',5],['Reflexion',3]]
},
Hexenmeister:{
Gebrechen:[['Verbesserte Verderbnis',5],['Verhängnis',5],['Verbessertes Entziehen',3],['Pandemie',3],['Einbruch der Nacht',2],['Schattenbeherrschung',5]],
Dämonologie:[['Dämonische Umarmung',5],['Unheilige Macht',5],['Verbesserter Wichtel',3]],
Zerstörung:[['Verbesserter Schattenblitz',5],['Verderben',5],['Verwüstung',5]]
},
Jäger:{
Tierherrschaft:[['Verbesserter Aspekt des Falken',5],['Belastbarkeitstraining',5],['Entfesselte Wut',5]],
Treffsicherheit:[['Tödliche Schüsse',5],['Effizienz',5],['Gezielter Schuss',1]],
Überleben:[['Monstertöten',3],['Humanoidentöten',3],['Falkenauge',3],['Abwehr',5]]
},
Magier:{
Arkan:[['Arkaner Fokus',5],['Arkane Konzentration',5],['Arkane Meditation',3]],
Feuer:[['Verbesserter Feuerball',5],['Entzünden',5],['Flammenwerfen',2]],
Frost:[['Verbesserter Frostblitz',5],['Elementare Präzision',3],['Eissplitter',5],['Frostbeulen',3]]
},
Priester:{
Disziplin:[['Unbezwingbarer Wille',5],['Zauberstab-Spezialisierung',5],['Meditation',3]],
Heilig:[['Heilfokus',2],['Verbesserte Erneuerung',3],['Heilige Spezialisierung',5]],
Schatten:[['Willensentzug',5],['Verdunkelung',5],['Schattenfokus',5],['Gedankenschinden',1]]
},
Schamane:{
Elementar:[['Konvektion',5],['Erschütterung',5],['Elementarfokus',1]],
Verstärkung:[['Wissen der Ahnen',5],['Donnernde Stöße',5],['Verbesserter Geisterwolf',2]],
Wiederherstellung:[['Verbesserte Welle der Heilung',5],['Gezeitenfokus',5],['Totemfokus',5]]
},
Schurke:{
Meucheln:[['Tücke',5],['Skrupellosigkeit',3],['Verbessertes Ausweiden',3]],
Kampf:[['Verbesserter Finsterer Stoß',2],['Blitzartige Reflexe',5],['Präzision',5]],
Täuschung:[['Meister der Täuschung',5],['Gelegenheit',5],['Tarnung',5]]
},
Krieger:{
Waffen:[['Verbessertes Verwunden',3],['Abwehr',5],['Verbesserter Sturmangriff',2]],
Furor:[['Grausamkeit',5],['Ungezügelter Zorn',5],['Blutwahnsinn',3]],
Schutz:[['Schild-Spezialisierung',5],['Vorahnung',5],['Zähigkeit',5]]
}
};
const quests={
Hexenmeister:[
 ['soranruk',20,'Die Kugel von Soran’ruk','Doan Karhan, Brachland (49, 57)','Sammle drei Soran’ruk-Fragmente bei Kultisten der Tiefschwarzen Grotte und ein großes Fragment von Gegnern der Burg Schattenfang.','Kugel oder Stab von Soran’ruk','Forever-Dungeonführer bestätigt'],
 ['voidwalker',10,'Beschwörung des Leerwandlers','Hexenmeisterlehrer in Unterstadt oder Orgrimmar (je nach Volk)','Folge der Dämonen-Lehrlingsquest und schließe das Beschwörungsritual ab.','Leerwandler beschwören','Classic-Vorlage; Forever-Ablauf nicht bestätigt']
],
Druide:[
 ['bear',10,'Körper und Herz','Druidenlehrer in Donnerfels, anschließend Mondlichtung','Sprich mit dem Druidenkreis und absolviere die Bärenprobe am Mondkinstein.','Bärengestalt','Classic-Vorlage; Forever-Ort und Voraussetzung prüfen'],
 ['waterform',16,'Aquatische Gestalt','Druidenlehrer und Mondlichtung','Beginne die Probenreihe für die Reise im Wasser und beschaffe die benötigten Anhänger.','Wassergestalt','Classic-Vorlage; Forever-Ort prüfen']
],
Jäger:[
 ['tame',10,'Die Zähmung der Bestie','Jägerlehrer des jeweiligen Startgebiets','Zähme die vorgegebenen Übungstiere, melde dich anschließend beim Jägerlehrer.','Tier zähmen und Begleiter ausbilden','Classic-Vorlage; horde- und betaabhängig']
],
Magier:[
 ['balnir',10,'Die Balnirfarm','Anastasia Hartwell, Unterstadt (Untote)','Untersuche die Balnirfarm in Tirisfal entsprechend der Aufgabenbeschreibung.','Klassenfortschritt und Erfahrung','Classic-Vorlage, nur Untote'],
 ['material',15,'Materialsammlung','Anastasia Hartwell, Unterstadt (Untote)','Sammle die angeforderten Materialien für die Magierprüfung.','Folgequest zur Magierausrüstung','Classic-Vorlage, nur Untote']
],
Priester:[
 ['weakness',10,'Berührung der Schwäche','Vater Lankester, Unterstadt (Untote)','Besuche anschließend Aelthalyste im Kriegsviertel.','Zauber Berührung der Schwäche','Classic-Vorlage, nur Untote'],
 ['plague',20,'Verschlingende Seuche','Vater Lankester, Unterstadt (Untote)','Sprich mit Aelthalyste und schließe die Klassenprüfung ab.','Zauber Verschlingende Seuche','Classic-Vorlage, nur Untote'],
 ['trollhex',10,'Verhexung der Schwäche','Ur’kyo, Tal der Geister in Orgrimmar (Trolle)','Sprich mit Ur’kyo und schließe die kurze Priesterprüfung ab.','Zauber Verhexung der Schwäche','Classic-Vorlage, nur Trolle'],
 ['shadowguard',20,'Schattenwache','Zayus, Orgrimmar (Trolle)','Sprich mit Ur’kyo im Tal der Geister.','Zauber Schattenwache','Classic-Vorlage, nur Trolle']
],
Schamane:[
 ['earth',4,'Ruf der Erde','Schamanenlehrer im jeweiligen Horde-Startgebiet','Hilf den Erdgeistern und kehre zum Trainer zurück.','Erden-Totem','Classic-Vorlage; Forever abhängig von Volk'],
 ['fire',10,'Ruf des Feuers','Schamanenlehrer, Orgrimmar/Donnerfels je nach Volk','Schließe die Feuerritual-Kette ab und bringe das geforderte Material zum Schrein.','Feuer-Totem','Classic-Vorlage; Details je Volk'],
 ['water',20,'Ruf des Wassers','Schamanenlehrer der Hauptstadt','Folge den Hinweisen zum Wassergeist durch die Hordegebiete.','Wasser-Totem','Classic-Vorlage; Details je Volk'],
 ['air',30,'Ruf der Luft','Schamanenlehrer der Hauptstadt','Besuche den zuständigen Meister der Elemente.','Luft-Totem','Classic-Vorlage; Details je Volk']
],
Schurke:[
 ['deathstalkers',13,'Die Todespirscher','Mennet Carkad, Schurkenviertel in Unterstadt (Untote)','Finde die Zielperson und folge den Aufträgen des Todespirscher-Netzwerks.','Schurken-Klassenfortschritt','Classic-Vorlage, nur Untote'],
 ['poison',20,'Die Berührung Zanzils','Schurkenlehrer (Volksvariante), Reise ins Brachland','Folge der Klassenquestkette zur Erlernung der Gifte.','Gifte für Waffen','Classic-Vorlage; ortsabhängig']
],
Krieger:[
 ['brutal',20,'Brutale Rüstung','Kriegerlehrer, Horde-Questkette im Brachland','Beschaffe Materialien für die Kriegerausrüstung.','Brutale Rüstungsteile','Classic-Vorlage; Forever nicht bestätigt'],
 ['whirlwind',30,'Wirbelwaffe','Kriegerlehrer; später die Kriegerinsel bei Ratchet','Sammle die erforderlichen Elemente und stelle dich den Prüfungen.','Wirbelwaffe','Classic-Vorlage; Forever nicht bestätigt']
],
Paladin:[
 ['divinity',12,'Eine Lektion in Göttlichkeit (A Lesson in Divinity)','Danitha Morr, Bandarionfestung in Tirisfal (22, 45)','Sprich mit Tanis Alderwood in Unterstadt, bringe zehn Leinenstoff und nutze das Symbol des Lebens zur Wiederbelebung von Todeswache Falgan; folge den weiteren Aufträgen.','Zauber Erlösung und Symbol des Lebens','Neue Untoten-Paladin-Questreihe in Forever dokumentiert'],
 ['diplomatic',18,'Diplomatischer Zwischenfall','Danitha Morr, Bandarionfestung in Tirisfal (22, 45)','Reise zum Grabmal im Silberwald und sprich mit Trevan Rol; anschließend führt die Waffenquestkette zu Ott.','Beginn der Mondsilberklingen-Questreihe','Forever – Untoten-Paladin-Quest'],
 ['moonsilver',20,'Die Mondsilberklinge (The Moonsilver Blade)','Ott im Vorgebirge von Hillsbrad (60, 26)','Lass Ott sein Meisterwerk schmieden und bringe es zu Trevan Rol im Silberwald.','Mondsilberklinge (Zweihandschwert)','Forever – Horde-Paladin, Belohnung dokumentiert']
]
};
function E(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n}
function row(parent,...children){const p=E('div');for(const child of children)p.append(child);parent.append(p);return p}
function auth(){try{return JSON.parse(sessionStorage.getItem('forever-auth-v2')||'null')}catch{return null}}
async function api(path,method='GET',payload,prefer){
 if(window.ForeverMaintenance?.blocked)throw Error('Wartungsmodus aktiv');
 let session=auth();if(!session?.access_token)throw Error('Bitte anmelden');
 if(session.expires_at && Date.now()>session.expires_at)throw Error('Sitzung abgelaufen – bitte die Seite neu laden und erneut anmelden');
 const res=await fetch(BASE+path,{method,headers:{apikey:PUBLIC,Authorization:'Bearer '+session.access_token,'Content-Type':'application/json',...(prefer?{Prefer:prefer}:{})},body:payload===undefined?undefined:JSON.stringify(payload),cache:'no-store'});
 const raw=await res.text();let value;try{value=raw?JSON.parse(raw):null}catch{value=null}
 if(!res.ok)throw Error(value?.message||value?.error||'HTTP '+res.status);
 return value;
}
let identity=null,identityToken=null;
async function uid(){const currentToken=auth()?.access_token;if(!identity || identityToken!==currentToken){identity=await api('/auth/v1/user');identityToken=currentToken;}return identity.id}
const query=async(name,columns)=>api('/rest/v1/'+name+'?select='+columns);
const upsert=async(name,payload,conflict)=>api('/rest/v1/'+name+'?on_conflict='+conflict,'POST',payload,'resolution=merge-duplicates,return=minimal');
const specsFor=x=>Object.keys(treeDescriptions[x]||{});
function applicableQuests(cls,volk){return (quests[cls]||[]).filter(q=>{
 const note=q[6];
 if(note.includes('nur Untote')&&volk!=='Untoter')return false;
 if(note.includes('nur Trolle')&&volk!=='Troll')return false;
 return true;
})}
function planFor(cls,spec,level){
 const seq=paths[cls]?.[spec]||[],spent=Math.max(0,Math.min(60,Number(level)||1)-9),steps=[];
 for(const [name,ranks] of seq)for(let n=1;n<=ranks;n++)steps.push({name,rank:n,max:ranks,level:9+steps.length+1});
 const allocated=steps.filter(x=>x.level<=level),next=steps.find(x=>x.level>level);
 const aggregates=new Map();for(const item of allocated)aggregates.set(item.name,item);
 return {steps,allocated,next,aggregates,unplanned:Math.max(0,spent-steps.length)};
}
let renderSerial=0;
function getOwnPage(){
 const wrapper=document.getElementById('profile-wrapper');
 return wrapper?.closest('#players .page')||null;
}
function replaceLegacy(page){
 for(const item of page.querySelectorAll('article.card')){
  const title=item.querySelector('h3')?.textContent||'';
  if(title.startsWith('🎯 Dein Klassenguide') || title.startsWith('🌳 Alle Talentwege:'))item.remove();
 }
}
function identityFromPage(page){
 const form=page.querySelector('#profile');
 if(!form)return null;
 return {klasse:form.elements.klasse?.value||'',volk:form.elements.volk?.value||'',stufe:Math.max(1,Math.min(60,Number(form.elements.stufe?.value||1)))};
}
async function render(){
 const page=getOwnPage(),character=page&&identityFromPage(page);
 if(!page||!character?.klasse)return;
 const serial=++renderSerial;
 replaceLegacy(page);
 let box=page.querySelector('.forever-new-guide');
 if(box)return;
 box=E('section',undefined,'card forever-new-guide');
 box.style.borderColor='#b59768';
 const target=page.querySelector('#personal-professions')?.closest('article')||null;
 if(target)page.insertBefore(box,target);else page.append(box);
 const loading=E('p','Dein persönlicher Talentweg wird geladen …');box.append(loading);
 try{
  const who=await uid();
  const [styleRows,questRows]=await Promise.all([
   api('/rest/v1/forever_character_styles?select=klasse,spezialisierung&user_id=eq.'+encodeURIComponent(who)),
   api('/rest/v1/forever_class_quest_progress?select=quest_key,status&user_id=eq.'+encodeURIComponent(who))
  ]);
  if(serial!==renderSerial||!box.isConnected)return;
  box.replaceChildren();
  box.append(E('h3','🌳 Mein Talentweg · '+character.klasse));
  box.append(E('p','Wähle zuerst selbst, wie du spielen willst. Erst danach erscheint die konkrete Empfehlung. Du kannst deine Wahl jederzeit ändern.'));
  const description=E('div',undefined,'grid');
  const stored=styleRows.find(x=>x.klasse===character.klasse)?.spezialisierung||'';
  const formerChoice=localStorage.getItem('forever-spec-'+page.id)||'';
  const current=specsFor(character.klasse).includes(stored)?stored:(specsFor(character.klasse).includes(formerChoice)?formerChoice:'');
  const sel=E('select');sel.setAttribute('aria-label','Persönliche Spezialisierung');
  sel.append(new Option('Spielstil selbst auswählen',''));
  for(const [name,desc] of Object.entries(treeDescriptions[character.klasse]||{})){
    const card=E('article',undefined,'card');
    card.style.padding='12px';card.style.margin='0';
    card.append(E('h4',name),E('p',desc));description.append(card);
    sel.append(new Option(name,name));
  }
  box.append(description);
  box.append(E('h4','Meine Entscheidung'));
  sel.value=specsFor(character.klasse).includes(current)?current:'';
  const saved=E('p',stored?'Deine Wahl ist in deinem Spielerkonto gespeichert.':(current?'Vorherige Gerätewahl gefunden. Bitte erneut auswählen, um sie im Spielerkonto zu speichern.':'Bitte wähle zunächst einen Talentbaum.'),'small');
  const saveButton=E('button','Diese Wahl im Konto speichern');saveButton.type='button';saveButton.className='primary';
  const selectionRow=row(box,sel,saveButton,saved);
  const result=E('div');box.append(result);
  function displayPlan(value){
    result.replaceChildren();
    if(!value){result.append(E('p','Ohne eigene Wahl gibt es keine vorgegebene Skillung.'));return}
    const plan=planFor(character.klasse,value,character.stufe);
    result.append(E('h4','🎯 Meine konkrete Skill-Empfehlung: '+value));
    result.append(E('p','Charakterstufe '+character.stufe+' · '+Math.max(0,character.stufe-9)+' mögliche Talentpunkte. Die Empfehlung ist freiwillig.'));
    if(!plan.steps.length){result.append(E('p','Für diesen Baum ist noch keine belastbare konkrete Talentfolge veröffentlicht. Keine Punkte raten.','small'));return}
    const current=E('div',undefined,'dungeon-goal');
    current.append(E('strong','Jetzt empfohlene Verteilung ('+plan.allocated.length+' Punkt'+(plan.allocated.length===1?'':'e')+')'));
    if(!plan.allocated.length)current.append(E('p','Erster Talentpunkt ab Stufe 10.'));
    for(const x of plan.aggregates.values())current.append(E('p',x.name+' – '+x.rank+'/'+x.max+' Punkte'));
    result.append(current);
    const upcoming=E('div',undefined,'dungeon-goal');
    upcoming.append(E('strong','Nächste Talente – Stufe für Stufe'));
    for(const x of plan.steps.filter(x=>x.level>character.stufe).slice(0,10))upcoming.append(E('p','Stufe '+x.level+': '+x.name+' '+x.rank+'/'+x.max));
    if(!plan.next)upcoming.append(E('p','Alle derzeit redaktionell geprüften Punkte sind erreicht. Noch keine sichere weitere Beta-Reihenfolge.'));
    result.append(upcoming);
    const details=E('details');details.append(E('summary','Gesamte aktuelle Punktfolge ('+plan.steps.length+' Stufen)'));
    const list=E('ol');
    for(const x of plan.steps)list.append(E('li','Stufe '+x.level+' – '+x.name+' '+x.rank+'/'+x.max));
    details.append(list);result.append(details);
    if(plan.unplanned)result.append(E('p','Für '+plan.unplanned+' verfügbare Punkte ist noch keine verlässlich geprüfte Folge hinterlegt. Bis Stufe 60 bitte keine genaue Beta-Skillung vortäuschen.','small'));
    result.append(E('p','Beta-Empfehlung, kein garantierter optimaler Build: Besonders bei neuen oder verschobenen Talenten muss die genaue Freischaltstufe erneut geprüft werden.','small'));
  }
  displayPlan(sel.value);
  async function saveChoice(){
    sel.disabled=true;saveButton.disabled=true;saved.textContent='Speichere Auswahl …';
    try{
      if(!sel.value){sel.value=current;saved.textContent='Wähle einen Talentbaum, um deinen gespeicherten Spielstil zu ändern.';return}
      await upsert('forever_character_styles',{user_id:who,klasse:character.klasse,spezialisierung:sel.value,updated_at:new Date().toISOString()},'user_id');
      saved.textContent='✓ Spielstil dauerhaft im Spielerkonto gespeichert';
      displayPlan(sel.value);
    }catch(error){sel.value=current;saved.textContent='Speicherung fehlgeschlagen: '+error.message}
    finally{sel.disabled=false;saveButton.disabled=false}
  }
  sel.onchange=saveChoice;saveButton.onclick=saveChoice;
  const questWrap=E('section');
  questWrap.append(E('h3','📜 Meine Klassenquests'));
  const available=applicableQuests(character.klasse,character.volk);
  const progress=new Map(questRows.map(x=>[x.quest_key,x.status]));
  if(!available.length){
    questWrap.append(E('p',character.klasse==='Paladin'
       ?'Für den neuen untoten Horde-Paladin sind konkrete, bestätigte Forever-Klassenquests derzeit noch nicht veröffentlicht. Die alte Allianz-Questreihe „Die Prüfung der Rechtschaffenheit“ wird hier absichtlich nicht fälschlich angezeigt.'
       :'Für diese Klassen-/Volkskombination gibt es in der geprüften Liste noch keine verlässlich beschriebenen Klassenquests.'));
  }
  for(const q of available){
    const [key,minLevel,title,giver,steps,reward,source]=q,card=E('article',undefined,'dungeon-goal');
    const id=character.klasse+':'+key;
    card.append(E('h4',(character.stufe<minLevel?'🔒 ':'')+title+' · ab Stufe '+minLevel));
    card.append(E('p','Questgeber / Ort: '+giver));
    card.append(E('p','Aufgabe: '+steps));
    card.append(E('p','Belohnung: '+reward));
    card.append(E('p','Datenlage: '+source,'small'));
    const accepted=E('input');accepted.type='checkbox';
    const done=E('input');done.type='checkbox';
    accepted.disabled=done.disabled=character.stufe<minLevel;
    let state=progress.get(id)||'offen';
    function sync(){accepted.checked=state==='angenommen'||state==='erledigt';done.checked=state==='erledigt'}
    sync();
    const one=E('label',undefined,'check');one.append(accepted,E('span','Quest angenommen'));
    const two=E('label',undefined,'check');two.append(done,E('span','Quest erledigt'));
    const status=E('p','Status: '+state,'small');
    async function setState(next){
      accepted.disabled=done.disabled=true;status.textContent='Speichere …';
      try{
        await upsert('forever_class_quest_progress',{user_id:who,quest_key:id,status:next,updated_at:new Date().toISOString()},'user_id,quest_key');
        state=next;status.textContent='✓ Gespeichert: '+state;sync();
      }catch(error){status.textContent='Konnte nicht speichern: '+error.message;sync()}
      finally{accepted.disabled=done.disabled=character.stufe<minLevel}
    }
    accepted.onchange=()=>setState(accepted.checked?'angenommen':'offen');
    done.onchange=()=>setState(done.checked?'erledigt':'angenommen');
    card.append(one,two,status);questWrap.append(card);
  }
  questWrap.append(E('p','Quellenstand 18.10.2026: Blizzard Classic, Zockify Forever-Dungeons und WoW Forever Codex für Untoten-Paladine. Classic-Vorlagen sind gekennzeichnet und können sich in Forever ändern.','small'));
  box.append(questWrap);
 }catch(error){
  box.replaceChildren(E('h3','🌳 Mein Talentweg'),E('p','Daten konnten nicht geladen werden: '+error.message));
 }
}
let queued=false;
function schedule(){
 if(queued)return;
 queued=true;
 Promise.resolve().then(()=>{queued=false;render().catch(console.error)});
}
const root=document.getElementById('players');
if(root){const mo=new MutationObserver(schedule);mo.observe(root,{childList:true});}
document.addEventListener('DOMContentLoaded',()=>{
 const r=document.getElementById('players');if(!r)return;
 const mo=new MutationObserver(schedule);mo.observe(r,{childList:true});
 schedule();
});
document.addEventListener('forever-maintenance-end',schedule);
})();
