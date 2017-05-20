(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('PublicOfferController', PublicOfferController);

    PublicOfferController.$inject = ['PublicOffer', 'PublicOfferSearch', '$location', '$timeout', '$state'];

    function PublicOfferController(PublicOffer, PublicOfferSearch, $location, $timeout, $state) {

        var vm = this,
            chosenOfferId = null;

        vm.offers = [];
        vm.isAuthenticated = null;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        vm.rotateOnClick = function($event, offerId) {
            chosenOfferId = offerId;
            $($event.currentTarget).toggleClass('offer-clicked');

            $timeout(changePage, 150);
        }

        function changePage() {
            $state.go('public-offer-detail',{id:chosenOfferId});
        }

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
