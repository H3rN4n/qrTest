'use strict';

var qr = require('qr-image');  

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	var code = qr.image('http://www.google.com', { type: 'svg' });
  	//res.type('svg');
  	//code.pipe(res);

	res.render('index', {
		user: req.user || null,
		code: code
	});
};