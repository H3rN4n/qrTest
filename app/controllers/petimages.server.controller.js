'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Petimage = mongoose.model('Petimage'),
	_ = require('lodash');

/**
 * Create a Petimage
 */
exports.create = function(req, res) {
	var petimage = new Petimage(req.body);
	petimage.user = req.user;

	petimage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petimage);
		}
	});
};

/**
 * Show the current Petimage
 */
exports.read = function(req, res) {
	res.jsonp(req.petimage);
};

/**
 * Update a Petimage
 */
exports.update = function(req, res) {
	var petimage = req.petimage ;

	petimage = _.extend(petimage , req.body);

	petimage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petimage);
		}
	});
};

/**
 * Delete an Petimage
 */
exports.delete = function(req, res) {
	var petimage = req.petimage ;

	petimage.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petimage);
		}
	});
};

/**
 * List of Petimages
 */
exports.list = function(req, res) { Petimage.find().sort('-created').populate('user', 'displayName').exec(function(err, petimages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petimages);
		}
	});
};

/**
 * Petimage middleware
 */
exports.petimageByID = function(req, res, next, id) { Petimage.findById(id).populate('user', 'displayName').exec(function(err, petimage) {
		if (err) return next(err);
		if (! petimage) return next(new Error('Failed to load Petimage ' + id));
		req.petimage = petimage ;
		next();
	});
};

/**
 * Petimage authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.petimage.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};