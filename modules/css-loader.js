document.head.innerHTML += `<style>
paper {
}
.button, paper-button {
  position: relative;
  overflow: hidden;
  outline: none;
  border: none;
  background: #000;
  color: #fff;
  border-radius: 2px;
  padding: 8px 16px;
  font-size: 14px;
  font-family: inherit;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: 0.2s;
}
.button:hover, paper-button:hover {
  cursor: pointer;
}

.transparent-button {
  background: none;
  color: #000;
  box-shadow: none;
}
paper-ripple, paper-ripple-inner {
	display:block;
}
paper-ripple-inner {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    transition: opacity 640ms ease 0s, transform 640ms ease 0s;
}
paper-ripple {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    overflow: hidden;
    border-radius: inherit;
    transform: perspective(0px);
}
.ripple {
  overflow:hidden;
  position:relative;
}
.radio {
  border-radius:50%;
  background-color: white;
  height:10px;
  width:10px;
  display: flex;
  border-radius: 50%;
  background-color: grey;
  height: 15px;
  width: 15px;
}
.radio[checked]::after {
  content: "";
  height: 5px;
  width:5px;
  border-radius:50%;
  background-color: white;
  position:relative;
  left:5px;
  align-self:center;
}
</style>`
// if (document.readyState === "completed"){
// 	document.body.innerHTML = "<paper>" + document.body.innerHTML + "</paper>"
// } else {
// 	onload = ()=>{document.body.innerHTML = "<paper>" + document.body.innerHTML + "</paper>"}
// }
