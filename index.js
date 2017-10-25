'use strict';

// requires CustomEvent polyfill for IE9+
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

function onFocusOut(e) {
    if (this.contains(e.relatedTarget) === false) {
        this.dispatchEvent(new CustomEvent('focusExit', {
            detail: {
                newElement: e.relatedTarget,
                oldElement: e.target
            }
        }));
    }
}

function add(el) {
    el.addEventListener('focusout', onFocusOut);
}

function remove(el) {
    el.removeEventListener('focusout', onFocusOut);
}

module.exports = {
    add: add,
    remove: remove
};
