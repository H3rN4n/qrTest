'use strict';

//Petimages service used to communicate Petimages REST endpoints
angular.module('petimages').factory('Petimages', ['$resource',
	function($resource) {
		return $resource('petimages/:petimageId', { petimageId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);