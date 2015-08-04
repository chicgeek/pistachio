var express = require('express');
var fs = require('fs');
var exphbs  = require('express-handlebars');
var cmd = require('node-cmd');
var pages = require('./lib/pages')();

var app = express();

// Add extra contextual information to pass to a page here
// Like a micro controller... Sort of.
var pageContexts = {
    // Add stat info to stats page
    'css-stats': {
        stats: require('./lib/css-stats')()
    }
}

// Gets view params
var getContext = function(name) {
    var context = {
        pages: pages.getAllPageInfo(name),
        title: name.replace(/(-|_)/, ' ')
    }

    if (typeof pageContexts[name] === 'object') {
        for (var prop in pageContexts[name]) {
            context[prop] = pageContexts[name][prop]
        }
    }

    return context;
}

// Setup handlebars engine
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
    helpers: {
        // Returns a utf8 formatted string of a static file
        getFile: function getFile(path) {
            path = __dirname + '/..' + path;

            if (! fs.existsSync(path)) {
                return false;
            }

            return fs.readFileSync(path, 'utf8').trim();
        }
    }
}));

// Set view engine
app.set('view engine', '.hbs');
// Set views dir (necessary, because we don't have this file in the root directory)
app.set('views', __dirname + '/views/');
// Serve all static files from root dir (OK for documentation, but not recomended for production sites)
app.use(express.static(__dirname + '/../'));
// Set app port
app.set('port', process.env.PORT || 3000);

// All page routing
app.get('/:module', function(req, res) {
    var module = req.params.module;

    if (pages.pageExists(module)) {
        return res.render(module, getContext(module));
    }
});

// Home page routing
app.get('/', function(req, res) {
    res.render('index', {
        pages: pages.getAllPageInfo(),
        title: 'home'
    })
});

// Launch app
var server = app.listen(app.get('port'), function () {
    console.log('Example app listening on localhost at port', app.get('port'));
});
