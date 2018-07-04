require('should');

describe('it.each.skip test suite', function(){

    require('../index')();

    describe('it.each.skip tests', function() {
        const numbers = [1, 2, 3, 4];
        after(function() {
            var isPending = 0;
            var isExecuted = 0;
            var tests = this.test.parent.tests;
            for (var i=0; i < tests.length; i += 1) {
                (tests[i].pending === true) ? isPending +=1 : isExecuted += 1;
            }
            isPending.should.eql(3);
            isExecuted.should.eql(1);
        });

        it.each(numbers, 'Assert %s is less than 5', ['element'], function(element) {
            element.should.be.below(5);
        });

        it.each.skip(numbers, 'Assert %s is less than 5', ['element'], function(element) {
            element.should.be.below(5);
        });

        it.each.skip([{ field: 1 }], 'should contain object values: %s', ['field'], function(/* element */){
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('1');
        });

        it.each.skip([1,2], 'should contain iteration markers', function(element){
            this._runnable.should.be.ok;
            this._runnable.title.should.be.ok;
            this._runnable.title.should.endWith('- ' + element + '/2');
        });
    });

    describe('it.each.skip testPerIteration tests', function() {
        require('../index')({
            testPerIteration: true
        });
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
        after(function() {
            var isPending = 0;
            var isExecuted = 0;
            var tests = this.test.parent.tests;
            for (var i=0; i < tests.length; i += 1) {
                (tests[i].pending === true) ? isPending +=1 : isExecuted += 1;
            }
            isPending.should.eql(1);
            isExecuted.should.eql(8);
        });

        it.each(numbers, 'Assert %s is less than 5', ['element'], function(element) {
            element.should.be.below(9);
        });

        it.each.skip(numbers, 'Assert %s is less than 5', ['element'], function(element) {
            element.should.be.below(9);
        });
    });
});