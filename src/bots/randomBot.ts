import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    makeMove(gamestate: Gamestate): BotSelection {
        const possibleMoves: BotSelection[] = ['R', 'P', 'S'];
        const current = this.generateRandomNumber(gamestate)
        console.log(gamestate.rounds[gamestate.rounds.length - 1])
        return possibleMoves[current];
    }

    private generateRandomNumber(gamestate: Gamestate): number {
        return Math.floor(Math.random()*3)
    }
}

export = new Bot();
