import React from 'react';
import { Users, Stethoscope, Activity, TrendingUp, DollarSign } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-black text-white">Platform Overview</h2>
        <p className="text-slate-400 mt-2">Métricas globales y estado del sistema en tiempo real.</p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-sky-500/10 rounded-xl">
              <Users className="text-sky-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">
              <TrendingUp size={14} className="mr-1" /> +12%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Dueños Activos</h3>
          <p className="text-3xl font-black text-white">2,845</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-teal-500/10 rounded-xl">
              <Stethoscope className="text-teal-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">
              <TrendingUp size={14} className="mr-1" /> +5%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Clínicas B2B</h3>
          <p className="text-3xl font-black text-white">124</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Activity className="text-purple-400" size={24} />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Consultas IA (Mes)</h3>
          <p className="text-3xl font-black text-white">14,209</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <DollarSign className="text-amber-400" size={24} />
            </div>
            <span className="flex items-center text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">
              <TrendingUp size={14} className="mr-1" /> +18%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">MRR Estimado</h3>
          <p className="text-3xl font-black text-white">$12,400</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico Fake */}
        <div className="col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Crecimiento de Usuarios</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 55, 45, 70, 65, 80, 95].map((h, i) => (
              <div key={i} className="w-full bg-slate-700 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md transition-all group-hover:opacity-80" 
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-slate-500 text-xs mt-4 font-mono">
            <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Últimos Registros Clínicos</h3>
          <div className="space-y-4">
            {[
              { c: 'Clínica VetSalud', t: 'Hace 5 min' },
              { c: 'Hospital Animal Care', t: 'Hace 12 min' },
              { c: 'PetVet Center', t: 'Hace 45 min' },
              { c: 'Clínica San Francisco', t: 'Hace 1 hora' },
              { c: 'Centro Veterinario Sur', t: 'Hace 2 horas' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{a.c}</p>
                  <p className="text-xs text-slate-500">Suscripción PRO activa</p>
                </div>
                <span className="text-xs text-slate-500 ml-auto">{a.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
