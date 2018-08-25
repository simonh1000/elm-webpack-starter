'use strict';

require("./styles.scss");

var app = require('./Main');
app.Elm.Main.init({flags: 6});

debugger;
app.Elm.Main.ports.subscribe(data => {
    console.log(data);
})
// Use ES2015 syntax and let Babel compile it for you
var testFn = (inp) => {
    let a = inp + 1;
    return a;
}
