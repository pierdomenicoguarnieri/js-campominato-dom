# Campo Minato

## Consegna

**Consegna**

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: **nella stessa cella può essere posizionata al massimo una bomba**, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

## Steps

**Steps da seguire:**

1. Generare, tramite una funzione 16 bombe, che siano uniche

2. Salvare le bombe generate in un array

3. Controllo del click dell'utente:

    - Confrontare se l'id della casella cliccata sia presente nell'array delle bombe:

        - Se è presente allora l'utente ha cliccato una bomba e si richiama la funzione che fa terminare il gioco

        - Se non è presente, allora l'utente ha cliccato una casella qualsiasi, quindi cambia il colore della casella, il punteggio incrementa di uno e si esclude la possibilità di cliccare nuovamente la stessa casella.

4. Creare una funzione per la fine del gioco, con due possibili casi:

    - Se il gioco finisce per il click di una bomba, allora assegnare come messaggio di output "Hai perso"

    - Se il gioco finisce per il raggiungimento del massimo numero di punti (cosa che viene calcolata confrontando il numero attuale di punti con il numero totale di caselle meno il numero di bombe), allora assegnare come messaggio di output "Hai vinto"

    - **Azioni da compiere indistintamente dalla condizione di fine del gioco**:

        - Mostrare tutte le bombe

        - Inibire il click di qualsiasi casella (ciò viene fatto rendendo visibile un overlay in posizione absolute che è posizionato sopra alla griglia di gioco)

5. Stampare a schermo il messaggio di output 

## References

[Developer Mozzilla EventTarger.removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

[W3Schools HTM DOM Element getAttribute()](https://www.w3schools.com/jsref/met_element_getattribute.asp)