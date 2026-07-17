import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Si no hay usuario y no está en login/register, mándalo a login
        if (!['/login', '/register', '/'].includes(location.pathname)) {
          navigate('/login');
        }
      } else {
        // Si hay usuario y está en login/register, mándalo a su dashboard
        if (['/login', '/register', '/'].includes(location.pathname)) {
          if (user.role === 'OWNER') navigate('/owner');
          else if (user.role === 'CLINIC') navigate('/vet');
          else if (user.role === 'ADMIN') navigate('/admin');
        }
      }
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
