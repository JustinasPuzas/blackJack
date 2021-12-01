const cC = require("console-control-strings");
import Card from "../Card";

class Hand {
  readonly _cards: Card[] = [];
  public _pointerPos!: number;
  public name!: string;
  public color!: string;

  constructor(pointerPos: number) {
    this._pointerPos = pointerPos;
  }

  public addCard(card: Card) {
    this._cards.push(card);
    this.checkValueOfCards();
  }

  public checkValueOfCards(): number {
    let rawCardValue = 0;
    const rawCards = this._cards.filter((card) => {
      if (Number.isInteger(card.value)) {
        rawCardValue += card.value as number;
        return true;
      }
      return false;
    });
    const aceCards = this._cards.filter(
      (card) => !Number.isInteger(card.value)
    );
    return this.valueAfterReducingAces(rawCardValue, aceCards);
  }

  public async displayAllCards() {
    let cards = `${this._cards.map( (card) => {
      return (
        cC.color(`${card.color}`, "bgWhite") +
        `${card.symbol}` +
        cC.color("reset") +
        " "
      );
    })}`;
    for(let card of this._cards) cards = cards.replace(",", "")

    cards = cards.replace(",", "")
    cards = cards.replace(",", "")
    cards = cards.replace(",", "")
    cards = cards.replace(",", "")
    cards = cards.replace(",", "")

    process.stdout.write(cC.goto(50, this._pointerPos));
    console.log(
      cC.color(`${this.color}`) +
        `${this.name} Hand: ${cards}` +
        cC.color("reset") +
        cC.color(`${this.color}`) +
        `Value: ${this.checkValueOfCards()}` +
        cC.color("reset")
    );
  }

  private valueAfterReducingAces(rawValue: number, aces: Card[]) {
    if (aces.length === 0) return rawValue;
    let totalValue = rawValue;
    let sumOfAces = aces.length * 11;
    for (let i = 0; i < aces.length; i++) {
      if (totalValue + sumOfAces <= 21) break;
      sumOfAces -= 10;
    }
    return totalValue + sumOfAces;
  }
}

export default Hand;
