'use strict';

// Configuring the Articles module
angular.module('pets2s').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pets2s', 'pets2s', 'dropdown', '/pets2s(/create)?');
		Menus.addSubMenuItem('topbar', 'pets2s', 'List Pets2s', 'pets2s');
		Menus.addSubMenuItem('topbar', 'pets2s', 'New Pets2', 'pets2s/create');
	}
]);