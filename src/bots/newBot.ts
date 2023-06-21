import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    makeMove(gamestate: Gamestate): BotSelection {
        const possibleMoves: BotSelection[] = ['R', 'P', 'S'];
        const current = this.generateRandomNumber(gamestate)

        this.printRound(gamestate)

        return possibleMoves[current]
    }

    private generateRandomNumber(gamestate: Gamestate): number {
        return Math.floor(Math.random()*3)
    }

    private printRound(gamestate: Gamestate) {
        const currentRound = gamestate.rounds[gamestate.rounds.length - 1]
        console.log(currentRound)
    }
}

export = new Bot();
