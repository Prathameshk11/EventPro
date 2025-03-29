// Declare the angular variable
var angular = window.angular

// Main AngularJS Application
var app = angular.module("eventApp", ["ngRoute"])

// Configure routes
app.config([
    "$routeProvider",
    "$locationProvider",
    ($routeProvider, $locationProvider) => {
        $routeProvider
            .when("/", {
                templateUrl: "index.html",
                controller: "MainController",
            })
            .when("/client/dashboard", {
                templateUrl: "client/dashboard.html",
                controller: "ClientDashboardController",
                resolve: {
                    auth: ["AuthService", (AuthService) => AuthService.requireAuth("client")],
                },
            })
            .when("/client/profile", {
                templateUrl: "client/profile.html",
                controller: "ClientProfileController",
                resolve: {
                    auth: ["AuthService", (AuthService) => AuthService.requireAuth("client")],
                },
            })
            .when("/client/bookings", {
                templateUrl: "client/bookings.html",
                controller: "ClientBookingsController",
                resolve: {
                    auth: ["AuthService", (AuthService) => AuthService.requireAuth("client")],
                },
            })
            .when("/vendor/dashboard", {
                templateUrl: "vendor/dashboard.html",
                controller: "VendorDashboardController",
                resolve: {
                    auth: ["AuthService", (AuthService) => AuthService.requireAuth("vendor")],
                },
            })
            .when("/vendor/profile", {
                templateUrl: "vendor/profile.html",
                controller: "VendorProfileController",
                resolve: {
                    auth: ["AuthService", (AuthService) => AuthService.requireAuth("vendor")],
                },
            })
            .when("/vendor/services", {
                templateUrl: "vendor/services.html",
                controller: "VendorServicesController",
                resolve: {
                    auth: ["AuthService", (AuthService) => AuthService.requireAuth("vendor")],
                },
            })
            .when("/booking/:id", {
                templateUrl: "booking/details.html",
                controller: "BookingDetailsController",
            })
            .when("/vendors", {
                templateUrl: "vendors/list.html",
                controller: "VendorListController",
            })
            .when("/vendors/:id", {
                templateUrl: "vendors/details.html",
                controller: "VendorDetailsController",
            })
            .when("/venues", {
                templateUrl: "venues/list.html",
                controller: "VenueListController",
            })
            .when("/venues/:id", {
                templateUrl: "venues/details.html",
                controller: "VenueDetailsController",
            })
            .when("/events", {
                templateUrl: "events/list.html",
                controller: "EventListController",
            })
            .when("/events/:id", {
                templateUrl: "events/details.html",
                controller: "EventDetailsController",
            })
            .otherwise({
                redirectTo: "/",
            })

        // Use HTML5 History API for clean URLs
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false,
        })
    },
])

