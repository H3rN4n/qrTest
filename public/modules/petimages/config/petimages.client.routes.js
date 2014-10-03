'use strict';

//Setting up route
angular.module('petimages').config(['$stateProvider',
	function($stateProvider) {
		// Petimages state routing
		$stateProvider.
		state('listPetimages', {
			url: '/petimages',
			templateUrl: 'modules/petimages/views/list-petimages.client.view.html'
		}).
		state('createPetimage', {
			url: '/petimages/create',
			templateUrl: 'modules/petimages/views/create-petimage.client.view.html'
		}).
		state('viewPetimage', {
			url: '/petimages/:petimageId',
			templateUrl: 'modules/petimages/views/view-petimage.client.view.html'
		}).
		state('editPetimage', {
			url: '/petimages/:petimageId/edit',
			templateUrl: 'modules/petimages/views/edit-petimage.client.view.html'
		});
	}
]);