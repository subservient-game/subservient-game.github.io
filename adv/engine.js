/* ================= vAIn · AVVENTURA — motore punta e clicca ================= */
const AV = { verb:null, item:null, sel:null, isel:null, busy:false, npcs:[], st:null, dlg:null, skip:null };
const T=(it,en)=>LANG==='it'?it:(en||it);
const AVT=T;
const AV_VERBS=[['walk','Vai','Walk'],['look','Guarda','Look'],['take','Prendi','Pick up'],['use','Usa','Use'],['give','Dai','Give'],['talk','Parla','Talk'],['open','Apri','Open'],['map','Mappa','Map']];
/* content tables, filled by the chapter files */
const AV_ITEMS={}, AV_PLACES={}, AV_HS={}, AV_CAST={}, AV_S={}, AV_HINTS=[], AV_ENTER={}, AV_COINS={};
const AV_HS2={}, AV_CAST2={}, AV_HINTS2=[], AV_ENTER2={}; let AV_INTRO2=null, AV_TITLE2=['',''], AV_START2={room:'bedroom', open:[], keep:[]};
const CH2=()=>AV.st && AV.st.ch===2;
const CHN=()=>(AV.st && AV.st.ch)||1;
const AV_CHS={}; /* n -> {HS,CAST,HINTS,ENTER,intro,title,start,ended} */
function avChapter(n){ if (!AV_CHS[n]) AV_CHS[n]={HS:{},CAST:{},HINTS:[],ENTER:{},intro:null,title:['',''],start:{room:'living',open:[],keep:[]},ended:()=>false,townHs:false}; return AV_CHS[n]; }
function avOnN(n, keys, fn){ keys.trim().split(/\s+/).forEach(k=>AV_S['c'+n+'|'+k]=fn); }
const CHT=()=>CHN()>2?AV_CHS[CHN()]:null;
const castOf=id=>(CHT()&&CHT().CAST[id])||(CH2()&&AV_CAST2[id])||AV_CAST[id]||null;
function avOn2(keys, fn){ keys.trim().split(/\s+/).forEach(k=>AV_S['c2|'+k]=fn); }
let AV_START={room:'living', open:[]};
function avOn(keys, fn){ keys.trim().split(/\s+/).forEach(k=>AV_S[k]=fn); }
/* ---------- state ---------- */
function avSave(){ try{ localStorage.setItem('vainAdv1', JSON.stringify(AV.st)); }catch(e){} }
function avLoad(){ try{ AV.st=JSON.parse(localStorage.getItem('vainAdv1')||'null'); }catch(e){} if (!AV.st||AV.st.v!==2) AV.st={v:2, room:AV_START.room, inv:[], f:{}, open:AV_START.open.slice(), coins:[], tro:[], t0:Date.now(), play:0}; }
const avHas=i=>AV.st.inv.includes(i);
const F=()=>AV.st.f;
function avAdd(i){ if (!avHas(i)){ AV.st.inv.push(i); avToast('🎒 '+avItemName(i)); } avSave(); avRender(); }
function avDel(i){ AV.st.inv=AV.st.inv.filter(x=>x!==i); if (AV.item===i) AV.item=null; avSave(); avRender(); }
function avSwap(a,b){ const k=AV.st.inv.indexOf(a); if (k>=0) AV.st.inv[k]=b; else AV.st.inv.push(b); avSave(); avRender(); avToast('🎒 '+avItemName(b)); }
function avOpen(r){ if (!AV.st.open.includes(r)){ AV.st.open.push(r); avSave(); setTimeout(()=>avToast('🗺️ '+T('Nuovo luogo: ','New place: ')+AV_PLACES[r][LANG==='it'?1:2]),900); } }
function avTrophy(id, it, en){ if (AV.st.tro.includes(id)) return; AV.st.tro.push(id); avSave(); setTimeout(()=>avToast('🏆 '+T(it,en)),1400); }
function avCoin(id){ if (AV.st.coins.includes(id)) return false; AV.st.coins.push(id); avSave(); try{ LIFE.pippi+=5; saveLife(); }catch(e){} avToast('🪙 '+T('Pippi d\'oro trovato! ','Golden Pippi found! ')+AV.st.coins.length+'/'+Object.keys(AV_COINS).length);
  if (AV.st.coins.length===Object.keys(AV_COINS).length) avTrophy('coins','Tutti i Pippi d\'oro! Taccagno patentato.','All golden Pippi! Certified tightwad.'); return true; }
