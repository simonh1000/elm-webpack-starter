const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// needed by postcss
// process.env.NODE_ENV = 'production';

console.log("Production", process.env.NODE_ENV);

const prod = {
    mode: 'production',
};

module.exports = merge(common(false), prod);
