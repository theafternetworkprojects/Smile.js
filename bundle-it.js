'use strict';
/** @type {!Array} */
var bundles = [];
const fs = require("fs");
const {
  execSync : execSync
} = require("child_process");
/**
 * @param {string} value
 * @return {?}
 */
function addslashes(value) {
  return (value + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
}
bundles[0] = "(function(){", bundles[1] = "var moduleCache = {};var assets = {}", fs.readdir("./modules/", (canCreateDiscussions, badgeArray) => {
  (badgeArray || []).forEach((v) => {
    /** @type {string} */
    console.log("Adding source file:", v)
    bundles[bundles.length] = `moduleCache["${addslashes(v)}"] = '${addslashes(fs.readFileSync("./modules/" + v) + "\n//# sourceURL=smileycreations15://smilejs/modules/" + v)}';`;
  });
  fs.readdir("./assets/", (canCreateDiscussions, badgeArray1) => {
    (badgeArray1 || []).forEach((v1) => {
      /** @type {string} */
      console.log("Adding asset:", v1)
      bundles[bundles.length] = `assets["${addslashes(v1)}"] = '${addslashes(fs.readFileSync("./assets/" + v1))}';`;
      /** @type {string} */
      bundles[bundles.length] = "function loadModule(module1){\n    var moduleSrc = moduleCache[module1];\n  var module = {exports:{}}\n  eval(moduleSrc);\n  return module.exports\n};function loadAsset(module1){\n    return assets[module1];};";
      console.log("Adding source file:", "index.js")
      bundles[bundles.length] = `eval('${addslashes(fs.readFileSync("index.js").toString() + "\n//# sourceURL=smileycreations15://smilejs/index.js")}');`;
      /** @type {string} */
      bundles[bundles.length] = "})();";
      /** @type {string} */
      bundles[bundles.length] = "//# sourceURL=smileycreations15://smilejs/raw/bundle.js";
      fs.writeFileSync("out.js", bundles.join("\n"));
      console.log("Minifying")
      execSync("uglifyjs -o out.min.js out.js");
    });
    });
});
