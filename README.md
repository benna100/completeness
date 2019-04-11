## Installation

Install npm dependencies

```sh
 npm install 
```

## Running the project
The project is written in ES6 and is transpiled with Babel using Webpack. To start the development server

```sh
npm start
```

To build for production

```sh
npm run build
```


## Deploying to github pages
`npm run deploy`
from git bash admin rights

## Tests
The most critical functions have unit tests, located in the `/src/sketch.test.js` folder. To run the test suite with JEST run the command `npm run test`.

Current status: [![Build Status](https://travis-ci.com/zkwsk/game-of-life.svg?branch=master)](https://travis-ci.com/zkwsk/game-of-life)

## Easter Eggs
As a little added bonus, if you load the game on a modern smartphone (iOS 4.2.1+, Android 4.0.3+) you can shake the phone to reset the application. After a while the cellular automation tends to reach a stable state so this is a way to disrupt it. Alternatively you can resize the screen or reload the page. To detect motion [shake.js](https://github.com/alexgibson/shake.js/) was used.
