// Always export a function which takes jQuery as an argument
// This ensures each module is testable
module.exports = function($) {
    /**
     * Off screen menu component.
     * Sets up event listeners on title click to open/close the off screen menu
     *
     * @param  jQuery node $accordion
     *
     * @return object
     */
    return function($offScreen) {
        // Setup
        var $offScreenTrigger = $offScreen;
        var $offScreenMenu = $('.off-screen-menu:first');
        var $offScreenPageWrapper = $('.page-wrapper:first');
        var $offScreenHeader = $('.off-screen-header:first');

        // Our returned programmtic API.
        // This allows us to do things beyond the scope of the module and let it
        // play nicely with other modules, elements, etc
        var api = {
            init: function() {
                initOffScreen();
            },
            // Show off screen menu
            show: function($elem) {
                $offScreenMenu.addClass('off-screen--active');
                $offScreenPageWrapper.addClass('off-screen--active');
                $offScreenHeader.addClass('off-screen--active');
            },
            // Hide off screen menu
            hide: function($elem) {
                $offScreenMenu.removeClass('off-screen--active');
                $offScreenPageWrapper.removeClass('off-screen--active');
                $offScreenHeader.removeClass('off-screen--active');
            }
        }

        function initOffScreen() {
            // Bind click event listener
            $offScreenTrigger.on('click', function(e) {
                $offScreenMenu.toggleClass('off-screen--active');
                $offScreenPageWrapper.toggleClass('off-screen--active');
                $offScreenHeader.toggleClass('off-screen--active');

                e.preventDefault();
            });
        }

        // initialise off screen menu
        api.init();

        return api;
    }
}
