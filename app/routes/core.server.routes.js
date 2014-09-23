'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	app.route('/').get(core.index);

	// QR routing
	var core = require('../../app/controllers/core');
	app.route('/qr').get(core.qr);
};