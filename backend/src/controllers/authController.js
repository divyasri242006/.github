const bcrypt = require('bcryptjs');
const User = require('../models/User');
const PatientProfile = require('../models/PatientProfile');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/tokens');

async function signup(req, res) {
  const { name, email, password, role = 'PATIENT' } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed, role });

  if (user.role === 'PATIENT') {
    await PatientProfile.create({ user: user._id, demographics: {}, history: {} });
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  return res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  });
}

async function refresh(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });

  const payload = verifyRefreshToken(refreshToken);
  const user = await User.findById(payload.sub);
  if (!user) return res.status(401).json({ message: 'Invalid refresh token' });

  return res.json({ accessToken: signAccessToken(user) });
}

module.exports = { signup, login, refresh };
