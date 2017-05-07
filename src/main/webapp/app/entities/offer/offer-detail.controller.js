(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('OfferDetailController', OfferDetailController);

    OfferDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Offer', 'Picture', 'ExtendedUser'];

    function OfferDetailController($scope, $rootScope, $stateParams, previousState, entity, Offer, Picture, ExtendedUser) {
        var vm = this;

        vm.offer = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('krakowskiTargApp:offerUpdate', function(event, result) {
            vm.offer = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
