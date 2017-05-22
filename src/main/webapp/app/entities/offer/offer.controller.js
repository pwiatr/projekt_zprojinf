(function() {
    'use strict';
 
    angular
        .module('krakowskiTargApp')
        .controller('OfferController', OfferController);
 
    OfferController.$inject = ['Offer', 'OfferSearch','Principal'];
 
    function OfferController(Offer, OfferSearch, Principal) {
 
        var vm = this;
 
        vm.offers = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;
 
 
 
        loadAll();
 
        function loadAll() {
            Principal.identity(true).then(function(account) {
                vm.login = account.login;
 
                Offer.queryByUser({id:vm.login}, function(result) {
                    vm.offers = result;
                    vm.searchQuery = null;
                    calculatePrices();
                });
            });
        }
 
        function calculatePrices() {
            vm.offers.forEach(function(offer) {
                var price = new PriceDecorator(offer.price);
                price.decorate('handicapped');
                offer.discounts = price.getDiscounts();
                offer.price = price.getPrice();
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