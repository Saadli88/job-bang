const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Accès refusé' });

  try {
    const decoded = jwt.verify(token, 'tonSecret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
