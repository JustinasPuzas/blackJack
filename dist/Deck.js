"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(name, suit) {
        this.name = name.toString();
        this.suit = suit;
        const symbolConversionMap = new Map()
            .set("Diamonds", "♦")
            .set("Clubs", "♣")
            .set("Hearts", "♥")
            .set("Spades", "♣");
        const valueConversionMap = new Map()
            .set("Ace", [1, 11])
            .set("Jack", 10)
            .set("Queen", 10)
            .set("King", 10);
        const colorConversionMap = new Map()
            .set("Diamonds", "red")
            .set("Hearts", "red")
            .set("Clubs", "black")
            .set("Spades", "black");
        this.color = colorConversionMap.get(this.suit);
        this.value = Number.isInteger(name)
            ? name
            : valueConversionMap.get(name);
        this.symbol = `${Number.parseInt(this.name[0]) ? this.name : this.name[0]}${symbolConversionMap.get(this.suit)}`;
    }
}
exports.Card = Card;
class Deck {
    constructor(deckCount) {
        this._decks = [];
        this._usedDecks = [];
        this._plasticCard = 60;
        this._numberOfDecks = deckCount;
        for (let i = 0; i < deckCount; i++) {
            this.generateDeck();
        }
        this.shuffleDecks();
    }
    takeCardsTo(amountOfCards, cardArr) {
        for (let i = 0; i < amountOfCards; i++) {
            this.takeOneCard(cardArr);
        }
    }
    getAmountOfDecks() {
        // amount of decks used in game
        return this._numberOfDecks;
    }
    endOfDecks() {
        if (this._decks.length < this._plasticCard)
            this.shuffleDecks();
    }
    shuffleDecks() {
        // shuffle Decks
        this._decks.push(...this._usedDecks);
        this._usedDecks = [];
        let currentIndex = this._decks.length, randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [this._decks[currentIndex], this._decks[randomIndex]] = [
                this._decks[randomIndex],
                this._decks[currentIndex],
            ];
        }
    }
    takeOneCard(cardArr) {
        const card = this._decks.shift();
        if (!card)
            return; // meme safe guard deck will be shuffle then 60 or less card are left
        this._usedDecks.push(card);
        cardArr.addCard(card);
    }
    generateDeck() {
        const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
        const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
        for (let suit of suits) {
            for (let value of values) {
                this._decks.push(new Card(value, suit));
            }
        }
    }
}
exports.default = Deck;
