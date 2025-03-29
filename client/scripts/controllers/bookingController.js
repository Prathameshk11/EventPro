// Booking Details Controller
var app = angular.module('eventApp');
app.controller('BookingDetailsController', ['$scope', '$location', 'AuthService', 'BookingService', function($scope, $location, AuthService, BookingService) {
    // Check if user is logged in
    $scope.isLoggedIn = AuthService.isLoggedIn();
    $scope.currentUser = AuthService.getCurrentUser();
    
    // Get booking ID from URL
    var urlParams = new URLSearchParams(window.location.search);
    var bookingId = parseInt(urlParams.get('id'));
    
    if (!bookingId) {
        window.location.href = '../index.html';
        return;
    }
    
    // Load booking details
    BookingService.getBookingById(bookingId)
        .then(function(response) {
            $scope.booking = response;
        })
        .catch(function(error) {
            console.error('Error loading booking details:', error);
        });
    
    // Get timeline icon based on event type
    $scope.getTimelineIcon = function(type) {
        switch(type) {
            case 'created':
                return 'fa-calendar-plus';
            case 'confirmed':
                return 'fa-check-circle';
            case 'declined':
                return 'fa-times-circle';
            case 'completed':
                return 'fa-flag-checkered';
            case 'cancelled':
                return 'fa-ban';
            case 'payment':
                return 'fa-credit-card';
            default:
                return 'fa-circle';
        }
    };
    
    // Capitalize first letter
    $scope.capitalize = function(input) {
        if (!input) return '';
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
    
    // Cancel booking
    $scope.cancelBooking = function() {
        if (confirm('Are you sure you want to cancel this booking?')) {
            BookingService.updateBookingStatus(bookingId, 'cancelled')
                .then(function(response) {
                    $scope.booking.status = 'cancelled';
                    
                    // Add to timeline
                    $scope.booking.timeline.push({
                        type: 'cancelled',
                        title: 'Booking Cancelled',
                        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        description: 'Booking was cancelled by the client.'
                    });
                })
                .catch(function(error) {
                    console.error('Error cancelling booking:', error);
                });
        }
    };
    
    // Accept booking (vendor only)
    $scope.acceptBooking = function() {
        BookingService.updateBookingStatus(bookingId, 'confirmed')
            .then(function(response) {
                $scope.booking.status = 'confirmed';
                
                // Add to timeline
                $scope.booking.timeline.push({
                    type: 'confirmed',
                    title: 'Booking Confirmed',
                    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    description: 'Booking was confirmed by the vendor.'
                });
            })
            .catch(function(error) {
                console.error('Error accepting booking:', error);
            });
    };
    
    // Decline booking (vendor only)
    $scope.declineBooking = function() {
        var reason = prompt('Please provide a reason for declining this booking:');
        if (reason !== null) {
            BookingService.updateBookingStatus(bookingId, 'declined', reason)
                .then(function(response) {
                    $scope.booking.status = 'declined';
                    
                    // Add to timeline
                    $scope.booking.timeline.push({
                        type: 'declined',
                        title: 'Booking Declined',
                        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        description: 'Booking was declined by the vendor. Reason: ' + reason
                    });
                })
                .catch(function(error) {
                    console.error('Error declining booking:', error);
                });
        }
    };
    
    // Proceed to payment
    $scope.proceedToPayment = function() {
        window.location.href = '../payment.html?bookingId=' + bookingId;
    };
    
    // Send message
    $scope.sendMessage = function() {
        if (!$scope.newMessage) return;
        
        var message = {
            sender: $scope.currentUser.role,
            senderName: $scope.currentUser.name,
            avatar: $scope.currentUser.avatar || '/placeholder.svg?height=40&width=40',
            text: $scope.newMessage,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        
        BookingService.sendMessage(bookingId, message)
            .then(function(response) {
                $scope.booking.messages.push(message);
                $scope.newMessage = '';
                
                // Scroll to bottom of chat
                var chatMessages = document.querySelector('.chat-messages');
                chatMessages.scrollTop = chatMessages.scrollHeight;
            })
            .catch(function(error) {
                console.error('Error sending message:', error);
            });
    };
    
    // Logout
    $scope.logout = function() {
        AuthService.logout();
        window.location.href = '../index.html';
    };
}]);
