"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cC = require("console-control-strings");
const Hand_1 = __importDefault(require("./Hand"));
class Dealer extends Hand_1.default {
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
exports.default = Dealer;
