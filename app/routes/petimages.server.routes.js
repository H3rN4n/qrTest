'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var petimages = require('../../app/controllers/petimages');

	// Petimages Routes
	app.route('/petimages')
		.get(petimages.list)
		.post(users.requiresLogin, petimages.create);

	app.route('/upload')
		.post(users.requiresLogin, petimages.upload);

	app.route('/petimages/:petimageId')
		.get(petimages.read)
		.put(users.requiresLogin, petimages.hasAuthorization, petimages.update)
		.delete(users.requiresLogin, petimages.hasAuthorization, petimages.delete);

	// Finish by binding the Petimage middleware
	app.param('petimageId', petimages.petimageByID);
};