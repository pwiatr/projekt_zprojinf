(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('ExtendedUserController', ExtendedUserController);

    ExtendedUserController.$inject = ['ExtendedUser', 'ExtendedUserSearch'];

    function ExtendedUserController(ExtendedUser, ExtendedUserSearch) {

        var vm = this;

        vm.extendedUsers = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            ExtendedUser.query(function(result) {
                vm.extendedUsers = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ExtendedUserSearch.query({query: vm.searchQuery}, function(result) {
                vm.extendedUsers = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
