$_mod.installed("makeup-exit-emitter$0.1.1", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-exit-emitter$0.1.1", "makeup-next-id", "0.1.1");
$_mod.main("/nanoid$2.0.3", "");
$_mod.remap("/nanoid$2.0.3/index", "/nanoid$2.0.3/index.browser");
$_mod.builtin("process", "/process$0.6.0/browser");
$_mod.def("/process$0.6.0/browser", function(require, exports, module, __filename, __dirname) { // shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

});
$_mod.def("/nanoid$2.0.3/index.browser", function(require, exports, module, __filename, __dirname) { var process=require("process"); if (process.env.NODE_ENV !== 'production') {
  if (typeof self === 'undefined' || (!self.crypto && !self.msCrypto)) {
    throw new Error(
      'Your browser does not have secure random generator. ' +
      'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}

var crypto = self.crypto || self.msCrypto

/*
 * This alphabet uses a-z A-Z 0-9 _- symbols.
 * Symbols order was changed for better gzip compression.
 */
var url = 'Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-'

module.exports = function (size) {
  size = size || 21
  var id = ''
  var bytes = crypto.getRandomValues(new Uint8Array(size))
  while (0 < size--) {
    id += url[bytes[size] & 63]
  }
  return id
}

});
$_mod.def("/makeup-exit-emitter$0.1.1/index", function(require, exports, module, __filename, __dirname) { 'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var nextID = require('/makeup-next-id$0.1.1/index'/*'makeup-next-id'*/);

var focusExitEmitters = {}; // requires CustomEvent polyfill for IE9+
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

function doFocusExit(el, fromElement, toElement) {
  el.dispatchEvent(new CustomEvent('focusExit', {
    detail: {
      fromElement: fromElement,
      toElement: toElement
    },
    bubbles: false // mirror the native mouseleave event

  }));
}

function onDocumentFocusIn(e) {
  var newFocusElement = e.target;
  var targetIsDescendant = this.el.contains(newFocusElement); // if focus has moved to a focusable descendant

  if (targetIsDescendant === true) {
    // set the target as the currently focussed element
    this.currentFocusElement = newFocusElement;
  } else {
    // else focus has not gone to a focusable descendant
    window.removeEventListener('blur', this.onWindowBlurListener);
    document.removeEventListener('focusin', this.onDocumentFocusInListener);
    doFocusExit(this.el, this.currentFocusElement, newFocusElement);
    this.currentFocusElement = null;
  }
}

function onWindowBlur() {
  doFocusExit(this.el, this.currentFocusElement, undefined);
}

function onWidgetFocusIn() {
  // listen for focus moving to anywhere in document
  // note that mouse click on buttons, checkboxes and radios does not trigger focus events in all browsers!
  document.addEventListener('focusin', this.onDocumentFocusInListener); // listen for focus leaving the window

  window.addEventListener('blur', this.onWindowBlurListener);
}

var FocusExitEmitter =
/*#__PURE__*/
function () {
  function FocusExitEmitter(el) {
    _classCallCheck(this, FocusExitEmitter);

    this.el = el;
    this.currentFocusElement = null;
    this.onWidgetFocusInListener = onWidgetFocusIn.bind(this);
    this.onDocumentFocusInListener = onDocumentFocusIn.bind(this);
    this.onWindowBlurListener = onWindowBlur.bind(this);
    this.el.addEventListener('focusin', this.onWidgetFocusInListener);
  }

  _createClass(FocusExitEmitter, [{
    key: "removeEventListeners",
    value: function removeEventListeners() {
      window.removeEventListener('blur', this.onWindowBlurListener);
      document.removeEventListener('focusin', this.onDocumentFocusInListener);
      this.el.removeEventListener('focusin', this.onWidgetFocusInListener);
    }
  }]);

  return FocusExitEmitter;
}();

function addFocusExit(el) {
  var exitEmitter = null;
  nextID(el);

  if (!focusExitEmitters[el.id]) {
    exitEmitter = new FocusExitEmitter(el);
    focusExitEmitters[el.id] = exitEmitter;
  }

  return exitEmitter;
}

function removeFocusExit(el) {
  var exitEmitter = focusExitEmitters[el.id];

  if (exitEmitter) {
    exitEmitter.removeEventListeners();
    delete focusExitEmitters[el.id];
  }
}

module.exports = {
  addFocusExit: addFocusExit,
  removeFocusExit: removeFocusExit
};

});