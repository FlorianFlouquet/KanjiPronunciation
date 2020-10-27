//Place un kanji dans le h2 de la div #words

function Carte(kanji, pronun) {
    this.kanji = kanji;
    this.pronun = pronun;
}

//On download les decks venant du localstorage

function downloadDecks() {
    var getDeck = localStorage.getItem('Deck1');
    kanjiDeck1 = JSON.parse(getDeck);
    getDeck = localStorage.getItem('Deck2');
    kanjiDeck2 = JSON.parse(getDeck);
}
downloadDecks();

//Liste des variables

const cardPlace = document.getElementsByTagName('h2')[0];
var actualDeck = [];
var question = new Carte();
var result = document.getElementsByTagName('p')[0];
var cardNumber = 0;

var correctIcon = document.getElementById('right');
var wrongIcon = document.getElementById('wrong');

const successBar = document.getElementById('canvas1');
const mistakeBar = document.getElementById('canvas2');
var timesAnswered = 0;
var success = 0;
var mistake = 0;

function pullCard() {
    cardNumber = parseInt(Math.random()*(actualDeck.length));             //On place un kanji dans h2
    question = actualDeck[cardNumber];
    cardPlace.innerHTML = question.kanji;

    const y = document.getElementById('start');     //Puis on retire le bouton "start"
    y.style = "display: none;";

    result.innerHTML = "";                          //Puis on retire le message du résultat
    document.getElementById('answer').value = "";

    correctIcon.style.color = "black";
    correctIcon.style.backgroundColor = "white";
    wrongIcon.style.color = "black";
    wrongIcon.style.backgroundColor = "white";
}

//On regarde si la réponse de l'utilisateur est bonne 

function userAnswer(event) {
    var key = event.keyCode;
    if (key == 13) {
        const x = document.getElementById('answer').value;
        if (x == question.pronun) {
            result.innerHTML = question.pronun;
            correctIcon.style.color = "white";
            correctIcon.style.backgroundColor = "green";
            actualDeck.splice(cardNumber,1);
            successRate();
            if (actualDeck.length == 0) {
                result.innerHTML += "<br>C'était la dernière carte.";
                return;
            }
        }
        else {
            result.innerHTML = question.pronun;
            mistakeRate();
            wrongIcon.style.color = "white";
            wrongIcon.style.backgroundColor = "red";
        }


        setTimeout(pullCard, 1000);
    }
}

//Script pour la barre de réussite        
function successRate() {
    success ++;
    timesAnswered ++;
    successBar.style.width = (success/timesAnswered)*100 + "%";
    mistakeBar.style.width = (mistake/timesAnswered)*100 + "%";
}

function mistakeRate() {
    mistake ++;
    timesAnswered ++;
    successBar.style.width = (success/timesAnswered)*100 + "%";
    mistakeBar.style.width = (mistake/timesAnswered)*100 + "%";
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
    }
}
