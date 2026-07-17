import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

export function Register() {
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

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 uppercase mb-1">Nombre Completo</label>
            <input type="text" className="input-field" placeholder="Ej. Juan Pérez" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 uppercase mb-1">Correo Electrónico</label>
            <input type="email" className="input-field" placeholder="tu@email.com" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 uppercase mb-1">Contraseña</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 uppercase mb-1">Tipo de Cuenta</label>
            <select className="input-field bg-white">
              <option value="OWNER">Dueño de Mascota</option>
              <option value="VET">Clínica / Veterinario</option>
            </select>
          </div>
          
          <button type="submit" className="btn-primary w-full mt-6">
            Registrarse
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
