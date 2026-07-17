import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Users, ArrowRight, Stethoscope, Sparkles, Heart } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-sky-200">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tighter text-slate-800">
              PETCARE<span className="text-sky-500">.AI</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#features" className="hover:text-sky-500 transition-colors">Características</a>
            <a href="#for-clinics" className="hover:text-sky-500 transition-colors">Para Clínicas</a>
            <Link to="/login" className="text-sky-600 hover:text-sky-700 font-bold">Iniciar Sesión</Link>
            <Link to="/register" className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all font-semibold shadow-md hover:shadow-lg">
              Empezar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-medium text-sm mb-8 border border-sky-200">
            <Sparkles size={16} />
            <span className="font-bold">Nuevo:</span> Triaje con IA Generativa
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
            El cuidado de tu mascota,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
              impulsado por IA.
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            La primera plataforma unificada que conecta a dueños amorosos con clínicas veterinarias de primer nivel, apoyados por Inteligencia Artificial para diagnósticos más rápidos y precisos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-500/30 flex items-center justify-center gap-2">
              Registrar mi Mascota <ArrowRight size={20} />
            </Link>
            <a href="#for-clinics" className="w-full sm:w-auto bg-white text-slate-800 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Stethoscope size={20} /> Soy un Profesional
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Todo lo que necesitas en un solo lugar</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Olvídate de las carpetas con papeles. Llevamos el historial clínico de tu mejor amigo al siglo XXI.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fichas Inmutables</h3>
              <p className="text-slate-600 leading-relaxed">Historial clínico y carnet de vacunación siempre disponible en la nube. Seguro y accesible 24/7.</p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-sky-100 text-sky-500 rounded-2xl flex items-center justify-center mb-6">
                <Activity size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Triaje Inteligente</h3>
              <p className="text-slate-600 leading-relaxed">¿Tu mascota se siente mal? Nuestra IA evalúa los síntomas en tiempo real y te indica si es una emergencia.</p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Comunidad Conectada</h3>
              <p className="text-slate-600 leading-relaxed">Comparte dudas, experiencias y consejos con otros dueños y obtén respuestas de veterinarios verificados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Clinics Section */}
      <section id="for-clinics" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6">Potencia tu Clínica con PetCare SaaS</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Diseñado para optimizar el flujo de trabajo de médicos veterinarios. Gestiona citas, mantén historiales clínicos seguros y obtén segundas opiniones impulsadas por IA.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-300">
                <Shield className="text-emerald-400" size={24} />
                <span>Base de datos cifrada y segura.</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Activity className="text-sky-400" size={24} />
                <span>Análisis de síntomas con modelos LLM.</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Users className="text-purple-400" size={24} />
                <span>Portal unificado B2B2C.</span>
              </li>
            </ul>
            <Link to="/register" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-colors">
              Crear Cuenta de Clínica
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-6">
                <div className="w-12 h-12 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center">
                  <Stethoscope size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Asistente Clínico IA</h4>
                  <p className="text-sm text-slate-400">Análisis Diferencial</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-xl text-sm text-slate-300 border border-slate-700/50">
                  <span className="text-emerald-400 font-bold block mb-1">Paciente: Max (Golden Retriever, 3 años)</span>
                  Síntomas: Vómitos esporádicos, letargia leve, temperatura 39.2°C.
                </div>
                <div className="bg-sky-900/20 p-4 rounded-xl border border-sky-500/20">
                  <p className="text-sm text-sky-100 leading-relaxed">
                    <span className="font-bold text-sky-400 flex items-center gap-2 mb-2"><Sparkles size={16}/> Sugerencia de la IA:</span>
                    Basado en la edad, raza y síntomas, considere como diagnósticos diferenciales primarios: Gastroenteritis dietética o ingestión de cuerpo extraño. Se recomienda ecografía abdominal si los vómitos persisten por más de 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 px-6 border-t border-slate-200 text-center">
        <h2 className="text-2xl font-black tracking-tighter text-slate-800 mb-6">
          PETCARE<span className="text-sky-500">.AI</span>
        </h2>
        <p className="text-slate-500 text-sm">© 2026 Petcare AI Platform. Todos los derechos reservados.</p>
        <p className="text-slate-400 text-xs mt-2">Construido con React, Tailwind, Supabase y Vite.</p>
        <p className="text-slate-500 text-sm mt-4 font-medium">
          Desarrollado por <a href="https://bastiascid.cl" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Cristian Bastias Cid</a>
        </p>
      </footer>
    </div>
  );
}
