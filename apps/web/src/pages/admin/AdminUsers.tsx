import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User, Shield, Users } from 'lucide-react';

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false });
      if (data) setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-black text-white">Directorio de Usuarios</h2>
        <p className="text-slate-400 mt-2">Gestión de cuentas B2B y B2C registradas en la plataforma.</p>
      </header>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="text-sky-400" size={20} /> Base de Datos de Usuarios
          </h3>
          <span className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full text-sm font-bold">
            Total: {users.length}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900/50 text-slate-300 uppercase font-semibold text-xs">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Correo (Auth)</th>
                <th className="px-6 py-4">Rol del Sistema</th>
                <th className="px-6 py-4">Fecha de Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center">Cargando datos...</td></tr>
              ) : users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                      {u.full_name?.charAt(0) || u.name?.charAt(0) || '?'}
                    </div>
                    <span className="font-medium text-slate-200">{u.full_name || u.name}</span>
                  </td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      u.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' :
                      u.role === 'CLINIC' ? 'bg-teal-500/20 text-teal-400' :
                      'bg-sky-500/20 text-sky-400'
                    }`}>
                      {u.role === 'ADMIN' && <Shield size={12} className="inline mr-1" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
