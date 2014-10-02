'use strict';

//Pets2s service used to communicate Pets2s REST endpoints
angular.module('pets2s').factory('Pets2s', ['$resource',
	function($resource) {
		return $resource('pets2s/:pets2Id', { pets2Id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);