'use strict';

// Configuring the Pets module
angular.module('pets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pets', 'pets', 'dropdown', '/pets(/create)?');
		Menus.addSubMenuItem('topbar', 'pets', 'List Pets', 'pets');
		Menus.addSubMenuItem('topbar', 'pets', 'New Pet', 'pets/create');
	}
]);