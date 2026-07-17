import React, { useState } from 'react';
import { useMedicalRecordStore } from '../../store/medicalRecordStore';
import type { RecordType } from '../../store/medicalRecordStore';
import { Search, Save, AlertTriangle, Syringe, Activity, FileText, Calendar } from 'lucide-react';

export function ClinicalWorkspace() {
  const { addRecord } = useMedicalRecordStore();
  const [form, setForm] = useState({
    record_type: 'CHECKUP' as RecordType,
    diagnosis: '',
    symptoms: '',
    treatment: '',
    prescription: '',
    vaccine_name: '',
    vaccine_batch: '',
    next_due_date: ''
  });

  const [saved, setSaved] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAISuggestion = async () => {
    if (!form.symptoms) return;
    setAiLoading(true);
    try {
      // Importación dinámica para evitar problemas circulares o si falla algo
      const { suggestDiagnosis } = await import('../../lib/ai');
      // Paciente hardcodeado por ahora ("Golden Retriever")
      const suggestion = await suggestDiagnosis('Perro (Golden Retriever)', form.symptoms, 'Paciente alérgico a la Penicilina. Confirmado en 2024.');
      setForm(prev => ({ ...prev, diagnosis: prev.diagnosis ? prev.diagnosis + '\n\n' + suggestion : suggestion }));
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.diagnosis && form.record_type !== 'VACCINE') return;
    
    addRecord({
      pet_id: 'mock-pet-id-123',
      clinic_id: 'mock-clinic-id',
      doctor_id: 'mock-doc-id',
      ...form,
      diagnosis: form.diagnosis || 'Vacunación preventiva' // Default para vacunas
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setForm({ 
        record_type: 'CHECKUP', 
        diagnosis: '', symptoms: '', treatment: '', prescription: '',
        vaccine_name: '', vaccine_batch: '', next_due_date: ''
      });
    }, 2000);
  };

  return (
    <div className="flex h-full w-full">
      
      {/* Columna Izquierda: Búsqueda y Contexto del Paciente (30%) */}
      <div className="w-1/3 border-r border-slate-200 bg-white flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar paciente por nombre o chip..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Mock Paciente Activo */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-500">M</div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Max</h2>
              <p className="text-sm text-slate-500">Golden Retriever • Macho • 4 años</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-amber-800">
              <AlertTriangle className="shrink-0" size={20} />
              <div className="text-sm">
                <p className="font-bold">Alerta Médica Registrada</p>
                <p>Paciente alérgico a la Penicilina. Confirmado en 2024.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-3 text-sm">
              <h3 className="font-bold text-slate-700 border-b border-slate-200 pb-2">Resumen Fisiológico</h3>
              <div className="flex justify-between"><span className="text-slate-500">Peso actual:</span> <span className="font-medium">32.5 kg</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Microchip:</span> <span className="font-medium font-mono">98102000034821</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Última visita:</span> <span className="font-medium">Hace 3 meses</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Ficha Clínica Inmutable (70%) */}
      <div className="w-2/3 bg-slate-50 flex flex-col relative">
        <div className="p-6 border-b border-slate-200 bg-white flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText size={24} className="text-teal-500"/>
            Nueva Ficha de Atención
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded">Fecha: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-8 flex-1 overflow-y-auto space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="type" value="CHECKUP" checked={form.record_type === 'CHECKUP'} onChange={(e) => setForm({...form, record_type: e.target.value as RecordType})} className="peer sr-only" />
                <div className="p-4 rounded-lg border border-slate-200 peer-checked:border-teal-500 peer-checked:bg-teal-50 flex items-center gap-3 transition-all">
                  <Activity className={form.record_type === 'CHECKUP' ? 'text-teal-600' : 'text-slate-400'} size={20} />
                  <span className={form.record_type === 'CHECKUP' ? 'font-bold text-teal-800' : 'text-slate-600'}>Control General</span>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="type" value="EMERGENCY" checked={form.record_type === 'EMERGENCY'} onChange={(e) => setForm({...form, record_type: e.target.value as RecordType})} className="peer sr-only" />
                <div className="p-4 rounded-lg border border-slate-200 peer-checked:border-rose-500 peer-checked:bg-rose-50 flex items-center gap-3 transition-all">
                  <AlertTriangle className={form.record_type === 'EMERGENCY' ? 'text-rose-600' : 'text-slate-400'} size={20} />
                  <span className={form.record_type === 'EMERGENCY' ? 'font-bold text-rose-800' : 'text-slate-600'}>Urgencia</span>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="type" value="VACCINE" checked={form.record_type === 'VACCINE'} onChange={(e) => setForm({...form, record_type: e.target.value as RecordType})} className="peer sr-only" />
                <div className="p-4 rounded-lg border border-slate-200 peer-checked:border-sky-500 peer-checked:bg-sky-50 flex items-center gap-3 transition-all">
                  <Syringe className={form.record_type === 'VACCINE' ? 'text-sky-600' : 'text-slate-400'} size={20} />
                  <span className={form.record_type === 'VACCINE' ? 'font-bold text-sky-800' : 'text-slate-600'}>Vacunación</span>
                </div>
              </label>
            </div>

            {form.record_type === 'VACCINE' ? (
              <div className="grid grid-cols-2 gap-6 bg-sky-50 p-6 rounded-xl border border-sky-100">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-sky-900 mb-2">Nombre de la Vacuna / Desparasitante</label>
                  <input 
                    required
                    value={form.vaccine_name} onChange={e => setForm({...form, vaccine_name: e.target.value})}
                    className="w-full p-3 border border-sky-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500" 
                    placeholder="Ej. Óctuple, Antirrábica, Bravecto..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-sky-900 mb-2">Nº Lote de Fabricante</label>
                  <input 
                    required
                    value={form.vaccine_batch} onChange={e => setForm({...form, vaccine_batch: e.target.value})}
                    className="w-full p-3 border border-sky-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm" 
                    placeholder="Ej. LOT-829103"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-sky-900 mb-2 flex items-center gap-2">
                    <Calendar size={16} /> Fecha de Próxima Dosis
                  </label>
                  <input 
                    type="date"
                    required
                    value={form.next_due_date} onChange={e => setForm({...form, next_due_date: e.target.value})}
                    className="w-full p-3 border border-sky-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-900" 
                  />
                </div>
                <div className="col-span-2 text-xs text-sky-700 bg-sky-100 p-3 rounded-lg">
                  <AlertTriangle size={14} className="inline mr-1" />
                  Al guardar, se programará automáticamente una notificación para el dueño 7 días antes de la fecha de refuerzo.
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Anamnesis / Síntomas</label>
                  <textarea 
                    value={form.symptoms} onChange={e => setForm({...form, symptoms: e.target.value})}
                    className="w-full p-4 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 min-h-[100px]" 
                    placeholder="Motivo de la visita y síntomas relatados por el dueño..."
                  />
                </div>
    
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-slate-700">Diagnóstico Clínico <span className="text-rose-500">*</span></label>
                    <button 
                      type="button"
                      disabled={aiLoading || !form.symptoms}
                      onClick={handleAISuggestion}
                      className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors disabled:opacity-50"
                    >
                      {aiLoading ? <span className="animate-pulse">Pensando...</span> : <><Activity size={14} /> Sugerir con IA</>}
                    </button>
                  </div>
                  <textarea 
                    required
                    value={form.diagnosis} onChange={e => setForm({...form, diagnosis: e.target.value})}
                    className="w-full p-4 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 min-h-[100px]" 
                    placeholder="Diagnóstico médico establecido..."
                  />
                </div>
    
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tratamiento en Clínica</label>
                    <textarea 
                      value={form.treatment} onChange={e => setForm({...form, treatment: e.target.value})}
                      className="w-full p-4 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 min-h-[120px]" 
                      placeholder="Procedimientos realizados hoy..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Receta / Prescripción</label>
                    <textarea 
                      value={form.prescription} onChange={e => setForm({...form, prescription: e.target.value})}
                      className="w-full p-4 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 min-h-[120px]" 
                      placeholder="Medicamentos a enviar a casa (dosis, frecuencia)..."
                    />
                  </div>
                </div>
              </>
            )}

          </div>

          <div className="flex justify-end pt-4 pb-12">
            <button type="submit" disabled={saved} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-teal-500/30 flex items-center gap-2 transition-all disabled:opacity-50">
              {saved ? (
                <>Ficha Sellada e Inmutable ✓</>
              ) : (
                <><Save size={20} /> Sellar y Guardar Ficha</>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
