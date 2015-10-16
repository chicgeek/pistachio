var loadTestEnv = require('../dom/body');
var fs = require('fs');

describe('Test jQuery BEM plugin:', function() {
    // vars to setup before running tests
    var $body;
    var $module;
    var $moduleBlock;

    describe('Setup plugin:', function() {
        it('Should setup the plugin', function() {
            // Run this before any tests
            runs(function() {
                var html = fs.readFileSync(__dirname + '/../html/bem-module.html', 'utf-8');

                loadTestEnv(html, function($b) {
                    var $ = require('../../../js/src/jquery');

                    // Assign vars
                    $body = $b;
                    $module = $body.find('.module').block('module');
                    $moduleBlock = $module.data('p.block');
                });
            });

            // Confirm that our dependencies are set before running tests
            waitsFor(function() {
                return $body && $module && $moduleBlock;
            });
        });
    });

    describe('Test plugin setup:', function() {
        it('Should be an object', function() {
            expect($moduleBlock).toBeTypeOf('object');
        });

        it('Should be the same object', function() {
            expect($moduleBlock).toBe($module.data('p.block'));
        });
    });

    describe('Test plugin methods:', function() {
        it('Should return the right element contents', function() {
            expect($moduleBlock.element('heading h1').text()).toBe('Title');
        });

        it('Should return the right amount of elements', function() {
            expect($moduleBlock.element('body').length).toBe(1);
            expect($moduleBlock.element('heading').length).toBe(1);
        });

        it('Should set the correct modifier', function() {
            $moduleBlock.addModifier('active');
            expect($module.attr('class')).toBe('module module--active');

            $moduleBlock.removeModifier('active');
            expect($module.attr('class')).toBe('module');

            $moduleBlock.toggleModifier('toggled');
            expect($module.attr('class')).toBe('module module--toggled');

            $moduleBlock.toggleModifier('toggled');
            expect($module.attr('class')).toBe('module');
        });

        it('Should return the right selector', function() {
            expect($moduleBlock.element('heading').attr('class'))
            .toBe($moduleBlock.elementSelector('heading').replace('.', ''));
        });
    });
});
