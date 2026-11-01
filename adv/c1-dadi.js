/* ================= CAPITOLO 1 — IL BERRETTO DELLA FINANZA: Ercole lo tiene come trofeo, si vince a dadi ================= */
Object.assign(AV_ITEMS,{ berretto:['🧢','Berretto della Finanza','Tax Police cap'] });
AV_ICONS.berretto=`<path d="M8 28 Q8 12 24 12 Q40 12 40 28Z" fill="#4a5a3a" stroke="#2b2b2b" stroke-width="2.3"/><path d="M4 30 Q24 24 44 30 L42 34 Q24 30 6 34Z" fill="#2b2b2b"/><circle cx="24" cy="20" r="4" fill="#e9b949" stroke="#2b2b2b" stroke-width="1.5"/><path d="M14 27 L34 27" stroke="#e9b949" stroke-width="2"/>`;
AV_TROPHIES.push(['dadi','Hai vinto il berretto della Finanza a dadi contro Ercole. Lui l\'aveva vinto a un finanziere vero.','Won the Tax Police cap at dice against Ercole. He\'d won it from a real officer.']);
const c1t=()=>!(AV.st.ch>1);
function avDiceGame(streak){ return new Promise(res=>{ let cur=1+Math.floor(Math.random()*6), run=0, done=false, lock=false;
  const face=n=>{ const pip={1:[[24,24]],2:[[14,14],[34,34]],3:[[14,14],[24,24],[34,34]],4:[[14,14],[34,14],[14,34],[34,34]],5:[[14,14],[34,14],[24,24],[14,34],[34,34]],6:[[14,12],[34,12],[14,24],[34,24],[14,36],[34,36]]}[n]; return `<svg viewBox="0 0 48 48" width="70" height="70"><rect x="4" y="4" width="40" height="40" rx="8" fill="#fffaf0" stroke="#2b2b2b" stroke-width="3"/>${pip.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="#2b2b2b"/>`).join('')}</svg>`; };
  sheet(`<div style="text-align:center"><h3 style="margin:0 0 4px">${T('Alto o basso','Higher or lower')}</h3><p style="margin:0 0 8px;font-size:13px">${T(`Indovina se il prossimo dado sarà più alto o più basso. ${streak} di fila per vincere. Se è uguale, ti salvi.`,`Guess if the next die is higher or lower. ${streak} in a row to win. A tie saves you.`)}</p>
   <div id="dcD">${face(cur)}</div><div id="dcS" style="font:700 18px Fredoka,sans-serif;margin:6px 0"></div><p id="dcM" style="min-height:20px;margin:0 0 8px"></p>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button type="button" id="dcH" style="padding:18px 0">${T('Più alto','Higher')}</button><button type="button" id="dcL" style="padding:18px 0">${T('Più basso','Lower')}</button></div>
   <button type="button" id="dcQ" class="ghost" style="width:100%;margin-top:8px">${T('Mi arrendo','I give up')}</button></div>`);
  const sc=()=>{ $('dcS').textContent=T(`Di fila: ${run}/${streak}`,`In a row: ${run}/${streak}`); }; sc();
  $('dcQ').onclick=()=>{ done=true; closeSheet(); res(false); };
  const guess=up=>{ if (done||lock) return; lock=true; const n=1+Math.floor(Math.random()*6); $('dcD').innerHTML=face(n);
    if (n===cur){ $('dcM').textContent=T('Uguale! Salvo.','Tie! Saved.'); }
    else if ((n>cur)===up){ run++; $('dcM').textContent=T('Giusto!','Right!'); } else { run=0; $('dcM').textContent=T('Sbagliato! Ercole ride. Si ricomincia.','Wrong! Ercole laughs. Start over.'); }
    cur=n; sc(); lock=false; if (run>=streak){ done=true; setTimeout(()=>{ closeSheet(); res(true); },700); } };
  $('dcH').onpointerdown=e=>{ e.preventDefault(); guess(true); }; $('dcL').onpointerdown=e=>{ e.preventDefault(); guess(false); }; }); }
(()=>{ const old=AV_ENTER.municipio.before; AV_ENTER.municipio.before=async()=>{ const f=F();
  if (c1t() && !f.inMuni && f.disguise && f.trench && !f.capOn){ avKick('piazza'); f.capAsk=1; avSave();
    await np('gennaro','Baffi... impermeabile... ma senza berretto? Un finanziere senza berretto è un ragioniere disoccupato. Non entri. E non insistere, che chiamo i carabinieri. Cioè mio cognato.','Moustache... trench coat... but no cap? A tax officer without a cap is an unemployed accountant. You\'re not coming in. And don\'t push it, or I\'ll call the police. Meaning my brother-in-law.');
    return false; }
  return old(); }; })();
(()=>{ const old=AV_S['talk:ercole']; AV_S['talk:ercole']=async(...a)=>{ const f=F();
  if (c1t() && f.capAsk && !f.capOn && !avHas('berretto')){ const o=await avChoose([['Ercole, quel berretto della Finanza appeso al muro...','Ercole, that Tax Police cap on the wall...'],['Altro...','Something else...']]);
    if (o===0){ await np('ercole','Quello? L\'ho vinto nel 1990 a un finanziere vero, a dadi. Lui è andato in pensione anticipata. Per la vergogna. Te lo gioco: alto o basso, cinque di fila. Se perdi mi lucidi le scarpe. Con la lingua, come da tradizione.','That? I won it in 1990 from a real tax officer, at dice. He took early retirement. Out of shame. I\'ll play you for it: higher or lower, five in a row. Lose and you polish my shoes. With your tongue, as tradition demands.');
      const ok=await (window.avDice||avDiceGame)(5); if (!ok) return np('ercole','Ahahah! Le scarpe sono quelle nere. Scherzo. Torna quando vuoi perdere ancora.','Hahaha! The shoes are the black ones. Kidding. Come back whenever you want to lose again.');
      avAdd('berretto'); avTrophy('dadi','Hai vinto il berretto della Finanza a dadi contro Ercole. Lui l\'aveva vinto a un finanziere vero.','Won the Tax Police cap at dice against Ercole. He\'d won it from a real officer.');
      return np('ercole','...Cinque di fila. Hai la fortuna di un parroco al Bingo. Prendi il berretto. Ha ancora l\'odore del finanziere: paura e acqua di colonia.','...Five in a row. You\'ve got a priest\'s luck at bingo. Take the cap. It still smells of the officer: fear and cologne.'); } }
  return old(...a); }; })();
avOn('use:me:berretto',async()=>{ const f=F(); avDel('berretto'); f.capOn=1; avSave(); await meAct('salute',1200); return me('Mi metto il berretto. Ora con baffi e impermeabile sono la Guardia di Finanza fatta persona. Mi verrebbe da sequestrarmi da solo.','I put on the cap. With the moustache and trench coat I\'m the Tax Police incarnate. I almost want to seize my own assets.'); });
avOn('look:berretto',()=>me('Il berretto della Finanza, con la fiamma d\'oro. Con questo in testa, anche i piccioni dichiarano il reddito.','The Tax Police cap, with the gold flame. With this on, even pigeons declare their income.'));
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Interroga Gaspare')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,
  [()=>F().capAsk && !F().capOn && !avHas('berretto'),'Gennaro vuole il berretto: Ercole alla bisca ne ha uno appeso al muro. Sfidalo a dadi.','Gennaro wants the cap: Ercole at the den has one on the wall. Challenge him at dice.'],
  [()=>avHas('berretto'),'Mettiti il berretto (usalo su di te) e torna al Municipio.','Put on the cap (use it on yourself) and go back to the Town Hall.']); })();
