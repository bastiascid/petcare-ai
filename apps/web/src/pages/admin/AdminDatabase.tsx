import React from 'react';
import { Database, HardDrive, Download, RefreshCw, Server } from 'lucide-react';

export function AdminDatabase() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-black text-white">Estado de la Base de Datos</h2>
        <p className="text-slate-400 mt-2">Monitoreo de almacenamiento de Supabase y exportación de datos.</p>
      </header>

      {/* Uso de Almacenamiento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HardDrive className="text-sky-400" /> Uso de Almacenamiento (PostgreSQL)
            </h3>
            <span className="text-sm font-mono text-emerald-400">Normal</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Espacio Utilizado</span>
                <span className="text-white font-mono">45 MB / 500 MB</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-sky-500 h-2 rounded-full" style={{ width: '9%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Conexiones Activas (Pool)</span>
                <span className="text-white font-mono">12 / 60</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col justify-center items-center text-center">
          <Server size={48} className="text-purple-400 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Supabase Edge Network</h3>
          <p className="text-sm text-slate-400">Servidores enrutados a US East (N. Virginia)</p>
          <div className="mt-4 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            En Línea
          </div>
        </div>
      </div>

      {/* Backups */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Respaldos y Exportación</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-slate-700 p-4 rounded-xl flex items-center justify-between hover:bg-slate-700/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg"><Download size={20} /></div>
              <div>
                <p className="font-bold text-slate-200">Exportar Fichas Clínicas</p>
                <p className="text-xs text-slate-500">Formato CSV</p>
              </div>
            </div>
            <button className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded border border-slate-700 hover:bg-slate-700">Descargar</button>
          </div>

          <div className="border border-slate-700 p-4 rounded-xl flex items-center justify-between hover:bg-slate-700/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Download size={20} /></div>
              <div>
                <p className="font-bold text-slate-200">Exportar Usuarios</p>
                <p className="text-xs text-slate-500">Formato JSON</p>
              </div>
            </div>
            <button className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded border border-slate-700 hover:bg-slate-700">Descargar</button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
          <RefreshCw size={14} /> Los respaldos automáticos se realizan diariamente a las 03:00 AM UTC (Controlado por Supabase).
        </div>
      </div>
    </div>
  );
}
