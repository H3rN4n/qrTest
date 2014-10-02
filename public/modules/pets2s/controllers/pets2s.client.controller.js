'use strict';

// Pets2s controller
angular.module('pets2s').controller('Pets2sController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pets2s', 'mgo-angular-wizard',
	function($scope, $stateParams, $location, Authentication, Pets2s ) {
		$scope.authentication = Authentication;

		// Create new Pets2
		$scope.create = function() {
			// Create new Pets2 object
			var pets2 = new Pets2s ({
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
			pets2.$save(function(response) {
				$location.path('pets2s/' + response._id);

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

		// Remove existing Pets2
		$scope.remove = function( pets2 ) {
			if ( pets2 ) { pets2.$remove();

				for (var i in $scope.pets2s ) {
					if ($scope.pets2s [i] === pets2 ) {
						$scope.pets2s.splice(i, 1);
					}
				}
			} else {
				$scope.pets2.$remove(function() {
					$location.path('pets2s');
				});
			}
		};

		// Update existing Pets2
		$scope.update = function() {
			var pets2 = $scope.pets2 ;

			pets2.$update(function() {
				$location.path('pets2s/' + pets2._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pets2s
		$scope.find = function() {
			$scope.pets2s = Pets2s.query();
		};

		// Find existing Pets2
		$scope.findOne = function() {
			$scope.pets2 = Pets2s.get({ 
				pets2Id: $stateParams.pets2Id
			});
		};
	}
]);