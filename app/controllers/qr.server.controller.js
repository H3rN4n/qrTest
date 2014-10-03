'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('./errors'),
	qr = require('qr-image'),
	_ = require('lodash');


exports.generate = function(req, res) {
	var code = qr.image(req.param('url'), { type: 'svg' });
	res.type('svg');
	code.pipe(res);
};