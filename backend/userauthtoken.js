const jwt = require('jsonwebtoken');

// Middleware untuk autentikasi
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });

    req.user = user; // Menyimpan informasi user ke request
    next();
  });
}

module.exports = authenticateToken;
