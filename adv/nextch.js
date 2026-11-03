/* Bottone "Inizia il prossimo capitolo" direttamente nella schermata di fine capitolo */
(()=>{ if (!window.ADV) return;
 const go=()=>{ const ok=document.getElementById('avEndOk'); if (!ok || document.getElementById('avNextCh')) return;
   const nx=CHN()+1, hasNext=nx===2?(typeof AV_INTRO2!=='undefined'&&!!AV_INTRO2):!!(AV_CHS[nx]&&AV_CHS[nx].intro); if (!hasNext) return;
   const it=LANG==='it', b=document.createElement('button'); b.type='button'; b.id='avNextCh'; b.style.cssText='width:100%;margin-bottom:8px;background:#c9a227';
   b.textContent='▶️ '+(it?(nx===6?'Inizia l\'Epilogo':'Inizia il Capitolo '+nx):(nx===6?'Start the Epilogue':'Start Chapter '+nx));
   b.onclick=()=>{ closeSheet(); setTimeout(()=>{ if (nx===2) avStartCh2(); else avStartChN(nx); },150); };
   ok.parentNode.insertBefore(b, ok); ok.textContent=it?'Più tardi':'Later'; };
 new MutationObserver(go).observe(document.body,{childList:true,subtree:true});

 /* tornare al capitolo precedente con gli oggetti di allora */
 window.avBackChapter=async function(){ const st=AV.st, prev=(st.ch||1)-1, sv=st['ch'+prev]; if (!sv) return;
   st['ch'+st.ch]=JSON.parse(JSON.stringify({f:st.f, inv:st.inv, open:st.open}));
   st.ch=prev; st.f=JSON.parse(JSON.stringify(sv.f||{})); st.inv=(sv.inv||[]).slice();
   let open=sv.open; if (!open){ const hs=prev===1?Object.keys(AV_HS):(prev===2?Object.keys(Object.assign({},AV_HS,window.AV_HS2||{})):Object.keys((AV_CHS[prev]||{}).HS||{})); open=[...new Set(hs)].filter(r=>AV_PLACES[r]); }
   st.open=open; const room=open.includes('piazza')?'piazza':open[0]; st.room=room; avSave(); closeSheet(); await avGo(room,true); avRender();
   try{ avToast(LANG==='it'?'↩️ Sei tornato al Capitolo '+prev+' con i tuoi oggetti.':'↩️ Back to Chapter '+prev+' with your items.'); }catch(e){} };
 const wrapMenu=()=>{ const om=window.avMenu; if (!om) return; window.avMenu=function(){ const r=om.apply(this,arguments); try{ const st=AV.st, prev=(st.ch||1)-1; if (prev>=1 && st['ch'+prev]){ const it=LANG==='it'; const b=document.createElement('button'); b.type='button'; b.className='ghost'; b.style.cssText='width:100%;margin-bottom:10px'; b.textContent='↩️ '+(it?'Torna al Capitolo '+prev+' con gli oggetti che avevi':'Back to Chapter '+prev+' with the items you had'); b.onclick=()=>avBackChapter(); const body=document.getElementById('sheetBody'); const h=body&&body.querySelector('h3'); if (h) h.after(b); } }catch(e){} return r; }; };
 if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',wrapMenu); else wrapMenu();
})();
