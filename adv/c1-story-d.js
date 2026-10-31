/* ================= CAPITOLO 1 — ESPANSIONE 2: pesca al porto, il gelataio sparito ================= */
/* ---------- mini-gioco: pesca col Ciccio ---------- */
function avFishing(goal, secs){ return new Promise(res=>{ let caught=0, left=secs, done=false, fish=[], raf=0, last=performance.now();
  sheet(`<div style="text-align:center"><h3 style="margin:0 0 4px">🎣 ${T('Pesca con Ciccio','Fishing with Ciccio')}</h3><p style="margin:0 0 6px;font-size:13px">${T(`Tira su quando un pesce passa sotto l'amo. Ne servono ${goal} in ${secs} secondi. Gli stivali non valgono.`,`Pull when a fish passes under the hook. You need ${goal} in ${secs} seconds. Boots don't count.`)}</p>
   <div id="fsSea" style="position:relative;height:120px;border-radius:12px;background:linear-gradient(#2f6f9a,#173f5a);overflow:hidden;margin-bottom:8px"><div style="position:absolute;left:50%;top:0;width:2px;height:70px;background:#ddd"></div><div style="position:absolute;left:calc(50% - 8px);top:64px;font-size:16px">🪝</div></div>
   <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:8px"><span id="fsN">🐟 0/${goal}</span><span id="fsT">${secs}s</span></div>
   <button type="button" id="fsB" style="width:100%;padding:22px 0;font-size:20px">${T('TIRA!','PULL!')}</button></div>`);
  const sea=$('fsSea'), W=()=>sea.clientWidth;
  const spawn=()=>{ const junk=Math.random()<.25; const dir=Math.random()<.5?1:-1; const el=document.createElement('div'); el.textContent=junk?['👢','🥫','🩲'][Math.floor(Math.random()*3)]:['🐟','🐠','🐡'][Math.floor(Math.random()*3)]; el.style.cssText=`position:absolute;top:${70+Math.random()*30}px;font-size:22px;transform:scaleX(${-dir})`; sea.appendChild(el); fish.push({el,x:dir>0?-30:W()+10,dir,v:40+Math.random()*70,junk}); };
  const loop=t=>{ const dt=(t-last)/1000; last=t; fish.forEach(f=>{ f.x+=f.dir*f.v*dt; f.el.style.left=f.x+'px'; }); fish=fish.filter(f=>{ if (f.x<-40||f.x>W()+40){ f.el.remove(); return false; } return true; }); if (Math.random()<dt*1.6) spawn(); if (!done) raf=requestAnimationFrame(loop); };
  raf=requestAnimationFrame(loop);
  $('fsB').onpointerdown=e=>{ e.preventDefault(); if (done) return; const cx=W()/2; const hit=fish.find(f=>Math.abs(f.x+11-cx)<20);
    if (hit){ hit.el.remove(); fish=fish.filter(f=>f!==hit); if (hit.junk){ caught=Math.max(0,caught-1); avToast(T('Uno stivale! -1','A boot! -1')); } else caught++; $('fsN').textContent=`🐟 ${caught}/${goal}`; if (caught>=goal) end(true); } };
  const tm=setInterval(()=>{ left--; if ($('fsT')) $('fsT').textContent=left+'s'; if (left<=0) end(false); },1000);
  function end(ok){ if (done) return; done=true; clearInterval(tm); cancelAnimationFrame(raf); closeSheet(); res(ok); } }); }
