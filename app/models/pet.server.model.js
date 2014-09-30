'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var PetSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	ownwerId: {
		type: Number,
		default: '',
		trim: true,
		required: 'Owner cannot be blank'
	},
	petusername: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	general: {
		name: {
			type: String,
			default: '',
			trim: true,
			required: 'Name cannot be blank'
		},
		color: {
			type: String,
			default: '',
			trim: true,
			required: 'Color cannot be blank'
		},
		breed: {
			type: String,
			default: '',
			trim: true,
			required: 'Breed cannot be blank'
		},
		dateOfBirth: {
			type: Date,
			default: '',
			trim: true
		},
		comments: {
			type: String,
			default: '',
			trim: true
		}
	},
	contact: {
		contactName: {
			type: String,
			default: '',
			trim: true,
			required: 'Contact name cannot be blank'
		},
		primaryNumber: {
			type: Number,
			default: '',
			trim: true,
			required: 'Owner cannot be blank'
		},
		alternateNumber1: {
			type: Number,
			default: '',
			trim: true
		},
		alternateNumber2: {
			type: Number,
			default: '',
			trim: true
		},
		email: {
			type: String,
			default: '',
			trim: true,
			required: 'Email cannot be blank'
		},
		facebook: {
			type: String,
			default: '',
			trim: true,
			required: 'Facebook cannot be blank'
		},
		twitter: {
			type: String,
			default: '',
			trim: true,
			required: 'Twitter cannot be blank'
		},
	},
	veterinarian: {
		vet: {
			type: String,
			default: '',
			trim: true,
			required: 'Vet cannot be blank'
		},
		phone: {
			type: Number,
			default: '',
			trim: true
		},
		address: {
			type: String,
			default: '',
			trim: true
		}
	},
	medical: {
		sex: {
			type: String,
			default: '',
			trim: true
		},
		medications: {
			type: String,
			default: '',
			trim: true
		},
		dietary:{
			type: String,
			default: '',
			trim: true
		},
		allergies: {

		},
		comments:{

		}
	},
	vaccination: {
		rabies: {
			type: Boolean,
			default: '',
			trim: true,
			required: 'Rabies cannot be blank'
		},
		rabiesVaccinationDate: {
			type: Date,
			default: '',
			trim: true
		},
		additionalVaccinations: {
			type: String,
			default: '',
			trim: true
		}
	},
	pet: {
		type: Schema.ObjectId,
		ref: 'Pet'
	}
});

PetSchema.statics.findUniquePetUsername = function(petusername, suffix, callback) {
	var _this = this;
	var possibleUsername = petusername + (suffix || '');

	_this.findOne({
		petusername: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(petusername, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('Pet', PetSchema);