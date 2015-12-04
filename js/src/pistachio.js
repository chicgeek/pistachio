// jQuery is used to access and manipulate DOM nodes
// here we pull in a version with plugins attached
var $ = require('./jquery');

// Module factory injects jQuery and sets up reusable module
var moduleFactory = require('./utils/module-factory')($);

// Define a name: (object) opts pairing which is attached to global pistachio object
// and instantiated
//
// Options
// ---
// opts: {
//     module: required module
//     autoload: binds module to data atribute with module name
// }
var modules = {
    'accordion': moduleFactory('accordion', {
        module: require('./modules/accordion'),
        autoload: true
    }),
    'offScreen': moduleFactory('offScreen', {
        module: require('./modules/off-screen-menu'),
        autoload: true
    }),
    'formField': moduleFactory('formField', {
        module: require('./modules/form-field'),
        autoload: true
    })
};

// Setup global pistachio object.  global = window in client
global.pistachio = global.pistachio || {};

// Attach each module to global object
for (var prop in modules) {
    global.pistachio[prop] = modules[prop]
}

// Trigger pistachio init function
$('body').trigger('p.init', {
    pistachio: global.pistachio
})
