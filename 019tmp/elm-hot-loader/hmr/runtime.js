/*
    A standalone implementation of Webpack's hot module replacement (HMR) system.

    Provide the minimal implementation of Webpack's HMR API. We don't need any of the
    stuff related to Webpack's ability to bundle disparate types of modules (JS, CSS, etc.).

    For details on the Webpack HMR API, see https://webpack.js.org/api/hot-module-replacement/
    and the source code of `webpack-hot-middleware`
 */

// TODO [kl] cleanup the globals

var eventSource = null;

function connect(programName) {
    // Listen for the server to tell us that an HMR update is available
    eventSource = new EventSource("stream-" + programName);
    eventSource.onmessage = function (evt) {
        var reloadUrl = evt.data;
        var myRequest = new Request(reloadUrl);
        myRequest.cache = "no-cache";
        fetch(myRequest).then(function (response) {
            if (response.ok) {
                response.text().then(function (value) {
                    module.hot.apply();
                    delete Elm;
                    eval(value)
                });
            } else {
                console.error("HMR fetch failed:", response.status, response.statusText);
            }
        })
    };
}

// Expose the Webpack HMR API

var myDisposeCallback = null;

// simulate the HMR api exposed by webpack
var module = {
    hot: {
        accept: function () {
        },

        dispose: function (callback) {
            myDisposeCallback = callback
        },

        data: null,

        apply: function () {
            var newData = {};
            myDisposeCallback(newData);
            module.hot.data = newData
        }

    }
};
