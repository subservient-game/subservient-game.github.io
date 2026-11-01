/* ================= CAPITOLO 3 — LE SABBIE MOBILI VERSO LA LAGUNA: assi del relitto e passi in equilibrio ================= */
Object.assign(AV_ITEMS,{ assi:['🪵','Assi del relitto','Wreck planks'] });
AV_ICONS.assi=`${[12,22,32].map((y,i)=>`<rect x="${6+i*2}" y="${y}" width="36" height="7" rx="1.5" fill="#a0724a" stroke="#2b2b2b" stroke-width="2" transform="rotate(${-6+i*6} 24 ${y})"/>`).join('')}`;
AV_TROPHIES.push(['sabbie','Hai attraversato le sabbie mobili su tre assi. Le scarpe sono rimaste là sotto.','Crossed the quicksand on three planks. Your shoes stayed down there.']);
AV_CHS[3].ENTER.laguna=Object.assign(AV_CHS[3].ENTER.laguna||{}, { before:async()=>{ const f=F(); if (f.sandCrossed) return true;
  if (!avHas('assi')){ f.quickSeen=1; avSave(); await me('Il sentiero per la laguna passa in una pozza di fango che bolle piano. Metto un piede e affonda fino al ginocchio. Sabbie mobili. Mi tiro fuori, senza scarpa. Servono delle assi da stendere sopra.','The path to the lagoon goes through a slowly bubbling mud pool. I step in and sink to the knee. Quicksand. I pull out, minus a shoe. I need planks to lay across.'); return false; }
  await me('Stendo le assi sul fango, una dopo l\'altra. Ora devo camminarci sopra senza perdere l\'equilibrio. Tocca a ritmo!','I lay the planks over the mud, one after another. Now I must walk on them without losing balance. Tap in rhythm!');
  setPose('tiptoe'); const ok=await (window.avPushups||avPushups)(16,9); setPose('idle');
  if (!ok){ await me('SPLOF. Scivolo e affondo fino alla vita. Mi tiro fuori con una liana e tanta dignità persa. Riproviamo.','SPLOSH. I slip and sink to the waist. I pull out on a vine with lots of lost dignity. Again.'); return false; }
  avDel('assi'); f.sandCrossed=1; avSave(); avTrophy('sabbie','Hai attraversato le sabbie mobili su tre assi. Le scarpe sono rimaste là sotto.','Crossed the quicksand on three planks. Your shoes stayed down there.'); return true; } });
avOnN(3,'take:relitto open:relitto',(()=>{ const old=AV_S['c3|take:relitto']; return async(...a)=>{ const f=F();
  if (f.quickSeen && !f.sandCrossed && !avHas('assi') && f.baffoFree){ await meAct('strain',1400); avAdd('assi'); return me('Stacco tre assi dallo scafo del relitto. Baffo da lontano urla che gli sto smontando la barca. Gli rispondo che è già smontata.','I prise three planks off the wreck\'s hull. Baffo yells from afar that I\'m taking his boat apart. I reply it\'s already apart.'); }
  return old?old(...a):me('Il relitto.','The wreck.'); }; })());
(()=>{ const H=AV_CHS[3].HINTS; H.unshift(
  [()=>F().quickSeen && !F().sandCrossed && !avHas('assi') && !F().baffoFree,'Per le sabbie mobili servono assi dal relitto, ma prima libera Baffo.','The quicksand needs planks from the wreck, but free Baffo first.'],
  [()=>F().quickSeen && !F().sandCrossed && !avHas('assi') && F().baffoFree,'Prendi delle assi dal relitto per le sabbie mobili.','Take planks from the wreck for the quicksand.'],
  [()=>avHas('assi') && !F().sandCrossed,'Con le assi, vai alla laguna e attraversa a ritmo.','With the planks, go to the lagoon and cross in rhythm.']); })();
