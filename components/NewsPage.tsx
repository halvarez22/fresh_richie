import React from 'react';
import { useContent } from '../src/hooks/useContent';
import Footer from './Footer';

interface NewsPageProps {
  onNavigate?: (page: 'home' | 'events' | 'news') => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  console.log('📰 NewsPage: Component rendering, onNavigate exists:', !!onNavigate);
  const { content, isLoading } = useContent();
  console.log('📰 NewsPage: useContent hook called, isLoading:', isLoading);

  if (isLoading) {
    console.log('📰 NewsPage: Showing loading state');
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-white text-xl">Cargando noticias...</div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Error al cargar las noticias</div>
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'music': return '🎵';
      case 'events': return '📅';
      case 'personal': return '👤';
      default: return '📰';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'music': return 'bg-green-600';
      case 'events': return 'bg-blue-600';
      case 'personal': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'music': return 'Música';
      case 'events': return 'Eventos';
      case 'personal': return 'Personal';
      default: return 'General';
    }
  };

  // Sort news by date (newest first)
  const sortedNews = [...content.news].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <button
              onClick={() => {
                console.log('🔙 NewsPage: Volver al Inicio clicked');
                console.log('🔙 NewsPage: onNavigate function exists:', !!onNavigate);
                if (onNavigate) {
                  console.log('🔙 NewsPage: calling onNavigate with home');
                  onNavigate('home');
                  console.log('🔙 NewsPage: onNavigate called successfully');
                } else {
                  console.log('🔙 NewsPage: onNavigate is undefined!');
                }
              }}
              className="inline-flex items-center text-gray-300 hover:text-primary transition-colors duration-300"
            >
              <span className="mr-2">←</span>
              <span>Volver al Inicio</span>
            </button>
          </div>
          <h1 className="text-5xl md:text-7xl font-anton uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary mb-6">
            📰 Noticias
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-semibold tracking-wider uppercase mb-8">
            Últimas novedades y actualizaciones
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Featured News */}
      {sortedNews.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-anton uppercase tracking-widest text-white mb-8 text-center">
              ⭐ Noticia Destacada
            </h2>
            {(() => {
              const featuredNews = sortedNews[0];
              return (
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img 
                        src={featuredNews.image} 
                        alt={featuredNews.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-2">{getCategoryIcon(featuredNews.category)}</span>
                        <span className={`${getCategoryColor(featuredNews.category)} text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider`}>
                          {getCategoryName(featuredNews.category)}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                        {featuredNews.title}
                      </h3>
                      <div className="flex items-center text-gray-300 mb-4">
                        <span className="text-primary mr-2">📅</span>
                        <span className="font-semibold">{formatDate(featuredNews.date)}</span>
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {featuredNews.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* All News */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-anton uppercase tracking-widest text-white mb-12 text-center">
            🗞️ Todas las Noticias
          </h2>
          
          {sortedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedNews.map((newsItem, index) => (
                <div key={newsItem.id} className={`bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-primary transition-all duration-300 group ${index === 0 ? 'md:col-span-2 lg:col-span-3' : ''}`}>
                  {index === 0 ? (
                    // Skip featured news as it's already shown above
                    null
                  ) : (
                    <>
                      <div className="relative">
                        <img 
                          src={newsItem.image} 
                          alt={newsItem.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className={`${getCategoryColor(newsItem.category)} text-white px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
                            {getCategoryName(newsItem.category)}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {newsItem.title}
                        </h3>
                        <div className="flex items-center text-gray-400 mb-3">
                          <span className="text-primary mr-2 text-sm">📅</span>
                          <span className="text-sm">{formatDate(newsItem.date)}</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {newsItem.content}
                        </p>
                        <div className="mt-4">
                          <button className="text-primary hover:text-primary-light text-sm font-semibold uppercase tracking-wider">
                            Leer más →
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-gray-900 rounded-lg p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-2xl font-bold text-white mb-4">No hay noticias disponibles</h3>
                <p className="text-gray-400">Próximamente publicaremos las últimas novedades y actualizaciones.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default NewsPage;