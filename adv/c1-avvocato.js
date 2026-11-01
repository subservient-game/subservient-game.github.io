/* ================= CAPITOLO 1 — L'AVVOCATO DI GASPARE: Peppe con la mantellina del barbiere ================= */
Object.assign(AV_ITEMS,{ mantellina:['🦇','Mantellina nera del barbiere','Barber\'s black cape'] });
AV_ICONS.mantellina=`<path d="M24 8 L10 40 Q24 46 38 40Z" fill="#2b2b2b" stroke="#111" stroke-width="2.2" stroke-linejoin="round"/><path d="M18 12 Q24 16 30 12" stroke="#cfd6de" stroke-width="2.4" fill="none"/>${[[18,26],[26,30],[22,36]].map(([x,y])=>`<path d="M${x} ${y} l2 -1" stroke="#777" stroke-width="1.4"/>`).join('')}`;
AV_TROPHIES.push(['avvocato','Hai trovato un avvocato a Gaspare: Nonno Peppe in mantellina da barbiere. Ha obiettato a tutto, anche al caffè.','Found Gaspare a lawyer: Grandpa Peppe in a barber\'s cape. He objected to everything, even the coffee.']);
const c1m=()=>!(AV.st.ch>1);
(()=>{ const old=AV_S['talk:gaspare']; AV_S['talk:gaspare']=async(...a)=>{ const f=F();
  if (c1m() && f.distintivo && f.inMuni && !f.lawyerOk && !f.gaspareGone){ f.lawyerAsk=1; avSave();
    await np('gaspare','Un interrogatorio? Senza il mio avvocato non dico neanche buonasera. È un mio diritto costituzionale. L\'ho letto su un cartone animato.','An interrogation? Without my lawyer I won\'t even say good evening. It\'s my constitutional right. I read it in a cartoon.');
    return me('Un avvocato alle tre di notte, in questo paese? L\'unico che ha visto un tribunale è Nonno Peppe. Da imputato, ma conta lo stesso.','A lawyer at 3 a.m., in this town? The only one who\'s seen a courtroom is Grandpa Peppe. As the accused, but it counts.'); }
  return old(...a); }; })();
(()=>{ const old=AV_S['talk:peppe']; AV_S['talk:peppe']=async(...a)=>{ const f=F();
  if (c1m() && f.lawyerAsk && !f.lawyerOk){ const o=await avChoose([['Peppe, ti va di fare l\'avvocato di Gaspare?','Peppe, fancy being Gaspare\'s lawyer?'],['Altro...','Something else...']]);
    if (o===0){ if (!avHas('mantellina')) return np('peppe','L\'avvocato? Io? Ho visto tutte le puntate di Perry Mason! Ma senza toga non mi prende sul serio nessuno. Trovami qualcosa di nero e lungo. Che non sia un prete.','A lawyer? Me? I\'ve seen every episode of Perry Mason! But without a gown nobody will take me seriously. Find me something black and long. That isn\'t a priest.');
      avDel('mantellina'); f.lawyerOk=1; avSave(); avTrophy('avvocato','Hai trovato un avvocato a Gaspare: Nonno Peppe in mantellina da barbiere. Ha obiettato a tutto, anche al caffè.','Found Gaspare a lawyer: Grandpa Peppe in a barber\'s cape. He objected to everything, even the coffee.');
      await npcAct('peppe','salute',1200); return np('peppe','La mantellina del barbiere! Profuma di lacca e capelli altrui. Perfetta. Vai pure, ti raggiungo in Municipio. Ci metto venti minuti, ho novantun anni. Obiezione! ...Scusa, mi sto allenando.','The barber\'s cape! Smells of hairspray and other people\'s hair. Perfect. Go ahead, I\'ll meet you at the Town Hall. Takes me twenty minutes, I\'m ninety-one. Objection! ...Sorry, practising.'); } }
  return old(...a); }; })();
(()=>{ const old=AV_S['talk:salvatore']; AV_S['talk:salvatore']=async(...a)=>{ const f=F();
  if (c1m() && f.lawyerAsk && !f.lawyerOk && !avHas('mantellina')){ const o=await avChoose([['Salvatore, mi presti la mantellina nera?','Salvatore, lend me the black cape?'],['Altro...','Something else...']]);
    if (o===0){ avAdd('mantellina'); return np('salvatore','La mantellina? Per un avvocato? Tieni, ma riportamela senza macchie di sangue. Dopo l\'ultima rissa coi clienti l\'ho dovuta lavare tre volte.','The cape? For a lawyer? Take it, but bring it back without bloodstains. After the last fight with customers I had to wash it three times.'); } }
  return old(...a); }; })();
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Interroga Gaspare')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,
  [()=>F().lawyerAsk && !F().lawyerOk && !avHas('mantellina'),'Gaspare vuole un avvocato: Peppe è disposto, ma gli serve una "toga". Salvatore il barbiere ha una mantellina nera.','Gaspare wants a lawyer: Peppe is willing, but needs a "gown". Salvatore the barber has a black cape.'],
  [()=>avHas('mantellina'),'Dai la mantellina a Peppe (parlagli) e torna da Gaspare.','Give the cape to Peppe (talk to him) and go back to Gaspare.']); })();
