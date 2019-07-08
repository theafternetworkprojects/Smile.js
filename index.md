# Smile.js
A UI library.

## Examples:
Radio buttons (`span.radio`):
<span class="radio ripple" tabindex="0"></span>

Buttons (`.button`):
<span class="ripple transparent-button button">Button</span>

Fabs (`.fab, .fab > svg`):<br>
<div class="fab ripple">
<svg viewBox="0 0 24 24">
<path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
</svg>
</div>

Icon buttons (`.icon, .icon > svg`):<br>
<div class="icon ripple">
<svg viewBox="0 0 24 24">
<path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path>
</svg>
</div>

Ripples (`.ripple`):
<div style="display:flex;height:100px;width:100%;background-color:white;border:2px solid black;" class="ripple"></div>
<script src="/Smile.js/smile.js"></script><script>smilejs.paper.initRipple();smilejs.paper.rippleColor = "rgba(0,0,0,.25)"</script>
<!-- Start of Async Drift Code -->
<script>
"use strict";

!function() {
  var t = window.driftt = window.drift = window.driftt || [];
  if (!t.init) {
    if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
    t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
    t.factory = function(e) {
      return function() {
        var n = Array.prototype.slice.call(arguments);
        return n.unshift(e), t.push(n), t;
      };
    }, t.methods.forEach(function(e) {
      t[e] = t.factory(e);
    }), t.load = function(t) {
      var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
      o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
      var i = document.getElementsByTagName("script")[0];
      i.parentNode.insertBefore(o, i);
    };
  }
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('ee4f6gr6thcw');
</script>
<!-- End of Async Drift Code -->
