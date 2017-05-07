(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('ExtendedUserDetailController', ExtendedUserDetailController);

    ExtendedUserDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ExtendedUser', 'User', 'Offer'];

    function ExtendedUserDetailController($scope, $rootScope, $stateParams, previousState, entity, ExtendedUser, User, Offer) {
        var vm = this;

        vm.extendedUser = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('krakowskiTargApp:extendedUserUpdate', function(event, result) {
            vm.extendedUser = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
