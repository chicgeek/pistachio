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

        // Setup section block
        var $section = accordionBlock.element('section').block('accordion__section');
        var sectionBlock = $section.data('p.block');

        // Our returned programmtic API.
        // This allows us to do things beyond the scope of the module and let it
        // play nicely with other modules, elements, etc
        var api = {
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
        }

        // Bind click event listener
        $section.on('click', sectionBlock.elementSelector('title button'), function(e) {
            e.preventDefault();
            api.toggle($(this).parents(accordionBlock.elementSelector('section')));
        });

        return api;
    }
}
