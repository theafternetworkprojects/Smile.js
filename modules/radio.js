document.addEventListener("click",event=>{
  let target = event.target;
  while (target && target.classList && !target.classList.contains("radio")) target = target.parentNode;
  if (!target || !target.classList || !target.classList.contains("radio")) return;
  var e = new Event("radiostatechange")
  target.dispatchEvent(e)
  if (e.defaultPrevented) return;
  if (target.hasAttribute("checked")){
    target.removeAttribute("checked")
  } else {
    target.setAttribute("checked","")
  }
})
