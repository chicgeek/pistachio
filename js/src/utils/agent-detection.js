/**
 * Sets up some general user agent detection functions
 * Could potentially be replaced by modernizr in future if it gets out of control
 *
 * @param  jQuery $
 *
 * @return object
 */
module.exports = function() {
    var api = {
        iOSversion: function() {
            if (/iP(hone|od touch|ad)/.test(navigator.platform)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                return parseInt(v[1], 10);
            }
        },
        detectAndroidStockBrowser: function() {
            var nua = navigator.userAgent;
            var isAndroid = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
            return isAndroid;
        }
    }

    return api;
}
