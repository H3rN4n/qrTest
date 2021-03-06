'use strict';

//pets service used to communicate pets REST endpoints
angular.module('pets').factory('Pets', ['$resource',
	function($resource) {
		return $resource('pets/:petsId', { petsId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);