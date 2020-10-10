//Place un kanji dans le h2 de la div #words

function Carte(kanji, pronun) {
    this.kanji = kanji;
    this.pronun = pronun;
}

const cardPlace = document.getElementsByTagName('h2')[0];
var actualDeck = [];
var question = new Carte();
var result = document.getElementsByTagName('p')[0];
var cardNumber = 0;

function pullCard() {
    actualDeck = kanjiDeck;
    cardNumber = parseInt(Math.random()*(actualDeck.length));             //On place un kanji dans h2
    question = actualDeck[cardNumber];
    cardPlace.innerHTML = question.kanji;

    const y = document.getElementById('start');     //Puis on retire le bouton "start"
    y.style = "display: none;";

    result.innerHTML = "";                          //Puis on retire le message du résultat
    document.getElementById('answer').value = "";
}

//On regarde si la réponse est bonne 

function userAnswer(event) {
    var key = event.keyCode;
    if (key == 13) {
        const x = document.getElementById('answer').value;
        if (x == question.pronun) {
            result.innerHTML = "Bonne réponse!";
            actualDeck.splice(cardNumber,1);
            if (actualDeck.length == 0) {
                result.innerHTML = "Bonne réponse. C'était la dernière carte.";
                return;
            }
        }
        else {
            result.innerHTML = "Mauvaise réponse!";
        }

        setTimeout(pullCard, 1000);
    }
}


