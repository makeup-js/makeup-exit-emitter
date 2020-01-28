const ExitEmitter = require('../../src/index.js');

document.querySelectorAll('.widget').forEach((el) => {
    ExitEmitter.addFocusExit(el);

    el.addEventListener('focusin', function() {
        this.classList.add('focusin');
    });

    el.addEventListener('focusExit', function() {
        this.classList.remove('focusin');
    });
});
