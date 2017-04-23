(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .controller('PictureController', PictureController);

    PictureController.$inject = ['Picture', 'PictureSearch'];

    function PictureController(Picture, PictureSearch) {

        var vm = this;

        vm.pictures = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Picture.query(function(result) {
                vm.pictures = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            PictureSearch.query({query: vm.searchQuery}, function(result) {
                vm.pictures = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();
