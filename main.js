

// Identifico il bottone che attiverà la funzione che fa funzionare il mio gioco

const play = document.getElementById("play");



let messaggio = document.getElementById("messaggio_vincita");
messaggio.innerHTML = "";



// costruisco la funzione di gioco 

function gioca(){
    
    let messaggio = document.getElementById("messaggio_vincita");
    messaggio.innerHTML = "";

    // inizializzo le  variabili che identificano il valore della difficoltà selezionatoa e il contenitore dovre andranno aggiunte le caselle 

    const difficoltà = document.getElementById("difficoltà").value;
    const container = document.getElementById("container");

    // Setto il valore iniziale del container a vuoto nel momento in cui l'evento inizia 

    container.innerHTML = "";
    
    // inizializzo le variabili del numero di caselle totali del grid e delle caselle per ogni lato in base alla difficoltà,
    //  impostandole a zero quando nessuna difficoltà è stata scelta 

    let numeroCaselle = 0;
    let casellePerLato = 0;



    // inizializzo uno switch che cambia il valore delle mie variabili  (già inizializzate ) a seconda delle difficoltà scelte
    
    switch(difficoltà){
        case "easy":
            numeroCaselle = 100;
            casellePerLato = 10;
            break;
        case "hard":
            numeroCaselle = 81;
            casellePerLato = 9;
            break;
        case "crazy":
            numeroCaselle = 49;
            casellePerLato = 7;
            break;
        }
                

        
        
        const bombe = [];
        
        const numero_bombe = 16;
        
        
        function randomNumber (min , max){
            return Math.floor(Math.random() * (max - min + 1))
        }
        
        
        for(i=1 ; i <= numero_bombe; i++){
            bomba = randomNumber( 1 , numeroCaselle)
            
            
            bombe.push(bomba);
            
        }
        
        console.log(bombe);
        
        // Costruisco un ciclo for che funzioni che sia uno solo e con una variabile
        // (numero di caselle) unica che cambia il numero di caselle della griglia in base all'uscita dello switch


        for (i=1; i <= numeroCaselle; i++){
                
            //  Ad ogni azione il ciclo deve: 
            
            // 1) creare un nuovo nodo (la casella )            
            const node = document.createElement("div");

                // 2) aggiungere al nodo creato la classe per stilizzarlo già pronta nel css 
            node.classList.add("square");
            
            // Aggiungere una larghezza e altezza che siano funzionali ai valori dell'uscita dello switch presa prima 

            node.style.width = `calc(100% / ${casellePerLato})`
            node.style.height = `calc(100% / ${casellePerLato})`
            
            // creare un nodo di testo che andrà  nella casella che conterrà il suo numero in successione 

            const nodeText = document.createElement("p");

            node.appendChild(nodeText);

            nodeText.innerHTML = i;
            
            // Inserire la nuova casella creata e il suo testo nel container (senza cancellare e sovrascrivere la casella creata alla ripetizione precendente )
            container.appendChild(node);

            
            // Per la nuova casella creata metterla in ascolto dell'evento "click" e cambiare il background al click
            
            
            node.addEventListener("click", mostraCella);
            
            
        }
        
        function mostraCella (){


            const cellValue = parseInt(this.querySelector("p").innerHTML);

            if(bombe.includes(cellValue)){
                
                this.classList.add("bomb-clicked");
                
                terminaGioco();
            }else{
                this.classList.add("clicked");
            }
            
        }
        
        // mi blocco qua 



            // funzione che termina il gioco 
        function terminaGioco(){
            
            // Creo un array con tutte le caselle del grid 

            let squares = document.getElementsByClassName("square");

            // ne faccio scorrere i valori da un ciclo for

            for(i = 1; i < squares.length; i++){

                // Per ogni valore dell'array casella (quindi per ogni casella)

                let square = squares[i];
                
                let cellValue = parseInt(square.querySelector("p").innerHTML);

                // Faccio rimuovere l'ascoltatore di eventi per il click, perchè mi trovo già nella situazione in cui ho cliccato su una bomba
                square.removeEventListener("click" , mostraCella);

                // Metto un ultima condizione per la quale tutte le caselle che contengono la bomba vengono colorate di rosso 
                
                if (bombe.includes(cellValue)){
                    square.classList.add("bomb-clicked");
                    let messaggio = document.getElementById("messaggio_vincita");
                    messaggio.innerHTML = "Hai perso! Prova di nuovo!";
    
                }
            }
        }


}


play.addEventListener("click", gioca)




