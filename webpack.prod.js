const path = require('path');

const {merge} = require('webpack-merge');
const ClosurePlugin = require("closure-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

// Production CSS assets - separate, minimised file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const common = require('./webpack.common.js');

const prod = {
    mode: 'production',
    optimization: {
        minimizer: [
            new ClosurePlugin(
                {mode: "STANDARD"},
                {
                    // compiler flags here
                    //
                    // for debugging help, try these:
                    //
                    // formatting: 'PRETTY_PRINT',
                    // debug: true
                    // renaming: false
                }
            ),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        // Copy static assets
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/assets"
                }
            ]
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name]-[chunkhash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: {
                    loader: "elm-webpack-loader",
                    options: {
                        optimize: true
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: [/elm-stuff/, /node_modules/],
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {publicPath: ""}},
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require("tailwindcss")("./tailwind.config.js"),
                                    require("autoprefixer"),
                                ],
                            },
                        }
                    }, "sass-loader"
                ]
            }
        ]
    }

};

module.exports = merge(common(false), prod);
