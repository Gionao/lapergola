# La Pergola · HTML, CSS e JavaScript

## Aprire il sito

Estrai completamente lo ZIP. Apri `index.html` con un doppio clic nella cartella `la-pergola-html`.

Il sito funziona direttamente dal filesystem, compresi introduzione, navigazione, galleria, menù ed eventi. Puoi anche aprire la cartella in VS Code e avviare Live Server.

I file consegnati sono modificabili direttamente. L'esecuzione non richiede installazioni npm o una compilazione.

## File principali

| File | Funzione |
| --- | --- |
| `index.html` | Homepage con introduzione giorno, tramonto e sera |
| `chi-siamo.html` | Presentazione del locale |
| `menu.html` | Menù e filtro per categoria |
| `eventi.html` | Calendario degli appuntamenti futuri confermati |
| `evento.html?slug=...` | Dettaglio dell'evento selezionato |
| `prenota.html` | Prenotazioni telefoniche e informazioni per gruppi |
| `galleria.html` | Galleria con lightbox |
| `contatti.html` | Indirizzo, telefono, mappa e giorni di apertura |
| `privacy.html` | Informativa da completare |
| `assets/css/tokens.css` | Token della brand identity A_Tradizione 2.0 |
| `assets/css/site.css` | Layout, responsive e aspetto del sito |
| `assets/js/content.js` | Dati del ristorante, prodotti ed eventi |
| `assets/js/site.js` | Interazioni, scroll, filtri e lightbox |
| `assets/images/` | Scene dimostrative AVIF e WebP |
| `assets/brand/` | Logo originale e icona |
| `docs/` | Resoconto delle verifiche e screenshot |

## Scelte grafiche

La nuova direzione usa titoli sans-serif grandi, testi centrati, ampi spazi, una barra di navigazione compatta e traslucida, superfici semplici e pulsanti morbidi. L'ispirazione Apple riguarda gerarchia e pulizia visiva.

Foglia e crema sono i colori principali, secondo la versione A_Tradizione 2.0. Legno e viola sono dettagli. Il marchio originale mantiene i suoi colori. La tipografia usa Arial, Helvetica e i font sans-serif del sistema per rispondere alla richiesta di uno stile più essenziale.

La sequenza è realizzata con CSS sticky e JavaScript nativo. Usa circa 2,85 altezze schermo su desktop e 2,3 su mobile, inclusa la scena visibile. Il controllo dello scroll è reversibile. Logo e navigazione appaiono dopo la scena serale. Reduced motion e viewport molto basse mostrano direttamente la hero finale.

## Modificare i contenuti

Apri `assets/js/content.js`. `window.PERGOLA` contiene ristorante, menù ed eventi. Per i prodotti, usa i campi `id`, `category`, `name`, `description`, `price`, `ingredients`, `allergens`, `image`, `available` e `seasonal`. Il prezzo è un numero in euro e la categoria deve essere presente in `menu.categories`.

Per gli eventi, usa `slug`, `title`, `summary`, `description`, `startsAt`, `endsAt` facoltativo e `published`. Le date devono essere ISO 8601 con fuso, ad esempio `2030-11-23T20:00:00+01:00`. Tale data è un esempio tecnico. Solo gli eventi pubblicati e futuri compaiono nel calendario. I dettagli di un evento già pubblicato rimangono consultabili.

I recapiti contrassegnati con `data-contact`, i link telefonici e quelli alla mappa si aggiornano dal file dati. Il testo HTML contiene un fallback per la navigazione senza JavaScript. Quando cambi i recapiti, aggiorna anche i fallback e i dati strutturati nelle pagine HTML per mantenere l'allineamento senza JavaScript.

I contenuti principali sono presenti nell'HTML. I futuri prodotti e dettagli evento sono renderizzati dal JavaScript. Per indicizzare singolarmente un evento, crea anche una pagina HTML dedicata con titolo, metadati e dati strutturati specifici.

## Contenuti da completare

- Sostituire le immagini dimostrative con fotografie reali ad alta risoluzione. Le scene desktop ereditate misurano 1470 × 320 px e risultano ingrandite su schermi alti. I crop mobile migliorano l'inquadratura ma le scene non sono perfettamente allineate.
- Preparare tre scatti con camera fissa, stessa focale, posizione e geometria. La notte inclusa è una gradazione del tramonto.
- Inserire fotografie autorizzate delle pizze, degli interni e delle serate.
- Confermare listino, ingredienti, allergeni, recapiti, orari precisi, eventuali canali social e WhatsApp.
- Completare i dati societari nel footer e l'informativa privacy.
- Configurare dominio finale, URL canonici, immagini Open Graph assolute e sitemap. Le pagine di anteprima hanno `noindex,follow`. Dopo la revisione dei contenuti, modificare il meta robots per consentire l'indicizzazione.

Menu, prezzi ed eventi restano vuoti finché mancano dati confermati. Il sito offre la prenotazione telefonica.

## Pubblicazione

Carica tutti i file della cartella `la-pergola-html`, mantenendo la struttura di `assets`, nella directory pubblica del tuo hosting statico. `index.html` deve essere nella radice pubblica.

Per Netlify puoi usare il caricamento manuale della cartella. Per Cloudflare Pages puoi utilizzare Direct Upload. Questa versione è già pronta per essere servita come sito statico.

Nel checkout di sviluppo i file pubblici sono in `dist/`. Lo ZIP li espone direttamente nella cartella `la-pergola-html` per rendere semplice l'apertura.

## Anteprima e verifiche

Le verifiche della nuova versione sono descritte in `docs/VERIFICHE.md`. L'aggiornamento dell'anteprima online è rimasto bloccato dall'accesso di rete verso il repository di pubblicazione. Il link dell'anteprima precedente continua a rappresentare la versione Astro.

