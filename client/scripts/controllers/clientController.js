// Client Dashboard Controller
var app = angular.module('eventApp');
app.controller('ClientDashboardController', ['$scope', 'AuthService', 'VendorService', 'VenueService', 'EventService', 'BookingService', function($scope, AuthService, VendorService, VenueService, EventService, BookingService) {
    // Check if user is logged in
    var currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        window.location.href = '/index.html';
        return;
    }
    
    // Initialize data
    $scope.user = currentUser;
    $scope.activeTab = 'dashboard';
    $scope.bookingTab = 'all';
    $scope.favoriteTab = 'vendors';
    $scope.settingsTab = 'account';
    $scope.isSidebarOpen = true;
    
    // Dashboard stats
    $scope.stats = {
        upcomingEvents: 2,
        activeBookings: 3,
        savedVendors: 5,
        unreadMessages: 3
    };
    
    // Mock data for upcoming events
    $scope.upcomingEvents = [
        {
            name: 'Company Anniversary',
            location: 'Grand Ballroom, New York',
            date: { day: '15', month: 'Jul' },
            time: '6:00 PM - 11:00 PM'
        },
        {
            name: 'Birthday Party',
            location: 'Seaside Resort, Miami',
            date: { day: '22', month: 'Aug' },
            time: '3:00 PM - 8:00 PM'
        }
    ];
    
    // Mock data for recent bookings
    $scope.recentBookings = [
        {
            vendorName: 'Elegant Photography',
            vendorImage: '/placeholder.svg?height=50&width=50',
            service: 'Event Photography',
            date: 'July 15, 2023',
            price: '$800',
            status: 'confirmed'
        },
        {
            vendorName: 'Delicious Catering',
            vendorImage: '/placeholder.svg?height=50&width=50',
            service: 'Full Catering Service',
            date: 'July 15, 2023',
            price: '$2,500',
            status: 'pending'
        },
        {
            vendorName: 'Rhythm Masters',
            vendorImage: '/placeholder.svg?height=50&width=50',
            service: 'DJ Services',
            date: 'July 15, 2023',
            price: '$600',
            status: 'confirmed'
        }
    ];
    
    // Mock data for recommended vendors
    $scope.recommendedVendors = VendorService.getFeaturedVendors().map(vendor => {
        return {
            ...vendor,
            isFavorite: Math.random() > 0.5
        };
    });
    
    // Mock data for all bookings
    $scope.allBookings = [
        {
            id: 'BK-1234',
            vendorName: 'Elegant Photography',
            vendorImage: '/placeholder.svg?height=60&width=60',
            service: 'Event Photography',
            date: 'July 15, 2023',
            time: '6:00 PM - 11:00 PM',
            location: 'Grand Ballroom, New York',
            price: '$800',
            status: 'confirmed'
        },
        {
            id: 'BK-1235',
            vendorName: 'Delicious Catering',
            vendorImage: '/placeholder.svg?height=60&width=60',
            service: 'Full Catering Service',
            date: 'July 15, 2023',
            time: '5:00 PM - 11:00 PM',
            location: 'Grand Ballroom, New York',
            price: '$2,500',
            status: 'pending'
        },
        {
            id: 'BK-1236',
            vendorName: 'Rhythm Masters',
            vendorImage: '/placeholder.svg?height=60&width=60',
            service: 'DJ Services',
            date: 'July 15, 2023',
            time: '6:00 PM - 11:00 PM',
            location: 'Grand Ballroom, New York',
            price: '$600',
            status: 'confirmed'
        },
        {
            id: 'BK-1237',
            vendorName: 'Floral Designs',
            vendorImage: '/placeholder.svg?height=60&width=60',
            service: 'Event Decoration',
            date: 'June 10, 2023',
            time: '9:00 AM - 2:00 PM',
            location: 'Urban Loft, Chicago',
            price: '$1,200',
            status: 'completed'
        },
        {
            id: 'BK-1238',
            vendorName: 'Party Planners',
            vendorImage: '/placeholder.svg?height=60&width=60',
            service: 'Event Planning',
            date: 'May 5, 2023',
            time: 'All Day',
            location: 'Garden Pavilion, Los Angeles',
            price: '$1,800',
            status: 'cancelled'
        }
    ];
    
    // Filter bookings based on tab
    $scope.filteredBookings = $scope.allBookings;
    
    // Mock data for favorites
    $scope.favoriteVendors = VendorService.getFeaturedVendors().filter((_, index) => index % 2 === 0);
    $scope.favoriteVenues = VenueService.getFeaturedVenues().filter((_, index) => index % 2 === 0);
    $scope.favoriteEvents = EventService.getUpcomingEvents().filter((_, index) => index % 2 === 0);
    
    // Mock data for messages
    $scope.contacts = [
        {
            id: 1,
            name: 'Elegant Photography',
            avatar: '/placeholder.svg?height=40&width=40',
            lastMessage: 'Looking forward to working with you!',
            lastMessageTime: '10:30 AM',
            unreadCount: 2,
            isOnline: true,
            messages: [
                {
                    sender: 'them',
                    text: 'Hello! I received your booking request.',
                    time: '10:15 AM'
                },
                {
                    sender: 'me',
                    text: 'Great! I\'m excited about the event.',
                    time: '10:20 AM'
                },
                {
                    sender: 'them',
                    text: 'Looking forward to working with you!',
                    time: '10:30 AM'
                }
            ]
        },
        {
            id: 2,
            name: 'Delicious Catering',
            avatar: '/placeholder.svg?height=40&width=40',
            lastMessage: 'We\'ll need to discuss the menu options.',
            lastMessageTime: 'Yesterday',
            unreadCount: 1,
            isOnline: false,
            messages: [
                {
                    sender: 'them',
                    text: 'Thank you for choosing our catering service.',
                    time: 'Yesterday, 2:15 PM'
                },
                {
                    sender: 'me',
                    text: 'I\'m looking for a menu that includes vegetarian options.',
                    time: 'Yesterday, 2:30 PM'
                },
                {
                    sender: 'them',
                    text: 'We\'ll need to discuss the menu options.',
                    time: 'Yesterday, 2:45 PM'
                }
            ]
        },
        {
            id: 3,
            name: 'Rhythm Masters',
            avatar: '/placeholder.svg?height=40&width=40',
            lastMessage: 'Do you have any specific song requests?',
            lastMessageTime: '2 days ago',
            unreadCount: 0,
            isOnline: true,
            messages: [
                {
                    sender: 'them',
                    text: 'Hello! Thanks for booking our DJ services.',
                    time: '2 days ago, 11:15 AM'
                },
                {
                    sender: 'me',
                    text: 'Hi! I\'m planning a corporate event and need appropriate music.',
                    time: '2 days ago, 11:30 AM'
                },
                {
                    sender: 'them',
                    text: 'Do you have any specific song requests?',
                    time: '2 days ago, 11:45 AM'
                }
            ]
        }
    ];
    
    $scope.selectedContact = null;
    $scope.newMessage = '';
    
    // Mock data for profile
    $scope.profile = {
        fullName: currentUser.name,
        email: currentUser.email,
        phone: '+1 234 567 8900',
        location: 'New York, NY',
        bio: 'Event enthusiast looking for the best vendors and venues for my events.',
        eventTypes: ['corporate', 'social'],
        budget: 'medium',
        notifications: {
            email: true,
            sms: true,
            push: false
        }
    };
    
    // Mock data for settings
    

    $scope.settings = {
        email: currentUser.email,
        username: currentUser.name.toLowerCase().replace(' ', '.'),
        language: 'en',
        timezone: 'est'
    };
    
    $scope.security = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorAuth: false,
        sessions: [
            {
                device: 'Chrome on Windows',
                location: 'New York, USA',
                lastActive: 'Now',
                current: true
            },
            {
                device: 'Safari on iPhone',
                location: 'New York, USA',
                lastActive: '2 hours ago',
                current: false
            },
            {
                device: 'Firefox on Mac',
                location: 'Chicago, USA',
                lastActive: '1 day ago',
                current: false
            }
        ]
    };
    
    $scope.notifications = {
        email: {
            booking: true,
            messages: true,
            promotions: false
        },
        sms: {
            booking: true,
            messages: false
        },
        push: {
            booking: true,
            messages: true,
            promotions: false
        }
    };
    
    $scope.paymentMethods = [
        {
            type: 'visa',
            name: 'Visa Card',
            last4: '4242',
            expMonth: '12',
            expYear: '2025',
            default: true
        },
        {
            type: 'mastercard',
            name: 'Mastercard',
            last4: '5678',
            expMonth: '09',
            expYear: '2024',
            default: false
        }
    ];
    
    $scope.privacy = {
        showProfile: true,
        allowContact: true,
        shareHistory: false,
        dataCollection: true
    };
    
    // Set active tab
    $scope.setActiveTab = function(tab) {
        $scope.activeTab = tab;
    };
    
    // Set booking tab
    $scope.setBookingTab = function(tab) {
        $scope.bookingTab = tab;
        
        // Filter bookings based on tab
        if (tab === 'all') {
            $scope.filteredBookings = $scope.allBookings;
        } else {
            $scope.filteredBookings = $scope.allBookings.filter(booking => booking.status === tab);
        }
    };
    
    // Set favorite tab
    $scope.setFavoriteTab = function(tab) {
        $scope.favoriteTab = tab;
    };
    
    // Set settings tab
    $scope.setSettingsTab = function(tab) {
        $scope.settingsTab = tab;
    };
    
    // Toggle sidebar
    $scope.toggleSidebar = function() {
        var sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
    };
    
    // Toggle favorite
    $scope.toggleFavorite = function(item) {
        item.isFavorite = !item.isFavorite;
    };
    
    // Select contact for messaging
    $scope.selectContact = function(contact) {
        $scope.selectedContact = contact;
        contact.unreadCount = 0;
    };
    
    // Send message
    $scope.sendMessage = function() {
        if (!$scope.newMessage.trim() || !$scope.selectedContact) return;
        
        $scope.selectedContact.messages.push({
            sender: 'me',
            text: $scope.newMessage,
            time: '10:30 AM'
        });
        
        $scope.selectedContact.lastMessage = $scope.newMessage;
        $scope.selectedContact.lastMessageTime = 'Just now';
        
        $scope.newMessage = '';
        
        // Simulate reply after 1 second
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.selectedContact.messages.push({
                    sender: 'them',
                    text: 'Thanks for your message! I\'ll get back to you soon.',
                    time: '10:31 AM'
                });
                
                $scope.selectedContact.lastMessage = 'Thanks for your message! I\'ll get back to you soon.';
                $scope.selectedContact.lastMessageTime = 'Just now';
            });
        }, 1000);
    };
    
    // Save profile
    $scope.saveProfile = function() {
        alert('Profile saved successfully!');
    };
    
    // Save settings
    $scope.saveSettings = function() {
        alert('Settings saved successfully!');
    };
    
    // Logout
    $scope.logout = function() {
        AuthService.logout();
        window.location.href = '/index.html';
    };
}]);
