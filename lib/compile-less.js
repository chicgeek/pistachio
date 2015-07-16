var gulp = require('gulp');
var less = require('gulp-less-sourcemap');
var minifyCSS = require('gulp-minify-css');
var log = require('./log');

module.exports = function compileLess(opts) {
    opts = opts || {};

    if (! opts.file) {
        return log.error('Specify an input LESS file...');
    }

    if (! opts.dest) {
        return log.error('Specify a destination...');
    }

    gulp.src(opts.file)
    .pipe(less())
    .on('error', function(err) {
        log.error(err.message);å
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(opts.dest))
    .on('end', function() {
        log.success('Built CSS from LESS source');

        if (opts.done) {
            opts.done();
        }
    });
}
