import React, { useState } from 'react';
import { useAppointmentStore } from '../../store/appointmentStore';
import { usePetStore } from '../../store/petStore';
import { useAuthStore } from '../../store/authStore';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';

export function OwnerAppointments() {
  const { user } = useAuthStore();
  const { pets } = usePetStore();
  const { bookAppointment, appointments } = useAppointmentStore();
  
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    pet_id: '',
    reason: '',
    date: '',
    time: ''
  });
  const [booked, setBooked] = useState(false);

  const availableTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '15:00', '15:30', '16:00'];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // Combinar fecha y hora
    const dateTime = new Date(`${form.date}T${form.time}`).toISOString();
    
    bookAppointment({
      pet_id: form.pet_id,
      clinic_id: 'mock-clinic-id', // En prod, el usuario seleccionaría su clínica
      owner_id: user.id,
      reason: form.reason,
      date_time: dateTime
    });
    
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setStep(1);
      setForm({ pet_id: '', reason: '', date: '', time: '' });
    }, 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Formulario de Reserva */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Agendar Cita</h1>
          <p className="text-slate-500">Reserva una hora en tu clínica veterinaria en segundos.</p>
        </div>

        {booked ? (
          <div className="glass-card flex flex-col items-center justify-center text-center p-12 bg-teal-50 border-teal-100">
            <CheckCircle2 size={64} className="text-teal-500 mb-4" />
            <h2 className="text-2xl font-bold text-teal-900 mb-2">¡Cita Solicitada!</h2>
            <p className="text-teal-700">La clínica ha recibido tu solicitud. Te notificaremos cuando la confirmen.</p>
          </div>
        ) : (
          <form onSubmit={handleBook} className="glass-card space-y-8">
            {/* Paso 1: Motivo y Paciente */}
            <div className={step === 1 ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-sky-100 text-sky-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
                ¿Para quién es la cita y por qué?
              </h3>
              <div className="space-y-4 pl-8">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Mascota</label>
                  <select required value={form.pet_id} onChange={e => setForm({...form, pet_id: e.target.value})} className="input-field">
                    <option value="">Selecciona una mascota...</option>
                    {pets.map(p => <option key={p.id} value={p.id}>{p.name} ({p.species})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Motivo de la visita</label>
                  <input required value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} className="input-field" placeholder="Ej. Vacuna anual, dolor de estómago..." />
                </div>
                {step === 1 && (
                  <button type="button" onClick={() => { if(form.pet_id && form.reason) setStep(2) }} className="btn-primary mt-2">Continuar</button>
                )}
              </div>
            </div>

            {/* Paso 2: Fecha y Hora */}
            <div className={step === 2 ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-sky-100 text-sky-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
                ¿Cuándo quieres ir?
              </h3>
              <div className="space-y-6 pl-8">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2"><Calendar size={16}/> Fecha</label>
                  <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="input-field w-auto" />
                </div>
                
                {form.date && (
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2"><Clock size={16}/> Horarios Disponibles</label>
                    <div className="grid grid-cols-4 gap-3">
                      {availableTimes.map(time => (
                        <div 
                          key={time} 
                          onClick={() => setForm({...form, time})}
                          className={`cursor-pointer p-3 text-center rounded-lg border font-semibold text-sm transition-colors
                            ${form.time === time ? 'bg-sky-500 text-white border-sky-500' : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'}
                          `}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && form.time && (
                  <button type="submit" className="btn-primary w-full mt-4 py-3 text-lg">Confirmar Reserva</button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Historial de Citas (Lateral) */}
      <div className="w-full md:w-80">
        <h3 className="font-bold text-slate-800 mb-4">Tus próximas citas</h3>
        <div className="space-y-4">
          {appointments.filter(a => a.owner_id === user?.id || true).map(apt => (
            <div key={apt.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase text-sky-600 bg-sky-50 px-2 py-1 rounded">{apt.status}</span>
                <span className="text-xs text-slate-400 font-medium">{new Date(apt.date_time).toLocaleDateString()}</span>
              </div>
              <h4 className="font-bold text-slate-900">{apt.reason}</h4>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                <Clock size={14} /> {new Date(apt.date_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          ))}
          {appointments.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-4">No tienes citas agendadas.</p>
          )}
        </div>
      </div>

    </div>
  );
}