// Authentication Service
app.factory("AuthService", [
    "$http",
    "$q",
    "$location",
    ($http, $q, $location) => {
        var service = {}

        service.login = (credentials) => {
            // In a real application, this would make an API call
            return new Promise((resolve, reject) => {
                // Simulate API call
                setTimeout(() => {
                    if (credentials.email && credentials.password) {
                        // Mock successful login
                        var user = {
                            id: 1,
                            email: credentials.email,
                            name: "John Doe",
                            role: credentials.loginType || (credentials.email.includes("vendor") ? "vendor" : "client"),
                            profileImage: "https://imgs.search.brave.com/8mo6k5CmxHnSJA4SEwh6Jo6ESNHWttqphF-aA6bx4Do/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZGFu/aS1kYW5pZWxzLXNl/bGZpZS1pbi1hLWNh/ci1sMWs4aW43MGlw/eGFiZXllLmpwZw",
                        }
                        localStorage.setItem("currentUser", JSON.stringify(user))
                        resolve(user)
                    } else {
                        reject("Invalid credentials")
                    }
                }, 1000)
            })
        }

        service.signup = (userData) => {
            // In a real application, this would make an API call
            return new Promise((resolve, reject) => {
                // Simulate API call
                setTimeout(() => {
                    if (userData.email && userData.password && userData.fullName) {
                        // Mock successful signup
                        var user = {
                            id: 1,
                            email: userData.email,
                            name: userData.fullName,
                            role: userData.signupType || (userData.businessName ? "vendor" : "client"),
                            profileImage: "../assets/images/prof1-40.jpg",
                        }
                        localStorage.setItem("currentUser", JSON.stringify(user))
                        resolve(user)
                    } else {
                        reject("Invalid user data")
                    }
                }, 1000)
            })
        }

        service.logout = () => {
            localStorage.removeItem("currentUser")
            $location.path("/")
        }

        service.getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"))

        service.isLoggedIn = () => !!service.getCurrentUser()

        service.requireAuth = (role) => {
            var deferred = $q.defer()
            var user = service.getCurrentUser()

            if (user) {
                if (role && user.role !== role) {
                    $location.path("/")
                    deferred.reject("Unauthorized")
                } else {
                    deferred.resolve(user)
                }
            } else {
                $location.path("/")
                deferred.reject("Not logged in")
            }

            return deferred.promise
        }

        service.resetPassword = (email) => {
            // In a real application, this would make an API call
            return new Promise((resolve, reject) => {
                // Simulate API call
                setTimeout(() => {
                    if (email) {
                        resolve({ success: true, message: "Password reset link sent to your email" })
                    } else {
                        reject("Invalid email")
                    }
                }, 1000)
            })
        }

        service.socialLogin = (provider) => {
            // In a real application, this would redirect to the social provider
            return new Promise((resolve, reject) => {
                // Simulate API call
                setTimeout(() => {
                    var user = {
                        id: 2,
                        email: provider + "user@example.com",
                        name: provider === "google" ? "Google User" : "Facebook User",
                        role: "client",
                        profileImage: "../assets/images/prof1-40.jpg",
                    }
                    localStorage.setItem("currentUser", JSON.stringify(user))
                    resolve(user)
                }, 1000)
            })
        }

        return service
    },
])

