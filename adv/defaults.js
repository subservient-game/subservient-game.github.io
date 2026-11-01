/* Risposte di ripiego varie e pertinenti all'oggetto */
(()=>{
const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
const BAG={};
function pick(key, arr){ let b=BAG[key]; if (!b||!b.length){ b=BAG[key]=arr.map((_,i)=>i).sort(()=>Math.random()-.5); if (BAG[key+'#last']!=null && b.length>1 && b[b.length-1]===BAG[key+'#last']) b.unshift(b.pop()); } const i=b.pop(); BAG[key+'#last']=i; return arr[i]; }
const CATS=[
 ['food',/pane|pizz|fritt|panin|tort|formagg|salam|mozzarell|sardin|banan|cocco|ragu|ragù|risott|frutt|gelat|biscott|uov|pasta|carne|sugo|polpett|mela|limon|dolce|minestr|prosciutt|cibo|focacc|crostat|cannol|babà|baba|patat|pomodor|cipoll|aglio|peperon|torrone|zucchero|sale|farina|lasagn|arancin|frittell|merend|panett|caramell|cioccol|tiramis|spaghett|tortellin|gnocch/],
 ['drink',/vino|birra|rum|bottigl|grapp|limoncell|liquor|whisk|bicchier|amaro|spritz|caffè|caffe|tazz|lattin|brocc|fiasc|botte|cocktail/],
 ['door',/porta|porton|cancell|serratur|finestr|botola|uscio|saracinesc|lucchett/],
 ['furn',/divan|sedia|sedie|tavol|letto|armadi|mobil|scaffal|poltron|comodin|cassett|librer|panchin|sgabell|bancon|scrivan|tappet|specchi|baule|cassa/],
 ['tech',/radio|tv|televis|telefon|computer|frigo|lavatric|macchinett|forno|motor|lampad|luce|lampion|interrutt|jukebox|radar|svegli|orolog|microfon|cassa ?forte|ascensor|allarm|videocamer|telecamer|slot|flipper|registrator|altoparl|stereo|tastier/],
 ['plant',/piant|alber|fior|palm|cespugl|erba|vaso|giardin|seme|semi|fungh|aiuol|siep|liana|banan|felce|cactus|basilic|rosa/],
 ['animal',/cane|gatt|piccion|topo|topi|pesc|scimmi|pappagall|gabbian|corvo|maial|pipistrell|gallin|capra|mucc|granchi|ratto|ratti|lucertol|mosch|zanzar|serpent|polp|medus|asin|cavall|tartarug|riccio|ape |api /],
 ['water',/mare|acqua|fontan|lago|lagun|fium|pozz|lavandin|docc|vasca|onda|onde|pozzangher|cascat|molo|spiaggi|riva|sorgent|piscin|cesso|water|wc|gabinett/],
 ['paper',/giornal|libr|letter|bigliett|fogli|mappa|carta|poster|quadr|cartell|ricett|diari|manifest|volantin|foto|calendari|menu|menù|elenco|registro|lista|contratt|testament|fattur|scontrin|santin|album/],
 ['money',/sold|monet|portafogl|banconot|pippi|salvadanai|cassett?a? ?dell?e? ?offert|tesor|\boro\b|gioiell|anell|collan/],
 ['tool',/chiav|martell|cacciavit|coltell|forbic|corda|pala|rastrell|scala|baston|ombrell|piede di porco|tenagl|\bago\b|spill|puntin|sega|trapano|pinz|cucchiai|mestol|forchett|pentol|padell|scop|secchi|\brete\b|canna|\bamo\b|fiammifer|accendin|candel|lumin|torcia|lente|occhial|calamit|nastro|colla|filo/],
 ['trash',/spazzatur|bidon|cestin|rifiut|cassonett|immondiz|sacco|sacchett|discaric|lattina vuota/],
 ['vehicle',/barca|auto|macchina|motorin|bici|furgon|carrell|traghett|nave|autobus|treno|ape car|apecar|canoa|zattera|gommon|vespa|camion|ambulanz/],
 ['place',/statua|monument|chies|municipi|faro|torr|edifici|casa|muro|parete|vulcan|grott|rocc|sasso|pietr|ponte|strada|piazz|campanil|insegn|vetrin|bancarell|chiosc|baracc|capann|tenda|recint|scogli|colonn|altare|tomba|lapide|croce|cimiter|fontanell/],
];
function catOf(t){ const s=((t.id||'')+' '+(t.n?t.n[0]:'')).toLowerCase(); for (const [c,re] of CATS) if (re.test(s)) return c; return null; }
const L=(it,en)=>[it,en];
/* ----- generic per verb; {N} = nome con maiuscola, {n} = nome, {I}/{i} = oggetto in mano ----- */
const G={
 look:[
  L('Niente di speciale. Come la mia vita sentimentale.','Nothing special. Like my love life.'),
  L('Lo guardo. Mi guarda. Nessuno dei due ne esce bene.','I look at it. It looks back. Neither of us comes out well.'),
  L('Interessante quanto una riunione di condominio.','As interesting as a residents\' meeting.'),
  L('{N}. Fisso finché non diventa imbarazzante. Per me.','{N}. I stare until it gets awkward. For me.'),
  L('{N}. Ancora un minuto di sguardi e mi chiede l\'affitto.','{N}. If I stare any longer it\'ll charge me rent.'),
  L('{N}: esiste. Questo è tutto quello che posso dire con certezza.','{N}: it exists. That\'s all I can say for sure.'),
  L('{N}. Mia nonna ne aveva un modello identico. Poi è morta. Non c\'entra niente, ma lo dico.','{N}. My nan had one just like it. Then she died. Unrelated, but there you go.'),
  L('Guardo {n} con lo sguardo del grande detective. Non scopro un cazzo.','I examine {n} with the gaze of a great detective. I learn sod all.'),
  L('{N}. Più guardo, meno mi piace. Vale anche per lo specchio.','{N}. The more I look, the less I like it. Same with mirrors.'),
  L('{N}. Ha un\'aria vagamente colpevole. Come tutti, qui.','{N}. It looks vaguely guilty. Like everyone round here.'),
  L('Osservo {n}. Prendo appunti mentali. Li perdo subito.','I observe {n}. I take mental notes. I lose them instantly.'),
  L('{N}. Niente indizi. Solo polvere e delusione.','{N}. No clues. Just dust and disappointment.'),
 ],
 take:[
  L('Non credo di poterci riuscire. E comunque in tasca non c\'è posto.','I don\'t think I can take that. And if I could, where would it go?'),
  L('{N}? Ho già le tasche piene di rimpianti.','{N}? My pockets are already full of regrets.'),
  L('Provo a prendere {n}. {N} [vince|vincono]. Uno a zero.','I try to take {n}. {N} wins. One-nil.'),
  L('Rubare {n}? Ho una dignità. Piccola, usata, ma ce l\'ho.','Steal {n}? I have dignity. Small, second-hand, but I have it.'),
  L('{N} [resta|restano] dove [sta|stanno]. Bene, più di me.','{N} stays put. It\'s happy there. Happier than me, anyway.'),
  L('Non è roba mia. Di solito questo non mi ferma, ma oggi sì.','Not mine. That usually doesn\'t stop me, but today it does.'),
  L('Prendere {n}? Mi verrebbe l\'ernia solo a pensarci.','Take {n}? I\'d get a hernia just thinking about it.'),
  L('{N} nelle tasche non ci [sta|stanno]. Ci ho provato. Mi sono strappato i pantaloni.','{N} won\'t fit in my pockets. I tried. Ripped my trousers.'),
  L('Ci penso un attimo. No. Non mi serve. Come il mio ex.','I think it over. No. Don\'t need it. Like my ex.'),
  L('Se prendo {n} qualcuno mi denuncia. E in questo paese gli avvocati costano.','If I take {n} someone sues. And lawyers here aren\'t cheap.'),
 ],
 use:[
  L('Non credo funzioni.','I don\'t think that works.'),
  L('Usare {n}? Non saprei nemmeno da che parte cominciare.','Use {n}? Wouldn\'t know where to start.'),
  L('Smanetto con {n} per un po\'. Non succede niente, ma mi sento utile.','I fiddle with {n} for a while. Nothing happens, but I feel useful.'),
  L('{N}: non ha istruzioni. E io non ho pazienza.','{N}: no instructions. And I\'ve no patience.'),
  L('Premo, tiro, giro. {N} mi [ignora|ignorano]. Tipico.','I press, pull, twist. {N} ignores me. Typical.'),
  L('Per usare {n} servirebbe un\'idea. Sto aspettando che arrivi.','Using {n} would take an idea. Still waiting for one.'),
  L('Bella idea. Sbagliata, ma bella.','Nice idea. Wrong, but nice.'),
  L('Il mio cervello dice no. Il mio fegato pure.','My brain says no. So does my liver.'),
  L('Uso {n} con tutta la mia intelligenza. Quindi non succede niente.','I use {n} with all my intelligence. So nothing happens.'),
  L('{N} non [è|sono] d\'accordo. Non so come faccio a saperlo, ma lo so.','{N} disagrees. Don\'t know how I know, but I know.'),
 ],
 open:[
  L('{N} non si [apre|aprono]. Come mio padre.','{N} won\'t open. Like my father.'),
  L('Aprire {n}? Non ha nemmeno un buco. Ho controllato. Male.','Open {n}? It hasn\'t got a single hole. I checked. Badly.'),
  L('Cerco una maniglia su {n}. Trovo solo frustrazione.','I look for a handle on {n}. I find only frustration.'),
  L('{N}: chiusura totale, nel senso più profondo del termine. Spirituale.','{N} is closed in the deepest sense. Spiritually closed.'),
  L('Provo ad aprire {n}. Mi si apre solo un\'unghia.','I try to open {n}. Only my fingernail opens.'),
  L('Non tutto nella vita si apre. Lo dice anche il mio barattolo di sottaceti.','Not everything in life opens. My pickle jar says so too.'),
 ],
 talk:[
  L('Parlare con gli oggetti... non sono ancora a quel punto. Quasi.','Talking to objects... I\'m not there yet. Almost.'),
  L('«Ciao, {n}.» Silenzio. È la conversazione migliore della settimana.','"Hello, {n}." Silence. Best conversation all week.'),
  L('Racconto a {n} i miei problemi. Nessun giudizio. Già meglio dello psicologo.','I tell {n} my problems. It doesn\'t judge. Already better than my therapist.'),
  L('{N} non [risponde|rispondono]. Almeno non mi [chiede|chiedono] soldi.','{N} doesn\'t answer. At least it doesn\'t ask for money.'),
  L('Sussurro a {n}. Un passante mi guarda. Smetto.','I whisper to {n}. A passer-by stares. I stop.'),
  L('Chiedo a {n} come va. Meglio che a me, è evidente.','I ask {n} how it\'s doing. Better than me, clearly.'),
 ],
 combo:[
  L('{I} con {n}? No. Non è una coppia che funziona.','{I} with {n}? No. That couple won\'t work.'),
  L('Avvicino {i} a {n}. Non succede niente. Come ai miei appuntamenti.','I hold {i} up to {n}. Nothing happens. Like my dates.'),
  L('{I} e {n}. L\'idea è creativa. Anche sbagliata.','{I} and {n}. Creative idea. Also wrong.'),
  L('Strofino {i} su {n}. Ora sono sporchi tutti e due. Bravo me.','I rub {i} on {n}. Now both are dirty. Well done me.'),
  L('No, {i} non c\'entra con {n}. Lo sento nelle ossa. E nella milza.','No, {i} has nothing to do with {n}. I feel it in my bones. And spleen.'),
  L('{I} su {n}: il risultato è zero. Come il mio conto in banca.','{I} on {n}: result zero. Like my bank balance.'),
  L('Provo a combinare {i} e {n}. L\'universo mi dice di no. Con educazione.','I try combining {i} and {n}. The universe says no. Politely.'),
  L('Ci vuole altro che {i} per {n}.','It\'ll take more than {i} for {n}.'),
 ],
};
/* ----- pertinent lines by category ----- */
const C={
 food:{
  look:[L('{N}. Ha un\'aria commestibile. Anche io, se è per questo.','{N}. Looks edible. So do I, frankly.'),L('{N}. Mi brontola lo stomaco solo a guardare.','{N}. My stomach growls just looking at it.'),L('{N}. Data di scadenza: illeggibile. Coraggio: alto.','{N}. Expiry date: illegible. Courage: high.')],
  take:[L('Non posso rubare il cibo. Cioè, posso. Ma qui qualcuno mi vede.','Can\'t steal food. Well, I can. But someone\'s watching.'),L('{N}: se finisce in tasca, finisce in bocca. E poi magari mi serviva.','{N}: if I take it I\'ll eat it. And then I\'ll need it.')],
  use:[L('Usare {n}? Si mangia, non si usa. Sono vecchio stile.','Use {n}? You eat it, not use it. I\'m old-fashioned.'),L('Annuso {n}. Ho fame. Ma resisto. Per ora.','I sniff {n}. I\'m hungry. But I resist. For now.')],
  talk:[L('Faccio i complimenti a {n}. Ora mangiare mi farà sentire in colpa.','I tell {n} it\'s beautiful. Now I feel guilty about eating it.')],
  open:[L('Aprire {n}? Non è un regalo di Natale. Anche se lo vorrei.','Open {n}? It\'s not a Christmas present. Though I wish it were.')],
 },
 drink:{
  look:[L('{N}. Il mio fegato mi manda un messaggio: «non ci provare».','{N}. My liver sends a message: "don\'t you dare".'),L('{N}. Profuma di cattive decisioni.','{N}. Smells of bad decisions.')],
  take:[L('Se prendo {n} finisce che bevo. Lo so io e lo sa il mio fegato.','If I take {n} I\'ll drink it. I know it, my liver knows it.')],
  use:[L('Bere adesso? Sono le... boh. Vabbè, comunque no.','Drink now? It\'s... no idea what time. Still no.'),L('Ho promesso a mia madre di non bere prima di risolvere il caso. Mento spesso, ma non oggi.','I promised Mum no drinking before the case is solved. I lie a lot, not today.')],
  open:[L('Se apro {n} poi non mi fermo più. Conosco me stesso.','If I open {n} I\'ll finish it. I know myself.')],
 },
 door:{
  look:[L('{N}. Dietro c\'è qualcosa. O niente. Le porte sono così.','{N}. Something\'s behind it. Or nothing. Doors are like that.')],
  take:[L('Portarmi via {n}? Ho già abbastanza problemi a portare me stesso.','Carry off {n}? I struggle enough carrying myself.')],
  use:[L('Busso a {n}. Nessuno. Nemmeno l\'eco ha voglia di rispondermi.','I knock on {n}. Nobody. Even the echo can\'t be bothered.')],
  open:[L('{N} non si [apre|aprono]. Spingo, tiro, imploro. Niente.','{N} won\'t open. I push, pull, beg. Nothing.'),L('{N} non si [apre|aprono]. Serve una chiave, un\'idea o una spallata. Ho solo la spalla. E fa male.','{N} is locked. Needs a key, an idea or a shoulder. I only have the shoulder. It hurts.')],
  talk:[L('«Apriti sesamo!» Niente da fare. Era tanto per provare.','"Open sesame!" {N} stays shut. Worth a try.')],
 },
 furn:{
  look:[L('{N}. Arredamento da zia vedova. Calore e naftalina.','{N}. Widowed-aunt décor. Warmth and mothballs.'),L('{N}. Ci si potrebbe nascondere qualcosa. O qualcuno.','{N}. Something could be hidden in there. Or someone.')],
  take:[L('{N}? Ho la schiena di un ottantenne. Lasciamo stare.','{N}? I have an eighty-year-old\'s back. Let\'s not.'),L('Portare via {n}? Non sono un trasloco.','Carry {n} off? I\'m not a removals firm.')],
  use:[L('Mi siedo un attimo su {n}. Ah. Ecco. No, mi rialzo, c\'è da fare.','I sit on {n} a moment. Ah. There. No, up again, things to do.'),L('Uso {n} come si deve. Non cambia niente.','I use {n} properly. Nothing changes.')],
  open:[L('Frugo in {n}. Trovo briciole, un bottone e la mia infanzia.','I rummage in {n}. Crumbs, a button and my childhood.')],
 },
 tech:{
  look:[L('{N}. Tecnologia di quando i telefoni avevano il filo e la gente aveva la pazienza.','{N}. Tech from when phones had cords and people had patience.'),L('{N}. Ha più tasti di quanti ne capirò mai.','{N}. More buttons than I\'ll ever understand.')],
  take:[L('{N}: c\'è un filo che va nel muro. Io la domenica ho lo stesso filo col divano.','{N} is plugged into the wall. Like me to the sofa on Sundays.')],
  use:[L('Premo un tasto a caso su {n}. Bip. Non so cosa ho fatto, ma non lo rifaccio.','I press a random button on {n}. Beep. Don\'t know what I did, won\'t do it again.'),L('Do una botta a {n}. Il metodo italiano. Stavolta non funziona.','I whack {n}. The Italian method. Doesn\'t work this time.'),L('{N}: un rumore strano. Lascio perdere prima che esploda. O che mi giudichi.','{N} makes a weird noise. I leave it before it explodes. Or judges me.')],
  open:[L('Aprire {n}? L\'ultima volta che ho aperto un elettrodomestico ho visto Dio. Era un fusibile.','Open {n}? Last time I opened an appliance I saw God. It was a fuse.')],
  talk:[L('«Ok {n}, risolvi il caso.» Niente. Questi aggeggi non sono mai intelligenti quando serve.','"Okay {n}, solve the case." Nothing. These gadgets are never smart when you need them.')],
 },
 plant:{
  look:[L('{N}. Verde e in salute. Più di me il lunedì mattina.','{N}. Green. Alive. More than me on a Monday morning.'),L('{N}. Fa fotosintesi. Io a malapena respiro.','{N}. Doing photosynthesis. I can barely breathe.')],
  take:[L('Strappare {n}? Mia nonna dal cielo mi tirerebbe un vaso.','Rip up {n}? Nan would throw a pot at me from heaven.')],
  use:[L('Annaffio {n} con lo sguardo. Non basta.','I water {n} with my eyes. Not enough.')],
  talk:[L('Parlo a {n}. Dicono che faccia bene alle piante. A me no.','I talk to {n}. They say it\'s good for plants. Not for me.')],
 },
 animal:{
  look:[L('{N}. Mi guarda come se sapesse qualcosa di me. Probabilmente lo sa.','{N}. Looks at me as if it knows something about me. It probably does.'),L('{N}. Ha più dignità di me. E meno debiti.','{N}. More dignity than me. Fewer debts.')],
  take:[L('Prendere {n}? Ha denti, artigli o tutti e due. Io ho solo il terrore.','Pick up {n}? It has teeth, claws or both. I have terror.')],
  use:[L('Non si usano gli animali. Si corrompono. Con il cibo.','You don\'t use animals. You bribe them. With food.')],
  talk:[L('Parlo a {n}. Mi risponde con lo sguardo. Mi ha appena insultato, lo sento.','I talk to {n}. It answers with a look. I\'ve just been insulted, I can tell.')],
  open:[L('Aprire {n}?! Ma che sono, un macellaio?','Open {n}?! What am I, a butcher?')],
 },
 water:{
  look:[L('{N}. Bagnato. Profondo. Come i miei problemi.','{N}. Wet. Deep. Like my problems.'),L('{N}. Mi ricorda che dovrei lavarmi più spesso.','{N}. Reminds me I should wash more often.')],
  take:[L('Prendere {n} a mani nude? Ci ho provato. Mi è scappato tutto tra le dita. Come la giovinezza.','Take {n} barehanded? Tried. It slipped through my fingers. Like youth.')],
  use:[L('Mi bagno le mani con {n}. Ora ho le mani bagnate. Fine della storia.','I wet my hands in {n}. Now my hands are wet. End of story.'),L('Fare il bagno adesso? Ho un caso da risolvere e un costume da recuperare.','Swim now? I have a case to solve and trunks to find.')],
 },
 paper:{
  look:[L('{N}. Leggo. Capisco metà. Dimentico l\'altra metà.','{N}. I read. I understand half. I forget the other half.'),L('{N}. Scritto piccolo. Ho bisogno di occhiali nuovi. E di una vita nuova.','{N}. Small print. I need new glasses. And a new life.')],
  take:[L('Prendere {n}? Qualcuno se ne accorgerebbe. E farebbe una denuncia. Su carta.','Take {n}? Someone would notice. And file a complaint. On paper.')],
  use:[L('Ci faccio un aeroplanino con {n}? No. Sono un professionista. Più o meno.','Make a paper plane out of {n}? No. I\'m a professional. Sort of.')],
  open:[L('Sfoglio {n}. Niente di utile. Una macchia di sugo, però. Interessante.','I leaf through {n}. Nothing useful. A sauce stain, though. Interesting.')],
 },
 money:{
  look:[L('{N}. Il mio sguardo diventa lucido. È amore. O avidità. Spesso coincidono.','{N}. My eyes go glossy. It\'s love. Or greed. Often the same thing.')],
  take:[L('{N}. Mi tremano le mani. Non è onestà, è paura di essere beccato.','{N}. My hands shake. Not honesty, fear of getting caught.')],
  use:[L('Non si usano i soldi così. Si spendono. Male, preferibilmente.','You don\'t use money like that. You spend it. Badly, ideally.')],
 },
 tool:{
  look:[L('{N}. Uno strumento. Nelle mani giuste fa miracoli. Nelle mie, danni.','{N}. A tool. In the right hands, miracles. In mine, damage.')],
  use:[L('Uso {n} a vuoto, per scaldarmi. Mi faccio quasi male. Ottimo riscaldamento.','I swing {n} at nothing to warm up. Nearly hurt myself. Great warm-up.'),L('{N} [serve|servono] a qualcosa. Ma non qui. E non così.','{N} is for something. Not here. Not like this.')],
 },
 trash:{
  look:[L('{N}. Puzza di segreti e di pesce del martedì.','{N}. Smells of secrets and Tuesday\'s fish.'),L('{N}. Il posto dove finiscono i sogni. E le bucce.','{N}. Where dreams end up. And peelings.')],
  take:[L('Prendere {n}? Ho toccato il fondo, ma non così in fondo.','Take {n}? I\'ve hit rock bottom, but not that bottom.')],
  open:[L('Frugo in {n}. Trovo un calzino, un dentifricio e una lezione di umiltà.','I dig through {n}. A sock, a toothpaste tube and a lesson in humility.')],
  use:[L('Butto via la mia dignità in {n}. Fatto. Ora si respira meglio.','I throw my dignity into {n}. Done. Breathing easier now.')],
 },
 vehicle:{
  look:[L('{N}. Ha visto giorni migliori. Pure io.','{N}. Has seen better days. So have I.')],
  take:[L('Rubare {n}? Non ho la patente. E nemmeno il coraggio.','Steal {n}? No licence. No guts either.')],
  use:[L('Salgo su {n}? Senza chiavi, senza benzina, senza speranza. No.','Get on {n}? No keys, no fuel, no hope. No.')],
  open:[L('Apro {n}. Odore di sedili vecchi e di litigi in famiglia.','I open {n}. Smell of old seats and family rows.')],
 },
 place:{
  look:[L('{N}. Storico. O almeno vecchio. Qui le due cose si confondono.','{N}. Historic. Or at least old. Round here it\'s the same thing.'),L('{N}. Se le pietre potessero parlare, qui direbbero parolacce.','{N}. If stones could talk, these would swear.')],
  take:[L('Portarmi via {n}? Ho un portapacchi, ma non così grande.','Take {n} with me? I have a roof rack, but not that big.')],
  use:[L('Mi appoggio a {n} con aria pensosa. Sembro intelligente per tre secondi.','I lean on {n} looking thoughtful. I look clever for three seconds.')],
  talk:[L('Parlo con {n}. Un turista mi fotografa. Ora sono anche io un monumento.','I talk to {n}. A tourist photographs me. Now I\'m a monument too.')],
 },
};
/* ----- NPC fallbacks: the NPC answers ----- */
const NPC={
 talk:[L('Non ho tempo per le cazzate. Torna quando hai qualcosa di utile.','No time for bullshit. Come back with something useful.'),L('Ancora tu? Mi sembri un\'otite: torni sempre.','You again? You\'re like an earache: always back.'),L('Abbiamo già parlato. Mi è bastato per un anno.','We\'ve talked already. That\'ll do me for a year.'),L('Se vuoi chiacchierare, c\'è il bar. Io lavoro. Più o meno.','Want a chat, there\'s the bar. I\'m working. Sort of.'),L('Parla con mia moglie, che c\'ha più pazienza. Anzi no, non c\'ha neanche lei.','Talk to my wife, she\'s more patient. Actually no, she isn\'t either.'),L('Sì, sì. Bello. Ora sparisci con gentilezza.','Yes, yes. Lovely. Now kindly vanish.'),L('Ti ascolto. Faccio finta. Ma ti ascolto.','I\'m listening. Pretending. But listening.'),L('Hai la faccia di uno che sta per chiedere un favore. La risposta è no.','You\'ve got the face of someone about to ask a favour. The answer\'s no.')],
 give:[L('E che cazzo me ne faccio di {i}?','And what the hell do I do with {i}?'),L('{I}? Ce l\'ho già. Ne ho due. Uno è di mia suocera.','{I}? Already got one. Two. One\'s my mother-in-law\'s.'),L('Tieniti {i}. Si vede che ci sei affezionato.','Keep it, {i}. You\'re clearly attached.'),L('Mi regali {i}? Cos\'è, ti sei innamorato?','Giving me {i}? What, you in love?'),L('Grazie, ma no. {I} porta sfiga. Lo dice mia zia.','Thanks, but no. {I} is bad luck. My aunt says so.'),L('Se mi serviva {i}, rubavo da solo.','If I wanted {i} I\'d have nicked it myself.')],
 use:[L('Non sono un attrezzo. Per lo meno non per te.','I\'m not a tool. Not for you, anyway.'),L('Togli le mani. Ho un cugino avvocato e un altro cugino che non è avvocato.','Hands off. I have a lawyer cousin and another cousin who isn\'t a lawyer.')],
 combo:[L('Cosa vuoi fare con {i}? Allontanalo dalla mia faccia.','What are you doing with {i}? Get it away from my face.'),L('Se mi tocchi con {i} chiamo i carabinieri. O peggio, mia madre.','Touch me with {i} and I call the police. Or worse, my mother.')],
};
const SELF={
 look:[L('Mi guardo. Sono io. Purtroppo.','I look at myself. It\'s me. Sadly.'),L('Bello come sempre. Cioè, come sempre.','Handsome as ever. I mean, as ever.')],
 use:[L('Usare me stesso? Ci provo da anni. Risultati scarsi.','Use myself? Been trying for years. Poor results.')],
 talk:[L('Parlo da solo. Almeno qualcuno mi ascolta.','I talk to myself. At least someone listens.')],
 combo:[L('Mi strofino {i} addosso. Non migliora niente.','I rub {i} on myself. Nothing improves.')],
};
const VOW=/^[aeiouhàèéìòù]/i, LO=/^(s[^aeiou]|z|gn|ps|x|y|pn)/i;
function artIt(w){ const first=w.split(/\s+/)[0].toLowerCase().replace(/[^a-zàèéìòù]/g,''); const end=first.slice(-1);
  let g='m', pl=false;
  if (end==='a') g='f'; else if (end==='i') pl=true; else if (end==='e'){ if (/(ice|ione|ie|he)$/.test(first)) { g='f'; if (/(ie|he)$/.test(first)) pl=true; } else if (/(one|ore|ale|ile|ente|ante|ese|ere|ume|ame|ime)$/.test(first)) {} else { g='f'; pl=true; } } else if (/(tà|tù)$/.test(first)) g='f';
  if (/^(chiave|nave|parete|rete|notte|fonte|carne|gente|neve|sete|fame|fune|torre|botte|lente|pelle|vite|chiave|madre|moglie|frase|classe)$/.test(first)) { g='f'; pl=false; }
  if (/^(uova|braccia|dita|lenzuola|ossa)$/.test(first)) { g='f'; pl=true; }
  if (/^(mano|radio|foto|moto|auto|dinamo)$/.test(first)) { g='f'; pl=false; }
  if (/^(problema|sistema|pigiama|programma|cinema|clima|tema|telegramma|panorama|diploma|pianeta|poeta|pirata|papa)$/.test(first)) g='m';
  const OV={barbecue:['il',0],baule:['il',0],mare:['il',0],champagne:['lo',0],lampione:['il',0],ponte:['il',0],campione:['il',0],pettine:['il',0],latte:['il',0],pesce:['il',0],pane:['il',0],sale:['il',0],fiume:['il',0],cane:['il',0],pile:['il',0],dente:['il',0],fiore:['il',0],cuore:['il',0],sole:['il',0],nome:['il',0],volume:['il',0],croce:['la',0],lapide:['la',0],consolle:['la',0],cassaforte:['la',0],noce:['la',0],selce:['la',0],cambiale:['la',0],slot:['la',0],chiavi:['le',1],piume:['le',1],ossa:['le',1],gomme:['le',1],acque:['le',1]};
  if (OV[first]) return [OV[first][0], !!OV[first][1]];
  let a; if (pl) a = g==='f'?'le':(VOW.test(first)||LO.test(first)?'gli':'i'); else if (g==='f') a = VOW.test(first)?"l'":'la'; else a = VOW.test(first)?"l'":(LO.test(first)?'lo':'il');
  return [a,pl]; }
const CONTR={a:{il:'al',lo:'allo',"l'":"all'",la:'alla',i:'ai',gli:'agli',le:'alle'},su:{il:'sul',lo:'sullo',"l'":"sull'",la:'sulla',i:'sui',gli:'sugli',le:'sulle'},in:{il:'nel',lo:'nello',"l'":"nell'",la:'nella',i:'nei',gli:'negli',le:'nelle'},di:{il:'del',lo:'dello',"l'":"dell'",la:'della',i:'dei',gli:'degli',le:'delle'},da:{il:'dal',lo:'dallo',"l'":"dall'",la:'dalla',i:'dai',gli:'dagli',le:'dalle'}};
const low=w=>w?w.charAt(0).toLowerCase()+w.slice(1):w;
function fillIt(s, key, w){ if (!w) return s.split('{'+key+'}').join('').split('{'+key.toUpperCase()+'}').join(''); const [a,pl]=artIt(w), sp=a.endsWith("'")?'':' ';
  if (key==='n') s=s.replace(/\[([^|\]]*)\|([^\]]*)\]/g,(m,x,y)=>pl?y:x);
  s=s.replace(new RegExp('\\b(a|su|in|di|da) \\{'+key+'\\}','g'),(m,pr)=>CONTR[pr][a]+(CONTR[pr][a].endsWith("'")?'':' ')+w);
  return s.split('{'+key+'}').join(a+sp+w).split('{'+key.toUpperCase()+'}').join(cap(a)+sp+w); }
