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
const Player_1 = __importDefault(require("./Hand/Player"));
const Dealer_1 = __importDefault(require("./Hand/Dealer"));
class Table {
    constructor(deckAmount) {
        this._dealerHand = new Dealer_1.default(4);
        this._playerHand = new Player_1.default(6, "Player");
        this._userInput = "d";
        this._score = { win: 0, lose: 0 };
        this._shoe = new Deck_1.default(deckAmount);
        this.gameLoop();
    }
    gameLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this._userInput) {
                case "h":
                    this.hit();
                    break;
                case "s":
                    this.stand();
                    break;
                case "d":
                    this.deal();
                    break;
                case "e":
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
                yield this.userAction("Play another round? ... (d) Deal (e) End Game ");
                this.gameLoop();
                return;
            }
            else if (this._playerHand.checkValueOfCards() == 21) {
                this.checkWinConditions();
                yield this.userAction("Play another round? ... (d) Deal (e) End Game ");
                this.gameLoop();
                return;
            }
            this._playerHand.checkValueOfCards();
            this._playerHand.displayAllCards();
            // user input
            yield this.userAction(`(h) Hit or (s) Stand?`);
            this.gameLoop();
        });
    }
    stand() {
        return __awaiter(this, void 0, void 0, function* () {
            // reveal dealer card
            // draw dealer cards if needed
            this.checkWinConditions();
            yield this.userAction("Play another round? ... (d) Deal (e) End Game ");
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
                this.checkWinConditions();
                yield this.userAction("Play another round? ... (d) Deal (e) End Game ");
                this.gameLoop();
                return;
            }
            // user input
            yield this.userAction("(h) Hit or (s) Stand?");
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
    checkWinConditions() {
        this.dealerLessThan17();
        const dealerScore = this._dealerHand.checkValueOfCards();
        const playerScore = this._playerHand.checkValueOfCards();
        if (playerScore == 21) {
            this.playerEqual21(dealerScore);
            return;
        }
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
    playerEqual21(dealerScore) {
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
        if (winner.name == this._dealerHand.name)
            this._score.lose++;
        else
            this._score.win++;
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
        this._playerHand = new Player_1.default(this._playerHand._pointerPos, this._playerHand.name);
        this._dealerHand = new Dealer_1.default(this._dealerHand._pointerPos);
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
exports.default = Table;
