/* WoW Forever · weitere Charaktere je Spielerkonto · 18.10.2026 */
(function(){
'use strict';
const BASE='https://tsfjsbjjqfpaaizikunv.supabase.co',KEY='sb_publishable_UOC11ecblHgQ1KErkraWBQ_7HuXJeyA';
const RACES={
'Untoter':['Magier','Paladin','Priester','Schurke','Hexenmeister','Krieger'],
'Tauren':['Druide','Jäger','Schamane','Krieger'],
'Orc':['Jäger','Magier','Schurke','Schamane','Hexenmeister','Krieger'],
'Troll':['Jäger','Magier','Priester','Schurke','Schamane','Hexenmeister','Krieger'],
'Himmelsgeborene (Horde)':['Druide','Jäger','Schurke','Schamane','Krieger']
};
const ROLES=['Flexibel','Tank','Heiler','Schaden'];
const tag=(x,v)=>{const el=document.createElement(x);if(v!==undefined)el.textContent=v;return el};
const sess=()=>{try{return JSON.parse(sessionStorage.getItem('forever-auth-v2')||'null')}catch{return null}};
async function request(resource,method='GET',data,headers={}){
 if(window.ForeverMaintenance?.blocked)throw Error('Wartung aktiv');
 const access=sess()?.access_token;if(!access)throw Error('Bitte anmelden');
 const r=await fetch(BASE+'/rest/v1/'+resource,{method,headers:{apikey:KEY,Authorization:'Bearer '+access,'Content-Type':'application/json',...headers},body:data===undefined?undefined:JSON.stringify(data),cache:'no-store'});
 const text=await r.text();let json;try{json=text?JSON.parse(text):null}catch{json=null}
 if(!r.ok)throw Error(json?.message||json?.error||'HTTP '+r.status);
 return json;
}
let renderKey='',inFlight=false;
function addInput(form,label,name,type='text',min,max){
 const outer=tag('label'),input=tag('input');outer.append(tag('span',label),input);
 input.name=name;input.type=type;if(min!==undefined)input.min=min;if(max!==undefined)input.max=max;
 if(name==='alias'){input.required=true;input.minLength=3;input.maxLength=32}
 form.append(outer);return input;
}
function addSelect(form,label,name,choices){
 const outer=tag('label'),sel=tag('select');sel.name=name;
 for(const val of choices)sel.add(new Option(val,val));
 outer.append(tag('span',label),sel);form.append(outer);return sel;
}
function setupRows(form,initial={}){
 form.className='grid forever-alts-form';
 const alias=addInput(form,'Charaktername','alias');
 const volk=addSelect(form,'Volk','volk',Object.keys(RACES));
 const klasse=addSelect(form,'Klasse','klasse',[]);
 const rolle=addSelect(form,'Rolle','rolle',ROLES);
 const stufe=addInput(form,'Stufe (1–60)','stufe','number',1,60);stufe.required=true;
 function refresh(){
   const last=klasse.value,options=RACES[volk.value]||[];
   klasse.replaceChildren();
   for(const k of options)klasse.add(new Option(k,k));
   if(options.includes(last))klasse.value=last;
 }
 volk.onchange=refresh;
 if(initial.volk)volk.value=initial.volk;refresh();
 if(initial.klasse && (RACES[volk.value]||[]).includes(initial.klasse))klasse.value=initial.klasse;
 alias.value=initial.alias||'';rolle.value=initial.rolle||'Flexibel';stufe.value=initial.stufe||1;
 return ()=>({alias:alias.value.trim(),volk:volk.value,klasse:klasse.value,rolle:rolle.value,stufe:Number(stufe.value)});
}
function ownPage(){return document.querySelector('#players #profile-wrapper')?.closest('.page')||null}
async function render(){
 const page=ownPage(),s=sess();if(!page||!s?.access_token)return;
 const tokenKey=s.access_token+'|'+page.id;
 if(page.querySelector('.forever-alt-characters'))return;
 const box=tag('article');box.className='card forever-alt-characters';
 box.append(tag('h3','🧙 Meine weiteren Charaktere'),
            tag('p','Lege Zweit-, Dritt- und Viertcharaktere an – oder weitere. Jeder Charakter hat eigene Klasse, Volk, Rolle und Stufe. Dein Hauptcharakter bleibt unverändert.'));
 const list=tag('div'),loading=tag('p','Charaktere laden …');list.append(loading);
 const create=tag('form'),getValues=setupRows(create);
 const submit=tag('button','Charakter hinzufügen');submit.type='submit';submit.className='primary';
 const msg=tag('p');msg.className='small';msg.setAttribute('role','status');
 create.append(submit,msg);
 const heading=tag('h4','Neuen Charakter anlegen');box.append(list,heading,create);
 const profession=page.querySelector('#personal-professions')?.closest('article');
 if(profession)page.insertBefore(box,profession);else page.append(box);
 const id=(await request('forever_members?select=user_id&limit=1'))?.[0]?.user_id;
 if(!id||!box.isConnected)return;
 async function load(){
   const all=await request('forever_alternative_characters?select=id,user_id,alias,volk,klasse,rolle,stufe&user_id=eq.'+encodeURIComponent(id)+'&order=created_at.asc');
   list.replaceChildren();
   if(!all?.length)list.append(tag('p','Noch keine weiteren Charaktere.','small'));
   for(const item of all){
     const card=tag('div');card.className='dungeon-goal';
     card.append(tag('strong',item.alias+' · '+item.volk+' · '+item.klasse+' · Stufe '+item.stufe));
     card.append(tag('p','Rolle: '+item.rolle));
     const edit=tag('details'),summary=tag('summary','Bearbeiten');edit.append(summary);
     const editForm=tag('form'),read=setupRows(editForm,item);
     const save=tag('button','Änderungen speichern');save.type='submit';save.className='secondary';
     const erase=tag('button','Charakter löschen');erase.type='button';erase.className='smallbtn';
     const status=tag('p');status.className='small';status.setAttribute('role','status');
     editForm.append(save,erase,status);edit.append(editForm);card.append(edit);list.append(card);
     editForm.onsubmit=async e=>{e.preventDefault();save.disabled=true;try{
       await request('forever_alternative_characters?id=eq.'+encodeURIComponent(item.id)+'&user_id=eq.'+encodeURIComponent(id),'PATCH',read(),{'Prefer':'return=minimal'});
       await load()
     }catch(err){status.textContent='Änderung nicht gespeichert: '+err.message}finally{save.disabled=false}};
     erase.onclick=async()=>{if(!confirm('Charakter '+item.alias+' wirklich löschen?'))return;erase.disabled=true;try{
       await request('forever_alternative_characters?id=eq.'+encodeURIComponent(item.id)+'&user_id=eq.'+encodeURIComponent(id),'DELETE',undefined,{'Prefer':'return=minimal'});
       await load()
     }catch(err){status.textContent='Löschen fehlgeschlagen: '+err.message}finally{erase.disabled=false}};
   }
 }
 create.onsubmit=async e=>{e.preventDefault();submit.disabled=true;msg.textContent='Speichere Charakter …';try{
   await request('forever_alternative_characters','POST',{user_id:id,...getValues()},{Prefer:'return=minimal'});
   create.reset();msg.textContent='✓ Neuer Charakter gespeichert.';await load();
 }catch(err){msg.textContent='Anlegen fehlgeschlagen: '+err.message}finally{submit.disabled=false}};
 try{await load()}catch(err){list.replaceChildren(tag('p','Charakterliste nicht erreichbar: '+err.message))}
}
function start(){const root=document.getElementById('players');if(!root)return;
 const observer=new MutationObserver(()=>render().catch(console.error));
 observer.observe(root,{childList:true});render().catch(console.error);
 document.addEventListener('forever-maintenance-end',()=>render().catch(console.error));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
