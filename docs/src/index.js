/* eslint-disable no-console */

const ExitEmitter = require('../index.js');

document.querySelectorAll('.widget').forEach(function(el) {
    el.addEventListener('focusin', function(e) {
        console.log(e);
        ExitEmitter.addFocusExit(el);
        this.classList.add('focusin');
    });

    el.addEventListener('focusExit', function(e) {
        console.log(e);
        ExitEmitter.removeFocusExit(el);
        this.classList.remove('focusin');
    });
});
