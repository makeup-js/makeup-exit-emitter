# makeup-focus-exit-emitter

<p>
    <a href="https://travis-ci.org/makeup-js/makeup-focus-exit-emitter"><img src="https://api.travis-ci.org/makeup-js/makeup-focus-exit-emitter.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/makeup-js/makeup-focus-exit-emitter?branch=master'><img src='https://coveralls.io/repos/makeup-js/makeup-focus-exit-emitter/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/makeup-js/makeup-focus-exit-emitter"><img src="https://david-dm.org/makeup-js/makeup-focus-exit-emitter.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/makeup-js/makeup-focus-exit-emitter#info=devDependencies"><img src="https://david-dm.org/makeup-js/makeup-focus-exit-emitter/dev-status.svg" alt="devDependency status" /></a>
</p>

A vanilla JavaScript port of <a href="https://github.com/ianmcburnie/jquery-linear-navigation">jquery-screenreader-trap</a>.

## Experimental

This module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-focus-exit-emitter

// via yarn
yarn add makeup-focus-exit-emitter
```

## Events

## Dependencies

* custom-event-polyfill

## Development

* `npm start`
* `npm test`
* `npm run lint`
* `npm run fix`
* `npm run build`
* `npm run clean`

The following hooks exist, and do not need to be invoked manually:

* `npm prepublish` cleans, lints, tests and builds on every `npm publish` command
* `pre-commit` cleans, lints, tests and builds on every `git commit` command

## Test Reports

Each test run will generate the following reports:

* `/reports/coverage` contains Istanbul code coverage report
* `/reports/html` contains HTML test report

## CI Build

https://travis-ci.org/makeup-js/makeup-focus-exit-emitter

## Code Coverage

https://coveralls.io/github/makeup-js/makeup-focus-exit-emitter
