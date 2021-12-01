"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Card;
