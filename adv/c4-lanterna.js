/* ================= CAPITOLO 4 — IL VENTO DELLA LAVA: lancia di Fefè, pesce, pentola bucata di Ines, lanterna ================= */
Object.assign(AV_ITEMS,{ pentola:['🍲','Pentola bucata','Holey pot'] });
if (!AV_ITEMS.lancia) AV_ITEMS.lancia=['🔱','Lancia','Spear']; if (!AV_ITEMS.pesce) AV_ITEMS.pesce=['🐟','Pesce','Fish'];
AV_ICONS.pentola=`<path d="M8 18 L40 18 L37 40 Q24 44 11 40Z" fill="#8a8f96" stroke="#2b2b2b" stroke-width="2.4" stroke-linejoin="round"/><rect x="5" y="14" width="38" height="5" rx="2" fill="#a7adb5" stroke="#2b2b2b" stroke-width="2"/>${[[16,26],[24,32],[31,25],[20,36],[29,35]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2" fill="#2b2b2b"/>`).join('')}`;
AV_TROPHIES.push(['lanterna','Hai fatto una lanterna con una pentola bucata. Ines vuole i diritti.','Made a lantern from a holey pot. Ines wants royalties.']);
(()=>{ const old=AV_S['c4|use:lava']; const h=async(...a)=>{ const f=F();
  if (!f.lavaCrossed && f.gate1 && f.gate2 && f.gate3 && f.sandFixed && avHas('fiaccolaaccesa') && !f.lantern){ f.windSeen=1; avSave(); await avSay('voice', T('Dal fiume di lava sale un vento caldo e violento. FFFFF! La fiaccola si spegne. Si riaccende. Si rispegne. Ride di te.','A hot, violent wind rises from the lava river. WHOOSH! The torch goes out. Relights. Goes out again. It\'s laughing at you.'));
    return me('Con questo vento la fiaccola non arriva viva alla grotta. Devo ripararla dentro qualcosa con dei buchi per l\'aria. Una lanterna, o simile.','With this wind the torch won\'t reach the cave alive. I need to shield it in something with air holes. A lantern, or similar.'); }
  return old(...a); }; AV_S['c4|use:lava']=h; AV_S['c4|use:lava:sandali']=h; })();
(()=>{ const old=AV_S['c4|talk:ines']; AV_S['c4|talk:ines']=async(...a)=>{ const f=F();
  if (f.windSeen && !f.lantern && !avHas('pentola')){ if (!f.potAsk){ f.potAsk=1; avSave(); return np('ines','La mia pentola bucata? Per una lanterna? Ha più buchi di un alibi del Corvo, perfetta. Te la do, ma portami un pesce: stasera senza pentola cucino alla brace.','My holey pot? For a lantern? It has more holes than the Crow\'s alibi, perfect. It\'s yours, but bring me a fish: tonight without a pot I\'ll grill.'); }
    return np('ines','Un pesce, figlio mio. Nella laguna ce ne sono tanti. Fefè ha la lancia.','A fish, my son. The lagoon has plenty. Fefè has the spear.'); }
  return old(...a); }; })();
(()=>{ const old=AV_S['c4|talk:fefe']; AV_S['c4|talk:fefe']=async(...a)=>{ const f=F();
  if (f.potAsk && !avHas('lancia') && !avHas('pesce') && !avHas('pentola') && !f.lantern){ avAdd('lancia'); return np('fefe','La mia lancia? Tienila. È la lancia del capo: ha ucciso tre pesci, un cinghiale e il matrimonio di mio cugino. Non chiedere.','My spear? Keep it. It\'s the chief\'s spear: killed three fish, a boar and my cousin\'s marriage. Don\'t ask.'); }
  return old(...a); }; })();
avOnN(4,'use:acqua:lancia',async()=>{ const f=F(); if (avHas('pesce')||f.lantern||avHas('pentola')) return me('Basta pesce. I pesci della laguna hanno fatto una riunione e mi hanno dichiarato guerra.','Enough fish. The lagoon fish held a meeting and declared war on me.');
  await me('Fermo, con la lancia alzata, come un pescatore vero. O come un idiota in mutande. Tocca veloce!','Still, spear raised, like a real fisherman. Or an idiot in his pants. Tap fast!');
  const ok=await (window.avFishing||avFishing)(2,20); if (!ok) return me('Ho infilzato un\'alga e il mio piede. L\'alga sta bene.','I speared some seaweed and my foot. The seaweed is fine.');
  avAdd('pesce'); return me('Preso! Un pesce che mi guarda con odio. Mi ricorda mia suocera.','Got it! A fish glaring at me with hatred. Reminds me of my mother-in-law.'); });
avOnN(4,'give:ines:pesce',async()=>{ avDel('pesce'); avAdd('pentola'); await npcAct('ines','cheer',1200); return np('ines','Bel pesce! Tieni la pentola. Se la usi come lanterna, ricordati che ci ho cucinato il cane del vicino. Scherzo. Era un gatto.','Nice fish! Take the pot. If you use it as a lantern, remember I cooked the neighbour\'s dog in it. Kidding. It was a cat.'); });
avOnN(4,'use:pentola:fiaccolaaccesa use:fiaccolaaccesa:pentola',async()=>{ const f=F(); avDel('pentola'); f.lantern=1; avSave(); await meAct('strain',1200); avTrophy('lanterna','Hai fatto una lanterna con una pentola bucata. Ines vuole i diritti.','Made a lantern from a holey pot. Ines wants royalties.');
  return me('Metto la pentola capovolta sopra la fiaccola, la lego con la liana. Dai buchi esce la luce a puntini, come una discoteca degli anni \'80. Il vento può soffiare quanto vuole.','I put the pot upside down over the torch and tie it with vine. Light dots out of the holes, like an 80s disco. The wind can blow all it wants.'); });
avOnN(4,'use:pentola:fiaccola use:fiaccola:pentola',()=>me('Prima la accendo, la fiaccola. Una lanterna spenta è solo una pentola con delle pretese.','Light the torch first. An unlit lantern is just a pot with ambitions.'));
avOnN(4,'look:pentola',()=>me('La pentola di Ines. Ha più buchi di uno scolapasta e più storie di un bar di paese.','Ines\'s pot. More holes than a colander and more stories than a village bar.'));
(()=>{ const H=AV_CHS[4].HINTS; const i=H.findIndex(h=>h[1].startsWith('Usa la lava')); H.splice(i<0?H.length:i,0,
  [()=>F().windSeen && !F().lantern && !F().potAsk,'Il vento spegne la fiaccola: chiedi a Ines qualcosa con dei buchi.','The wind blows the torch out: ask Ines for something with holes.'],
  [()=>F().potAsk && !avHas('lancia') && !avHas('pesce') && !avHas('pentola') && !F().lantern,'Chiedi la lancia a Fefè.','Ask Fefè for the spear.'],
  [()=>avHas('lancia') && !avHas('pesce') && !avHas('pentola') && !F().lantern,'Usa la lancia sulla laguna per pescare.','Use the spear on the lagoon to fish.'],
  [()=>avHas('pesce') && !F().lantern,'Dai il pesce a Ines.','Give the fish to Ines.'],
  [()=>avHas('pentola'),'Usa la pentola sulla fiaccola accesa.','Use the pot on the lit torch.']); })();
