//Place un kanji dans le h2 de la div #words

function Carte(kanji, pronun, transl) {
    this.kanji = kanji;
    this.pronun = pronun;
    this.transl = transl;
}

//On download les decks venant du localstorage
var kanjiDeck1 = [];
var kanjiDeck2 = [];

function downloadDecks() {
    var getDeck = localStorage.getItem('Deck1');
    kanjiDeck1 = JSON.parse(getDeck);
    getDeck = localStorage.getItem('Deck2');
    kanjiDeck2 = JSON.parse(getDeck);
}
downloadDecks();

//Liste des variables

const cardPlace = document.getElementsByTagName('h2')[0];
const sessionEnding = document.getElementById('sessionEnding');
const sessionOngoing = document.getElementById('sessionOngoing');
const cardsHolder = document.getElementById('words');
var actualDeck = [];
var question = new Carte();
var result = document.getElementsByTagName('p')[0];
var cardNumber = 0;
var keyPressedOnce = true;

const deckStatut = document.querySelectorAll("h3");
var cardsLeft = 0;
var cardsCorrect = 0;
var cardsIncorrect = 0;

function start() {
    if (actualDeck != 0) {
        const y = document.getElementById('start');  
        y.style = "display: none;";
        result.innerHTML = "";                      
        document.getElementById('answer').value = "";
        downloadDecks();
        pullCard();
    }
}

function pullCard() {
    const y = document.getElementById('start');  
    sessionOngoing.style = "display: initial;";
    keyPressedOnce = true;

    if (actualDeck.length === 0) {
        sessionOngoing.style.display = "none";
        sessionEnding.style.display = "initial";
        document.getElementsByTagName('h2')[1].innerHTML = "<br>Fin de la session! veuillez appuyer sur le bouton 'Start'.";
        y.style = "display: initial;";
        document.getElementById('answer').value = "";
        cardsHolder.style.backgroundColor = "white";
        cardsHolder.style.color = "black";
        return;
    }
    document.getElementsByTagName('h2')[1].innerHTML = "";
    cardsHolder.style.backgroundColor = "white";
    cardsHolder.style.color = "black";
    cardNumber = parseInt(Math.random()*(actualDeck.length));             //On place un kanji dans h2
    question = actualDeck[cardNumber];
    cardPlace.innerHTML = question.kanji;
    const greyLine = document.getElementsByTagName('canvas')[0];
    greyLine.style = "display: initial;";
    result.innerHTML = "";                          //Puis on retire le message du résultat
    document.getElementById('answer').value = "";
}

//On regarde si la réponse de l'utilisateur est bonne 
function userAnswer(event) {
    var key = event.keyCode;
    if (key === 13 && keyPressedOnce && actualDeck != 0) {
        keyPressedOnce = false;
        const x = document.getElementById('answer').value;
        if (x == question.pronun) {
            actualDeck.splice(cardNumber,1);
            cardsCorrect += 1;
            deckStatut[1].innerText = `Correctes: ${cardsCorrect}`;
            cardsHolder.style.backgroundColor = "#00cc00";
            cardsHolder.style.color = "white";
        }
        else {
            cardsIncorrect += 1;
            deckStatut[2].innerText = `Incorrectes: ${cardsIncorrect}`;
            cardsHolder.style.backgroundColor = "#ff3333";
            cardsHolder.style.color = "white";
        }
        result.innerHTML = `${question.pronun} <br> ${question.transl}`;
        cardsLeft = actualDeck.length;
        deckStatut[0].innerText = `Restants: ${cardsLeft}`;
        setTimeout(pullCard, 1500);
    }
}

//Choix du deck
for (let i=1; i<3; i++) {
    const x = document.getElementsByClassName("dropdown-Items")[0];
    var div = document.createElement("a");
    div.innerText = "List " + i;
    x.appendChild(div);

    div.onclick = function() {
        console.log(i);
        if (i == 1) {
            actualDeck = kanjiDeck1;
        }
        else {
            actualDeck = kanjiDeck2;
        }
        cardsLeft = actualDeck.length;
        deckStatut[0].innerText = `Restants: ${cardsLeft}`;
        cardsCorrect = 0;
        deckStatut[1].innerText = `Correctes: ${cardsCorrect}`;
        cardsIncorrect = 0;
        deckStatut[2].innerText = `Incorrectes: ${cardsIncorrect}`;
    }

}

//
// deckmaker.html scripts
//
function collectData(event) {
    var key = event.keyCode;
    if (key == 13) {
        const premierValeur = document.getElementById("premier").value;
        const deuxiemeValeur = document.getElementById("deuxieme").value;
        const troisiemeValeur = document.getElementById("troisieme").value;
        if (premierValeur != "" && deuxiemeValeur != "" && troisiemeValeur != "") {
            var newCard = new Carte();
            newCard.kanji = premierValeur;
            newCard.pronun = deuxiemeValeur;
            newCard.transl = troisiemeValeur;
            kanjiDeck1.push(newCard);
        }
        else {
            console.log("C'est pas bon");
        }
    
    clearForm();
    document.getElementById("premier").select();
    }
}

function clearForm() {
    document.getElementById("premier").value = "";
    document.getElementById("deuxieme").value = "";
    document.getElementById("troisieme").value = "";
}

function showMenu() {
    const x = document.querySelector("#deckMenu");
    if (x.style.display === "none") {
        x.style.display = "flex";
    }
    else {
        x.style.display = "none";
    }
}

function uploadDeck() {
    localStorage.setItem('Deck1', JSON.stringify(kanjiDeck1));
}