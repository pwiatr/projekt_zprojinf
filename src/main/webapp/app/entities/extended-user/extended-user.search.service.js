(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .factory('ExtendedUserSearch', ExtendedUserSearch);

    ExtendedUserSearch.$inject = ['$resource'];

    function ExtendedUserSearch($resource) {
        var resourceUrl =  'api/_search/extended-users/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
