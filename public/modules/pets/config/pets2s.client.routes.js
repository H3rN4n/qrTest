'use strict';

//Setting up route
angular.module('pets').config(['$stateProvider',
	function($stateProvider) {
		// pets state routing
		$stateProvider.
		state('listpets', {
			url: '/pets',
			templateUrl: 'modules/pets/views/list-pets.client.view.html'
		}).
		state('createpets', {
			url: '/pets/create',
			templateUrl: 'modules/pets/views/create-pets.client.view.html'
		}).
		state('viewpets', {
			url: '/pets/:petsId',
			templateUrl: 'modules/pets/views/view-pets.client.view.html'
		}).
		state('editpets', {
			url: '/pets/:petsId/edit',
			templateUrl: 'modules/pets/views/edit-pets.client.view.html'
		});
	}
]);