// Some general utils for user agent detection.
// Could potentially be replaced by modernizr in future if it gets out of control
var agentDetection = require('../utils/agent-detection')($);

// Always export a function which takes jQuery as an argument
// This ensures each module is testable
module.exports = function($) {
    /**
     * Form Field component
     * Handles styling of radio and checkbox labels when checked
     *
     * @param  jQuery node $formField
     *
     * @return object
     */
    return function($formField) {
        // Setup
        var formFieldBlock = $formField.block('form-select').data('p.block');
        var $items = formFieldBlock.element('item').block('form-select__item');
        var itemsBlock = $items.data('p.block');

        // Our returned programmatic API
        var api = {
            init: function() {
                initFormSelect();
            },
            select: function($elem) {
                var block = $elem.data('p.block');
                block.addModifier('active');
            },
            selectAll: function() {
                $items.each(function() {
                    var block = $(this).data('p.block');
                    block.addModifier('active');

                    // only set checked state on checkboxes
                    // you shouldn't ever deselectAll on radio buttons (that's not how they work)
                    $(this).find('input[type="checkbox"]').prop('checked', true);
                });
            },
            deselect: function($elem) {
                var block = $elem.data('p.block');
                block.removeModifier('active');
            },
            deselectAll: function() {
                $items.each(function() {
                    var block = $(this).data('p.block');
                    block.removeModifier('active');

                    // only remove checked state on checkboxes
                    // you shouldn't ever selectAll on radio buttons (that's not how they work)
                    $(this).find('input[type="checkbox"]').prop('checked', false);
                });
            }
        }

        function initFormSelect() {
            $items.each(function() {
                // empty onclick handler for labels so labels work on ios safari < 6
                // http://stackoverflow.com/questions/7358781/
                if (agentDetection.iOSversion() < 6) {
                    $(this).on("click", function(e) {});
                }

                // set up initial appearance of checked inputs
                if($(this).find('input[type="radio"], input[type="checkbox"]').is(':checked')) {
                    api.select($(this));
                }

                // set up radio button event listeners
                $(this).find('input[type="radio"]').on("change", function(e) {
                    api.deselectAll();

                    if($(this).is(':checked')) {
                        api.select($(this).parent());
                    }
                });

                // set up checkbox event listeners
                $(this).find('input[type="checkbox"]').on("change", function(e) {
                    if($(this).is(':checked')) {
                        api.select($(this).parent());
                    } else {
                        api.deselect($(this).parent());
                    }
                });
            });
        }

        api.init();

        return api;
    }
}
