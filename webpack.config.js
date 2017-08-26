var path = require('path');
const webpack = require('webpack');
var merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var TARGET_ENV = process.env.npm_lifecycle_event === 'prod' ? 'production' : 'development';
var filename = (TARGET_ENV == 'production') ? '[name]-[hash].js' : 'index.js';

var common = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, "dist"),
        // webpack -p automatically adds hash when building for production
        filename: filename
    },
    plugins: [new HTMLWebpackPlugin({
            // using .ejs prevents other loaders causing errors
            template: 'src/index.ejs',
            // inject details of output file at end of body
            inject: 'body'
        })],
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ],
        extensions: ['.js', '.elm', '.scss', '.png']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // env: automatically determines the Babel plugins you need based on your supported environments
                        presets: ['env']
                    }
                }
            }, {
                test: /\.scss$/,
                exclude: [
                    /elm-stuff/, /node_modules/
                ],
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }, {
                test: /\.css$/,
                exclude: [
                    /elm-stuff/, /node_modules/
                ],
                loaders: ["style-loader", "css-loader"]
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: [
                    /elm-stuff/, /node_modules/
                ],
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff"
                }
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: [
                    /elm-stuff/, /node_modules/
                ],
                loader: "file-loader"
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader'
            }
        ]
    }
}

if (TARGET_ENV === 'development') {
    console.log('Building for dev...');
    module.exports = merge(common, {
        plugins: [
            // Suggested for hot-loading
            new webpack.NamedModulesPlugin(),
            // Prevents compilation errors causing the hot loader to lose state
            new webpack.NoEmitOnErrorsPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.elm$/,
                    exclude: [
                        /elm-stuff/, /node_modules/
                    ],
                    use: [
                        {
                            loader: "elm-hot-loader"
                        }, {
                            loader: "elm-webpack-loader",
                            // add Elm's debug overlay to output
                            options: {
                                debug: true
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            inline: true,
            stats: 'errors-only',
            contentBase: path.join(__dirname, "src/assets"),
            // For SPAs: serve index.html in place of 404 responses
            historyApiFallback: true
        }
    });
}

if (TARGET_ENV === 'production') {
    console.log('Building for prod...');
    module.exports = merge(common, {
        plugins: [
            // Delete everything from output directory and report to user
            new CleanWebpackPlugin(['dist'], {
              root:     __dirname,
              exclude:  [],
              verbose:  true,
              dry:      false
            }),
            new CopyWebpackPlugin([
                {
                    from: 'src/assets'
                }
            ]),
            // TODO update to version that handles =>
            new webpack.optimize.UglifyJsPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.elm$/,
                    exclude: [
                        /elm-stuff/, /node_modules/
                    ],
                    use: [
                        {
                            loader: "elm-webpack-loader"
                        }
                    ]
                }
            ]
        }
    });
}
