class Card {
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

  export default Card;