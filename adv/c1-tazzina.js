/* Capitolo 1 — promemoria su chi ha la tazzina di Nico */
(()=>{ const pend=()=>{ const f=F(); return !(f.needBollo && !avHas('marca') && !f.distintivo) && f.nicoCupAsk && !avHas('tazzina') && !f.cupBack; };
 const R=[['La mia tazzina ce l\'ha ancora Rocky, in palestra. Ci beve le proteine. Che schifo.','Rocky still has my cup, at the gym. Drinks his protein from it. Gross.'],
  ['Novità sulla tazzina? È in palestra da Rocky. Fattela ridare, io con quello non ci parlo: suda anche dalla voce.','Any news on the cup? It\'s at the gym with Rocky. Get it back, I don\'t talk to him: even his voice sweats.'],
  ['Ricordati: tazzina, Rocky, palestra. Tre parole, ce la puoi fare.','Remember: cup, Rocky, gym. Three words, you can do it.']];
 let i=0;
 const oldN=AV_S['talk:nico']; AV_S['talk:nico']=async(...a)=>{ if (pend()){ const r=R[i++%R.length]; await np('nico',r[0],r[1]); try{ avOpen('gym'); }catch(e){} } return oldN(...a); };
 const oldL=AV_S['look:rocky']; AV_S['look:rocky']=(...a)=>{ if (pend()) return me('Rocky beve un frullato di proteine da una tazzina sbeccata con scritto "BARISTA DELL\'ANNO 1998". Ecco dov\'era finita.','Rocky is drinking a protein shake from a chipped cup that says "BARISTA OF THE YEAR 1998". So that\'s where it went.'); return oldL(...a); };
})();
