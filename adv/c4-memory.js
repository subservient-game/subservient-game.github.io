/* ================= CAPITOLO 4 — ALLENAMENTO DELLA MEMORIA: il gioco delle coppie col mazzo del nonno ================= */
AV_TROPHIES.push(['coppie','Hai trovato tutte le coppie nel mazzo del nonno. Lui ne aveva nascoste due nella manica.','Found all the pairs in grandpa\'s deck. He\'d hidden two up his sleeve.']);
function avPairsGame(){ return new Promise(res=>{ const SUITS=[['Asso','Ace','#c0392b'],['Tre','Three','#2b5fd8'],['Re','King','#e9b949'],['Cavallo','Knight','#3f8a3a'],['Fante','Jack','#8e44ad'],['Sette','Seven','#e67e22']];
  const deck=[...SUITS.keys(),...SUITS.keys()].sort(()=>Math.random()-.5); let open=[], found=0, done=false, lock=false, moves=0;
  sheet(`<div style="text-align:center"><h3 style="margin:0 0 4px">${T('Le coppie del nonno','Grandpa\'s pairs')}</h3><p style="margin:0 0 6px;font-size:13px">${T('Gira due carte alla volta e trova tutte le coppie. Hai 22 mosse.','Flip two cards at a time and find all the pairs. You have 22 moves.')}</p>
   <div id="prM" style="font:700 16px Fredoka,sans-serif;margin-bottom:6px"></div>
   <div id="prG" style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${deck.map((v,i)=>`<button type="button" data-i="${i}" style="padding:0;height:58px;font-size:13px;font-weight:800;background:#3a2f4a;color:transparent;border-radius:8px">${T(SUITS[v][0],SUITS[v][1])}</button>`).join('')}</div>
   <button type="button" id="prQ" class="ghost" style="width:100%;margin-top:8px">${T('Basta','Enough')}</button></div>`);
  const btn=[...$('prG').querySelectorAll('button')]; const sc=()=>{ $('prM').textContent=T(`Coppie ${found}/6 — Mosse ${moves}/22`,`Pairs ${found}/6 — Moves ${moves}/22`); }; sc();
  const show=(i,on)=>{ btn[i].style.background=on?'#fffaf0':'#3a2f4a'; btn[i].style.color=on?SUITS[deck[i]][2]:'transparent'; };
  $('prQ').onclick=()=>{ done=true; closeSheet(); res(false); };
  btn.forEach((b,i)=>b.onpointerdown=e=>{ e.preventDefault(); if (done||lock||open.includes(i)||b.dataset.ok) return; show(i,true); open.push(i);
    if (open.length===2){ moves++; const [a,c]=open; if (deck[a]===deck[c]){ btn[a].dataset.ok=btn[c].dataset.ok=1; found++; open=[]; sc(); if (found===6){ done=true; setTimeout(()=>{ closeSheet(); res(true); },700); } }
      else { lock=true; sc(); setTimeout(()=>{ show(a,false); show(c,false); open=[]; lock=false; if (moves>=22){ done=true; closeSheet(); res(false); } },700); } } }); }); }
(()=>{ const old=AV_S['c4|open:gate2']; const h=async(...a)=>{ const f=F();
  if (f.vinesCut && !f.gate2 && !f.pairsDone){ await np('nonno','Prima di affrontare la Porta della Memoria, alleniamoci. Coi miei quaranta mazzi consumati facciamo il gioco delle coppie. Se non ricordi due carte, figurati il 1987.','Before facing the Gate of Memory, let\'s train. With my forty worn decks we\'ll play pairs. If you can\'t remember two cards, forget 1987.');
    const ok=await (window.avPairs||avPairsGame)(); if (!ok) return np('nonno','Memoria da pesce rosso. Riprova, nipote. La porta non ha fretta, io sì: ho 87 anni.','Goldfish memory. Again, grandson. The gate\'s in no hurry, I am: I\'m 87.');
    f.pairsDone=1; avSave(); avTrophy('coppie','Hai trovato tutte le coppie nel mazzo del nonno. Lui ne aveva nascoste due nella manica.','Found all the pairs in grandpa\'s deck. He\'d hidden two up his sleeve.'); await np('nonno','Bene! Ora la porta.','Good! Now the gate.'); }
  return old(...a); }; AV_S['c4|open:gate2']=h; AV_S['c4|use:gate2']=h; })();
