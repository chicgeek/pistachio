// Always export a function which takes jQuery as an argument
// This ensures each module is testable
module.exports = function($) {
    /**
     * Off screen menu component.
     * Sets up JavaScript enhahcement for browsers that don't support the CSS only method:
     *
     * 1) Android stock browser (all versions)
     * 2) iOS safari < 5
     *
     * @param  jQuery node $offScreen
     *
     * @return object
     */
    return function($offScreen) {
        // Setup
        var $offScreenTrigger = $offScreen;
        var $offScreenMenu = $('.off-screen-menu:first');
        var $offScreenPageWrapper = $('.page-wrapper:first');
        var $offScreenHeader = $('.off-screen-header:first');

        // Our returned programmtic API
        var api = {
            init: function() {
                initOffScreen();
            },
            requiresJsSupport: function() {
                if (detectAndroidStockBrowser() || iOSversion() < 5) {
                    return true;
                }
            }
        }

        function initOffScreen() {
            // Bind click event listener
            $offScreenTrigger.on('click', function(e) {
                $(this).toggleClass('off-screen--active');
                $offScreenMenu.toggleClass('off-screen--active');
                $offScreenPageWrapper.toggleClass('off-screen--active');
                $offScreenHeader.toggleClass('off-screen--active');

                e.preventDefault();
            });
        }

        function iOSversion() {
            if (/iP(hone|od touch|ad)/.test(navigator.platform)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            }
        }

        function detectAndroidStockBrowser() {
            var nua = navigator.userAgent;
            var isAndroid = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
            return isAndroid;
        }

        // Initialise off screen menu js for browsers that don't support the CSS only method
        if (api.requiresJsSupport()) {
            api.init();
        }

        return api;
    }
}
