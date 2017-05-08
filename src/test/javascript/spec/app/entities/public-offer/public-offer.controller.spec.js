'use strict';

describe('Controller Tests', function() {

    describe('Public Offer Management Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockOffer, MockPicture, MockExtendedUser;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockOffer = jasmine.createSpy('MockOffer');
            MockPicture = jasmine.createSpy('MockPicture');
            MockExtendedUser = jasmine.createSpy('MockExtendedUser');


            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Offer': MockOffer,
                'Picture': MockPicture,
                'ExtendedUser': MockExtendedUser
            };
            createController = function() {
                $injector.get('$controller')("PublicOfferController", locals);
            };
        }));

        describe('Offers availability', function() {
			it('Checks availiblity of well defined offer', function() {
                expect(MockOffer.name).toEqual('test');
            });
            it('test',function() {

            })
        });
    });

});
