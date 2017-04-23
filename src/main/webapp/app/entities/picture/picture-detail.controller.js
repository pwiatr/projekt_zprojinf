(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('PictureDetailController', PictureDetailController);

    PictureDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Picture', 'Offer'];

    function PictureDetailController($scope, $rootScope, $stateParams, previousState, entity, Picture, Offer) {
        var vm = this;

        vm.picture = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('krakowskiTargApp:pictureUpdate', function(event, result) {
            vm.picture = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
