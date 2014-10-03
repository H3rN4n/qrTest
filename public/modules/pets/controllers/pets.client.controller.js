'use strict';

// pets controller
angular.module('pets').controller('petsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pets',
	function($scope, $stateParams, $location, Authentication, Pets ) {
		$scope.authentication = Authentication;

		// Create new pets
		$scope.create = function() {
			// Create new pets object
			var pets = new Pets ({
				//name: this.name
				general: {
					name: this.general.name,
					color: this.general.color,
					breed: this.general.breed,
					dateOfBirth: this.general.dateOfBirth,
					comments: this.general.comments
				},
				contact: {
					contactName: this.contact.contactName,
					primaryNumber: this.contact.primaryNumber,
					alternateNumber1: this.contact.alternativeNumber1,
					alternateNumber2: this.contact.alternativeNumber2,
					email: this.contact.email,
					facebook: this.contact.facebook,
					twitter: this.contact.twitter
				},
				veterinarian: {
					vet: this.veterinarian.vet,
					phone: this.veterinarian.phone,
					address: this.veterinarian.address,
				},
				medical: {
					sex: this.medical.sex,
					medications: this.medical.medications,
					dietary: this.medical.dietary,
					allergies: this.medical.allergies,
					comments: this.medical.comments
				},
				vaccination: {
					rabies: this.vaccination.rabies,
					rabiesVaccinationDate: this.vaccination.rabiesVaccinationDate,
					additionalVaccinations: this.vaccination.additionalVaccinations
				}
			});

			// Redirect after save
			pets.$save(function(response) {
				$location.path('pets/' + response._id);

				// Clear form fields
				//$scope.name = '';
				$scope.general = {
					name: '',
					color:'',
					breed: '',
					dateOfBirth: '',
					comments: ''
				};

				$scope.contact = {
					contactName: '',
					primaryNumber: '',
					alternateNumber1: '',
					alternateNumber2: '',
					email: '',
					facebook: '',
					twitter: ''
				};
				$scope.veterinarian = {
					vet: '',
					phone: '',
					address: ''
				};
				$scope.medical = {
					sex: '',
					medications: '',
					dietary: '',
					allergies: '',
					comments: ''
				};
				$scope.vaccination = {
					rabies: '',
					rabiesVaccinationDate: '',
					additionalVaccinations: ''
				};
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing pets
		$scope.remove = function( pets ) {
			if ( pets ) { pets.$remove();

				for (var i in $scope.pets ) {
					if ($scope.pets [i] === pets ) {
						$scope.pets.splice(i, 1);
					}
				}
			} else {
				$scope.pets.$remove(function() {
					$location.path('pets');
				});
			}
		};

		// Update existing pets
		$scope.update = function() {
			var pets = $scope.pets ;

			pets.$update(function() {
				$location.path('pets/' + pets._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of pets
		$scope.find = function() {
			$scope.pets = Pets.query();
		};

		// Find existing pets
		$scope.findOne = function() {
			$scope.pets = Pets.get({ 
				petsId: $stateParams.petsId
			});
		};
	}
]);