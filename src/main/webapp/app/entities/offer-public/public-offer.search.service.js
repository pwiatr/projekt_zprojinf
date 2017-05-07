(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .factory('PublicOfferSearch', PublicOfferSearch);

    PublicOfferSearch.$inject = ['$resource'];

    function PublicOfferSearch($resource) {
        var resourceUrl =  'api/public/_search/offers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
