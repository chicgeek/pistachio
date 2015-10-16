module.exports = function(html, callback) {
    var jsdom = require('jsdom-no-contextify').jsdom;
    var defaultHtml = require('./html')();

    if (! callback) {
        callback = html;
        html = defaultHtml;
    }

    jsdom.env(html, [], function(err, window) {

        if (err) {
            throw(err);
        }

        global.window = window;

        callback(window, html);
    });
};
