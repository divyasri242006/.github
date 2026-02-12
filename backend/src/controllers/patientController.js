const User = require('../models/User');
const PatientProfile = require('../models/PatientProfile');

async function getMyProfile(req, res) {
  const profile = await PatientProfile.findOne({ user: req.user.id }).populate('user', 'name email role');
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  return res.json(profile);
}

async function listPatients(req, res) {
  const patients = await User.find({ role: 'PATIENT' }).select('name email createdAt');
  return res.json(patients);
}

async function createPatient(req, res) {
  const { name, email, password, demographics, history } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });

  const bcrypt = require('bcryptjs');
  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed, role: 'PATIENT' });
  const profile = await PatientProfile.create({ user: user._id, demographics, history });
  return res.status(201).json({ user, profile });
}

async function updatePatient(req, res) {
  const { patientId } = req.params;
  const { name, demographics, history } = req.body;

  const user = await User.findOneAndUpdate({ _id: patientId, role: 'PATIENT' }, { name }, { new: true });
  if (!user) return res.status(404).json({ message: 'Patient not found' });

  const profile = await PatientProfile.findOneAndUpdate(
    { user: patientId },
    { demographics, history },
    { new: true, upsert: true }
  );

  return res.json({ user, profile });
}

module.exports = { getMyProfile, listPatients, createPatient, updatePatient };
