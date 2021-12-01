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
const Table_1 = __importDefault(require("./Table"));
class BlackJack {
    constructor() {
        console.clear();
        this.menu('To start game enter amount of decks you want to play with').then((res) => {
            new Table_1.default(res);
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
            if (!Number.isInteger(response))
                this.menu(query);
            return Number.parseInt(response.toLowerCase());
        });
    }
}
exports.default = BlackJack;
