'use strict';

(function() {
	// pets Controller Spec
	describe('pets Controller Tests', function() {
		// Initialize global variables
		var petsController,
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

			// Initialize the pets controller.
			petsController = $controller('petsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one pets object fetched from XHR', inject(function(Pets) {
			// Create sample pets using the pets service
			var samplepets = new Pets({
				name: 'New pets'
			});

			// Create a sample pets array that includes the new pets
			samplepets = [samplepets];

			// Set GET response
			$httpBackend.expectGET('pets').respond(samplepets);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pets).toEqualData(samplepets);
		}));

		it('$scope.findOne() should create an array with one pets object fetched from XHR using a petsId URL parameter', inject(function(Pets) {
			// Define a sample pets object
			var samplepets = new Pets({
				name: 'New pets'
			});

			// Set the URL parameter
			$stateParams.petsId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pets\/([0-9a-fA-F]{24})$/).respond(samplepets);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pets).toEqualData(samplepets);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pets) {
			// Create a sample pets object
			var samplepetsPostData = new Pets({
				name: 'New pets'
			});

			// Create a sample pets response
			var samplepetsResponse = new Pets({
				_id: '525cf20451979dea2c000001',
				name: 'New pets'
			});

			// Fixture mock form input values
			scope.name = 'New pets';

			// Set POST response
			$httpBackend.expectPOST('pets', samplepetsPostData).respond(samplepetsResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the pets was created
			expect($location.path()).toBe('/pets/' + samplepetsResponse._id);
		}));

		it('$scope.update() should update a valid pets', inject(function(Pets) {
			// Define a sample pets put data
			var samplepetsPutData = new Pets({
				_id: '525cf20451979dea2c000001',
				name: 'New pets'
			});

			// Mock pets in scope
			scope.pets = samplepetsPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pets\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pets/' + samplepetsPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid petsId and remove the pets from the scope', inject(function(Pets) {
			// Create new pets object
			var samplepets = new Pets({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new pets array and include the pets
			scope.pets = [samplepets];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pets\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplepets);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pets.length).toBe(0);
		}));
	});
}());