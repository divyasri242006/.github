const jwt = require('jsonwebtoken');
const env = require('../config/env');

function signAccessToken(user) {
  return jwt.sign({ sub: user._id, role: user.role }, env.accessSecret, { expiresIn: env.accessExpiresIn });
}

function signRefreshToken(user) {
  return jwt.sign({ sub: user._id, role: user.role }, env.refreshSecret, { expiresIn: env.refreshExpiresIn });
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.accessSecret);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, env.refreshSecret);
}

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
