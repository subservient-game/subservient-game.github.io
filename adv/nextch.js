/* Bottone "Inizia il prossimo capitolo" direttamente nella schermata di fine capitolo */
(()=>{ if (!window.ADV) return;
 const go=()=>{ const ok=document.getElementById('avEndOk'); if (!ok || document.getElementById('avNextCh')) return;
   const nx=CHN()+1, hasNext=nx===2?(typeof AV_INTRO2!=='undefined'&&!!AV_INTRO2):!!(AV_CHS[nx]&&AV_CHS[nx].intro); if (!hasNext) return;
   const it=LANG==='it', b=document.createElement('button'); b.type='button'; b.id='avNextCh'; b.style.cssText='width:100%;margin-bottom:8px;background:#c9a227';
   b.textContent='▶️ '+(it?(nx===6?'Inizia l\'Epilogo':'Inizia il Capitolo '+nx):(nx===6?'Start the Epilogue':'Start Chapter '+nx));
   b.onclick=()=>{ closeSheet(); setTimeout(()=>{ if (nx===2) avStartCh2(); else avStartChN(nx); },150); };
   ok.parentNode.insertBefore(b, ok); ok.textContent=it?'Più tardi':'Later'; };
 new MutationObserver(go).observe(document.body,{childList:true,subtree:true});
})();
