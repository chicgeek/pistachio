// Import mock document and jasmine node
var domReady = require('./dom/window');
var jasmine = require('jasmine-node');

// Import extensions (attacheds to jasmine global)
require('./jasmine-extensions');

// Run all tests on /specs dir on mocked 'DOM ready'
domReady(function(window) {
    global.document = global.document || {};

    jasmine.executeSpecsInFolder({
        specFolders: [__dirname + '/specs'],
        isVerbose: true,
        showColours: true,
        onComplete: function(){
            process.exit();
        }
    });
});
