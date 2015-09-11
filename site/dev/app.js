var site = require('../lib/site');
var pages = require('../lib/pages')(__dirname + '/views');

var app = site({
    layoutsDir: __dirname + '/views/layouts',
    viewsDir: __dirname + '/views/',
    staticDir: __dirname + '/../../'
});

// All page routing
app.get('/:page', function(req, res) {
    var page = req.params.page;

    if (pages.pageExists(page)) {
        return res.render(page, {});
    }
});

// Home page routing
app.get('/', function(req, res) {
    res.render('index', {
        pages: pages.getAllPageInfo(),
        title: 'home'
    });
});

// Launch app
app.listen(app.get('port'), function () {
    console.log('Example app listening on localhost at port', app.get('port'));
});
