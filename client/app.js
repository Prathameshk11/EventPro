// app.js
var eventHubApp = angular.module('eventHubApp', ['ngRoute']);

// Route Configuration
eventHubApp.config(function($routeProvider) {
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
        .otherwise({
            redirectTo: '/'
        });
});