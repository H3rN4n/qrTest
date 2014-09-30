'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Pet = mongoose.model('Pet');

/**
 * Pet middleware
 */
exports.petByID = function(req, res, next, id) {
	Pet.findOne({
		_id: id
	}).exec(function(err, pet) {
		if (err) return next(err);
		if (!pet) return next(new Error('Failed to load Pet ' + id));
		req.profile = pet;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'Pet is not logged in'
		});
	}

	next();
};

/**
 * Pet authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.pet.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'Pet is not authorized'
				});
			}
		});
	};
};