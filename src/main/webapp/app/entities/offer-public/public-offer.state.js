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
                    templateUrl: 'app/entities/offer-public/public-offers.html',
                    controller: 'PublicOfferController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('offer');
                    $translatePartialLoader.addPart('extendedUser');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('public-offer-detail', {
            parent: 'public-offer',
            url: '/{id}',
            data: {
                // authorities: ['ROLE_USER'],
                pageTitle: 'krakowskiTargApp.offer.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/offer-public/public-offer-detail.html',
                    controller: 'PublicOfferDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('offer');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'PublicOffer', function($stateParams, PublicOffer) {
                    return PublicOffer.get({id : $stateParams.id}).$promise;
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