function avToast(t){ const el=$('advToast'); if(!el) return; el.innerHTML=esc(t).replace(/^🎒/,UI_IC('bag',18)).replace(/^🗺️/,UI_IC('map',18)).replace(/^🏆/,UI_IC('trophy',18)).replace(/^🪙/,UI_IC('coin',18)); el.classList.add('show'); clearTimeout(avToast.t); avToast.t=setTimeout(()=>el.classList.remove('show'),2600); }
const avItemName=i=>AV_ITEMS[i]?AV_ITEMS[i][LANG==='it'?1:2]:i;
const avName=t=>{ if (!t) return ''; if (t.type==='item') return avItemName(t.id).toLowerCase(); if (t.type==='self') return T('te stesso','yourself'); if (t.type==='npc') return castOf(t.id).name[LANG==='it'?0:1]; return t.n[LANG==='it'?0:1]; };
/* ---------- bar ---------- */
function avSentence(extra){ if (!AV.verb){ $('advLine').textContent=extra?extra:T('Scegli un\'azione, poi tocca qualcosa','Pick an action, then tap something'); return; }
  const v=AV_VERBS.find(x=>x[0]===AV.verb); let s=v[LANG==='it'?1:2];
  if (AV.item) s+=' '+avName({type:'item',id:AV.item})+' '+(AV.verb==='give'?T('a','to'):T('con','with'));
  if (extra) s+=' '+extra; $('advLine').textContent=s; }
function avRender(){
  if (!$('advVerbs')||!AV.st) return;
  if (AV.dlg){ $('advVerbs').style.display='none'; $('advInv').style.display='none'; $('advDlg').style.display=''; return; }
  $('advVerbs').style.display=''; $('advInv').style.display=''; $('advDlg').style.display='none';
  $('advVerbs').innerHTML=AV_VERBS.map(v=>`<button type="button" class="av${AV.verb===v[0]?' on':''}" data-v="${v[0]}">${v[0]==='map'?UI_IC('map',18)+' ':''}${v[LANG==='it'?1:2]}</button>`).join('');
  $('advInv').innerHTML=AV.st.inv.length ? AV.st.inv.map(i=>`<button type="button" class="ai${(AV.item===i||AV.isel===i)?' on':''}" data-i="${i}"><b>${avIcon(i)}</b><span>${avItemName(i)}</span></button>`).join('') : `<div class="aiempty">${T('Tasche vuote. Come il frigo.','Empty pockets. Like the fridge.')}</div>`;
  avSentence();
}
/* ---------- speech ---------- */
function avWait(ms){ return new Promise(res=>{ const t=setTimeout(done,ms); function done(){ clearTimeout(t); AV.skip=null; res(); } AV.skip=done; }); }
async function avSay(who, text){
  const el=$('advText'); const c=who==='me'?'#fff':(castOf(who)||{}).col||'#fff';
  const nm=who==='me'?H.name:(who==='voice'?'':(castOf(who)?castOf(who).name[LANG==='it'?0:1]:''));
  el.innerHTML=`${nm?`<b style="color:${c}">${esc(nm)}</b> `:''}<span style="color:${who==='voice'?'#ffd166':c}">${esc(text)}</span>`; el.classList.add('show');
  const n=(who==='me'||who==='voice')?null:AV.npcs.find(x=>x.avId===who);
  if (n){ n.dir=H.X>n.X?1:-1; if (!n.keep) npcPose(n, Math.random()<.5?'point':'present','happy'); } else if (who==='me' && !H.seat && !H.lying){ if (['idle','point','present'].includes(H.pose)) setPose(Math.random()<.5?'point':'present'); }
  let rows=1; try{ const sp=el.lastElementChild, cs=getComputedStyle(sp), lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.3; const r=sp.getClientRects(); rows=Math.max(1, r.length>1?r.length:Math.round(sp.getBoundingClientRect().height/lh)); }catch(e){ rows=Math.max(1,Math.ceil(text.length/45)); }
  await avWait(rows*2000);
  if (n && !n.keep) npcPose(n,'idle'); else if (who==='me' && ['point','present'].includes(H.pose)) setPose('idle');
  el.classList.remove('show');
}
const me=(it,en)=>avSay('me',T(it,en));
const np=(w,it,en)=>avSay(w,T(it,en));
async function avLines(arr){ for (const [w,it,en] of arr) await avSay(w, T(it,en)); }
function avChoose(opts){ return new Promise(res=>{ AV.dlg=true; avRender();
  $('advDlg').innerHTML=opts.map((o,i)=>`<button type="button" data-o="${i}">${esc(Array.isArray(o)?T(o[0],o[1]):o)}</button>`).join('');
  $('advDlg').querySelectorAll('button').forEach(b=>b.onclick=()=>{ AV.dlg=null; avRender(); res(+b.dataset.o); }); }); }
