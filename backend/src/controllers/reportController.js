const path = require('path');
const MedicalReport = require('../models/MedicalReport');

async function createReport(req, res) {
  const { patientId, diagnosis, treatmentNotes, prescription, extractedText } = req.body;

  if (req.user.role !== 'DOCTOR' && req.user.id !== patientId) {
    return res.status(403).json({ message: 'Forbidden for this patient' });
  }

  const fileUrl = req.file ? `/uploads/${path.basename(req.file.path)}` : undefined;
  const report = await MedicalReport.create({
    patient: patientId || req.user.id,
    doctor: req.user.id,
    diagnosis,
    treatmentNotes,
    prescription,
    extractedText,
    fileType: req.file?.mimetype,
    fileUrl,
  });

  return res.status(201).json(report);
}

async function listReports(req, res) {
  const filter = req.user.role === 'DOCTOR' ? {} : { patient: req.user.id };
  const reports = await MedicalReport.find(filter)
    .populate('patient', 'name email')
    .populate('doctor', 'name email')
    .sort({ createdAt: -1 });
  return res.json(reports);
}

async function getPatientReports(req, res) {
  const { patientId } = req.params;
  if (req.user.role !== 'DOCTOR' && req.user.id !== patientId) {
    return res.status(403).json({ message: 'Forbidden for this patient' });
  }

  const reports = await MedicalReport.find({ patient: patientId }).sort({ createdAt: -1 });
  return res.json(reports);
}

module.exports = { createReport, listReports, getPatientReports };
