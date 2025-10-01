import React, { useState, useEffect } from 'react';
import { useContent } from '../../src/hooks/useContent';
import { GalleryContent } from '../../src/types/content';
import ImageUpload from '../ImageUpload';

interface GalleryEditorProps {
  onBack: () => void;
}

const GalleryEditor: React.FC<GalleryEditorProps> = ({ onBack }) => {
  const { content, saveContent } = useContent();
  const [gallery, setGallery] = useState<GalleryContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    if (content?.gallery) {
      setGallery(content.gallery);
    }
  }, [content]);

  const handleSave = async () => {
    if (!gallery) return;
    
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const success = await saveContent('gallery', gallery);
      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const addImage = () => {
    if (newImageUrl.trim() && gallery) {
      setGallery(prev => prev ? {
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      } : null);
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    if (gallery) {
      setGallery(prev => prev ? {
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      } : null);
    }
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (gallery) {
      const newImages = [...gallery.images];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      
      setGallery(prev => prev ? {
        ...prev,
        images: newImages
      } : null);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    if (gallery && imageUrl) {
      setGallery(prev => prev ? {
        ...prev,
        images: [...prev.images, imageUrl]
      } : null);
    }
  };

  if (!gallery) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando editor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
          >
            ← Volver al Dashboard
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">📸</span>
            <div>
              <h1 className="text-3xl font-bold">Editor de Galería</h1>
              <p className="text-gray-400">Gestiona las fotos de la galería</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          {/* Información General */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">ℹ️ Información General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título de la Sección
                </label>
                <input
                  type="text"
                  value={gallery.title}
                  onChange={(e) => setGallery(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción
                </label>
                <input
                  type="text"
                  value={gallery.description}
                  onChange={(e) => setGallery(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Agregar Nueva Imagen */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">➕ Agregar Nueva Imagen</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="URL de la imagen (ej: /nueva-imagen.jpg)"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <button
                onClick={addImage}
                disabled={!newImageUrl.trim()}
                className="bg-primary hover:bg-primary-light disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Agregar URL
              </button>
            </div>
            
            <div className="mt-6">
              <ImageUpload
                currentImage=""
                onImageChange={handleImageUpload}
                label="Agregar Imagen desde Archivo"
                placeholder="Selecciona una imagen para agregar a la galería"
                previewClassName="w-full h-32 object-cover rounded-lg"
                showPreview={false}
                uploadPath="gallery/"
              />
            </div>
          </div>

          {/* Galería Actual */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              🖼️ Galería Actual ({gallery.images.length} imágenes)
            </h2>
            
            {gallery.images.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400 text-lg">No hay imágenes en la galería</p>
                <p className="text-gray-500 text-sm mt-2">Agrega imágenes usando los métodos de arriba</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.images.map((image, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <img
                      src={image}
                      alt={`Galería ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => {
                          const newImages = [...gallery.images];
                          newImages[index] = e.target.value;
                          setGallery(prev => prev ? { ...prev, images: newImages } : null);
                        }}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-primary focus:outline-none"
                      />
                      <div className="flex gap-2">
                        {index > 0 && (
                          <button
                            onClick={() => moveImage(index, index - 1)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            ↑
                          </button>
                        )}
                        {index < gallery.images.length - 1 && (
                          <button
                            onClick={() => moveImage(index, index + 1)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          onClick={() => removeImage(index)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vista Previa */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">👁️ Vista Previa</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-center">{gallery.title}</h3>
              <p className="text-gray-400 text-center mb-6">{gallery.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.images.map((image, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-primary hover:bg-primary-light disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isSaving ? '💾 Guardando...' : '💾 Guardar Cambios'}
            </button>
            <button
              onClick={onBack}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>

          {/* Estado de Guardado */}
          {saveStatus === 'success' && (
            <div className="mt-4 bg-green-900/50 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
              ✅ Cambios guardados exitosamente
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="mt-4 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              ❌ Error al guardar los cambios
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryEditor;
