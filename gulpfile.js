var gulp = require('gulp');
var less = require('gulp-less-sourcemap');

var buildLess = function(cb) {
    gulp.src('./less/pistachio.less')
    .pipe(less())
    .on('error', function(err) {
        console.log(err.message);
    })
    .pipe(gulp.dest('./css'))
    .on('end', function() {
        console.log('compiled CSS');

        if (cb) {
            cb();
        }
    });
}

gulp.task('watch', ['watch:less']);

gulp.task('watch:less', function(cb) {
    gulp.watch('./less/**/*.less', function() {
        buildLess();
    });
});

gulp.task('build', ['build:less']);

gulp.task('build:less', function(cb) {
    buildLess(function() {
        cb();
    });
});
