import { useEffect, useState } from 'react';
import api from '../services/api/client';

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const loadPatients = async () => {
    const { data } = await api.get('/patients');
    setPatients(data);
  };
  useEffect(() => { loadPatients(); }, []);

  const addPatient = async (e) => {
    e.preventDefault();
    await api.post('/patients', form);
    setForm({ name: '', email: '', password: '' });
    loadPatients();
  };

  return (
    <div className="space-y-4">
      <form className="card grid md:grid-cols-4 gap-3" onSubmit={addPatient}>
        <input className="input" placeholder="Patient name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Temp password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn-primary">Add Patient</button>
      </form>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b"><th className="py-2">Name</th><th>Email</th><th>Created</th></tr></thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p._id} className="border-b"><td className="py-2">{p.name}</td><td>{p.email}</td><td>{new Date(p.createdAt).toLocaleDateString()}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
