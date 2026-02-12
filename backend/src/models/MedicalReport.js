const mongoose = require('mongoose');

const medicalReportSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String },
    fileType: { type: String },
    diagnosis: { type: String, trim: true },
    treatmentNotes: { type: String, trim: true },
    prescription: { type: String, trim: true },
    extractedText: { type: String, trim: true },
    aiSummary: {
      clinicalSummary: String,
      patientFriendlySummary: String,
      riskFlags: [String],
      recommendedFollowup: String,
      generatedAt: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicalReport', medicalReportSchema);
