import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card"><h3 className="font-semibold">Security Posture</h3><p className="text-sm text-slate-600 mt-2">JWT session, RBAC control, secure upload channels.</p></div>
      <div className="card"><h3 className="font-semibold">Medical Timeline</h3><p className="text-sm text-slate-600 mt-2">Unified access to reports, scans, prescriptions and notes.</p></div>
      <div className="card"><h3 className="font-semibold">AI Clinical Support</h3><p className="text-sm text-slate-600 mt-2">Generate summaries with clinical + patient-friendly views.</p></div>
      <div className="card md:col-span-3">
        <h3 className="font-semibold">{user?.role === 'DOCTOR' ? 'Doctor Workspace' : 'Patient Portal'}</h3>
        <p className="text-sm text-slate-600 mt-2">{user?.role === 'DOCTOR' ? 'Manage patients, author treatment notes, upload files, and run AI-assisted report writing.' : 'Review your treatment history, prescriptions, and AI explanations of your reports.'}</p>
      </div>
    </div>
  );
}
