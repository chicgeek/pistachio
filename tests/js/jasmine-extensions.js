/**
 * Matcher extensions
 */

// Test typeof (typeof var  === type)
jasmine.Matchers.prototype.toBeTypeOf = function() {
    var type = arguments[0];

    if (! type) {
        throw('no type specified');
    }

    return typeof this.actual === type;
}
