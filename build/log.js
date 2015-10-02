var gutil = require('gulp-util');

// Basic logging factory function
var log = function logMessage(colour, prefix) {
    prefix = prefix || '';

    if (prefix) {
        prefix = prefix + ' ';
    }

    return function logger(message) {
        gutil.log(gutil.colors[colour](prefix + message));
    }
}

/**
 * Logging utils
 *
 * @type object
 */
module.exports = {
    // Lovely green successful log
    success: log('green', '✔ '),
    // Big, bad, red errors
    error: log('red', '✘ '),
    // Friendly notices
    info: log('cyan')
}
