import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Stethoscope, Users, Activity, Settings, ChevronRight, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { ClinicalWorkspace } from './ClinicalWorkspace';
import { VetAppointments } from './VetAppointments';

export function VetLayout() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar B2B */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col text-slate-300">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-teal-500 p-2 rounded-lg text-white">
            <Stethoscope size={24} />
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight block leading-none">CLÍNICA</span>
            <span className="text-xs text-slate-400 font-medium">PetCare SaaS</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/vet/agenda" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Calendar size={20} />
            <span className="font-medium">Agenda y Espera</span>
          </Link>
          <Link to="/vet/workspace" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Activity size={20} />
            <span className="font-medium">Sala de Atención</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <Users size={20} />
            <span className="font-medium">Directorio Pacientes</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <Settings size={20} />
            <span className="font-medium">Configuración</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition-colors text-left" onClick={handleLogout}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
                {user?.full_name.slice(0, 2).toUpperCase() || 'DR'}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{user?.full_name.split(' ')[0]}</p>
                <p className="text-xs text-slate-400">Desconectar</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-600" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col h-screen">
        <Routes>
          <Route path="agenda" element={<VetAppointments />} />
          <Route path="workspace" element={<ClinicalWorkspace />} />
          <Route path="*" element={<VetAppointments />} />
        </Routes>
      </main>
    </div>
  );
}
