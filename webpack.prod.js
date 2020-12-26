const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const prod = {
    mode: 'production',
};

module.exports = merge(common(false), prod);
