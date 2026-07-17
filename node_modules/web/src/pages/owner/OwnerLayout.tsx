import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { PawPrint, Settings, ChevronRight, LayoutDashboard, Calendar, Activity, Users } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { OwnerPets } from './OwnerPets';
import { OwnerDashboard } from './OwnerDashboard';
import { OwnerAppointments } from './OwnerAppointments';
import { OwnerTriage } from './OwnerTriage';
import { OwnerCommunity } from './OwnerCommunity';

export function OwnerLayout() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar B2C */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-center">
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter">
            PETCARE<span className="text-sky-500">.AI</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/owner" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-sky-600 transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Resumen</span>
          </Link>
          <Link to="/owner/pets" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-sky-600 transition-colors">
            <PawPrint size={20} />
            <span className="font-medium">Mis Mascotas</span>
          </Link>
          <Link to="/owner/triage" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors group">
            <Activity size={20} className="text-sky-500 group-hover:animate-pulse" />
            <span className="font-bold text-sky-600">Triaje Inteligente</span>
          </Link>
          <Link to="/owner/appointments" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-sky-600 transition-colors">
            <Calendar size={20} />
            <span className="font-medium">Agenda</span>
          </Link>
          <Link to="/owner/community" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-sky-600 transition-colors">
            <Users size={20} />
            <span className="font-medium">Comunidad</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left" onClick={handleLogout}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs">
                {user?.full_name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{user?.full_name.split(' ')[0]}</p>
                <p className="text-xs text-slate-500">Mi Perfil</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<OwnerDashboard />} />
          <Route path="/pets" element={<OwnerPets />} />
          <Route path="/triage" element={<OwnerTriage />} />
          <Route path="/appointments" element={<OwnerAppointments />} />
          <Route path="/community" element={<OwnerCommunity />} />
          <Route path="*" element={<OwnerDashboard />} />
        </Routes>
      </main>
    </div>
  );
}
