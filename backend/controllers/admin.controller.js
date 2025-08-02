import AdminWallet from '../models/admin.model.js';

// Create a new admin wallet
export const createAdminWallet = async (req, res) => {
    try {
        const { walletAddress, role } = req.body;
        if (!walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'walletAddress is required',
            });
        }
        const existing = await AdminWallet.findOne({ walletAddress });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Admin wallet already exists',
            });
        }
        const adminWallet = await AdminWallet.create({ walletAddress, role });
        return res.status(201).json({
            success: true,
            message: 'Admin wallet created successfully',
            data: adminWallet,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Get all admin wallets
export const getAllAdminWallets = async (req, res) => {
    try {
        const admins = await AdminWallet.find();
        return res.status(200).json({
            success: true,
            message: 'Admin wallets retrieved successfully',
            data: admins,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Get a single admin wallet by walletAddress
export const getAdminWalletByAddress = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const admin = await AdminWallet.findOne({ walletAddress });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin wallet not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Admin wallet retrieved successfully',
            data: admin,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Update admin role by walletAddress
export const updateAdminRole = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({
                success: false,
                message: 'role is required',
            });
        }
        const admin = await AdminWallet.findOneAndUpdate(
            { walletAddress },
            { role },
            { new: true }
        );
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin wallet not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Admin role updated successfully',
            data: admin,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Delete an admin wallet by walletAddress
export const deleteAdminWallet = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const admin = await AdminWallet.findOneAndDelete({ walletAddress });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin wallet not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Admin wallet deleted successfully',
            data: admin,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};
