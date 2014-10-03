'use strict';

// Petimages controller
angular.module('petimages').controller('PetimagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Petimages',
	function($scope, $stateParams, $location, Authentication, Petimages ) {
		$scope.authentication = Authentication;

		// Create new Petimage
		$scope.create = function() {
			// Create new Petimage object
			var petimage = new Petimages ({
				name: this.name
			});

			// Redirect after save
			petimage.$save(function(response) {
				$location.path('petimages/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Petimage
		$scope.remove = function( petimage ) {
			if ( petimage ) { petimage.$remove();

				for (var i in $scope.petimages ) {
					if ($scope.petimages [i] === petimage ) {
						$scope.petimages.splice(i, 1);
					}
				}
			} else {
				$scope.petimage.$remove(function() {
					$location.path('petimages');
				});
			}
		};

		// Update existing Petimage
		$scope.update = function() {
			var petimage = $scope.petimage ;

			petimage.$update(function() {
				$location.path('petimages/' + petimage._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Petimages
		$scope.find = function() {
			$scope.petimages = Petimages.query();
		};

		// Find existing Petimage
		$scope.findOne = function() {
			$scope.petimage = Petimages.get({ 
				petimageId: $stateParams.petimageId
			});
		};
	}
]);