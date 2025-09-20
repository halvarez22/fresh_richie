import React, { useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import LoginForm from './LoginForm';
import AdminDashboard from './AdminDashboard';
import HeaderEditor from './editors/HeaderEditor';
import BiographyEditor from './editors/BiographyEditor';
import GalleryEditor from './editors/GalleryEditor';
import EventsEditor from './editors/EventsEditor';
import MusicEditor from './editors/MusicEditor';
import NewsEditor from './editors/NewsEditor';

interface AdminPanelProps {
  onClose?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  console.log('AdminPanel renderizado, isAuthenticated:', isAuthenticated, 'isLoading:', isLoading, 'user:', user);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-white text-xl">Verificando acceso...</div>
          <div className="text-gray-400 text-sm mt-2">🔒 Validando credenciales de seguridad</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => setCurrentSection(null)} />;
  }

  if (currentSection) {
    // Renderizar el editor específico según la sección
    switch (currentSection) {
      case 'header':
        return <HeaderEditor onBack={() => setCurrentSection(null)} />;
      case 'biography':
        return <BiographyEditor onBack={() => setCurrentSection(null)} />;
      case 'gallery':
        return <GalleryEditor onBack={() => setCurrentSection(null)} />;
      case 'events':
        return <EventsEditor onBack={() => setCurrentSection(null)} />;
      case 'music':
        return <MusicEditor onBack={() => setCurrentSection(null)} />;
      case 'news':
        return <NewsEditor onBack={() => setCurrentSection(null)} />;
      default:
        return (
          <div className="min-h-screen bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-6">
                <button
                  onClick={() => setCurrentSection(null)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  ← Volver al Dashboard
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-4">
                  Editando: {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
                </h1>
                <p className="text-gray-400 mb-6">
                  Esta sección está en desarrollo. Próximamente podrás editar el contenido aquí.
                </p>
                
                {/* Placeholder para el editor específico */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Editor de {currentSection}</h3>
                  <p className="text-gray-400">
                    Aquí se implementará el editor específico para la sección {currentSection}.
                    Podrás modificar textos, imágenes, y otros contenidos de forma visual.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  return <AdminDashboard onEditSection={setCurrentSection} onClose={onClose} />;
};

export default AdminPanel;
