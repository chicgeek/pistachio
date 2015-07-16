var gulp = require('gulp');
var log = require('./lib/log');
var compileLess = require('./lib/compile-less');
var publishDirectory = require('./lib/publish-directory');
var stylestats = require('gulp-stylestats');

// Watch tasks
gulp.task('watch', ['watch:less']);

// Watch LESS dir and build to ./css
// Then publish CSS
gulp.task('watch:less', function(cb) {
    var compile = function() {
        compileLess({
            file: './less/pistachio.less',
            dest: './css',
            done: function() {
                publishDirectory({
                    dir: './css/**/*',
                    dest: './dev/public'
                });
            }
        });
    }

    compile();

    gulp.watch('./less/**/*.less', function() {
        compile();
    });
});

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
gulp.task('dev', ['dev:publish', 'dev:profile']);

// Publish static files to docs
gulp.task('dev:publish', function(cb) {
    publishDirectory({
        dir: './css/**/*',
        dest: './dev/public',
        done: function() {
            log.success('Published CSS to docs');

            publishDirectory({
                dir: './fonts/**/*',
                dest: './dev/public',
                done: function() {
                    log.success('Published fonts to docs');
                    cb();
                }
            });
        }
    });
});

gulp.task('dev:profile', function(cb) {
    compileLess({
        file: './less/pistachio.css',
        dest: './css',
        done: function() {
            gulp.src('./css/pistachio.css')
            .pipe(stylestats())
            .on('end', function() {
                log.info('Profiling complete')
            })
        }
    });
});
