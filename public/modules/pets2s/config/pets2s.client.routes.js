'use strict';

//Setting up route
angular.module('pets2s').config(['$stateProvider',
	function($stateProvider) {
		// Pets2s state routing
		$stateProvider.
		state('listPets2s', {
			url: '/pets2s',
			templateUrl: 'modules/pets2s/views/list-pets2s.client.view.html'
		}).
		state('createPets2', {
			url: '/pets2s/create',
			templateUrl: 'modules/pets2s/views/create-pets2.client.view.html'
		}).
		state('viewPets2', {
			url: '/pets2s/:pets2Id',
			templateUrl: 'modules/pets2s/views/view-pets2.client.view.html'
		}).
		state('editPets2', {
			url: '/pets2s/:pets2Id/edit',
			templateUrl: 'modules/pets2s/views/edit-pets2.client.view.html'
		});
	}
]);