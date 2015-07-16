var gulp = require('gulp');

module.exports = function publishDirectory(opts) {
    opts = opts || {};

    if (! opts.dir) {
        return log.error('Specify an input directory...');
    }

    if (! opts.dest) {
        return log.error('Specify a destination...');
    }

    gulp.src(opts.dir, {base: './'})
    .pipe(gulp.dest(opts.dest))
    .on('end', function() {
        if (opts.done) {
            opts.done();
        }
    });
}
