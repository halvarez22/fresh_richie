import React, { useState, useEffect } from 'react';
import { useContent } from '../../src/hooks/useContent';
import { MusicContent, StreamingLink } from '../../src/types/content';

interface MusicEditorProps {
  onBack: () => void;
}

const MusicEditor: React.FC<MusicEditorProps> = ({ onBack }) => {
  const { content, saveContent } = useContent();
  const [music, setMusic] = useState<MusicContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkIcon, setNewLinkIcon] = useState('');

  useEffect(() => {
    if (content?.music) {
      setMusic(content.music);
    }
  }, [content]);

  const handleSave = async () => {
    if (!music) return;
    
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const success = await saveContent('music', music);
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

  const addStreamingLink = () => {
    if (newLinkName.trim() && newLinkUrl.trim() && music) {
      const newLink: StreamingLink = {
        name: newLinkName.trim(),
        url: newLinkUrl.trim(),
        icon: newLinkIcon.trim() || 'music'
      };
      
      setMusic(prev => prev ? {
        ...prev,
        streamingLinks: [...prev.streamingLinks, newLink]
      } : null);
      
      setNewLinkName('');
      setNewLinkUrl('');
      setNewLinkIcon('');
    }
  };

  const removeStreamingLink = (index: number) => {
    if (music) {
      setMusic(prev => prev ? {
        ...prev,
        streamingLinks: prev.streamingLinks.filter((_, i) => i !== index)
      } : null);
    }
  };

  const updateStreamingLink = (index: number, field: keyof StreamingLink, value: string) => {
    if (music) {
      const newLinks = [...music.streamingLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      
      setMusic(prev => prev ? {
        ...prev,
        streamingLinks: newLinks
      } : null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && music) {
      const imageUrl = URL.createObjectURL(file);
      setMusic(prev => prev ? { ...prev, albumArt: imageUrl } : null);
    }
  };

  if (!music) {
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
            <span className="text-4xl">🎵</span>
            <div>
              <h1 className="text-3xl font-bold">Editor de Música</h1>
              <p className="text-gray-400">Gestiona álbumes y enlaces de streaming</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          {/* Información del Álbum */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">💿 Información del Álbum</h2>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Imagen del Álbum */}
              <div className="lg:w-1/3">
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  <img
                    src={music.albumArt}
                    alt="Portada del álbum"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="album-upload"
                  />
                  <label
                    htmlFor="album-upload"
                    className="block bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg cursor-pointer transition-colors mb-2"
                  >
                    📸 Cambiar Portada
                  </label>
                  <input
                    type="text"
                    value={music.albumArt}
                    onChange={(e) => setMusic(prev => prev ? { ...prev, albumArt: e.target.value } : null)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:border-primary focus:outline-none"
                    placeholder="/imagen_2.jpg"
                  />
                </div>
              </div>
              
              {/* Información */}
              <div className="lg:w-2/3 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título de la Sección
                  </label>
                  <input
                    type="text"
                    value={music.title}
                    onChange={(e) => setMusic(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={music.description}
                    onChange={(e) => setMusic(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-vertical"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Título del Álbum
                    </label>
                    <input
                      type="text"
                      value={music.albumTitle}
                      onChange={(e) => setMusic(prev => prev ? { ...prev, albumTitle: e.target.value } : null)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre del Artista
                    </label>
                    <input
                      type="text"
                      value={music.artistName}
                      onChange={(e) => setMusic(prev => prev ? { ...prev, artistName: e.target.value } : null)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces de Streaming */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🔗 Enlaces de Streaming</h2>
            
            {/* Agregar Nuevo Enlace */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">➕ Agregar Nueva Plataforma</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={newLinkName}
                    onChange={(e) => setNewLinkName(e.target.value)}
                    placeholder="Spotify"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="https://open.spotify.com/..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ícono
                  </label>
                  <input
                    type="text"
                    value={newLinkIcon}
                    onChange={(e) => setNewLinkIcon(e.target.value)}
                    placeholder="spotify"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={addStreamingLink}
                    disabled={!newLinkName.trim() || !newLinkUrl.trim()}
                    className="w-full bg-primary hover:bg-primary-light disabled:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Enlaces */}
            <div className="space-y-4">
              {music.streamingLinks.map((link, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={link.name}
                        onChange={(e) => updateStreamingLink(index, 'name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        URL
                      </label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateStreamingLink(index, 'url', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div className="md:w-32">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ícono
                      </label>
                      <input
                        type="text"
                        value={link.icon}
                        onChange={(e) => updateStreamingLink(index, 'icon', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <button
                        onClick={() => removeStreamingLink(index)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vista Previa */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">👁️ Vista Previa</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <img
                    src={music.albumArt}
                    alt="Vista previa"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">{music.albumTitle}</h3>
                  <p className="text-gray-300 mb-4">{music.artistName}</p>
                  <p className="text-gray-400 mb-6">{music.description}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {music.streamingLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-primary text-white px-4 py-2 rounded-full transition-colors"
                      >
                        {link.name}
                      </a>
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

export default MusicEditor;