// Vendor Service
app.factory("VendorService", [
    "$http",
    ($http) => {
        var service = {}

        // Mock data for vendors
        var vendors = [
            {
                id: 1,
                name: "Elegant Photography",
                category: "Photographer",
                location: "New York, NY",
                rating: 4.8,
                price: "$500 - $2000",
                image: "../assets/images/event200.jpg",
                description: "Professional photography services for all types of events.",
                services: ["Wedding Photography", "Event Coverage", "Portrait Sessions"],
                portfolio: ["../assets/images/event200.jpg", "../assets/images/event200.jpg"],
                verified: true,
                tags: ["Wedding", "Corporate", "Portrait"],
                reviewCount: 48,
            },
            {
                id: 2,
                name: "Delicious Catering",
                category: "Caterer",
                location: "Los Angeles, CA",
                rating: 4.9,
                price: "$25 - $75 per person",
                image: "../assets/images/event200.jpg",
                description: "Exquisite catering for all occasions.",
                services: ["Wedding Catering", "Corporate Events", "Cocktail Parties"],
                portfolio: ["../assets/images/event200.jpg", "../assets/images/event200.jpg"],
                verified: true,
                tags: ["Gourmet", "Buffet", "Cocktail"],
                reviewCount: 65,
            },
            {
                id: 3,
                name: "Rhythm Masters",
                category: "Musician/DJ",
                location: "Chicago, IL",
                rating: 4.7,
                price: "$300 - $1500",
                image: "../assets/images/event200.jpg",
                description: "Professional DJs and musicians for your event.",
                services: ["Wedding DJ", "Live Band", "Sound Equipment Rental"],
                portfolio: ["../assets/images/event200.jpg", "../assets/images/event200.jpg"],
                verified: false,
                tags: ["DJ", "Live Music", "Wedding"],
                reviewCount: 37,
            },
            {
                id: 4,
                name: "Floral Designs",
                category: "Decorator",
                location: "Miami, FL",
                rating: 4.6,
                price: "$300 - $3000",
                image: "../assets/images/event200.jpg",
                description: "Beautiful floral arrangements and decorations.",
                services: ["Wedding Decorations", "Floral Arrangements", "Event Styling"],
                portfolio: ["../assets/images/event200.jpg", "../assets/images/event200.jpg"],
                verified: true,
                tags: ["Flowers", "Decor", "Wedding"],
                reviewCount: 52,
            },
            {
                id: 5,
                name: "Party Planners",
                category: "Event Planner",
                location: "Boston, MA",
                rating: 4.9,
                price: "$1000 - $5000",
                image: "../assets/images/event200.jpg",
                description: "Full-service event planning for all occasions.",
                services: ["Wedding Planning", "Corporate Events", "Birthday Parties"],
                portfolio: ["../assets/images/event200.jpg", "../assets/images/event200.jpg"],
                verified: true,
                tags: ["Full Service", "Luxury", "Corporate"],
                reviewCount: 41,
            },
            {
                id: 6,
                name: "Sound Solutions",
                category: "Equipment Rental",
                location: "Austin, TX",
                rating: 4.5,
                price: "$200 - $2000",
                image: "../assets/images/event200.jpg",
                description: "Professional sound and lighting equipment for events.",
                services: ["Sound Systems", "Lighting", "Stage Setup"],
                portfolio: ["../assets/images/event200.jpg", "../assets/images/event200.jpg"],
                verified: false,
                tags: ["Sound", "Lighting", "Technical"],
                reviewCount: 29,
            },
        ]

        service.getFeaturedVendors = () => vendors

        service.getVendorById = (id) => vendors.find((vendor) => vendor.id === Number.parseInt(id))

        service.searchVendors = (query) => {
            if (!query) return vendors

            query = query.toLowerCase()
            return vendors.filter(
                (vendor) =>
                    vendor.name.toLowerCase().includes(query) ||
                    vendor.category.toLowerCase().includes(query) ||
                    vendor.location.toLowerCase().includes(query) ||
                    vendor.tags.some((tag) => tag.toLowerCase().includes(query)),
            )
        }

        service.getVendorsByCategory = (categoryId) =>
            vendors.filter((vendor) => vendor.category.toLowerCase() === categoryId.toLowerCase())

        return service
    },
])

