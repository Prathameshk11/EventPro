eventHubApp.service('SearchService', ['$http', '$q', function($http, $q) {
    // Base API URL (placeholder)
    const API_BASE_URL = 'https://api.eventhub.com';

    return {
        // Get Featured Vendors
        getFeaturedVendors: function() {
            return $http.get(`${API_BASE_URL}/vendors/featured`)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    // Fallback to local data if API fails
                    return [
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
                });
        },

        // Search Vendors
        searchVendors: function(query, filters) {
            return $http.get(`${API_BASE_URL}/vendors/search`, {
                params: { 
                    query: query, 
                    ...filters 
                }
            }).then(function(response) {
                return response.data;
            });
        }
    };
}]);