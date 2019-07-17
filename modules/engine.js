var game = loadModule("chess.js")()
var positionCount, i = 0;

var minimaxRoot = function(depth, game, isMaximisingPlayer) {

    var newGameMoves = game.moves();
    var bestMove = -9999999;
    var bestMoveFound;
    var i = 0;
    while (i < newGameMoves.length) {
        var newGameMove = newGameMoves[i]
        game.move(newGameMove);
        if (game.in_threefold_repetition()) {
          game.undo();
          i++
        } else {
          game.undo();
          game.move(newGameMove);
          var value = minimax(depth - 1, game, -10000000, 10000000, !isMaximisingPlayer);
          game.undo();
          if(value >= bestMove) {
              bestMove = value;
              bestMoveFound = newGameMove;
          }
          i++
        }
    }
    if (bestMoveFound === undefined){
      var i = 0;
      while (i < newGameMoves.length) {
          var newGameMove = newGameMoves[i]
            game.move(newGameMove);
            var value = minimax(depth - 1, game, -10000000, 10000000, !isMaximisingPlayer);
            game.undo();
            if(value >= bestMove) {
                bestMove = value;
                bestMoveFound = newGameMove;
            }
            i++
      }
    }
    return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++;
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }

    var newGameMoves = game.moves();

    if (isMaximisingPlayer) {
        var bestMove = -9999999;
        while (i < newGameMoves.length){
          game.move(newGameMoves[i]);
          bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
          game.undo();
          alpha = Math.max(beta, bestMove);
          if (beta <= alpha) {
              return bestMove;
          }
          i++
        }
        return bestMove;
    } else {
        var bestMove = 9999999;
        while (i < newGameMoves.length){
          game.move(newGameMoves[i]);
          bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
          game.undo();
          beta = Math.min(alpha, bestMove);
          if (beta <= alpha) {
              return bestMove;
          }
          i++
        }
        return bestMove;
    }
};

var evaluateBoard = function (board) {
    var totalEvaluation = 0;
    var i = 0, j = 0;
    while (i < 8){
      while (j < 8){
        totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
        j++
      }
      i++
    }
    return totalEvaluation;
};
var getPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece) {
        switch (piece.type){
          case "p": return 7500
          case "r": return 50000
          case "n": return 35000
          case "b": return 37500
          case "q": return 90000
          case "k": return 900000

        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};
var getBestMove = function (game,depth) {
    if (game.game_over()) {
        throw new Error("Game over")
    }

    positionCount = 0;
    var depth = depth;

    var d = new Date().getTime();
    var bestMove = minimaxRoot(depth, game, true);
    var d2 = new Date().getTime();
    var moveTime = (d2 - d);
    var positionsPerS = ( positionCount * 1000 / moveTime);
    return {bestMove, positionsPerS, positionCount};
};
var generateBestMove = function (depth, move = false) {
    var bestMove = getBestMove(game, depth);
    if (move) game.move(bestMove.bestMove);
    return bestMove
};
var updateBoard = function (fen){
  game.load(fen)
}
var updateBoardPGN = function (fen){
  game.load_pgn(fen)
}
var move = (data)=>{
  game.move(data)
}
var getBoard = ()=>{return game}
module.exports = {
  getBoard,
  generateBestMove,
  updateBoard,
  updateBoardPGN,
  move
}
