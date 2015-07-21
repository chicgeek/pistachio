var gulp = require('gulp');
var log = require('./build/log');
var compileLess = require('./build/compile-less');
var stylestats = require('gulp-stylestats');

// Build tasks
gulp.task('build', ['build:less']);

// Build CSS from LESS
gulp.task('build:less', function(cb) {
    compileLess({
        file: './less/pistachio.less',
        dest: './css',
        done: cb
    });
});

// Misc dev tasks
gulp.task('dev', ['dev:profile', 'dev:less']);

// Watch LESS dir and build to ./css
// Then publish CSS
gulp.task('dev:less', function(cb) {
    // Compiler function
    var compile = function() {
        compileLess({
            file: './less/pistachio.less',
            dest: './css'
        });
    }

    // Compile on method call
    compile();

    // Watch all LESS files and recompile
    gulp.watch('./less/**/*.less', function() {
        compile();
    });
});

// Get style stats on css
gulp.task('dev:profile', function(cb) {
    gulp.src('./css/pistachio.css')
    .pipe(stylestats())
    .on('end', function() {
        log.info('Profiling complete')
    });
});
