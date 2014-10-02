'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var pets2s = require('../../app/controllers/pets2s');

	// Pets2s Routes
	app.route('/pets2s')
		.get(pets2s.list)
		.post(users.requiresLogin, pets2s.create);

	app.route('/pets2s/:pets2Id')
		.get(pets2s.read)
		.put(users.requiresLogin, pets2s.hasAuthorization, pets2s.update)
		.delete(users.requiresLogin, pets2s.hasAuthorization, pets2s.delete);

	// Finish by binding the Pets2 middleware
	app.param('pets2Id', pets2s.pets2ByID);
};