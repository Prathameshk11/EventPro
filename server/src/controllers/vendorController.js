// src/controllers/vendorController.js
const Vendor = require('../models/vendor');

exports.createVendor = async (req, res) => {
    try {
        const vendor = await Vendor.create(req.body);
        res.status(201).json({
            status: 'success',
            data: vendor
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.findAll();
        res.status(200).json({
            status: 'success',
            data: vendors
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) {
            return res.status(404).json({
                status: 'error',
                message: 'Vendor not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: vendor
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const [updated] = await Vendor.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedVendor = await Vendor.findByPk(req.params.id);
            return res.status(200).json({
                status: 'success',
                data: updatedVendor
            });
        }
        throw new Error('Vendor not found');
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        const deleted = await Vendor.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(200).json({
                status: 'success',
                message: 'Vendor deleted successfully'
            });
        }
        throw new Error('Vendor not found');
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};