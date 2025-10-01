import React from 'react';
import { useContent } from '../src/hooks/useHybridContent';
import VideoPlayer from './VideoPlayer';

const VideoSection: React.FC = () => {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return (
      <section id="videos" className="pt-24 pb-20 bg-black min-h-[80vh] relative z-10 border-t-4 border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-white text-xl">Cargando biblioteca de videos...</div>
          <div className="text-gray-400 text-sm mt-2">Los videos se cargarán bajo demanda</div>
        </div>
      </section>
    );
  }

  const videos = content?.videos?.videos || [];
  const featuredVideo = videos.find(video => video.isFeatured) || videos[0];

  console.log('🎬 VideoSection: Loaded', videos.length, 'videos, featured:', featuredVideo?.title || 'none');

  return (
    <section id="videos" className="pt-24 pb-20 bg-black min-h-[80vh] relative z-10 border-t-4 border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-wider text-primary">
          Videos
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          Mira los videos oficiales y contenido exclusivo. Haz clic en cualquier video para reproducirlo.
        </p>
        
        {/* Indicador de carga bajo demanda */}
        <div className="mt-6 inline-flex items-center space-x-2 bg-green-900/30 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span>Carga Optimizada - Videos Bajo Demanda</span>
        </div>

        
        {featuredVideo ? (
          <div className="mt-16 animate-fade-in-up">
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <VideoPlayer
                url={featuredVideo.url}
                title={featuredVideo.title}
                description={featuredVideo.description}
                className="rounded-lg overflow-hidden shadow-2xl border-4 border-primary/50"
                onLoad={() => {
                  console.log('✅ Featured video player loaded successfully');
                }}
                onError={() => {
                  console.error('❌ Error loading featured video player');
                }}
              />
              
              {/* Información adicional del video destacado */}
              <div className="mt-6 text-center space-y-2">
                <div className="inline-flex items-center space-x-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Video Destacado</span>
                </div>
                
                {/* Información de debug */}
                <div className="text-xs text-gray-600 mt-2">
                  <p>Tipo: {featuredVideo.url.startsWith('data:video') ? 'Video local (base64)' : 'YouTube'}</p>
                  <p>Carga: Bajo demanda (click para reproducir)</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-16 animate-fade-in-up">
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl border-4 border-primary/50 bg-gray-800 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-2">🎬</div>
                  <div className="space-y-2">
                    <p className="text-gray-300 text-xl font-medium">No hay videos disponibles</p>
                    <p className="text-gray-500 text-base">Los videos se cargarán próximamente</p>
                    <p className="text-gray-600 text-sm mt-4">💡 Los videos se reproducen bajo demanda para mejor rendimiento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de todos los videos */}
        {videos.length > 1 && (
          <div className="mt-16">
            <div className="bg-gray-900/30 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Más Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.filter(video => video.id !== featuredVideo?.id).map((video) => (
                  <VideoPlayer
                    key={video.id}
                    url={video.url}
                    title={video.title}
                    description={video.description}
                    className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-primary transition-all duration-300"
                    onLoad={() => {
                      console.log('✅ Video player loaded:', video.title);
                    }}
                    onError={() => {
                      console.error('❌ Error loading video player:', video.title);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center space-y-4">
          {/* Test Button - Enhanced */}
          <div className="mb-4 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-300 mb-3">🔧 Sistema de videos bajo demanda:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  const section = document.getElementById('videos');
                  const rect = section?.getBoundingClientRect();
                  const scrollY = window.scrollY;
                  console.log('🧪 VideoSection test:', {
                    sectionTop: section?.offsetTop,
                    viewportTop: rect?.top,
                    scrollY,
                    isVisible: rect && rect.top >= 0 && rect.top <= window.innerHeight
                  });
                  alert(`✅ Sistema de Videos - Estado Actual:\n\n` +
                        `• Sección ID: videos\n` +
                        `• Videos disponibles: ${videos.length}\n` +
                        `• Video destacado: ${featuredVideo?.title || 'Ninguno'}\n` +
                        `• Modo de carga: Bajo demanda\n` +
                        `• Posición correcta: ${rect && rect.top >= 0 && rect.top <= window.innerHeight ? 'Sí ✅' : 'No ❌'}\n` +
                        `• Rendimiento: Optimizado 🚀`);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                🧪 TEST: Sistema Videos
              </button>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                🏠 Ir al Header
              </button>
              <button
                onClick={() => {
                  console.log('📊 Video performance info:', {
                    totalVideos: videos.length,
                    autoLoad: false,
                    onDemand: true,
                    thumbnailsOnly: true
                  });
                  alert(`📊 Información de Rendimiento:\n\n` +
                        `• Videos NO se cargan automáticamente\n` +
                        `• Solo thumbnails/previews iniciales\n` +
                        `• Reproducción bajo demanda del usuario\n` +
                        `• Mejor experiencia y velocidad ⚡`);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                📊 Info Rendimiento
              </button>
            </div>
          </div>
          
          <a
            href="https://www.youtube.com/channel/UC0PTxtms1tiYRPnt0AQfLMQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-primary hover:bg-primary text-white font-bold tracking-widest uppercase py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
          >
            Ver más en YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;