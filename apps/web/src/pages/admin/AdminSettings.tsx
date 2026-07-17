import React, { useState } from 'react';
import { Save, AlertTriangle, ShieldCheck, Mail, DatabaseZap } from 'lucide-react';

export function AdminSettings() {
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-black text-white">Configuración Global</h2>
        <p className="text-slate-400 mt-2">Parámetros operativos y seguridad del sistema Petcare AI.</p>
      </header>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        
        {/* Mantenimiento */}
        <div className="p-6 border-b border-slate-700 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl h-fit">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Modo Mantenimiento</h3>
              <p className="text-sm text-slate-400 max-w-lg">
                Si activas esto, todos los usuarios (dueños y clínicas) verán una pantalla de mantenimiento. Solo los administradores podrán iniciar sesión.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer mt-2">
            <input type="checkbox" className="sr-only peer" checked={maintenance} onChange={() => setMaintenance(!maintenance)} />
            <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
          </label>
        </div>

        {/* API Gemini */}
        <div className="p-6 border-b border-slate-700 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl h-fit">
              <DatabaseZap size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Google Gemini API</h3>
              <p className="text-sm text-slate-400 max-w-lg mb-4">
                Configura el umbral máximo de tokens diarios para controlar costos del Triaje IA.
              </p>
              <div className="flex gap-2 items-center">
                <input type="number" defaultValue={50000} className="bg-slate-900 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 w-32 focus:outline-none focus:border-sky-500" />
                <span className="text-slate-500 text-sm">tokens / día</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seguridad */}
        <div className="p-6 border-b border-slate-700 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl h-fit">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Políticas de Contraseña</h3>
              <p className="text-sm text-slate-400 max-w-lg">
                Exigir autenticación de dos factores (2FA) para las cuentas de tipo Clínica. (Requiere plan Enterprise en Supabase).
              </p>
            </div>
          </div>
          <button disabled className="mt-2 text-xs bg-slate-700 text-slate-400 px-3 py-1 rounded font-bold cursor-not-allowed">
            Upgrade Required
          </button>
        </div>

      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all"
        >
          {loading ? 'Guardando...' : <><Save size={20} /> Guardar Cambios</>}
        </button>
      </div>
    </div>
  );
}
