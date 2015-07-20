var express = require('express');
var fs = require('fs');
var exphbs  = require('express-handlebars');

var app = express();

// Looks up page and renders it if found
var renderPage = function(name, cb) {
    fs.readFile(__dirname + '/pages/' + name + '.html', 'utf8', function(err, data) {
        if (err) {
            return renderPage('example', cb);
        }

        return cb(data);
    });
}

var getAllPages = function(currentPage) {
    var pages = fs.readdirSync(__dirname + '/pages');
    var pageNames = [];

    pages.map(function(page) {
        var pageName = page.replace('.html', '');
        var pageInfo = {
            name: pageName,
            current: currentPage === pageName
        }

        if (page !== 'example.html' ) {
            pageNames.push(pageInfo);
        }
    });

    return pageNames;
}

app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts'
}));

app.set('view engine', '.hbs');
app.set('views', __dirname + '/views/');

app.use(express.static(__dirname + '/public'));

app.get('/:module', function(req, res) {
    renderPage(req.params.module, function(page) {
        res.render('index', {
            content: page,
            pages: getAllPages(req.params.module)
        })
    });
});

app.get('/', function(req, res) {
    renderPage(req.params.module, function(page) {
        res.render('index', {
            content: '<h1>home</h1>',
            pages: getAllPages()
        })
    });
});

var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});
