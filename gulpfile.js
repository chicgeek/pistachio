var gulp = require('gulp');
var log = require('./build/log');
var compileLess = require('./build/compile-less');
var checksum = require('./build/checksum');
var rename = require('gulp-rename');
var aws = require('aws-sdk');
var stylestats = require('gulp-stylestats');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var es = require('event-stream');
var mime = require('mime');
var package = require('./package');
var browserify = require('browserify');
var through = require('through2');

// Less files that need to be compiled to CSS
var lessFileList = [
    // Main
    './less/pistachio.less',

    // Common/base styles
    './less/common.less',

    // Modules
    './less/modules/alerts.less',
    './less/modules/breadcrumb.less',
    './less/modules/buttons.less',
    './less/modules/forms.less',
    './less/modules/navigation.less',
    './less/modules/page-sections.less',
    './less/modules/pagination.less',
    './less/modules/panels.less',
    './less/modules/tables.less',
    './less/modules/stickers.less',
    './less/modules/off-screen-menu.less',

    // Docs
    './less/docs.less',

    // Highlight styles
    './node_modules/highlight.js/styles/github-gist.css'
];

var recursiveLessCompiler = function(files, done) {
    var out = './public/css';
    var index = 0;

    var recursor = function() {
        compileLess({
            file: files[index],
            dest: './public/css',
            done: function() {
                index ++;

                if (index === files.length) {
                    if (typeof done === 'function') {
                        done();
                    }

                    return;
                }

                return recursor();
            }
        });
    }

    return recursor();
}

var compileJs = function() {
    return through.obj(function(file, enc, next) {
        browserify(file.path)
            // Grab compilation result and smash it into stream
            .bundle(function(err, res) {
                file.contents = res;
                next(null, file);
                log.success('Built JS ' + path.basename(file.path));
            });
    });
}

// Build tasks
gulp.task('build', ['build:fonts', 'build:stats', 'build:js']);

// Build CSS from LESS
gulp.task('build:less', function(cb) {
    recursiveLessCompiler(lessFileList, cb);
});

gulp.task('build:fonts', function(cb) {
    var file = argv.f || './node_modules/font-awesome/fonts/*';
    var dest = argv.d || './public/fonts/font-awesome';

    gulp.src(file)
    .pipe(gulp.dest(dest))
    .on('end', function() {
        cb();
    });
});

gulp.task('build:stats', ['build:less'], function(cb) {
    // Exclude stats for these files
    var excludeFileList = [
        './less/docs.less',
        './node_modules/highlight.js/styles/github-gist.css'
    ];

    //
    var files = lessFileList.filter(function(item) {
        return excludeFileList.indexOf(item) === -1;
    });

    files.forEach(function(file, i) {
        var cssFileName = path.basename(file).replace('.less', '.css');

        gulp.src('./public/css/' + cssFileName)
        .pipe(stylestats({
            type: 'json',
            outfile: true
        }))
        .pipe(gulp.dest('./tests/results'))
        .on('end', function() {
            log.info('Generated stats for ' + cssFileName);

            if (i === files.length - 1) {
                cb();
            }
        });
    });
});

gulp.task('build:js', function(cb) {
    gulp.src('./js/src/pistachio.js')
    .pipe(compileJs())
    .pipe(gulp.dest('./public/js'))
    .on('error', function(err) {
        throw new(Error(err.message));
    }).
    on('end', cb);
});

// Misc dev tasks
gulp.task('dev', ['dev:profile', 'dev:less']);

// Watch LESS dir and build to ./css
// Then publish CSS
gulp.task('dev:less', function(cb) {
    recursiveLessCompiler(lessFileList);

    // Watch all LESS files and recompile
    gulp.watch('./less/**/*.less', function() {
        recursiveLessCompiler(lessFileList);
    });
});

// Get style stats on css
gulp.task('dev:profile', function(cb) {
    var file = argv.f || './public/css/pistachio.css';

    gulp.src(file)
    .pipe(stylestats())
    .on('end', function() {
        log.info('Profiling complete');
    });
});

// Publish the project to s3.
gulp.task('publish', ['build'], function() {
    var s3 = new aws.S3({ region: 'us-east-1'});
    var version = ('for-real' in argv) ? package.version : 'dev';

    log.info('Publishing version ' + version);

    // Display the subresource integrity hashes.
    // See https://hacks.mozilla.org/2015/09/subresource-integrity-in-firefox-43/
    var pistachioCssPath = './public/css/pistachio.css';
    log.info('Subresource Integrity:');
    log.success('sha256-' + checksum(pistachioCssPath, 'sha256'));
    log.success('sha512-' + checksum(pistachioCssPath, 'sha512'));

    // Find all files in the public folders.
    return gulp.src(['./public/**/*.*'], { base: './' })
        // Update the path to what we want on s3.
        .pipe(rename(function (file) {
            file.dirname = version + '/' + file.dirname.replace('public/', '');
        }))

        // Upload :rocket:!
        .pipe(es.map(function (file, callback) {
            var params = {
                Bucket: 'graze.pistachio',
                Key: file.path,
                ContentType: mime.lookup(file.path),
                CacheControl: ('for-real' in argv) ? 'public max-age=31104000' : 'no-cache',
                Body: file.contents
            };

            s3.upload(params, function (error, data) {
                if (error) log.error('Failed to publish ' + file.path + ': ' + error);
                log.success('Published ' + file.path);
            });

            callback(null, file);
        }));
});
