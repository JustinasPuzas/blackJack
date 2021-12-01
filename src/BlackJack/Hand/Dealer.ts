const cC = require("console-control-strings");
import Hand from "./Hand";

class Dealer extends Hand {
    constructor(pointerPos: number) {
      super(pointerPos);
      this.name = "Dealer";
      this.color = "red";
    }
  
    public displayOneCard() {
      process.stdout.write(cC.goto(50, this._pointerPos));
      console.log(
        cC.color(`${this.color}`) +
          `${this.name} Hand: `+ cC.color('white', "bgRed") + "//" + 
          cC.color("reset") +
          " "  + cC.color(`${this._cards[1].color}`, "bgWhite") +
          `${this._cards[1].symbol}` + cC.color("reset") +
          " " + cC.color(`${this.color}`) + `Value: ${
            this._cards[1].name == "Ace" ? 11 : this._cards[1].value
          }` +
          cC.color("reset")
      );
    }
}

export default Dealer