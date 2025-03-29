// Client Service
var app = angular.module("eventApp")
app.service("ClientService", [
    "$http",
    ($http) => {
        // Mock clients data
        var clients = [
            {
                id: 1,
                name: "John Smith",
                email: "john@example.com",
                phone: "(123) 456-7890",
                avatar: "/placeholder.svg?height=100&width=100",
                address: "123 Main St, New York, NY 10001",
                preferences: {
                    eventTypes: ["Wedding", "Birthday"],
                    budget: "$1000 - $5000",
                    location: "New York, NY",
                },
                favoriteVendors: [1, 2],
                bookingHistory: [1],
            },
            {
                id: 3,
                name: "Emily Johnson",
                email: "emily@example.com",
                phone: "(555) 123-4567",
                avatar: "/placeholder.svg?height=100&width=100",
                address: "456 Park Ave, Miami, FL 33101",
                preferences: {
                    eventTypes: ["Corporate", "Conference"],
                    budget: "$500 - $2000",
                    location: "Miami, FL",
                },
                favoriteVendors: [1],
                bookingHistory: [2],
            },
        ]

        return {
            // Get client by ID
            getClientById: (clientId) => {
                var client = clients.find((client) => client.id === clientId)

                if (client) {
                    return Promise.resolve(client)
                } else {
                    return Promise.reject(new Error("Client not found"))
                }
            },

            // Update client profile
            updateClientProfile: (clientId, profileData) => {
                var client = clients.find((client) => client.id === clientId)

                if (client) {
                    Object.assign(client, profileData)
                    return Promise.resolve(client)
                } else {
                    return Promise.reject(new Error("Client not found"))
                }
            },

            // Update client preferences
            updateClientPreferences: (clientId, preferences) => {
                var client = clients.find((client) => client.id === clientId)

                if (client) {
                    client.preferences = preferences
                    return Promise.resolve(client)
                } else {
                    return Promise.reject(new Error("Client not found"))
                }
            },

            // Add favorite vendor
            addFavoriteVendor: (clientId, vendorId) => {
                var client = clients.find((client) => client.id === clientId)

                if (client) {
                    if (!client.favoriteVendors.includes(vendorId)) {
                        client.favoriteVendors.push(vendorId)
                    }
                    return Promise.resolve(client.favoriteVendors)
                } else {
                    return Promise.reject(new Error("Client not found"))
                }
            },

            // Remove favorite vendor
            removeFavoriteVendor: (clientId, vendorId) => {
                var client = clients.find((client) => client.id === clientId)

                if (client) {
                    var index = client.favoriteVendors.indexOf(vendorId)
                    if (index !== -1) {
                        client.favoriteVendors.splice(index, 1)
                    }
                    return Promise.resolve(client.favoriteVendors)
                } else {
                    return Promise.reject(new Error("Client not found"))
                }
            },

            // Get booking history
            getBookingHistory: (clientId) => {
                var client = clients.find((client) => client.id === clientId)

                if (client) {
                    return Promise.resolve(client.bookingHistory)
                } else {
                    return Promise.reject(new Error("Client not found"))
                }
            },
        }
    },
])

