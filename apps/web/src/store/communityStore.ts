import { create } from 'zustand';
import { supabase, isMock } from '../lib/supabase';

export interface Post {
  id: string;
  author_id: string;
  author_name: string;
  author_role: string;
  content: string;
  category: string;
  likes_count: number;
  created_at: string;
}

interface CommunityState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (author_id: string, content: string, category: string) => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });

    if (isMock) {
      setTimeout(() => set({
        posts: [
          { id: '1', author_id: '123', author_name: 'María', author_role: 'OWNER', content: '¿Alguien conoce un buen parque para perros en el centro?', category: 'CONSEJOS', likes_count: 5, created_at: new Date().toISOString() },
          { id: '2', author_id: '456', author_name: 'Dr. López', author_role: 'CLINIC', content: 'Recuerden que la temporada de pulgas ya comenzó. ¡Protejan a sus mascotas!', category: 'SALUD', likes_count: 24, created_at: new Date().toISOString() }
        ],
        loading: false
      }), 500);
      return;
    }

    // Leemos de la vista que hace el JOIN con la tabla users
    const { data, error } = await supabase
      .from('posts_with_author')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ posts: data as Post[], loading: false });
    }
  },

  createPost: async (author_id, content, category) => {
    set({ loading: true, error: null });

    if (isMock) {
      const newPost: Post = {
        id: crypto.randomUUID(),
        author_id,
        author_name: 'Usuario Demo', // Mock fallback
        author_role: 'OWNER',
        content,
        category,
        likes_count: 0,
        created_at: new Date().toISOString()
      };
      set(state => ({ posts: [newPost, ...state.posts], loading: false }));
      return;
    }

    // Insertar en la tabla base (no en la vista)
    const { error } = await supabase
      .from('posts')
      .insert([{ author_id, content, category }]);

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      // Recargar posts para obtener los datos de la vista actualizada (con autor)
      await get().fetchPosts();
    }
  }
}));
