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
/*! normalize.css v3.0.2 | MIT License | git.io/normalize */
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden],
template {
  display: none;
}
a {
  background-color: transparent;
}
a:active,
a:hover {
  outline: 0;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: bold;
}
dfn {
  font-style: italic;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
mark {
  background: #ff0;
  color: #000;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 1em 40px;
}
hr {
  box-sizing: content-box;
  height: 0;
}
pre {
  overflow: auto;
}
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}
button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: textfield;
  box-sizing: content-box;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
legend {
  border: 0;
  padding: 0;
}
textarea {
  overflow: auto;
}
optgroup {
  font-weight: bold;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
}
.input {
  position: relative;
  margin-bottom: 15px;
}
.input label {
  color: #555555;
  font-family: 'Helvetica Neue';
  font-weight: 400;
  cursor: text;
  -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
          transform: translate(0, 0);
  -webkit-font-smoothing: antialiased;
}
.input .help-block {
  font-family: 'Helvetica Neue';
  font-size: 75%;
  margin-top: 3px;
  color: #999999;
  -webkit-font-smoothing: antialiased;
}
.input input[type='text'],
.input input[type='email'],
.input input[type='password'],
.input textarea {
  width: 100%;
  border: 0;
  border-bottom: 1px solid #cccccc;
  margin: 1.25em 0 0 0;
  border-radius: 0;
  padding: 0;
  font-family: 'Helvetica Neue';
  resize: none;
  color: #555555;
}
.input input[type='text']::-webkit-input-placeholder,
.input input[type='email']::-webkit-input-placeholder,
.input input[type='password']::-webkit-input-placeholder,
.input textarea::-webkit-input-placeholder {
  font: normal 300 100% 'Helvetica Neue';
  color: #ffffff;
}
.input input[type='text']:-moz-placeholder,
.input input[type='email']:-moz-placeholder,
.input input[type='password']:-moz-placeholder,
.input textarea:-moz-placeholder {
  font: normal 300 100% 'Helvetica Neue';
  color: #ffffff;
}
.input input[type='text']::-moz-placeholder,
.input input[type='email']::-moz-placeholder,
.input input[type='password']::-moz-placeholder,
.input textarea::-moz-placeholder {
  font: normal 300 100% 'Helvetica Neue';
  color: #ffffff;
}
.input input[type='text']:-ms-input-placeholder,
.input input[type='email']:-ms-input-placeholder,
.input input[type='password']:-ms-input-placeholder,
.input textarea:-ms-input-placeholder {
  font: normal 300 100% 'Helvetica Neue';
  color: #ffffff;
}
.input input[type='text']:-webkit-autofill,
.input input[type='email']:-webkit-autofill,
.input input[type='password']:-webkit-autofill,
.input textarea:-webkit-autofill {
  box-shadow: 0 0 0 1000px white inset;
}
.input input[type='text']:focus,
.input input[type='email']:focus,
.input input[type='password']:focus,
.input textarea:focus {
  outline: none;
  box-shadow: 0 1px 0 #66afe9;
  border-color: #66afe9;
  background: #ffffff;
}
.input input[type='text']:focus::-webkit-input-placeholder,
.input input[type='email']:focus::-webkit-input-placeholder,
.input input[type='password']:focus::-webkit-input-placeholder,
.input textarea:focus::-webkit-input-placeholder {
  font: normal 300 100% 'Helvetica Neue' !important;
  color: #999999 !important;
}
.input input[type='text']:focus:-moz-placeholder,
.input input[type='email']:focus:-moz-placeholder,
.input input[type='password']:focus:-moz-placeholder,
.input textarea:focus:-moz-placeholder {
  font: normal 300 100% 'Helvetica Neue' !important;
  color: #999999 !important;
}
.input input[type='text']:focus::-moz-placeholder,
.input input[type='email']:focus::-moz-placeholder,
.input input[type='password']:focus::-moz-placeholder,
.input textarea:focus::-moz-placeholder {
  font: normal 300 100% 'Helvetica Neue' !important;
  color: #999999 !important;
}
.input input[type='text']:focus:-ms-input-placeholder,
.input input[type='email']:focus:-ms-input-placeholder,
.input input[type='password']:focus:-ms-input-placeholder,
.input textarea:focus:-ms-input-placeholder {
  font: normal 300 100% 'Helvetica Neue' !important;
  color: #999999 !important;
}
.input input[type='text']:focus + label,
.input input[type='email']:focus + label,
.input input[type='password']:focus + label,
.input textarea:focus + label,
.input input[type='text'][value] + label,
.input input[type='email'][value] + label,
.input input[type='password'][value] + label,
.input textarea[value] + label {
  -webkit-transform: translate(-12.5%, -1.5em) scale(0.75, 0.75) !important;
      -ms-transform: translate(-12.5%, -1.5em) scale(0.75, 0.75) !important;
          transform: translate(-12.5%, -1.5em) scale(0.75, 0.75) !important;
}
.input input[type='text']:-webkit-autofill + label,
.input input[type='email']:-webkit-autofill + label,
.input input[type='password']:-webkit-autofill + label,
.input textarea:-webkit-autofill + label {
  -webkit-transform: translate(-12.5%, -1.5em) scale(0.75, 0.75);
          transform: translate(-12.5%, -1.5em) scale(0.75, 0.75);
}
.input input[type='text'][disabled],
.input input[type='email'][disabled],
.input input[type='password'][disabled],
.input textarea[disabled] {
  color: #cccccc;
  background-color: #ffffff;
  border-style: dashed;
}
.input input[type='text'][disabled] + label,
.input input[type='email'][disabled] + label,
.input input[type='password'][disabled] + label,
.input textarea[disabled] + label {
  color: #cccccc;
}
.input input[type='text'] + label,
.input input[type='email'] + label,
.input input[type='password'] + label,
.input textarea + label {
  width: 100%;
  position: absolute;
  left: 0;
  top: 1.25em;
  margin-bottom: 2px;
  -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
}
.input input[type='text'].error,
.input input[type='email'].error,
.input input[type='password'].error,
.input textarea.error {
  border-color: #a94442;
  box-shadow: 0 1px 0 #a94442;
}
.input input[type='text'].error ~ .help-block,
.input input[type='email'].error ~ .help-block,
.input input[type='password'].error ~ .help-block,
.input textarea.error ~ .help-block {
  color: #a94442;
}
.input textarea:focus + label,
.input textarea[value] + label {
  top: 1.25em;
}
.input textarea + label {
  margin-bottom: 5px;
  -webkit-transform: translate(-12.5%, -1.5em) scale(0.75, 0.75);
      -ms-transform: translate(-12.5%, -1.5em) scale(0.75, 0.75);
          transform: translate(-12.5%, -1.5em) scale(0.75, 0.75);
}
.input textarea:empty + label {
  -webkit-transform: translate(0, 0) scale(1, 1);
      -ms-transform: translate(0, 0) scale(1, 1);
          transform: translate(0, 0) scale(1, 1);
}
.input input[type='checkbox'] {
  position: absolute;
  opacity: 0;
}
.input input[type='checkbox'] + label {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  cursor: pointer;
  padding-left: 30px;
}
.input input[type='checkbox'] + label:before {
  position: absolute;
  left: 0;
  display: block;
  content: "";
  border: 2px solid #666666;
  height: 20px;
  width: 20px;
  border-radius: 2px;
  background: #ffffff;
  -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
  box-sizing: border-box;
}
.input input[type='checkbox'] + label:after {
  position: absolute;
  display: block;
  content: "";
  bottom: 5px;
  left: 7px;
  width: 6px;
  height: 13px;
  -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
          transform: rotate(45deg);
  opacity: 0;
  -webkit-transition: opacity 0.3s ease;
          transition: opacity 0.3s ease;
  -webkit-transition-delay: 0.1s;
          transition-delay: 0.1s;
  box-sizing: border-box;
}
.input input[type='checkbox']:focus + label:before {
  box-shadow: 0 0 5px #5cb85c;
}
.input input[type='checkbox']:checked + label:before {
  background: #5cb85c;
  border-color: #5cb85c;
}
.input input[type='checkbox']:checked + label:after {
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  opacity: 1;
}
.input input[type='checkbox'][disabled] + label {
  color: #cccccc;
}
.input input[type='checkbox'][disabled] + label:before {
  border-color: #cccccc;
}
.input input[type='checkbox'][disabled]:checked + label:before {
  background: #cccccc;
}
.input input[type='radio'] {
  position: absolute;
  opacity: 0;
}
.input input[type='radio'] + label {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  cursor: pointer;
  padding-left: 30px;
}
.input input[type='radio'] + label:before,
.input input[type='radio'] + label:after {
  position: absolute;
  left: 3px;
  bottom: 3px;
  display: block;
  content: "";
  border: 2px solid #666666;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #ffffff;
  -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
  background-clip: padding-box;
}
.input input[type='radio'] + label:after {
  background: #5bc0de;
  border: 2px solid #ffffff;
  -webkit-transform: scale(0);
      -ms-transform: scale(0);
          transform: scale(0);
  -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
}
.input input[type='radio']:focus + label:before {
  box-shadow: 0 0 5px #5bc0de;
}
.input input[type='radio']:checked + label:before {
  border-color: #5bc0de;
}
.input input[type='radio']:checked + label:after {
  -webkit-transform: scale(0.75, 0.75);
      -ms-transform: scale(0.75, 0.75);
          transform: scale(0.75, 0.75);
}
.input input[type='radio'][disabled] + label {
  color: #cccccc;
}
.input input[type='radio'][disabled] + label:before {
  border-color: #cccccc;
}
.input input[type='radio'][disabled]:checked + label:before,
.input input[type='radio'][disabled]:checked + label:after {
  background: #cccccc;
}
.input.select {
  width: 100%;
  overflow: hidden;
}
.input.select:after {
  bottom: 1px;
  right: 5px;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-top-color: #cccccc;
  border-width: 5px;
  margin-top: -2px;
  z-index: 100;
}
.input.select label {
  position: absolute;
  font-size: 75%;
  left: 0;
  top: 0;
}
.input.select select {
  padding: 1.5em 0 1px 0;
  color: #555555;
  font-family: 'Helvetica Neue';
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  width: 108%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #cccccc;
  box-shadow: none;
  background-color: transparent;
  background-image: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.input.select select:focus {
  padding-bottom: 0px;
  border-bottom: 2px solid #66afe9;
  outline: none;
}
.input.select select[disabled] {
  color: #cccccc;
  background-color: #ffffff;
  border-bottom: 1px dashed #cccccc;
}
.input.select select[disabled] + label {
  color: #cccccc;
}
.input.select select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}
</style>`
// if (document.readyState === "completed"){
// 	document.body.innerHTML = "<paper>" + document.body.innerHTML + "</paper>"
// } else {
// 	onload = ()=>{document.body.innerHTML = "<paper>" + document.body.innerHTML + "</paper>"}
// }
