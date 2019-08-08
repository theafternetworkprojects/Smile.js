module.exports = async function(){
  var arr = []
  arr.push(navigator.hardwareConcurrency)
  arr.push(navigator.appCodeName)
  arr.push(navigator.appName)
  arr.push(typeof navigator.bluetooth)
  arr.push(typeof navigator.clipboard)
  arr.push(navigator.vendor)
  // arr.push(navigator.language)
  arr.push(navigator.languages.slice().sort())
  arr.push(navigator.platform)
  arr.push(navigator.product)
  arr.push(navigator.productSub)
  arr.push(typeof navigator.usb)
  arr.push(typeof window.indexedDB)
  arr.push(typeof window.localStorage)
  arr.push(typeof window.sessionStorage)
  arr.push(typeof window.localStorage)
  arr.push(typeof window.screen)
  if (window.screen){
    arr.push(screen.colorDepth)
    arr.push(screen.pixelDepth)
    arr.push(screen.width)
    arr.push(screen.height)
  }
  arr.push(typeof RTCError)
  arr.push(typeof WebSocket)
  return loadModule("sha.js").sha512(JSON.stringify(arr))
}
