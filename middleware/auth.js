const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkisiz erişim' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'gizli_anahtar');
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Geçersiz token' });
  }
};

module.exports = auth;
