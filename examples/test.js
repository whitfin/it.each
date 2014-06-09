require('../index')();

var http = require('http');

describe('Testing it.each() with different titles', function() {

	// Dynamic
	it.each([1, 2, 3, 4, 5], 'Test %s', ['x'], request);

	// Static
	it.each([1, 2, 3, 4, 5], 'Test of it.each()', request);

});

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
			console.log('Element: #' + element + ', number: ' + str);
			setTimeout(next, 1000);
		});
	}).end();
};