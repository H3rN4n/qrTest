'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var qr = require('qr-image');
/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authorization'),
	require('./users/users.profile')
);

exports.qr = function(req, res) {
  var code = qr.image('http://www.google.com', { type: 'svg' });
  res.type('svg');
  code.pipe(res);
};