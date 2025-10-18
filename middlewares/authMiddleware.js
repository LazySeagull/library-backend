const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function authenticate(req, res, next) {
  // Get token from request header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Format: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user data to request
    next(); // move to next middleware or route
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Middleware to restrict by role
function authorize(roles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // If no role restriction → allow all
    if (roles.length === 0) return next();

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden - insufficient privileges' });
    }

    next();
  };
}

module.exports = { authenticate, authorize };
