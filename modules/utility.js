module.exports.ab2str = function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}
module.exports.str2ab = function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
module.exports.fetchArrayBuffer = function fetchArrayBuffer(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        callback(xhr.response);
    };
    xhr.send();
}
module.exports.SmileJSError = function (err, stack = "") {
    var proto = {
        name: "SmileJSError"
        , [Symbol.toStringTag]: "SmileJSError"
        , constructor: module.exports.SmileJSError
    }
    var obj = Object.create(proto)
    obj.error = err.toString()
    obj.stack = stack ? "SmileJSError: " + err + "\n" + stack : "SmileJSError: " + err
    return obj
}
module.exports.buf2hex = function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}
module.exports.randomHex = function randomHex(length){
  if (this.require){
    var crypto1 = require("crypto");
    if (length % 2 !== 0) throw "Should be a multiple of 2."
    var id = crypto1.randomBytes(length / 2).toString('hex');
    return id
  } else {
    if (length % 2 !== 0) throw "Should be a multiple of 2."
    function getRandomId(length) {
        if (!length) {
            return '';
        }
        if (self.crypto){
          var arr = new Uint8Array(length / 2);
          crypto.getRandomValues(arr)
          return loadModule("utility.js").buf2hex(arr.buffer)
        } else {
          return smilejs.randomId(length,"abcdef0987654321")
        }
    }
    return getRandomId(length)
  }
}
if (this.window) {
    if (window.devtoolsFormatters) {
        devtoolsFormatters.push({
            header: function (obj, config) {
                if (!(obj[Symbol.toStringTag] === "SmileJSError")) {
                    return null;
                }
                return ["div", {}, obj.stack]
            }
            , hasBody: function () {
                return false;
            }
        })
    } else {
        window.devtoolsFormatters = []
        devtoolsFormatters.push({
            header: function (obj, config) {
                if (!(obj[Symbol.toStringTag] === "SmileJSError")) {
                    return null;
                }
                return ["div", {}, obj.stack]
            }
            , hasBody: function () {
                return false;
            }
        })
    }
}
