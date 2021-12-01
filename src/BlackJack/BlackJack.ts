const cC = require("console-control-strings");
import readLine from "readline";
import Table from './Table';

class BlackJack {

  constructor() {
    console.clear();
    this.menu('To start game enter amount of decks you want to play with').then((res) => {
      new Table(res);
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
    if(!Number.isInteger(response)) this.menu(query)
    return Number.parseInt(response.toLowerCase());
  }
}

export default BlackJack;
