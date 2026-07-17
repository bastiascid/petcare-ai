import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Loader2 } from 'lucide-react';
import { useAuthStore, type UserRole } from '../store/authStore';

export function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('OWNER');
  
  const { signUp, error, loading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) return;
    await signUp(email, password, fullName, role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-sky-500 p-3 rounded-full text-white mb-4">
            <PawPrint size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Crear Cuenta</h1>
          <p className="text-slate-500 text-sm">Únete a la red PetCare</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-slate-700 uppercase mb-1">Nombre Completo</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-field" 
              placeholder="Ej. Juan Pérez" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 uppercase mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field" 
              placeholder="tu@email.com" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 uppercase mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field" 
              placeholder="••••••••" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 uppercase mb-1">Tipo de Cuenta</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="input-field bg-white"
            >
              <option value="OWNER">Dueño de Mascota</option>
              <option value="CLINIC">Clínica / Veterinario</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary w-full mt-6 flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Registrarse'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-sky-500 font-semibold hover:underline">
            Inicia Sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
