/* ================= CAPITOLO 1 — LA RASATURA: Salvatore ha le mani che tremano, rasi tu il cliente ================= */
AV_TROPHIES.push(['rasatura','Hai rasato un cliente senza tagliargli la gola. Salvatore ti ha offerto un lavoro.','Shaved a customer without slitting his throat. Salvatore offered you a job.']);
const c1u=()=>!(AV.st.ch>1);
function avShaveGame(goal){ return new Promise(res=>{ let hits=0, miss=0, pos=0, dir=1, done=false, zone=0;
  sheet(`<div style="text-align:center"><h3 style="margin:0 0 4px">${T('Rasatura!','Shave!')}</h3><p style="margin:0 0 8px;font-size:13px">${T(`Tocca quando il rasoio è sulla zona verde. ${goal} passate pulite; tre tagli e il cliente scappa.`,`Tap when the razor is over the green zone. ${goal} clean strokes; three cuts and the customer runs.`)}</p>
   <div style="position:relative;height:34px;background:#f1d3b3;border:2px solid #2b2b2b;border-radius:10px;overflow:hidden;margin-bottom:8px"><div id="shZ" style="position:absolute;top:0;bottom:0;background:#7ad37a"></div><div id="shR" style="position:absolute;top:2px;bottom:2px;width:8px;background:#cfd6de;border:2px solid #2b2b2b;border-radius:3px"></div></div>
   <div id="shS" style="font:700 18px Fredoka,sans-serif;margin-bottom:8px"></div>
   <button type="button" id="shB" style="width:100%;padding:22px 0;font-size:20px">${T('PASSATA!','STROKE!')}</button></div>`);
  const newZone=()=>{ zone=10+Math.random()*60; const z=$('shZ'); if (z){ z.style.left=zone+'%'; z.style.width=(22-hits*2)+'%'; } };
  const score=()=>{ $('shS').textContent=T(`Passate ${hits}/${goal} — Tagli ${miss}/3`,`Strokes ${hits}/${goal} — Cuts ${miss}/3`); };
  newZone(); score();
  const t=setInterval(()=>{ pos+=dir*(1.6+hits*0.35); if (pos>=96){ pos=96; dir=-1; } if (pos<=0){ pos=0; dir=1; } const r=$('shR'); if (r) r.style.left=pos+'%'; },16);
  $('shB').onpointerdown=e=>{ e.preventDefault(); if (done) return; const w=22-hits*2; if (pos+2>=zone && pos+2<=zone+w){ hits++; } else { miss++; } score(); newZone();
    if (hits>=goal||miss>=3){ done=true; clearInterval(t); const ok=hits>=goal; setTimeout(()=>{ closeSheet(); res(ok); },600); } }; }); }
const salvPettineOrig=AV_S['give:salvatore:pettine'];
AV_S['give:salvatore:pettine']=async(...a)=>{ const f=F();
  if (c1u() && !f.shaveDone){ avDel('pettine'); f.pettineHeld=1; avSave(); await npcAct('salvatore','cheer',1200);
    await np('salvatore','IL MIO PETTINE! Grazie! Ora ti dico la parola... no, aspetta. Prima devo finire Nonno Peppe, ce l\'ho in poltrona da stamattina con mezza faccia rasata. Ma guarda le mie mani: tremano. Ieri sera ho bevuto. E stamattina. Rasalo tu, va.','MY COMB! Thanks! Now I\'ll tell you the word... no, wait. First I have to finish Grandpa Peppe, he\'s been in the chair since this morning with half a face shaved. But look at my hands: shaking. I drank last night. And this morning. You shave him, go on.');
    return me('Io? Rasare un novantenne con un rasoio a mano libera? Se sbaglio è omicidio colposo. Se non sbaglio è pure peggio: mi chiederanno di rifarlo.','Me? Shave a ninety-year-old with a cut-throat razor? If I slip it\'s manslaughter. If I don\'t, worse: they\'ll ask me again.'); }
  return salvPettineOrig(...a); };
const chairOld=AV_S['use:chair'];
avOn('use:chair use:chair:pettine',async(...a)=>{ const f=F(); if (!f.pettineHeld || f.shaveDone || !c1u()) return chairOld?chairOld(...a):me('La poltrona del barbiere.','The barber chair.');
  await me('Prendo il rasoio. Nonno Peppe chiude gli occhi e recita un Padre Nostro. Al contrario.','I take the razor. Grandpa Peppe closes his eyes and says an Our Father. Backwards.');
  const ok=await (window.avShave||avShaveGame)(6); if (!ok) return np('salvatore','Sangue! Poco, poco. Gli metto il dopobarba e un cerotto. Riprova, ma questa volta mira la barba, non la giugulare.','Blood! A little, a little. Some aftershave and a plaster. Try again, but this time aim for the beard, not the jugular.');
  f.shaveDone=1; avSave(); avTrophy('rasatura','Hai rasato un cliente senza tagliargli la gola. Salvatore ti ha offerto un lavoro.','Shaved a customer without slitting his throat. Salvatore offered you a job.');
  await avSay('voice', T('Nonno Peppe si guarda allo specchio: liscio come un bambino. Un bambino di novant\'anni, rugoso e incazzato, ma liscio.','Grandpa Peppe looks in the mirror: smooth as a baby. A ninety-year-old, wrinkled, furious baby, but smooth.'));
  avAdd('pettine'); return salvPettineOrig(); });
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Dai il pettine a Salvatore')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,
  [()=>F().pettineHeld && !F().shaveDone,'Salvatore ha le mani che tremano: usa la poltrona del barbiere e rasa tu il cliente. Tocca quando il rasoio è sul verde.','Salvatore\'s hands are shaking: use the barber chair and shave the customer yourself. Tap when the razor is over the green.']); })();
