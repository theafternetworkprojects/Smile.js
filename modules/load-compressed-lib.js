function fetchArrayBuffer(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', url);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function() {
		callback(xhr.response);
	};
	xhr.send();
}
module.exports = (url)=>{
	fetchArrayBuffer(url,(e)=>{
		eval(loadModule("compress.js").decompressFromUint8Array(Uint8Array(e)))
	})
}
