/* ================= Oggetti di casa e paese nei capitoli successivi: risposte proprie ================= */
(()=>{ if (!window.ADV) return;
const R={
 2:[['Radio Pippi, notiziario: «Il Mestolo d\'Oro è esposto in municipio, ingresso 5 Pippi. Il sindaco ringrazia sé stesso per il ritrovamento.» Io l\'ho ritrovato. Io.','Radio Pippi news: "The Golden Ladle is on display at the town hall, 5 Pippi entry. The mayor thanks himself for finding it." I found it. Me.'],
    ['Radio Pippi: «Avvistamenti di corvi in paese. Il veterinario consiglia di non guardarli negli occhi. Il sindaco consiglia di votarlo.»','Radio Pippi: "Crow sightings in town. The vet advises not to look them in the eye. The mayor advises voting for him."']],
 5:[['Radio Pippi, emergenza: «In paese tutti hanno una fame che non passa. Il fornaio ha finito il pane, la farina e un cliente. Il sindaco invita alla calma. Con la bocca piena.»','Radio Pippi emergency: "Everyone in town has a hunger that won\'t stop. The baker ran out of bread, flour and one customer. The mayor calls for calm. With his mouth full."'],
    ['Radio Pippi, oroscopo: «Leone: oggi qualcuno ti accuserà di qualcosa. Probabilmente hai ragione tu. Probabilmente non basta.»','Radio Pippi horoscope: "Leo: today someone will accuse you of something. You\'re probably right. Probably not enough."']],
 6:[['Radio Pippi: «Il sindaco Gennaro festeggia il primo anno di mandato con un discorso di quattro ore. Tre le ha dormite. Applausi.»','Radio Pippi: "Mayor Gennaro celebrates his first year in office with a four-hour speech. He slept through three. Applause."'],
    ['Radio Pippi: «Dedica musicale da Nonna Pina "a quello là che sa chi è". Ventitré ascoltatori hanno chiamato per dire che sono loro.»','Radio Pippi: "Song dedication from Granny Pina "to that one who knows who he is". Twenty-three listeners called to say it\'s them."']]
};
for (const n of [2,5,6]){ let i=0;
  avOnN(n,'use:radio open:radio',async()=>{ await meAct('type',1000); const l=R[n][i++%R[n].length]; return avSay('voice', T(l[0],l[1])); });
  avOnN(n,'look:radio',()=>me('La radio del nonno. Funziona, grazie a una forchetta. È il mio capolavoro di ingegneria.','Grandpa\'s radio. Works, thanks to a fork. My engineering masterpiece.'));
  avOnN(n,'take:radio',()=>me('Pesa più di mia suocera. E brontola uguale.','It weighs more than my mother-in-law. Grumbles the same, too.'));
  avOnN(n,'look:sink',()=>me('Il lavandino. I piatti si sono organizzati in un sindacato. Chiedono di essere lavati. Non tratto.','The sink. The dishes have unionised. They demand washing. I don\'t negotiate.'));
  avOnN(n,'take:sink',()=>me('Dal lavandino non mi serve niente. Neanche la dignità, che è lì dentro da mesi.','I need nothing from the sink. Not even my dignity, which has been in there for months.'));
  avOnN(n,'look:tools',()=>me('Gli attrezzi di mia moglie, in ordine perfetto. Manca un posto vuoto a forma di ascia. Lo nota anche il chiodo.','My wife\'s tools, in perfect order. There\'s an empty axe-shaped space. Even the nail notices.'));
  avOnN(n,'look:bench',()=>me('Il banco attrezzi. Viti spaiate e la foto del santo. Mi guarda come se sapesse cosa ho fatto.','The workbench. Odd screws and the saint\'s picture. He looks at me like he knows what I did.'));
}
})();
