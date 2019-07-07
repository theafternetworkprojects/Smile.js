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
bundles[0] = "(function(){", bundles[1] = "var moduleCache = {};", fs.readdir("./modules/", (canCreateDiscussions, badgeArray) => {
  (badgeArray || []).forEach((v) => {
    /** @type {string} */
    bundles[bundles.length] = `moduleCache["${addslashes(v)}"] = '${addslashes(fs.readFileSync("./modules/" + v) + "\n//# sourceURL=smileycreations15://bundle/modules/" + v)}';`;
  });
  /** @type {string} */
  bundles[bundles.length] = "function loadModule(module1){\n    var moduleSrc = moduleCache[module1];\n  var module = {exports:{}}\n  eval(moduleSrc);\n  return module.exports\n}";
  bundles[bundles.length] = `eval('${addslashes(fs.readFileSync("index.js").toString() + "\n//# sourceURL=smileycreations15://bundle/index.js")}');`;
  /** @type {string} */
  bundles[bundles.length] = "})();";
  /** @type {string} */
  bundles[bundles.length] = "//# sourceURL=smileycreations15://bundle/raw/bundle.js";
  fs.writeFileSync("out.js", bundles.join("\n"));
  execSync("uglifyjs -o out.min.js out.js");
  execSync("echo >> out.min.js;echo '//# sourceURL=smileycreations15://bundle/raw/bundle.js' >> out.min.js");
});
