'use strict';

describe('Controller Tests', function() {

    describe('Offer Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockOffer, MockPicture, MockExtendedUser, MockCategory;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockOffer = jasmine.createSpy('MockOffer');
            MockPicture = jasmine.createSpy('MockPicture');
            MockExtendedUser = jasmine.createSpy('MockExtendedUser');
            MockCategory = jasmine.createSpy('MockCategory');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Offer': MockOffer,
                'Picture': MockPicture,
                'ExtendedUser': MockExtendedUser,
                'Category': MockCategory
            };
            createController = function() {
                $injector.get('$controller')("OfferDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'krakowskiTargApp:offerUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
