/* ================= CAPITOLO 5 — MESCOLARE IL RISOTTO IN SENSO ANTIORARIO (Totò ha la fame maledetta, mescoli tu) ================= */
AV_TROPHIES.push(['mescola','Hai mescolato il risotto di nonna Gisella in senso antiorario. Il tempo è tornato indietro di tre minuti.','Stirred grandma Gisella\'s risotto anticlockwise. Time went back three minutes.']);
function avStirGame(rounds, secs){ return new Promise(res=>{ const ORD=[0,3,2,1]; let step=0, done=false, left=secs*10, rnd=0;
  const L=[['Su','Up'],['Destra','Right'],['Giù','Down'],['Sinistra','Left']];
  sheet(`<div style="text-align:center"><h3 style="margin:0 0 4px">${T('Mescola!','Stir!')}</h3><p style="margin:0 0 8px;font-size:13px">${T(`Gira il mestolo in senso ANTIORARIO: su, sinistra, giù, destra. ${rounds} giri prima che il riso attacchi.`,`Turn the ladle ANTICLOCKWISE: up, left, down, right. ${rounds} turns before the rice sticks.`)}</p>
   <div id="stS" style="font:700 18px Fredoka,sans-serif;margin-bottom:6px"></div><div style="height:10px;background:#2b2433;border-radius:6px;overflow:hidden;margin-bottom:10px"><div id="stT" style="height:100%;width:100%;background:#ffd166"></div></div>
   <div style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,56px);gap:6px;max-width:240px;margin:0 auto">
    <span></span><button type="button" data-d="0">${T('Su','Up')}</button><span></span>
    <button type="button" data-d="3">${T('Sinistra','Left')}</button><span id="stP" style="display:flex;align-items:center;justify-content:center;font-size:12px">${T('pentola','pot')}</span><button type="button" data-d="1">${T('Destra','Right')}</button>
    <span></span><button type="button" data-d="2">${T('Giù','Down')}</button><span></span></div></div>`);
  const sc=()=>{ $('stS').textContent=T(`Giri ${rnd}/${rounds}`,`Turns ${rnd}/${rounds}`); }; sc();
  const t=setInterval(()=>{ left--; const b=$('stT'); if (b) b.style.width=Math.max(0,left/(secs*10)*100)+'%'; if (left<=0) end(false); },100);
  function end(ok){ if (done) return; done=true; clearInterval(t); setTimeout(()=>{ closeSheet(); res(ok); },400); }
  document.querySelectorAll('#sheet [data-d]').forEach(b=>b.onpointerdown=e=>{ e.preventDefault(); if (done) return; const d=+b.dataset.d;
    if (d===ORD[step]){ step++; b.style.background='#7ad37a'; setTimeout(()=>b.style.background='',150); if (step===4){ step=0; rnd++; sc(); if (rnd>=rounds) end(true); } }
    else { step=0; b.style.background='#ff3b1c'; setTimeout(()=>b.style.background='',200); } }); }); }
(()=>{ const old=AV_S['c5|talk:toto']; AV_S['c5|talk:toto']=async(...a)=>{ const f=F();
  if (!f.risottoDone && ['ricetta','riso','zafferano','burro'].every(x=>avHas(x))){
    await np('toto','Hai tutto! Ma c\'è un problema: ho la fame maledetta. Se mescolo io, il risotto finisce nella mia bocca prima che nel piatto. Mescola tu. La ricetta dice: in senso antiorario, sempre. Io accendo il fuoco e mi lego le mani.','You\'ve got everything! But there\'s a problem: I have the cursed hunger. If I stir, the risotto ends up in my mouth before the plate. You stir. The recipe says: anticlockwise, always. I\'ll light the fire and tie my hands.');
    const ok=await (window.avStir||avStirGame)(5,20); if (!ok) return np('toto','Si è attaccato! Puzza di bruciato e di fallimento. Ricominciamo: ho altro riso nascosto nel materasso.','It stuck! Smells of burning and failure. Again: I have more rice hidden in my mattress.');
    ['ricetta','riso','zafferano','burro'].forEach(x=>avDel(x)); f.risottoDone=1; avSave(); avAdd('risotto'); avTrophy('mescola','Hai mescolato il risotto di nonna Gisella in senso antiorario. Il tempo è tornato indietro di tre minuti.','Stirred grandma Gisella\'s risotto anticlockwise. Time went back three minutes.');
    return np('toto','Profuma come nel 1987. Quasi piango, ma se apro la bocca lo mangio. Prendilo e portalo via, presto!','It smells like 1987. I nearly cry, but if I open my mouth I\'ll eat it. Take it away, quick!'); }
  return old(...a); }; })();
