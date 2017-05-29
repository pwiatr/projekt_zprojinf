(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('OfferDialogController', OfferDialogController);

    OfferDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Offer', 'Picture', 'ExtendedUser', 'Category'];

    function OfferDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Offer, Picture, ExtendedUser, Category) {
        var vm = this;

        vm.offer = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        // vm.saveFile = saveFile;
        vm.pictures = Picture.query();
        vm.extendedusers = ExtendedUser.query();
        vm.categories = Category.query();

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

        // function saveFile() {
        //     console.log("Trying to send");
        // }

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
