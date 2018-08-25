const path = require('path');
const fs = require('fs');

const util = require('../util.js');

const hmrCode = fs.readFileSync(path.join(__dirname, "../hmr/hmr.js"));

module.exports = function (content, map, meta) {
    return util.inject(hmrCode, content);
};