module.exports = function devToolsOpen(){
	const threshold = 160;
	var val = {open:false,vertical:false,horizontal:false}
    if (window.outerWidth - window.innerWidth > threshold){
		val.open = true
		val.vertical = true
	}
	if (window.outerHeight - window.innerHeight > threshold){
		val.open = true
		val.horizontal = true
	}
	return val
}
