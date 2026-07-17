import { create } from 'zustand';
import { supabase, isMock } from '../lib/supabase';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'IN_WAITING_ROOM' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  pet_id: string;
  clinic_id: string;
  owner_id: string;
  reason: string;
  date_time: string;
  status: AppointmentStatus;
}

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointmentsByOwner: (ownerId: string) => Promise<void>;
  fetchAppointmentsByClinic: (clinicId: string) => Promise<void>;
  bookAppointment: (apt: Omit<Appointment, 'id' | 'status'>) => Promise<void>;
  updateStatus: (id: string, status: AppointmentStatus) => Promise<void>;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  loading: false,
  error: null,

  fetchAppointmentsByOwner: async (ownerId) => {
    set({ loading: true, error: null });
    
    if (isMock) {
      setTimeout(() => set({ loading: false }), 500);
      return;
    }

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('owner_id', ownerId)
      .order('date_time', { ascending: true });

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ appointments: data as Appointment[], loading: false });
    }
  },

  fetchAppointmentsByClinic: async (clinicId) => {
    set({ loading: true, error: null });
    
    if (isMock) {
      setTimeout(() => set({ loading: false }), 500);
      return;
    }

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('clinic_id', clinicId)
      .order('date_time', { ascending: true });

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ appointments: data as Appointment[], loading: false });
    }
  },

  bookAppointment: async (apt) => {
    set({ loading: true, error: null });
    
    if (isMock) {
      const newApt: Appointment = {
        ...apt,
        id: crypto.randomUUID(),
        status: 'PENDING'
      };
      set((state) => ({ appointments: [...state.appointments, newApt], loading: false }));
      return;
    }

    const newAptData = {
      ...apt,
      status: 'PENDING'
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([newAptData])
      .select()
      .single();

    if (error) {
      set({ error: error.message, loading: false });
    } else if (data) {
      set((state) => ({ appointments: [...state.appointments, data as Appointment], loading: false }));
    }
  },

  updateStatus: async (id, status) => {
    set({ loading: true, error: null });
    
    if (isMock) {
      set((state) => ({
        appointments: state.appointments.map(a => a.id === id ? { ...a, status } : a),
        loading: false
      }));
      return;
    }

    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set((state) => ({
        appointments: state.appointments.map(a => a.id === id ? { ...a, status } : a),
        loading: false
      }));
    }
  }
}));
