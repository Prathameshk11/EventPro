// Declare the app variable
var app = angular.module("eventApp")

// Then fix the controller definition
app.controller("MainController", [
  "$scope",
  "AuthService",
  "VendorService",
  "VenueService",
  "EventService",
  "CategoryService",
  ($scope, AuthService, VendorService, VenueService, EventService, CategoryService) => {
    // Initialize data
    $scope.isMenuOpen = false
    $scope.showLoginModal = false
    $scope.showSignupModal = false
    $scope.showForgotPasswordModal = false
    $scope.showUserMenu = false
    $scope.signupType = "client"
    $scope.loginType = "client"
    $scope.currentTestimonial = 0

    // Check if user is already logged in
    $scope.currentUser = AuthService.getCurrentUser()

    // Login and signup form data
    $scope.loginData = {
      email: "",
      password: "",
      remember: false,
      loginType: "client",
    }

    $scope.signupData = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      businessCategory: "",
      businessDescription: "",
      phoneNumber: "",
      terms: false,
      signupType: "client",
    }

    $scope.resetData = {
      email: "",
    }

    $scope.newsletter = {
      email: "",
    }

    // Get featured vendors, venues, and events
    $scope.featuredVendors = VendorService.getFeaturedVendors()
    $scope.featuredVenues = VenueService.getFeaturedVenues()
    $scope.upcomingEvents = EventService.getUpcomingEvents()

    // Get categories
    $scope.categories = CategoryService.getAllCategories()

    // Testimonials
    $scope.testimonials = [
      {
        name: "Sarah Johnson",
        role: "Bride",
        image: "/placeholder.svg?height=60&width=60",
        text: "EventPro made planning my wedding so much easier! I found the perfect venue and vendors all in one place.",
        rating: 5,
      },
      {
        name: "Michael Brown",
        role: "Corporate Event Manager",
        image: "/placeholder.svg?height=60&width=60",
        text: "As a corporate event planner, I rely on EventPro to find reliable vendors quickly. The platform has saved me countless hours.",
        rating: 4,
      },
      {
        name: "Jessica Williams",
        role: "Photographer",
        image: "/placeholder.svg?height=60&width=60",
        text: "Being a vendor on EventPro has helped me grow my photography business. The platform connects me with clients I wouldn't have found otherwise.",
        rating: 5,
      },
    ]

    // Set testimonial
    $scope.setTestimonial = (index) => {
      $scope.currentTestimonial = index
    }

    // Next testimonial
    $scope.nextTestimonial = () => {
      $scope.currentTestimonial = ($scope.currentTestimonial + 1) % $scope.testimonials.length
    }

    // Previous testimonial
    $scope.prevTestimonial = () => {
      $scope.currentTestimonial =
        ($scope.currentTestimonial - 1 + $scope.testimonials.length) % $scope.testimonials.length
    }

    // Toggle mobile menu
    $scope.toggleMenu = () => {
      $scope.isMenuOpen = !$scope.isMenuOpen
    }

    // Toggle user menu
    $scope.toggleUserMenu = () => {
      $scope.showUserMenu = !$scope.showUserMenu
    }

    // Modal functions
    $scope.openLoginModal = () => {
      $scope.showLoginModal = true
      $scope.showSignupModal = false
      $scope.showForgotPasswordModal = false
    }

    $scope.closeLoginModal = () => {
      $scope.showLoginModal = false
    }

    $scope.openSignupModal = (type) => {
      $scope.showSignupModal = true
      $scope.showLoginModal = false
      $scope.showForgotPasswordModal = false
      if (type) {
        $scope.setSignupType(type)
      }
    }

    $scope.closeSignupModal = () => {
      $scope.showSignupModal = false
    }

    $scope.openForgotPasswordModal = () => {
      $scope.showForgotPasswordModal = true
      $scope.showLoginModal = false
      $scope.showSignupModal = false
    }

    $scope.closeForgotPasswordModal = () => {
      $scope.showForgotPasswordModal = false
    }

    $scope.switchToSignup = () => {
      $scope.closeLoginModal()
      $scope.openSignupModal()
    }

    $scope.switchToLogin = () => {
      $scope.closeSignupModal()
      $scope.closeForgotPasswordModal()
      $scope.openLoginModal()
    }

    $scope.setSignupType = (type) => {
      $scope.signupType = type
      $scope.signupData.signupType = type
    }

    $scope.setLoginType = (type) => {
      $scope.loginType = type
      $scope.loginData.loginType = type
    }

    $scope.forgotPassword = () => {
      $scope.openForgotPasswordModal()
    }

    $scope.resetPassword = () => {
      $scope.resetInProgress = true

      AuthService.resetPassword($scope.resetData.email)
        .then((response) => {
          alert("Password reset link has been sent to your email.")
          $scope.closeForgotPasswordModal()
          $scope.resetInProgress = false
        })
        .catch((error) => {
          alert("Failed to send reset link: " + error)
          $scope.resetInProgress = false
        })
    }

    // Authentication functions
    $scope.login = () => {
      $scope.loginInProgress = true

      AuthService.login($scope.loginData)
        .then((user) => {
          $scope.closeLoginModal()
          $scope.currentUser = user
          $scope.loginInProgress = false

          // Redirect based on user role
          if (user.role === "client") {
            window.location.href = "/client/dashboard.html"
          } else if (user.role === "vendor") {
            window.location.href = "/vendor/dashboard.html"
          }
        })
        .catch((error) => {
          alert("Login failed: " + error)
          $scope.loginInProgress = false
        })
    }

    $scope.signup = () => {
      if ($scope.signupData.password !== $scope.signupData.confirmPassword) {
        alert("Passwords do not match")
        return
      }

      $scope.signupInProgress = true

      AuthService.signup($scope.signupData)
        .then((user) => {
          $scope.closeSignupModal()
          $scope.currentUser = user
          $scope.signupInProgress = false

          // Redirect based on user role
          if (user.role === "client") {
            window.location.href = "/client/dashboard.html"
          } else if (user.role === "vendor") {
            window.location.href = "/vendor/dashboard.html"
          }
        })
        .catch((error) => {
          alert("Signup failed: " + error)
          $scope.signupInProgress = false
        })
    }

    $scope.logout = () => {
      AuthService.logout()
      $scope.currentUser = null
      window.location.href = "/"
    }

    $scope.isLoggedIn = () => AuthService.isLoggedIn()

    // Social login/signup
    $scope.socialLogin = (provider) => {
      AuthService.socialLogin(provider)
        .then((user) => {
          $scope.closeLoginModal()
          $scope.currentUser = user

          // Redirect based on user role
          if (user.role === "client") {
            window.location.href = "/client/dashboard.html"
          } else if (user.role === "vendor") {
            window.location.href = "/vendor/dashboard.html"
          }
        })
        .catch((error) => {
          alert("Social login failed: " + error)
        })
    }

    $scope.socialSignup = (provider) => {
      AuthService.socialLogin(provider)
        .then((user) => {
          $scope.closeSignupModal()
          $scope.currentUser = user

          // Redirect based on user role
          if (user.role === "client") {
            window.location.href = "/client/dashboard.html"
          } else if (user.role === "vendor") {
            window.location.href = "/vendor/dashboard.html"
          }
        })
        .catch((error) => {
          alert("Social signup failed: " + error)
        })
    }

    // View terms and privacy policy
    $scope.viewTerms = (event) => {
      event.preventDefault()
      alert("Terms of Service would open here")
    }

    $scope.viewPrivacyPolicy = (event) => {
      event.preventDefault()
      alert("Privacy Policy would open here")
    }

    // Subscribe to newsletter
    $scope.subscribeNewsletter = () => {
      if (!$scope.newsletter.email) {
        alert("Please enter your email address")
        return
      }

      alert("Thank you for subscribing to our newsletter!")
      $scope.newsletter.email = ""
    }

    // Check if event is starting soon
    $scope.isEventSoonStarting = (event) => EventService.isEventSoonStarting(event)

    // Search functions
    $scope.searchAll = () => {
      // In a real app, this would redirect to search results page
      alert("Search for: " + JSON.stringify($scope.searchQuery))
    }

    $scope.searchByCategory = (categoryId) => {
      window.location.href = "/vendors?category=" + categoryId
    }

    // View vendor profile
    $scope.viewVendorProfile = (vendorId) => {
      window.location.href = "/vendors/" + vendorId
    }

    // View venue details
    $scope.viewVenueDetails = (venueId) => {
      window.location.href = "/venues/" + venueId
    }

    // Book event
    $scope.bookEvent = (eventId) => {
      if (!$scope.isLoggedIn()) {
        $scope.openLoginModal()
        return
      }

      window.location.href = "/events/" + eventId
    }
  },
])

