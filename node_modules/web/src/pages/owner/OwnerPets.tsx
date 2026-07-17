import React, { useState } from 'react';
import { usePetStore } from '../../store/petStore';
import type { Pet } from '../../store/petStore';
import { useAuthStore } from '../../store/authStore';
import { Plus, Camera, QrCode, Activity, Syringe, AlertTriangle, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useMedicalRecordStore } from '../../store/medicalRecordStore';

export function OwnerPets() {
  const { user } = useAuthStore();
  const { pets, addPet } = usePetStore();
  const { records } = useMedicalRecordStore();
  
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState<string | null>(null);
  const [expandedPet, setExpandedPet] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Pet>>({
    name: '',
    species: 'Dog',
    breed: '',
    sex: 'M',
    weight_kg: 0,
    microchip_number: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      addPet({ ...form, owner_id: user.id } as Omit<Pet, 'id'>);
      setShowModal(false);
    }
  };

  const getRecordIcon = (type: string) => {
    switch(type) {
      case 'CHECKUP': return <Activity size={16} className="text-sky-500" />;
      case 'VACCINE': return <Syringe size={16} className="text-teal-500" />;
      case 'EMERGENCY': return <AlertTriangle size={16} className="text-rose-500" />;
      default: return <FileText size={16} className="text-slate-500" />;
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mis Mascotas</h1>
          <p className="text-slate-500">Gestiona los perfiles y revisa el historial clínico.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Nueva Mascota
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pets.map(pet => (
          <div key={pet.id} className="glass-card relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-400 hover:text-sky-500 cursor-pointer transition-colors" onClick={() => setShowQR(pet.id)}>
              <QrCode size={24} />
            </div>
            
            <div className="flex items-center gap-6 mb-4">
              <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-sm flex shrink-0 items-center justify-center relative cursor-pointer overflow-hidden group-hover:border-sky-200 transition-colors">
                {pet.avatar_url ? (
                  <img src={pet.avatar_url} alt={pet.name} className="w-full h-full object-cover" />
                ) : (
                  <Camera size={32} className="text-slate-400" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{pet.name}</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-1 rounded-full uppercase">
                    {pet.species}
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-full uppercase">
                    {pet.breed || 'Mestizo'}
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-full uppercase">
                    {pet.weight_kg ? `${pet.weight_kg} kg` : 'Sin peso'}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setExpandedPet(expandedPet === pet.id ? null : pet.id)}
              className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-sm font-semibold text-sky-600 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
            >
              {expandedPet === pet.id ? (
                <><ChevronUp size={16} /> Ocultar Historial Clínico</>
              ) : (
                <><ChevronDown size={16} /> Ver Historial Clínico</>
              )}
            </button>

            {/* Timeline Clínico */}
            {expandedPet === pet.id && (
              <div className="mt-6 pt-6 border-t border-slate-100 relative before:absolute before:inset-y-6 before:left-3.5 before:w-px before:bg-slate-200 pt-6">
                
                {/* Mock del historial. En prod vendría de records.filter(r => r.pet_id === pet.id) */}
                <div className="relative pl-10 mb-6">
                  <div className="absolute left-0 top-1 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center z-10 shadow-sm">
                    {getRecordIcon('CHECKUP')}
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900">Control General Anual</h4>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">Hoy</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2"><span className="font-semibold">Diagnóstico:</span> Paciente clínicamente sano. Peso ideal mantenido.</p>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Stethoscope size={12} /> Dr. Médico Tratante • Clínica Central
                    </div>
                  </div>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center z-10 shadow-sm">
                    {getRecordIcon('VACCINE')}
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900">Vacunación Óctuple</h4>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">Hace 6 meses</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2"><span className="font-semibold">Tratamiento:</span> Dosis de refuerzo anual aplicada sin reacciones adversas.</p>
                  </div>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modales (Sin cambios, conservados) */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Registrar Mascota</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Ej. Max" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Especie</label>
                  <select value={form.species} onChange={e => setForm({...form, species: e.target.value as any})} className="input-field">
                    <option value="Dog">Perro</option>
                    <option value="Cat">Gato</option>
                    <option value="Bird">Ave</option>
                    <option value="Exotic">Exótico</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sexo</label>
                  <select value={form.sex} onChange={e => setForm({...form, sex: e.target.value as any})} className="input-field">
                    <option value="M">Macho</option>
                    <option value="F">Hembra</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Raza</label>
                  <input value={form.breed} onChange={e => setForm({...form, breed: e.target.value})} className="input-field" placeholder="Ej. Golden Retriever" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Peso (kg)</label>
                  <input type="number" step="0.1" value={form.weight_kg} onChange={e => setForm({...form, weight_kg: parseFloat(e.target.value)})} className="input-field" placeholder="Ej. 12.5" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Número de Microchip</label>
                <input value={form.microchip_number} onChange={e => setForm({...form, microchip_number: e.target.value})} className="input-field font-mono" placeholder="15 dígitos numéricos" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors">Cancelar</button>
                <button type="submit" className="btn-primary">Guardar Registro</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Identidad Digital</h2>
            <p className="text-sm text-slate-500 mb-6 text-center max-w-xs">Escanea este código si tu mascota se pierde para acceder a su ficha pública.</p>
            <div className="bg-white p-4 border-2 border-slate-100 rounded-2xl shadow-sm mb-6">
              <QRCodeSVG value={`https://petcare.ai/emergency/${showQR}`} size={200} />
            </div>
            <button onClick={() => setShowQR(null)} className="btn-primary w-full">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

import { Stethoscope } from 'lucide-react';
