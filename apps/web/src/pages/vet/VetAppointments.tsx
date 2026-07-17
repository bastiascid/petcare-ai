import React from 'react';
import { useAppointmentStore } from '../../store/appointmentStore';
import { Calendar, Clock, User, CheckCircle2, PlayCircle, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function VetAppointments() {
  const { appointments, updateStatus } = useAppointmentStore();
  const navigate = useNavigate();

  // Filtrar solo las citas de hoy (simulado)
  const todaysAppointments = appointments;

  const handleStartAttention = (aptId: string) => {
    updateStatus(aptId, 'IN_WAITING_ROOM');
    // Enviar al médico a la sala clínica
    navigate('/vet/workspace');
  };

  return (
    <div className="flex h-full w-full bg-slate-50">
      <div className="p-8 max-w-6xl mx-auto w-full">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Calendar className="text-teal-500" /> Agenda Diaria
            </h1>
            <p className="text-slate-500 mt-1">Revisa los pacientes citados para hoy y adminístralos en la sala de espera.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 font-bold text-slate-700 shadow-sm">
            Hoy: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Hora</th>
                <th className="p-4 font-bold">Paciente</th>
                <th className="p-4 font-bold">Motivo</th>
                <th className="p-4 font-bold">Estado</th>
                <th className="p-4 font-bold text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {todaysAppointments.map(apt => (
                <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <Clock size={16} className="text-slate-400" />
                      {new Date(apt.date_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                        P
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Mascota ID: {apt.pet_id.slice(-4)}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><User size={12}/> Dueño ID: {apt.owner_id.slice(-4)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700">
                    {apt.reason}
                  </td>
                  <td className="p-4">
                    {apt.status === 'PENDING' && <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">Pendiente</span>}
                    {apt.status === 'CONFIRMED' && <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2 py-1 rounded-full">Confirmada</span>}
                    {apt.status === 'IN_WAITING_ROOM' && <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full animate-pulse">En Espera</span>}
                    {apt.status === 'COMPLETED' && <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-full">Completada</span>}
                  </td>
                  <td className="p-4 text-right">
                    {apt.status === 'CONFIRMED' ? (
                      <button 
                        onClick={() => updateStatus(apt.id, 'IN_WAITING_ROOM')}
                        className="text-sm font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 transition-all"
                      >
                        Pasar a Espera
                      </button>
                    ) : apt.status === 'IN_WAITING_ROOM' ? (
                      <button 
                        onClick={() => handleStartAttention(apt.id)}
                        className="text-sm font-bold bg-teal-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 ml-auto hover:bg-teal-600 transition-all shadow-md shadow-teal-500/20"
                      >
                        <PlayCircle size={16} /> Atender
                      </button>
                    ) : (
                      <button className="text-slate-400 hover:text-slate-600 p-2"><MoreHorizontal size={20}/></button>
                    )}
                  </td>
                </tr>
              ))}
              {todaysAppointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No hay citas programadas para hoy.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
