'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	pets = require('../../app/controllers/pets');

module.exports = function(app) {
	// Pet Routes
	app.route('/pets')
		.get(pets.list)
		.post(users.requiresLogin, pets.create);

	app.route('/pets/:petId')
		.get(pets.read)
		.put(users.requiresLogin, pets.hasAuthorization, pets.update)
		.delete(users.requiresLogin, pets.hasAuthorization, pets.delete);
	
	app.route('/qr').get(pets.qr);

	// Finish by binding the pet middleware
	app.param('petId', pets.petByID);
};