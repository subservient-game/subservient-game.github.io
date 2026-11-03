/* Capitolo 1 — il berretto della Finanza: visibile appeso in bisca e in testa quando lo indossi */
(()=>{ const c1=()=>!(AV.st.ch>1);
 const capVis=()=>{ const f=F(); return c1() && !f.capOn && !avHas('berretto'); };
 const CAP_WALL=`<g class="avcapwall" transform="translate(122 98)"><line x1="0" y1="-16" x2="0" y2="-6" stroke="#8a6a3a" stroke-width="2"/><circle cx="0" cy="-16" r="2" fill="#c9a227"/>
  <path d="M-17 6 Q-18 -10 0 -11 Q18 -10 17 6 Z" fill="#4b5536" stroke="#1b2010" stroke-width="1.6"/><rect x="-17.5" y="2" width="35" height="5" fill="#262b1a"/>
  <path d="M-15 7 Q0 15 15 7 Q0 11 -15 7Z" fill="#111"/><path d="M-1 -1 q3 -5 0 -9 q5 3 3 9 q-1 2 -3 0Z" fill="#e6b422" stroke="#7a5a10" stroke-width=".6"/>
  <ellipse cx="0" cy="8" rx="20" ry="3" fill="#000" opacity=".25"/></g>`;
 const CAP_HEAD=`<g class="avcap"><path d="M-17.5 -27 Q-19 -45 0 -46 Q19 -45 17.5 -27 Z" fill="#4b5536" stroke="#1b2010" stroke-width="1.6"/><rect x="-18" y="-31" width="36" height="5" fill="#262b1a"/>
  <path d="M3 -27 Q17 -29.5 26 -24.5 Q15 -22.5 3 -25Z" fill="#111" stroke="#000" stroke-width=".6"/><path d="M-1 -36 q3 -5 0 -9 q5 3 3 9 q-1 2 -3 0Z" fill="#e6b422" stroke="#7a5a10" stroke-width=".6"/>
  <path d="M-12 -42 Q0 -45 12 -42" stroke="#fff" stroke-opacity=".18" stroke-width="2" fill="none"/></g>`;
 const wrapDraw=()=>{ const oldDraw=window.drawRoom; window.drawRoom=function(r){ const out=oldDraw.apply(this,arguments); try{ if (window.ADV && r==='bisca' && capVis()){ const g=document.createElementNS(NS,'g'); g.innerHTML=CAP_WALL; backL.appendChild(g); } }catch(e){} return out; }; try{ if (window.ADV && H.room==='bisca') drawRoom('bisca'); }catch(e){} };
 if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',wrapDraw); else wrapDraw();
 const oldLook=window.avApplyLook;
 window.avApplyLook=function(){ const r=oldLook.apply(this,arguments); try{ const old=J.cHat.querySelector('.avcap'); if (old) old.remove(); if (c1() && F().capOn){ const g=document.createElementNS(NS,'g'); g.innerHTML=CAP_HEAD; J.cHat.appendChild(g.firstChild); } }catch(e){} return r; };
 if (window.AV_HS && AV_HS.bisca) AV_HS.bisca.push(hs('capwall',122,94,44,40,'berretto della Finanza','Tax Police cap',capVis));
 avOn('look:capwall',()=>me('Appeso al muro, sopra il tavolo: un berretto della Finanza con la fiamma d\'oro. In una bisca. È come un crocifisso in un bordello.','On the wall above the table: a Tax Police cap with the gold flame. In a gambling den. Like a crucifix in a brothel.'));
 avOn('take:capwall open:capwall use:capwall',async()=>{ const n=npcOf('ercole'); if (n){ n.dir=H.X>n.X?1:-1; } return np('ercole','Giù le mani. Quel berretto è un trofeo. Se lo vuoi, te lo giochi a dadi con me. Parlamene.','Hands off. That cap is a trophy. Want it? You play me for it at dice. Talk to me.'); });
 const oldUse=AV_S['use:me:berretto']; AV_S['use:me:berretto']=async(...a)=>{ const r=await oldUse(...a); try{ avApplyLook(); }catch(e){} return r; };
 AV_S['use:berretto:me']=AV_S['use:me:berretto'];
})();
