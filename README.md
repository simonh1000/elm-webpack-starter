# Elm Hot Loader [![Version](https://img.shields.io/npm/v/elm-hot-loader.svg)](https://www.npmjs.com/package/elm-hot-loader)

Hot swapping ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) for [Elm](http://elm-lang.org/) modules.


## Installation

```sh
$ npm install --save elm-webpack-loader elm-hot-loader
```


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

In your `webpack.config.js` file:

```js
module.exports = {
  module: {
    loaders: [{
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      loader: 'elm-hot!elm-webpack'
    }]
  }
};
```

## Notes

### Dependency

This loader relies on elm-webpack-loader to compile ELM to JS.

### swap port and Empty action

After hot swapping, elm-hot-load will call 'swap' port to trigger a re-render.
So in your elm main module, you should define something like:

```elm
type Action 
  = Empty -- this action does not modify model, just to trigger a re-render
  | CounterAction Counter.Action

-- for elm-hot-loader to trigger a re-render
port swap : Signal Bool

-- map swap to Empty action
swapsignal : Signal Action
swapsignal =
  Signal.map (\_ -> Empty) swap
  
app : StartApp.App Model
app =
  StartApp.start
    { init = init
    , update = update
    , view = view
    , inputs = [ swapsignal ] -- add swap signal as an input
    }
```
### Example

You can find an example in the `example` folder.
To run:

```
npm install
npm run build
```

Open http://localhost:3000

![Screenshot](https://raw.githubusercontent.com/fluxxu/elm-hot-loader/master/example/example.gif)
