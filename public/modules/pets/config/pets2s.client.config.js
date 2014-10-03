'use strict';

// Configuring the Articles module
angular.module('pets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'pets', 'pets', 'dropdown', '/pets(/create)?');
		Menus.addSubMenuItem('topbar', 'pets', 'List pets', 'pets');
		Menus.addSubMenuItem('topbar', 'pets', 'New pets', 'pets/create');
	}
]);