// Get jQuery lib
var $ = require('jquery');

// Plugin factory sets up a new $.fn
var pluginFactory = require('../utils/plugin-factory');

/**
 * Register jQuery plugins here
 */

// BEM block helper
pluginFactory($, 'block', require('./plugins/block'));

// Export jQuery lib and set global
module.exports = global.jQuery = $;
