var fs = require('fs');
var path = require('path');

// Cache pages so we don't thrash file lookups
var pageList = [];

module.exports = {
    // Returns an array of pages found in the views dir
    getPageList: function() {
        if (pageList.length) {
            return pageList;
        }

        var pages = fs.readdirSync(__dirname + '/views');

        pages = pages.filter(function(page) {
            return path.extname(page) === '.hbs';
        });

        return pageList = pages.map(function(page) {
            return page.replace('.hbs', '');
        });
    },

    // Returns an object of info about all the pages
    getAllPageInfo: function(currentPage) {
        var pages = this.getPageList();

        return pages.map(function(page) {
            return pageInfo = {
                name: page.replace(/(-|_)/, ' '),
                path: page,
                current: currentPage === page
            }
        });
    },

    // Checks a page exists in a view
    pageExists: function(pageName) {
        return this.getPageList().indexOf(pageName) > -1;
    }
}
