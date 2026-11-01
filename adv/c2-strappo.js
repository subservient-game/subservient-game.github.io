/* ================= CAPITOLO 2 — IL PEZZO STRAPPATO: Tonino scappa con metà del terzo pezzo e si nasconde nella tomba vuota del nonno ================= */
Object.assign(AV_ITEMS,{ pezzo3a:['🗺️','Metà del terzo pezzo','Half of the third piece'], pezzo3b:['🗺️','Altra metà del terzo pezzo','Other half of the third piece'] });
AV_ICONS.pezzo3a=(AV_ICONS.pezzo3||'')+`<path d="M24 4 L20 14 L27 22 L19 32 L25 44" stroke="#c0392b" stroke-width="2.4" fill="none"/>`;
AV_ICONS.pezzo3b=AV_ICONS.pezzo3a;
AV_TROPHIES.push(['bracciodiferro','Hai battuto Tonino a braccio di ferro dentro la tomba di tuo nonno. Il nonno, vivo, approverebbe.','Beat Tonino at arm wrestling inside your grandpa\'s tomb. Grandpa, alive, would approve.']);
(()=>{ const old=AV_S['c2|open:locker']; const h=async(...a)=>{ const f=F(); const had=avHas('pezzo3'); const r=await old(...a);
  if (!had && avHas('pezzo3') && !f.tornDone && f.toninoFled){ f.torn=1; avSave(); avSwap('pezzo3','pezzo3a');
    await me('...Un momento. Il pezzo di mappa è strappato a metà! Tonino, scappando, me ne ha fregata metà. Lo stronzo. Dove si nasconde uno come lui? Dove nessuno va a cercare: tra i morti.','...Wait. The map piece is torn in half! Tonino ripped half off as he ran. The bastard. Where does someone like him hide? Where nobody looks: among the dead.'); avOpen('cimitero'); }
  return r; }; AV_S['c2|open:locker']=h; AV_S['c2|use:locker']=h; })();
(()=>{ const old=AV_S['c2|open:tomb2']||AV_S['open:tomb2']; avOn2('open:tomb2 use:tomb2',async(...a)=>{ const f=F();
  if (f.torn && !f.tornDone && !avHas('pezzo3b')){ await meAct('strain',1200); await avSay('voice', T('Sollevi la lastra della tomba vuota del nonno. Dentro, rannicchiato tra i salami del funerale, c\'è Tonino che mangia. "Occupato!", urla.','You lift the slab of grandpa\'s empty tomb. Inside, curled up among the funeral salamis, Tonino is eating. "Occupied!", he yells.'));
    await np('tonino','Il pezzo? Te lo ridò se mi batti a braccio di ferro. Qui, adesso, sulla lapide. Se vinco io, mi tengo il pezzo e pure i salami.','The piece? I\'ll give it back if you beat me at arm wrestling. Here, now, on the gravestone. If I win, I keep the piece and the salamis.');
    setPose('strain'); const ok=await (window.avPushups||avPushups)(28,10); setPose('idle');
    if (!ok) return np('tonino','Ahahah! Braccio di burro! Torna quando hai mangiato qualcosa. Tipo un salame. Ah no, sono miei.','Hahaha! Butter arm! Come back when you\'ve eaten something. Like a salami. Oh wait, they\'re mine.');
    avAdd('pezzo3b'); avTrophy('bracciodiferro','Hai battuto Tonino a braccio di ferro dentro la tomba di tuo nonno. Il nonno, vivo, approverebbe.','Beat Tonino at arm wrestling inside your grandpa\'s tomb. Grandpa, alive, would approve.');
    return np('tonino','Ahia! Va bene, prendi la tua mezza mappa. Io resto qui: è la casa più tranquilla del paese. E c\'è da mangiare.','Ouch! Fine, take your half map. I\'m staying here: it\'s the quietest house in town. And there\'s food.'); }
  return old?old(...a):me('La tomba vuota del nonno.','Grandpa\'s empty tomb.'); }); })();
avOn2('use:pezzo3a:pezzo3b use:pezzo3b:pezzo3a',()=>{ const f=F(); avDel('pezzo3b'); avSwap('pezzo3a','pezzo3'); f.tornDone=1; avSave(); return me('Unisco le due metà con un po\' di saliva e tanta fede. Il terzo pezzo è di nuovo intero. Più o meno. Ha l\'odore di salame.','I join the two halves with a bit of spit and lots of faith. The third piece is whole again. Roughly. It smells of salami.'); });
(()=>{ AV_HINTS2.unshift(
  [()=>F().torn && !avHas('pezzo3b') && !F().tornDone,'Tonino si nasconde tra i morti: al cimitero, apri la tomba vuota del nonno.','Tonino hides among the dead: at the cemetery, open grandpa\'s empty tomb.'],
  [()=>avHas('pezzo3a') && avHas('pezzo3b'),'Unisci le due metà del terzo pezzo.','Join the two halves of the third piece.']); })();
