(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('PictureDialogController', PictureDialogController);

    PictureDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Picture', 'Offer'];

    function PictureDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Picture, Offer) {
        var vm = this;

        vm.picture = entity;
        vm.clear = clear;
        vm.save = save;
        vm.offers = Offer.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.picture.id !== null) {
                Picture.update(vm.picture, onSaveSuccess, onSaveError);
            } else {
                Picture.save(vm.picture, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('krakowskiTargApp:pictureUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
