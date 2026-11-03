/* Risposte meno ripetitive: se riguardi una cosa già vista, a volte il protagonista commenta in modo diverso.
   Le battute con indizi tornano comunque a turno (e si possono rileggere con la freccia ◀). */
(()=>{ if (!window.ADV) return;
const L=(it,en)=>[it,en];
const RE=[
 L('{N}. Sempre lì. Sempre uguale. Come la mia vita.','{N}. Still there. Still the same. Like my life.'),
 L('Riguardo {n}. Spero in un colpo di scena. Niente.','I look at {n} again. Hoping for a plot twist. Nothing.'),
 L('{N}: l\'ho già visto. Ora lo conosco meglio di mia moglie.','{N}: seen it. I know it better than my wife now.'),
 L('Fisso {n} per la terza volta. Il mio psicologo direbbe che è un sintomo.','I stare at {n} for the third time. My shrink would call it a symptom.'),
 L('{N}. Non si è mosso. Io neanche. Siamo in stallo.','{N}. Hasn\'t moved. Neither have I. Stalemate.'),
 L('Ancora {n}? Se continuo così mi chiede di sposarlo.','{N} again? Keep this up and it\'ll propose.'),
 L('{N}. Lo guardo con occhi nuovi. Sono gli stessi occhi, ma più stanchi.','{N}. I look with fresh eyes. Same eyes, more tired.'),
 L('Già visto. Già commentato. Già dimenticato. Ah no, eccolo: {n}.','Seen it. Commented. Forgotten. Oh wait, there it is: {n}.'),
 L('{N}. Se lo guardo ancora un po\' mi passa la voglia di vivere. Già poca.','{N}. One more look and I lose the will to live. Not much left anyway.'),
 L('Rianalizzo {n}. Conclusione: è ancora {n}. Sherlock mi fa un baffo.','I re-examine {n}. Conclusion: still {n}. Sherlock\'s got nothing on me.'),
 L('{N}. Lo saluto come un vecchio amico. Non risponde. Come i vecchi amici.','{N}. I greet it like an old friend. No reply. Like old friends.'),
 L('Di nuovo {n}. Ho la memoria di un pesce rosso, ma stavolta me lo ricordo.','{N} again. I\'ve a goldfish memory, but this one I remember.'),
 L('{N}. Niente di nuovo sotto il sole. Né sotto la luna, visto l\'orario.','{N}. Nothing new under the sun. Nor the moon, given the hour.'),
 L('Guardo {n} di sbieco, così sembra diverso. Non funziona.','I look at {n} sideways so it seems different. Doesn\'t work.'),
 L('{N}. Lo conosco a memoria. Potrei disegnarlo. Male, ma potrei.','{N}. I know it by heart. I could draw it. Badly, but I could.'),
 L('Ripasso {n}. È come rileggere l\'elenco del telefono: zero sorprese.','Revisiting {n}. Like rereading the phone book: zero surprises.'),
];
let bag=[]; const pick=()=>{ if (!bag.length) bag=RE.map((_,i)=>i).sort(()=>Math.random()-.5); return RE[bag.pop()]; };
const seen=new Map(); let ctx=null;
function boot(){
  const od=window.avDo; window.avDo=async function(verb,t,item){ if (verb==='look' && t && !item){ const k=t.type+':'+t.id; const c=(seen.get(k)||0)+1; seen.set(k,c); ctx={t,c,first:true}; } else ctx=null; try{ return await od.apply(this,arguments); } finally { ctx=null; } };
  const os=window.avSay; window.avSay=function(who,text){ try{ if (ctx && ctx.first && who==='me' && ctx.c>=2 && ctx.c%2===0 && window.avFillLine && !/\d{3,}/.test(text)){ ctx.first=false; const [a,b]=avFillLine(pick(),ctx.t,null); text=(typeof LANG!=='undefined'&&LANG!=='it')?b:a; arguments[1]=text; } else if (ctx) ctx.first=false; }catch(e){} return os.apply(this,arguments); };
}
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
