import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { usePetStore } from '../../store/petStore';
import { AlertTriangle, Syringe, Clock, CalendarCheck } from 'lucide-react';

export function OwnerDashboard() {
  const { user } = useAuthStore();
  const { pets } = usePetStore();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Hola, {user?.full_name.split(' ')[0]} 👋</h1>
        <p className="text-slate-500">Aquí tienes el resumen de la salud de tus mascotas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card bg-gradient-to-br from-sky-500 to-sky-600 text-white border-none">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold opacity-90">Mascotas Registradas</h3>
            <div className="p-2 bg-white/20 rounded-lg"><Activity size={20} /></div>
          </div>
          <span className="text-4xl font-bold">{pets.length}</span>
        </div>
        
        <div className="glass-card bg-gradient-to-br from-teal-500 to-teal-600 text-white border-none">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold opacity-90">Próximas Citas</h3>
            <div className="p-2 bg-white/20 rounded-lg"><CalendarCheck size={20} /></div>
          </div>
          <span className="text-4xl font-bold">0</span>
        </div>

        <div className="glass-card bg-gradient-to-br from-rose-500 to-rose-600 text-white border-none">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold opacity-90">Alertas de Vacunas</h3>
            <div className="p-2 bg-white/20 rounded-lg"><Syringe size={20} /></div>
          </div>
          <span className="text-4xl font-bold">1</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <AlertTriangle size={20} className="text-rose-500" /> 
        Calendario Preventivo (Vacunas y Desparasitaciones)
      </h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
              <Syringe size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Vacuna Antirrábica (Refuerzo)</h4>
              <p className="text-sm text-slate-500">Paciente: <span className="font-medium text-slate-700">Max</span></p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full text-sm inline-flex items-center gap-2">
              <Clock size={14} /> Vence en 5 días
            </div>
            <p className="text-xs text-slate-400 mt-1">10 de Agosto, 2026</p>
          </div>
        </div>

        <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <Syringe size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Desparasitación Interna (Bravecto)</h4>
              <p className="text-sm text-slate-500">Paciente: <span className="font-medium text-slate-700">Max</span></p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-full text-sm inline-flex items-center gap-2">
              <Clock size={14} /> Al día
            </div>
            <p className="text-xs text-slate-400 mt-1">Renovación: Diciembre, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icono extra necesario para el hero
import { Activity } from 'lucide-react';
