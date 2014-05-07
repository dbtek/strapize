var app = angular.module('strapize', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/theme/:themeName', {
        templateUrl: 'templates/theme.html'
    });

    $routeProvider.when('/home', {
        templateUrl: 'templates/home.html'
    });

    $routeProvider.when('/', {
        templateUrl: 'templates/wait.html'
    });
});