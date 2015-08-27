var gulp = require('gulp');
var log = require('./build/log');
var compileLess = require('./build/compile-less');
var rename = require('gulp-rename');
var aws = require('aws-sdk');
var stylestats = require('gulp-stylestats');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var es = require('event-stream');
var mime = require('mime');
var package = require('./package');

// Build tasks
gulp.task('build', ['build:less', 'build:fonts', 'test:less']);

// Build CSS from LESS
gulp.task('build:less', function(cb) {
    var file = argv.f || './less/pistachio.less';
    var dest = argv.d || './css';

    compileLess({
        file: file,
        dest: dest,
        done: cb
    });
});

gulp.task('build:fonts', function(cb) {
    var file = argv.f || './node_modules/font-awesome/fonts/*';
    var dest = argv.d || './fonts/font-awesome';

    gulp.src(file)
    .pipe(gulp.dest(dest))
    .on('end', function() {
        cb();
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
    };

    // Compile on method call
    compile();

    // Watch all LESS files and recompile
    gulp.watch('./less/**/*.less', function() {
        compile();
    });
});

// Get style stats on css
gulp.task('dev:profile', function(cb) {
    var file = argv.f || './css/pistachio.css';

    gulp.src(file)
    .pipe(stylestats())
    .on('end', function() {
        log.info('Profiling complete');
    });
});

// Testing tasks
gulp.task('test', ['test:less']);

gulp.task('test:less', function(cb) {
    var files = require('./tests/less-files');

    files.forEach(function(file, i) {
        var cssFileName = path.basename(file).replace('.less', '.css');

        compileLess({
            file: './less/' + file,
            dest: './css',
            done: function() {
                gulp.src('./css/' + cssFileName)
                .pipe(stylestats({
                    type: 'json',
                    outfile: true
                }))
                .pipe(gulp.dest('./tests/results'))
                .on('end', function() {
                    log.info('Generated stats for ' + cssFileName);

                    if (i === files.length) {
                        log.success('Finished generating test information');
                        cb();
                    }
                });
            }
        });
    });
});

// Publish the project to s3.
gulp.task('publish', ['build'], function() {

    var s3 = new aws.S3({ region: 'us-east-1'});

    var version = ("for-real" in argv) ? package.version : 'dev';

    log.info('Publishing version ' + version);

    // Find all files in the public folders.
    return gulp.src(['./css/*', './fonts/*'], { base: './' })

        // Update the path to what we want on s3.
        .pipe(rename(function (file) {
            file.dirname = version + '/' + file.dirname;
        }))

        // Upload :rocket:!
        .pipe(es.map(function (file, callback) {
            var params = {
                Bucket: 'graze.pistachio',
                Key: file.path,
                ContentType: mime.lookup(file.path),
                Body: file.contents
            };

            s3.upload(params, function (error, data) {
                if (error) log.error('Failed to publish ' + file.path + ': ' + error);
                log.success('Published ' + file.path);
            });

            callback(null, file);
        }));
});
