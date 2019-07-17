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
// 2 factor auth
function makeid(length) {
   var result           = "";
   var characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
function encode(string) {
    var number = "0x";
    var length = string.length;
    for (var i = 0; i < length; i++){ number += string.charCodeAt(i).toString(16);};
    return number;
}
function decode(number) {
    var string = "";
    number = number.slice(2);
    var length = number.length;
    for (var i = 0; i < length;) {
        var code = number.slice(i, i += 2);
        string += String.fromCharCode(parseInt(code, 16));
    }
    return string;
}
smilejs.sha = loadModule("sha.js");
smilejs.genToken = function(secret, validity,length = 6){
	var encoded = BigInt(encode(secret));
	var time = BigInt(Math.floor(new Date().getTime() / validity));
	var secretOut = [secret,time,encoded,encoded * time];
	var hashedSecret = smilejs.sha.sha512(secretOut.join(""));
	var hashes = hashedSecret.match(/.{2,2}/g);
	var hashOut = 0;
	for (var i = 0;i !== hashes.length;i++){
		hashOut += Number("0x" + hashes[i]);
	}
	var a = String(hashOut * Math.floor(new Date().getTime() / validity)).split("");
	a.splice(0,1 + ((a.length - 1) - length));
	return a.join("");
}
