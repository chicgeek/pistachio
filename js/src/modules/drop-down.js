// Always export a function which takes jQuery as an argument
// This ensures each module is testable
module.exports = function($) {
    /**
     * Drop down menu component.
     *
     * @param  jQuery node $dropDown
     *
     * @return object
     */

    // Dependencies
    var agentDetection = require('../utils/agent-detection')($);

    return function($dropDown) {
        var dropDownBlock = $dropDown.block('nav').data('p.block');
        var $dropDownTabs = dropDownBlock.element('dropdown').block('nav__dropdown');
        var dropDownTabsBlock = $dropDownTabs.data('p.block');

        var dropDownOffScreenBreakpoints = dropDownBlock.getAttr('data-dropdown-offscreen');
        var dropDownOffScreenArray = dropDownOffScreenBreakpoints ? dropDownOffScreenBreakpoints.split(",") : null;

        // Our returned programmatic API
        var api = {
            init: function() {
                init();
            },
            initDropDown: function() {
                initDropDown();
            },
            initOffScreen: function() {
                initOffScreen();
            },
            show: function($elem) {
                var block = $elem.data('p.block');
                block.addModifier('active');
                block.element('item').attr('aria-expanded','true');
            },
            hide: function($elem) {
                var block = $elem.data('p.block');
                block.removeModifier('active');
                block.element('item').attr('aria-expanded','false');
            },
            toggle: function($elem) {
                if ($elem.data('p.block').hasModifier('active')) {
                    api.hide($elem);
                } else {
                    api.show($elem);
                }
            },
            resetAllBindings: function() {
                $('html').off('click touchstart', api.resetDropDown);
                $dropDownTabs.off('click', dropDownTabsBlock.elementSelector('item') + ":first", clickDropDown);
                $dropDownTabs.off('mouseenter', api.resetActiveStates);
                $dropDownTabs.off('click', dropDownTabsBlock.elementSelector('item') + ":first", clickOffScreen);
                api.resetActiveStates();
            },
            resetActiveStates: function() {
                $dropDownTabs.each(function() {
                    dropDownTabsBlock.element('item').attr('aria-expanded','false');
                    $(this).removeClass('nav__dropdown--active');
                });
            },
            getViewportSize: function() {
                return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
            }
        }

        function init() {
            // When drop-down has optional off screen menu data attribute, handle differently
            if(dropDownOffScreenArray) {
                if ($.inArray(api.getViewportSize(), dropDownOffScreenArray) > -1) {
                    api.resetAllBindings();
                    api.initOffScreen();
                } else {
                    api.resetAllBindings();
                    api.initDropDown();
                }
            } else {
                api.initDropDown();
            }
        }

        function initDropDown() {
            // Allow a click anywhere on page to close any open dropdowns
            $('html').on('click touchstart', api.resetActiveStates);

            // bind click event to individual dropdown tabs
            $dropDownTabs.on('click', dropDownTabsBlock.elementSelector('item') + ":first", clickDropDown);

            // handle mouseenter (hover) event to close any drop down menus previously opened by touch or keyboard
            $dropDownTabs.on('mouseenter', api.resetActiveStates);
        }

        function clickDropDown(e) {
            api.resetActiveStates();
            api.show($(this).parent());
            e.preventDefault(); // Stop top level links from being followed
            e.stopPropagation(); // Stop a click on the dropdown menu propagating up the DOM so it's not registered as a click on the page
        }

        function initOffScreen() {
            // bind click event to individual dropdown tabs
            $dropDownTabs.on('click', dropDownTabsBlock.elementSelector('item') + ":first", clickOffScreen);
        }

        function clickOffScreen(e) {
            console.log('click');
            api.toggle($(this).parent());
            e.preventDefault(); // Stop top level links from being followed
        }

        if (dropDownOffScreenArray) {
            // Reinitialise dropdown on window resize for all but Safari iOS < 6
            // Because Safari iOS < 6 throws erroneous resize events all the time
            if (! agentDetection.iOSversion() || agentDetection.iOSversion() > 6) {
                var oldBreakpoint = api.getViewportSize();

                $(window).resize(function() {
                    var newBreakpoint = api.getViewportSize();
                    // only reinitialise if breakpoints have changed
                    if (newBreakpoint !== oldBreakpoint) {
                        api.init();
                    }
                    oldBreakpoint = newBreakpoint;
                });
            }
        }

        api.init();

        return api;
    }
}
