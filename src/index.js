'use strict';

// require('./index.html');
require('bootstrap-loader');
require("./styles.scss");

var Elm = require('./Main');
var app = Elm.Main.fullscreen();
