const { analyzeMedicalContent } = require('../services/aiService');

async function analyze(req, res) {
  const { medicalText, ocrText, doctorNotes } = req.body;
  const result = await analyzeMedicalContent({ medicalText, ocrText, doctorNotes });
  return res.json(result);
}

module.exports = { analyze };
