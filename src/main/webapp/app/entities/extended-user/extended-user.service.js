(function() {
    'use strict';
    angular
        .module('krakowskiTargApp')
        .factory('ExtendedUser', ExtendedUser);

    ExtendedUser.$inject = ['$resource'];

    function ExtendedUser ($resource) {
        var resourceUrl =  'api/extended-users/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
