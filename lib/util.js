var dots = require('dot-notes');

/**
 * Generic replacement of the test name to a dynamic name
 * with a set of fields. Replaces any format sequences with
 * the given values, and replaces 'x' with the current iteration.
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
        if (args[i] === 'x') {
            args[i] = index;
        } else if (args[i] === 'element') {
            args[i] = test;
        } else {
            args[i] = dots.get(test, args[i]);
        }
    }
    return args;
}

/**
 * Asynchronous loop implementation, taken from the async
 * library and extracted into this module to avoid a heavy
 * dependency load.
 *
 * @param arr       the array to move through
 * @param iterator  the iterator function
 * @param callback  the callback to call after completion
 */
function loop(arr, iterator, callback) {
    callback = callback || function () {};
    if (!arr.length) {
        return callback();
    }
    var completed = 0;
    (function iterate() {
        iterator(arr[completed], function (err) {
            if (err) {
                callback(err);
                callback = function () {};
            } else {
                completed += 1;
                if (completed >= arr.length) {
                    callback();
                } else {
                    iterate();
                }
            }
        });
    })();
}

exports.generateArgs = generateArgs;
exports.loop = loop;
