(function () {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .factory('Files', Files);

    Files.$inject = ['$resource'];

    function Files ($resource) {
        var files = $resource('api/public/files', {}, {
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
        });

        return files;
    }
})();
