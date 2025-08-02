import UserSession from '../models/userSession.model.js';

const authenticateSession = async (req, res, next) => {
  try {
    // Get session token from cookie or header
    const token = req.cookies?.token || req.header('x-session-token');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No session token provided'
      });
    }

    // Find and validate session
    const userSession = await UserSession.findOne({ 
      sessionId: token,
      isActive: true,
      expiresAt: { $gt: new Date() }
    });

    if (!userSession) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session'
      });
    }

    // Attach user session to request
    req.userSession = userSession;
    req.walletAddress = userSession.walletAddress;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export default authenticateSession;