/* dialogue tree: topics = [{q:[it,en], when:()=>bool, once:bool, id, run:async()=>{} , bye:true}] */
async function avTalk(who, topics){
  const asked=F()['asked_'+who]=F()['asked_'+who]||[];
  while (true){
    const list=topics.filter(t=>(!t.when||t.when()) && !(t.once && asked.includes(t.id)));
    const o=await avChoose(list.map(t=>t.q).concat([['Ciao.','Bye.']]));
    if (o===list.length) return;
    const t=list[o]; if (t.id && !asked.includes(t.id)){ asked.push(t.id); avSave(); }
    await avSay('me', T(t.q[0],t.q[1]));
    const r=await t.run(); if (t.bye || r==='bye') return;
  }
}
function npcOf(id){ return AV.npcs.find(x=>x.avId===id); }
async function npcAct(id, pose, ms, face){ const n=npcOf(id); if (!n) return; n.keep=1; npcPose(n,pose,face||'happy'); await avWait(ms||1500); n.keep=0; npcPose(n,'idle'); }
async function meAct(pose, ms){ setPose(pose); await avWait(ms||1500); setPose('idle'); }
/* ---------- rooms ---------- */
function avSpawn(r){
  AV.npcs.forEach(n=>removeNPC(n)); AV.npcs=[];
  for (const [id,c] of Object.entries(CHT()?CHT().CAST:(CH2()?AV_CAST2:AV_CAST))){ if (c.room!==r) continue; if (c.gone && c.gone()) continue;
    const n=makeNPC({name:c.name[LANG==='it'?0:1], kind:c.kind, room:r, x:c.x}); n.avId=id; n.look={...c.look, kind:c.kind}; npcLook(n, n.look); n.dir=c.dir||-1; if (c.costume) try{ costumeNPC(n, c.costume.hat||'', c.costume.torso||''); }catch(e){} npcPose(n,c.pose||'idle'); if (c.pose) n.keep=1; AV.npcs.push(n); }
}
function avApplyLook(){ const f=F();
  try { if (f.trench){ holG.style.setProperty('--outfit','#b08a5a'); holG.style.setProperty('--outfitD','#8a6a40'); applyStyle(holG, J, {...(H.look||{}), top:'jacket', bottom:(H.look||{}).bottom||'pants'}, H.kind); } } catch(e){}
  try { const old=J.cTorso.querySelector('.avrose'); if (old) old.remove(); if (f.roseOn){ const g=document.createElementNS(NS,'g'); g.setAttribute('class','avrose'); g.innerHTML=`<path d="M-9 -30 L-12 -20" stroke="#3f7a3a" stroke-width="1.6"/><path d="M-11 -25 q-4 -1 -5 2 q3 1 5 -2Z" fill="#4f9a4a" stroke="#2b2b2b" stroke-width=".8"/><circle cx="-8" cy="-32" r="4.2" fill="#d64545" stroke="#2b2b2b" stroke-width="1"/><path d="M-10 -33 q2 2 4 0 M-9 -31 q1 1 2 0" stroke="#8a1a1a" stroke-width=".9" fill="none"/>`; J.cTorso.appendChild(g); } } catch(e){}
  try { if (f.disguise) J.beard.innerHTML=beardSVG({...(H.look||{}), beard:'mustache', hairColor:'#2b2b2b'}); } catch(e){}
  try { if (f.slick){ const L={...(H.look||{}), hair:'slick'}; J.hairBack.innerHTML=hairSVG(L,'back'); J.hairFront.innerHTML=hairSVG(L,'front'); } } catch(e){} }
