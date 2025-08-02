import AdminWallet from '../models/admin.model.js';
import authenticateSession from './auth.js';

const isAdmin = async (req, res, next) => {
  try {
    // First authenticate the session
    await authenticateSession(req, res, (err) => {
      if (err) return next(err);
    });

    // Check if the authenticated user is an admin
    const walletAddress = req.walletAddress;
    const admin = await AdminWallet.findOne({ walletAddress });
    
    if (!admin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: not an admin'
      });
    }

    // Attach admin info to request
    req.admin = admin;
    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export default isAdmin;
