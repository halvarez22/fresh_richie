import React, { useRef, useState } from 'react';

interface VideoUploadProps {
  onVideoChange: (videoUrl: string) => void;
  currentVideo?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  maxSize?: number; // en MB
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  onVideoChange,
  currentVideo,
  className = '',
  label = 'Video',
  placeholder = 'Selecciona un archivo de video',
  maxSize = 5 // 5MB por defecto
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    // Validar tipo de archivo
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!allowedTypes.includes(file.type)) {
      setError('Solo se permiten archivos MP4, WebM u OGG');
      return false;
    }

    // Validar tamaño
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`El archivo debe ser menor a ${maxSize}MB`);
      return false;
    }

    setError(null);
    return true;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFile = async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    setError(null);

    try {
      // Convertir video a base64 para persistencia
      const base64Url = await fileToBase64(file);
      onVideoChange(base64Url);
    } catch (error) {
      console.error('Error converting video to base64:', error);
      setError('Error al procesar el video');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      e.currentTarget.classList.add("border-primary", "bg-primary/10");
    } else if (e.type === "dragleave") {
      e.currentTarget.classList.remove("border-primary", "bg-primary/10");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-primary", "bg-primary/10");

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeVideo = () => {
    onVideoChange('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
          currentVideo
            ? 'border-green-500 bg-green-900/20'
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/ogg"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="text-center">
          {currentVideo ? (
            <div className="space-y-4">
              <video
                src={currentVideo}
                controls
                className="w-full max-w-md mx-auto rounded-lg"
                preload="metadata"
                onError={(e) => {
                  console.error('Error loading video:', e);
                  setError('Error al cargar el video');
                }}
                onLoadedData={() => {
                  console.log('Video loaded successfully');
                  setError(null);
                }}
              />
              <div className="text-green-400 text-sm">
                ✅ Video cargado exitosamente ({Math.round(currentVideo.length / 1024)}KB)
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-6xl mb-4">🎬</div>
              <div className="text-gray-300">
                {isUploading ? (
                  <p className="text-sm font-medium">📤 Procesando video...</p>
                ) : (
                  <>
                    <p className="text-sm font-medium">{placeholder}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Arrastra y suelta un video aquí o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-gray-500">
                      Máximo {maxSize}MB • MP4, WebM, OGG
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={currentVideo ? removeVideo : onButtonClick}
            disabled={isUploading}
            className={`mt-4 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              currentVideo
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-primary hover:bg-primary-light text-white'
            }`}
          >
            {isUploading ? '📤 Procesando...' : currentVideo ? '🗑️ Eliminar Video' : '📁 Seleccionar Video'}
          </button>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-3 py-2 rounded-lg text-sm">
          ❌ {error}
        </div>
      )}

      {/* Información adicional */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Los videos se convierten a base64 y se guardan en localStorage</p>
        <p>• Formatos soportados: MP4, WebM, OGG</p>
        <p>• Tamaño máximo recomendado: {maxSize}MB</p>
        <p>• Los videos persisten al navegar y recargar la página</p>
      </div>
    </div>
  );
};

export default VideoUpload;
