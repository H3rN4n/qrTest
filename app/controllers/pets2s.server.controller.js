'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Pets2 = mongoose.model('Pets2'),
	_ = require('lodash');

/**
 * Create a Pets2
 */
exports.create = function(req, res) {
	var pets2 = new Pets2(req.body);
	pets2.user = req.user;

	pets2.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets2);
		}
	});
};

/**
 * Show the current Pets2
 */
exports.read = function(req, res) {
	res.jsonp(req.pets2);
};

/**
 * Update a Pets2
 */
exports.update = function(req, res) {
	var pets2 = req.pets2 ;

	pets2 = _.extend(pets2 , req.body);

	pets2.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets2);
		}
	});
};

/**
 * Delete an Pets2
 */
exports.delete = function(req, res) {
	var pets2 = req.pets2 ;

	pets2.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets2);
		}
	});
};

/**
 * List of Pets2s
 */
exports.list = function(req, res) { Pets2.find().sort('-created').populate('user', 'displayName').exec(function(err, pets2s) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets2s);
		}
	});
};

/**
 * Pets2 middleware
 */
exports.pets2ByID = function(req, res, next, id) { Pets2.findById(id).populate('user', 'displayName').exec(function(err, pets2) {
		if (err) return next(err);
		if (! pets2) return next(new Error('Failed to load Pets2 ' + id));
		req.pets2 = pets2 ;
		next();
	});
};

/**
 * Pets2 authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pets2.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};