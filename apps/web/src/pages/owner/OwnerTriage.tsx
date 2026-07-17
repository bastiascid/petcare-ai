import React, { useState } from 'react';
import { usePetStore } from '../../store/petStore';
import { analyzeTriage } from '../../lib/ai';
import type { TriageResult } from '../../lib/ai';
import { Activity, AlertTriangle, CheckCircle2, ChevronRight, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function OwnerTriage() {
  const { pets } = usePetStore();
  const navigate = useNavigate();

  const [petId, setPetId] = useState('');
  const [symptoms, setSymptoms] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petId || !symptoms) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;

    try {
      const res = await analyzeTriage(pet.species, pet.breed || 'Mestizo', symptoms);
      setResult(res);
    } catch (err) {
      setError('Ocurrió un error al consultar a la IA. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookWithReason = () => {
    // Aquí idealmente pasaríamos el motivo pre-llenado a la ruta de citas
    navigate('/owner/appointments');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Activity className="text-sky-500" /> Triaje Inteligente
          </h1>
          <p className="text-slate-500 mt-2">
            Describe qué le pasa a tu mascota y nuestra IA te orientará sobre la urgencia y qué hacer a continuación.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="glass-card space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Selecciona a tu mascota</label>
            <select required value={petId} onChange={e => setPetId(e.target.value)} className="input-field">
              <option value="">Selecciona...</option>
              {pets.map(p => <option key={p.id} value={p.id}>{p.name} ({p.species})</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Describe los síntomas</label>
            <textarea 
              required
              rows={4}
              value={symptoms} 
              onChange={e => setSymptoms(e.target.value)} 
              className="input-field" 
              placeholder="Ej. Lleva 2 días sin comer, está muy decaído y hoy vomitó espuma blanca..." 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !petId || !symptoms.trim()} 
            className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg disabled:opacity-50"
          >
            {loading ? (
              <><div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div> Analizando...</>
            ) : (
              <><Stethoscope size={20} /> Evaluar Síntomas</>
            )}
          </button>
          
          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
        </form>
      </div>

      {/* Resultados AI */}
      <div className="w-full md:w-[400px]">
        {result ? (
          <div className={`rounded-2xl p-6 border shadow-lg ${
            result.urgency === 'RED' ? 'bg-red-50 border-red-200' :
            result.urgency === 'YELLOW' ? 'bg-amber-50 border-amber-200' :
            'bg-emerald-50 border-emerald-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              {result.urgency === 'RED' && <AlertTriangle size={32} className="text-red-500" />}
              {result.urgency === 'YELLOW' && <AlertTriangle size={32} className="text-amber-500" />}
              {result.urgency === 'GREEN' && <CheckCircle2 size={32} className="text-emerald-500" />}
              
              <h3 className={`text-xl font-black ${
                result.urgency === 'RED' ? 'text-red-700' :
                result.urgency === 'YELLOW' ? 'text-amber-700' :
                'text-emerald-700'
              }`}>
                {result.urgency === 'RED' ? 'EMERGENCIA MÉDICA' :
                 result.urgency === 'YELLOW' ? 'ATENCIÓN REQUERIDA' :
                 'SÍNTOMAS LEVES'}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Análisis Clínico</h4>
                <p className="text-slate-700 leading-relaxed">{result.analysis}</p>
              </div>
              
              <div className="pt-4 border-t border-black/10">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Recomendación</h4>
                <p className="text-slate-700 font-medium">{result.recommendation}</p>
              </div>

              <button 
                onClick={handleBookWithReason}
                className={`w-full mt-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                  result.urgency === 'RED' ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/30 shadow-lg' :
                  result.urgency === 'YELLOW' ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30 shadow-lg' :
                  'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 shadow-lg'
                }`}
              >
                Agendar Cita Ahora <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full bg-slate-100 rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <Activity size={48} className="mb-4 opacity-50" />
            <p className="font-medium">Llena el formulario para obtener una evaluación inteligente y recomendaciones de cuidado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
