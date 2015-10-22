var domReady = require('./window');
var html = require('./html');

module.exports = function(body, callback) {
    domReady(html(body), function(window, html) {
        var $ = require('jquery');
        var $body = $($($(html))[1]);

        window.jQuery = $;

        callback($body);
    });
}
