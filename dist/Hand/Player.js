"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hand_1 = __importDefault(require("./Hand"));
class Player extends Hand_1.default {
    // display card
    constructor(pointerPos, name) {
        super(pointerPos);
        this.name = name;
        this.color = "white";
    }
}
exports.default = Player;
