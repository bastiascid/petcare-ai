import React, { useEffect, useState } from 'react';
import { useCommunityStore } from '../../store/communityStore';
import { useAuthStore } from '../../store/authStore';
import { MessageCircle, Heart, Share2, Send, Flame, Info } from 'lucide-react';

export function OwnerCommunity() {
  const { posts, loading, fetchPosts, createPost } = useCommunityStore();
  const { user } = useAuthStore();
  
  const [newPostContent, setNewPostContent] = useState('');
  const [category, setCategory] = useState('GENERAL');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;
    
    await createPost(user.id, newPostContent, category);
    setNewPostContent('');
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'SALUD': return 'bg-rose-100 text-rose-700';
      case 'CONSEJOS': return 'bg-amber-100 text-amber-700';
      case 'FOTOS': return 'bg-sky-100 text-sky-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 h-full flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <Flame className="text-orange-500" /> Comunidad Petcare
          </h1>
          <p className="text-slate-500 mt-1">Conecta con otros dueños y profesionales veterinarios.</p>
        </div>
      </div>

      {/* Caja para crear post */}
      <form onSubmit={handlePost} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <textarea 
          value={newPostContent}
          onChange={e => setNewPostContent(e.target.value)}
          placeholder="¿Qué quieres compartir con la comunidad?"
          className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-sky-500 min-h-[100px] mb-4"
        />
        <div className="flex items-center justify-between">
          <select 
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input-field max-w-[200px]"
          >
            <option value="GENERAL">General</option>
            <option value="SALUD">Salud y Bienestar</option>
            <option value="CONSEJOS">Consejos y Tips</option>
            <option value="FOTOS">Fotos y Momentos</option>
          </select>
          <button 
            type="submit" 
            disabled={!newPostContent.trim()}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <Send size={18} /> Publicar
          </button>
        </div>
      </form>

      {/* Feed de Posts */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-20">
        {loading && posts.length === 0 ? (
          <div className="text-center text-slate-500 py-10 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-sky-500 border-t-transparent mb-4"></div>
            Cargando comunidad...
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${post.author_role === 'CLINIC' ? 'bg-teal-100 text-teal-700' : 'bg-sky-100 text-sky-700'}`}>
                    {post.author_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      {post.author_name}
                      {post.author_role === 'CLINIC' && (
                        <span className="bg-teal-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                           Verificado
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-400">{new Date(post.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </div>
              
              <p className="text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">{post.content}</p>
              
              <div className="flex items-center gap-6 border-t border-slate-100 pt-4">
                <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors font-medium text-sm">
                  <Heart size={18} /> {post.likes_count}
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-sky-500 transition-colors font-medium text-sm">
                  <MessageCircle size={18} /> Comentar
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-medium text-sm ml-auto">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
        
        {posts.length === 0 && !loading && (
          <div className="text-center py-12 text-slate-400">
            <Info size={48} className="mx-auto mb-4 opacity-30" />
            <p>Aún no hay publicaciones. ¡Sé el primero en escribir algo!</p>
          </div>
        )}
      </div>
    </div>
  );
}
