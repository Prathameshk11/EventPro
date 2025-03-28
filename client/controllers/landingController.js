// controllers/landingController.js
eventHubApp.controller('LandingController', function($scope) {
    $scope.featuredVendors = [
        {
            id: 1,
            name: 'Capture Moments Photography',
            category: 'Photographer',
            description: 'Professional event photography',
            rating: 4.8
        },
        {
            id: 2,
            name: 'Melody Makers Band',
            category: 'Musicians',
            description: 'Live music for all occasions',
            rating: 4.6
        }
    ];

    $scope.searchVendors = function() {
        // Implement search logic
        console.log('Searching vendors');
    };
});