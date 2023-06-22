"use strict";
var Bot = /** @class */ (function () {
    function Bot() {
    }
    Bot.prototype.makeMove = function (gamestate) {
        var currentMove;
        var totalGamesPlayed = gamestate.rounds.length;
        // Initially play any first move, then randomise afterwards (unless overwritten)
        if (this.numberOfGamesPlayed(gamestate, 0)) {
            currentMove = 'P';
        }
        else {
            currentMove = this.randomiseMove(gamestate, 4);
        }
        // Override current move if certain conditions are met
        if (totalGamesPlayed > 0) {
            console.log(this.mostRecentRound(gamestate)); // Not required (just for testing purposes)
            if (this.dynamitesUsed(gamestate) == 100) {
                currentMove = this.randomiseMove(gamestate, 3);
            }
            // Check for repeating moves strategy
            if (totalGamesPlayed > 50 && totalGamesPlayed < 1000) {
                var mostRecentMove = this.mostRecentRound(gamestate).p2;
                if (this.detectRepeatingMoves(gamestate, 1)) {
                    currentMove = this.defend(gamestate, mostRecentMove);
                }
                if (this.detectRepeatingMoves(gamestate, 3)) {
                    currentMove = this.counterAttack(gamestate, mostRecentMove);
                }
            }
            else if (totalGamesPlayed >= 1000) {
                var mostRecentMove = this.mostRecentRound(gamestate).p2;
                if (this.detectRepeatingMoves(gamestate, 3)) {
                    currentMove = this.defend(gamestate, mostRecentMove);
                }
                if (this.detectRepeatingMoves(gamestate, 5)) {
                    currentMove = this.counterAttack(gamestate, mostRecentMove);
                }
            }
        }
        return currentMove;
    };
    Bot.prototype.randomiseMove = function (gamestate, num) {
        var possibleMoves = ['R', 'P', 'S', 'D'];
        var randomNum = Math.floor(Math.random() * num);
        return possibleMoves[randomNum];
    };
    Bot.prototype.mostRecentRound = function (gamestate) {
        return gamestate.rounds[gamestate.rounds.length - 1];
    };
    Bot.prototype.numberOfGamesPlayed = function (gamestate, num) {
        return gamestate.rounds.length == num;
    };
    Bot.prototype.dynamitesUsed = function (gamestate) {
        var myDynamites = 0;
        for (var i = 0; i < gamestate.rounds.length; i++) {
            if (gamestate.rounds[i].p1 == 'D') {
                myDynamites++;
            }
        }
        return myDynamites;
    };
    Bot.prototype.detectPreviousMoves = function (gamestate, moves) {
        var previousXMoves = [];
        var totalMoves = gamestate.rounds.length;
        for (var i = totalMoves - moves; i < totalMoves; i++) {
            previousXMoves.push(gamestate.rounds[i].p2);
        }
        return previousXMoves;
    };
    Bot.prototype.detectRepeatingMoves = function (gamestate, moves) {
        var previousXMoves = this.detectPreviousMoves(gamestate, moves);
        var allEqual = function (arr) { return arr.every(function (x) { return x === arr[0]; }); };
        return allEqual(previousXMoves);
    };
    Bot.prototype.counterAttack = function (gamestate, move) {
        switch (move) {
            case 'P': return 'S';
            case 'R': return 'P';
            case 'S': return 'R';
            case 'D': return 'W';
            case 'W': return 'P';
        }
    };
    Bot.prototype.defend = function (gamestate, move) {
        if (move == 'P') {
            return this.randomFromSelectionOfMoves(gamestate, ['P', 'R']);
        }
        else if (move == 'R') {
            return this.randomFromSelectionOfMoves(gamestate, ['S', 'R']);
        }
        else if (move == 'S') {
            return this.randomFromSelectionOfMoves(gamestate, ['P', 'S']);
        }
        else if (move == 'D') {
            return 'W';
        }
        else {
            return this.randomiseMove(gamestate, 3);
        }
    };
    Bot.prototype.randomFromSelectionOfMoves = function (gamestate, selection) {
        var randomNum = Math.floor(Math.random() * selection.length);
        return selection[randomNum];
    };
    return Bot;
}());
module.exports = new Bot();
