/* ================= CAPITOLO 5 — ESPANSIONE: le quattro monete maledette del paese ================= */
Object.assign(AV_ITEMS,{ monete:['🪙','Monete maledette','Cursed coins'], cambiale:['📜','Cambiale del 1973','1973 IOU'] });
AV_ICONS.monete=`${[[14,34],[26,36],[20,26],[32,28],[24,17]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#e9b949" stroke="#2b2b2b" stroke-width="2"/><path d="M${x-4} ${y} L${x+4} ${y}" stroke="#8a6a1a" stroke-width="1.6"/>`).join('')}<path d="M38 10 q3 4 0 8" stroke="#7a3fb0" stroke-width="2" fill="none"/>`;
AV_ICONS.cambiale=`<path d="M9 8 L37 8 L39 40 L11 40Z" fill="#f1e2b8" stroke="#2b2b2b" stroke-width="2.3" stroke-linejoin="round"/>${[15,21,27].map(y=>`<path d="M14 ${y} L33 ${y}" stroke="#8a7a5a" stroke-width="1.6"/>`).join('')}<text x="15" y="36" font-size="8" font-weight="900" fill="#c0392b">50 L.</text>`;
AV_TROPHIES.push(['monete4','Hai liberato quattro compaesani dalla moneta maledetta. Ora hanno solo la fame normale.','Freed four townsfolk from the cursed coin. Now they only have normal hunger.'],['cambiale','Peppe ha pagato un debito del 1973. Con gli interessi di una maledizione.','Peppe paid a 1973 debt. With a curse for interest.']);
const KARAOKE5=[{title:['"Ho Mangiato Tutto (Tranne Te)"','"I Ate Everything (Except You)"'], verses:[
  {line:['Ho mangiato il pane, ho mangiato il sale...','I ate the bread, I ate the salt...'], opts:[['...ho mangiato pure il commissario comunale!','...I even ate the town commissioner, no fault!'],['...e poi ho fatto la doccia.','...and then I had a shower.'],['...la la la.','...la la la.']], ok:0},
  {line:['Ho mangiato il cane, ho mangiato il gatto...','I ate the dog, I ate the cat...'], opts:[['...e mi sento bene.','...and I feel fine.'],['...e il conto lo paga il sindaco matto!','...and the mad mayor pays for that!'],['...ciao.','...bye.']], ok:1},
  {line:['Ho una fame nera, una fame infinita...','I\'ve a black hunger, a hunger with no end...'], opts:[['...mangio la moneta e mi rovino la vita!','...I eat the coin and ruin my life, my friend!'],['...vado a dormire.','...I go to sleep.'],['...forse.','...maybe.']], ok:0}]}];
const c5coin=async(who)=>{ const f=F(); f['mc_'+who]=1; f.mc=(f.mc||0)+1; avSave(); if (!avHas('monete')) avAdd('monete'); else avToast(T(`Monete maledette: ${f.mc}/4`,`Cursed coins: ${f.mc}/4`));
  if (f.mc>=4){ avTrophy('monete4','Hai liberato quattro compaesani dalla moneta maledetta. Ora hanno solo la fame normale.','Freed four townsfolk from the cursed coin. Now they only have normal hunger.'); await me('Quattro monete. Con quella che ho già, fanno cinque. Un bel mucchietto luccicante. Un Corvo non resiste.','Four coins. With the one I already have, five. A nice shiny pile. No Crow can resist.'); } };
/* la trappola della campana ora vuole un mucchio di monete */
(()=>{ const old=AV_S['c5|use:bell0']; const h=async(...a)=>{ const f=F();
  if (f.mayorFled && !f.caught && (f.mc||0)<4){ await np('corvo','Una moneta? UNA? Ne ho un sacco intero, cretino. Per farmi muovere ci vuole un mucchio. E un contorno.','One coin? ONE? I have a whole sack, idiot. To make me move it takes a pile. And a side dish.');
    return me('Gli serve un mucchio. In paese le monete maledette ce le hanno Nico, Ugo, Ciccio e Peppe. Le devo recuperare tutte.','He needs a pile. In town the cursed coins are with Nico, Ugo, Ciccio and Peppe. I must get them all.'); }
  if (f.mayorFled && !f.caught) avDel('monete');
  return old(...a); }; AV_S['c5|use:bell0']=h; AV_S['c5|use:bell0:moneta']=h; AV_S['c5|use:bell0:monete']=h; })();
/* Nico: karaoke */
avOnN(5,'look:nico',()=>me(F().mc_nico?'Nico, guarito. Ora ha solo la pancia gonfia e una vergogna enorme.':'Nico mangia tovaglioli. Senza sale. Al collo ha una catenina con una moneta d\'oro che brilla di viola.', F().mc_nico?'Nico, cured. Now just a swollen belly and enormous shame.':'Nico is eating napkins. Unsalted. Round his neck, a chain with a gold coin glowing purple.'));
avOnN(5,'talk:nico',async()=>{ const f=F(); if (f.mc_nico) return np('nico','Grazie. Ora ho fame solo come una persona normale. Cioè tantissima, ma da cristiano.','Thanks. Now I\'m only hungry like a normal person. Meaning very, but Christian-style.');
  await np('nico','Non te la do, la moneta! È mia! Però... se mi canti una canzone sulla fame, magari mi commuovo e la mollo. Sono un sentimentale. E un affamato.','I won\'t give you the coin! It\'s mine! But... sing me a song about hunger and maybe I\'ll get emotional and drop it. I\'m sentimental. And starving.');
  const o=await avChoose([['Canta','Sing'],['Non ora','Not now']]); if (o!==0) return;
  await (window.avKaraoke||avKaraoke)(KARAOKE5); await npcAct('nico','cry',1400);
  await np('nico','Bellissima... "Ho mangiato il commissario"... Mi hai toccato il cuore. Tieni, prendi questa schifezza prima che cambi idea.','Beautiful... "I ate the commissioner"... You touched my heart. Here, take this filth before I change my mind.');
  return c5coin('nico'); });
/* Ugo: sfida a flessioni */
(()=>{ const old=AV_S['c5|talk:ugo']; AV_S['c5|talk:ugo']=async(...a)=>{ const f=F(); if (f.mc_ugo) return np('ugo','Senza la moneta mi è tornata la voglia di scavare. Peccato che mi sono mangiato la pala.','Without the coin I want to dig again. Shame I ate the shovel.');
  await old(...a); await np('ugo','La moneta? La tengo nel calzino. Te la do solo se mi batti a flessioni. Venti in dieci secondi. Io ne faccio diciannove, perché ho fame.','The coin? It\'s in my sock. You get it only if you beat me at push-ups. Twenty in ten seconds. I do nineteen, because I\'m hungry.');
  const o=await avChoose([['Sfida accettata','Challenge accepted'],['Dopo','Later']]); if (o!==0) return;
  const ok=await (window.avPushups||avPushups)(20,10); if (!ok) return np('ugo','Ahah! Braccia di ricotta! Torna quando hai mangiato. Ah no, quello è il mio problema.','Haha! Ricotta arms! Come back when you\'ve eaten. Oh wait, that\'s my problem.');
  await np('ugo','Venti! Bastardo. Tieni la moneta. Puzza di piede, ma è maledetta lo stesso.','Twenty! Bastard. Take the coin. Smells of foot, but it\'s still cursed.');
  return c5coin('ugo'); }; })();
/* Ciccio: la moneta è nella pancia di un pesce */
(()=>{ const old=AV_S['c5|talk:ciccio']; AV_S['c5|talk:ciccio']=async(...a)=>{ const f=F(); if (f.mc_ciccio) return np('ciccio','Da quando non ho più la moneta mi piace di nuovo il pesce. Crudo no, però.','Since I lost the coin I like fish again. Not raw, though.');
  await old(...a); if (!f.cicFish){ f.cicFish=1; avSave(); await np('ciccio','La moneta? Mi è caduta in mare mentre mangiavo l\'esca. Se l\'è ingoiata un pesce grosso, una spigola con la faccia del sindaco. Prendila tu dalla piroga, io non ho più la canna. L\'ho mangiata.','The coin? Fell in the sea while I was eating the bait. A big fish swallowed it, a sea bass with the mayor\'s face. Get it from the canoe, I don\'t have a rod. I ate it.'); } }; })();
avOnN(5,'use:canoa',async()=>{ const f=F(); if (!f.cicFish) return me('La piroga del nonno. Un tronco con delle speranze. Per ora non mi serve.','Grandpa\'s canoe. A log with hopes. Don\'t need it right now.'); if (f.mc_ciccio) return me('La spigola col sindaco in faccia l\'ho già presa. Le altre hanno facce normali.','Already caught the mayor-faced bass. The others have normal faces.');
  await me('Salgo sulla piroga e pesco con la lenza di Ciccio. Cioè con un filo e tanta fame.','I get in the canoe and fish with Ciccio\'s line. Meaning a string and lots of hunger.');
  const ok=await (window.avFishing||avFishing)(3,25); if (!ok) return me('Niente. I pesci mi guardano e ridono. Riprovo.','Nothing. The fish look at me and laugh. Again.');
  await me('Ecco la spigola! Ha davvero la faccia del sindaco. Le apro la pancia: dentro c\'è la moneta maledetta e mezzo scontrino del bar.','There\'s the bass! It really has the mayor\'s face. I open its belly: inside, the cursed coin and half a bar receipt.');
  return c5coin('ciccio'); });
/* Peppe: il debito del 1973 */
(()=>{ const old=AV_S['c5|talk:nonno']; AV_S['c5|talk:nonno']=async(...a)=>{ const f=F();
  if (!f.mc_peppe && !avHas('cambiale') && f.peppeAsk){ f.cambGot=1; avSave(); avAdd('cambiale'); return np('nonno','Peppe ha una moneta? Allora deve pagarmi! Tieni la cambiale del 1973: cinquanta lire, firmata col suo sangue. Cioè col sugo, ma vale uguale.','Peppe has a coin? Then he owes me! Take the 1973 IOU: fifty lire, signed in his blood. Well, in tomato sauce, but it counts.'); }
  return old(...a); }; })();
(()=>{ const old=AV_S['c5|talk:peppe']; AV_S['c5|talk:peppe']=async(...a)=>{ const f=F();
  if (!f.mc_peppe && !f.peppeAsk){ f.peppeAsk=1; avSave(); await np('peppe','Ho una moneta d\'oro in tasca e da ieri mangio la dentiera. Te la darei, ma non regalo niente a nessuno dal 1946. Al massimo pago i debiti. Se me li dimostri.','I\'ve a gold coin in my pocket and since yesterday I\'ve been eating my dentures. I\'d give it to you, but I haven\'t given anything away since 1946. At most I pay debts. If you prove them.');
    return me('Un debito di Peppe... il nonno ha detto che gli deve cinquanta lire del 1973!','A debt of Peppe\'s... grandpa said he owes him fifty lire from 1973!'); }
  return old(...a); }; })();
avOnN(5,'give:peppe:cambiale',async()=>{ avDel('cambiale'); await np('peppe','La mia firma col sugo! Quel bastardo l\'ha tenuta per cinquant\'anni. Va bene, pago. Con gli interessi: ecco una moneta d\'oro maledetta. Così ci rimette lui.','My tomato-sauce signature! The bastard kept it for fifty years. Fine, I\'ll pay. With interest: here\'s a cursed gold coin. That way he loses out.');
  avTrophy('cambiale','Peppe ha pagato un debito del 1973. Con gli interessi di una maledizione.','Peppe paid a 1973 debt. With a curse for interest.'); return c5coin('peppe'); });
avOnN(5,'look:monete',()=>me(`Monete maledette: ${F().mc||0}/4. Calde, viola, e mi fanno venire voglia di lasagne.`,`Cursed coins: ${F().mc||0}/4. Warm, purple, and they make me crave lasagne.`));
(()=>{ const H=AV_CHS[5].HINTS; const i=H.findIndex(h=>h[1].startsWith('Nel campanile')); H.splice(i<0?H.length:i,0,
  [()=>F().mayorFled && !F().mc_nico,'Nico in piazza vuole una canzone sulla fame per mollare la moneta.','Nico in the piazza wants a song about hunger to give up his coin.'],
  [()=>F().mayorFled && !F().mc_ugo,'Ugo al cimitero: battilo a flessioni.','Ugo at the cemetery: beat him at push-ups.'],
  [()=>F().mayorFled && !F().mc_ciccio,'Ciccio al porto ha perso la moneta in mare: parlagli e poi usa la piroga per pescare.','Ciccio at the harbour lost his coin in the sea: talk to him, then use the canoe to fish.'],
  [()=>F().mayorFled && !F().mc_peppe && !avHas('cambiale'),'Peppe paga solo i debiti dimostrati: parla con Peppe, poi chiedi al nonno al porto.','Peppe only pays proven debts: talk to Peppe, then ask grandpa at the harbour.'],
  [()=>avHas('cambiale'),'Dai la cambiale a Peppe.','Give the IOU to Peppe.']); })();
