# Elm 0.18 with Webpack 3, Hot Loading & Bootstrap 4-beta

Elm dev environment with hot-loading (i.e. state is retained as you edit your code - Hot Module Reloading, HMR)). I use this daily for my professional work. Like elm-community/elm-webpack-starter but using Webpack 3.

## Installation

Clone this repo into a new project folder and run install script

With npm

```sh
$ git clone git@github.com:simonh1000/elm-webpack-starter.git new-project
$ cd new-project
<remove .git directory>
$ npm install
$ npm run dev
```

With yarn
```sh
$ git clone git@github.com:simonh1000/elm-webpack-starter.git new-project
$ cd new-project
<remove .git directory>
$ yarn install
$ yarn dev
 ```

Open http://localhost:3000 and start modifying the code in /src.

## Production

Build production assets with:

```sh
npm run prod
```

## Static assets

Just add to `src/assets/` and the production build copies them to `/dist`

<hr />

## Credits

A long time ago this code was forked from https://github.com/fluxxu/elm-hot-loader
