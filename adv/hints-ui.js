/* ================= SUGGERIMENTI POCO INVASIVI =================
   Una lampadina piccola e trasparente nell'angolo della scena. Si accende piano solo se sei fermo da un po'.
   Primo tocco: un indizio vago (dove andare / con chi parlare). Secondo tocco entro poco: il suggerimento completo.
   Il testo compare in una striscia sottile in fondo alla scena e sparisce da solo. */
(()=>{ if (!window.ADV) return;
  const css=document.createElement('style'); css.textContent=`
   #hintBulb{position:absolute;right:8px;top:8px;width:34px;height:34px;border-radius:50%;border:none;padding:4px;background:rgba(10,12,16,.35);opacity:.35;z-index:40;transition:opacity .4s,box-shadow .4s}
   #hintBulb.idle{opacity:.95;animation:hbGlow 2.4s ease-in-out infinite}
   @keyframes hbGlow{0%,100%{box-shadow:0 0 0 0 rgba(255,209,102,0)}50%{box-shadow:0 0 14px 4px rgba(255,209,102,.55)}}
   #hintStrip{position:absolute;left:8px;right:8px;bottom:8px;background:rgba(10,12,16,.82);color:#ffe9a8;font-size:13px;line-height:1.35;padding:7px 10px;border-radius:10px;z-index:41;opacity:0;transform:translateY(6px);transition:opacity .3s,transform .3s;pointer-events:none}
   #hintStrip.show{opacity:1;transform:none;pointer-events:auto}
   #hintStrip small{display:block;opacity:.6;font-size:11px;margin-top:2px}`;
  document.head.appendChild(css);
  const cam=document.getElementById('cam'); if (!cam) return;
  const b=document.createElement('button'); b.type='button'; b.id='hintBulb'; b.setAttribute('aria-label','Suggerimento'); try{ b.innerHTML=UI_IC('hint',26); }catch(e){ b.textContent='?'; } cam.appendChild(b);
  const s=document.createElement('div'); s.id='hintStrip'; cam.appendChild(s);
  let last='', lastT=Date.now(), level=0, levelT=0, hideT=null;
  const sig=()=>{ try{ return JSON.stringify([AV.st.ch, AV.st.f, AV.st.inv]); }catch(e){ return ''; } };
  setInterval(()=>{ if (!AV||!AV.st) return; const g=sig(); if (g!==last){ last=g; lastT=Date.now(); level=0; } b.classList.toggle('idle', Date.now()-lastT>4*60000); },3000);
  const vague=full=>{ const L=(typeof LANG!=='undefined'&&LANG==='it'); const names=[]; try{ Object.entries(AV_PLACES).forEach(([k,v])=>{ const n=v[L?1:2]; if (n && full.toLowerCase().includes(n.toLowerCase())) names.push(n); }); const C=(typeof CHT==='function'&&CHT())?CHT().CAST:((typeof CH2==='function'&&CH2())?AV_CAST2:AV_CAST); Object.values(C||{}).forEach(c=>{ const n=(c.name&&c.name[L?0:1]||'').split(/[ ,]/)[0]; if (n.length>2 && full.includes(n) && !names.includes(n)) names.push(n); }); }catch(e){}
    if (names.length) return L?`Pensa a: ${names.slice(0,2).join(', ')}.`:`Think about: ${names.slice(0,2).join(', ')}.`;
    return L?'Guarda bene intorno: qualcosa che non hai ancora provato a usare o a guardare.':'Look around carefully: something you haven\'t tried to use or look at yet.'; };
  const show=html=>{ s.innerHTML=html; s.classList.add('show'); clearTimeout(hideT); hideT=setTimeout(()=>s.classList.remove('show'),9000); };
  b.addEventListener('pointerdown',e=>{ e.preventDefault(); e.stopPropagation(); if (AV.busy||AV.dlg) return; const L=(typeof LANG!=='undefined'&&LANG==='it'); const full=avHint();
    if (level===0 || Date.now()-levelT>60000){ level=1; levelT=Date.now(); show(esc(vague(full))+`<small>${L?'Tocca di nuovo la lampadina per il suggerimento completo.':'Tap the bulb again for the full hint.'}</small>`); }
    else { level=0; try{ AV.st.hints=(AV.st.hints||0)+1; avSave(); }catch(e){} show(esc(full)); } });
  b.addEventListener('click',e=>{ e.stopPropagation(); });
  s.addEventListener('pointerdown',e=>{ e.stopPropagation(); s.classList.remove('show'); });
})();
