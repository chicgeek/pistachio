/**
 * pluginFactory
 * ---
 * binds a function to jQuery prototype to allow node specific methods
 *
 * @param  function $          jQuery lib
 * @param  string   pluginName
 * @param  function plugin
 */
module.exports = function($, pluginName, plugin) {
    // Data key constants
    var DATA = {
        // Internal accesses internal values specific to each node/node list
        INTERNAL: '_p-data-' + pluginName,
        // API is the programmatic API data bound to each node
        API: 'p.' + pluginName
    };

    // Bind plugin to jQuery prototype
    // Pass in opts, can be any type or null
    $.fn[pluginName] = function(opts) {
        // Apply plugin to each node in a list
        return this.each(function() {
            var $this = $(this);

            // Set internal data
            $this.data(
                DATA.INTERNAL,
                $this.data(DATA.INTERNAL) || opts || {}
            );

            // Set external data
            $this.data(
                DATA.API,
                $this.data(DATA.API) || {}
            );

            // Call plugin with data
            plugin($, $this, $this.data(DATA.INTERNAL), $this.data(DATA.API));
        });
    };
};
