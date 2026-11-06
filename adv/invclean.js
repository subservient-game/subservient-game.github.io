/* Pulizia dell'inventario sicura: un oggetto sparisce solo quando la storia ha registrato che ha finito il suo lavoro.
   Qui si restituiscono gli oggetti tolti per errore nelle partite già in corso.
   Gli oggetti inutili si eliminano solo tirandoli a Tonino. */
(()=>{ if (!window.ADV) return;
 window.AV_USED={};
 const RESTORE={
  1:{guanti:f=>!f.keys, retino:f=>!f.fished, brillantina:f=>!f.slick, baffi:f=>!f.disguise},
  2:{vero:f=>f.swapped && !(f.archivio && f.piece1)},
  3:{collana:f=>!f.necklaceOn, bussola:f=>!f.routeFound}
 };
 /* oggetti finiti: si tolgono SOLO quando la storia dice che hanno davvero finito il loro lavoro */
 const DONE=window.AV_DONE={
  1:{guanti:f=>f.keys, retino:f=>f.fished, brillantina:f=>f.slick, baffi:f=>f.disguise, ascia:f=>f.receipt&&f.wood, grappa:f=>f.ugoAwake&&(f.baffoTold||f.grappaGiven)&&f.pushups},
  2:{vero:f=>f.archivio&&f.piece1},
  3:{collana:f=>f.necklaceOn, bussola:f=>f.routeFound}
 };
 function tidy(){ try{ if (typeof CHN!=='function' || AV.busy) return; const tab=DONE[CHN()]; if (!tab) return; const f=F(); for (const [it,done] of Object.entries(tab)){ if (avHas(it) && done(f)){ avDel(it); try{ avToast('🗑️ '+avItemName(it)+(LANG==='it'?': non serve più, buttato.':': no longer needed, binned.')); }catch(e){} } } }catch(e){} }
 function heal(){ try{ if (typeof CHN!=='function' || !AV || !AV.st) return; const c=CHN(), f=F(), iu=f.__iu||{}; const tab=RESTORE[c]; if (!tab) return; let ch=false;
   for (const [it,need] of Object.entries(tab)){ const wasCleaned=Object.keys(iu).some(k=>k.startsWith(it+'|')); if (wasCleaned && !avHas(it) && need(f)){ avAdd(it); ch=true; } }
   if (ch){ avSave(); avRender(); } }catch(e){} }
 const od=window.avDo; window.avDo=async function(){ heal(); return od.apply(this,arguments); };
 setTimeout(heal,1500); setInterval(heal,5000); setInterval(tidy,1500);
})();
