const format = require('util').format;
const util = require('./util');

module.exports = function(opts) {
    let _opts = opts || {};

    it.each = function (iterator, title, fields, process) {

        let invoke;
        if (this._override) {
            invoke = it[this._override];
        } else {
            invoke = it;
        }

        if (!Array.isArray(iterator)) {
            iterator = [ iterator ];
        }

        if (_opts.testPerIteration) {
            return iterator.forEach(function (test, index) {
                let testName = title;

                if (typeof fields !== 'function') {
                    testName = format.apply(this, util.generateArgs(test, title, fields, index));
                } else {
                    process = fields;
                }

                let binding;
                if (process.length < 2) {
                    binding = function () {
                        process.bind(this)(test);
                    };
                } else {
                    binding = function (done) {
                        process.bind(this)(test, done);
                    };
                }

                invoke(testName, binding);
            });
        }

        invoke(title, function (done) {
            let multiplier = iterator.length || 0, x = 0;

            this.slow(this._runnable._slow * multiplier);
            this.timeout(this._runnable._timeout * multiplier);

            util.loop(iterator, function (element, next) {
                let progress = ' - ' + (++x) + '/' + iterator.length;

                if (typeof fields !== 'function') {
                    let args = util.generateArgs(element, title, fields, x - 1);
                    this._runnable.title = format.apply(this, args) + (multiplier < 2 ? '' : progress);
                } else {
                    this._runnable.title = title + (multiplier < 2 ? '' : progress);
                    process = fields;
                }

                let binding = process.bind(this, element);
                if (process.length < 2) {
                    binding();
                    next();
                } else {
                    binding(next);
                }
            }.bind(this), done);
        });
    };

    it.each.skip = it.each.bind({ _override: 'skip' });
    it.each.only = it.each.bind({ _override: 'only' });
};
