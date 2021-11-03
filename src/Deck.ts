import {Hand} from './Hand'

export class Card {
  readonly name: string; // Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen , King
  readonly suit: string; // Diamonds , Clubs , Hearts, Spades
  readonly symbol: string; // A♦ 2♣ Q♥  J♠
  readonly value: number | number[];
  readonly color: string;
  constructor(name: number | string, suit: string) {
    this.name = name.toString();
    this.suit = suit;

    const symbolConversionMap: Map<string, string> = new Map()
      .set("Diamonds", "♦")
      .set("Clubs", "♣")
      .set("Hearts", "♥")
      .set("Spades", "♣");

    const valueConversionMap: Map<string, number | number[]> = new Map()
      .set("Ace", [1, 11])
      .set("Jack", 10)
      .set("Queen", 10)
      .set("King", 10);

    const colorConversionMap: Map<string, string> = new Map()
      .set("Diamonds", "red")
      .set("Hearts", "red")
      .set("Clubs", "black")
      .set("Spades", "black");

    this.color = colorConversionMap.get(this.suit) as string;

    this.value = Number.isInteger(name)
      ? (name as number)
      : (valueConversionMap.get(name as string) as number | number[]);

    this.symbol = `${
      Number.parseInt(this.name[0]) ? this.name : this.name[0]
    }${symbolConversionMap.get(this.suit)}`;
  }
}

class Deck {
  private _decks: Card[] = [];
  private _numberOfDecks!: number;
  private _usedDecks: Card[] = [];
  private _plasticCard = 60;

  constructor(deckCount: number) {
    this._numberOfDecks = deckCount;
    for (let i = 0; i < deckCount; i++) {
      this.generateDeck();
    }
    this.shuffleDecks();
  }

  public takeCardsTo(amountOfCards: number, cardArr: Hand) {
    for (let i = 0; i < amountOfCards; i++) {
      this.takeOneCard(cardArr);
    }
  }

  public getAmountOfDecks() {
    // amount of decks used in game
    return this._numberOfDecks;
  }

  public endOfDecks() {
    if (this._decks.length < this._plasticCard) this.shuffleDecks();
  }

  private shuffleDecks() {
    // shuffle Decks
    this._decks.push(...this._usedDecks);
    this._usedDecks = [];

    let currentIndex = this._decks.length,
      randomIndex;

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

  private takeOneCard(cardArr: Hand) {
    const card = this._decks.shift();
    if (!card) return; // meme safe guard deck will be shuffle then 60 or less card are left

    this._usedDecks.push(card);
    cardArr.addCard(card);
  }

  private generateDeck() {
    const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
    const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
    for (let suit of suits) {
      for (let value of values) {
        this._decks.push(new Card(value, suit));
      }
    }
  }
}

export default Deck;
