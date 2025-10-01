import React from 'react';
import { useContent } from '../src/hooks/useContent';
import Footer from './Footer';
import OptimizedImage from './OptimizedImage';

interface EventsPageProps {
  onNavigate?: (page: 'home' | 'events' | 'news') => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  console.log('📅 EventsPage: Component rendering, onNavigate exists:', !!onNavigate);
  const { content, isLoading } = useContent();
  console.log('📅 EventsPage: useContent hook called, isLoading:', isLoading);

  if (isLoading) {
    console.log('📅 EventsPage: Showing loading state');
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-white text-xl">Cargando eventos...</div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Error al cargar los eventos</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const upcomingEvents = content.events.filter(event => event.status === 'upcoming');
  const pastEvents = content.events.filter(event => event.status === 'past');

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <button
              onClick={() => {
                console.log('🔙 EventsPage: Volver al Inicio clicked');
                console.log('🔙 EventsPage: onNavigate function exists:', !!onNavigate);
                if (onNavigate) {
                  console.log('🔙 EventsPage: calling onNavigate with home');
                  onNavigate('home');
                  console.log('🔙 EventsPage: onNavigate called successfully');
                } else {
                  console.log('🔙 EventsPage: onNavigate is undefined!');
                }
              }}
              className="inline-flex items-center text-gray-300 hover:text-primary transition-colors duration-300"
            >
              <span className="mr-2">←</span>
              <span>Volver al Inicio</span>
            </button>
          </div>
          <h1 className="text-5xl md:text-7xl font-anton uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary mb-6">
            🎵 Eventos
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-semibold tracking-wider uppercase mb-8">
            Próximos shows y presentaciones
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-anton uppercase tracking-widest text-white mb-12 text-center">
              🚀 Próximos Eventos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-primary transition-all duration-300 group">
                  <div className="relative">
                    <OptimizedImage 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      fallback="/placeholder.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                        Próximo
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-300">
                        <span className="text-primary mr-2">📅</span>
                        <span className="font-semibold">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <span className="text-primary mr-2">📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    {event.ticketLink && (
                      <a
                        href={event.ticketLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary hover:bg-primary-light text-white font-bold tracking-widest uppercase py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center"
                      >
                        🎫 Comprar Boletos
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-anton uppercase tracking-widest text-white mb-12 text-center">
              📚 Eventos Pasados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 opacity-75">
                  <div className="relative">
                    <OptimizedImage 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover"
                      fallback="/placeholder.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                        Realizado
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-300 mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-400">
                        <span className="text-gray-500 mr-2">📅</span>
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span className="text-gray-500 mr-2">📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Events Message */}
      {content.events.length === 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-gray-900 rounded-lg p-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-white mb-4">No hay eventos programados</h3>
              <p className="text-gray-400">Próximamente anunciaremos nuevas fechas y presentaciones.</p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default EventsPage;