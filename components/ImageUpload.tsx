import React, { useState, useRef } from 'react';
import { ImageUploadService } from '../src/firebase/imageUploadService';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // en MB
  showPreview?: boolean;
  previewClassName?: string;
  uploadPath?: string; // Ruta en Firebase Storage
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  label = "Imagen",
  placeholder = "Selecciona una imagen",
  className = "",
  accept = "image/*",
  maxSize = 5, // 5MB por defecto
  showPreview = true,
  previewClassName = "w-full h-48 object-cover rounded-lg",
  uploadPath = "images/"
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen');
      return false;
    }

    // Validar tamaño
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`El archivo es demasiado grande. Máximo ${maxSize}MB`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    setError(null);

    try {
      // Usar base64 como solución principal para proyectos pequeños
      const base64Url = await ImageUploadService.fileToBase64(file);
      onImageChange(base64Url);
    } catch (error) {
      console.error('Error converting file to base64:', error);
      setError('Error al procesar la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onImageChange('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      {/* Preview de la imagen actual */}
      {showPreview && currentImage && (
        <div className="relative">
          <img
            src={currentImage}
            alt="Preview"
            className={previewClassName}
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
            title="Eliminar imagen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Área de carga */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-primary/10'
            : currentImage
            ? 'border-gray-600 bg-gray-800/50'
            : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-800/70'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <div className="space-y-3">
          <div className="text-4xl text-gray-400">
            {currentImage ? '🖼️' : '📸'}
          </div>
          
          <div className="text-gray-300">
            {currentImage ? (
              <p className="text-sm">Imagen cargada exitosamente</p>
            ) : isUploading ? (
              <p className="text-sm font-medium">📤 Procesando imagen...</p>
            ) : (
              <>
                <p className="text-sm font-medium">{placeholder}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Arrastra y suelta una imagen aquí o haz clic para seleccionar
                </p>
                <p className="text-xs text-gray-500">
                  Máximo {maxSize}MB • JPG, PNG, GIF, WebP
                </p>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onButtonClick}
            disabled={isUploading}
            className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              currentImage
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-primary hover:bg-primary-light text-white'
            }`}
          >
            {isUploading ? '📤 Procesando...' : currentImage ? '🔄 Cambiar Imagen' : '📁 Seleccionar Archivo'}
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
        <p>• Las imágenes se convierten a base64 y se guardan en localStorage</p>
        <p>• Formatos soportados: JPG, PNG, GIF, WebP</p>
        <p>• Tamaño máximo recomendado: {maxSize}MB</p>
        <p>• Las imágenes persisten al navegar y recargar la página</p>
      </div>
    </div>
  );
};

export default ImageUpload;
