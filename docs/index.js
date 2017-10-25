var FocusExitEmitter = require('../index.js');

Array.prototype.slice.call(document.querySelectorAll('.widget')).forEach(function(el) {
    FocusExitEmitter.add(el);

    el.addEventListener('focusin', function() {
        this.classList.add('focusin');
    });

    el.addEventListener('focusExit', function(e) {
        console.log(e);
        this.classList.remove('focusin');
    });
});
