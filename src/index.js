'use strict';

import "./tailwind.css";
require("./styles.scss");

const {Elm} = require('./Main');
const app = Elm.Main.init({flags: 6});

app.ports.toJs.subscribe(data => {
    console.log(data);
})
// Use ES2015 syntax and let Babel compile it for you
const testFn = (inp) => {
    let a = inp + 1;
    return a;
}
