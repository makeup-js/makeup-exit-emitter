var ExitEmitter = require('../index.js');

Array.prototype.slice.call(document.querySelectorAll('.widget')).forEach(function(el) {
    var exitEmitter = new ExitEmitter(el); // eslint-disable-line

    el.addEventListener('focusin', function() {
        this.classList.add('focusin');
    });

    el.addEventListener('focusExit', function(e) {
        console.log(e);
        this.classList.remove('focusin');
    });
});
