'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Petimage = mongoose.model('Petimage'),
	formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra'),
    qt   = require('quickthumb'),
	_ = require('lodash');


// Use quickthumb
//app.use(qt.static(__dirname + '/'));

/*app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file 
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file 
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file 
    var new_location = 'uploads/';

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});*/
exports.upload = function(req, res) {
	var form = new formidable.IncomingForm();
  	form.parse(req, function(err, fields, files) {
	    res.writeHead(200, {'content-type': 'text/plain'});
	    res.write('received upload:\n\n');
	    res.end(util.inspect({fields: fields, files: files}));
	  });

	  form.on('end', function(fields, files) {
	    /* Temporary location of our uploaded file */
	    var temp_path = this.openedFiles[0].path;
	    /* The file name of the uploaded file */
	    var file_name = this.openedFiles[0].name;
	    /* Location where we want to copy the uploaded file */
	    var new_location = 'uploads/';

	    fs.copy(temp_path, new_location + file_name, function(err) {  
	      if (err) {
	        console.error(err);
	      } else {
	        console.log('success!');
	      }
	    });
	  });
};

/**
 * Create a Petimage
 */
exports.create = function(req, res) {
	var petimage = new Petimage(req.body);
	petimage.user = req.user;

	petimage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petimage);
		}
	});
};

/**
 * Show the current Petimage
 */
exports.read = function(req, res) {
	res.jsonp(req.petimage);
};

/**
 * Update a Petimage
 */
exports.update = function(req, res) {
	var petimage = req.petimage ;

	petimage = _.extend(petimage , req.body);

	petimage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petimage);
		}
	});
};

/**
 * Delete an Petimage
 */
exports.delete = function(req, res) {
	var petimage = req.petimage ;

	petimage.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petimage);
		}
	});
};

/**
 * List of Petimages
 */
exports.list = function(req, res) { Petimage.find().sort('-created').populate('user', 'displayName').exec(function(err, petimages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(petimages);
		}
	});
};

/**
 * Petimage middleware
 */
exports.petimageByID = function(req, res, next, id) { Petimage.findById(id).populate('user', 'displayName').exec(function(err, petimage) {
		if (err) return next(err);
		if (! petimage) return next(new Error('Failed to load Petimage ' + id));
		req.petimage = petimage ;
		next();
	});
};

/**
 * Petimage authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.petimage.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};