import { useState } from 'react';
import api from '../services/api/client';

export default function AIAssistantPage() {
  const [payload, setPayload] = useState({ medicalText: '', ocrText: '', doctorNotes: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/ai/analyze', payload);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="card space-y-3">
        <h3 className="font-semibold">AI Medical Summary Engine</h3>
        <textarea className="input" rows="4" placeholder="Medical text" value={payload.medicalText} onChange={(e) => setPayload({ ...payload, medicalText: e.target.value })} />
        <textarea className="input" rows="4" placeholder="OCR extracted text" value={payload.ocrText} onChange={(e) => setPayload({ ...payload, ocrText: e.target.value })} />
        <textarea className="input" rows="4" placeholder="Doctor notes" value={payload.doctorNotes} onChange={(e) => setPayload({ ...payload, doctorNotes: e.target.value })} />
        <button className="btn-primary" onClick={analyze} disabled={loading}>{loading ? 'Analyzing...' : 'Generate Summary'}</button>
      </div>
      <div className="card">
        <h3 className="font-semibold mb-3">AI Result Panel</h3>
        {result ? (
          <div className="space-y-3 text-sm">
            <div><p className="font-medium">Clinical Summary</p><p>{result.clinical_summary}</p></div>
            <div><p className="font-medium">Patient-Friendly Summary</p><p>{result.patient_friendly_summary}</p></div>
            <div><p className="font-medium">Risk Flags</p><p>{(result.risk_flags || []).join(', ') || 'None'}</p></div>
            <div><p className="font-medium">Recommended Follow-up</p><p>{result.recommended_followup}</p></div>
          </div>
        ) : <p className="text-slate-500 text-sm">No summary generated yet.</p>}
      </div>
    </div>
  );
}
