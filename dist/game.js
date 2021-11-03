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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cC = require("console-control-strings");
const readline_1 = __importDefault(require("readline"));
const Deck_1 = __importDefault(require("./Deck"));
const Hand_1 = require("./Hand");
class Table {
    constructor(deckAmount) {
        this._dealerHand = new Hand_1.Dealer(4);
        this._playerHand = new Hand_1.Player(6, "Player");
        this._userInput = "d";
        this._score = { win: 0, lose: 0 };
        this._shoe = new Deck_1.default(deckAmount);
        this.gameLoop();
    }
    gameLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this._userInput) {
                case "h":
                    // draw player
                    // check for winner
                    // user input
                    this.hit();
                    break;
                case "s":
                    // reveal dealer
                    // draw dealer cards if needed
                    // check for winner
                    // user input to deal or exit
                    this.stand();
                    break;
                case "d":
                    this.deal();
                    // reset hands
                    // deal cards
                    // reveal dealer
                    // check for winner
                    // user input
                    break;
                default:
                    yield this.userAction("");
                    this.gameLoop();
                    break;
            }
        });
    }
    hit() {
        return __awaiter(this, void 0, void 0, function* () {
            // draw player
            this._shoe.takeCardsTo(1, this._playerHand);
            if (this._playerHand.checkValueOfCards() > 21) {
                this.displayWinner(this._dealerHand);
                yield this.userAction("Play another round? ... Deal ");
                this.gameLoop();
                return;
            }
            else if (this._playerHand.checkValueOfCards() == 21) {
                this.playerEqual21();
                yield this.userAction("Play another round? ... Deal ");
                this.gameLoop();
                return;
            }
            this._playerHand.checkValueOfCards();
            this._playerHand.displayAllCards();
            // user input
            yield this.userAction(`Hit or Stand?`);
            this.gameLoop();
        });
    }
    stand() {
        return __awaiter(this, void 0, void 0, function* () {
            // reveal dealer card
            // draw dealer cards if needed
            if (this._playerHand.checkValueOfCards() == 21) {
                this.playerEqual21();
            }
            else {
                this.playerLessThan21();
            }
            yield this.userAction("Play another round? ... Deal ");
            this.gameLoop();
        });
    }
    deal() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`deal`);
            // reset hands
            this.newRound();
            // deal cards
            this._shoe.takeCardsTo(2, this._playerHand);
            this._shoe.takeCardsTo(2, this._dealerHand);
            // display Cards
            this._dealerHand.displayOneCard();
            this._playerHand.displayAllCards();
            // check for winner
            if (this._playerHand.checkValueOfCards() == 21) {
                this.playerEqual21();
                yield this.userAction("Play another round? ... Deal ");
                this.gameLoop();
                return;
            }
            // user input
            yield this.userAction("hit or stand?");
            this.gameLoop();
        });
    }
    dealerLessThan17() {
        this._dealerHand.displayAllCards();
        if (this._dealerHand.checkValueOfCards() < 17) {
            this._shoe.takeCardsTo(1, this._dealerHand);
            this.dealerLessThan17();
        }
    }
    // check only dealer score
    // only after player cant do anymore actions
    // if player < 21 lose or push or win
    playerLessThan21() {
        this.dealerLessThan17();
        const dealerScore = this._dealerHand.checkValueOfCards();
        const playerScore = this._playerHand.checkValueOfCards();
        if (dealerScore > 21) {
            this.displayWinner(this._playerHand);
            return;
        } // if dealer bust player win
        if (dealerScore == 21) {
            this.displayWinner(this._dealerHand);
            return;
        } // if dealer blackjack player loose
        if (dealerScore > playerScore) {
            this.displayWinner(this._dealerHand);
            return;
        } // if dealer higher player loose
        if (dealerScore < playerScore) {
            this.displayWinner(this._playerHand);
            return;
        } // if dealer lower player win
        if (dealerScore == playerScore) {
            this.displayPush();
        }
    }
    playerEqual21() {
        const dealerScore = this._dealerHand.checkValueOfCards();
        this.dealerLessThan17();
        if (dealerScore == 21) {
            this.displayPush();
        }
        else {
            this.displayWinner(this._playerHand);
        }
    }
    // if player == 21 push or win
    // if player > 21 auto loose lose
    displayWinner(winner) {
        // end game display cards
        // display winner and score
        if (winner.name == this._dealerHand.name) {
            this._score.lose++;
        }
        else {
            this._score.win++;
        }
        this._dealerHand.displayAllCards();
        this._playerHand.displayAllCards();
        console.log(winner.name + " Won !!!");
        console.log(this._score);
        this._userInput = "e";
    }
    displayPush() {
        console.clear();
        this._dealerHand.displayAllCards();
        this._playerHand.displayAllCards();
        console.log("PUSH ...");
        console.log(this._score);
        this._userInput = "e";
    }
    newRound() {
        console.clear();
        this._playerHand = new Hand_1.Player(this._playerHand._pointerPos, this._playerHand.name);
        this._dealerHand = new Hand_1.Dealer(this._dealerHand._pointerPos);
    }
    userAction(question) {
        return __awaiter(this, void 0, void 0, function* () {
            const rl = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            const response = yield new Promise((resolve) => rl.question(question, (ans) => {
                rl.close();
                return resolve(ans);
            }));
            this._userInput = response.toLowerCase()[0];
            return response.toLowerCase()[0];
        });
    }
}
class BlackJack {
    constructor() {
        console.clear();
        this.menu('to Start the game press "Enter"').then(() => {
            const table = new Table(6);
        });
    }
    menu(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const rl = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            const response = yield new Promise((resolve) => rl.question(query, (ans) => {
                rl.close();
                return resolve(ans);
            }));
            console.clear();
            return response.toLowerCase()[0];
        });
    }
}
exports.default = BlackJack;
