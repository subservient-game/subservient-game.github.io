/* ================= MANI: gli oggetti si prendono e si usano davvero =================
   - usare/dare/aprire con un oggetto dell'inventario: il protagonista lo tiene in mano per tutta l'azione
   - raccogliere qualcosa: appena entra nell'inventario lo si vede in mano
   - azioni con attrezzi (chitarra, spazzolino, spugna, scopa, padella): l'attrezzo è in mano, e se è un oggetto della stanza sparisce dal suo posto */
(()=>{ if (!window.ADV) return;
const POSE_PROP={ guitar:'guitar', brush:'toothbrush', scrub:'sponge', sweep:'broom', cook:'pan' };
let held=null, tok=0;
const redraw=()=>{ try{ drawRoom(H.room); }catch(e){} };
function showItem(id){ const ic=typeof AV_ICONS!=='undefined' && AV_ICONS[id]; if (!ic) return false; const wasG=H.bodyProp==='guitar'; setProp(null); if (wasG) redraw();
  J.propR.innerHTML=`<g id="propInner" transform="translate(-6 -13) scale(.26)">${typeof ic==='function'?ic():ic}</g>`; H.prop='avitem'; held=id; return true; }
function clearHand(){ held=null; const wasG=H.bodyProp==='guitar'; if (H.prop||H.bodyProp) setProp(null); if (wasG) redraw(); }
window.avHold=showItem; window.avDropHand=clearHand;
/* azione con oggetto */
const oDo=window.avDo;
window.avDo=async function(v,t,item){ const top=!AV.__hd; AV.__hd=(AV.__hd||0)+1; const my=++tok;
  try{ if (top && item && ['use','give','open'].includes(v)) showItem(item); return await oDo.apply(this,arguments); }
  finally{ AV.__hd--; if (top) setTimeout(()=>{ if (tok===my && !AV.__hd) clearHand(); }, 450); } };
/* raccogliere */
const oAdd=window.avAdd;
window.avAdd=function(id){ const r=oAdd.apply(this,arguments); if (AV.busy && AV.__hd) showItem(id); return r; };
/* attrezzi */
/* mangiare: un morso lento e poi si mastica con la bocca, le mani giù. La gomma non si tiene in mano: è in bocca */
document.addEventListener('DOMContentLoaded',()=>{ try{
  POSES.bite=P([{aR:-18,eR:150,head:-3},{aR:-16,eR:112,head:0}], 720, {usesR:1,face:'chewB'});
  FACES.chewA=['normal','flat','none']; FACES.chewB=['normal','wavy','none'];
  POSES.chew=P([{head:-.6,aR:-4,eR:12,aL:4,eL:-12},{head:.8,aR:-4,eR:12,aL:4,eL:-12}], 900, {face:'chewA'});
  setInterval(()=>{ try{ if (H.pose==='chew') setFace((Math.floor(performance.now()/240)%2)?'chewA':'chewB'); }catch(e){} },120);
}catch(e){} });
const oAct=window.meAct;
window.meAct=async function(pose,ms){
  if (pose==='eat' && typeof POSES!=='undefined' && POSES.chew){ ms=ms||1500; const gum=held==='gomma';
    if (gum) clearHand();
    else { setPose('bite'); await avWait(Math.min(800,ms*.4)); if (held) clearHand(); }
    await oAct('chew', gum?ms:ms*.6); return; }
  let set=null; if (!held){ const pr=POSE_PROP[pose]; if (pr){ setProp(pr); set=pr; if (pr==='guitar') redraw(); } }
  try{ return await oAct.apply(this,arguments); } finally{ if (set && (H.prop===set || H.bodyProp===set)){ setProp(null); if (set==='guitar') redraw(); } } };
/* guardare non è usare */
avOn('look:guitar',()=>me('La mia chitarra, sul suo supporto. Tre corde su sei. Le altre tre le ho vendute in un momento difficile.','My guitar, on its stand. Three strings out of six. I sold the other three in a hard moment.'));
avOn('look:telescope',()=>me('Un telescopio puntato sul paese. Ufficialmente per guardare le stelle. Ufficiosamente, il sindaco.','A telescope pointed at the town. Officially for stargazing. Unofficially, for the mayor.'));
avOn('look:bradio',()=>me('Una radio da campo militare, con cuffie e tasto del Morse. Ha più manopole di un aereo.','A military field radio, with headphones and a Morse key. More knobs than a plane.'));
const g=AV_S['use:guitar']; if (g) avOn('take:guitar',g);
})();
