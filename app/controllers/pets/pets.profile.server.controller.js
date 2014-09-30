'use strict';

/**
 * Module dependencies.
 */
 var _ = require('lodash'),
 qr = require('qr-image'),
 errorHandler = require('../errors'),
 mongoose = require('mongoose'),
 Pet = mongoose.model('Pet');

/**
 * Update pet details
 */
 exports.update = function(req, res) {
	// Init Variables
	var pet = req.pet;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (pet) {
		// Merge existing pet
		pet = _.extend(pet, req.body);
		pet.updated = Date.now();
		pet.displayName = pet.firstName + ' ' + pet.lastName;

		pet.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(pet, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.jsonp(pet);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'Pet is not signed in'
		});
	}
};

/**
 * Send Pet
 */
 exports.me = function(req, res) {
 	res.jsonp(req.pet || null);
 };

 exports.qr = function(req, res) {
 	var code = qr.image(req.param('url'), { type: 'svg' });
 	res.type('svg');
 	code.pipe(res);
 };
