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
    return function($accordion) {
        // Setup accordion block
        var accordionBlock = $accordion.block('accordion').data('p.block');

        // Setup Breakpoints if specified
        var accordionBlockBreakpoints = accordionBlock.getDataAttr('data-accordion-responsive');
        var accordionBlockBreakpointsArray = accordionBlockBreakpoints ? accordionBlockBreakpoints.split(",") : null;

        // Setup section block
        var $section = accordionBlock.element('section').block('accordion__section');
        var sectionBlock = $section.data('p.block');

        // Our returned programmtic API.
        // This allows us to do things beyond the scope of the module and let it
        // play nicely with other modules, elements, etc
        var api = {
            init: function() {
                initAccordion();
            },
            // Show a section
            show: function($elem) {
                $elem.data('p.block').addModifier('active');
            },
            // Hide a section
            hide: function($elem) {
                $elem.data('p.block').removeModifier('active');
            },
            // Toggle a section
            toggle: function($elem) {
                $elem.data('p.block').toggleModifier('active');
            },
            // Show all sections
            showAll: function() {
                $section.each(function() {
                    $(this).data('p.block').addModifier('active');
                });
            },
            // Hide all sections
            hideAll: function() {
                $section.each(function() {
                    $(this).data('p.block').removeModifier('active');
                });
            },
            // Get value of pseudo element appended to body tag in pistachio.css
            getViewportSize: function() {
                return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
            }
        }

        function initAccordion() {
            $section.each(function() {
                // Remove previous bindings
                $(this).off('click', sectionBlock.elementSelector('title') + ':first');

                // Default state of accordion based on provided breakpoints
                if(accordionBlockBreakpointsArray) {
                    if ($.inArray(api.getViewportSize(), accordionBlockBreakpointsArray) > -1) {
                        api.hide($(this));
                    } else {
                        api.show($(this));
                    }
                }
            });

            // Bind click event listener
            $section.on('click', sectionBlock.elementSelector('title') + ':first', function(e) {
                if(accordionBlockBreakpointsArray) {
                    // Set up responsive accordion if breakpoints are specified
                    if ($.inArray(api.getViewportSize(), accordionBlockBreakpointsArray) > -1) {
                        e.preventDefault();
                        api.toggle($(this).parent(accordionBlock.elementSelector('section')));
                    }
                } else {
                    // if no breakpoints specified, set up accordion at all viewport sizes
                    e.preventDefault();
                    api.toggle($(this).parent(accordionBlock.elementSelector('section')));
                }
            });
        }

        // reinit on window resize
        $(window).resize(function() {
            initAccordion();
        });

        // initialise accordion
        api.init();

        return api;
    }
}
