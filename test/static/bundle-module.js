$_mod.installed("makeup-exit-emitter$0.0.2", "custom-event-polyfill", "0.3.0");
$_mod.main("/custom-event-polyfill$0.3.0", "custom-event-polyfill");
$_mod.def("/custom-event-polyfill$0.3.0/custom-event-polyfill", function(require, exports, module, __filename, __dirname) { // Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}

});
$_mod.def("/makeup-exit-emitter$0.0.2/index", function(require, exports, module, __filename, __dirname) { 'use strict';

// requires CustomEvent polyfill for IE9+
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

function onFocusOrMouseOut(evt, el, type) {
    if (el.contains(evt.relatedTarget) === false) {
        el.dispatchEvent(new CustomEvent(type + 'Exit', {
            detail: {
                toElement: evt.relatedTarget,
                fromElement: evt.target
            },
            bubbles: false // mirror the native mouseleave event
        }));
    }
}

function onFocusOut(e) {
    onFocusOrMouseOut(e, this, 'focus');
}

function onMouseOut(e) {
    onFocusOrMouseOut(e, this, 'mouse');
}

function addFocusExit(el) {
    el.addEventListener('focusout', onFocusOut);
}

function removeFocusExit(el) {
    el.removeEventListener('focusout', onFocusOut);
}

function addMouseExit(el) {
    el.addEventListener('mouseout', onMouseOut);
}

function removeMouseExit(el) {
    el.removeEventListener('mouseout', onMouseOut);
}

function add(el) {
    addFocusExit(el);
    addMouseExit(el);
}

function remove(el) {
    removeFocusExit(el);
    removeMouseExit(el);
}

module.exports = {
    addFocusExit: addFocusExit,
    addMouseExit: addMouseExit,
    removeFocusExit: removeFocusExit,
    removeMouseExit: removeMouseExit,
    add: add,
    remove: remove
};

});