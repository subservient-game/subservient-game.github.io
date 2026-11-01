/* ================= CAPITOLO 3 — ACCENDERE IL FUOCO A MANO E COLLAUDARE IL PONTE ================= */
AV_TROPHIES.push(['scintilla','Hai acceso un fuoco sfregando una selce come un uomo delle caverne. Uno sfigato, però.','Lit a fire striking flint like a caveman. A loser caveman, though.'],['equilibrista','Hai attraversato il ponte di liane senza cadere. Sotto, i coccodrilli sono rimasti delusi.','Crossed the vine bridge without falling. Below, the crocodiles were disappointed.']);
(()=>{ const old=AV_S['c3|use:falo:selce']; AV_S['c3|use:falo:selce']=async(...a)=>{ const f=F();
  if (f.wood3 && !f.fire && !f.sparkOk){ await me('Sfrego la selce contro un sasso sopra la legna. Forte e veloce, finché non salta la scintilla.','I strike the flint against a stone over the wood. Hard and fast, until a spark jumps.');
    setPose('strain'); const ok=await (window.avPushups||avPushups)(24,10); setPose('idle'); if (!ok) return me('Fumo, un po\' di puzza, nessuna fiamma. E una vescica. Riprovo.','Smoke, a bit of stink, no flame. And a blister. Again.');
    f.sparkOk=1; avSave(); avTrophy('scintilla','Hai acceso un fuoco sfregando una selce come un uomo delle caverne. Uno sfigato, però.','Lit a fire striking flint like a caveman. A loser caveman, though.'); }
  return old(...a); }; })();
['corda','liana'].forEach(it=>{ const k='c3|use:ponte:'+it; const old=AV_S[k]; AV_S[k]=async(...a)=>{ const f=F(); const other=it==='corda'?'liana':'corda';
  if (f['br_'+other] && !f['br_'+it] && f.riteDone && f.brunoGone && f.crownGiven && f.nailsIn && !f.crossOk && avHas(it)){
    await me('Ultimo nodo... ma prima di fidarmi devo provarlo. Cammino sul ponte senza il nodo finale, tenendo l\'equilibrio. Tocca quando sei in centro.','Last knot... but before trusting it I must test it. I walk the bridge without the final knot, keeping my balance. Tap when you\'re centred.');
    const ok=await (window.avShave||avShaveGame)(5); if (!ok) return me('Il ponte oscilla, perdo l\'equilibrio e resto appeso per le mani. Sotto, un coccodrillo sbadiglia. Torno indietro di corsa. Riprovo.','The bridge sways, I lose my balance and hang by my hands. Below, a crocodile yawns. I scramble back. Again.');
    f.crossOk=1; avSave(); avTrophy('equilibrista','Hai attraversato il ponte di liane senza cadere. Sotto, i coccodrilli sono rimasti delusi.','Crossed the vine bridge without falling. Below, the crocodiles were disappointed.'); }
  return old(...a); }; });
