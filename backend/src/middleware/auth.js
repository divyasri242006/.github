const User = require('../models/User');
const { verifyAccessToken } = require('../utils/tokens');

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Invalid token user' });

    req.user = { id: user._id, role: user.role, email: user.email, name: user.name };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = auth;
