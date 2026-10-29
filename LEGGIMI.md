# Subservient Holgen — come metterlo online con la comunità

Chi gioca **non si registra**: apre il link e basta. Tu fai questa configurazione **una volta sola**.

## 1. Pubblica il gioco su GitHub Pages
1. Su github.com crea un repository **pubblico**, es. `subservient`.
2. *Add file → Upload files*: carica `index.html` (e, se vuoi, questo file e `firestore.rules`). *Commit*.
3. *Settings → Pages*: Source **Deploy from a branch**, branch **main**, cartella **/ (root)** → *Save*.
4. Dopo un minuto il gioco è su `https://TUONOME.github.io/subservient/`.

## 2. Crea la comunità (Firebase, piano gratuito "Spark")
1. Vai su console.firebase.google.com → **Aggiungi progetto** (Google Analytics non serve).
2. **Build → Authentication → Inizia → Metodo di accesso → Anonimo → Attiva**.
   (I giocatori entrano in automatico come "anonimi": nessuna registrazione.)
3. Sempre in Authentication → **Impostazioni → Domini autorizzati → Aggiungi**: `TUONOME.github.io`.
4. **Build → Firestore Database → Crea database** (modalità produzione, una regione in Europa).
5. Firestore → scheda **Regole**: incolla il contenuto di `firestore.rules` → **Pubblica**.
6. ⚙️ **Impostazioni progetto → Le tue app → icona Web `</>`** → registra l'app (senza Hosting).
   Ti mostra un blocco `firebaseConfig = { apiKey: ..., authDomain: ..., projectId: ..., ... }`.
7. Su GitHub apri `index.html` → matita ✏️ → in cima trovi:
   ```
   FIREBASE: {}
   ```
   sostituiscilo con i tuoi valori, ad esempio:
   ```
   FIREBASE: { apiKey:"AIza...", authDomain:"tuoprogetto.firebaseapp.com", projectId:"tuoprogetto", appId:"1:...:web:..." }
   ```
   *Commit*. (La apiKey di Firebase non è un segreto: la sicurezza la fanno le regole del punto 5.)

## 3. (Facoltativo) Gemini come riserva dell'IA
1. Chiave gratuita su aistudio.google.com/apikey.
2. In `index.html` metti la chiave in `GEMINI_KEY: ''`.
3. Proteggila: console.cloud.google.com → API e servizi → Credenziali → la chiave →
   *Restrizioni applicazione: Siti web* → `https://TUONOME.github.io/*`.
   Nota: quota gratuita piccola e condivisa fra tutti; sul piano gratuito Google può usare i testi inviati.

## Come si gioca la parte "comunità"
- Il tuo **numero** è nome + codice (es. *Lara 482*), lo vedi sotto la casella.
- **Chiamare**: `chiama Marco 123`.
- **Chiedere di uscire**: `chiedi a Marco 123 di fidanzarsi` oppure il pulsante 🤍 → *Chiedi di uscire*.
- **Proposta**: `fai la proposta` (quando siete fidanzati) → lui/lei accetta dalla 📬 Posta.
- **Matrimonio**: `organizza il matrimonio` → data, ora e invitati (numeri separati da virgola).
  All'ora stabilita, sposi e invitati che aprono il gioco vedono la cerimonia in giardino.
- Da promessi/sposati il partner **vive in casa con te** e gira per le stanze.
- **Lasciarsi / divorziare**: pulsante dello stato → 💔.

Limiti del piano gratuito Firebase: ampiamente sufficienti per un gioco tra amici
(decine di migliaia di letture al giorno).