// Venue Service
app.factory("VenueService", [
    "$http",
    ($http) => {
        var service = {}

        // Mock data for venues
        var venues = [
            {
                id: 1,
                name: "Grand Ballroom",
                location: "New York, NY",
                capacity: 500,
                price: "$5000 - $10000",
                image: "../assets/images/event200.jpg",
                features: ["Catering", "Parking", "Sound System"],
                description: "Elegant ballroom for weddings and corporate events.",
                rating: 4.8,
                reviewCount: 65,
                featured: true,
            },
            {
                id: 2,
                name: "Seaside Resort",
                location: "Miami, FL",
                capacity: 300,
                price: "$3000 - $8000",
                image: "../assets/images/event200.jpg",
                features: ["Beach View", "Accommodation", "In-house Catering"],
                description: "Beautiful beachfront venue for weddings and parties.",
                rating: 4.9,
                reviewCount: 78,
                featured: true,
            },
            {
                id: 3,
                name: "Urban Loft",
                location: "Chicago, IL",
                capacity: 150,
                price: "$2000 - $5000",
                image: "../assets/images/event200.jpg",
                features: ["Industrial Style", "Rooftop Access", "AV Equipment"],
                description: "Modern loft space for corporate events and social gatherings.",
                rating: 4.6,
                reviewCount: 42,
                featured: false,
            },
            {
                id: 4,
                name: "Garden Pavilion",
                location: "Los Angeles, CA",
                capacity: 200,
                price: "$3500 - $7000",
                image: "../assets/images/event200.jpg",
                features: ["Outdoor Space", "Garden Setting", "Tent Option"],
                description: "Beautiful garden venue for outdoor events and weddings.",
                rating: 4.7,
                reviewCount: 53,
                featured: false,
            },
            {
                id: 5,
                name: "Historic Mansion",
                location: "Boston, MA",
                capacity: 180,
                price: "$4000 - $9000",
                image: "../assets/images/event200.jpg",
                features: ["Historic Setting", "Indoor/Outdoor", "Exclusive Use"],
                description: "Elegant historic mansion with beautiful grounds for weddings and events.",
                rating: 4.9,
                reviewCount: 47,
                featured: true,
            },
            {
                id: 6,
                name: "Mountain Lodge",
                location: "Denver, CO",
                capacity: 250,
                price: "$3000 - $7500",
                image: "../assets/images/event200.jpg",
                features: ["Mountain Views", "Rustic Setting", "Accommodation"],
                description: "Rustic mountain lodge with breathtaking views for weddings and retreats.",
                rating: 4.8,
                reviewCount: 39,
                featured: false,
            },
        ]

        service.getFeaturedVenues = () => venues

        service.getVenueById = (id) => venues.find((venue) => venue.id === Number.parseInt(id))

        service.searchVenues = (query) => {
            if (!query) return venues

            query = query.toLowerCase()
            return venues.filter(
                (venue) =>
                    venue.name.toLowerCase().includes(query) ||
                    venue.location.toLowerCase().includes(query) ||
                    venue.features.some((feature) => feature.toLowerCase().includes(query)),
            )
        }

        return service
    },
])

