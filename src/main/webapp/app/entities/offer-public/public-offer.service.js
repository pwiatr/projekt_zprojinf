(function() {
    'use strict';
    angular
        .module('krakowskiTargApp')
        .factory('PublicOffer', PublicOffer);

    PublicOffer.$inject = ['$resource', 'DateUtils'];

    function PublicOffer ($resource, DateUtils) {
        var resourceUrl =  'api/public/offers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertLocalDateFromServer(data.date);
                    }
                    return data;
                }
            }
        });
    }
})();
