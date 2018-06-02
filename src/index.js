'use strict';

require("./styles.scss");

var Elm = require('./Main');
var app = Elm.Main.fullscreen();

// Use ES2015 syntax and let Babel compile it for you
var testFn = (inp) => {
    let a = inp + 1;
    return a;
}
