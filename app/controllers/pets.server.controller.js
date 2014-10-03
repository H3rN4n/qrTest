'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	pets = mongoose.model('pets'),
	_ = require('lodash');

/**
 * Create a pets
 */
exports.create = function(req, res) {
	var pets = new pets(req.body);
	pets.user = req.user;

	pets.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets);
		}
	});
};

/**
 * Show the current pets
 */
exports.read = function(req, res) {
	res.jsonp(req.pets);
};

/**
 * Update a pets
 */
exports.update = function(req, res) {
	var pets = req.pets ;

	pets = _.extend(pets , req.body);

	pets.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets);
		}
	});
};

/**
 * Delete an pets
 */
exports.delete = function(req, res) {
	var pets = req.pets ;

	pets.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets);
		}
	});
};

/**
 * List of pets
 */
exports.list = function(req, res) { pets.find().sort('-created').populate('user', 'displayName').exec(function(err, pets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pets);
		}
	});
};

/**
 * pets middleware
 */
exports.petsByID = function(req, res, next, id) { pets.findById(id).populate('user', 'displayName').exec(function(err, pets) {
		if (err) return next(err);
		if (! pets) return next(new Error('Failed to load pets ' + id));
		req.pets = pets ;
		next();
	});
};

/**
 * pets authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pets.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};