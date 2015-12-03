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
        showColors: true,
        onComplete: function(runner, log) {
            process.stdout.write('\n');

            if (runner.results().failedCount == 0) {
                exitCode = 0;
            } else {
                exitCode = 1;
            }

            process.exit(exitCode);
        }
    });
});
