/* ================= CAPITOLO 2 — IL QUARTO PEZZO È NELLA BARA DELLA MADRE DI GINA: scavare con Ugo ================= */
Object.assign(AV_ITEMS,{ bigliettogina:['📝','Biglietto di Gina per Ugo','Gina\'s note for Ugo'] });
AV_ICONS.bigliettogina=`<rect x="8" y="10" width="32" height="28" rx="2" fill="#fffaf0" stroke="#2b2b2b" stroke-width="2.2" transform="rotate(-4 24 24)"/><path d="M13 18 L33 16 M13 24 L31 22 M13 30 L26 29" stroke="#c0392b" stroke-width="2"/><path d="M30 32 q3 -4 6 0" stroke="#2b2b2b" stroke-width="1.8" fill="none"/>`;
AV_TROPHIES.push(['scavo','Hai scavato una tomba di notte con un becchino ubriaco. Per un pezzo di carta. Il curriculum si arricchisce.','Dug up a grave at night with a drunk gravedigger. For a scrap of paper. Your CV grows.']);
(()=>{ const old=AV_S['c2|talk:gina']; AV_S['c2|talk:gina']=async(...a)=>{ const f=F(); const before=f.p4got; const r=await old(...a);
  if (!before && f.p4got && avHas('pezzo4') && !f.urnDone){ avDel('pezzo4'); avAdd('bigliettogina'); f.urnAsk=1; avSave(); avOpen('cimitero');
    await np('gina','Ah, aspetta. Il pezzo non ce l\'ho qui. Mia madre l\'ha voluto nella bara con sé, insieme al mazzo con cui ha battuto Ernesto. Era una donna rancorosa. Tieni questo biglietto per Ugo al cimitero: lui sa quale tomba. Portati una pala. E lo stomaco.','Ah, wait. I don\'t have the piece here. My mother wanted it in the coffin with her, along with the deck she beat Ernesto with. She was a spiteful woman. Take this note to Ugo at the cemetery: he knows which grave. Bring a shovel. And a stomach.'); }
  return r; }; })();
(()=>{ const old=AV_S['c2|talk:ugo']; AV_S['c2|talk:ugo']=async(...a)=>{ const f=F();
  if (f.urnAsk && !f.urnDone && avHas('bigliettogina')){ avDel('bigliettogina'); await np('ugo','Un biglietto di Gina? "Fagli aprire la mamma". Ah. La signora Concetta. Seppellita con un mazzo di carte e un rancore. Io scavo, ma ho la schiena di cristallo. La pala la tieni tu. Scava a ritmo, che la terra è dura come il cuore di quella donna.','A note from Gina? "Let him open mum". Ah. Mrs Concetta. Buried with a deck of cards and a grudge. I\'ll dig, but my back is made of glass. You hold the shovel. Dig in rhythm, the ground is as hard as that woman\'s heart.');
    f.urnDig=1; avSave(); }
  if (f.urnDig && !f.urnDone){ setPose('strain'); const ok=await (window.avPushups||avPushups)(30,12); setPose('idle');
    if (!ok) return np('ugo','Hai scavato una buca da gatto. Riprova, o la signora Concetta ci resta sotto per sempre. Che poi, forse è meglio.','You dug a cat-sized hole. Again, or Mrs Concetta stays down there for ever. Which, maybe, is for the best.');
    f.urnDone=1; avSave(); avAdd('pezzo4'); avTrophy('scavo','Hai scavato una tomba di notte con un becchino ubriaco. Per un pezzo di carta. Il curriculum si arricchisce.','Dug up a grave at night with a drunk gravedigger. For a scrap of paper. Your CV grows.');
    await avSay('voice', T('Toc. La pala colpisce il legno. Ugo apre la bara: la signora Concetta, elegantissima, stringe un mazzo di carte e un foglio piegato. Glielo sfili dalle dita. Ugo giura che ha sorriso.','Thunk. The shovel hits wood. Ugo opens the coffin: Mrs Concetta, very elegant, clutches a deck of cards and a folded sheet. You slip it from her fingers. Ugo swears she smiled.'));
    return me('Il quarto pezzo. Sa di naftalina e di vendetta.','The fourth piece. Smells of mothballs and revenge.'); }
  return old(...a); }; })();
(()=>{ AV_HINTS2.unshift(
  [()=>F().urnAsk && !F().urnDone,'Il quarto pezzo è nella bara della madre di Gina: porta il biglietto a Ugo al cimitero e scava.','The fourth piece is in Gina\'s mother\'s coffin: take the note to Ugo at the cemetery and dig.']); })();
