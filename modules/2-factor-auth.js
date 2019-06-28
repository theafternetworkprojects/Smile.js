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
