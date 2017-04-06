(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('extended-user', {
            parent: 'entity',
            url: '/extended-user',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'krakowskiTargApp.extendedUser.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/extended-user/extended-users.html',
                    controller: 'ExtendedUserController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('extendedUser');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('extended-user-detail', {
            parent: 'extended-user',
            url: '/extended-user/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'krakowskiTargApp.extendedUser.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/extended-user/extended-user-detail.html',
                    controller: 'ExtendedUserDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('extendedUser');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ExtendedUser', function($stateParams, ExtendedUser) {
                    return ExtendedUser.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'extended-user',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('extended-user-detail.edit', {
            parent: 'extended-user-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/extended-user/extended-user-dialog.html',
                    controller: 'ExtendedUserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExtendedUser', function(ExtendedUser) {
                            return ExtendedUser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('extended-user.new', {
            parent: 'extended-user',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/extended-user/extended-user-dialog.html',
                    controller: 'ExtendedUserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('extended-user', null, { reload: 'extended-user' });
                }, function() {
                    $state.go('extended-user');
                });
            }]
        })
        .state('extended-user.edit', {
            parent: 'extended-user',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/extended-user/extended-user-dialog.html',
                    controller: 'ExtendedUserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExtendedUser', function(ExtendedUser) {
                            return ExtendedUser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('extended-user', null, { reload: 'extended-user' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('extended-user.delete', {
            parent: 'extended-user',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/extended-user/extended-user-delete-dialog.html',
                    controller: 'ExtendedUserDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ExtendedUser', function(ExtendedUser) {
                            return ExtendedUser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('extended-user', null, { reload: 'extended-user' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
