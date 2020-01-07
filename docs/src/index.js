/* eslint-disable no-console */

const ExitEmitter = require('../index.js');

document.querySelectorAll('.widget').forEach((el) => {
    ExitEmitter.addFocusExit(el);

    el.addEventListener('focusin', function(e) {
        this.classList.add('focusin');
    });

    el.addEventListener('focusExit', function(e) {
        this.classList.remove('focusin');
    });
});
