import React, { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  description,
  thumbnail,
  className = '',
  onLoad,
  onError
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  // Función para obtener thumbnail de YouTube - DESHABILITADA para evitar carga automática
  // const getYouTubeThumbnail = (url: string): string => {
  //   // NUNCA cargar thumbnails automáticamente
  //   return '';
  // };

  // Función para convertir URL de YouTube a formato embed
  const convertToEmbedUrl = (url: string): string => {
    if (url.includes('embed')) {
      return url;
    }
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
    }
    
    return url;
  };

  // Determinar si es video de YouTube o local
  const isYouTubeVideo = !url.startsWith('data:video') && (url.includes('youtube.com') || url.includes('youtu.be'));
  const isLocalVideo = url.startsWith('data:video');

  // NO obtener thumbnails automáticamente - solo usar si se proporciona explícitamente
  const getThumbnail = (): string => {
    // Solo usar thumbnail si se proporciona explícitamente, NUNCA cargar automáticamente
    return thumbnail || '';
  };

  const handlePlay = () => {
    console.log('🎬 VideoPlayer: Play button clicked for:', title);
    setIsLoading(true);
    setHasError(false);
    
    try {
      setIsPlaying(true);
      onLoad?.();
      console.log('✅ VideoPlayer: Started playing:', title);
    } catch (error) {
      console.error('❌ VideoPlayer: Error starting video:', error);
      setHasError(true);
      onError?.();
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    console.log('✅ VideoPlayer: Video loaded successfully:', title);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error('❌ VideoPlayer: Video failed to load:', title);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={`relative bg-gray-800 rounded-lg overflow-hidden ${className}`}>
        <div className="aspect-w-16 aspect-h-9 flex items-center justify-center bg-gray-800">
          <div className="text-center space-y-4 p-8">
            <div className="text-4xl mb-2">❌</div>
            <div className="space-y-2">
              <p className="text-gray-300 text-lg font-medium">Error al cargar el video</p>
              <p className="text-gray-500 text-sm">{title}</p>
              <button
                onClick={() => {
                  setHasError(false);
                  setIsPlaying(false);
                }}
                className="mt-4 bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isPlaying) {
    // Vista de placeholder - NUNCA cargar thumbnails automáticamente
    return (
      <div className={`relative bg-gray-800 rounded-lg overflow-hidden group cursor-pointer ${className}`}>
        <div className="aspect-w-16 aspect-h-9 relative">
          {/* SIEMPRE mostrar placeholder, nunca cargar thumbnails automáticamente */}
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-2">🎬</div>
              <div className="space-y-2">
                <p className="text-gray-300 text-xl font-medium">{title}</p>
                {description && (
                  <p className="text-gray-500 text-sm max-w-md mx-auto line-clamp-2">{description}</p>
                )}
                <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-medium inline-block mt-2">
                  ⚡ Carga bajo demanda
                </div>
              </div>
            </div>
          </div>
          
          {/* Overlay con botón de play */}
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={handlePlay}
              disabled={isLoading}
              className="bg-primary hover:bg-primary-light text-white rounded-full p-6 transform transition-all duration-300 group-hover:scale-110 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Reproducir ${title}`}
            >
              {isLoading ? (
                <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
              ) : (
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
          
          {/* Indicador de tipo de video */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {isYouTubeVideo ? 'YouTube' : isLocalVideo ? 'Video Local' : 'Video'}
          </div>
        </div>
        
        {/* Información del video */}
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    );
  }

  // Vista del video reproduciéndose
  return (
    <div className={`relative bg-gray-800 rounded-lg overflow-hidden ${className}`}>
      <div className="aspect-w-16 aspect-h-9">
        {isYouTubeVideo ? (
          <iframe
            src={convertToEmbedUrl(url)}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleVideoLoad}
            onError={handleVideoError}
          />
        ) : (
          <video
            src={url}
            controls
            autoPlay
            className="w-full h-full"
            preload="metadata"
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
          />
        )}
      </div>
      
      {/* Botón para cerrar/volver al thumbnail */}
      <button
        onClick={() => {
          setIsPlaying(false);
          console.log('🔄 VideoPlayer: Stopped playing:', title);
        }}
        className="absolute top-4 left-4 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Cerrar video"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default VideoPlayer;