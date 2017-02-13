var elmSource = __dirname + '/src';
var path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, "dist"),
    filename: 'index.js'
  },

  resolve: {
      modules: [
          path.join(__dirname, "src"),
          "node_modules"
      ],
      extensions: ['.js', '.elm', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-hot-loader!elm-webpack-loader?debug=true'
        // loader: 'elm-hot!elm-webpack?cwd=' + elmSource
    },
    {
        test: /\.scss$/,
        exclude: [/elm-stuff/, /node_modules/],
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
    {
        test: /\.png$/,
        exclude: [/elm-stuff/, /node_modules/],
        loaders: ["url-loader"]
      }
    ],

    noParse: /\.elm$/
  },

  devServer: {
    inline: true,
    stats: 'errors-only'
  }
};
