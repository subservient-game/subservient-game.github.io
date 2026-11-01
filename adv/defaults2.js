/* Seconda infornata di risposte di ripiego */
(()=>{ if (!window.AV_DEF) return; const {G,C,NPC,SELF}=AV_DEF; const L=(it,en)=>[it,en];
const add=(arr,...xs)=>arr.push(...xs);
const cat=(c,v,...xs)=>{ C[c]=C[c]||{}; C[c][v]=C[c][v]||[]; C[c][v].push(...xs); };
add(G.look,
 L('{N}. Lo esamino con la stessa attenzione che metto nelle istruzioni dell\'IKEA. Cioè zero.','{N}. I examine it with the care I give IKEA instructions. Zero.'),
 L('{N}. Se fosse una persona, sarebbe quella che a un matrimonio balla da sola.','{N}. If it were a person, it\'d be the one dancing alone at a wedding.'),
 L('{N}. Lo guardo così a lungo che mi parte un mutuo.','{N}. I stare so long I end up with a mortgage.'),
 L('{N}. Neanche un indizio. Questo posto è più avaro di mio zio a Natale.','{N}. Not one clue. This place is stingier than my uncle at Christmas.'),
 L('{N}. Emana la stessa energia di un ex che ti scrive alle tre di notte.','{N}. Gives off the energy of an ex texting at 3 a.m.'),
 L('{N}. Lo studio come un critico d\'arte ubriaco. Voto: sei meno.','{N}. I study it like a drunk art critic. Grade: C minus.'),
 L('{N}. Mi ricorda qualcosa. Forse il mio primo esaurimento.','{N}. Reminds me of something. Possibly my first breakdown.'),
 L('{N}. Ha visto cose. Cose brutte. Tipo me in mutande.','{N}. It\'s seen things. Bad things. Like me in my pants.'),
 L('{N}. Se c\'è un segreto qui, se lo tiene stretto meglio del prete del paese.','{N}. If there\'s a secret here, it keeps it better than the village priest.'),
 L('{N}. Più noioso di una messa in latino senza vino.','{N}. Duller than a Latin mass without the wine.'),
 L('{N}. Lo guardo dritto negli occhi. Non ha occhi. Ho perso lo stesso.','{N}. I look it straight in the eye. It has no eyes. I still lose.'),
 L('{N}. Uno spettacolo che ti fa rimpiangere la televisione regionale.','{N}. A sight that makes you miss regional TV.'),
);
add(G.take,
 L('Prendere {n}? E poi cosa faccio, lo porto a cena?','Take {n}? Then what, take it to dinner?'),
 L('Allungo la mano verso {n}. La mia coscienza me la schiaffeggia. Dove sei stata finora, coscienza?','I reach for {n}. My conscience slaps my hand. Where were you all these years, conscience?'),
 L('{N}? Mi servirebbe come un pettine a un calvo.','{N}? Useful as a comb to a bald man.'),
 L('Non prendo {n}. Ho già un armadio pieno di cose inutili. Tipo il mio diploma.','I won\'t take {n}. My wardrobe\'s full of useless things. Like my diploma.'),
 L('Se mi metto in tasca anche {n} sembro un rigattiere in fuga.','If I pocket {n} too I\'ll look like a junk dealer on the run.'),
 L('Prendere {n}? La mia schiena ha appena chiamato il sindacato.','Take {n}? My back just called the union.'),
 L('Tiro {n}. {N} non si [muove|muovono]. Io sì, all\'indietro, col culo per terra.','I yank {n}. It doesn\'t budge. I do: backwards, arse on the floor.'),
 L('Con {n} in tasca camminerei come un pinguino con l\'emorroidi.','With {n} in my pocket I\'d walk like a penguin with piles.'),
 L('No. Ho già rubato abbastanza in questa vita. Due penne e un cuore. Il cuore l\'ho restituito.','No. I\'ve stolen enough in this life. Two pens and a heart. I gave the heart back.'),
 L('Prendere {n}? Ma ti sembro uno che porta a termine le cose?','Take {n}? Do I look like someone who finishes things?'),
);
add(G.use,
 L('Uso {n}. L\'universo sbadiglia.','I use {n}. The universe yawns.'),
 L('Faccio qualcosa con {n}. Non so cosa. Non lo sa nemmeno {n}.','I do something with {n}. No idea what. Neither does {n}.'),
 L('{N} e io non abbiamo chimica. È come i miei appuntamenti su internet.','{N} and I have no chemistry. Like my online dates.'),
 L('Armeggio con {n} con la grazia di un elefante col singhiozzo.','I fiddle with {n} with the grace of an elephant with hiccups.'),
 L('Uso {n} come mi ha insegnato mio padre: male e bestemmiando.','I use {n} the way Dad taught me: badly, and swearing.'),
 L('Niente. Neanche un rumorino. Un fallimento così pulito che quasi mi commuovo.','Nothing. Not a peep. A failure so clean I nearly cry.'),
 L('Uso {n}. Succede quello che succede quando mi impegno: niente, ma più stanco.','I use {n}. What happens when I try hard happens: nothing, but I\'m tired.'),
 L('Ci metto tutta la mia esperienza. Ventidue anni di fallimenti. Non bastano.','I put all my experience into it. Twenty-two years of failure. Not enough.'),
 L('Se continuo a usare {n} così mi denunciano per molestie.','If I keep using {n} like this they\'ll do me for harassment.'),
 L('Funzionerebbe, se fossi un genio. Spoiler: non lo sono.','It would work if I were a genius. Spoiler: I\'m not.'),
);
add(G.open,
 L('Apro {n}? È più ermetico di un notaio a pranzo.','Open {n}? Tighter than a notary at lunch.'),
 L('Faccio leva su {n} con le unghie. Ora ho dieci unghie in meno e un trauma in più.','I lever {n} with my nails. Ten fewer nails, one more trauma.'),
 L('{N} non ha nessuna intenzione di aprirsi. Come il mio terapeuta sulle sue tariffe.','{N} has no intention of opening. Like my therapist about his fees.'),
 L('Cerco una fessura in {n}. L\'unica fessura qui è la mia autostima.','I look for a crack in {n}. The only crack here is my self-esteem.'),
 L('Provo con un calcio. {N} non si [apre|aprono]. Si apre il mio alluce.','I try a kick. It doesn\'t open. My big toe does.'),
 L('Aprire {n}? Neanche un mago della TV con un piede di porco.','Open {n}? Not even a TV psychic with a crowbar.'),
);
add(G.talk,
 L('Faccio a {n} la mia proposta di matrimonio. Silenzio. Almeno non ha detto no.','I propose to {n}. Silence. At least it didn\'t say no.'),
 L('Racconto a {n} una barzelletta sporca. Non ride. Nessuno ride mai alle mie barzellette.','I tell {n} a dirty joke. It doesn\'t laugh. Nobody ever does.'),
 L('Busso su {n} e chiedo «c\'è nessuno?». Nessuna risposta. Come mia moglie quando chiedo chi lava i piatti.','"{N}, you awake?" No answer. Like my wife when I ask who\'s doing the dishes.'),
 L('Chiedo consiglio a {n}. Silenzio saggio. È il miglior consiglio che ho ricevuto in anni.','I ask {n} for advice. Wise silence. Best advice I\'ve had in years.'),
 L('Litigo con {n}. Vinco io. È la prima discussione che vinco dal 1998.','I argue with {n}. I win. First argument I\'ve won since 1998.'),
 L('Confesso a {n} i miei peccati. Silenzio sconvolto. Lo capisco.','I confess my sins to {n}. Shocked silence. Fair enough.'),
);
add(G.combo,
 L('{I} con {n}? Questa combinazione la vieta anche la Convenzione di Ginevra.','{I} with {n}? Even the Geneva Convention bans that one.'),
 L('Unisco {i} e {n}. Ottengo un\'opera d\'arte contemporanea. Brutta, ma vale un milione.','I combine {i} and {n}. I get contemporary art. Ugly, but worth a million.'),
 L('Sbatto {i} contro {n}. Rumore sordo. Come la mia carriera.','I bang {i} against {n}. A dull thud. Like my career.'),
 L('{I} e {n} si guardano. Si odiano. Li capisco tutti e due.','{I} and {n} look at each other. They hate each other. I get it.'),
 L('Uso {i} su {n} con la sicurezza di un chirurgo. Un chirurgo radiato.','I use {i} on {n} with a surgeon\'s confidence. A struck-off surgeon.'),
 L('Se metto insieme {i} e {n} ottengo solo una figura di merda in due pezzi.','Putting {i} and {n} together gets me a two-piece embarrassment.'),
 L('No. Neanche dopo tre grappe {i} va bene con {n}.','No. Not even after three grappas does {i} go with {n}.'),
 L('Tento l\'abbinamento {i} più {n}. MasterChef mi caccerebbe a calci.','I try pairing {i} with {n}. MasterChef would kick me out.'),
);
/* categorie */
cat('food','look',L('{N}. Profuma di domenica dalla nonna. E di colesterolo.','{N}. Smells like Sunday at Nan\'s. And cholesterol.'),L('{N}. Il mio medico dice di no. Il mio medico è a dieta da trent\'anni e non è felice.','{N}. My doctor says no. My doctor\'s been dieting thirty years and is miserable.'),L('{N}. Ci sono mosche che fanno la fila. Buon segno.','{N}. Flies queueing for it. Good sign.'));
cat('food','take',L('Rubare il cibo è peccato. Lo so perché mia madre me lo diceva mentre mi rubava le patatine.','Stealing food is a sin. Mum told me while nicking my chips.'),L('Lo prendo e lo mangio subito, così le prove spariscono? Tentazione forte. Resisto. Per un pelo.','Take it and eat it so the evidence vanishes? Tempting. I resist. Barely.'));
cat('food','use',L('Lecco {n}. Così, per scienza. Ora so che sa di {n}.','I lick {n}. For science. Now I know it tastes of {n}.'),L('Spalmarmi {n} addosso? No, quella è un\'altra serata.','Rub {n} on myself? No, that\'s a different kind of night.'));
cat('food','talk',L('Sussurro a {n}: «tra poco sarai mio». Sembro un maniaco. Sono un maniaco del cibo.','I whisper to {n}: "soon you\'ll be mine." I sound like a creep. A food creep.'));
cat('drink','look',L('{N}. Dentro c\'è la soluzione a tutti i problemi. E l\'inizio di tutti gli altri.','{N}. Inside is the answer to every problem. And the start of all the others.'),L('{N}. Mio nonno ci avrebbe fatto colazione.','{N}. Grandad would\'ve had that for breakfast.'));
cat('drink','use',L('Un sorso? L\'ultima volta che ho detto «un sorso» mi sono svegliato a Rimini con un tatuaggio.','A sip? Last time I said "a sip" I woke up in Rimini with a tattoo.'),L('Brindo con {n} alla mia salute. Ironia.','I toast my health with {n}. Irony.'));
cat('drink','talk',L('Parlo con {n}. Di solito parlo così solo dopo averlo bevuto.','I talk to {n}. Usually I only do that after drinking it.'));
cat('door','look',L('{N}. Il confine tra dove sono e dove dovrei essere. Come sempre, sono dalla parte sbagliata.','{N}. The line between where I am and where I should be. As ever, wrong side.'),L('{N}. Qualcuno ci ha scritto sopra una parolaccia. A matita. Un vandalo educato.','{N}. Someone wrote a swear word on it. In pencil. A polite vandal.'));
cat('door','use',L('Ci metto l\'orecchio contro. Sento una radio, un russare e il mio cuore che si arrende.','Ear to it. I hear a radio, snoring and my heart giving up.'),L('Suono, busso, fischio. Neanche i Testimoni di Geova insistono così.','I ring, knock, whistle. Even Jehovah\'s Witnesses don\'t try this hard.'));
cat('door','open',L('Spallata epica. Rumore di ossa. Le mie.','Epic shoulder charge. Sound of bones. Mine.'));
cat('door','take',L('Smontare {n} dai cardini? Non sono un ladro di porte. Ho dei limiti, pochi, ma questo è uno.','Take {n} off its hinges? I\'m no door thief. I have few limits, but that\'s one.'));
cat('furn','look',L('{N}. Mobile di famiglia. Tramandato per generazioni perché nessuno lo voleva.','{N}. Family heirloom. Passed down for generations because nobody wanted it.'),L('{N}. Ci hanno fatto cose, qui sopra. Non voglio sapere quali.','{N}. Things have happened on that. I don\'t want to know what.'));
cat('furn','use',L('Mi stendo su {n} un secondo. Mi sveglio con la bava e la stessa vita di prima.','I lie on {n} for a second. I wake up drooling, same life as before.'),L('Uso {n} per fare stretching. Mi si blocca la schiena. Ottimo, ora sono in tema col mobilio.','I stretch on {n}. My back locks. Great, now I match the furniture.'));
cat('furn','talk',L('«Che bello, {n}» dico. Detto ad alta voce suona come una cosa sconcia.','"Nice {n}," I say. Out loud it sounds filthy.'));
cat('tech','look',L('{N}. Lo hanno costruito quando la garanzia durava più del matrimonio.','{N}. Built when warranties outlasted marriages.'),L('{N}. Ronza. O sono io che ronzo. Dopo una certa età non si capisce.','{N}. It hums. Or I hum. Past a certain age you can\'t tell.'));
cat('tech','use',L('Lo spengo e lo riaccendo. Il trucco dei tecnici. Non funziona, ma ora mi sento un tecnico.','Off and on again. The technicians\' trick. Doesn\'t work, but I feel like a technician.'),L('Ci soffio dentro come nelle cassette del Nintendo. Esce polvere. E un ragno offeso.','I blow into it like an old game cartridge. Dust comes out. And an offended spider.'),L('Gli do un calcio ben assestato. Il metodo di mio zio elettricista. Mio zio è morto fulminato.','A well-aimed kick. My electrician uncle\'s method. He died electrocuted.'));
cat('tech','take',L('Portarmi via {n}? Me lo vedo già: io che scappo col filo che mi strozza.','Make off with {n}? I can see it now: me fleeing, strangled by the cable.'));
cat('plant','look',L('{N}. Più curato del mio giardino. Che è un vaso di basilico morto nel 2019.','{N}. Better kept than my garden. Which is a pot of basil that died in 2019.'),L('{N}. Qui ci ha fatto pipì almeno un cane, un ubriaco e forse un assessore.','{N}. At least a dog, a drunk and maybe a councillor have peed here.'));
cat('plant','use',L('Ci faccio pipì? No. Ci sono testimoni. E telecamere. E mia madre, idealmente.','Pee on it? No. Witnesses. Cameras. And Mum, spiritually.'),L('Annuso {n}. Mi parte uno starnuto che sveglia mezzo paese.','I sniff {n}. I sneeze so hard half the town wakes up.'));
cat('plant','take',L('Raccogliere {n}? Mi denuncerebbero gli ambientalisti. E le vecchiette del quartiere, che sono peggio.','Pick {n}? The environmentalists would sue. And the neighbourhood grannies, who\'re worse.'));
cat('animal','look',L('{N}. Mi fissa. Io fisso. Chi abbassa lo sguardo per primo paga il caffè. Pago io.','{N}. It stares. I stare. First to blink buys coffee. I pay.'),L('{N}. Ha l\'aria di chi ha visto il mio profilo social e non ha messo like.','{N}. Looks like it saw my profile and didn\'t like it.'));
cat('animal','talk',L('Faccio il verso a {n}. Sguardo di pena. Anche gli animali pensano che io sia un idiota.','I imitate {n}. It looks at me with pity. It thinks I\'m an idiot too.'),L('«Chi è un bravo animale? Tu!» Non reagisce. Ha capito che sto mentendo.','"Who\'s a good animal? You are!" No reaction. It knows I\'m lying.'));
cat('animal','take',L('Lo prendo in braccio? L\'ultima volta che ho preso in braccio un animale mi ha fatto la pipì sulla camicia buona.','Pick it up? Last animal I held peed on my good shirt.'));
cat('animal','use',L('Accarezzo {n}. Mi morde. Me lo merito, ammettiamolo.','I pet {n}. It bites. I deserve it, let\'s be honest.'));
cat('water','look',L('{N}. Limpido? No. Ci galleggia qualcosa che spero sia un tronco.','{N}. Clear? No. Something\'s floating that I hope is a log.'),L('{N}. Mi viene voglia di fare pipì. È una reazione scientifica, non giudicatemi.','{N}. Makes me need a wee. It\'s science, don\'t judge.'));
cat('water','use',L('Mi lavo la faccia. Sotto c\'è sempre la stessa faccia. Delusione.','I wash my face. Same face underneath. Disappointing.'),L('Ci sputo dentro per vedere i cerchi. Il divertimento di un uomo adulto solo.','I spit in to watch the ripples. The fun of a grown man alone.'));
cat('water','talk',L('Urlo dentro {n} per sentire l\'eco. Nessuna eco. Solo un gabbiano che ride.','I yell into {n} for an echo. No echo. Just a gull laughing.'));
cat('paper','look',L('{N}. Lo leggo con la faccia da intellettuale. Lo tengo al contrario.','{N}. I read it with my intellectual face. Upside down.'),L('{N}. Firma illeggibile. O è un medico, o un serial killer. O tutti e due.','{N}. Illegible signature. A doctor, a serial killer, or both.'));
cat('paper','use',L('Ci soffio il naso? No. È carta da indagine, non da moccio.','Blow my nose on it? No. Evidence paper, not snot paper.'),L('Faccio finta di prendere appunti. Disegno un pene. Maturità zero.','I pretend to take notes. I draw a willy. Maturity: zero.'));
cat('paper','talk',L('Leggo {n} ad alta voce con la voce del presentatore del Festival. Nessuno applaude.','I read {n} aloud in a game-show host voice. Nobody claps.'));
cat('money','look',L('{N}. Il profumo dei soldi. Sa di mani sporche e di sogni.','{N}. The smell of money. Dirty hands and dreams.'));
cat('money','take',L('La mano va da sola. La fermo con l\'altra. Ora sembro posseduto.','My hand moves on its own. I stop it with the other. Now I look possessed.'),L('Prendere {n}? Lo farei, ma il karma qui ha l\'avvocato.','Take {n}? I would, but karma round here has a lawyer.'));
cat('tool','look',L('{N}. Nelle mani di mio padre era uno strumento. Nelle mie è una denuncia per lesioni.','{N}. In Dad\'s hands, a tool. In mine, an injury lawsuit.'));
cat('tool','use',L('Agito {n} in aria con aria minacciosa. L\'aria non si spaventa.','I wave {n} about menacingly. The air isn\'t scared.'),L('Uso {n} a caso. Mi colpisco un dito. Ecco a cosa serve: a farmi bestemmiare.','I use {n} at random. Hit my finger. That\'s what it\'s for: making me swear.'));
cat('tool','take',L('Prendo {n}? Con la mia fortuna me lo infilo in un occhio entro dieci minuti.','Take {n}? With my luck it\'s in my eye within ten minutes.'));
cat('trash','look',L('{N}. Un ecosistema. Credo che qualcosa lì dentro abbia una partita IVA.','{N}. An ecosystem. I think something in there has a tax number.'),L('{N}. Puzza così tanto che i gatti fanno il giro largo.','{N}. Stinks so bad the cats go the long way round.'));
cat('trash','use',L('Ci butto dentro i miei buoni propositi per l\'anno nuovo. Si sentiranno a casa.','I throw in my New Year\'s resolutions. They\'ll feel at home.'));
cat('trash','talk',L('Parlo con {n}. Una mosca mi risponde. È la conversazione più profonda della giornata.','I talk to {n}. A fly answers. Deepest conversation all day.'));
cat('vehicle','look',L('{N}. Ha più chilometri di mia zia. E meno incidenti, forse.','{N}. More miles than my aunt. Maybe fewer accidents.'),L('{N}. Il proprietario guida come se lo inseguisse la Finanza. Si capisce dalle ammaccature.','{N}. The owner drives like the tax police are chasing. You can tell from the dents.'));
cat('vehicle','use',L('Suono il clacson. Mi manda a quel paese un vecchio da un balcone. Tradizione rispettata.','I honk. An old man on a balcony tells me where to go. Tradition upheld.'),L('Faccio brum brum con la bocca. Non parte. Ma mi sento più giovane.','I go vroom vroom. It doesn\'t start. But I feel younger.'));
cat('place','look',L('{N}. Fondato da qualcuno, abbandonato da tutti, restaurato da nessuno.','{N}. Founded by someone, abandoned by all, restored by nobody.'),L('{N}. Ci hanno girato un film. Un film brutto. Qui tutto è un film brutto.','{N}. They shot a film here. A bad one. Everything here is a bad film.'));
cat('place','use',L('Ci scrivo sopra il mio nome? No, ho quarant\'anni. Quasi. Ok, lo scrivo piccolo.','Write my name on it? No, I\'m nearly forty. Fine, I write it small.'),L('Mi faccio un selfie davanti a {n}. Esce male. Non è colpa di {n}.','Selfie in front of {n}. It\'s bad. Not {n}\'s fault.'));
cat('place','open',L('Aprire {n}? Lo apre solo il sindaco, con le forbici, il nastro e i fotografi.','Open {n}? Only the mayor opens that, with scissors, ribbon and photographers.'));
/* personaggi */
add(NPC.talk,
 L('Parlo solo in presenza del mio avvocato. Il mio avvocato sono io, e non ho voglia.','I only talk with my lawyer present. I\'m my lawyer, and I can\'t be bothered.'),
 L('Se mi rifai la stessa domanda ti rispondo in dialetto stretto. E ti offendo.','Ask me again and I\'ll answer in thick dialect. And insult you.'),
 L('Ma tu non hai una casa? Una famiglia? Un hobby? Un medico?','Don\'t you have a home? A family? A hobby? A doctor?'),
 L('Sto pensando. Non si vede, ma sto pensando. A come sparire.','I\'m thinking. You can\'t tell, but I am. About how to vanish.'),
 L('Hai l\'alito di uno che ha mangiato aglio e rimorsi.','Your breath smells of garlic and regret.'),
 L('Ascolta, bello: io parlo, tu annuisci, poi te ne vai. Facciamo così.','Listen, pal: I talk, you nod, you leave. Deal.'),
 L('Ancora? Ma ti pagano un tanto a chiacchiera?','Again? Are you paid by the chat?'),
 L('Non ho niente di nuovo da dirti. A parte che hai la patta aperta.','Nothing new to tell you. Except your fly\'s open.'),
);
add(NPC.give,
 L('{I}? Mettilo dove non batte il sole. Con affetto.','{I}? Put it where the sun don\'t shine. With love.'),
 L('Ma ti sembro uno che ha bisogno di {i}? Non rispondere.','Do I look like I need {i}? Don\'t answer.'),
 L('Me lo dai perché ti fa schifo, vero? Ti conosco.','You\'re giving it to me because it\'s gross, right? I know you.'),
 L('Se accetto {i} poi devo ricambiare. E io non ricambio mai. Chiedi alla mia ex.','If I take {i} I\'ll owe you. I never pay back. Ask my ex.'),
 L('L\'ultima volta che ho accettato {i} da uno sconosciuto mi sono svegliato in Albania.','Last time I took {i} from a stranger I woke up in Albania.'),
 L('Che schifo. Puzza di tasca tua.','Gross. It smells of your pocket.'),
);
add(NPC.use,
 L('Toccami ancora e ti faccio una recensione negativa su tutti i siti.','Touch me again and I\'ll leave you a one-star review everywhere.'),
 L('Giù le mani. Non sono un distributore automatico.','Hands off. I\'m not a vending machine.'),
);
add(NPC.combo,
 L('Mi punti {i} addosso? Ma sei scemo o ti alleni?','Pointing {i} at me? Are you stupid or just practising?'),
 L('Allontana {i}, o ti faccio conoscere i miei cugini. Sono tanti. E disoccupati.','Get {i} away, or meet my cousins. There are lots. Unemployed.'),
);
add(SELF.look, L('Mi controllo. Tutto a posto, a parte tutto.','I check myself. All fine, apart from everything.'), L('Ho una macchia sulla camicia a forma di Sicilia. Almeno ho cultura.','There\'s a Sicily-shaped stain on my shirt. At least I\'m cultured.'));
add(SELF.use, L('Mi do una pacca sulla spalla. Nessun altro lo farebbe.','I pat myself on the back. Nobody else will.'), L('Mi do un pizzicotto. Non è un sogno. Purtroppo.','I pinch myself. Not a dream. Sadly.'));
add(SELF.talk, L('Mi faccio i complimenti da solo. Sono d\'accordo con me. Raro.','I compliment myself. I agree with me. Rare.'));
add(SELF.combo, L('Mi infilo {i} in tasca, poi lo tolgo, poi lo rimetto. Sono un uomo indeciso.','I pocket {i}, take it out, put it back. A man of indecision.'));
})();
