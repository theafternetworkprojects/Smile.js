var game = loadModule("chess.js")()
var positionCount, i = 0;

var minimaxRoot =function(depth, game, isMaximisingPlayer) {
    var i = 0;
    // //debug:
    // var d = new Date().getTime();
    // //enddebug:
    var alpha = -Infinity, beta = Infinity
    var newGameMoves = game.moves();
    var bestMove = -Infinity
    var bestMoveFound;
    while (i < newGameMoves.length) {
        game.move(newGameMoves[i]);
        if (game.in_threefold_repetition()){
          game.undo()
        } else {
          // var newGameMove = newGameMoves[i]
          var value = minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer, newGameMoves[i]);
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
          var value = minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer, newGameMoves[i]);
          game.undo();
          if((isMaximisingPlayer && value >= bestMove) || (!isMaximisingPlayer && value <= bestMove)) {
              bestMove = value;
              bestMoveFound = newGameMoves[i];
          }
          i++
      }
    }
    // //debug:
    // var d2 = new Date().getTime();
    // console.log(` time ${d2 - d}`)
    // //enddebug:
    return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer, tree) {
    positionCount++;
    // //debug:
    // process.stdout.write(`\r${positionCount} nodes depth ${depth}`)
    // //enddebug:
    if (depth === 0) {
        return isMaximisingPlayer?evaluateBoard(game.board()):-evaluateBoard(game.board());
    }

    var newGameMoves = game.moves();
    var i = 0;
    if (isMaximisingPlayer) {
        var bestMove = -Infinity;
        while (i < newGameMoves.length) {
            game.move(newGameMoves[i]);
            // //debug:
            // process.stdout.write(`\r\x1b[2K${positionCount} nodes depth ${depth} move ${tree + " " + newGameMoves[i]}`)
            // //enddebug:
            var value = minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer, tree + " " + newGameMoves[i])
            bestMove = Math.max(bestMove, value);
            alpha = Math.max(alpha, bestMove);
            var gameover = game.game_over()
            var mate = game.in_checkmate()
            game.undo();

            alpha = Math.max(alpha, bestMove);
            if (mate){
              bestMove += alpha
            }
            if (beta <= alpha) {
                // return alpha;
                break
            }
            if (gameover && !mate) continue;
            i++
        }
        return bestMove;
    } else {
        var bestMove = Infinity;
        while (i < newGameMoves.length) {
            game.move(newGameMoves[i]);
            // //debug:
            // process.stdout.write(`\r\x1b[2K${positionCount} nodes depth ${depth} move ${tree + " " + newGameMoves[i]}`)
            // //enddebug:
            var value = minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer, tree + " " + newGameMoves[i])
            bestMove = Math.min(bestMove, value);
            beta = Math.min(alpha, bestMove);
            var gameover = game.game_over()
            var mate = game.in_checkmate()
            game.undo();
            if (mate){
              bestMove += beta
            }
            if (beta <= alpha) {
                // return beta;
                break
            }
            if (gameover && !mate) continue;
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
    switch (piece.type){
      case "p":return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
      case "r":return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
      case "n":return 30 + knightEval[y][x];
      case "b":return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
      case "q":return 90 + evalQueen[y][x];
      case "k":return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
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
