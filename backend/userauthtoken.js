const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifikasi token dan tambahkan user_id ke req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { user_id: decoded.user_id };
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};

module.exports = authorize;