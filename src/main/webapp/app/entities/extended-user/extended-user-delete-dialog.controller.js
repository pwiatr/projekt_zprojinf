(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('ExtendedUserDeleteController',ExtendedUserDeleteController);

    ExtendedUserDeleteController.$inject = ['$uibModalInstance', 'entity', 'ExtendedUser'];

    function ExtendedUserDeleteController($uibModalInstance, entity, ExtendedUser) {
        var vm = this;

        vm.extendedUser = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ExtendedUser.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
