import { create } from 'zustand';
import { supabase, isMock } from '../lib/supabase';

export type RecordType = 'VACCINE' | 'CHECKUP' | 'EMERGENCY' | 'SURGERY' | 'TEST';

export interface MedicalRecord {
  id: string;
  pet_id: string;
  clinic_id: string;
  doctor_id: string;
  record_type: RecordType;
  symptoms?: string;
  diagnosis: string;
  treatment?: string;
  prescription?: string;
  vaccine_name?: string;
  vaccine_batch?: string;
  next_due_date?: string;
  ai_triage_summary?: string;
  date: string;
}

interface MedicalRecordState {
  records: MedicalRecord[];
  loading: boolean;
  error: string | null;
  fetchRecordsByPet: (petId: string) => Promise<void>;
  fetchRecordsByClinic: (clinicId: string) => Promise<void>;
  addRecord: (record: Omit<MedicalRecord, 'id' | 'date'>) => Promise<void>;
}

export const useMedicalRecordStore = create<MedicalRecordState>((set, get) => ({
  records: [],
  loading: false,
  error: null,

  fetchRecordsByPet: async (petId) => {
    set({ loading: true, error: null });
    
    if (isMock) {
      setTimeout(() => set({ loading: false }), 500);
      return;
    }

    const { data, error } = await supabase
      .from('medical_records')
      .select('*')
      .eq('pet_id', petId)
      .order('date', { ascending: false });

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ records: data as MedicalRecord[], loading: false });
    }
  },

  fetchRecordsByClinic: async (clinicId) => {
    set({ loading: true, error: null });
    
    if (isMock) {
      setTimeout(() => set({ loading: false }), 500);
      return;
    }

    const { data, error } = await supabase
      .from('medical_records')
      .select('*')
      .eq('clinic_id', clinicId)
      .order('date', { ascending: false });

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ records: data as MedicalRecord[], loading: false });
    }
  },

  addRecord: async (record) => {
    set({ loading: true, error: null });
    
    if (isMock) {
      const newRecord: MedicalRecord = {
        ...record,
        id: crypto.randomUUID(),
        date: new Date().toISOString()
      };
      set((state) => ({ records: [newRecord, ...state.records], loading: false }));
      return;
    }

    const { data, error } = await supabase
      .from('medical_records')
      .insert([record])
      .select()
      .single();

    if (error) {
      set({ error: error.message, loading: false });
    } else if (data) {
      set((state) => ({ records: [data as MedicalRecord, ...state.records], loading: false }));
    }
  }
}));
