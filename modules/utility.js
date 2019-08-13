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
