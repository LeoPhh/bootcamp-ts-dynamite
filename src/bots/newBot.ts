import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {

    makeMove(gamestate: Gamestate): BotSelection {

        let currentMove: BotSelection
        const totalGamesPlayed = gamestate.rounds.length

        // Initially play any first move, then randomise afterwards (unless overwritten)
        if (this.numberOfGamesPlayed(gamestate, 0)) {
            currentMove = 'P'
        } else {
            currentMove = this.randomiseMove(gamestate, 4)
        }

        // Override current move if certain conditions are met
        if (totalGamesPlayed>0) {
            console.log(this.mostRecentRound(gamestate)) // Not required (just for testing purposes)
            
            if (this.dynamitesUsed(gamestate)==100) {
                currentMove = this.randomiseMove(gamestate, 3)
            }

            // Check for repeating moves strategy
            if (totalGamesPlayed>50 && totalGamesPlayed<1000) {
                const mostRecentMove = this.mostRecentRound(gamestate).p2
                if (this.detectRepeatingMoves(gamestate, 1)) {
                    currentMove = this.defend(gamestate, mostRecentMove)
                } 
                if (this.detectRepeatingMoves(gamestate, 3)) {
                    currentMove = this.counterAttack(gamestate, mostRecentMove)
                }
            } else if (totalGamesPlayed>=1000) {
                const mostRecentMove = this.mostRecentRound(gamestate).p2
                if (this.detectRepeatingMoves(gamestate, 3)) {
                    currentMove = this.defend(gamestate, mostRecentMove)
                } 
                if (this.detectRepeatingMoves(gamestate, 5)) {
                    currentMove = this.counterAttack(gamestate, mostRecentMove)
                }
            }
        }

        
        return currentMove
        
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

    private detectPreviousMoves(gamestate: Gamestate, moves): Array<BotSelection> {
        let previousXMoves = []
        const totalMoves = gamestate.rounds.length
        for (let i = totalMoves-moves; i<totalMoves; i++) {
            previousXMoves.push(gamestate.rounds[i].p2)
        }
        return previousXMoves
    }

    private detectRepeatingMoves(gamestate: Gamestate, moves): boolean {
        let previousXMoves = this.detectPreviousMoves(gamestate, moves)
        const allEqual = arr => arr.every(x => x===arr[0])
        return allEqual(previousXMoves)
    }

    private counterAttack(gamestate: Gamestate, move: BotSelection): BotSelection {
        switch (move) {
            case 'P': return 'S'
            case 'R': return 'P'
            case 'S': return 'R'
            case 'D': return 'W'
            case 'W': return 'P'
        }
    }

    private defend(gamestate: Gamestate, move: BotSelection): BotSelection {
        if (move=='P') {
            return this.randomFromSelectionOfMoves(gamestate, ['P', 'R'])
        } else if (move=='R') {
            return this.randomFromSelectionOfMoves(gamestate, ['S', 'R'])
        } else if (move=='S') {
            return this.randomFromSelectionOfMoves(gamestate, ['P', 'S'])
        } else if (move=='D') {
            return 'W'
        } else {
            return this.randomiseMove(gamestate, 3)
        }
    }

    private randomFromSelectionOfMoves(gamestate: Gamestate, selection: Array<BotSelection>): BotSelection {
        const randomNum = Math.floor(Math.random()*selection.length)
        return selection[randomNum]
    }

}

export = new Bot();
