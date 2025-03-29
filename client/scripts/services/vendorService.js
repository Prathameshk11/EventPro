// Vendor Service
var app = angular.module("eventApp")
app.service("VendorService", [
    "$http",
    ($http) => {
        // Mock vendors data
        var vendors = [
            {
                id: 1,
                name: "Elegant Photography",
                category: "Photographer",
                location: "New York, NY",
                rating: 4.8,
                reviewCount: 42,
                price: "$$",
                avatar: "/placeholder.svg?height=100&width=100",
                coverImage: "/placeholder.svg?height=300&width=800",
                description: "Professional photography services for all types of events.",
                services: [
                    {
                        id: 1,
                        name: "Wedding Photography",
                        price: "$1500",
                        description: "Complete wedding day coverage including engagement session.",
                    },
                    {
                        id: 2,
                        name: "Event Coverage",
                        price: "$500",
                        description: "Professional photography for corporate events, parties, and more.",
                    },
                    {
                        id: 3,
                        name: "Portrait Session",
                        price: "$300",
                        description: "Individual or family portrait sessions in studio or on location.",
                    },
                ],
                portfolio: [
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                ],
                reviews: [
                    {
                        id: 1,
                        clientName: "Sarah Williams",
                        clientImage: "/placeholder.svg?height=40&width=40",
                        date: "June 28, 2023",
                        rating: 5,
                        text: "Absolutely amazing service! The photos from our wedding are stunning. Highly recommend!",
                        replied: true,
                        replyDate: "June 29, 2023",
                        replyText:
                            "Thank you so much for your kind words, Sarah! It was a pleasure to be part of your special day.",
                    },
                    {
                        id: 2,
                        clientName: "David Miller",
                        clientImage: "/placeholder.svg?height=40&width=40",
                        date: "June 15, 2023",
                        rating: 4,
                        text: "Great photos from our corporate event. Professional service and quick delivery.",
                        replied: false,
                    },
                ],
            },
            {
                id: 2,
                name: "Grand Ballroom",
                category: "Venue",
                location: "New York, NY",
                rating: 4.9,
                reviewCount: 78,
                price: "$$$",
                avatar: "/placeholder.svg?height=100&width=100",
                coverImage: "/placeholder.svg?height=300&width=800",
                description: "Elegant venue for weddings, corporate events, and special occasions.",
                services: [
                    {
                        id: 1,
                        name: "Wedding Package",
                        price: "$5000",
                        description: "Complete wedding package including venue rental, catering, and decoration.",
                    },
                    {
                        id: 2,
                        name: "Corporate Event",
                        price: "$3000",
                        description: "Venue rental for corporate events with AV equipment and catering options.",
                    },
                    {
                        id: 3,
                        name: "Private Party",
                        price: "$2000",
                        description: "Venue rental for private parties and celebrations.",
                    },
                ],
                portfolio: [
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                    "/placeholder.svg?height=200&width=300",
                ],
                reviews: [
                    {
                        id: 1,
                        clientName: "Jennifer Lee",
                        clientImage: "/placeholder.svg?height=40&width=40",
                        date: "May 30, 2023",
                        rating: 5,
                        text: "The venue was absolutely beautiful for our wedding. The staff was professional and attentive.",
                        replied: true,
                        replyDate: "May 31, 2023",
                        replyText: "Thank you, Jennifer! We're so glad you enjoyed your special day at our venue.",
                    },
                ],
            },
        ]

        return {
            // Get all vendors
            getAllVendors: () => Promise.resolve(vendors),

            // Get vendors by category
            getVendorsByCategory: (category) => {
                var filteredVendors = vendors.filter((vendor) => vendor.category.toLowerCase() === category.toLowerCase())
                return Promise.resolve(filteredVendors)
            },

            // Get vendor by ID
            getVendorById: (vendorId) => {
                var vendor = vendors.find((vendor) => vendor.id === vendorId)

                if (vendor) {
                    return Promise.resolve(vendor)
                } else {
                    return Promise.reject(new Error("Vendor not found"))
                }
            },

            // Search vendors
            searchVendors: (query) => {
                var filteredVendors = vendors.filter(
                    (vendor) =>
                        vendor.name.toLowerCase().includes(query.toLowerCase()) ||
                        vendor.category.toLowerCase().includes(query.toLowerCase()) ||
                        vendor.location.toLowerCase().includes(query.toLowerCase()),
                )
                return Promise.resolve(filteredVendors)
            },

            // Update vendor profile
            updateVendorProfile: (vendorId, profileData) => {
                var vendor = vendors.find((vendor) => vendor.id === vendorId)

                if (vendor) {
                    Object.assign(vendor, profileData)
                    return Promise.resolve(vendor)
                } else {
                    return Promise.reject(new Error("Vendor not found"))
                }
            },

            // Add service
            addService: (vendorId, serviceData) => {
                var vendor = vendors.find((vendor) => vendor.id === vendorId)

                if (vendor) {
                    var newService = {
                        id: vendor.services.length + 1,
                        ...serviceData,
                    }

                    vendor.services.push(newService)
                    return Promise.resolve(newService)
                } else {
                    return Promise.reject(new Error("Vendor not found"))
                }
            },

            // Update service
            updateService: (vendorId, serviceId, serviceData) => {
                var vendor = vendors.find((vendor) => vendor.id === vendorId)

                if (vendor) {
                    var service = vendor.services.find((service) => service.id === serviceId)

                    if (service) {
                        Object.assign(service, serviceData)
                        return Promise.resolve(service)
                    } else {
                        return Promise.reject(new Error("Service not found"))
                    }
                } else {
                    return Promise.reject(new Error("Vendor not found"))
                }
            },

            // Delete service
            deleteService: (vendorId, serviceId) => {
                var vendor = vendors.find((vendor) => vendor.id === vendorId)

                if (vendor) {
                    var serviceIndex = vendor.services.findIndex((service) => service.id === serviceId)

                    if (serviceIndex !== -1) {
                        vendor.services.splice(serviceIndex, 1)
                        return Promise.resolve(true)
                    } else {
                        return Promise.reject(new Error("Service not found"))
                    }
                } else {
                    return Promise.reject(new Error("Vendor not found"))
                }
            },

            // Add portfolio item
            addPortfolioItem: (vendorId, imageUrl) => {
                var vendor = vendors.find((vendor) => vendor.id === vendorId)

                if (vendor) {
                    vendor.portfolio.push(imageUrl)
                    return Promise.resolve(vendor.portfolio)
                } else {
                    return Promise.reject(new Error("Vendor not found"))
                }
            },

            // Delete portfolio item
            deletePortfolioItem: (vendorId, index) => {
                var vendor = vendors.find((vendor) => vendor.id === vendorId)

                if (vendor) {
                    if (index >= 0 && index < vendor.portfolio.length) {
                        vendor.portfolio.splice(index, 1)
                        return Promise.resolve(vendor.portfolio)
                    } else {
                        return Promise.reject(new Error("Portfolio item not found"))
                    }
                } else {
                    return Promise.reject(new Error("Vendor not found"))
                }
            },

            // Reply to review
            replyToReview: (reviewId, replyText) => {
                var foundReview = null
                var foundVendor = null

                // Find the review and vendor
                for (var i = 0; i < vendors.length; i++) {
                    var vendor = vendors[i]
                    for (var j = 0; j < vendor.reviews.length; j++) {
                        var review = vendor.reviews[j]
                        if (review.id === reviewId) {
                            foundReview = review
                            foundVendor = vendor
                            break
                        }
                    }
                    if (foundReview) break
                }

                if (foundReview) {
                    foundReview.replied = true
                    foundReview.replyDate = new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })
                    foundReview.replyText = replyText
                    return Promise.resolve(foundReview)
                } else {
                    return Promise.reject(new Error("Review not found"))
                }
            },
        }
    },
])

