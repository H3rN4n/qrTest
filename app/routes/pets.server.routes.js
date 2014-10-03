'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var pets = require('../../app/controllers/pets');

	// pets Routes
	app.route('/pets')
		.get(pets.list)
		.post(users.requiresLogin, pets.create);

	app.route('/pets/:petsId')
		.get(pets.read)
		.put(users.requiresLogin, pets.hasAuthorization, pets.update)
		.delete(users.requiresLogin, pets.hasAuthorization, pets.delete);

	// Finish by binding the pets middleware
	app.param('petsId', pets.petsByID);
};