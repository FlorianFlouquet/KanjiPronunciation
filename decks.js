// Creation d'object puis stockage de ces objects dans un array

function Carte(kanji, pronun) {
    this.kanji = kanji;
    this.pronun = pronun;
}

var kanji001 = new Carte('女','おんな');
var kanji002 = new Carte('男','おとこ');
var kanji003 = new Carte('桜','さくら');
var kanji004 = new Carte('穏便','おんびん');
var kanji005 = new Carte('誠','まこと');
var kanji006 = new Carte('推薦','すいせん');
var kanji007 = new Carte('砂','すな');
var kanji008 = new Carte('色素','しきそ');
var kanji009 = new Carte('組織','そしき');
var kanji010 = new Carte('抜釘','ばってい');

kanjiDeck = [kanji001, kanji002, kanji003, kanji004, kanji005, kanji006, kanji007, kanji008, kanji009, kanji010];