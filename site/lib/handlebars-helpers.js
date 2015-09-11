var fs = require('fs');
var util = require('util');
var beautify = require('js-beautify').html;
var hljs = require('highlight.js');

var escapeHtml = function(html) {
    html = hljs.highlight('html', beautify(html));

    return html.value;
};

module.exports = {
    // Returns a utf8 formatted string of a static file
    getFile: function getFile(path, param) {
        path = __dirname + '/../../' + path;

        if (param && path.indexOf('%') > -1) {
            path = util.format(path, param);
        }

        if (! fs.existsSync(path)) {
            return false;
        }

        return fs.readFileSync(path, 'utf8').trim();
    },
    codeBlock: function(className, options) {
        if (! options) {
            options = className;
            className = '';
        }

        return '<pre class="hljs xml ' + className + '">' + escapeHtml(options.fn(this)) +  '</pre>';
    }
};
