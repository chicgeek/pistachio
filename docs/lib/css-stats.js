var fs = require('fs');
var path = require('path');
var moment = require('moment');

var resultsDir = __dirname + '/../../tests/results/';
var data = [];

var formatData = function(name, data) {
    var date = moment(data.published)

    return {
        name: name,
        date: date.format('DD/MM/YY HH:mm'),
        size: (data.size / 1024).toFixed(2),
        sizeGzip: (data.gzippedSize / 1024).toFixed(2),
        rules: data.rules,
        selectors: data.selectors
    };
}

module.exports = function getStats() {
    // Only compile data once
    if (data.length) {
        return data;
    }

    var results = fs.readdirSync(resultsDir);

    // JSON only please
    results = results.filter(function(result) {
        return path.extname(results) === '.json';
    });

    results.forEach(function(result) {
        data.push(formatData(
            result.replace('.json', '.css'),
            require(resultsDir + result)
        ));
    });

    return data;
}
