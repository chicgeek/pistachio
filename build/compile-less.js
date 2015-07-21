var gulp = require('gulp');
var less = require('gulp-less');
var sourcemap = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var log = require('./log');

/**
 * Compiles a LESS file to CSS from a specified source to a specified directory
 * with source mapping and minification
 *
 * @param  object opts {
 *     file: string [input less file],
 *     dest: string [output directory for css]
 *     done: function [optional callback to run on completion](optional)
 * }
 */
module.exports = function compileLess(opts) {
    opts = opts || {};

    // We need a file and a dest
    if (! opts.file) {
        return log.error('Specify an input LESS file...');
    }

    if (! opts.dest) {
        return log.error('Specify a destination...');
    }


    // Read source LESS
    gulp.src(opts.file)
    // Init sourcemap
    .pipe(sourcemap.init())
    // Compile LESS
    .pipe(less())
    // Minify CSS
    .pipe(minifyCSS({
        keepSpecialComments: 1,
        advanced: false
    }))
    // Write external sourcemap
    .pipe(sourcemap.write('./'))
    // Write CSS to directory
    .pipe(gulp.dest(opts.dest))
    // Catch errors in pipeline
    .on('error', function(err) {
        log.error(err.message);å
    })
    // Compilation complete
    .on('end', function() {
        log.success('Built CSS from LESS source');

        if (opts.done) {
            opts.done();
        }
    });
}
