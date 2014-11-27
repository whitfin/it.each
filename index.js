var async = require('async'),
    format = require('util').format;

module.exports = function(opts) {

    var _opts = opts || {};

    it.each = function (iterator, title, fields, process) {

        if(_opts.testPerIteration) {

            iterator.forEach(function (test, index) {

                var testName = title;

                if (typeof fields != 'function') {
                    testName = format.apply(this, generateArgs(test, title, fields, index));
                } else {
                    process = fields;
                }

                it(testName, process.bind(null, test));

            });

        } else {

            it('should begin a loop', function (done) {
                var multiplier = iterator.length || Object.keys(iterator).length,
                    that = this,
                    x = 0;

                this.slow(this.slow * multiplier);
                this.timeout(this.timeout * multiplier);

                async.eachSeries(iterator, function (element, next) {

                    x += 1;

                    var progress = ' - ' + x + '/' + iterator.length;
                    if (typeof fields != 'function') {
                        var args = generateArgs(element, title, fields, x);
                        that._runnable.title = format.apply(this, args) + progress;
                    } else {
                        that._runnable.title = title + progress;
                        process = fields;
                    }

                    process(element, next);

                }, done);
            });

        }
    }

};

/**
 * Generic replacement of the test name to a
 * dynamic name with a set of fields. Replaces
 * any format sequences with the given values,
 * and replaces 'x' with the current iteration.
 *
 * @param test		the test we're running
 * @param title		the test title to replace
 * @param fields	the fields to replace with
 * @param index		the index of the iteration
 */
function generateArgs(test, title, fields, index){
    var formatting = fields.concat(),
        args = (formatting.unshift(title), formatting);
    for (var i = 1; i <= args.length - 1; i++) {
        if (args[i] == 'x') {
            args[i] = index;
        } else if (args[i] == 'element') {
            args[i] = test;
        } else {
            if (!test[args[i]]) {
                var keys = args[i].split('.');
                var ref = test;
                for (var j = 0; j < keys.length - 1; j++) {
                    ref = ref[keys[j]] || {};
                }
                args[i] = ref[keys[keys.length - 1]];
            } else {
                args[i] = test[args[i]];
            }
        }
    }
    return args;
}