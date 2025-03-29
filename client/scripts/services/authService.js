// Authentication Service
var app = angular.module("eventApp")
app.service("AuthService", [
    "$http",
    ($http) => {
        var currentUser = null

        // Check if user is already logged in (from localStorage)
        var storedUser = localStorage.getItem("currentUser")
        if (storedUser) {
            currentUser = JSON.parse(storedUser)
        }

        return {
            // Login user
            login: (email, password) => {
                // In a real app, this would make an API call to authenticate
                return new Promise((resolve, reject) => {
                    // Mock authentication
                    if (email === "client@example.com" && password === "password") {
                        currentUser = {
                            id: 1,
                            name: "John Smith",
                            email: email,
                            role: "client",
                            avatar: "/placeholder.svg?height=50&width=50",
                        }
                        localStorage.setItem("currentUser", JSON.stringify(currentUser))
                        resolve(currentUser)
                    } else if (email === "vendor@example.com" && password === "password") {
                        currentUser = {
                            id: 2,
                            name: "Elegant Photography",
                            email: email,
                            role: "vendor",
                            category: "Photographer",
                            avatar: "/placeholder.svg?height=50&width=50",
                        }
                        localStorage.setItem("currentUser", JSON.stringify(currentUser))
                        resolve(currentUser)
                    } else {
                        reject(new Error("Invalid email or password"))
                    }
                })
            },

            // Register new user
            register: (userData) => {
                // In a real app, this would make an API call to register
                return new Promise((resolve, reject) => {
                    // Mock registration
                    if (userData.email && userData.password) {
                        currentUser = {
                            id: Math.floor(Math.random() * 1000) + 3,
                            name: userData.name,
                            email: userData.email,
                            role: userData.role,
                            avatar: "/placeholder.svg?height=50&width=50",
                        }

                        if (userData.role === "vendor") {
                            currentUser.category = userData.category
                        }

                        localStorage.setItem("currentUser", JSON.stringify(currentUser))
                        resolve(currentUser)
                    } else {
                        reject(new Error("Invalid registration data"))
                    }
                })
            },

            // Logout user
            logout: () => {
                currentUser = null
                localStorage.removeItem("currentUser")
                return Promise.resolve()
            },

            // Check if user is logged in
            isLoggedIn: () => currentUser !== null,

            // Get current user
            getCurrentUser: () => currentUser,

            // Update user profile
            updateProfile: (userData) =>
                new Promise((resolve, reject) => {
                    if (!currentUser) {
                        reject(new Error("User not logged in"))
                        return
                    }

                    // Update user data
                    Object.assign(currentUser, userData)
                    localStorage.setItem("currentUser", JSON.stringify(currentUser))
                    resolve(currentUser)
                }),
        }
    },
])

