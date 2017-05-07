(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('public-offer', {
            parent: 'entity',
            url: '/public-offers',
            data: {
                // authorities: ['ROLE_USER'],
                pageTitle: 'krakowskiTargApp.offer.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/public-offer/public-offers.html',
                    controller: 'OfferController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('offer');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('public-offer-detail', {
            parent: 'offer',
            url: '/public-offers/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'krakowskiTargApp.offer.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/public-offer/offer-detail.html',
                    controller: 'OfferDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('offer');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Offer', function($stateParams, Offer) {
                    return Offer.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'offer',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        });
    }

})();
