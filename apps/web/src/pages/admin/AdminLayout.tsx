import React from 'react';
import { Routes, Route, useNavigate, NavLink } from 'react-router-dom';
import { Shield, LogOut, Users, Activity, Settings, Database, Building2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { AdminDashboard } from './AdminDashboard';
import { AdminUsers } from './AdminUsers';
import { AdminCRM } from './AdminCRM';
import { AdminSettings } from './AdminSettings';
import { AdminDatabase } from './AdminDatabase';

export function AdminLayout() {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const navClass = ({ isActive }: { isActive: boolean }) => 
    `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
      isActive 
        ? 'bg-slate-900 text-white border border-slate-700' 
        : 'text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent'
    }`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <Shield className="text-purple-500" size={32} />
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter">GOD MODE</h1>
            <p className="text-xs font-mono text-purple-400">Petcare Admin</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/admin" end className={navClass}>
            <Activity size={20} className="text-purple-400" /> Métricas
          </NavLink>
          <NavLink to="/admin/crm" className={navClass}>
            <Building2 size={20} className="text-emerald-400" /> Ventas y Convenios
          </NavLink>
          <NavLink to="/admin/users" className={navClass}>
            <Users size={20} className="text-sky-400" /> Usuarios
          </NavLink>
          <NavLink to="/admin/database" className={navClass}>
            <Database size={20} className="text-amber-400" /> Base de Datos
          </NavLink>
          <NavLink to="/admin/settings" className={navClass}>
            <Settings size={20} className="text-slate-400" /> Configuración
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-900 p-8">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/crm" element={<AdminCRM />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/database" element={<AdminDatabase />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="*" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}
