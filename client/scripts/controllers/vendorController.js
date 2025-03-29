// Vendor Dashboard Controller
var app = angular.module("eventApp")
app.controller("VendorDashboardController", [
  "$scope",
  "AuthService",
  "VendorService",
  "BookingService",
  ($scope, AuthService, VendorService, BookingService) => {
    // Check if user is logged in
    var currentUser = AuthService.getCurrentUser()
    if (!currentUser || currentUser.role !== "vendor") {
      window.location.href = "/index.html"
      return
    }

    // Initialize data
    $scope.vendor = {
      id: 1,
      name: "Elegant Photography",
      category: "Photographer",
      location: "New York, NY",
      rating: 4.8,
      avatar: "/placeholder.svg?height=50&width=50",
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
    }

    $scope.activeTab = "dashboard"
    $scope.isSidebarOpen = true

    // Dashboard stats
    $scope.stats = {
      totalBookings: 42,
      pendingBookings: 5,
      revenue: 8750,
      rating: 4.8,
      notifications: 3,
      unreadMessages: 2,
    }

    // Mock data for recent bookings
    $scope.recentBookings = [
      {
        id: 1,
        clientName: "John Smith",
        clientImage: "/placeholder.svg?height=50&width=50",
        service: "Wedding Photography",
        date: "July 15, 2023",
        location: "Grand Ballroom, New York",
        price: "$1,500",
        status: "confirmed",
      },
      {
        id: 2,
        clientName: "Emily Johnson",
        clientImage: "/placeholder.svg?height=50&width=50",
        service: "Event Coverage",
        date: "July 23, 2023",
        location: "Seaside Resort, Miami",
        price: "$500",
        status: "pending",
      },
      {
        id: 3,
        clientName: "Michael Brown",
        clientImage: "/placeholder.svg?height=50&width=50",
        service: "Portrait Session",
        date: "July 30, 2023",
        location: "Urban Loft, Chicago",
        price: "$300",
        status: "confirmed",
      },
    ]

    // Mock data for recent reviews
    $scope.recentReviews = [
      {
        id: 1,
        clientName: "Sarah Williams",
        clientImage: "/placeholder.svg?height=40&width=40",
        date: "June 28, 2023",
        rating: 5,
        text: "Absolutely amazing service! The photos from our wedding are stunning. Highly recommend!",
        replied: true,
        replyDate: "June 29, 2023",
        replyText: "Thank you so much for your kind words, Sarah! It was a pleasure to be part of your special day.",
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
      {
        id: 3,
        clientName: "Jennifer Lee",
        clientImage: "/placeholder.svg?height=40&width=40",
        date: "May 30, 2023",
        rating: 5,
        text: "The portrait session was fantastic! The photographer made us feel comfortable and the photos turned out beautiful.",
        replied: true,
        replyDate: "May 31, 2023",
        replyText: "Thank you, Jennifer! I'm so glad you enjoyed the session and love your photos.",
      },
    ]

    // Set active tab
    $scope.setActiveTab = (tab) => {
      $scope.activeTab = tab
    }

    // Toggle sidebar
    $scope.toggleSidebar = () => {
      var sidebar = document.querySelector(".sidebar")
      sidebar.classList.toggle("active")
    }

    // Logout
    $scope.logout = () => {
      AuthService.logout()
      window.location.href = "/index.html"
    }

    // Filter for capitalizing first letter
    $scope.capitalize = (input) => {
      if (!input) return ""
      return input.charAt(0).toUpperCase() + input.slice(1)
    }

    // Accept booking
    $scope.acceptBooking = (bookingId) => {
      BookingService.updateBookingStatus(bookingId, "confirmed")
        .then((response) => {
          // Update the booking in the list
          for (var i = 0; i < $scope.recentBookings.length; i++) {
            if ($scope.recentBookings[i].id === bookingId) {
              $scope.recentBookings[i].status = "confirmed"
              break
            }
          }
        })
        .catch((error) => {
          console.error("Error accepting booking:", error)
        })
    }

    // Decline booking
    $scope.declineBooking = (bookingId) => {
      BookingService.updateBookingStatus(bookingId, "declined")
        .then((response) => {
          // Update the booking in the list
          for (var i = 0; i < $scope.recentBookings.length; i++) {
            if ($scope.recentBookings[i].id === bookingId) {
              $scope.recentBookings[i].status = "declined"
              break
            }
          }
        })
        .catch((error) => {
          console.error("Error declining booking:", error)
        })
    }

    // Reply to review
    $scope.replyToReview = (reviewId, replyText) => {
      if (!replyText) return

      VendorService.replyToReview(reviewId, replyText)
        .then((response) => {
          // Update the review in the list
          for (var i = 0; i < $scope.recentReviews.length; i++) {
            if ($scope.recentReviews[i].id === reviewId) {
              $scope.recentReviews[i].replied = true
              $scope.recentReviews[i].replyDate = new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
              $scope.recentReviews[i].replyText = replyText
              break
            }
          }
        })
        .catch((error) => {
          console.error("Error replying to review:", error)
        })
    }
  },
])

