require('../index')();

var http = require('http');

describe('Testing it.each() with different titles', function() {

    // Ignore red
    this.slow(5000);

    // Dynamic
    it.each([1, 2, 3, 4, 5], 'Test %s', ['x'], request);

    // Static
    it.each([1, 2, 3, 4, 5], 'Test of it.each()', request);

});

describe('Testing it.each() with tests per iteration', function() {

    // Ignore red
    this.slow(5000);

    // Enable test per iteration
    require('../index')({ testPerIteration: true });

    // Dynamic
    it.each([1, 2, 3, 4, 5], 'Test %s', ['x'], request);

    // Static
    it.each([1, 2, 3, 4, 5], 'Test of it.each()', request);

});

/**
 * Simple test to hit random.org for a random integer.
 * Just a simple asynchronous function.
 *
 * @param element		the test iteration
 * @param next			the Mocha callback
 */
function request(element, next){
    http.request({
        host: 'www.random.org',
        path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain'
    }, function(response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk.toString().split('\n')[0];
        });

        response.on('end', function () {
            setTimeout(next, 1000);
        });
    }).end();
}