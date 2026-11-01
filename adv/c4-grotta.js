/* ================= CAPITOLO 4 — IL NONNO BARA A BRISCOLA E LA FRANA NELLA GROTTA ================= */
AV_TROPHIES.push(['baro','Hai beccato il nonno a barare con un asso nel sandalo. Buon sangue non mente. Mente il nonno.','Caught grandpa cheating with an ace in his sandal. Like grandson, like grandpa. Grandpa lies.'],['frana','Hai tirato fuori il nonno da sotto una frana mentre il Corvo mangiava. Priorità.','Pulled grandpa out from under a rockslide while the Crow was eating. Priorities.']);
(()=>{ const old=AV_S['c4|open:gate1']; const h=async(...a)=>{ const f=F();
  if (f.assoBack && !f.gate1 && !f.cheatCaught){ f.cheatAsk=1; avSave(); await np('nonno','Briscola! Siediti. Mescolo io. Taglia tu. Non guardarmi i piedi.','Briscola! Sit down. I\'ll shuffle. You cut. Don\'t look at my feet.');
    return me('"Non guardarmi i piedi". Il nonno non dice mai niente a caso. Prima di giocare voglio controllare bene, con la lente.','"Don\'t look at my feet". Grandpa never says anything by chance. Before playing I want a proper look, with the lens.'); }
  return old(...a); }; AV_S['c4|open:gate1']=h; AV_S['c4|use:gate1']=h; })();
avOnN(4,'use:nonno:lente use:lente:nonno',async()=>{ const f=F(); if (!f.cheatAsk || f.cheatCaught) return me('Il nonno, ingrandito. Ha più rughe che anni, e ha tanti anni.','Grandpa, magnified. More wrinkles than years, and he has many years.');
  f.cheatCaught=1; avSave(); avTrophy('baro','Hai beccato il nonno a barare con un asso nel sandalo. Buon sangue non mente. Mente il nonno.','Caught grandpa cheating with an ace in his sandal. Like grandson, like grandpa. Grandpa lies.');
  await me('Con la lente guardo i sandali del nonno... dentro il destro, sotto l\'alluce, un asso di coppe. Un altro.','Through the lens I check grandpa\'s sandals... in the right one, under the big toe, an ace of cups. Another one.');
  return np('nonno','...Mi hai beccato. Sei mio nipote davvero. Va bene, giochiamo pulito. Più o meno. Ora alla Porta del Gioco.','...You caught me. You really are my grandson. Fine, we\'ll play clean. More or less. Now to the Gate of Play.'); });
const crowGuard=key=>{ const old=AV_S['c4|'+key]; if (!old) return; AV_S['c4|'+key]=async(...a)=>{ const f=F();
  if (f.inCave && !f.crowGone && !f.slideDone){ await avSay('voice', T('Il Corvo ride, tira una leva nascosta: CRAAAK! Dal soffitto crolla una frana di sassi e monete. Il nonno ci finisce sotto fino alla vita.','The Crow laughs and pulls a hidden lever: CRAAACK! A slide of rocks and coins falls from the ceiling. Grandpa is buried up to his waist.'));
    await np('nonno2','Nipote! Le gambe! Lascia perdere quel maiale, tirami fuori!','Grandson! My legs! Forget that pig, get me out!');
    setPose('strain'); const ok=await (window.avPushups||avPushups)(30,12); setPose('idle'); if (!ok){ await me('Sposto due sassi, ne cadono tre. Il Corvo intanto si fa un panino. Riprovo.','I move two rocks, three more fall. Meanwhile the Crow makes himself a sandwich. Again.'); return; }
    f.slideDone=1; avSave(); avTrophy('frana','Hai tirato fuori il nonno da sotto una frana mentre il Corvo mangiava. Priorità.','Pulled grandpa out from under a rockslide while the Crow was eating. Priorities.'); await np('nonno2','Grazie... Ora prendilo!','Thanks... Now get him!'); }
  return old(...a); }; };
['talk:corvo','use:corvo:lancia','give:corvo:lancia','use:corvo:fiaccolaaccesa'].forEach(crowGuard);
(()=>{ const H=AV_CHS[4].HINTS; const i=H.findIndex(h=>h[1].startsWith('Apri la Porta del Gioco')); H.splice(i<0?0:i,0,
  [()=>F().cheatAsk && !F().cheatCaught,'Il nonno bara: usa la lente su di lui e guardagli i piedi.','Grandpa cheats: use the lens on him and look at his feet.']); })();
