// Creation d'object puis stockage de ces objects dans un array

function Carte(kanji, pronun) {
    this.kanji = kanji;
    this.pronun = pronun;
}

var kanji001 = new Carte('女','おんな');
var kanji002 = new Carte('男','おとこ');
var kanji003 = new Carte('桜','さくら');
var kanji004 = new Carte('穏便','');
var kanji005 = new Carte('誠','');
var kanji006 = new Carte('推薦','');
var kanji007 = new Carte('砂','');
var kanji008 = new Carte('色素','');
var kanji009 = new Carte('組織','');
var kanji010 = new Carte('抜釘','');

kanjiDeck = [kanji001, kanji002, kanji003, kanji004, kanji005, kanji006, kanji007, kanji008, kanji009, kanji010];

//Place un kanji dans le h2 de la div #words

const cardPlace = document.getElementsByTagName('h2')[0];

function start() {
    var x = parseInt(Math.random()*10);             //On place un kanji dans h2
    cardPlace.innerHTML = kanjiDeck[x].kanji;

    const y = document.getElementById('start');     //Puis on retire le bouton "start"
    y.style = "display: none;";
}
