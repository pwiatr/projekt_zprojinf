(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('OfferDialogController', OfferDialogController);

    OfferDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Offer', 'Picture'];

    function OfferDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Offer, Picture) {
        var vm = this;

        vm.offer = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.pictures = Picture.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.offer.id !== null) {
                Offer.update(vm.offer, onSaveSuccess, onSaveError);
            } else {
                Offer.save(vm.offer, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('krakowskiTargApp:offerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
