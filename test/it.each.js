require('should');

describe('it.each with testPerIteration: true', function () {
    require('../index')({
        testPerIteration: true
    });

    it.each([1], 'should be able to access the Mocha context', function (_element) {
        this.slow(1000);
        this.timeout(1000);

        this._runnable.should.be.ok;
        this._runnable._slow.should.be.ok;
        this._runnable._slow.should.eql(1000);
        this._runnable._timeout.should.be.ok;
        this._runnable._timeout.should.eql(1000);
        this._runnable.parent.should.be.ok;
        this._runnable.parent._slow.should.be.ok;
        this._runnable.parent._slow.should.eql(75);
        this._runnable.parent._timeout.should.be.ok;
        this._runnable.parent._timeout.should.eql(2000);
    });

    it.each(1, 'should place non-array values into an array', function (element) {
        element.should.be.ok;
        element.should.eql(1);
    });

    describe('executes', function () {
        this.slow(1000);

        it.each([1], 'synchronously', function (_element) {
            this._runnable.title.length.should.be.greaterThan(1);
        });

        it.each([1], 'asynchronously', function (_element, next) {
            this._runnable.title.length.should.be.greaterThan(1);
            setTimeout(next, 200);
        });
    });

    describe('looping over arrays', function () {
        var count = 0;

        it.each([1], 'should be able to access array elements', function (element) {
            element.should.be.ok;
            element.should.eql(1);
        });

        it.each([1,2,3], 'should loop over each element in an array', function (element) {
            element.should.be.ok;
            element.should.eql(++count);
        });

        it('should increment a count', function () {
            count.should.be.ok;
            count.should.eql(3);
        });
    });

    describe('titles', function () {
        it.each([1], 'should contain the current index: %s', ['x'], function (_element) {
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('0');
        });

        it.each([1], 'should contain the current element: %s', ['element'], function (_element) {
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('1');
        });

        it.each([{ field: 1 }], 'should contain object values: %s', ['field'], function (_element) {
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('1');
        });

        it.each([{ field: { inner: 1 } }], 'should contain nested object values: %s', ['field.inner'], function (_element) {
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('1');
        });
    });
});

describe('it.each with testPerIteration: false', function () {
    require('../index')();

    it.each([1], 'should be able to access the Mocha context', function (_element) {
        this.slow(1000);
        this.timeout(1000);

        this._runnable.should.be.ok;
        this._runnable._slow.should.be.ok;
        this._runnable._slow.should.eql(1000);
        this._runnable._timeout.should.be.ok;
        this._runnable._timeout.should.eql(1000);
        this._runnable.parent.should.be.ok;
        this._runnable.parent._slow.should.be.ok;
        this._runnable.parent._slow.should.eql(75);
        this._runnable.parent._timeout.should.be.ok;
        this._runnable.parent._timeout.should.eql(2000);
    });

    it.each(1, 'should place non-array values into an array', function (element) {
        element.should.be.ok;
        element.should.eql(1);
    });

    describe('executes', function () {
        this.slow(1000);

        it.each([1], 'synchronously', function (_element) {
            this._runnable.title.length.should.be.greaterThan(1);
        });

        it.each([1], 'asynchronously', function (_element, next) {
            this._runnable.title.length.should.be.greaterThan(1);
            setTimeout(next, 200);
        });
    });

    describe('looping over arrays', function () {
        var count = 0;

        it.each([1], 'should be able to access array elements', function (element) {
            element.should.be.ok;
            element.should.eql(1);
        });

        it.each([1, 2, 3], 'should loop over each element in an array', function (element) {
            element.should.be.ok;
            element.should.eql(++count);
        });

        it('should increment a count', function () {
            count.should.be.ok;
            count.should.eql(3);
        });
    });

    describe('titles', function () {
        it.each([1], 'should contain the current index: %s', ['x'], function (_element) {
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('0');
        });

        it.each([1], 'should contain the current element: %s', ['element'], function (_element) {
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('1');
        });

        it.each([{ field: 1 }], 'should contain object values: %s', ['field'], function (_element) {
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('1');
        });

        it.each([{ field: { inner: 1 } }], 'should contain nested object values: %s', ['field.inner'], function (_element) {
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('1');
        });

        it.each([1,2], 'should contain iteration markers', function (element) {
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('- ' + element + '/2');
        });
    });

    describe('skipping', function () {
        it.each.skip([2, 3, 4], 'should contain elements only less than 1', function (element) {
            element.should.be.below(1);
        });
    });
});
