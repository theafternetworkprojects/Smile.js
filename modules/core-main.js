this.smilejs = {}
if (this.document) loadModule("touchpolyfill.js")
smilejs.blockchain = loadModule("blockchain.js")
if (this.document){
	document.head.innerHTML += "<link href='stylesheet href='https://smileycreations15.com/files/css/external.min.css'>"
}
smilejs.ui = {}
smilejs.paper = loadModule("paper.js")

smilejs.ui.notify = function notify(location = "top-left", type = "plain", dialogContent, black = true) {
			let dialog = document.createElement("div")
			dialog.className = "notify " + location + " do-show font-notify"
			dialog.dataset.notificationStatus = type
			dialog.innerHTML = dialogContent // positions : bottom-right, top-left, top-right, bar-bottom, bar-top, bottom-right, bottom-left
			let blackText = ["success"


				, "notice"


				, "error"


				, "warning"
			] // notification types: success, notice, error, plain, warning, transparent

			if (blackText.includes(type) && black !== false) {
				dialog.style.color = "black"
			}

			document.body.appendChild(dialog)
		}
    smilejs.ui.showLoaderOverlay = function showLoaderOverlay(id, text = null, overlayHtml = false) {
			if (null !== document.getElementById(id)) throw new Error("The element already exists.");
			let div = document.createElement("div")
			let option = "center"

			if (true === overlayHtml) {
				option = "overlay"
			}

			div.className = "overlay"
			div.id = id
			div.style.display = "none"

			if (null === text || undefined === text) {
				div.innerHTML = '<div class="text-' + option + '"></div><div class="progress-slider"><div class="line"></div><div class="progress-subline inc"></div><div class="progress-subline dec"></div></div>'
			} else {
				div.innerHTML = '<div class="text-overlay">' + text + '</div><div class="progress-slider"><div class="line"></div><div class="progress-subline inc"></div><div class="progress-subline dec"></div></div>'
			}

			document.body.appendChild(div)
			var proto = {

				"element": document.getElementById(id),
				"show": function () {
						if (null === document.getElementById(id)) throw new Error("The element could not be found, and may be removed from the DOM.");
						document.getElementById(id)
							.style.display = "block"
					}

					,
				"hide": function () {
						if (null === document.getElementById(id)) throw new Error("The element could not be found, and may be removed from the DOM.");
						document.getElementById(id)
							.style.display = "none"
					}

					,
				"remove": function () {
					if (null === document.getElementById(id)) throw new Error("The element could not be found, and may be removed from the DOM.");
					document.body.removeChild(document.getElementById(id))
				}
			}

			// proto.remove = makeNative(proto.remove, "function remove(){ [native code] }")
			// proto.show = makeNative(proto.show, "function show(){ [native code] }")
			// proto.hide = makeNative(proto.hide, "function hide(){ [native code] }")
			proto[Symbol.toStringTag] = "LoaderOverlay"
			return Object.create(proto)
		}
		smilejs.ui.trapFocus = function trapFocus(elem) {
			var focusIndex = 0;
			const focusable = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex]:not(*[tabindex='-1']), *[contenteditable]";
			if (null !== document.querySelector(":focus")) document.querySelector(":focus").blur();
			if (0 === elem.querySelectorAll(focusable).length) {
				var element = document.createElement("focustrap")
				element.setAttribute("tabindex", "0")
				elem.appendChild(element)
			}
      elem.querySelectorAll(focusable)[0].focus();
			elem.addEventListener("keydown", function (evt) {
				if (evt.which === 9) {
					evt.preventDefault();
					if (evt.shiftKey) {
						if (focusIndex !== 0) {
							focusIndex -= 1
							elem.querySelectorAll(focusable)[focusIndex].focus();
						} else {
              focusIndex = elem.querySelectorAll(focusable).length - 1;
              elem.querySelectorAll(focusable)[focusIndex].focus();
            }
					} else {
						if (focusIndex !== elem.querySelectorAll(focusable).length - 1) {
							focusIndex += 1
							elem.querySelectorAll(focusable)[focusIndex].focus();
						} else {
              focusIndex = 0;
              elem.querySelectorAll(focusable)[focusIndex].focus();
            }
					}
				}
			});
		}
smilejs.randomId = function randomId(length, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
			var result = '';
			var characters = chars;
			var charactersLength = characters.length;
			for (var i = 0; i < length; i++) {
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}
			return result;
		}
    smilejs.ui.modal = function (html) {
      var div = document.createElement("div")
      div.className = "grey-overlay"
      var id = smilejs.randomId(30)
      div.innerHTML = '<div class="modal" id="' + id + '-modal">' + html + '</div>'
      div.id = id
      document.body.appendChild(div)
      div = document.getElementById(id + "-modal")
      smileycreations15_prototype.trapFocus(div)
      return {
        "element": document.getElementById(id),
        "modal": document.getElementById(id + "-modal")
      }
    }
// TODO: INSERT UI CODE HERE
loadModule("2-factor-auth.js")
