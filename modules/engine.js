var game = loadModule("chess.js")()
var positionCount, i = 0;
var minimaxRoot =function(depth, game, isMaximisingPlayer) {
    var i = 0;
    var newGameMoves = game.moves();
    var bestMove = isMaximisingPlayer?-9999:9999;
    var bestMoveFound;
    while (i < newGameMoves.length) {
        game.move(newGameMoves[i]);
        if (game.in_threefold_repetition()){
          game.undo()
        } else {
          // var newGameMove = newGameMoves[i]
          var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
          game.undo();
          if(value >= bestMove) {
              bestMove = value;
              bestMoveFound = newGameMoves[i];
          }
        }
        i++
    }
    if (bestMoveFound === undefined){
      i = 0;
      while (i < newGameMoves.length) {
          // var newGameMove = newGameMoves[i]
          game.move(newGameMoves[i]);
          var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
          game.undo();
          if(value >= bestMove) {
              bestMove = value;
              bestMoveFound = newGameMoves[i];
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
    var i = 0;
    if (isMaximisingPlayer) {
        var bestMove = -9999;
        while (i < newGameMoves.length) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                beta = bestMove
                return bestMove;
            }
            if (alpha < beta) {
                // beta = alpha;
                return beta
            }
            i++
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        while (i < newGameMoves.length) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta >= alpha) {
                alpha = bestMove
                return bestMove;
            }
            if (alpha > beta) {
                return alpha
            }
            i++
        }
        return bestMove;
    }
};

var evaluateBoard = function (board) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
        }
    }
    return totalEvaluation;
};


var reverseArray = function(array) {
return array.slice().reverse();
};

var pawnEvalWhite =
[
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
    [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
    [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
    [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
    [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
    [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
[
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
    [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
    [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
    [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
    [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
    [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
];

var bishopEvalWhite = [
[ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
[ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
[ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
[ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
[ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
[ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
[ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
[ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
[  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
[  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen =
[
[ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
[ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
[ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
[ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
[  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
[ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
[ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
[ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
[ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
[ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
[  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
[  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);




var getPieceValue = function (piece, x, y) {
if (piece === null) {
    return 0;
}
var getAbsoluteValue = function (piece, isWhite, x ,y) {
    if (piece.type === 'p') {
        return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
    } else if (piece.type === 'r') {
        return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
    } else if (piece.type === 'n') {
        return 30 + knightEval[y][x];
    } else if (piece.type === 'b') {
        return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
    } else if (piece.type === 'q') {
        return 90 + evalQueen[y][x];
    } else if (piece.type === 'k') {
        return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
    }
    throw "Unknown piece type: " + piece.type;
};

  var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
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
