// /models/vendor.model.js
const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    enum: [
      'Photographer', 
      'Musician', 
      'Caterer', 
      'Venue', 
      'Decorator', 
      'DJ'
    ],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  services: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  portfolioImages: [String],
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Add text search index
VendorSchema.index({ 
  name: 'text', 
  description: 'text', 
  category: 'text' 
});

module.exports = mongoose.model('Vendor', VendorSchema);