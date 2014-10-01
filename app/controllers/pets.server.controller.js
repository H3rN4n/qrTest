'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Pet = mongoose.model('Pet'),
	qr = require('qr-image'),
	_ = require('lodash');

/**
 * Create a pet
 */
exports.create = function(req, res) {
	var pet = new Pet(req.body);
	pet.user = req.user;

	pet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pet);
		}
	});
};

/**
 * Show the current pet
 */
exports.read = function(req, res) {
	res.jsonp(req.pet);
};

/**
 * Update a pet
 */
exports.update = function(req, res) {
	var pet = req.pet;

	pet = _.extend(pet, req.body);

	pet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pet);
		}
	});
};

/**
 * Delete an pet
 */
exports.delete = function(req, res) {
	var pet = req.pet;

	pet.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pet);
		}
	});
};

/**
 * List of Pets
 */
exports.list = function(req, res) {
	Pet.find().sort('-created').populate('user', 'displayName').exec(function(err, pets) {
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
 * Pet middleware
 */
exports.petByID = function(req, res, next, id) {
	Pet.findById(id).populate('user', 'displayName').exec(function(err, pet) {
		if (err) return next(err);
		if (!pet) return next(new Error('Failed to load pet ' + id));
		req.pet = pet;
		next();
	});
};

/**
 * Pet authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pet.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

exports.qr = function(req, res) {
	var code = qr.image(req.param('url'), { type: 'svg' });
	res.type('svg');
	code.pipe(res);
};