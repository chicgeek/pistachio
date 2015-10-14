/**
 * Info
 * ---
 * This file should not be pulled in to a page via an HTTP request (src=".../")
 * to make the check more performant and prevent layout issues if the script is
 * ever blocked
 */

(function(document, window) {
    var cutsTheMustard = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window);

    if (cutsTheMustard) {
        document.documentElement.className = document.documentElement.className.replace(/\bexperience-core\b/g, 'experience-enhanced');
    }
})(document, window);
