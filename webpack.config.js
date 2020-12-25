const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const withDebug = true;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Elm Webpack Starter - Development',
        }),
        new CleanWebpackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [path.join(__dirname, "src"), 'node_modules'],
        extensions: [".elm", ".js"]
    },
    devServer: {
        contentBase: 'src/assets',
        port: 3000
    },
    optimization: {
        // Prevents compilation errors causing the hot loader to lose state
        emitOnErrors: false
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', "sass-loader"],
            }, {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: [
                    {loader: "elm-hot-webpack-loader"},
                    {
                        loader: "elm-webpack-loader",
                        options: {
                            // add Elm's debug overlay to output
                            debug: withDebug,
                            optimize: false
                        }
                    }
                ]
            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};

