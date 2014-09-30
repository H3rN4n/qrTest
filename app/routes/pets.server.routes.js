'use strict';

/**
 * Module dependencies.
 */
 
 module.exports = function(app) {
	// User Routes
	var pets = require('../../app/controllers/pets');

	// Setting up the users profile api
	app.route('/pets/:id').get(pets.me);
	// QR routing
	app.route('/qr').get(pets.qr);

	// Finish by binding the user middleware
	app.param('petId', pets.petByID);
};
