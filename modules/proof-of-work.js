var { md5 } = loadModule("module.js")
var sha = loadModule("sha.js")
module.exports.solve = function solve(data,difficulty) {
  var nonce = 0n;
  var hash = " ";
  var date = " ";
  while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
    nonce++
    date = Number(new Date())
    date = String(date)
    // date = date.match(/.{1,1}/g)
    // date.splice(date.length - 3,2)
    // date = date.join("")
    hash = sha.sha512(String(difficulty) + String(nonce) + data)
  }
  return hash + "x" + nonce + "x" + difficulty
}
module.exports.verify = function verify(data,hash) {
  var hashParts = hash.split("x")
  var hash = hashParts[0]
  var nonce = Number(hashParts[1])
  var difficulty = Number(hashParts[2])
  var nulls = " "
  for (var i = 0;i !== Math.abs(difficulty);i++) nulls += "0"
  if (sha.sha512(String(difficulty) + String(nonce) + data) === hash && hash.startsWith(nulls)){
    return true
  } else {
    return false
  }
}