AV_TROPHIES.push(['fish','Pescatore vero: cinque pesci e zero stivali (più o meno).','Real fisherman: five fish and no boots (roughly).'],['gelato','Hai smascherato il gelataio. Era innocente. E gottoso.','Unmasked the ice-cream man. Innocent. And gouty.']);
const ciccioOld=AV_S['talk:ciccio'];
avOn('talk:ciccio',async()=>{ const f=F();
  if (!f.fishDone){
    await np('ciccio','Non vedi che sto pescando? Se vuoi parlare, rendati utile. Prendi la canna e tirami su cinque pesci. Se peschi uno stivale te lo tolgo dal conto, e ti ci prendo a calci.','Can\'t you see I\'m fishing? Want to talk, make yourself useful. Grab the rod and land five fish. Catch a boot and I take it off your count, then kick you with it.');
    const o=await avChoose([['Va bene, dammi la canna.','Fine, give me the rod.'],['Non ho tempo.','No time.']]); if (o===1) return np('ciccio','Allora neanch\'io. Buona notte, sbirro.','Then neither do I. Goodnight, cop.');
    setPose('play'); const ok=await avFishing(5,35); setPose('idle');
    if (!ok) return np('ciccio','Patetico. I pesci ridevano. Ho sentito un merluzzo dire "che coglione". Riprova.','Pathetic. The fish were laughing. I heard a cod say "what a dickhead". Try again.');
    f.fishDone=1; avSave(); avTrophy('fish','Pescatore vero: cinque pesci e zero stivali (più o meno).','Real fisherman: five fish and no boots (roughly).');
    await np('ciccio','Non male. Hai le mani di un pescatore. Di uno scarso, ma pescatore. Ora chiedi.','Not bad. You\'ve got fisherman\'s hands. A crap fisherman, but still. Now ask.'); }
  return ciccioOld(); });
avOn('look:ciccio',()=>me('Ciccio il pescatore. Barba piena di sale, squame e segreti. Pesca anche di notte, perché dice che di notte i pesci sono più stupidi. Come i turisti.','Ciccio the fisherman. Beard full of salt, scales and secrets. Fishes at night because he says fish are dumber at night. Like tourists.'));
(()=>{ const i=AV_HINTS.findIndex(h=>h[1].startsWith('Al porto, parla con Ciccio')); AV_HINTS.splice(i<0?AV_HINTS.length:i,0,[()=>!F().fishDone && F().fakeKnown,'Ciccio parla solo se peschi cinque pesci con lui. Tira quando il pesce è proprio sotto l\'amo, ed evita stivali e lattine.','Ciccio only talks if you catch five fish with him. Pull when a fish is right under the hook, and avoid boots and cans.']); })();
/* ---------- pista falsa: il gelataio sparito da martedì ---------- */
avOn('look:gelato',()=>me('Il carretto del gelataio Mario. Chiuso da martedì, cartello "Torno subito". Martedì è il giorno in cui hanno cominciato a sparire cose in paese. Coincidenza? Io dico di no. Io dico sempre di no.','Mario the ice-cream man\'s cart. Shut since Tuesday, sign: "Back soon". Tuesday is when things started disappearing in town. Coincidence? I say no. I always say no.'));
avOn('open:gelato use:gelato',async()=>{ const f=F(); await meAct('squat',1200);
  if (!f.gelatoOpen){ f.gelatoOpen=1; avSave(); return me('Dentro: gelato sciolto al pistacchio, un mestolo da gelato dorato (dorato!) e un biglietto: "Torno quando smette di farmi male il piede". Un mestolo dorato... Sospetto numero quattro.','Inside: melted pistachio ice cream, a GOLD-coloured scoop (gold!) and a note: "Back when my foot stops hurting". A golden scoop... Suspect number four.'); }
  return me('Gelato sciolto e un mestolo da gelato dorato. Ottone. Vale tre Pippi. Il gelataio non è un genio del crimine.','Melted ice cream and a gold-coloured scoop. Brass. Worth three Pippi. The ice-cream man is no criminal genius.'); });
const rosyOld=AV_S['talk:rosy'], docOld=AV_S['talk:bisturi'];
avOn('talk:rosy',async()=>{ const f=F(); if (f.gelatoOpen && !f.gelatoDone){ const o=await avChoose([['Avete un certo Mario, il gelataio?','Do you have a Mario, the ice-cream man?'],['Altro...','Something else...']]);
    if (o===0){ await np('rosy','Mario? Stanza 4. Ricoverato da martedì con un attacco di gotta. Ha mangiato sei chili di gelato alla nocciola per una scommessa. Il piede gli è diventato come una melanzana.','Mario? Room 4. Admitted Tuesday with a gout attack. Ate six kilos of hazelnut ice cream on a bet. His foot looks like an aubergine.');
      await np('rosy','Stanotte era sotto morfina, cantava canzoni napoletane e chiamava "mamma" il Dottor Bisturi. Non è uscito di qui nemmeno per fare pipì. L\'ho cambiato io. Tre volte.','Tonight he was on morphine, singing Neapolitan songs and calling Dr. Scalpel "mum". He didn\'t leave even to pee. I changed him. Three times.');
      f.gelatoDone=1; avSave(); avTrophy('gelato','Hai smascherato il gelataio. Era innocente. E gottoso.','Unmasked the ice-cream man. Innocent. And gouty.');
      return me('Alibi di ferro, anzi di morfina. Il gelataio è fuori dai sospetti. Tre sospettati, come prima. Che giro inutile. Bello, però.','Iron-clad alibi, morphine-clad really. The ice-cream man is cleared. Three suspects, as before. What a useless detour. Fun, though.'); } }
  return rosyOld(); });