// Event Service
app.factory("EventService", [
    "$http",
    ($http) => {
        var service = {}

        // Mock data for events
        var events = [
            {
                id: 1,
                name: "Summer Music Festival",
                location: "Central Park, New York",
                date: { day: "15", month: "Jul" },
                time: "2:00 PM - 10:00 PM",
                price: "$50 - $150",
                image: "../assets/images/event200.jpg",
                description: "Annual summer music festival featuring top artists.",
                attendees: [
                    { name: "John Doe", image: "../assets/images/prof1-40.jpg" },
                    { name: "Jane Smith", image: "../assets/images/prof1-40.jpg" },
                    { name: "Bob Johnson", image: "../assets/images/prof1-40.jpg" },
                    { name: "Alice Brown", image: "../assets/images/prof1-40.jpg" },
                    { name: "Charlie Wilson", image: "../assets/images/prof1-40.jpg" },
                ],
            },
            {
                id: 2,
                name: "Food & Wine Expo",
                location: "Convention Center, Chicago",
                date: { day: "22", month: "Aug" },
                time: "11:00 AM - 7:00 PM",
                price: "$35",
                image: "../assets/images/event200.jpg",
                description: "Explore culinary delights and wine tastings.",
                attendees: [
                    { name: "Emily Davis", image: "../assets/images/prof1-40.jpg" },
                    { name: "Michael Wilson", image: "../assets/images/prof1-40.jpg" },
                    { name: "Sarah Johnson", image: "../assets/images/prof1-40.jpg" },
                ],
            },
            {
                id: 3,
                name: "Tech Conference 2023",
                location: "Tech Hub, San Francisco",
                date: { day: "10", month: "Sep" },
                time: "9:00 AM - 6:00 PM",
                price: "$199 - $499",
                image: "../assets/images/event200.jpg",
                description: "The biggest tech conference of the year.",
                attendees: [
                    { name: "David Lee", image: "../assets/images/prof1-40.jpg" },
                    { name: "Jennifer Kim", image: "../assets/images/prof1-40.jpg" },
                    { name: "Robert Chen", image: "../assets/images/prof1-40.jpg" },
                    { name: "Lisa Wang", image: "../assets/images/prof1-40.jpg" },
                ],
            },
            {
                id: 4,
                name: "Wedding Expo",
                location: "Luxury Hotel, Miami",
                date: { day: "05", month: "Oct" },
                time: "10:00 AM - 4:00 PM",
                price: "Free Entry",
                image: "../assets/images/event200.jpg",
                description: "Everything you need for planning your perfect wedding.",
                attendees: [
                    { name: "Jessica Miller", image: "../assets/images/prof1-40.jpg" },
                    { name: "Ryan Taylor", image: "../assets/images/prof1-40.jpg" },
                    { name: "Amanda White", image: "../assets/images/prof1-40.jpg" },
                    { name: "Chris Brown", image: "../assets/images/prof1-40.jpg" },
                    { name: "Megan Green", image: "../assets/images/prof1-40.jpg" },
                    { name: "Daniel Black", image: "../assets/images/prof1-40.jpg" },
                ],
            },
            {
                id: 5,
                name: "Business Networking Mixer",
                location: "Downtown Hotel, Boston",
                date: { day: "18", month: "Oct" },
                time: "6:00 PM - 9:00 PM",
                price: "$25",
                image: "../assets/images/event200.jpg",
                description: "Connect with local business professionals and entrepreneurs.",
                attendees: [
                    { name: "Thomas Wilson", image: "../assets/images/prof1-40.jpg" },
                    { name: "Laura Martinez", image: "../assets/images/prof1-40.jpg" },
                    { name: "James Johnson", image: "../assets/images/prof1-40.jpg" },
                ],
            },
            {
                id: 6,
                name: "Art Gallery Opening",
                location: "Modern Art Museum, Los Angeles",
                date: { day: "30", month: "Oct" },
                time: "7:00 PM - 10:00 PM",
                price: "$15",
                image: "../assets/images/event200.jpg",
                description: "Opening night for the new contemporary art exhibition.",
                attendees: [
                    { name: "Olivia Parker", image: "../assets/images/prof1-40.jpg" },
                    { name: "Noah Adams", image: "../assets/images/prof1-40.jpg" },
                    { name: "Sophia Rodriguez", image: "../assets/images/prof1-40.jpg" },
                    { name: "Ethan Campbell", image: "../assets/images/prof1-40.jpg" },
                ],
            },
        ]

        service.getUpcomingEvents = () => events

        service.getEventById = (id) => events.find((event) => event.id === Number.parseInt(id))

        service.searchEvents = (query) => {
            if (!query) return events

            query = query.toLowerCase()
            return events.filter(
                (event) =>
                    event.name.toLowerCase().includes(query) ||
                    event.location.toLowerCase().includes(query) ||
                    event.description.toLowerCase().includes(query),
            )
        }

        service.isEventSoonStarting = (event) => {
            // Check if event is within the next 7 days
            var eventDate = new Date()
            var currentMonth = eventDate.getMonth()
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            var eventMonth = months.indexOf(event.date.month)

            if (eventMonth === currentMonth) {
                var currentDay = eventDate.getDate()
                var eventDay = Number.parseInt(event.date.day)

                return eventDay - currentDay <= 7 && eventDay - currentDay >= 0
            }

            return false
        }

        return service
    },
])

