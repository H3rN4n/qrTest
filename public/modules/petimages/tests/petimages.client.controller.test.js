'use strict';

(function() {
	// Petimages Controller Spec
	describe('Petimages Controller Tests', function() {
		// Initialize global variables
		var PetimagesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Petimages controller.
			PetimagesController = $controller('PetimagesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Petimage object fetched from XHR', inject(function(Petimages) {
			// Create sample Petimage using the Petimages service
			var samplePetimage = new Petimages({
				name: 'New Petimage'
			});

			// Create a sample Petimages array that includes the new Petimage
			var samplePetimages = [samplePetimage];

			// Set GET response
			$httpBackend.expectGET('petimages').respond(samplePetimages);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.petimages).toEqualData(samplePetimages);
		}));

		it('$scope.findOne() should create an array with one Petimage object fetched from XHR using a petimageId URL parameter', inject(function(Petimages) {
			// Define a sample Petimage object
			var samplePetimage = new Petimages({
				name: 'New Petimage'
			});

			// Set the URL parameter
			$stateParams.petimageId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/petimages\/([0-9a-fA-F]{24})$/).respond(samplePetimage);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.petimage).toEqualData(samplePetimage);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Petimages) {
			// Create a sample Petimage object
			var samplePetimagePostData = new Petimages({
				name: 'New Petimage'
			});

			// Create a sample Petimage response
			var samplePetimageResponse = new Petimages({
				_id: '525cf20451979dea2c000001',
				name: 'New Petimage'
			});

			// Fixture mock form input values
			scope.name = 'New Petimage';

			// Set POST response
			$httpBackend.expectPOST('petimages', samplePetimagePostData).respond(samplePetimageResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Petimage was created
			expect($location.path()).toBe('/petimages/' + samplePetimageResponse._id);
		}));

		it('$scope.update() should update a valid Petimage', inject(function(Petimages) {
			// Define a sample Petimage put data
			var samplePetimagePutData = new Petimages({
				_id: '525cf20451979dea2c000001',
				name: 'New Petimage'
			});

			// Mock Petimage in scope
			scope.petimage = samplePetimagePutData;

			// Set PUT response
			$httpBackend.expectPUT(/petimages\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/petimages/' + samplePetimagePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid petimageId and remove the Petimage from the scope', inject(function(Petimages) {
			// Create new Petimage object
			var samplePetimage = new Petimages({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Petimages array and include the Petimage
			scope.petimages = [samplePetimage];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/petimages\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePetimage);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.petimages.length).toBe(0);
		}));
	});
}());