/* ================= CAPITOLO 4 — LO SCIAME DI PIPISTRELLI NEI CUNICOLI ================= */
AV_TROPHIES.push(['pipistrelli','Hai scacciato cento pipistrelli agitando una lanterna fatta con una pentola. Batman ti fa un baffo.','Shooed a hundred bats waving a lantern made from a pot. Batman\'s got nothing on you.']);
(()=>{ const E=AV_CHS[4].ENTER.grotta; const prev=E.before; E.before=async()=>{ const f=F(); if (f.batsDone || f.inCave){ return prev?prev():true; }
  await avSay('voice', T('Appena entri nei cunicoli, la luce della lanterna sveglia uno sciame di pipistrelli. Ti volano in faccia, nei capelli, nelle mutande. Agita la lanterna più veloce che puoi!','As you enter the burrows, the lantern light wakes a swarm of bats. They fly into your face, your hair, your pants. Wave the lantern as fast as you can!'));
  setPose('strain'); const ok=await (window.avPushups||avPushups)(26,10); setPose('idle');
  if (!ok){ await me('Mi arrendo e scappo fuori urlando. Un pipistrello resta impigliato nei capelli. Lo chiamo Gaspare.','I give up and run out screaming. A bat stays tangled in my hair. I name it Gaspare.'); return false; }
  f.batsDone=1; avSave(); avTrophy('pipistrelli','Hai scacciato cento pipistrelli agitando una lanterna fatta con una pentola. Batman ti fa un baffo.','Shooed a hundred bats waving a lantern made from a pot. Batman\'s got nothing on you.');
  return prev?prev():true; }; })();
