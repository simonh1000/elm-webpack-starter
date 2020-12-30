const {merge} = require('webpack-merge');

const CopyWebpackPlugin = require("copy-webpack-plugin");
// JS minification
const ClosurePlugin = require("closure-webpack-plugin");
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
                {}
            ),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        // Copy static assets
        new CopyWebpackPlugin({
            patterns: [{from: "src/assets"}]
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            filename: "[name]-[chunkhash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.elm$/,
                use: {
                    loader: "elm-webpack-loader",
                    options: {
                        optimize: true
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {publicPath: ""}},
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require("tailwindcss")("./config/tailwind.config.js"),
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
