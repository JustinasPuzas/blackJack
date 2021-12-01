import Hand from "./Hand";

class Player extends Hand {
  // display card
  constructor(pointerPos: number, name: string) {
    super(pointerPos);
    this.name = name;
    this.color = "white";
  }
}

export default Player;