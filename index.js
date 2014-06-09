var async = require('async'),
	format = require('util').format;

module.exports = function() {
	it.each = function (iterator, title, fields, process) {
		it('should begin a loop', function (done) {
			var multiplier = iterator.length || Object.keys(iterator).length,
				that = this,
				x = 0;

			this.slow(this.slow * multiplier);
			this.timeout(this.timeout * multiplier);

			async.eachSeries(iterator, function (element, next) {

				if (typeof fields != 'function') {
					var formatting = fields.concat(),
						args = (formatting.unshift(title), formatting);
					x += 1;
					for (var i = 1; i <= args.length - 1; i++) {
						if (args[i] == 'x') {
							args[i] = x;
						} else if (args[i] == 'element') {
							args[i] = element;
						} else {
							if (~i.toString().indexOf('.')) {
								var keys = i.split('.');
								var ref = element;
								for (var j = 0; j < keys.length - 1; j++) {
									ref = ref[keys[j]] || {};
								}
								args[i] = ref[keys[keys.length - 1]];
							} else {
								args[i] = element[i];
							}
						}
					}
					that._runnable.title = format.apply(this, args);
				} else {
					that._runnable.title = title;
					process = fields;
				}

				process(element, next);
			}, done);
		});
	}
};