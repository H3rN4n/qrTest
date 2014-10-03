'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Petimage Schema
 */
var PetimageSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Petimage name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Petimage', PetimageSchema);