# Verifiche · versione HTML/CSS/JS

Eseguite il 16 novembre 2026 su Windows con Chrome e Playwright, aprendo le pagine tramite file://.

- Sintassi JavaScript verificata con Node.
- 22 controlli di navigazione, layout e interazione completati.
- Nove pagine controllate alle larghezze 320, 375, 390, 768, 1024, 1440 e 1920 px. Nessun overflow orizzontale.
- Verificati tutti i collegamenti locali presenti nelle pagine.
- Verificate scene giorno, tramonto, sera, ritorno a ritroso, salto con Enter e focus sul titolo.
- Verificati menu mobile, chiusura con Esc, lightbox, navigazione fra immagini e ripristino del focus.
- Verificate apertura diretta dell'HTML, reduced motion e fallback senza JavaScript.
- Prodotti e filtri provati con dati di collaudo temporanei nel browser. Verificato il dettaglio evento con slug. Tali dati non sono presenti nei file consegnati.
- Axe-core ha rilevato zero violazioni WCAG A/AA nei controlli automatizzati su homepage, menù, galleria e contatti.

Le evidenze JSON e gli screenshot sono nella cartella docs. Il test HTTP locale è stato bloccato dall'ambiente con ERR_NETWORK_ACCESS_DENIED. È stato eseguito il collaudo del percorso di apertura diretto file://, che è la modalità d'uso proposta per questo pacchetto.

Lighthouse non è stato eseguito su questa nuova versione. I punteggi della precedente versione Astro non si applicano a questa consegna. Safari, Firefox e dispositivi fisici restano da verificare.

La pubblicazione dell'aggiornamento online non è riuscita perché l'ambiente non ha raggiunto il repository remoto. Il progetto e l'archivio locale sono disponibili.

