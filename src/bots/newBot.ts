import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    makeMove(gamestate: Gamestate): BotSelection {

        let currentMove: BotSelection
        const totalGamesPlayed = gamestate.rounds.length

        if (this.numberOfGamesPlayed(gamestate, 0)) {
            currentMove = this.firstMove(gamestate)
        } else {
            currentMove = this.randomiseMove(gamestate, 4)
        }


        if (totalGamesPlayed>0) {
            console.log(this.mostRecentRound(gamestate))
            
            if (this.dynamitesUsed(gamestate)==100) {
                currentMove = this.randomiseMove(gamestate, 3)
            }
        }


        if (totalGamesPlayed>50) {
            console.log(this.detectPreviousMoves(gamestate, 4))
        }
        
        
        return currentMove
        
    }

    private firstMove(gamestate: Gamestate): BotSelection {
        return 'P'
    }

    private randomiseMove(gamestate: Gamestate, num): BotSelection {
        const possibleMoves: BotSelection[] = ['R', 'P', 'S', 'D'];
        const randomNum = Math.floor(Math.random()*num)
        return possibleMoves[randomNum]
    }

    private mostRecentRound(gamestate: Gamestate) {
        return gamestate.rounds[gamestate.rounds.length - 1]
    }

    private numberOfGamesPlayed(gamestate: Gamestate, num: number): boolean {
        return gamestate.rounds.length == num
    }

    private dynamitesUsed(gamestate: Gamestate): number {
        let myDynamites = 0
        for (let i =0; i<gamestate.rounds.length; i++) {
            if (gamestate.rounds[i].p1=='D') {
                myDynamites++
            }
        }
        return myDynamites
    }

    private detectPreviousMoves(gamestate: Gamestate, moves) {
        let previousXMoves = []
        const totalMoves = gamestate.rounds.length
        for (let i = totalMoves-moves; i<totalMoves; i++) {
            previousXMoves.push(gamestate.rounds[i].p2)
        }
        return previousXMoves
    }

}

export = new Bot();
