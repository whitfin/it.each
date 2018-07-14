var util = require('../lib/util');

require('should');

describe('Asynchronous Looping', function () {
    it('should exit if a non-array value is provided', function (done) {
        var count = 0;
        util.loop(1, function (_element, next) {
            count++;
            next();
        }, function () {
            count.should.eql(0);
            done();
        });
    });

    it('should pass errors up the call stack', function (done) {
        var count = 0;
        util.loop([1,2,3], function (_element, next) {
            count++;
            next(new Error('My Error!'));
        }, function (err) {
            err.should.be.ok;
            count.should.eql(1);
            done();
        });
    });
});
