var readFileSync = require('fs').readFileSync;
var path = require('path');

var hmrScript = readFileSync(__dirname + '/hmr.js');
var loaderUtils = require("loader-utils");

require("./src/styles.scss")
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Flux Xu @fluxxu
*/
module.exports = function(content) {
  this.cacheable && this.cacheable();
  var callback = this.async();

  if (!callback) {
    throw 'elm-hot-loader currently only supports async mode.'
  }

  var input = loaderUtils.getRemainingRequest(this);
  process.nextTick(function() {
    callback(null, wrap(input, content));
  });
};

function wrap(input, content) {
  return [
    content,
    hmrScript
  ].join('\n');
}
