const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


const dev = {
    mode: 'development',
    devServer: {
        inline: true,
        hot: true,
        stats: "errors-only",
        contentBase: path.join(__dirname, "../src/assets"),
        publicPath: "/",
        historyApiFallback: true,
        // feel free to delete this section if you don't need anything like this
        before(app) {
            // on port 3000
            app.get("/test", function (req, res) {
                res.json({result: "OK"});
            });
        }
    },
};

module.exports = env => {
    const withDebug = !env.nodebug;
    return merge(common(withDebug), dev);
}
