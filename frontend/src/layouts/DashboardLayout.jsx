import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const links = [
    { to: '/dashboard', label: 'Overview' },
    ...(user?.role === 'DOCTOR' ? [{ to: '/doctor/patients', label: 'Patients' }] : []),
    { to: '/reports', label: 'Medical Reports' },
    { to: '/ai-assistant', label: 'AI Assistant' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 hidden md:block bg-slate-900 text-white p-4">
        <h1 className="font-bold text-lg">Secure AI Hospital</h1>
        <p className="text-xs text-slate-300 mt-1">E-Report System</p>
        <nav className="mt-6 space-y-2">
          {links.map((item) => (
            <Link key={item.to} to={item.to} className={`block px-3 py-2 rounded ${location.pathname === item.to ? 'bg-teal-600' : 'hover:bg-slate-800'}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <header className="flex justify-between items-center mb-6 card">
          <div>
            <h2 className="text-lg font-semibold">Welcome, {user?.name}</h2>
            <p className="text-slate-500 text-sm">Role: {user?.role}</p>
          </div>
          <button className="btn-primary" onClick={logout}>Logout</button>
        </header>
        {children}
      </main>
    </div>
  );
}
