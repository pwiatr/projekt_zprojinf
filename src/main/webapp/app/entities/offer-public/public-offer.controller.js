(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('PublicOfferController', PublicOfferController);

    PublicOfferController.$inject = ['PublicOffer', 'PublicOfferSearch'];

    function PublicOfferController(PublicOffer, PublicOfferSearch) {

        var vm = this;

        vm.offers = [];
        vm.isAuthenticated = null;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();



        function loadAll() {
            PublicOffer.query(function(result) {
                vm.offers = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            PublicOfferSearch.query({query: vm.searchQuery}, function(result) {
                vm.offers = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
