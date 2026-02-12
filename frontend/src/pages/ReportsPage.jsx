import { useEffect, useState } from 'react';
import api from '../services/api/client';
import { useAuth } from '../hooks/useAuth';

export default function ReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ patientId: '', diagnosis: '', treatmentNotes: '', prescription: '', extractedText: '' });
  const [file, setFile] = useState(null);

  const loadReports = async () => {
    const { data } = await api.get('/reports');
    setReports(data);
  };
  useEffect(() => { loadReports(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
    if (file) fd.append('file', file);
    if (user.role === 'PATIENT') fd.append('patientId', user.id);
    await api.post('/reports', fd);
    setForm({ patientId: '', diagnosis: '', treatmentNotes: '', prescription: '', extractedText: '' });
    setFile(null);
    loadReports();
  };

  return (
    <div className="space-y-4">
      <form className="card grid md:grid-cols-2 gap-3" onSubmit={submit}>
        <h3 className="md:col-span-2 font-semibold">Upload Medical Report</h3>
        {user.role === 'DOCTOR' && <input className="input" placeholder="Patient ID" value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} />}
        <input className="input" placeholder="Diagnosis" value={form.diagnosis} onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} />
        <input className="input md:col-span-2" placeholder="Treatment Notes" value={form.treatmentNotes} onChange={(e) => setForm({ ...form, treatmentNotes: e.target.value })} />
        <input className="input md:col-span-2" placeholder="Prescription" value={form.prescription} onChange={(e) => setForm({ ...form, prescription: e.target.value })} />
        <textarea className="input md:col-span-2" placeholder="OCR or extracted text" value={form.extractedText} onChange={(e) => setForm({ ...form, extractedText: e.target.value })} />
        <input type="file" className="input md:col-span-2" onChange={(e) => setFile(e.target.files?.[0])} />
        <button className="btn-primary md:col-span-2" type="submit">Save Report</button>
      </form>
      <div className="grid gap-3">
        {reports.map((r) => (
          <div key={r._id} className="card">
            <p className="font-semibold">Diagnosis: {r.diagnosis || 'N/A'}</p>
            <p className="text-sm text-slate-600 mt-1">Notes: {r.treatmentNotes || 'N/A'}</p>
            <p className="text-sm text-slate-600 mt-1">Prescription: {r.prescription || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
