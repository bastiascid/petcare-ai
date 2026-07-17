import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthProvider } from './components/AuthProvider';
import { OwnerLayout } from './pages/owner/OwnerLayout';
import { VetLayout } from './pages/vet/VetLayout';
import { AdminLayout } from './pages/admin/AdminLayout';
import { useAuthStore } from './store/authStore';

function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/owner/*" element={<OwnerLayout />} />
        <Route path="/vet/*" element={<VetLayout />} />
        
        {/* Admin Route */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
