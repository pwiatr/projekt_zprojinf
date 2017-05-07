(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('PublicOfferController', PublicOfferController);

    PublicOfferController.$inject = ['PublicOffer', 'PublicOfferSearch'];

    function PublicOfferController(PublicOffer, PublicOfferSearch, Principal) {

        var vm = this;

        vm.offers = [];
        vm.isAuthenticated = null;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();



        function loadAll() {
            Principal.identity().then(function() {
                vm.isAuthenticated = Principal.isAuthenticated;
            });

            Offer.query(function(result) {
                vm.offers = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            OfferSearch.query({query: vm.searchQuery}, function(result) {
                vm.offers = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
