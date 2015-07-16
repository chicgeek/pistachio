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

        gulp.src('./css/**/*', {base: './'})
        .pipe(gulp.dest('./dev/public'))
        .on('end', function() {
            if (cb) {
                cb();
            }
        });
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

gulp.task('dev', ['dev:publish']);

gulp.task('dev:publish', function(cb) {
    gulp.src('./css/**/*', {base: './'})
    .pipe(gulp.dest('./dev/public'))
    .on('end', function() {
        console.log('Published CSS to dev site!');
    });

    gulp.src('./fonts/**/*', {base: './'})
    .pipe(gulp.dest('./dev/public'))
    .on('end', function() {
        console.log('Published fonts to dev site!');
    });
});
