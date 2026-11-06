# Elisa Puddu — Portfolio

Portfolio personale statico di Elisa Puddu.

## Pubblicazione gratuita

Repository: `el1s41.github.io`, pubblico. In Settings → Pages selezionare Deploy from a branch, branch `main`, cartella `/ (root)`, poi Save.

Indirizzo previsto: https://el1s41.github.io/ (attivo solo dopo la pubblicazione riuscita).

## Modifiche

- `data.js`: progetti e collegamenti.
- `app.js`: struttura delle pagine.
- `styles.css` e `warm.css`: stile e layout.
- `letter.js`: lettera animata e invio diretto del messaggio.
- `assets`: immagini e CV.

Il modulo invia nome, email e messaggio a Formspree tramite HTTPS, senza aprire l’app di posta e restando sul sito. L’endpoint configurato in `data.js` è `https://formspree.io/f/mzeeqbkj`. Non sono presenti credenziali nel codice.

L’animazione viene mostrata solo dopo l’accettazione del servizio; errori e timeout mantengono il testo. Per verificare la consegna effettiva, inviare una prova dal sito e controllare la casella del destinatario e la scheda Submissions di Formspree.
