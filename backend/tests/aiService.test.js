const test = require('node:test');
const assert = require('node:assert/strict');

const { analyzeMedicalContent } = require('../src/services/aiService');

test('ai service provides graceful fallback when key is missing', async () => {
  const result = await analyzeMedicalContent({ medicalText: 'abc' });
  assert.equal(typeof result.clinical_summary, 'string');
  assert.ok(Array.isArray(result.risk_flags));
});
