const OpenAI = require('openai');
const env = require('../config/env');

const client = env.openAiApiKey ? new OpenAI({ apiKey: env.openAiApiKey }) : null;

async function analyzeMedicalContent({ medicalText = '', ocrText = '', doctorNotes = '' }) {
  const fallback = {
    clinical_summary: 'AI summary unavailable. Please review the report manually.',
    patient_friendly_summary: 'We could not generate your easy-to-read summary right now.',
    risk_flags: ['AI_UNAVAILABLE'],
    recommended_followup: 'Consult your doctor for a detailed interpretation.',
  };

  if (!client) return fallback;

  const prompt = `You are a clinical AI assistant. Return ONLY valid JSON with keys clinical_summary, patient_friendly_summary, risk_flags (array), recommended_followup.\n\nMedical Text:\n${medicalText}\n\nOCR Text:\n${ocrText}\n\nDoctor Notes:\n${doctorNotes}`;

  try {
    const completion = await Promise.race([
      client.chat.completions.create({
        model: env.openAiModel,
        temperature: 0.2,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('AI_TIMEOUT')), env.openAiTimeoutMs)),
    ]);

    const parsed = JSON.parse(completion.choices[0].message.content);
    return {
      clinical_summary: parsed.clinical_summary || fallback.clinical_summary,
      patient_friendly_summary: parsed.patient_friendly_summary || fallback.patient_friendly_summary,
      risk_flags: Array.isArray(parsed.risk_flags) ? parsed.risk_flags : [],
      recommended_followup: parsed.recommended_followup || fallback.recommended_followup,
    };
  } catch (error) {
    return {
      ...fallback,
      risk_flags: [error.message || 'AI_FAILURE'],
    };
  }
}

module.exports = { analyzeMedicalContent };