async function avGo(r, first){
  if (AV.busy && !first) return;
  const EN=CHT()?CHT().ENTER:(CH2()?AV_ENTER2:AV_ENTER); const gate=EN[r] && EN[r].before; if (!first && gate){ AV.busy=true; let ok; try{ ok=await gate(); } finally{ AV.busy=false; } if (ok===false) return; }
  setRoom(r); try{ musRoom(r); document.body.classList.toggle('island',['isola','giungla','laguna','villaggio','vulcano','grotta'].includes(r)); }catch(x){} AV.st.room=r; avSave(); H.X=(EN[r]&&EN[r].x)||60; H.destX=null; avSpawn(r); try{ H.X=freeSpot(H.X,'me'); }catch(x){} camX=H.X; avApplyLook(); closeSheet(); avRender();
  if (first) return;
  const after=EN[r] && EN[r].after; if (after){ AV.busy=true; try{ await after(); } catch(e){ console.log(e); } finally{ AV.busy=false; avRender(); } }
}
function avGoLater(r){ const t=setInterval(()=>{ if (!AV.busy && !AV.dlg){ clearInterval(t); avGo(r); } },80); }
function avKick(r){ setRoom(r); try{ musRoom(r); }catch(x){} AV.st.room=r; avSave(); H.X=60; camX=60; avSpawn(r); avApplyLook(); avRender(); }
function avMap(){
  const it=LANG==='it';
  sheet(`<h3 style="margin:0 0 10px">${UI_IC('map',26)} ${it?'Dove vai?':'Where to?'}</h3><div class="mtiles">${AV.st.open.map(r=>`<button type="button" class="mtile${r===H.room?' on':''}" data-avgo="${r}"><span class="me">${UI_IC(r,34)||AV_PLACES[r][0]}</span><span>${AV_PLACES[r][it?1:2]}</span></button>`).join('')}</div><button type="button" class="ghost close" id="avClose" style="width:100%;margin-top:10px">✕ ${it?'Chiudi':'Close'}</button>`);
  $('avClose').onclick=()=>closeSheet();
  $('sheetBody').querySelectorAll('[data-avgo]').forEach(b=>b.onclick=()=>{ const r=b.dataset.avgo; closeSheet(); if (r!==H.room) avGo(r); });
}
function avMenu(){
  const it=LANG==='it', st=AV.st, mins=Math.round((st.play||0)/60000);
  const nx=CHN()+1, ended=(CHN()===1?AV.st.f.endDone:(CHN()===2?AV.st.f.end2:(AV_CHS[CHN()]&&AV_CHS[CHN()].ended()))), hasNext=nx===2?!!AV_INTRO2:!!(AV_CHS[nx]&&AV_CHS[nx].intro);
  sheet(`<h3 style="margin:0 0 6px">🗺️ ${(CHT()?CHT().title:(CH2()?AV_TITLE2:AV_TITLE))[it?0:1]}</h3>${(ended && hasNext)?`<button type="button" id="avCh2" style="width:100%;margin-bottom:10px;background:#c9a227">▶️ ${it?(nx===6?'Inizia l\'Epilogo':'Inizia il Capitolo '+nx):(nx===6?'Start the Epilogue':'Start Chapter '+nx)}</button>`:''}
   <p style="opacity:.8;font-size:14px;margin:0 0 8px">${it?'Tocca un\'azione, poi una cosa o una persona. Senza azione, toccando la scena vedi cosa si può usare. Per "Usa" e "Dai" scegli prima un oggetto; "Usa" + oggetto + altro oggetto li combina.':'Tap an action, then a thing or person. With no action, tapping the scene shows what you can use. For "Use" and "Give" pick an item first; "Use" + item + another item combines them.'}</p>
   <p style="font-size:13px;margin:0 0 10px">⏱️ ${mins} min · ${UI_IC('coin',16)} ${st.coins.length}/${Object.keys(AV_COINS).length} · ${UI_IC('trophy',16)} ${st.tro.length}</p>
   <button type="button" id="avHint" style="width:100%;margin-bottom:8px">${UI_IC('hint',20)} ${it?'Suggerimento':'Hint'}</button>
   <button type="button" id="avTro" class="ghost" style="width:100%;margin-bottom:8px">${UI_IC('trophy',20)} ${it?'Trofei':'Trophies'}</button>
   <button type="button" id="avRestart" class="ghost" style="width:100%;margin-bottom:8px;color:#ff8a80">${it?'Ricomincia l\'avventura':'Restart the adventure'}</button>
   <button type="button" id="avExit" class="ghost" style="width:100%">🌐 ${it?'Torna al gioco online':'Back to the online game'}</button>
   <button type="button" class="ghost close" id="avClose" style="width:100%;margin-top:8px">✕ ${it?'Chiudi':'Close'}</button>`);
  $('avClose').onclick=()=>closeSheet(); if ($('avCh2')) $('avCh2').onclick=()=>{ closeSheet(); if (nx===2) avStartCh2(); else avStartChN(nx); };
  $('avHint').onclick=()=>{ closeSheet(); st.hints=(st.hints||0)+1; avSave(); avSay('me', avHint()); };
  $('avTro').onclick=()=>{ sheet(`<h3>🏆 ${it?'Trofei':'Trophies'}</h3>${AV_TROPHIES.map(t=>`<p style="margin:6px 0;${st.tro.includes(t[0])?'':'opacity:.35'}">${st.tro.includes(t[0])?'🏆':'🔒'} ${it?t[1]:t[2]}</p>`).join('')}<button type="button" class="ghost close" id="avClose2" style="width:100%;margin-top:8px">✕ ${it?'Chiudi':'Close'}</button>`); $('avClose2').onclick=()=>closeSheet(); };
  $('avRestart').onclick=()=>{ sheet(`<p>${it?'Sicuro? Perdi tutti i progressi dell\'avventura.':'Sure? You lose all adventure progress.'}</p><button type="button" id="avRy" style="width:100%;margin-bottom:8px;background:#c0392b">${it?'Sì, ricomincia':'Yes, restart'}</button><button type="button" class="ghost" id="avRn" style="width:100%">${it?'No':'No'}</button>`); $('avRy').onclick=()=>{ try{ localStorage.removeItem('vainAdv1'); }catch(e){} location.reload(); }; $('avRn').onclick=()=>closeSheet(); };
  $('avExit').onclick=()=>{ location.hash=''; location.reload(); };
}
function avHint(){ const x=(CHT()?CHT().HINTS:(CH2()?AV_HINTS2:AV_HINTS)).find(h=>h[0]()); return x? T(x[1],x[2]) : T('Non ho idee. Guarda tutto, parla con tutti, prova a combinare le cose.','No ideas. Look at everything, talk to everyone, try combining things.'); }
const AV_NOPE=[['Non credo funzioni.','I don\'t think that works.'],['Preferirei di no.','I\'d rather not.'],['Non ha senso nemmeno per me.','That makes no sense even to me.'],['Sì, e poi? No.','Sure, and then? No.'],['Mia madre non approverebbe. Mia madre non approva niente, comunque.','My mother wouldn\'t approve. She approves of nothing anyway.'],['Bella idea. Sbagliata, ma bella.','Nice idea. Wrong, but nice.'],['Neanche da ubriaco.','Not even drunk.'],['Il mio cervello dice no. Il mio fegato pure.','My brain says no. So does my liver.']];
function avNope(){ const x=AV_NOPE[Math.floor(Math.random()*AV_NOPE.length)]; return me(x[0],x[1]); }
async function avDo(verb, t, item){
  const id=t.id;
  const keys = item ? [verb+':'+id+':'+item, (t.type==='item'?verb+':'+item+':'+id:null), verb+':'+id+':*', '*:'+id+':'+item] : [verb+':'+id, '*:'+id];
  if (CHN()>1){ const pre='c'+CHN()+'|'; for (const k of keys){ if (k && AV_S[pre+k]) return AV_S[pre+k](t, item, verb); } }
  for (const k of keys){ if (k && AV_S[k]) return AV_S[k](t, item, verb); }
  if (window.avDefault) return avDefault(verb, t, item);
  return avNope();
}
/* ---------- taps ---------- */
function avMark(x,y,w,h,label){ const g=document.createElementNS(NS,'g'); g.setAttribute('class','avmark'); g.innerHTML=`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="8" fill="#ffd166" fill-opacity=".12" stroke="#ffd166" stroke-width="2" stroke-dasharray="5 4"/>`+(label?`<text x="${x}" y="${Math.max(14,y-h/2-4)}" text-anchor="middle" font-size="14" font-weight="700" fill="#ffd166" stroke="#000" stroke-width="3" paint-order="stroke" font-family="Fredoka, sans-serif">${esc(label)}</text>`:''); scene.appendChild(g); return g; }
function avClearMarks(){ scene.querySelectorAll('.avmark').forEach(e=>e.remove()); }
function avHsList(){ const ct=CHT(); const base=(ct && !ct.townHs)?[]:(AV_HS[H.room]||[]), extra=ct?(ct.HS[H.room]||[]):(CH2()?(AV_HS2[H.room]||[]):[]); const ids=new Set(extra.map(h=>h.id)); return extra.concat(base.filter(h=>!ids.has(h.id))).filter(h=>!h.when||h.when()); }
function avHighlight(t, keep){ avClearMarks(); if (t.type==='hs'){ const h=avHsList().find(x=>x.id===t.id); avMark(h.x,h.y,h.w,h.h,avName(t)); } else if (t.type==='npc'){ const n=npcOf(t.id); avMark(n.X,STAND-60,56,130,avName(t)); } else { avMark(H.X,STAND-60,56,130,avName(t)); } clearTimeout(avHighlight.t); if (!keep) avHighlight.t=setTimeout(avClearMarks,1800); }
function avRevealAll(){ avClearMarks(); avHsList().forEach(h=>avMark(h.x,h.y,h.w,h.h,h.n[LANG==='it'?0:1])); AV.npcs.filter(n=>n.room===H.room).forEach(n=>avMark(n.X,STAND-60,56,130,castOf(n.avId).name[LANG==='it'?0:1])); clearTimeout(avHighlight.t); avHighlight.t=setTimeout(avClearMarks,2500); }
function avHsAt(x,y){ return avHsList().find(h=>Math.abs(x-h.x)<=h.w/2+6 && Math.abs(y-h.y)<=h.h/2+6); }
async function avRun(v, t, item){
  AV.busy=true;
  try {
    if (t.type==='hs' || t.type==='npc'){ const tx=clamp(t.x+(H.X<t.x?-48:48),30,450); const id=++runId; if (Math.abs(H.X-tx)>8) await walkTo(tx, id); setPose('idle'); H.dir=t.x>=H.X?1:-1; }
    await avDo(v, t, item);
  } catch(err){ console.log(err); }
  finally { AV.busy=false; AV.item=null; AV.verb=null; AV.sel=null; AV.isel=null; AV.pendT=null; avRender(); }
}
async function avTap(e){
  if (AV.dlg) return;
  if (AV.busy){ if (AV.skip) AV.skip(); return; }
  if (e.target.closest('.mini')){ avMap(); return; }
  if (!e.target.closest('#cam')) return; avClearMarks();
  const pt=scene.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY; const sp=pt.matrixTransform(scene.getScreenCTM().inverse());
  const n=AV.npcs.find(x=>x.room===H.room && x.g.contains(e.target));
  let t=null;
  if (n) t={type:'npc', id:n.avId, x:n.X};
  else if (holG.contains(e.target)) t={type:'self', id:'me', x:H.X};
  else { const h=avHsAt(sp.x, sp.y); if (h) t={type:'hs', id:h.id, n:h.n, x:h.x}; }
  const verb=AV.verb;
  if (!verb){ if (t){ AV.sel=t; AV.isel=null; avRender(); avHighlight(t, true); $('advLine').textContent=avName(t).replace(/^./,c=>c.toUpperCase())+' — '+T('scegli un\'azione','pick an action'); } else { AV.sel=null; avRevealAll(); $('advLine').textContent=T('Scegli un\'azione','Pick an action'); } return; }
  if (verb==='walk'){ AV.item=null; AV.verb=null; avRender(); const id=++runId; walkTo(clamp(t?t.x:sp.x,30,450), id).then(()=>{ if (alive(id)) setPose('idle'); }); return; }
  if (!t){ avRevealAll(); return; }
  if (verb==='give' && !AV.item){ avSentence(avName(t)); return me('Dare cosa? Scegli prima un oggetto.','Give what? Pick an item first.'); }
  avSentence(avName(t)); avRun(verb, t, AV.item);
}
function avBar(){
  $('advVerbs').addEventListener('click', e=>{ const b=e.target.closest('[data-v]'); if(!b) return; const v=b.dataset.v; if (AV.busy) { if (AV.skip) AV.skip(); return; }
    if (v==='map') return avMap();
    if (AV.sel){ const t=AV.sel; AV.sel=null; avClearMarks();
      if (v==='walk'){ AV.verb=null; avRender(); const id=++runId; walkTo(clamp(t.x,30,450), id).then(()=>{ if (alive(id)) setPose('idle'); }); return; }
      if (v==='give'){ AV.verb='give'; AV.item=null; AV.pendT=t; avRender(); $('advLine').textContent=T('Dai... cosa? Tocca un oggetto dell\'inventario','Give... what? Tap an inventory item'); return; }
      AV.verb=v; avSentence(avName(t)); avRun(v, t, null); return; }
    if (AV.isel){ const i=AV.isel; AV.isel=null;
      if (v==='use'||v==='give'){ AV.verb=v; AV.item=i; avRender(); return; }
      AV.verb=v; avSentence(avItemName(i).toLowerCase()); avRun(v, {type:'item', id:i}, null); return; }
    AV.verb = AV.verb===v ? null : v; if (v!=='use' && v!=='give') AV.item=null; avRender(); });
  $('advInv').addEventListener('click', e=>{ const b=e.target.closest('[data-i]'); if(!b||AV.busy) return; const i=b.dataset.i;
    if (AV.verb==='give' && AV.pendT && !AV.item){ const t=AV.pendT; AV.pendT=null; avSentence(avName(t)); avRun('give', t, i); return; }
    if (!AV.verb){ AV.isel = AV.isel===i ? null : i; AV.sel=null; avClearMarks(); avRender(); if (AV.isel) $('advLine').textContent=avItemName(i)+' — '+T('scegli un\'azione','pick an action'); return; }
    if ((AV.verb==='use'||AV.verb==='give') && !AV.item){ AV.item=i; avRender(); return; }
    if (AV.verb==='use' && AV.item && AV.item!==i){ const it=AV.item; avSentence(avName({type:'item',id:i})); avRun('use', {type:'item', id:i}, it); return; }
    if (AV.item===i){ AV.item=null; avRender(); return; }
    avSentence(avItemName(i).toLowerCase()); AV.verb=AV.verb||'look'; avRun(AV.verb, {type:'item', id:i}, null); });
  $('advText').addEventListener('pointerdown', ()=>{ if (AV.skip) AV.skip(); });
  setInterval(()=>{ if (!document.hidden && AV.st){ AV.st.play=(AV.st.play||0)+5000; if (AV.st.play%60000<5000) avSave(); } }, 5000);
}
/* ---------- generic UI pieces ---------- */
function avCode(len, title){ return new Promise(res=>{ const d=Array(len).fill(0);
  const draw=()=>{ sheet(`<h3 style="margin:0 0 10px">${title}</h3><div style="display:flex;justify-content:center;gap:10px;margin-bottom:14px">${d.map((x,i)=>`<div style="display:flex;flex-direction:column;gap:6px;align-items:center"><button type="button" data-u="${i}" style="width:54px">▲</button><div style="font:700 34px 'JetBrains Mono',monospace;background:#111;border-radius:8px;width:54px;text-align:center;padding:6px 0;color:#ffd166">${x}</div><button type="button" data-d="${i}" style="width:54px">▼</button></div>`).join('')}</div><button type="button" id="avCodeOk" style="width:100%;margin-bottom:8px">${T('Prova','Try')}</button><button type="button" class="ghost" id="avCodeNo" style="width:100%">${T('Lascia stare','Never mind')}</button>`);
    $('sheetBody').querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{ d[+b.dataset.u]=(d[+b.dataset.u]+1)%10; draw(); });
    $('sheetBody').querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{ d[+b.dataset.d]=(d[+b.dataset.d]+9)%10; draw(); });
    $('avCodeOk').onclick=()=>{ closeSheet(); res(d.join('')); }; $('avCodeNo').onclick=()=>{ closeSheet(); res(null); }; };
  draw(); }); }
