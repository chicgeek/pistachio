// Always export a function which takes jQuery as an argument
// This ensures each module is testable
module.exports = function($) {
    /**
     * Accordion component.
     * Sets up event listeners on title click to open/close accordion sections
     *
     * @param  jQuery node $accordion
     *
     * @return object
     */

     // Some general utils for user agent detection.
     // Could potentially be replaced by modernizr in future if it gets out of control
     var agentDetection = require('../utils/agent-detection')($);

    return function($accordion) {
        // Setup accordion block
        var accordionBlock = $accordion.block('accordion').data('p.block');

        // Setup Breakpoints if specified
        var accordionBlockBreakpoints = accordionBlock.getAttr('data-accordion-responsive');
        var accordionBlockBreakpointsArray = accordionBlockBreakpoints ? accordionBlockBreakpoints.split(",") : null;

        // Setup section block
        var $section = accordionBlock.element('section').block('accordion__section');
        var sectionBlock = $section.data('p.block');

        // Our returned programmatic API
        var api = {
            init: function() {
                initAccordion();
            },
            // Enable an accordion
            enable: function($elem) {
                var block = $elem.data('p.block');
                var blockId = 'accordion_' + $elem.data('p.block').generateRandomId();
                var titleId = blockId + '_title';
                var contentId = blockId + '_content';
                var blockHasSiblings = $elem.siblings(block).length;

                // enable the accordion
                block.addModifier('enabled');

                // setup visual appearance/accessiblity attributes
                $elem.attr('id',blockId);
                block.element('title').addClass(block.elementClass('title--icon'));
                block.element('title').attr('tabindex','0');
                block.element('title').attr('aria-controls',contentId);
                block.element('content').attr('aria-labelledby',titleId);
                if (blockHasSiblings) {
                    $elem.parent('.accordion').attr('role','tablist');
                    block.element('title').attr('role','tab');
                    block.element('content').attr('role','tabpanel');
                }
            },
            // Disable an accordion
            disable: function($elem) {
                var block = $elem.data('p.block');
                var blockHasSiblings = $elem.siblings(block).length;

                // disable the accordion
                block.removeModifier('enabled');

                // remove visual appearance/accessiblity attributes
                $elem.removeAttr('id');
                block.element('title').removeClass(block.elementClass('title--icon'));
                block.element('title').removeAttr('tabIndex');
                block.element('title').removeAttr('aria-controls');
                block.element('content').removeAttr('aria-labelledby');
                if (blockHasSiblings) {
                    $elem.parent('.accordion').removeAttr('role');
                    block.element('title').removeAttr('role');
                    block.element('content').removeAttr('role');
                }
            },
            // Show an accordion section
            show: function($elem) {
                var block = $elem.data('p.block');
                block.addModifier('active');

                // setup accessiblity attributes
                block.element('title').attr('aria-expanded','true');
                block.element('content').attr('aria-hidden','false');
            },
            // Hide an accordion section
            hide: function($elem) {
                var block = $elem.data('p.block');
                block.removeModifier('active');

                // remove accessiblity attributes
                block.element('title').attr('aria-expanded','false');
                block.element('content').attr('aria-hidden','true');
            },
            // Toggle a section
            toggle: function($elem) {
                if ($elem.data('p.block').hasModifier('active')) {
                    api.hide($elem);
                } else {
                    api.show($elem);
                }
            },
            // Get value of pseudo element appended to body tag in pistachio.css
            getViewportSize: function() {
                return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
            }
        }

        // initialise accordion
        function initAccordion() {
            $section.each(function() {
                // Remove previous bindings
                $(this).off('click keydown', sectionBlock.elementSelector('title') + ':first');

                // Default state of accordion based on provided breakpoints
                if(accordionBlockBreakpointsArray) {
                    if ($.inArray(api.getViewportSize(), accordionBlockBreakpointsArray) > -1) {
                        api.enable($(this));
                        api.hide($(this));
                    } else {
                        api.disable($(this));
                        api.show($(this));
                    }
                } else {
                    api.enable($(this));
                    api.hide($(this));
                }
            });

            // Bind click and keydown event listener
            // valid keycodes are [1, 13, 32] - mouseclick, spacebar and enter key
            $section.on('click keydown', sectionBlock.elementSelector('title') + ':first', function(e) {
                if (sectionBlock.hasModifier('enabled') && [1, 13, 32].indexOf(e.which) > -1) {
                    api.toggle($(this).parent(accordionBlock.elementSelector('section')));
                    e.preventDefault();
                }
            });
        }

        // Default initialise of accordion
        api.init();

        // Check if we have a responsive accordion
        if (accordionBlockBreakpointsArray) {
            // Reinitialise accordion on window resize for all but Safari iOS < 6
            // Because Safari iOS < 6 throws erroneous resize events all the time
            if (! agentDetection.iOSversion() || agentDetection.iOSversion() > 6) {
                var resizeEventId;
                $(window).resize(function() {
                    clearTimeout(resizeEventId);
                    resizeEventId = setTimeout(api.init, 100);
                });
            }
        }

        // Make api available
        return api;
    }
}
