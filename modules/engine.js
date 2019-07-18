var game = loadModule("chess.js")()
var positionCount, i = 0;

var minimaxRoot =function(depth, game, isMaximisingPlayer) {
    var i = 0;
    var newGameMoves = game.moves();
    var bestMove = -9999;
    var bestMoveFound;
    while (i < newGameMoves.length) {
      game.move(newGameMoves[i])
      if (game.in_threefold_repetition()){
        game.undo()
      } else {
        game.undo()
        var newGameMove = newGameMoves[i]
        game.move(newGameMove);
        var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
      }
      i++
    }
    if (bestMoveFound === undefined){
      while (i < newGameMoves.length) {
        var newGameMove = newGameMoves[i]
        game.move(newGameMove);
        var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
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
        var i = 0;
        var bestMove = -9999;
        while (i < newGameMoves.length) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
            i++
        }
        return bestMove;
    } else {
        var i = 0;
        var bestMove = 9999;
        while (i < newGameMoves.length) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
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
    var j = 0, i = 0;
    while (i < 8){
        while (j < 8){
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
            j++
        }
        i++
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
var getAbsoluteValue = function (piece, isWhite, x ,y) {
    switch (piece.type){
      // case "p": return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
      // case "r": return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
      // case "n": return 30 + knightEval[y][x];
      // case "b": return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
      // case "q": return 90 + evalQueen[y][x];
      // case "k": return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
      case "p": return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
      case "r": return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
      case "n": return 30 + knightEval[y][x];
      case "b": return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
      case "q": return 90 + evalQueen[y][x];
      case "k": return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
      default: return 0
    }
    throw "Unknown piece type: " + piece.type;
};
switch (piece){
  case null: return 0;
}
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
