(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('ExtendedUserDialogController', ExtendedUserDialogController);

    ExtendedUserDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'ExtendedUser', 'User'];

    function ExtendedUserDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, ExtendedUser, User) {
        var vm = this;

        vm.extendedUser = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.extendedUser.id !== null) {
                ExtendedUser.update(vm.extendedUser, onSaveSuccess, onSaveError);
            } else {
                ExtendedUser.save(vm.extendedUser, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('krakowskiTargApp:extendedUserUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
