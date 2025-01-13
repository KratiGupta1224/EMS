const jwt = require('jsonwebtoken');

const authMiddleware = (role) => (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  // console.log(token);
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user.role);
    if (role && req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

const authMiddlewareWithoutRole = () => (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  // console.log(token);
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = {authMiddleware,authMiddlewareWithoutRole};

