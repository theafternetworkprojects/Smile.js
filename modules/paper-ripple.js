let current;

window.ontouchstart?document.addEventListener("touchstart",(event)=>{
        if (current) {
        const remove = current;
        current = null;
        setTimeout(function () {
            if (remove.parentNode) remove.parentNode.removeChild(remove);
        }, 800);
    }

    let target = event.target;
    while (target && target.classList && !target.classList.contains("ripple")) target = target.parentNode;
    if (!target || !target.classList || !target.classList.contains("ripple")) return;
    if (event.originalEvent.touches.length > 1) return;
    const x = event.originalEvent.touches[0].x - target.getBoundingClientRect().left;
    const y = event.originalEvent.touches[0].y - target.getBoundingClientRect().top;
    const maxW = Math.max(x, target.offsetWidth - x);
    const maxH = Math.max(y, target.offsetHeight - y);
    const size = Math.sqrt(maxW * maxW + maxH * maxH);

    const parent = document.createElement("paper-ripple");
    target.appendChild(parent);

    const effect = document.createElement("paper-ripple-inner");
    effect.style.top = (y - size) + "px";
    effect.style.left = (x - size) + "px";
    effect.style.height = size * 2 + "px";
    effect.style.width = size * 2 + "px";
    effect.style.background = target.getAttribute("ripple-color") || globalThis.smilejs.paper.rippleColor;
    parent.appendChild(effect);

    current = parent;

    const timeout = setTimeout(function () {
        effect.style.transform = "scale(1)";
    }, 16);

    document.ontouchend = document.ontouchcancel = function () {
        document.ontouchend  = document.ontouchmove = null;
        current.firstChild.style.opacity = "0";
    };

    document.ontouchmove = function (move) {
        if (event.originalEvent.touches[0].x - move.originalEvent.touches[0].x > 4 || event.originalEvent.touches[0].x - move.originalEvent.touches[0].x < -4 || event.originalEvent.touches[0].y - move.originalEvent.touches[0].y > 4 || event.originalEvent.touches[0].y - move.originalEvent.touches[0].y < -4) {
            clearTimeout(timeout);
            document.ontouchcancel()
        }
    };
}):document.addEventListener("mousedown",function (event) {
    if (current) {
        const remove = current;
        current = null;
        setTimeout(function () {
            if (remove.parentNode) remove.parentNode.removeChild(remove);
        }, 800);
    }

    let target = event.target;
    while (target && target.classList && !target.classList.contains("ripple")) target = target.parentNode;
    if (!target || !target.classList || !target.classList.contains("ripple")) return;

    const x = event.x - target.getBoundingClientRect().left;
    const y = event.y - target.getBoundingClientRect().top;
    const maxW = Math.max(x, target.offsetWidth - x);
    const maxH = Math.max(y, target.offsetHeight - y);
    const size = Math.sqrt(maxW * maxW + maxH * maxH);

    const parent = document.createElement("paper-ripple");
    target.appendChild(parent);

    const effect = document.createElement("paper-ripple-inner");
    effect.style.top = (y - size) + "px";
    effect.style.left = (x - size) + "px";
    effect.style.height = size * 2 + "px";
    effect.style.width = size * 2 + "px";
    effect.style.background = target.getAttribute("ripple-color") || globalThis.smilejs.paper.rippleColor;
    parent.appendChild(effect);

    current = parent;

    const timeout = setTimeout(function () {
        effect.style.transform = "scale(1)";
    }, 16);

    document.onpointerup = document.onpointercancel = function () {
        document.onpointerup = document.onpointercancel = document.onpointermove = null;
        current.firstChild.style.opacity = "0";
    };

    document.onpointermove = function (move) {
        if (event.x - move.x > 4 || event.x - move.x < -4 || event.y - move.y > 4 || event.y - move.y < -4) {
            clearTimeout(timeout);
            document.onpointercancel();
        }
    };
});
document.ontouchstart = null;
document.ontouchend = null;
document.ontouchmove = null;
document.ontouchcancel = null;
window.ontouchstart = null;
window.ontouchend = null;
window.ontouchmove = null;
window.ontouchcancel = null;