/* ---------- più vita in piazza: Nico chiede un favore (facoltativo) ---------- */
AV_TROPHIES.push(['nico','Hai riportato a Nico la sua tazzina portafortuna.','Brought Nico his lucky cup back.']);
Object.assign(AV_ITEMS,{ tazzina:['☕','Tazzina sbeccata','Chipped espresso cup'] });
const nicoOld=AV_S['talk:nico'];
avOn('talk:nico',async()=>{ const f=F(); if (!f.nicoCupAsk){ f.nicoCupAsk=1; avSave(); await np('nico','Prima che mi chiedi qualsiasi cosa: hai visto la mia tazzina portafortuna? Sbeccata, con scritto "BARISTA DELL\'ANNO 1998". Ieri sera l\'ha presa Rocky per farci le proteine. Rocky non restituisce mai niente, neanche i saluti.','Before you ask anything: seen my lucky cup? Chipped, says "BARISTA OF THE YEAR 1998". Last night Rocky took it for his protein shake. Rocky never returns anything, not even greetings.'); avOpen('gym'); }
  return nicoOld(); });
const rockyOld=AV_S['talk:rocky'];
avOn('talk:rocky',async()=>{ const f=F(); if (f.nicoCupAsk && !f.cup && !avHas('tazzina')){ const o=await avChoose([['Hai la tazzina di Nico?','Do you have Nico\'s cup?'],['Altro...','Something else...']]);
    if (o===0){ if (!f.pushups) return np('rocky','La tazzina? Te la do se fai la mia sfida. Venticinque flessioni in dieci secondi. Niente sfida, niente tazzina. Muscoli e pazienza.','The cup? It\'s yours if you do my challenge. Twenty-five push-ups in ten seconds. No challenge, no cup. Muscles and patience.');
      f.cup=1; avSave(); avAdd('tazzina'); return np('rocky','Tieni. Puzza di proteine al gusto vaniglia e sudore. Il gusto sudore è gratis.','Here. Smells of vanilla protein and sweat. The sweat flavour\'s free.'); } }
  return rockyOld(); });
avOn('give:nico:tazzina',async()=>{ avDel('tazzina'); avTrophy('nico','Hai riportato a Nico la sua tazzina portafortuna.','Brought Nico his lucky cup back.'); try{ LIFE.pippi+=10; saveLife(); }catch(e){}
  await npcAct('nico','cheer',1200); await np('nico','LA MIA TAZZINA! Te la lavo e ti offro un caffè. Anzi no, la lavo e basta, i caffè costano. Tieni 10 Pippi, che è pure troppo.','MY CUP! I\'ll wash it and buy you a coffee. Actually no, just wash it, coffee costs. Here\'s 10 Pippi, which is too much anyway.');
  return np('nico','E ti regalo un pettegolezzo: il sindaco ordina sempre risotto allo zafferano, anche a colazione. Dice che gli schiarisce la voce. A me sembra che gli schiarisca solo il portafoglio degli altri.','And a free bit of gossip: the mayor always orders saffron risotto, even for breakfast. Says it clears his voice. Seems to me it only clears other people\'s wallets.'); });
avOn('look:tazzina',()=>me('"BARISTA DELL\'ANNO 1998". Sbeccata, appiccicosa. Unico concorrente quell\'anno: Nico.','"BARISTA OF THE YEAR 1998". Chipped, sticky. Only contestant that year: Nico.'));