function fillEn(s, key, w){ return s.split('{'+key+'}').join(w?'the '+w:'').split('{'+key.toUpperCase()+'}').join(w?'The '+w:''); }
function names(t,item){ const n=low(avName(t)||''); const i=item?low(avItemName(item)):''; return [n,i]; }
function say(line, t, item, npcId){ const [n,i]=names(t,item); const a=fillIt(fillIt(line[0],'n',n),'i',i).replace(/\[([^|\]]*)\|([^\]]*)\]/g,'$1'), b=fillEn(fillEn(line[1],'n',n),'i',i); AV.autoNext=true; return npcId? np(npcId,a,b) : me(a,b); }
window.AV_DEF={G,C,NPC,SELF};
window.avDefault=function(verb, t, item){
  const v=(item && (verb==='use'||verb==='give'))?'combo':verb;
  if (t.type==='npc'){
    if (verb==='talk') return say(pick('npc:talk',NPC.talk),t,item,t.id);
    if (verb==='give' && item) return say(pick('npc:give',NPC.give),t,item,t.id);
    if (verb==='use' && item) return say(pick('npc:combo',NPC.combo),t,item,t.id);
    if (verb==='take') return me('Prendere una persona? Almeno offrimi una cena prima.','Pick up a person? Buy me dinner first.');
    if (verb==='open') return me('Aprire una persona è roba da chirurghi. O da serial killer.','Opening a person is for surgeons. Or serial killers.');
    if (verb==='use') return say(pick('npc:use',NPC.use),t,item,t.id);
  }
  if (t.type==='self' && SELF[v]) return say(pick('self:'+v,SELF[v]),t,item);
  if (verb==='give') return say(pick('g:combo',G.combo),t,item);
  const c=catOf(t), pool=c && C[c] && C[c][v];
  if (pool && Math.random()<.6) return say(pick(c+':'+v,pool),t,item);
  const g=G[v]||G.use; return say(pick('g:'+v,g),t,item);
};
})();
