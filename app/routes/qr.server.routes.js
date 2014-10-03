'use strict';

/**
 * Module dependencies.
 */
var qr = require('../../app/controllers/qr');

module.exports = function(app) {
	// QR Routes
	app.route('/qr').get(qr.generate);
};