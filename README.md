# makeup-exit-emitter

<p>
    <a href="https://travis-ci.org/makeup-js/makeup-exit-emitter"><img src="https://api.travis-ci.org/makeup-js/makeup-exit-emitter.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/makeup-js/makeup-exit-emitter?branch=master'><img src='https://coveralls.io/repos/makeup-js/makeup-exit-emitter/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/makeup-js/makeup-exit-emitter"><img src="https://david-dm.org/makeup-js/makeup-exit-emitter.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/makeup-js/makeup-exit-emitter#info=devDependencies"><img src="https://david-dm.org/makeup-js/makeup-exit-emitter/dev-status.svg" alt="devDependency status" /></a>
</p>

A vanilla JavaScript port of <a href="https://github.com/makeup-jquery/jquery-focus-exit">jquery-focus-exit</a>.

Emits custom 'focusExit' event when focus has exited an element and all of it's descendants.

## Experimental

This CommonJS module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-exit-emitter

// via yarn
yarn add makeup-exit-emitter
```

## Example

```js
    const ExitEmitter = require('makeup-exit-emitter');

    const el = document.getElementById('#widget1');

    ExitEmitter.addFocusExit(el);

    el.addEventListener('focusExit', function(e){
        console.log(this, e); // outputs (el1, 'focusExit')
    });
```

## Methods

* addFocusExit(el)
* removeFocusExit(el)

## Events

* 'focusExit'
    * event.detail
        * fromElement
        * toElement

## Dependencies

* [makeup-next-id](https://github.com/makeup-js/makeup-next-id)

## Polyfills

* [custom-event-polyfill](https://github.com/krambuhl/custom-event-polyfill) (for IE11)
* [nodelist-foreach-polyfill](https://github.com/imagitama/nodelist-foreach-polyfill) (docs page only)

## CI Build

https://travis-ci.org/makeup-js/makeup-exit-emitter

## Code Coverage

https://coveralls.io/github/makeup-js/makeup-exit-emitter
