"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("./Card"));
class Deck {
    constructor(deckCount) {
        this._decks = [];
        this._usedDecks = [];
        this._plasticCard = 20;
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
            return; // meme safe guard to please typescript gods deck will be shuffle then 60 or less card are left
        this._usedDecks.push(card);
        cardArr.addCard(card);
    }
    generateDeck() {
        const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
        const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
        suits.map(suit => {
            values.map(value => { this._decks.push(new Card_1.default(value, suit)); });
        });
        // for (let suit of suits) {
        //   for (let value of values) {
        //     this._decks.push(new Card(value, suit));
        //   }
        // }
    }
}
exports.default = Deck;
