var loadTestEnv = require('../dom/body');
var fs = require('fs');

describe('Test accordion module:', function() {
    // vars to setup before running tests
    var $body;
    var $accordion;
    var accordionBlock;
    var accordionApi;

    describe('Setup module:', function() {
        it('Should setup the module', function() {
            // Run this before any tests
            runs(function() {
                var html = fs.readFileSync(__dirname + '/../html/accordion-module.html', 'utf-8');

                loadTestEnv(html, function($b) {
                    var $ = require('../../../js/src/jquery');
                    var accordionFactory = require('../../../js/src/modules/accordion')($);

                    // Assign vars
                    $body = $b;
                    $accordion = $body.find('.accordion');
                    accordionApi = accordionFactory($accordion);
                    accordionBlock = $accordion.data('p.block');
                });
            });

            // Confirm that our dependencies are set before running tests
            waitsFor(function() {
                return $body && $accordion && accordionBlock && accordionApi;
            });
        });
    });

    describe('Test module setup:', function() {
        it('Should be an object', function() {
            expect(accordionApi).toBeTypeOf('object');
        });

        it('Should be an object', function() {
            expect(accordionApi).toBeTypeOf('object');

            expect(accordionApi.show).toBeTypeOf('function');
            expect(accordionApi.hide).toBeTypeOf('function');
            expect(accordionApi.toggle).toBeTypeOf('function');
            expect(accordionApi.showAll).toBeTypeOf('function');
            expect(accordionApi.hideAll).toBeTypeOf('function');
        });
    });

    describe('Test module API:', function() {
        it('Should show/hide the accordion content', function() {
            var $section = accordionBlock.element('section:eq(2)');

            accordionApi.show($section);
            expect($section.hasClass('accordion__section--active')).toBe(true);

            accordionApi.showAll();
            expect($section.hasClass('accordion__section--active')).toBe(true);

            accordionApi.hide($section);
            expect($section.hasClass('accordion__section--active')).toBe(false);

            accordionApi.showAll();
            accordionApi.hideAll();
            expect($section.hasClass('accordion__section--active')).toBe(false);
        });
    });

    describe('Test module events:', function() {
        it('Should show the accordion content', function() {
            var $section = accordionBlock.element('section:first');
            var sectionBlock = $section.block('accordion__section').data('p.block');
            var $button = sectionBlock.element('title button');

            accordionApi.hideAll();

            $button.trigger('click');
            expect($section.hasClass('accordion__section--active')).toBe(true);

            $button.trigger('click');
            expect($section.hasClass('accordion__section--active')).toBe(false);
        });
    });
});
