(function () {
    'use strict';
    angular
        .module('app.main', [])
        .controller('indexController', indexController);

    indexController.$inject = ['$scope', '$http'];
    function indexController($scope) {
        $scope.buttonClicked = function () {
            $http.get('/webscraper').success(function() {
                
            });
        };
    };
})();