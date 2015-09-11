var express = require('express');
var fs = require('fs');
var exphbs  = require('express-handlebars');

module.exports = function(opts) {
    var app = express();

    // Setup handlebars engine
    app.engine('.hbs', exphbs({
        defaultLayout: 'layout',
        extname: '.hbs',
        layoutsDir: opts.layoutsDir,
        helpers: require('./handlebars-helpers')
    }));

    // Set view engine
    app.set('view engine', '.hbs');

    // Set views dir (necessary, because we don't have this file in the root directory)
    app.set('views', opts.viewsDir);

    // Serve all static files from root dir (OK for documentation, but not recomended for production sites)
    app.use(express.static(opts.staticDir));

    // Set app port
    app.set('port', process.env.PORT || opts.port || 3000);

    return app;
}
