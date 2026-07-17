import React, { useState } from 'react';
import { Briefcase, Building, DollarSign, TrendingUp, Search, Plus } from 'lucide-react';

const MOCK_SUBSCRIPTIONS = [
  { id: '1', clinic: 'Hospital Veterinario Central', plan: 'Enterprise', mrr: 150, status: 'Active', since: '2026-01-15' },
  { id: '2', clinic: 'Clínica San Francisco', plan: 'Pro', mrr: 50, status: 'Active', since: '2026-03-22' },
  { id: '3', clinic: 'VetSalud Express', plan: 'Basic', mrr: 20, status: 'Active', since: '2026-05-10' },
  { id: '4', clinic: 'Centro Animal Sur', plan: 'Pro', mrr: 50, status: 'Canceled', since: '2026-02-01' },
];

const MOCK_PARTNERSHIPS = [
  { id: '1', name: 'Royal Canin', type: 'Nutrición', revenue: 500, active: true },
  { id: '2', name: 'Bayer Animal Health', type: 'Farmacéutica', revenue: 1200, active: true },
];

export function AdminCRM() {
  const [activeTab, setActiveTab] = useState<'subs' | 'partners'>('subs');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black text-white">Ventas y Convenios (CRM)</h2>
          <p className="text-slate-400 mt-2">Monitoreo de ingresos recurrentes, suscripciones B2B y alianzas comerciales.</p>
        </div>
        <button className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
          <Plus size={18} /> Nuevo Registro
        </button>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400"><DollarSign size={24} /></div>
            <span className="flex items-center text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">
              <TrendingUp size={14} className="mr-1" /> +15%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">MRR Clínicas (Suscripciones)</h3>
          <p className="text-3xl font-black text-white">$4,250</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400"><Briefcase size={24} /></div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Ingresos por Convenios</h3>
          <p className="text-3xl font-black text-white">$1,700</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400"><Building size={24} /></div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Clínicas Pagando</h3>
          <p className="text-3xl font-black text-white">85</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="border-b border-slate-700 flex">
          <button 
            onClick={() => setActiveTab('subs')}
            className={`px-6 py-4 font-bold text-sm ${activeTab === 'subs' ? 'text-sky-400 border-b-2 border-sky-400 bg-slate-700/30' : 'text-slate-400 hover:bg-slate-700/20'}`}
          >
            Suscripciones de Clínicas
          </button>
          <button 
            onClick={() => setActiveTab('partners')}
            className={`px-6 py-4 font-bold text-sm ${activeTab === 'partners' ? 'text-sky-400 border-b-2 border-sky-400 bg-slate-700/30' : 'text-slate-400 hover:bg-slate-700/20'}`}
          >
            Convenios / Alianzas
          </button>
        </div>

        {/* Content */}
        <div className="p-0">
          {activeTab === 'subs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900/50 text-slate-300 uppercase font-semibold text-xs border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4">Clínica</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">MRR (USD)</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Cliente desde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {MOCK_SUBSCRIPTIONS.map(sub => (
                    <tr key={sub.id} className="hover:bg-slate-700/20">
                      <td className="px-6 py-4 font-medium text-slate-200">{sub.clinic}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          sub.plan === 'Enterprise' ? 'bg-purple-500/20 text-purple-400' :
                          sub.plan === 'Pro' ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-500/20 text-slate-400'
                        }`}>
                          {sub.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-emerald-400">${sub.mrr}/mo</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 ${sub.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${sub.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{sub.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900/50 text-slate-300 uppercase font-semibold text-xs border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4">Empresa / Marca</th>
                    <th className="px-6 py-4">Sector</th>
                    <th className="px-6 py-4">Ingreso Acordado (Mensual)</th>
                    <th className="px-6 py-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {MOCK_PARTNERSHIPS.map(p => (
                    <tr key={p.id} className="hover:bg-slate-700/20">
                      <td className="px-6 py-4 font-medium text-slate-200">{p.name}</td>
                      <td className="px-6 py-4">{p.type}</td>
                      <td className="px-6 py-4 font-mono text-emerald-400">${p.revenue}/mo</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 ${p.active ? 'text-emerald-400' : 'text-slate-500'}`}>
                          <div className={`w-2 h-2 rounded-full ${p.active ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
                          {p.active ? 'Vigente' : 'Inactivo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
