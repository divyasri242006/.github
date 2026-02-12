const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    demographics: {
      dateOfBirth: Date,
      gender: String,
      phone: String,
      address: String,
      emergencyContact: String,
    },
    history: {
      allergies: [String],
      chronicConditions: [String],
      surgeries: [String],
      medications: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PatientProfile', patientProfileSchema);
