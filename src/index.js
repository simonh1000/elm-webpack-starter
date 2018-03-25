'use strict';

require('bootstrap-loader');
require("./styles.scss");

var Elm = require('./Main');
var app = Elm.Main.fullscreen();

var testFn = (inp) => {
    let a = inp + 1;
    return a;
}
