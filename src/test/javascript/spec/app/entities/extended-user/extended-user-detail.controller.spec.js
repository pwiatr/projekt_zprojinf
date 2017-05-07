'use strict';

describe('Controller Tests', function() {

    describe('ExtendedUser Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockExtendedUser, MockUser, MockOffer;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockExtendedUser = jasmine.createSpy('MockExtendedUser');
            MockUser = jasmine.createSpy('MockUser');
            MockOffer = jasmine.createSpy('MockOffer');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'ExtendedUser': MockExtendedUser,
                'User': MockUser,
                'Offer': MockOffer
            };
            createController = function() {
                $injector.get('$controller')("ExtendedUserDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'krakowskiTargApp:extendedUserUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