// Booking Service
app.factory("BookingService", [
    "$http",
    ($http) => {
        var service = {}

        // Mock data for bookings
        var bookings = []

        service.createBooking = (bookingData) => {
            // In a real application, this would make an API call
            return new Promise((resolve, reject) => {
                // Simulate API call
                setTimeout(() => {
                    var newBooking = {
                        id: bookings.length + 1,
                        ...bookingData,
                        status: "pending",
                        createdAt: new Date(),
                    }
                    bookings.push(newBooking)
                    resolve(newBooking)
                }, 1000)
            })
        }

        service.getUserBookings = (userId, userRole) => {
            // In a real application, this would make an API call
            return new Promise((resolve, reject) => {
                // Simulate API call
                setTimeout(() => {
                    if (userRole === "client") {
                        resolve(bookings.filter((booking) => booking.clientId === userId))
                    } else if (userRole === "vendor") {
                        resolve(bookings.filter((booking) => booking.vendorId === userId))
                    } else {
                        reject("Invalid user role")
                    }
                }, 1000)
            })
        }

        service.updateBookingStatus = (bookingId, status) => {
            // In a real application, this would make an API call
            return new Promise((resolve, reject) => {
                // Simulate API call
                setTimeout(() => {
                    var booking = bookings.find((b) => b.id === bookingId)
                    if (booking) {
                        booking.status = status
                        resolve(booking)
                    } else {
                        reject("Booking not found")
                    }
                }, 1000)
            })
        }

        service.getBookingById = (id) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    var booking = bookings.find((b) => b.id === Number.parseInt(id))
                    if (booking) {
                        resolve(booking)
                    } else {
                        reject("Booking not found")
                    }
                }, 1000)
            })

        return service
    },
])

// Category Service
app.factory("CategoryService", [
    "$http",
    ($http) => {
        var service = {}

        // Mock data for categories
        var categories = [
            {
                id: "photographer",
                name: "Photographers",
                icon: "fas fa-camera",
                description: "Professional photographers for all events",
                color: "#6c63ff",
                vendorCount: 42,
            },
            {
                id: "caterer",
                name: "Caterers",
                icon: "fas fa-utensils",
                description: "Delicious food for your guests",
                color: "#ff6b6b",
                vendorCount: 38,
            },
            {
                id: "venue",
                name: "Venues",
                icon: "fas fa-building",
                description: "Beautiful spaces for any occasion",
                color: "#4caf50",
                vendorCount: 56,
            },
            {
                id: "decorator",
                name: "Decorators",
                icon: "fas fa-paint-brush",
                description: "Transform your event space",
                color: "#ff9800",
                vendorCount: 29,
            },
            {
                id: "musician",
                name: "Musicians & DJs",
                icon: "fas fa-music",
                description: "Entertainment for your event",
                color: "#e91e63",
                vendorCount: 34,
            },
            {
                id: "planner",
                name: "Event Planners",
                icon: "fas fa-clipboard-list",
                description: "Expert planning and coordination",
                color: "#2196f3",
                vendorCount: 25,
            },
            {
                id: "equipment",
                name: "Equipment Rental",
                icon: "fas fa-cogs",
                description: "Sound, lighting, and staging equipment",
                color: "#607d8b",
                vendorCount: 18,
            },
        ]

        service.getAllCategories = () => categories

        service.getCategoryById = (id) => categories.find((category) => category.id === id)

        return service
    },
])

// Newsletter Service
app.factory("NewsletterService", [
    "$http",
    ($http) => {
        var service = {}

        service.subscribe = (email) => {
            // In a real application, this would make an API call
            return new Promise((resolve, reject) => {
                // Simulate API call
                setTimeout(() => {
                    if (email && email.includes("@")) {
                        resolve({ success: true, message: "Successfully subscribed to newsletter" })
                    } else {
                        reject("Invalid email address")
                    }
                }, 1000)
            })
        }

        return service
    },
])

// Run block for application initialization
app.run([
    "$rootScope",
    "AuthService",
    ($rootScope, AuthService) => {
        // Make auth service available in all templates
        $rootScope.auth = AuthService

        // Helper function to get star rating array
        $rootScope.getStars = (rating) => {
            var stars = []
            var fullStars = Math.floor(rating)
            var hasHalfStar = rating % 1 >= 0.5

            for (var i = 0; i < 5; i++) {
                if (i < fullStars) {
                    stars.push("full")
                } else if (i === fullStars && hasHalfStar) {
                    stars.push("half")
                } else {
                    stars.push("empty")
                }
            }

            return stars
        }
    },
])

