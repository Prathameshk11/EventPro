// Main Application Module
var eventHubApp = angular.module('eventHubApp', ['ngRoute']);

// Route Configuration
eventHubApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/landing.html',
            controller: 'LandingController'
        })
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })
        .when('/search', {
            templateUrl: 'pages/search.html',
            controller: 'SearchController'
        })
        .when('/vendor-registration', {
            templateUrl: 'pages/vendor-registration.html',
            controller: 'VendorRegistrationController'
        })
        .when('/venue-booking', {
            templateUrl: 'pages/venue-booking.html',
            controller: 'VenueBookingController'
        })
        .when('/vendor-profile/:id', {
            templateUrl: 'pages/vendor-profile.html',
            controller: 'VendorProfileController'
        })
        .when('/event-details/:id', {
            templateUrl: 'pages/event-details.html',
            controller: 'EventDetailsController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

// Global Error Handling
eventHubApp.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
        console.error('Route change error:', rejection);
        $location.path('/');
    });
}]);