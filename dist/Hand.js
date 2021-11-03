"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dealer = exports.Player = exports.Hand = void 0;
const cC = require("console-control-strings");
class Hand {
    constructor(pointerPos) {
        this._cards = [];
        this._pointerPos = pointerPos;
    }
    addCard(card) {
        this._cards.push(card);
        this.checkValueOfCards();
    }
    checkValueOfCards() {
        let rawCardValue = 0;
        const rawCards = this._cards.filter((card) => {
            if (Number.isInteger(card.value)) {
                rawCardValue += card.value;
                return true;
            }
            return false;
        });
        const aceCards = this._cards.filter((card) => !Number.isInteger(card.value));
        return this.valueAfterReducingAces(rawCardValue, aceCards);
    }
    displayAllCards() {
        return __awaiter(this, void 0, void 0, function* () {
            let cards = `${this._cards.map((card) => {
                return (cC.color(`${card.color}`, "bgWhite") +
                    `${card.symbol}` +
                    cC.color("reset") +
                    " ");
            })}`;
            for (let card of this._cards)
                cards = cards.replace(",", "");
            cards = cards.replace(",", "");
            cards = cards.replace(",", "");
            cards = cards.replace(",", "");
            cards = cards.replace(",", "");
            cards = cards.replace(",", "");
            process.stdout.write(cC.goto(50, this._pointerPos));
            console.log(cC.color(`${this.color}`) +
                `${this.name} Hand: ${cards}` +
                cC.color("reset") +
                cC.color(`${this.color}`) +
                `Value: ${this.checkValueOfCards()}` +
                cC.color("reset"));
        });
    }
    valueAfterReducingAces(rawValue, aces) {
        if (aces.length === 0)
            return rawValue;
        let totalValue = rawValue;
        let sumOfAces = aces.length * 11;
        for (let i = 0; i < aces.length; i++) {
            if (totalValue + sumOfAces <= 21)
                break;
            sumOfAces -= 10;
        }
        return totalValue + sumOfAces;
    }
}
exports.Hand = Hand;
class Dealer extends Hand {
    constructor(pointerPos) {
        super(pointerPos);
        this.name = "Dealer";
        this.color = "red";
    }
    displayOneCard() {
        process.stdout.write(cC.goto(50, this._pointerPos));
        console.log(cC.color(`${this.color}`) +
            `${this.name} Hand: ` + cC.color('white', "bgRed") + "//" +
            cC.color("reset") +
            " " + cC.color(`${this._cards[1].color}`, "bgWhite") +
            `${this._cards[1].symbol}` + cC.color("reset") +
            " " + cC.color(`${this.color}`) + `Value: ${this._cards[1].name == "Ace" ? 11 : this._cards[1].value}` +
            cC.color("reset"));
    }
}
exports.Dealer = Dealer;
class Player extends Hand {
    // display card
    constructor(pointerPos, name) {
        super(pointerPos);
        this.name = name;
        this.color = "white";
    }
}
exports.Player = Player;
