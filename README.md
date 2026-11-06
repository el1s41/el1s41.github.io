# Elisa Puddu — Portfolio

Portfolio personale statico di Elisa Puddu.

## Pubblicazione gratuita

Repository: `el1s41.github.io`, pubblico. In Settings → Pages selezionare Deploy from a branch, branch `main`, cartella `/ (root)`, poi Save.

Indirizzo previsto: https://el1s41.github.io/ (attivo solo dopo la pubblicazione riuscita).

## Modifiche

- `data.js`: progetti e collegamenti.
- `app.js`: struttura delle pagine.
- `styles.css` e `warm.css`: stile e layout.
- `letter.js`: lettera animata e preparazione della bozza email.
- `assets`: immagini e CV.

Il modulo invia nome, email e messaggio a FormSubmit tramite HTTPS e resta sul sito. Al primo utilizzo il destinatario deve confermare l’email di attivazione di FormSubmit. L’animazione viene mostrata solo dopo l’accettazione del servizio; errori e timeout mantengono il testo. La consegna effettiva nella casella va verificata dopo l’attivazione. Non sono presenti credenziali nel codice.

## Stato invio contatti

FormSubmit ha dato timeout nel browser e nei controlli di disponibilità. La consegna non è verificata. Il campo `contactEndpoint` in data.js può essere sostituito con un endpoint Formspree verificato, nel formato `https://formspree.io/f/ID`. Non servono chiavi segrete nel frontend. Le richieste usano URLSearchParams per evitare il preflight JSON. Nessun messaggio viene dichiarato consegnato prima dell’accettazione del servizio.
