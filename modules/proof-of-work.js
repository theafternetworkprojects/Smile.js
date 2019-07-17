/*
BSD 3-Clause License

Copyright (c) 2019, smileycreations15 (me@smileycreations15.com)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
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
  var nulls = ""
  for (var i = 0;i !== Math.abs(difficulty);i++) nulls += "0"
  if (sha.sha512(String(difficulty) + String(nonce) + data) === hash && hash.startsWith(nulls)){
    return true
  } else {
    return false
  }
}
