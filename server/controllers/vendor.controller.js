// controllers/vendor.controller.js
const Vendor = require('../models/vendor.model');
const logger = require('../utils/logger');

exports.createVendor = async (req, res) => {
  try {
    const vendorData = req.body;
    const newVendor = new Vendor(vendorData);
    
    const savedVendor = await newVendor.save();
    
    res.status(201).json({
      message: 'Vendor created successfully',
      vendor: savedVendor,
    });
  } catch (error) {
    logger.error('Vendor creation error:', error);
    res.status(400).json({
      message: 'Error creating vendor',
      error: error.message,
    });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const vendors = await Vendor.find(query)
      .limit(50)
      .sort({ rating: -1 });

    res.json({
      total: vendors.length,
      vendors,
    });
  } catch (error) {
    logger.error('Fetch vendors error:', error);
    res.status(500).json({
      message: 'Error fetching vendors',
      error: error.message,
    });
  }
};

exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    res.json(vendor);
  } catch (error) {
    logger.error('Vendor fetch error:', error);
    res.status(500).json({
      message: 'Error fetching vendor',
      error: error.message,
    });
  }
};