'use strict';

// Configuring the Articles module
angular.module('petimages').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Petimages', 'petimages', 'dropdown', '/petimages(/create)?');
		Menus.addSubMenuItem('topbar', 'petimages', 'List Petimages', 'petimages');
		Menus.addSubMenuItem('topbar', 'petimages', 'New Petimage', 'petimages/create');
	}
]);