// Always export a function which takes jQuery as an argument
// This ensures each module is testable
module.exports = function($) {
    /**
     * Off screen menu component.
     *
     * a) Provides some limited js support for what is mostly a css only off screen menu
     * b) Sets up JavaScript enhahcement for browsers that don't support the CSS only method:
     *
     * 1) Android stock browser (all versions)
     * 2) iOS safari < 5
     *
     * @param  jQuery node $offScreen
     *
     * @return object
     */

     // Some general utils for user agent detection.
     // Could potentially be replaced by modernizr in future if it gets out of control
     var agentDetection = require('../utils/agent-detection')($);

    return function($offScreen) {
        // Setup
        var $offScreenTriggerLabel = $offScreen;
        var $offScreenMenu = $('.off-screen-menu:first');
        var $offScreenPageWrapper = $('.page-wrapper:first');
        var $offScreenHeader = $('.off-screen-header:first');

        // Our returned programmatic API
        var api = {
            init: function() {
                initOffScreen();
            },
            initOffScreenAndroidStock: function() {
                initOffScreenAndroidStock();
            },
            initOffScreenIos: function() {
                initOffScreenIos();
            },
            androidJsSupport: function() {
                if (agentDetection.detectAndroidStockBrowser()) {
                    return true;
                }
            },
            iOSJsSupport: function() {
                if (agentDetection.iOSversion() < 5) {
                    return true;
                }
            }
        }

        function initOffScreen() {
            // Set to position for page wrapper to use when position is fixed
            $offScreenPageWrapper.css("top", $offScreenHeader.outerHeight(true));

            // Initialise extra off screen menu js for android browsers that don't support the CSS only method
            if (api.androidJsSupport()) {
                api.initOffScreenAndroidStock();
            }

            // Initialise extra off screen menu js for iOS browsers that don't support the CSS only method
            if (api.iOSJsSupport()) {
                api.initOffScreenIos();
            }
        }

        function initOffScreenAndroidStock() {
            // Android stock browser requires a new class added
            $offScreenTriggerLabel.on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('off-screen--active');
                $offScreenMenu.toggleClass('off-screen--active');
                $offScreenPageWrapper.toggleClass('off-screen--active');
                $offScreenHeader.toggleClass('off-screen--active');
            });
        }

        function initOffScreenIos() {
            // even though :checked is not working in ios < 5 via css,
            // as soon as we bind to click function it does work!
            // So we remove the checked state from checkbox to avoid
            // both :checked and .off-screen--active styles being applied
            $offScreenTriggerLabel.on('click', function(e) {
                $('#off-screen-trigger').removeAttr('checked');
                $(this).toggleClass('off-screen--active');
                $offScreenMenu.toggleClass('off-screen--active');
                $offScreenPageWrapper.toggleClass('off-screen--active');
                $offScreenHeader.toggleClass('off-screen--active');
            });
        }

        api.init();

        return api;
    }
}
