var fs = require('fs');
var path = require('path');

// Cache pages so we don't thrash file lookups
var pageList = [];

// Pages to exlucde from list
var exclusionList = [
    'index.hbs'
];

var formatName = function(slug) {
    return slug.replace(/-/g, ' ');
}

module.exports = function(pageDir) {
    pageDir = pageDir || __dirname + '/../views';

    return {
        // Returns an array of pages found in the views dir
        getPageList: function() {
            if (pageList.length) {
                return pageList;
            }

            var pages = fs.readdirSync(pageDir);

            pages = pages.filter(function(page) {
                return path.extname(page) === '.hbs'
                       && exclusionList.indexOf(page) === -1;
            });

            return pageList = pages.map(function(page) {
                return page.replace('.hbs', '');
            });
        },

        // Returns an object of info about all the pages
        getAllPageInfo: function(currentPage, currentSubpage) {
            var pages = this.getPageList();
            var pageInfo = {};

            pages.map(function(page) {
                var pages = page.split('_');

                if (! pageInfo[pages[0]]) {
                    pageInfo[pages[0]] = {
                        name: formatName(pages[0]),
                        path: pages[0],
                        current: pages[0] == currentPage,
                        subpages: []
                    };
                }

                if (pages.length === 2) {
                    pageInfo[pages[0]].subpages.push({
                        name: formatName(pages[1]),
                        path: pages.join('/'),
                        current: pages[1] == currentSubpage,
                    });
                }
            });

            return pageInfo;
        },

        // Checks a page exists in a view
        pageExists: function(pageName) {
            return this.getPageList().indexOf(pageName) > -1;
        }
    }
}
