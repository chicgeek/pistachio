var gutil = require('gulp-util');

var logDivider = '=';

var log = function logMessage(colour) {
    return function logger(message) {
        gutil.log(gutil.colors[colour](logDivider.repeat(message.length)));
        gutil.log(gutil.colors[colour](message));
        gutil.log(gutil.colors[colour](logDivider.repeat(message.length)));
    }
}

// http://stackoverflow.com/a/202627/4185717
if (! String.prototype.repeat) {
    String.prototype.repeat = function(num)
    {
        return new Array(num + 1).join(this);
    }
}

module.exports = {
    // Lovely green successful log
    success: log('green'),
    // Big, bad, red errors
    error: log('red'),
    // Friendly notices
    info: log('cyan')
}
