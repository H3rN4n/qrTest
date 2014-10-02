'use strict';

(function() {
	// Pets2s Controller Spec
	describe('Pets2s Controller Tests', function() {
		// Initialize global variables
		var Pets2sController,
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

			// Initialize the Pets2s controller.
			Pets2sController = $controller('Pets2sController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pets2 object fetched from XHR', inject(function(Pets2s) {
			// Create sample Pets2 using the Pets2s service
			var samplePets2 = new Pets2s({
				name: 'New Pets2'
			});

			// Create a sample Pets2s array that includes the new Pets2
			var samplePets2s = [samplePets2];

			// Set GET response
			$httpBackend.expectGET('pets2s').respond(samplePets2s);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pets2s).toEqualData(samplePets2s);
		}));

		it('$scope.findOne() should create an array with one Pets2 object fetched from XHR using a pets2Id URL parameter', inject(function(Pets2s) {
			// Define a sample Pets2 object
			var samplePets2 = new Pets2s({
				name: 'New Pets2'
			});

			// Set the URL parameter
			$stateParams.pets2Id = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pets2s\/([0-9a-fA-F]{24})$/).respond(samplePets2);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pets2).toEqualData(samplePets2);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pets2s) {
			// Create a sample Pets2 object
			var samplePets2PostData = new Pets2s({
				name: 'New Pets2'
			});

			// Create a sample Pets2 response
			var samplePets2Response = new Pets2s({
				_id: '525cf20451979dea2c000001',
				name: 'New Pets2'
			});

			// Fixture mock form input values
			scope.name = 'New Pets2';

			// Set POST response
			$httpBackend.expectPOST('pets2s', samplePets2PostData).respond(samplePets2Response);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pets2 was created
			expect($location.path()).toBe('/pets2s/' + samplePets2Response._id);
		}));

		it('$scope.update() should update a valid Pets2', inject(function(Pets2s) {
			// Define a sample Pets2 put data
			var samplePets2PutData = new Pets2s({
				_id: '525cf20451979dea2c000001',
				name: 'New Pets2'
			});

			// Mock Pets2 in scope
			scope.pets2 = samplePets2PutData;

			// Set PUT response
			$httpBackend.expectPUT(/pets2s\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pets2s/' + samplePets2PutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pets2Id and remove the Pets2 from the scope', inject(function(Pets2s) {
			// Create new Pets2 object
			var samplePets2 = new Pets2s({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pets2s array and include the Pets2
			scope.pets2s = [samplePets2];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pets2s\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePets2);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pets2s.length).toBe(0);
		}));
	});
}());