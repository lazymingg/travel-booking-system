// Simple authentication middleware
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ 
      error: 'Please login first' 
    });
  }
  next();
};

// Check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Please login first' });
  }
  
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  next();
};

module.exports = {
  requireAuth,
  requireAdmin
};
