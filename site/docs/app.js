var site = require('../lib/site');
var pages = require('../lib/pages')(__dirname + '/views');
var pageContext = require('../lib/page-context')();

var app = site({
    layoutsDir: __dirname + '/views/layouts',
    viewsDir: __dirname + '/views/',
    staticDir: __dirname + '/../../public/',
    port: 4000
});

// Setup specific page context
pageContext.setPageVars('patterns', {
    sidebar: true,
    icons: require('./data/icons'),
    stickers: require('./data/stickers')
});

// Home page routing
app.get('/', function(req, res) {
    res.render('index', pageContext.get('home', {
        title: 'The front end framework and styleguide for graze.com',
        pages: pages.getAllPageInfo(),
        home: true
    }));
});

// Custom layout page routing
app.get('/layouts/off-screen-menu', function(req, res) {
    var page = 'layouts_off-screen-menu';

    res.render(page, pageContext.get('/layouts/off-screen-menu', {
        layout: 'blank',
        title: page.replace(/(-|_)/g, ' ')
    }));
});

// Top level page routing
app.get('/:page', function(req, res) {
    var page = req.params.page;

    if (pages.pageExists(page)) {
        var pageList = pages.getAllPageInfo(page);

        return res.render(page, pageContext.get(page, {
            title: page.replace(/(-|_)/g, ' '),
            pages: pageList,
            subpages: pageList[page].subpages
        }));
    }
});

// Subpage routing
app.get('/:page/:subpage', function(req, res) {
    var page = req.params.page;
    var subpage = req.params.subpage;
    var pageName = [page, subpage].join('_');

    if (pages.pageExists(pageName)) {
        var pageList = pages.getAllPageInfo(page, subpage);

        return res.render(pageName, pageContext.get(page, {
            title: pageName.replace(/(-|_)/g, ' '),
            pages: pageList,
            subpages: pageList[page].subpages
        }));
    }
});

// Launch app
app.listen(app.get('port'), function () {
    console.log('Example app listening on localhost at port', app.get('port'));
});

