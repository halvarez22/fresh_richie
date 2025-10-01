import React, { useState } from 'react';

interface YouTubeVideoProps {
  url: string;
  title: string;
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  url,
  title,
  className = '',
  onError,
  onLoad
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Función para convertir URL de YouTube a formato embed
  const convertToEmbedUrl = (url: string): string => {
    if (url.includes('embed')) {
      return url;
    }
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    return url;
  };

  // Función para obtener thumbnail de YouTube
  const getYouTubeThumbnail = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
    }
    
    return '';
  };

  const handleError = () => {
    console.error('❌ Error loading YouTube video:', title);
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    console.log('✅ YouTube video loaded successfully:', title);
    setIsLoading(false);
    onLoad?.();
  };

  const embedUrl = convertToEmbedUrl(url);
  const thumbnailUrl = getYouTubeThumbnail(url);

  if (hasError) {
    return (
      <div className={`${className} bg-gray-800 rounded-lg flex items-center justify-center`}>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-white mb-2">Error al cargar video</h3>
          <p className="text-gray-400 text-sm mb-4">{title}</p>
          <div className="space-y-2">
            <p className="text-xs text-gray-500">Posibles causas:</p>
            <ul className="text-xs text-gray-500 text-left space-y-1">
              <li>• Bloqueador de anuncios activo</li>
              <li>• Video privado o eliminado</li>
              <li>• Problemas de conexión</li>
            </ul>
          </div>
          <div className="mt-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              🔗 Ver en YouTube
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-400 text-sm">Cargando video...</p>
          </div>
        </div>
      )}
      
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
        onLoad={handleLoad}
        onError={handleError}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
      
      {/* Información de debug */}
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs p-2 rounded opacity-0 hover:opacity-100 transition-opacity">
        <p>URL: {url}</p>
        <p>Embed: {embedUrl}</p>
        <p>Thumbnail: {thumbnailUrl}</p>
      </div>
    </div>
  );
};

export default YouTubeVideo;
