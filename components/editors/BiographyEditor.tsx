import React, { useState, useEffect } from 'react';
import { useContent } from '../../src/hooks/useContent';
import { BiographyContent } from '../../src/types/content';
import ImageUpload from '../ImageUpload';

interface BiographyEditorProps {
  onBack: () => void;
}

const BiographyEditor: React.FC<BiographyEditorProps> = ({ onBack }) => {
  const { content, saveContent } = useContent();
  const [biography, setBiography] = useState<BiographyContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (content?.biography) {
      setBiography(content.biography);
    }
  }, [content]);

  const handleSave = async () => {
    if (!biography) return;
    
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const success = await saveContent('biography', biography);
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

  const handleImageChange = (imageUrl: string) => {
    setBiography(prev => prev ? { ...prev, image: imageUrl } : null);
  };

  if (!biography) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando editor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
          >
            ← Volver al Dashboard
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">📖</span>
            <div>
              <h1 className="text-3xl font-bold">Editor de Biografía</h1>
              <p className="text-gray-400">Modifica la historia y imagen del artista</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          {/* Imagen Principal */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🖼️ Imagen Principal</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <ImageUpload
                  currentImage={biography.image}
                  onImageChange={handleImageChange}
                  label="Imagen de Perfil"
                  placeholder="Selecciona una imagen de perfil"
                  previewClassName="w-full h-48 object-cover rounded-lg"
                  uploadPath="biography/"
                />
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL Alternativa
                  </label>
                  <input
                    type="text"
                    value={biography.image}
                    onChange={(e) => setBiography(prev => prev ? { ...prev, image: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="https://ejemplo.com/perfil.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    O pega una URL de imagen si prefieres
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Título de la Sección
                    </label>
                    <input
                      type="text"
                      value={biography.title}
                      onChange={(e) => setBiography(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      URL de la Imagen Actual
                    </label>
                    <input
                      type="text"
                      value={biography.image}
                      onChange={(e) => setBiography(prev => prev ? { ...prev, image: e.target.value } : null)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="/imagen_3.jpg"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Puedes cambiar la URL directamente o subir una nueva imagen
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido de Texto */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">📝 Contenido de la Biografía</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Texto Completo
                </label>
                <textarea
                  value={biography.content}
                  onChange={(e) => setBiography(prev => prev ? { ...prev, content: e.target.value } : null)}
                  rows={12}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-vertical"
                  placeholder="Escribe aquí la biografía del artista..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Usa saltos de línea (Enter) para crear párrafos separados
                </p>
              </div>
            </div>
          </div>

          {/* Vista Previa */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">👁️ Vista Previa</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="lg:w-1/3 w-full">
                  <img
                    src={biography.image}
                    alt="Vista previa"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="lg:w-2/3 w-full">
                  <h3 className="text-2xl font-bold mb-4">{biography.title}</h3>
                  <div className="space-y-4 text-gray-300">
                    {biography.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
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

export default BiographyEditor;
