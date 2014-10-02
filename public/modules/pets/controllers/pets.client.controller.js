'use strict';

angular.module('pets').controller('PetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pets',
	function($scope, $stateParams, $location, Authentication, Pets) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var pet = new Pets({
				general: {
					name: this.pet.general.name,
					color: this.pet.general.color,
					breed: this.pet.general.breed,
					dateOfBirth: this.pet.general.dateOfBirth,
					comments: this.pet.general.comments
				},
				contact: {
					contactName: this.pet.contact.contactName,
					primaryNumber: this.pet.contact.primaryNumber,
					alternateNumber1: this.pet.contact.alternativeNumber1,
					alternateNumber2: this.pet.contact.alternativeNumber2,
					email: this.pet.contact.email,
					facebook: this.pet.contact.facebook,
					twitter: this.pet.contact.twitter
				},
				veterinarian: {
					vet: this.pet.veterinarian.vet,
					phone: this.pet.veterinarian.phone,
					address: this.pet.veterinarian.address,
				},
				medical: {
					sex: this.pet.medical.sex,
					medications: this.pet.medical.medications,
					dietary: this.pet.medical.dietary,
					allergies: this.pet.medical.allergies,
					comments: this.pet.medical.comments
				},
				vaccination: {
					rabies: this.pet.vaccination.rabies,
					rabiesVaccinationDate: this.pet.vaccination.rabiesVaccinationDate,
					additionalVaccinations: this.pet.vaccination.additionalVaccinations
				}
			});
			pet.$save(function(response) {
				$location.path('pets/' + response._id);

				$scope.pet = {
					general: {
						name: this.name,
						color: this.color,
						breed: this.breed,
						dateOfBirth: this.dateOfBirth,
						comments: this.comments
					},
					contact: {
						contactName: this.contactName,
						primaryNumber: this.primaryNumber,
						alternateNumber1: this.alternativeNumber1,
						alternateNumber2: this.alternativeNumber2,
						email: this.email,
						facebook: this.facebook,
						twitter: this.twitter
					},
					veterinarian: {
						vet: this.vet,
						phone: this.phone,
						address: this.address,
					},
					medical: {
						sex: this.sex,
						medications: this.medications,
						dietary: this.dietary,
						allergies: this.allergies,
						comments: this.comments,
					},
					vaccination: {
						rabies: this.rabies,
						rabiesVaccinationDate: this.rabiesVaccinationDate,
						additionalVaccinations: this.additionalVaccinations,
					}
				};
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(pet) {
			if (pet) {
				pet.$remove();

				for (var i in $scope.pets) {
					if ($scope.pets[i] === pet) {
						$scope.pets.splice(i, 1);
					}
				}
			} else {
				$scope.pet.$remove(function() {
					$location.path('pets');
				});
			}
		};

		$scope.update = function() {
			var pet = $scope.pet;

			pet.$update(function() {
				$location.path('pets/' + pet._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.pets = Pets.query();
		};

		$scope.findOne = function() {
			$scope.pet = Pets.get({
				petId: $stateParams.petId
			});
		};
	}
]);