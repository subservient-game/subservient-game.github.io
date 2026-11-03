/* ================= ENIGMI VERI AL POSTO DEI MINIGIOCHI DI RIFLESSI =================
   Capitolo 1: ogni prova fisica si risolve con un trucco da scoprire guardandosi intorno o con l'oggetto giusto.
   Sfide a carte, dadi e morra diventano la "Sfida di Sfottò": vinci solo se conosci le risposte giuste,
   e le risposte si imparano perdendo (come nelle avventure classiche). */
(()=>{ if (!window.ADV) return;
const L=(it,en)=>[it,en];
const T2=l=>(typeof LANG!=='undefined'&&LANG!=='it')?l[1]:l[0];
const ff=()=>F();
const know=k=>!!ff()['k_'+k];
const learn=(k)=>{ const f=ff(); if (!f['k_'+k]){ f['k_'+k]=1; avSave(); } };

/* ---------- indizi: guardando certe cose si scopre il trucco ---------- */
const CLUES={
  treadmill:['clip',L('Sul tapis roulant di Rocky c\'è una clip rossa di sicurezza attaccata a una cordicella. Se si stacca, il nastro si ferma di colpo. Interessante. Molto interessante.','On Rocky\'s treadmill there\'s a red safety clip on a cord. Pull it and the belt stops dead. Interesting. Very interesting.')],
  menu:['feet',L('In fondo al menù, scritto a matita: "Polpette come quelle della nonna: l\'impasto si lavora coi piedi. Puliti. Più o meno. — Totò". Ah, ecco il segreto della pizzeria.','At the bottom of the menu, in pencil: "Meatballs like Grandma\'s: you knead with your feet. Clean. Ish. — Totò". So that\'s the pizzeria\'s secret.')],
  log:['ear',L('Sul tronco qualcuno ha inciso col coltello: "ERNESTINA: si calma solo se le gratti dietro l\'orecchio SINISTRO. Il destro no. Il destro morde."','Someone carved into the log: "ERNESTINA: calms down only if you scratch behind her LEFT ear. Not the right. The right one bites."')],
  tomb3:['salt',L('Dietro la lapide storta c\'è un sacchetto di sale grosso, per il ghiaccio d\'inverno. Ugo dice sempre che le capre per il sale venderebbero la madre.','Behind the crooked headstone there\'s a bag of rock salt, for winter ice. Ugo always says goats would sell their mothers for salt.')],
  poster:['shave',L('Sotto il poster, la regola d\'oro di Salvatore: "1. Panno caldo sulla faccia. 2. Schiuma. 3. Rasoio sempre a favore di pelo. Chi rade contropelo va all\'inferno."','Under the poster, Salvatore\'s golden rule: "1. Hot towel on the face. 2. Lather. 3. Razor always with the grain. Who shaves against it goes to hell."')],
  booth:['song',L('Sulla consolle c\'è la scaletta del DJ. Accanto a "Il valzer di nonna Tina" qualcuno ha scritto: "NON METTERLA MAI QUANDO BALLA TONY: era la canzone di sua madre, si mette a piangere e si siede."','On the DJ booth there\'s the playlist. Next to "Granny Tina\'s Waltz" someone wrote: "NEVER PLAY IT WHILE TONY DANCES: it was his mum\'s song, he cries and sits down."')],
  crates:['bait',L('Sulle casse del pesce, un biglietto di Ciccio: "Esca segreta: mortadella. I pesci di qui sono di bocca buona. Come il sindaco."','On the fish crates, a note from Ciccio: "Secret bait: mortadella. The fish round here aren\'t fussy. Like the mayor."')],
};
function wrapLooks(){ for (const [hs,[k,line]] of Object.entries(CLUES)){ const key='look:'+hs; const old=AV_S[key];
  AV_S[key]=async(...a)=>{ if (!(AV.st.ch>1)){ if (old) await old(...a); learn(k); return me(line[0],line[1]); } return old?old(...a):undefined; }; } }

/* ---------- la scelta del trucco ---------- */
async function trick(opts){ // opts: [{t:[it,en], ok:true|false, show:()=>bool}]
  const list=opts.filter(o=>!o.show||o.show());
  const i=await avChoose(list.map(o=>o.t)); const o=list[i];
  if (o && o.say) await me(o.say[0],o.say[1]);
  return !!(o && o.ok); }
const mark=k=>{ const f=ff(); f['tr_'+k]=1; avSave(); };

const PUZ={
  rocky: async()=>{ mark('rocky'); await np('rocky','E non pensare di barare: ho il naso più fino del mondo. Sento l\'alcol a un chilometro. Solo l\'odore mi fa girare la testa come una lavatrice.','And don\'t think about cheating: I have the finest nose in the world. I smell alcohol a mile away. Just the smell spins my head like a washing machine.');
    return trick([{t:L('Faccio le flessioni e basta.','Just do the push-ups.'),ok:false,say:L('Una... due... muoio. Il pavimento della palestra sa di piedi.','One... two... I die. The gym floor tastes of feet.')},
      {t:L('Gli racconto una barzelletta per distrarlo.','Tell him a joke to distract him.'),ok:false,say:L('Rocky non ride. Rocky conta. Rocky ha contato anche le mie lacrime.','Rocky doesn\'t laugh. Rocky counts. Rocky counted my tears too.')},
      {t:L('Stappo la grappa del nonno sotto il suo naso.','Uncork Grandpa\'s grappa under his nose.'),ok:true,show:()=>avHas('grappa')||avHas('vino'),say:L('Stappo la bottiglia. Rocky annusa, barcolla, si siede. Comincia a contare: "Una... ventisei... venticinque...". Io ne faccio tre. Lui ne conta venticinque.','I uncork the grappa. Rocky sniffs, staggers, sits. Starts counting: "One... twenty-six... twenty-five...". I do three. He counts twenty-five.')},
      {t:L('Lascio perdere.','Give up.'),ok:false}]); },
  treadmill: async()=>{ mark('tread');
    return trick([{t:L('Corro più forte che posso.','Run as hard as I can.'),ok:false,say:L('Corro. Rocky corre. Rocky corre di più. Io vedo la luce in fondo al tunnel.','I run. Rocky runs. Rocky runs more. I see the light at the end of the tunnel.')},
      {t:L('Gli dico che ha la scarpa slacciata.','Tell him his shoe\'s untied.'),ok:false,say:L('"Il trucco più vecchio del mondo", dice. Non si gira neanche.','"Oldest trick in the book," he says. Doesn\'t even look.')},
      {t:L('Stacco la clip di sicurezza del suo tapis roulant.','Pull the safety clip on his treadmill.'),ok:true,show:()=>know('clip'),say:L('Allungo la mano e tiro la cordicella rossa. Il suo nastro si blocca, Rocky no: vola in avanti e abbraccia il muro. Io taglio il traguardo camminando.','I reach over and yank the red cord. His belt stops, Rocky doesn\'t: he flies forward and hugs the wall. I cross the line walking.')},
      {t:L('Lascio perdere.','Give up.'),ok:false}]); },
  toto: async()=>{ mark('toto');
    return trick([{t:L('Impasto con tutta la forza delle braccia.','Knead with all my arm strength.'),ok:false,say:L('Le mie braccia fanno il rumore di un grissino. L\'impasto ride.','My arms make the sound of a breadstick. The dough laughs.')},
      {t:L('Butto tutto nel frullatore.','Throw it all in the blender.'),ok:false,say:L('Totò mi strappa il frullatore di mano e lo fa benedire.','Totò snatches the blender and has it blessed.')},
      {t:L('Mi tolgo le scarpe e impasto coi piedi, come la nonna.','Take off my shoes and knead with my feet, like Grandma.'),ok:true,show:()=>know('feet'),say:L('Mi tolgo scarpe e calzini. Totò si commuove: "Come la nonna!". Pesto l\'impasto ballando la tarantella. Le polpette vengono perfette. Non dirò mai a nessuno come.','Shoes and socks off. Totò gets emotional: "Like Grandma!". I stomp the dough dancing a tarantella. Perfect meatballs. I\'ll never tell anyone how.')},
      {t:L('Lascio perdere.','Give up.'),ok:false}]); },
  milk: async()=>{ mark('milk');
    return trick([{t:L('Tiro forte e speriamo bene.','Pull hard and hope.'),ok:false},
      {t:L('Le gratto dietro l\'orecchio destro.','Scratch behind her right ear.'),ok:false,show:()=>know('ear'),say:L('Il destro. Il DESTRO. Quello che morde.','The right. The RIGHT. The one that bites.')},
      {t:L('Le canto una ninna nanna.','Sing her a lullaby.'),ok:false,say:L('Ernestina mi guarda come un critico musicale. Poi mi mangia il colletto.','Ernestina looks at me like a music critic. Then eats my collar.')},
      {t:L('Le gratto dietro l\'orecchio sinistro.','Scratch behind her left ear.'),ok:true,show:()=>know('ear'),say:L('Gratto dietro l\'orecchio sinistro. Ernestina chiude gli occhi e fa un verso che non dovrebbe fare una capra. Il latte scende da solo.','I scratch behind her left ear. Ernestina closes her eyes and makes a noise no goat should make. The milk flows by itself.')},
      {t:L('Lascio perdere.','Give up.'),ok:false}]); },
  goat: async()=>{ mark('goat');
    return trick([{t:L('La inseguo correndo tra le tombe.','Chase her between the graves.'),ok:false},
      {t:L('Le lancio un crisantemo.','Throw her a chrysanthemum.'),ok:false,say:L('Lo mangia al volo e scappa con più energia di prima.','She eats it mid-air and runs off with more energy than before.')},
      {t:L('Le offro una manciata di sale dal sacchetto dietro la lapide.','Offer her a handful of salt from the bag behind the headstone.'),ok:true,show:()=>know('salt'),say:L('Prendo una manciata di sale e tendo la mano. Ernestina frena, torna indietro, lecca. La prendo per il collare. Mi lecca anche l\'orologio.','A handful of salt, hand out. Ernestina brakes, comes back, licks. I grab her collar. She licks my watch too.')},
      {t:L('Lascio perdere.','Give up.'),ok:false}]); },
  shave: async()=>{ mark('shave');
    return trick([{t:L('Rado a secco, veloce, contropelo.','Shave dry, fast, against the grain.'),ok:false},
      {t:L('Schiuma e via, contropelo per fare prima.','Lather and go, against the grain to save time.'),ok:false},
      {t:L('Panno caldo, schiuma, poi rasoio a favore di pelo.','Hot towel, lather, then razor with the grain.'),ok:true,show:()=>know('shave'),say:L('Panno caldo. Schiuma. Rasoio a favore di pelo, lento, come in chiesa. Nonno Peppe apre un occhio: "Sei meglio di Salvatore". Salvatore finge di non aver sentito.','Hot towel. Lather. Razor with the grain, slowly, like in church. Grandpa Peppe opens one eye: "Better than Salvatore". Salvatore pretends not to hear.')},
      {t:L('Lascio perdere.','Give up.'),ok:false}]); },
  dance: async()=>{ mark('dance');
    return trick([{t:L('Ballo meglio che posso.','Dance as well as I can.'),ok:false,say:L('Ballo come un ombrello rotto in una bufera. Tony vince anche stavolta.','I dance like a broken umbrella in a storm. Tony wins again.')},
      {t:L('Gli pesto un piede "per sbaglio".','Step on his foot "by accident".'),ok:false,say:L('Tony è anche il giudice. Mi squalifica e mi pesta tutti e due i piedi.','Tony is also the judge. Disqualifies me and stamps on both my feet.')},
      {t:L('Chiedo al DJ di mettere "Il valzer di nonna Tina".','Ask the DJ for "Granny Tina\'s Waltz".'),ok:true,show:()=>know('song'),say:L('Partono le prime note del valzer. Tony si blocca, gli trema il labbro: "Mamma...". Si siede sul bordo della pista e piange nel fazzoletto. Io ballo da solo. Vinco per abbandono.','The waltz starts. Tony freezes, lip trembling: "Mamma...". He sits at the edge and cries into his hanky. I dance alone. I win by forfeit.')},
      {t:L('Lascio perdere.','Give up.'),ok:false}]); },
  fish: async()=>{ mark('fish');
    return trick([{t:L('Uso il verme che mi dà Ciccio.','Use the worm Ciccio gives me.'),ok:false,say:L('Prendo uno stivale. Poi un altro stivale. Ora ho un paio di stivali e nessun pesce.','I catch a boot. Then another boot. Now I have a pair of boots and no fish.')},
      {t:L('Lancio la lenza il più lontano possibile.','Cast as far as I can.'),ok:false,say:L('La lenza si impiglia nella barca di Baffo. Baffo non è contento.','The line snags on Baffo\'s boat. Baffo is not happy.')},
      {t:L('Metto la mortadella come esca, come scritto sulle casse.','Bait with mortadella, like the note on the crates said.'),ok:true,show:()=>know('bait'),say:L('Mortadella sull\'amo. Cinque lanci, cinque pesci. Uno ha ancora un pezzo di pistacchio in bocca. Ciccio si toglie il cappello.','Mortadella on the hook. Five casts, five fish. One still has a pistachio in its mouth. Ciccio takes off his hat.')},
      {t:L('Lascio perdere.','Give up.'),ok:false}]); },
  crows: async()=>{ mark('crows'); await avSay('voice',T('Sul nido, il capo dei corvi ha in testa una piuma nera lunghissima. Gli altri corvi gli obbediscono come soldatini.','On the nest, the crow chief wears a very long black feather. The others obey him like toy soldiers.'));
    return trick([{t:L('Li prendo a schiaffi uno per uno.','Slap them one by one.'),ok:false},
      {t:L('Agito la torcia per spaventarli.','Wave the torch to scare them.'),ok:false,show:()=>avHas('torcia'),say:L('I corvi credono che sia una discoteca. Ballano. Poi mi beccano a ritmo.','The crows think it\'s a disco. They dance. Then they peck me in rhythm.')},
      {t:L('Mi infilo la piuma nera del Corvo tra i capelli e gracchio da capo.','Stick the Crow\'s black feather in my hair and caw like a boss.'),ok:true,show:()=>avHas('piuma'),say:L('Mi metto la piuma nera in testa e faccio "CRA" con la voce più autoritaria che ho. I corvi si mettono sull\'attenti. Il capo-corvo mi guarda, mi fa un inchino e se ne va offeso. Il nido è mio.','I stick the black feather on my head and go "CRAW" in my most commanding voice. The crows stand to attention. The chief bows and leaves, offended. The nest is mine.')},
      {t:L('Lascio perdere.','Give up.'),ok:false}]); },
};

/* ---------- Sfida di Sfottò ---------- */
const SF=[
 [L('Ho visto vongole con più cervello di te.','I\'ve seen clams with more brains than you.'),L('Le avrai viste allo specchio, mentre ti pettinavi.','You saw them in the mirror, combing your hair.')],
 [L('Ti batterò come si batte un tappeto.','I\'ll beat you like a rug.'),L('Allora per la prima volta in vita tua avrai fatto le pulizie.','Then for once in your life you\'ll have done some cleaning.')],
 [L('Hai il carisma di un parcheggio vuoto.','You have the charisma of an empty car park.'),L('E tu la simpatia di un divieto di sosta.','And you the charm of a no-parking sign.')],
 [L('Mia nonna gioca meglio di te, ed è morta nel \'98.','My nan plays better than you, and she died in \'98.'),L('Lo so: l\'ha uccisa la noia di giocare con te.','I know: boredom from playing with you killed her.')],
 [L('Puzzi come un cassonetto ad agosto.','You stink like a bin in August.'),L('Mi sarò seduto troppo vicino a te.','I must have sat too close to you.')],
 [L('Sei così lento che i bradipi ti sorpassano.','You\'re so slow sloths overtake you.'),L('Rallento apposta, così hai il tempo di capire le regole.','I slow down on purpose, so you have time to learn the rules.')],
 [L('Le tue mosse sono prevedibili come le tasse.','Your moves are as predictable as taxes.'),L('E le tue sono inutili come i rimborsi.','And yours are as useless as tax refunds.')],
 [L('Ti ho visto piangere al matrimonio di tua sorella.','I saw you cry at your sister\'s wedding.'),L('Piangevo perché il rinfresco lo avevi portato tu.','I cried because you brought the buffet.')],
 [L('Hai più debiti che capelli.','You have more debts than hairs.'),L('I capelli li ho ancora. Tu la dignità l\'hai persa da un pezzo.','I still have my hair. You lost your dignity ages ago.')],
 [L('Con quella faccia potresti fare lo spaventapasseri.','With that face you could be a scarecrow.'),L('Ci ho provato, ma i passeri preferivano la tua.','I tried, but the sparrows preferred yours.')],
 [L('Non vinceresti neanche a nascondino da solo.','You couldn\'t win hide-and-seek alone.'),L('Infatti mi nascondevo da te. Ed è andata benissimo.','I was hiding from you. Went great.')],
 [L('Il tuo cervello ha la batteria scarica.','Your brain\'s battery is flat.'),L('Almeno si ricarica. Il tuo è ancora in garanzia: mai usato.','At least mine recharges. Yours is still under warranty: never used.')],
 [L('Hai l\'eleganza di un trattore in salita.','You have the elegance of a tractor going uphill.'),L('E tu la velocità di una pratica al Comune.','And you the speed of paperwork at the Town Hall.')],
 [L('Ti farò rimpiangere di essere nato.','I\'ll make you regret being born.'),L('Troppo tardi: ci ha già pensato tuo padre quando ti ha visto.','Too late: your father did that the day he saw you.')],
 [L('Hai il fascino di una bolletta del gas.','You have the allure of a gas bill.'),L('E come la bolletta, tu mi fai sbadigliare a fine mese.','And like the bill, you make me yawn at the end of the month.')],
 [L('Ti conviene arrenderti subito.','You\'d better give up now.'),L('Arrendermi? Ho visto come giochi: è già una resa.','Give up? I\'ve seen you play: that\'s already a surrender.')],
];
const FILL=L('Ehm... ah sì? Beh... tua madre!','Erm... oh yeah? Well... your mother!');
function known(){ AV.st.sfotto=AV.st.sfotto||[]; return AV.st.sfotto; }
async function sfida(opp, level){
  const pool=SF.slice(0, level>=2?16:10), need=level>=2?4:3;
  await avSay('voice', T(`Sfida di Sfottò con ${opp}! Vince chi risponde a tono a ${need} sfottò di fila. Le risposte che non sai le impari perdendo.`, `Banter Duel with ${opp}! Win by answering ${need} jibes in a row. Comebacks you don't know, you learn by losing.`));
  const order=pool.map((_,i)=>i).sort(()=>Math.random()-.5).slice(0,need); const K=known();
  for (let r=0;r<need;r++){ const q=order[r];
    await avSay('voice', `${opp}: «${T2(SF[q][0])}»`);
    let opts=[...new Set(K)].filter(i=>i<SF.length).map(i=>({i,t:SF[i][1]})).sort(()=>Math.random()-.5).slice(0,5);
    if (!opts.some(o=>o.i===q) && K.includes(q)) opts[opts.length-1]={i:q,t:SF[q][1]};
    opts.push({i:-1,t:FILL}); opts=opts.sort(()=>Math.random()-.5);
    const c=await avChoose(opts.map(o=>o.t)); const pick=opts[c];
    await me(pick.t[0],pick.t[1]);
    if (!pick || pick.i!==q){ await avSay('voice', T(`${opp} ride: «Pivello! La risposta giusta era: "${SF[q][1][0]}"»`, `${opp} laughs: "Rookie! The right comeback was: '${SF[q][1][1]}'"`));
      if (!K.includes(q)){ K.push(q); avSave(); try{ avToast(T('📝 Hai imparato una risposta nuova ('+K.length+'/'+SF.length+')','📝 New comeback learned ('+K.length+'/'+SF.length+')')); }catch(e){} }
      return false; }
    await avSay('voice', T(`Colpito! ${opp} accusa il colpo. (${r+1}/${need})`, `Hit! ${opp} reels. (${r+1}/${need})`)); }
  return true; }
window.avSfida=sfida; window.__SF=SF;

/* ---------- aggancio ai vecchi minigiochi ---------- */
function boot(){
  wrapLooks();
  const ch1=()=>!(AV.st.ch>1);
  const oP=window.avPushups; window.avPushups=async function(goal,secs){ if (ch1()){ if (H.room==='gym' && goal===25) return PUZ.rocky(); if (H.room==='gym' && goal===30) return PUZ.treadmill(); if (goal===20) return PUZ.toto(); if (goal===15) return PUZ.milk(); if (goal===22) return PUZ.goat(); } return oP?oP.apply(this,arguments):true; };
  const oF=window.avFishing; window.avFishing=async function(){ if (ch1()) return PUZ.fish(); return oF?oF.apply(this,arguments):true; };
  const oC=window.avCrows; window.avCrows=async function(){ if (ch1()) return PUZ.crows(); return oC?oC.apply(this,arguments):true; };
  const oS=window.avShaveGame; window.avShaveGame=async function(){ if (ch1()) return PUZ.shave(); return oS?oS.apply(this,arguments):true; };
  const oD=window.avDanceGame; window.avDanceGame=async function(){ if (ch1()) return PUZ.dance(); return oD?oD.apply(this,arguments):true; };
  window.avBriscola=async function(opp,level){ return sfida(opp||'?', level||1); };
  window.avDiceGame=async function(){ return sfida(T('Ercole','Ercole'),2); };
  window.avMorraGame=async function(){ return sfida('Gina',2); };
  // suggerimenti per i trucchi
  try{ const H1=[
    [()=>F().tr_rocky && !F().pushups && !avHas('grappa'),'Rocky sviene all\'odore dell\'alcol. In cantina, a casa, le botti del nonno sono piene di grappa.','Rocky faints at the smell of alcohol. Back home, Grandpa\'s cellar barrels are full of grappa.'],
    [()=>F().tr_rocky && !F().pushups && avHas('grappa'),'Rocky sviene all\'odore dell\'alcol... e tu hai la grappa del nonno.','Rocky faints at the smell of alcohol... and you have Grandpa\'s grappa.'],
    [()=>F().tr_tread && !F().cigarGiven && !avHas('sigaro') && !F().k_clip,'Prima della gara, guarda bene il tapis roulant di Rocky.','Before the race, look closely at Rocky\'s treadmill.'],
    [()=>F().tr_toto && !F().k_feet && !avHas('polpette') && !F().dogFed,'Totò ha un segreto di famiglia per l\'impasto. È scritto da qualche parte in pizzeria.','Totò has a family kneading secret. It\'s written somewhere in the pizzeria.'],
    [()=>F().tr_milk && !F().k_ear && !avHas('latte'),'Ernestina ha un punto debole. Rino ha lasciato un messaggio nel bosco.','Ernestina has a weak spot. Rino left a message in the woods.'],
    [()=>F().tr_goat && !F().k_salt && !F().goatBack,'Le capre farebbero di tutto per una cosa... guarda bene tra le tombe.','Goats would do anything for one thing... look carefully among the graves.'],
    [()=>F().tr_shave && !F().k_shave && !F().shaveDone,'Salvatore ha appeso le sue regole da qualche parte nel negozio.','Salvatore has his rules posted somewhere in the shop.'],
    [()=>F().tr_dance && !F().k_song && !F().danceWon,'Tony ha un punto debole musicale. Il DJ lo sa: dai un\'occhiata alla consolle.','Tony has a musical weak spot. The DJ knows: check the booth.'],
    [()=>F().tr_fish && !F().k_bait && !F().fishDone,'Ciccio ha un\'esca segreta. Guarda le sue casse del pesce.','Ciccio has a secret bait. Look at his fish crates.'],
    [()=>F().tr_crows && !F().nestDone && !avHas('piuma'),'I corvi obbediscono a chi porta la piuma nera.','The crows obey whoever wears the black feather.']];
    AV_HINTS.unshift(...H1); }catch(e){}
}
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