async function avStartCh2(){ const st=AV.st; st.ch1=JSON.parse(JSON.stringify({f:st.f, inv:st.inv})); st.ch=2; st.f={c1end:1, intro:1}; st.inv=st.inv.filter(i=>AV_START2.keep.includes(i)); st.open=AV_START2.open.slice(); st.room=AV_START2.room; st.hints=0; st.play2=0; avSave(); await avGo(st.room, true); avRender(); if (AV_INTRO2){ AV.busy=true; try{ await AV_INTRO2(); } finally { AV.busy=false; avRender(); } } }
async function avStartChN(n){ const st=AV.st, C=AV_CHS[n]; st['ch'+st.ch]=JSON.parse(JSON.stringify({f:st.f, inv:st.inv})); st.ch=n; st.f={intro:1}; st.inv=st.inv.filter(i=>C.start.keep.includes(i)); st.open=C.start.open.slice(); st.room=C.start.room; st.hints=0; avSave(); await avGo(st.room, true); avRender(); if (C.intro){ AV.busy=true; try{ await C.intro(); } finally { AV.busy=false; avRender(); } } }
async function avStart(){
  document.body.classList.add('adv'); avLoad(); avBar(); try{ $('advMusic').innerHTML=UI_IC(MUS.on?'musicOn':'musicOff',22); $('advMusic').onclick=e=>{ e.stopPropagation(); musToggle(); }; }catch(x){}
  $('title').innerHTML=`vAIn <span>${T('Avventura','Adventure')}</span>`;
  try { applyCostume('pajamas'); setProp(null); } catch(e){}
  await avGo(AV.st.room||AV_START.room, true); avRender(); setTimeout(()=>window.fitCam&&fitCam(),50);
  if (!F().intro){ F().intro=1; avSave(); AV.busy=true; try { await AV_INTRO(); } finally { AV.busy=false; avRender(); } }
}
