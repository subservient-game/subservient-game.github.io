/* ================= CAPITOLO 2 — L'ARCHIVIO AL BUIO: torcia scarica, pile del rasoio di Salvatore ================= */
Object.assign(AV_ITEMS,{ pile:['🔋','Pile','Batteries'] });
AV_ICONS.pile=`${[12,26].map(x=>`<rect x="${x}" y="12" width="11" height="28" rx="2" fill="#3a3a3a" stroke="#2b2b2b" stroke-width="2.2"/><rect x="${x}" y="12" width="11" height="9" fill="#e9b949" stroke="#2b2b2b" stroke-width="1.6"/><rect x="${x+3.5}" y="8" width="4" height="4" fill="#aaa" stroke="#2b2b2b" stroke-width="1.4"/>`).join('')}`;
AV_TROPHIES.push(['sopracciglio','Salvatore ti ha rasato mezzo sopracciglio in cambio delle pile. Sembri sempre sorpreso.','Salvatore shaved half your eyebrow for the batteries. You look permanently surprised.']);
(()=>{ const old=AV_S['c2|use:bdoor:vero']; AV_S['c2|use:bdoor:vero']=async(...a)=>{ const f=F();
  if (!f.archivio && !f.torchOk){ f.darkSeen=1; avSave(); await meAct('strain',1400);
    await avSay('voice', T('La porta del bunker cede con un gemito. Dietro: buio totale, odore di muffa e di segreti. Accendi la torcia... clic. Niente. Clic clic. Niente.','The bunker door gives with a groan. Behind it: total darkness, a smell of mould and secrets. You switch on the torch... click. Nothing. Click click. Nothing.'));
    return me('Pile scariche. Nel buio là dentro mi rompo l\'osso del collo e mi trovano tra cinquant\'anni insieme ai documenti. Mi servono pile nuove.','Dead batteries. In that dark I\'ll break my neck and they\'ll find me in fifty years with the documents. I need new batteries.'); }
  return old(...a); }; })();
avOn2('look:torcia',()=>me(F().torchOk?'La torcia, con le pile del rasoio di Salvatore. Fa una luce che sa di dopobarba.':'La torcia. Le pile sono morte. Riposino in pace.', F().torchOk?'The torch, with the batteries from Salvatore\'s razor. Its light smells of aftershave.':'The torch. The batteries are dead. Rest in peace.'));
(()=>{ const old=AV_S['c2|talk:salvatore']||AV_S['talk:salvatore']; AV_S['c2|talk:salvatore']=async(...a)=>{ const f=F();
  if (f.darkSeen && !f.torchOk && !avHas('pile')){ const o=await avChoose([['Salvatore, mi servono delle pile.','Salvatore, I need batteries.'],['Altro...','Something else...']]);
    if (o===0){ await np('salvatore','Pile? Le ho nel rasoio elettrico. Te le do, ma prima l\'ultimo giro col rasoio lo faccio su di te. Siediti. Non ti muovere. Non respirare.','Batteries? They\'re in my electric razor. They\'re yours, but first the razor\'s last run is on you. Sit. Don\'t move. Don\'t breathe.');
      const c=await avChoose([['Va bene, mi siedo.','Fine, I\'ll sit.'],['Col cazzo.','No bloody way.']]); if (c!==0) return np('salvatore','Allora niente pile. E stanotte dormi con un occhio aperto: so dove abiti.','Then no batteries. And sleep with one eye open tonight: I know where you live.');
      await meAct('sit',1400); await avSay('voice', T('BZZZZZ. Salvatore passa il rasoio con l\'entusiasmo di un taglialegna. Quando finisce ti manca mezzo sopracciglio sinistro.','BZZZZZ. Salvatore runs the razor with a lumberjack\'s enthusiasm. When he\'s done, half your left eyebrow is gone.'));
      avAdd('pile'); avTrophy('sopracciglio','Salvatore ti ha rasato mezzo sopracciglio in cambio delle pile. Sembri sempre sorpreso.','Salvatore shaved half your eyebrow for the batteries. You look permanently surprised.');
      return np('salvatore','Ecco le pile. Il sopracciglio ricresce. Forse. A me non è mai ricresciuto niente, ma io sono un caso clinico.','Here are the batteries. The eyebrow grows back. Maybe. Nothing ever grew back on me, but I\'m a medical case.'); } }
  return old?old(...a):undefined; }; })();
avOn2('use:torcia:pile use:pile:torcia',async()=>{ const f=F(); avDel('pile'); f.torchOk=1; avSave(); return me('Cambio le pile. La torcia si accende con un raggio potente e un leggero ronzio da barbiere. Ora il buio del bunker non mi fa paura. Un po\' sì.','I swap the batteries. The torch lights up with a strong beam and a faint barbershop buzz. Now the bunker dark doesn\'t scare me. A bit, yes.'); });
(()=>{ const H=AV_HINTS2; H.unshift(
  [()=>F().darkSeen && !F().torchOk && !avHas('pile'),'La torcia è scarica: chiedi delle pile a Salvatore il barbiere.','The torch is dead: ask Salvatore the barber for batteries.'],
  [()=>avHas('pile'),'Metti le pile nella torcia.','Put the batteries in the torch.'],
  [()=>F().torchOk && !F().archivio,'Ora apri il bunker col mestolo vero.','Now open the bunker with the real ladle.']); })();
/* luoghi del Capitolo 2 che la mappa non mostrava: aperti dall'inizio (anche per i salvataggi già in corso) */
['municipio','hospital','park','barber','faro','karaoke','bisca','porto'].forEach(r=>{ if (!AV_START2.open.includes(r)) AV_START2.open.push(r); });
(()=>{ const fix=()=>{ try{ const st=AV.st; if (!st) return; const need=st.ch===2?AV_START2.open:(st.ch===1&&st.f&&(st.f.asked_ciccio||[]).includes('warehouse')?['faro']:[]); need.forEach(r=>{ if (!st.open.includes(r)) st.open.push(r); }); }catch(e){} };
  const oldMap=avMap; avMap=function(...a){ fix(); return oldMap.apply(this,a); }; })();
