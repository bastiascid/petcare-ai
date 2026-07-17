import { createClient } from '@supabase/supabase-js';

// Usaremos un fallback a strings vacíos para que la app no crashee en build
// si no hay .env.local, aunque obviamente fallará la autenticación.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

export const isMock = supabaseUrl === 'https://mock.supabase.co';
export const supabase = createClient(supabaseUrl, supabaseKey);
