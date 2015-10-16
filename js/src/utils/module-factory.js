/**
 * Returns a component module and sets up automatic loading
 *
 * @param  jQuery $
 *
 * @return function
 */
module.exports = function($) {
    // Returns a function with jQuery in scope
    return function(name, opts) {
        // Init the factory function
        var factory = opts.module($);

        // If autoloading, bind module to matching DOM node
        if (opts.autoload) {
            $(document).ready(function() {
                // e.g. data-p-module="accordion"
                var $module = $('[data-p-module="' + name + '"]');

                if ($module.length) {
                    // One instance per node
                    $module.each(function() {
                        // Setup programmatic API
                        var api = factory($(this));

                        $(this).data('p.' + name, api);

                        // Trigger init event and pass through exposed API
                        $(this).trigger('p.' + name + '.init', api);
                    });
                }
            });
        }

        return factory;
    }
}
