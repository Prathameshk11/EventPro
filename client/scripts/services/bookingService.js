// Booking Service
var app = angular.module("eventApp")
app.service("BookingService", [
    "$http",
    ($http) => {
        // Mock bookings data
        var bookings = [
            {
                id: 1,
                service: "Wedding Photography",
                date: "July 15, 2023",
                time: "2:00 PM - 8:00 PM",
                location: "Grand Ballroom, New York",
                price: "$1,500",
                status: "confirmed",
                paymentStatus: "paid",
                eventDetails:
                    "Wedding ceremony and reception for 150 guests. Coverage includes preparation, ceremony, formal portraits, and reception.",
                specialRequests:
                    "Please capture candid moments of the bride's grandmother who is celebrating her 90th birthday.",
                client: {
                    id: 1,
                    name: "John Smith",
                    email: "john@example.com",
                    phone: "(123) 456-7890",
                    avatar: "/placeholder.svg?height=80&width=80",
                },
                vendor: {
                    id: 2,
                    name: "Elegant Photography",
                    category: "Photographer",
                    email: "info@elegantphoto.com",
                    phone: "(987) 654-3210",
                    avatar: "/placeholder.svg?height=80&width=80",
                },
                timeline: [
                    {
                        type: "created",
                        title: "Booking Created",
                        date: "June 1, 2023",
                        time: "10:15 AM",
                        description: "Booking request was submitted by the client.",
                    },
                    {
                        type: "confirmed",
                        title: "Booking Confirmed",
                        date: "June 2, 2023",
                        time: "2:30 PM",
                        description: "Booking was confirmed by the vendor.",
                    },
                    {
                        type: "payment",
                        title: "Payment Completed",
                        date: "June 5, 2023",
                        time: "11:45 AM",
                        description: "Full payment of $1,500 was received.",
                    },
                ],
                messages: [
                    {
                        sender: "client",
                        senderName: "John Smith",
                        avatar: "/placeholder.svg?height=40&width=40",
                        text: "Hi, I'm looking forward to working with you for our wedding!",
                        time: "3:30 PM",
                    },
                    {
                        sender: "vendor",
                        senderName: "Elegant Photography",
                        avatar: "/placeholder.svg?height=40&width=40",
                        text: "Thank you, John! We're excited to capture your special day. Do you have any specific shots in mind?",
                        time: "4:15 PM",
                    },
                    {
                        sender: "client",
                        senderName: "John Smith",
                        avatar: "/placeholder.svg?height=40&width=40",
                        text: "Yes, we'd love to get some sunset photos if possible.",
                        time: "5:00 PM",
                    },
                    {
                        sender: "vendor",
                        senderName: "Elegant Photography",
                        avatar: "/placeholder.svg?height=40&width=40",
                        text: "The venue has a beautiful terrace that would be perfect for sunset shots. We'll make sure to schedule time for that.",
                        time: "5:10 PM",
                    },
                ],
            },
            {
                id: 2,
                service: "Event Coverage",
                date: "July 23, 2023",
                time: "9:00 AM - 5:00 PM",
                location: "Seaside Resort, Miami",
                price: "$500",
                status: "pending",
                paymentStatus: "pending",
                eventDetails:
                    "Corporate team building event for 50 employees. Coverage includes activities, group photos, and awards ceremony.",
                client: {
                    id: 3,
                    name: "Emily Johnson",
                    email: "emily@example.com",
                    phone: "(555) 123-4567",
                    avatar: "/placeholder.svg?height=80&width=80",
                },
                vendor: {
                    id: 2,
                    name: "Elegant Photography",
                    category: "Photographer",
                    email: "info@elegantphoto.com",
                    phone: "(987) 654-3210",
                    avatar: "/placeholder.svg?height=80&width=80",
                },
                timeline: [
                    {
                        type: "created",
                        title: "Booking Created",
                        date: "June 15, 2023",
                        time: "3:45 PM",
                        description: "Booking request was submitted by the client.",
                    },
                ],
                messages: [
                    {
                        sender: "client",
                        senderName: "Emily Johnson",
                        avatar: "/placeholder.svg?height=40&width=40",
                        text: "Hello, I'm interested in booking your services for our corporate event.",
                        time: "3:50 PM",
                    },
                    {
                        sender: "vendor",
                        senderName: "Elegant Photography",
                        avatar: "/placeholder.svg?height=40&width=40",
                        text: "Hi Emily, thank you for your interest! I'll review your booking request and get back to you shortly.",
                        time: "4:30 PM",
                    },
                ],
            },
        ]

        return {
            // Get all bookings
            getAllBookings: () => Promise.resolve(bookings),

            // Get bookings for client
            getClientBookings: (clientId) => {
                var clientBookings = bookings.filter((booking) => booking.client.id === clientId)
                return Promise.resolve(clientBookings)
            },

            // Get bookings for vendor
            getVendorBookings: (vendorId) => {
                var vendorBookings = bookings.filter((booking) => booking.vendor.id === vendorId)
                return Promise.resolve(vendorBookings)
            },

            // Get booking by ID
            getBookingById: (bookingId) => {
                var booking = bookings.find((booking) => booking.id === bookingId)

                if (booking) {
                    return Promise.resolve(booking)
                } else {
                    return Promise.reject(new Error("Booking not found"))
                }
            },

            // Create new booking
            createBooking: (bookingData) => {
                var newBooking = {
                    id: bookings.length + 1,
                    ...bookingData,
                    status: "pending",
                    paymentStatus: "pending",
                    timeline: [
                        {
                            type: "created",
                            title: "Booking Created",
                            date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
                            description: "Booking request was submitted by the client.",
                        },
                    ],
                    messages: [],
                }

                bookings.push(newBooking)
                return Promise.resolve(newBooking)
            },

            // Update booking status
            updateBookingStatus: (bookingId, status, reason) => {
                var booking = bookings.find((booking) => booking.id === bookingId)

                if (booking) {
                    booking.status = status

                    // Add to timeline
                    var timelineEvent = {
                        type: status,
                        title: "Booking " + status.charAt(0).toUpperCase() + status.slice(1),
                        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
                        description: "Booking was " + status + ".",
                    }

                    if (reason) {
                        timelineEvent.description += " Reason: " + reason
                    }

                    booking.timeline.push(timelineEvent)

                    return Promise.resolve(booking)
                } else {
                    return Promise.reject(new Error("Booking not found"))
                }
            },

            // Update payment status
            updatePaymentStatus: (bookingId, status) => {
                var booking = bookings.find((booking) => booking.id === bookingId)

                if (booking) {
                    booking.paymentStatus = status

                    // Add to timeline if paid
                    if (status === "paid") {
                        booking.timeline.push({
                            type: "payment",
                            title: "Payment Completed",
                            date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
                            description: "Full payment of " + booking.price + " was received.",
                        })
                    }

                    return Promise.resolve(booking)
                } else {
                    return Promise.reject(new Error("Booking not found"))
                }
            },

            // Send message
            sendMessage: (bookingId, message) => {
                var booking = bookings.find((booking) => booking.id === bookingId)

                if (booking) {
                    if (!booking.messages) {
                        booking.messages = []
                    }

                    booking.messages.push(message)
                    return Promise.resolve(booking)
                } else {
                    return Promise.reject(new Error("Booking not found"))
                }
            },
        }
    },
])

