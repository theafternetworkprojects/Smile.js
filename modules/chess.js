var moves = []
var fen = new (loadModule("fen.js"))("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
module.exports.loadFEN = function loadFEN(fenData){
  fen = new (loadModule("fen.js"))(fenData)
}
module.exports.parseBoard = function parseBoard(){
  var ranks = fen.ranks
  const rank = [8,7,6,5,4,3,2,1]
  const rank2 = "abcdefgh".split("")
  var out1 = {}
  var out = " --a-b-c-d-e-f-g-h--\n"
  for (var i = 0; i < ranks.length;i++){
    var data = ranks[i].replace(/-/g, "•").split("")
    out += `${rank[i]}| ${data.join(" ")} |\n`
    for (var i2 = 0; i2 < ranks[i].length;i2++){
      out1[(rank2[i2] + String(rank[i]))] = ranks[i].split("")[i2]
    }
  }
  out += " --a-b-c-d-e-f-g-h--\n uppercase = white\n lowercase = black\n turn = " + fen.turn
  return {
    humanReadable: out,
    object: out1,
    moves: moves
  }
}
module.exports.assembleBoard = function assembleBoard(obj){
  const rank = [8,7,6,5,4,3,2,1]
  const rank2 = "abcdefgh".split("")
  for (var i = 0; i < 8;i++){
    var i3 = ""
    for (var i2 = 0; i2 < 8;i2++){
      i3 += obj[(rank2[i2] + String(rank[i]))]
    }
    fen.ranks[i] = i3
  }
}
module.exports.movePiece = function movePiece(from, target){
  if (moves.length % 3 === 0) moves[moves.length] = `${(moves.length / 3) + 1}.`
  var obj = module.exports.parseBoard().object;
  var i = obj;
  var i2 = obj[from]
  if (i2.toUpperCase() !== i2 && "w" === fen.turn) throw new Error("Invalid move")
  if (i2.toUpperCase() === i2 && "b" === fen.turn) throw new Error("Invalid move")
  if ("•" === i2) throw new Error("Invalid move")
  i[from] = "-"
  var eaten = false;
  if (i[target] !== "-") eaten = i[target];
  i[target] = i2
  module.exports.assembleBoard(i)
  moves[moves.length] = (("P"===i2.toUpperCase() && eaten)?from.charAt(0):"") + ("P"===i2.toUpperCase()?"":i2.toUpperCase()) + (eaten?"x":"") + target
  fen.turn = ("w" === fen.turn?fen.turn = "b":fen.turn = "w")
  return eaten
}
module.exports.setMoves = (move)=>{moves = move}
module.exports.chessNotation = ()=>{
  moves.join(" ")
}
