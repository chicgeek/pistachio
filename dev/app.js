var express = require('express');
var fs = require('fs');

var app = express();

// Template for all pages
var pageLayout = fs.readFileSync(__dirname + '/layout.html', 'utf8');

// Adds content to template
var renderLayout = function(data) {
    return pageLayout.replace('{{ page }}', data);
}

// Looks up page and renders it if found
var renderPage = function(name, cb) {
    fs.readFile(__dirname + '/pages/' + name + '.html', 'utf8', function(err, data) {
        if (err) {
            return renderPage('example', cb);
        }

        return cb(renderLayout(data));
    });
}

app.use(express.static(__dirname + '/public'));

app.get('/:module', function(req, res) {
    renderPage(req.params.module, function(page) {
        res.send(page);
    });
});

var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});
