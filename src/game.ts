const cC = require("console-control-strings");
import readLine from "readline";
import Deck from './Deck'
import {Hand, Dealer, Player} from './Hand';

class Table {
  private _shoe!: Deck;
  private _dealerHand: Dealer = new Dealer(4);
  private _playerHand: Player = new Player(6, "Player");
  private _userInput: string = "d";
  private _score: { win: number; lose: number } = { win: 0, lose: 0 };

  constructor(deckAmount: number) {
    this._shoe = new Deck(deckAmount);
    this.gameLoop();
  }

  private async gameLoop() {
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
        await this.userAction("");
        this.gameLoop();
        break;
    }
  }

  private async hit() {
    // draw player
    this._shoe.takeCardsTo(1, this._playerHand);

    if (this._playerHand.checkValueOfCards() > 21) {
      this.displayWinner(this._dealerHand);
      await this.userAction("Play another round? ... Deal ");
      this.gameLoop();
      return;
    } else if (this._playerHand.checkValueOfCards() == 21) {
      this.playerEqual21();
      await this.userAction("Play another round? ... Deal ");
      this.gameLoop();
      return;
    }

    this._playerHand.checkValueOfCards();
    this._playerHand.displayAllCards();
    // user input
    await this.userAction(`Hit or Stand?`);
    this.gameLoop();
  }

  private async stand() {
    // reveal dealer card
    // draw dealer cards if needed

    if (this._playerHand.checkValueOfCards() == 21) {
      this.playerEqual21();
    } else {
      this.playerLessThan21();
    }

    await this.userAction("Play another round? ... Deal ");
    this.gameLoop();
  }

  private async deal() {
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
      await this.userAction("Play another round? ... Deal ");
      this.gameLoop();
      return;
    }

    // user input
    await this.userAction("hit or stand?");
    this.gameLoop();
  }

  private dealerLessThan17() {
    this._dealerHand.displayAllCards();
    if (this._dealerHand.checkValueOfCards() < 17) {
      this._shoe.takeCardsTo(1, this._dealerHand);
      this.dealerLessThan17();
    }
  }

  // check only dealer score
  // only after player cant do anymore actions
  // if player < 21 lose or push or win

  private playerLessThan21(): void {
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

  private playerEqual21() {
    const dealerScore = this._dealerHand.checkValueOfCards();
    this.dealerLessThan17();

    if (dealerScore == 21) {
      this.displayPush();
    } else {
      this.displayWinner(this._playerHand);
    }
  }

  // if player == 21 push or win
  // if player > 21 auto loose lose

  private displayWinner(winner: Hand) {
    // end game display cards
    // display winner and score
    if (winner.name == this._dealerHand.name) {
      this._score.lose++;
    } else {
      this._score.win++;
    }
    this._dealerHand.displayAllCards();
    this._playerHand.displayAllCards();
    console.log(winner.name + " Won !!!");
    console.log(this._score);
    this._userInput = "e";
  }

  private displayPush() {
    console.clear();
    this._dealerHand.displayAllCards();
    this._playerHand.displayAllCards();
    console.log("PUSH ...");
    console.log(this._score);
    this._userInput = "e";
  }

  private newRound() {
    console.clear();
    this._playerHand = new Player(
      this._playerHand._pointerPos,
      this._playerHand.name
    );
    this._dealerHand = new Dealer(this._dealerHand._pointerPos);
  }

  private async userAction(question: string): Promise<string> {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const response: string = await new Promise((resolve) =>
      rl.question(question, (ans) => {
        rl.close();
        return resolve(ans);
      })
    );

    this._userInput = response.toLowerCase()[0];
    return response.toLowerCase()[0];
  }

  // stand
  // hit get card
  // deal start dealing the cards
  // bet choose amount of money to bet
  // insurance if dealer gets ace
}

class BlackJack {
  constructor() {
    console.clear();
    this.menu('to Start the game press "Enter"').then(() => {
      const table = new Table(6);
    });
  }

  private async menu(query: string) {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const response: string = await new Promise((resolve) =>
      rl.question(query, (ans) => {
        rl.close();
        return resolve(ans);
      })
    );
    console.clear();
    return response.toLowerCase()[0];
  }
}

export default BlackJack;
