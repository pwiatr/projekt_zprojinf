(function () {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
