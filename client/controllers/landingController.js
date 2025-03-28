eventHubApp.controller('LandingController', ['$scope', '$location', 'SearchService', 
    function($scope, $location, SearchService) {
    
    // Featured Vendors
    $scope.featuredVendors = [
        {
            id: 1,
            name: 'Capture Moments Photography',
            category: 'Photographer',
            description: 'Professional event photography',
            rating: 4.8,
            image: 'path/to/photographer.jpg'
        },
        {
            id: 2,
            name: 'Melody Makers Band',
            category: 'Musicians',
            description: 'Live music for all occasions',
            rating: 4.6,
            image: 'path/to/band.jpg'
        }
    ];

    // Search Functionality
    $scope.searchQuery = '';
    $scope.searchVendors = function() {
        if ($scope.searchQuery) {
            // Navigate to search page with query
            $location.path('/search').search('query', $scope.searchQuery);
        }
    };

    // Fetch Featured Vendors
    $scope.loadFeaturedVendors = function() {
        SearchService.getFeaturedVendors()
            .then(function(vendors) {
                $scope.featuredVendors = vendors;
            })
            .catch(function(error) {
                console.error('Error loading featured vendors:', error);
            });
    };

    // Initialize
    $scope.loadFeaturedVendors();
}]);