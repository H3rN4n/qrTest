'use strict';

module.exports = function(app) {
	var core = require('../../app/controllers/core');

  // Root routing
  app.route('/').get(core.index);
};
