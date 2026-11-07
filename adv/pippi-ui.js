/* Pippi sempre visibili durante l'avventura, con animazione quando cambiano */
(()=>{ if (!window.ADV) return;
 const css=document.createElement('style'); css.textContent=`#advPippi{position:absolute;left:8px;top:8px;z-index:40;display:flex;align-items:center;gap:4px;padding:3px 9px 3px 5px;border-radius:999px;background:rgba(10,12,16,.55);color:#ffd166;font:700 14px Fredoka,sans-serif;text-shadow:0 1px 0 #000;pointer-events:auto;cursor:pointer;transition:transform .25s}
 #advPippi svg{width:20px;height:20px} #advPippi.up{transform:scale(1.25);color:#9cff9c} #advPippi.down{transform:scale(1.15);color:#ff8a80}
 #advPippi .d{position:absolute;left:100%;top:2px;margin-left:4px;font-size:13px;opacity:0;transition:opacity .3s,transform 1.2s;white-space:nowrap}
 #advPippi .d.show{opacity:1;transform:translateY(-10px)}`; document.head.appendChild(css);
 let el=null, last=null, tm=null;
 function ensure(){ const cam=document.getElementById('cam'); if (!cam) return null; if (!el||!el.isConnected){ el=document.createElement('div'); el.id='advPippi'; cam.appendChild(el); last=null;
   /* tocco sui Pippi: mostra tutto quello con cui si può interagire */
   const go=ev=>{ ev.stopPropagation(); ev.preventDefault(); try{ if (window.ADV && !AV.busy && !AV.dlg) avRevealAll(); }catch(e){} };
   el.addEventListener('pointerdown',ev=>ev.stopPropagation()); el.addEventListener('click',go); } return el; }
 function tick(){ const e=ensure(); if (!e || typeof LIFE==='undefined') return; const v=Math.round(LIFE.pippi||0); if (v===last) return;
   const ic=(typeof UI_IC==='function'?UI_IC('coin',20):'🪙');
   const diff=last==null?0:v-last; last=v; e.innerHTML=`${ic}<span>${v}</span>${diff?`<span class="d">${diff>0?'+':''}${diff}</span>`:''}`;
   if (diff){ e.classList.add(diff>0?'up':'down'); const d=e.querySelector('.d'); requestAnimationFrame(()=>d&&d.classList.add('show')); clearTimeout(tm); tm=setTimeout(()=>{ e.classList.remove('up','down'); const d2=e.querySelector('.d'); if (d2) d2.remove(); },1600); } }
 setInterval(tick,400); document.addEventListener('DOMContentLoaded',tick);
})();
