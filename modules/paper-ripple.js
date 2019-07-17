/*
BSD 3-Clause License

Copyright (c) 2019, smileycreations15 (me@smileycreations15.com)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
if (this.window){
  let current;
  function is_touch_device() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function(query) {
      return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  }

  is_touch_device()?document.addEventListener("touchstart",(event)=>{
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
      if (event.targetTouches.length > 1) return;
      const x = event.targetTouches[0].clientX - target.getBoundingClientRect().left;
      const y = event.targetTouches[0].clientY - target.getBoundingClientRect().top;
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
      effect.style.background = target.getAttribute("ripple-color") || window.smilejs.paper.rippleColor;
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
          if (event.targetTouches[0].clientX - move.targetTouches[0].clientX > 4 || event.targetTouches[0].clientX - move.targetTouches[0].clientX < -4 || event.targetTouches[0].clientX - move.targetTouches[0].clientY > 4 || event.targetTouches[0].clientY - move.targetTouches[0].clientY < -4) {
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

      const x = event.clientX - target.getBoundingClientRect().left;
      const y = event.clientY - target.getBoundingClientRect().top;
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
      effect.style.background = target.getAttribute("ripple-color") || window.smilejs.paper.rippleColor;
      parent.appendChild(effect);

      current = parent;

      const timeout = setTimeout(function () {
          effect.style.transform = "scale(1)";
      }, 16);

      document.onpointerup = document.onpointercancel = document.onmouseup = function () {
          document.onpointerup = document.onpointercancel = document.onpointermove = document.onmousemove = document.onmouseup = null;
          current.firstChild.style.opacity = "0";
      };

      document.onpointermove = function (move) {
          if (event.clientX - move.x > 4 || event.clientX - move.x < -4 || event.clientY - move.y > 4 || event.clientY - move.y < -4) {
              clearTimeout(timeout);
              document.onpointercancel();
          }
      };
      document.onmousemove = function (move) {
          if (event.clientX - move.x > 4 || event.clientX - move.x < -4 || event.clientY - move.y > 4 || event.clientY - move.y < -4) {
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

}
