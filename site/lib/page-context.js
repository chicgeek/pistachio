var lodash = require('lodash');

module.exports = function pageContext() {
    var global = {};
    var pages = {};
    var api = {};

    api.setGlobalVar = function(name, value) {
        global[name] = value;
    }

    api.setPageVars = function(page, values) {
        pages[page] = values;
    }

    api.get = function(name, context) {
        var page = name in pages ? pages[name] : {};

        context = context || {};

        return lodash.assign(context, page, global);
    }

    return api;
}
