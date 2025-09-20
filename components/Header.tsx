import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import AdminPanel from './AdminPanel';
import { useContent } from '../src/hooks/useContent';

interface HeaderProps {
  onAdminModeChange?: (isAdmin: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminModeChange }) => {
  const [showAdmin, setShowAdmin] = useState(false);
  const { content } = useContent();

  const handleShowAdmin = () => {
    // Limpiar cualquier sesión existente antes de mostrar el panel
    localStorage.removeItem('fresh-richie-admin');
    localStorage.removeItem('fresh-richie-session-time');
    setShowAdmin(true);
    // Notificar al App que estamos en modo administrativo
    onAdminModeChange?.(true);
  };

  const handleCloseAdmin = () => {
    // Limpiar sesión al cerrar el panel administrativo
    localStorage.removeItem('fresh-richie-admin');
    localStorage.removeItem('fresh-richie-session-time');
    setShowAdmin(false);
    // Notificar al App que salimos del modo administrativo
    onAdminModeChange?.(false);
  };

  if (showAdmin) {
    return <AdminPanel onClose={handleCloseAdmin} />;
  }

  return (
    <header className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/imagen portada.jpg')" }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
      
      {/* Botón de Administración */}
      <button
        onClick={handleShowAdmin}
        className="absolute top-4 right-4 z-50 bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        title="Panel de Administración"
        style={{ zIndex: 9999 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div className="relative z-10 p-5 text-white animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-anton uppercase tracking-widest text-shadow-lg">
          Fresh Richie
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-semibold tracking-wider uppercase text-gray-300">
          {content?.header?.tagline || 'La Nueva Era del Urbano Latino'}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#music"
            className="inline-block bg-primary hover:bg-primary-light text-white font-bold tracking-widest uppercase py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Escucha Ahora
          </a>
          <a
            href="#contact"
            className="inline-block border-2 border-primary hover:bg-primary text-white font-bold tracking-widest uppercase py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Contacto
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;