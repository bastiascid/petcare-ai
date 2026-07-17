import { create } from 'zustand';
import { supabase, isMock } from '../lib/supabase';

export type UserRole = 'OWNER' | 'CLINIC' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true, // Empezamos en true para esperar a que inicialice la sesión
  error: null,

  initializeAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Buscar el perfil extendido en la tabla publica 'users'
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('auth_id', session.user.id)
          .single();

        if (profile) {
          set({ user: profile as User, loading: false });
        } else {
          set({ user: null, loading: false });
        }
      } else {
        set({ user: null, loading: false });
      }

      // Escuchar cambios de autenticación
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('auth_id', session.user.id)
            .single();
          set({ user: profile as User });
        } else if (event === 'SIGNED_OUT') {
          set({ user: null });
        }
      });
    } catch (error: any) {
      console.error("Error al inicializar auth:", error);
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    
    // Validar si estamos usando el mock fall-back porque no hay llaves reales
    if (isMock) {
      console.warn("ADVERTENCIA: Usando credenciales de prueba porque no hay llaves de Supabase.");
      setTimeout(() => {
        set({ 
          user: { id: 'mock-1', email, full_name: 'Usuario Demo', role: email.includes('vet') ? 'CLINIC' : 'OWNER' }, 
          loading: false 
        });
      }, 500);
      return;
    }

    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    // El listener onAuthStateChange se encargará de setear el user
    set({ loading: false });
  },

  signUp: async (email, password, fullName, role) => {
    set({ loading: true, error: null });
    
    if (isMock) {
      console.warn("ADVERTENCIA: Usando credenciales de prueba porque no hay llaves de Supabase.");
      setTimeout(() => {
        set({ 
          user: { id: 'mock-2', email, full_name: fullName, role }, 
          loading: false 
        });
      }, 500);
      return;
    }

    // Para Supabase Real
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role
        }
      }
    });

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    // Insertar manualmente el perfil en nuestra tabla pública
    if (data.user) {
      const { error: insertError } = await supabase.from('users').insert({
        auth_id: data.user.id,
        email: data.user.email,
        name: fullName,
        full_name: fullName,
        role: role
      });
      
      if (insertError) {
        console.error("Error inserting into public.users:", insertError);
        // Fallback for UI if insert fails
      }
    }

    set({ loading: false });
  },

  signOut: async () => {
    set({ loading: true });
    
    if (!isMock) {
      await supabase.auth.signOut();
    }
    
    set({ user: null, loading: false });
  }
}));
