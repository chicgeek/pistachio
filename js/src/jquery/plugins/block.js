/**
 * Block element helper class for easier modification of BEM classes
 * and finding of elements in the block
 *
 * @param  jQuery $
 * @param  jQuery node $block
 * @param  string blockName
 * @param  object api
 *
 * example usage:
 * ---
 * ```
 * var $panel = $('.panel').block('panel');
 * var panelBlock = $panel.data('p.block');
 *
 * // Get body element
 * var $panelBody = panelBlock.element('body');
 *
 * // Set modifier (sets .panel--collapse class)
 * panelBlock.addModifier('collapse');
 * ```
 */
module.exports = function($, $block, blockName, api) {
    // Returns `block__child`
    api.elementClass = function(selector) {
        return blockName + '__' + selector;
    }

    // Returns `.block__child`
    api.elementSelector = function(selector) {
        return '.' + blockName + '__' + selector;
    }

    // Returns `$('.block').find('.block__child')`
    api.element = function(selector) {
        return $block.find(this.elementSelector(selector));
    };

    // Toggles the modifier class of the block with added block name
    api.toggleModifier = function(modifierName, on) {
        var modifierClass = blockName + '--' + modifierName;

        if (typeof on !== 'undefined') {
            return $block.toggleClass(modifierClass, on);
        }

        return $block.toggleClass(modifierClass);
    };

    // Adds the modifier class of the block with added block name
    api.addModifier = function(modifierName) {
        return this.toggleModifier(modifierName, true);
    };

    // Removes the modifier class of the block with added block name
    api.removeModifier = function(modifierName) {
        return this.toggleModifier(modifierName, false);
    };

    // Returns true or false if modifier is present
    api.hasModifier = function(modifierName) {
        return $block.hasClass(blockName + '--' + modifierName);
    };

    // Get attribute value from block
    api.getAttr = function(attr) {
        return $block.attr(attr);
    };

    // Generate random Id
    api.generateRandomId = function() {
        var randomId = (Math.random() + 1).toString(36).substring(2, 7);
        return randomId;
    };
};
