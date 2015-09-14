var site = require('../lib/site');
var pages = require('../lib/pages')(__dirname + '/views');
var pageContext = require('../lib/page-context')();

var app = site({
    layoutsDir: __dirname + '/views/layouts',
    viewsDir: __dirname + '/views/',
    staticDir: __dirname + '/../../'
});

// Setup specific page context
pageContext.setPageVars('css-stats', {
    stats: require('../lib/css-stats')()
});

// All page routing
app.get('/:page', function(req, res) {
    var page = req.params.page;

    if (pages.pageExists(page)) {
        return res.render(page, pageContext.get(page, {
            title: page.replace(/(-|_)/g, ' '),
            pages: pages.getAllPageInfo(page)
        }));
    }
});

// Home page routing
app.get('/', function(req, res) {
    res.render('index', pageContext.get('home', {
        title: 'home',
        pages: pages.getAllPageInfo()
    }));
});

// Launch app
app.listen(app.get('port'), function () {
    console.log('Example app listening on localhost at port', app.get('port'));
});
