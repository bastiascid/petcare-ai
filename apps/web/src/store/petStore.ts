import { create } from 'zustand';
import { supabase, isMock } from '../lib/supabase';

export type Species = 'Dog' | 'Cat' | 'Bird' | 'Exotic';

export interface Pet {
  id: string;
  owner_id: string;
  name: string;
  species: Species;
  breed?: string;
  sex: 'M' | 'F';
  weight_kg?: number;
  microchip_number?: string;
  avatar_url?: string;
}

interface PetState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  fetchPets: (ownerId: string) => Promise<void>;
  addPet: (pet: Omit<Pet, 'id'>) => Promise<void>;
  updatePet: (id: string, updates: Partial<Pet>) => Promise<void>;
}

export const usePetStore = create<PetState>((set, get) => ({
  pets: [],
  loading: false,
  error: null,

  fetchPets: async (ownerId: string) => {
    set({ loading: true, error: null });
    
    // Fallback de Mock si no hay URL real
    if (isMock) {
      setTimeout(() => {
        set({
          pets: [
            { id: '1', owner_id: ownerId, name: 'Max', species: 'Dog', sex: 'M', breed: 'Golden Retriever', weight_kg: 32.5, microchip_number: '98102000034821' },
            { id: '2', owner_id: ownerId, name: 'Luna', species: 'Cat', sex: 'F', breed: 'Siamés', weight_kg: 4.2 }
          ],
          loading: false
        });
      }, 500);
      return;
    }

    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('owner_id', ownerId);

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ pets: data as Pet[], loading: false });
    }
  },

  addPet: async (pet) => {
    set({ loading: true, error: null });

    if (isMock) {
      const newPet = { ...pet, id: crypto.randomUUID() };
      set(state => ({ pets: [...state.pets, newPet], loading: false }));
      return;
    }

    const { data, error } = await supabase
      .from('pets')
      .insert([pet])
      .select()
      .single();

    if (error) {
      set({ error: error.message, loading: false });
    } else if (data) {
      set(state => ({ pets: [...state.pets, data as Pet], loading: false }));
    }
  },

  updatePet: async (id, updates) => {
    set({ loading: true, error: null });

    if (isMock) {
      set(state => ({
        pets: state.pets.map(p => p.id === id ? { ...p, ...updates } : p),
        loading: false
      }));
      return;
    }

    const { error } = await supabase
      .from('pets')
      .update(updates)
      .eq('id', id);

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set(state => ({
        pets: state.pets.map(p => p.id === id ? { ...p, ...updates } : p),
        loading: false
      }));
    }
  }
}));
