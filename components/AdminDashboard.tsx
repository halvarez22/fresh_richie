import React from 'react';
import { useContent } from '../src/hooks/useHybridContent';
import { useAuth } from '../src/contexts/AuthContext';
import { put } from '@vercel/blob';

interface AdminDashboardProps {
  onEditSection: (section: string) => void;
  onClose?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onEditSection, onClose }) => {
  const { content, isLoading, updateContent } = useContent();
  const { logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-white text-xl">Cargando Dashboard...</div>
          <div className="text-gray-400 text-sm mt-2">Preparando las herramientas de administración</div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Error al cargar el contenido</div>
      </div>
    );
  }

  const sections = [
    {
      id: 'header',
      title: 'Header',
      icon: '🏠',
      description: 'Personalizar el tagline debajo de "Fresh Richie"',
      status: 'active'
    },
    {
      id: 'music',
      title: 'Música',
      icon: '🎵',
      description: 'Álbumes y enlaces de streaming',
      status: 'active'
    },
    {
      id: 'biography',
      title: 'Biografía',
      icon: '📖',
      description: 'Historia del artista',
      status: 'active'
    },
    {
      id: 'gallery',
      title: 'Galería',
      icon: '📸',
      description: `${content.gallery.images.length} fotos`,
      status: 'active'
    },
    {
      id: 'videos',
      title: 'Videos',
      icon: '🎬',
      description: `${content.videos?.videos?.length || 0} videos (YouTube + Locales)`,
      status: 'active'
    },
    {
      id: 'events',
      title: 'Eventos',
      icon: '📅',
      description: `${content.events.length} eventos próximos`,
      status: 'active'
    },
    {
      id: 'news',
      title: 'Noticias',
      icon: '📰',
      description: `${content.news.length} artículos`,
      status: 'active'
    }
  ];

  const addPhoto = () => {
    if ((import.meta as any).env.DEV) {
      // En desarrollo local, usar URL
      const url = prompt('Ingresa la URL de la nueva foto:');
      if (url && content) {
        const newContent = {
          ...content,
          gallery: {
            ...content.gallery,
            images: [...content.gallery.images, url]
          }
        };
        updateContent(newContent);
      }
    } else {
      // En producción, subir archivo
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file && content) {
          try {
            const { url } = await put(file.name, file, { access: 'public' });
            const newContent = {
              ...content,
              gallery: {
                ...content.gallery,
                images: [...content.gallery.images, url]
              }
            };
            updateContent(newContent);
          } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error al subir la imagen. Inténtalo de nuevo.');
          }
        }
      };
      input.click();
    }
  };

  const addEvent = () => {
    const title = prompt('Título del evento:');
    const date = prompt('Fecha (YYYY-MM-DD):');
    const location = prompt('Ubicación:');
    const description = prompt('Descripción:');
    const image = prompt('URL de la imagen:');
    const ticketLink = prompt('Enlace de boletos:');
    if (title && date && location && content) {
      const newEvent = {
        id: Date.now(), // simple ID
        title,
        date,
        location,
        description: description || '',
        image: image || '/placeholder.jpg',
        ticketLink: ticketLink || '',
        status: 'upcoming' as const
      };
      const newContent = {
        ...content,
        events: [...content.events, newEvent]
      };
      updateContent(newContent);
    }
  };

  const addNews = () => {
    const title = prompt('Título de la noticia:');
    const newsContent = prompt('Contenido de la noticia:');
    const image = prompt('URL de la imagen:');
    const categoryInput = prompt('Categoría (music, events, personal):');
    const validCategories = ['music', 'events', 'personal'] as const;
    const category = validCategories.includes(categoryInput as any) ? categoryInput as 'music' | 'events' | 'personal' : 'personal';
    if (title && newsContent && content) {
      const newNewsItem = {
        id: Date.now(),
        title,
        content: newsContent,
        date: new Date().toISOString().split('T')[0],
        image: image || '/placeholder.jpg',
        category
      };
      const newContent = {
        ...content,
        news: [...content.news, newNewsItem]
      };
      updateContent(newContent);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-primary/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Contenedor Principal del Header */}
          <div className="py-8">
            {/* Título Principal con Efecto Visual */}
            <div className="text-center mb-8">
              <div className="inline-block">
                <h1 className="text-5xl md:text-6xl font-anton uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary mb-4 drop-shadow-2xl">
                  🎵 Panel de Administración
                </h1>
                <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-60"></div>
              </div>
            </div>
            
            {/* Información del Artista con Estilo Elegante */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-2xl px-8 py-4 shadow-xl">
                <p className="text-gray-200 text-2xl font-bold tracking-wide">
                  Fresh Richie
                </p>
                <p className="text-primary text-lg font-medium tracking-wider uppercase mt-1">
                  Gestión de Contenido
                </p>
              </div>
            </div>
            
            {/* Estado de Sesión Mejorado */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/60 rounded-xl px-6 py-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <p className="text-green-300 text-lg font-semibold tracking-wide">
                    Sesión Activa - Acceso Autorizado
                  </p>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                </div>
              </div>
            </div>
            
            {/* Botón de Acción con Diseño Premium */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => {
                  console.log('🔄 Usuario hizo clic en Cerrar Sesión');
                  logout();
                  if (onClose) {
                    console.log('🔄 Regresando a la página principal');
                    onClose();
                  }
                }}
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-12 py-6 rounded-xl transition-all duration-300 font-bold text-xl tracking-wide shadow-xl hover:shadow-2xl transform hover:scale-105 border border-red-500/30"
              >
                <span className="flex items-center space-x-4">
                  <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🔒</span>
                  <span>Cerrar Sesión</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumen */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">📊 Resumen del Sitio</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">7</div>
              <div className="text-sm text-gray-400">Secciones Activas</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{content.gallery.images.length}</div>
              <div className="text-sm text-gray-400">Fotos en Galería</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{content.events.length}</div>
              <div className="text-sm text-gray-400">Eventos Próximos</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{content.news.length}</div>
              <div className="text-sm text-gray-400">Noticias</div>
            </div>
          </div>
        </div>

        {/* Secciones */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">📝 Gestionar Secciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-primary transition-colors cursor-pointer group"
                onClick={() => onEditSection(section.id)}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{section.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <span className="inline-block bg-green-600 text-green-100 text-xs px-2 py-1 rounded-full">
                      {section.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{section.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary text-sm font-medium">Editar →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">⚡ Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={addPhoto}
              className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg transition-colors"
            >
              📸 Subir Nueva Foto
            </button>
            <button
              onClick={addEvent}
              className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg transition-colors"
            >
              📅 Agregar Evento
            </button>
            <button
              onClick={addNews}
              className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg transition-colors"
            >
              📰 Nueva Noticia
            </button>
          </div>
        </div>

        {/* Herramientas de Sistema */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">🛠️ Herramientas de Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onEditSection('data-manager')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg transition-colors flex items-center justify-center space-x-3"
            >
              <span className="text-xl">🛠️</span>
              <div className="text-left">
                <div className="font-semibold">Gestor de Datos</div>
                <div className="text-sm opacity-80">Backup, integridad y mantenimiento</div>
              </div>
            </button>
            <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-2xl mb-2">💾</div>
                <div className="text-sm">Persistencia Automática</div>
                <div className="text-xs mt-1 text-green-400">✅ Activa</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
