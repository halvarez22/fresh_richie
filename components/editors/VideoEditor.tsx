import React, { useState, useEffect } from 'react';
import { useContent } from '../../src/hooks/useHybridContent';
import VideoUpload from '../VideoUpload';

interface Video {
  id: number;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  isFeatured: boolean;
}

interface VideoContent {
  videos: Video[];
  featuredVideo?: Video;
}

interface VideoEditorProps {
  onBack: () => void;
}

const VideoEditor: React.FC<VideoEditorProps> = ({ onBack }) => {
  const { content, saveContent } = useContent();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (content?.videos?.videos) {
      setVideos(content.videos.videos);
    } else {
      // Datos por defecto si no existen videos
      const defaultVideos: Video[] = [
        {
          id: 1,
          title: 'Fresh Richie - Video Oficial',
          url: 'https://www.youtube.com/embed/QBHW1Hxy4uI',
          description: 'Video oficial de Fresh Richie',
          isFeatured: true
        }
      ];
      setVideos(defaultVideos);
    }
  }, [content]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const videoContent: VideoContent = { videos };
      const success = await saveContent('videos', videoContent);
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

  const addVideo = () => {
    const newVideo: Video = {
      id: Date.now(),
      title: '',
      url: '',
      description: '',
      isFeatured: false
    };
    setEditingVideo(newVideo);
    setShowForm(true);
  };

  const editVideo = (video: Video) => {
    setEditingVideo(video);
    setShowForm(true);
  };

  const saveVideo = async () => {
    if (!editingVideo) return;

    console.log('🎬 Saving video:', {
      id: editingVideo.id,
      title: editingVideo.title,
      urlLength: editingVideo.url.length,
      urlType: editingVideo.url.startsWith('data:video') ? 'base64' : 'youtube',
      urlPreview: editingVideo.url.substring(0, 50) + '...'
    });

    const videoIndex = videos.findIndex(v => v.id === editingVideo.id);
    let newVideos;
    if (videoIndex >= 0) {
      // Actualizar video existente
      newVideos = [...videos];
      newVideos[videoIndex] = editingVideo;
      setVideos(newVideos);
      console.log('🎬 Video updated in list');
    } else {
      // Agregar nuevo video
      newVideos = [...videos, editingVideo];
      setVideos(newVideos);
      console.log('🎬 Video added to list');
    }

    // Guardar INMEDIATAMENTE en localStorage usando saveContent
    try {
      const videoContent = { videos: newVideos };
      const success = await saveContent('videos', videoContent);
      if (success) {
        console.log('💾 Video saved to localStorage successfully');
        // Mostrar confirmación visual
        alert('✅ Video guardado exitosamente con persistencia automática');
      } else {
        console.error('❌ Failed to save video to localStorage');
        alert('❌ Error al guardar el video. Inténtalo de nuevo.');
        return; // No cerrar el formulario si falló el guardado
      }
    } catch (error) {
      console.error('❌ Error saving video to localStorage:', error);
      alert('❌ Error al guardar el video. Inténtalo de nuevo.');
      return; // No cerrar el formulario si falló el guardado
    }
    
    setShowForm(false);
    setEditingVideo(null);
  };

  const deleteVideo = async (videoId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este video?')) {
      const newVideos = videos.filter(v => v.id !== videoId);
      setVideos(newVideos);
      
      // Guardar en localStorage
      try {
        const videoContent = { videos: newVideos };
        const success = await saveContent('videos', videoContent);
        if (success) {
          console.log('💾 Video deleted from localStorage successfully');
        } else {
          console.error('❌ Failed to delete video from localStorage');
        }
      } catch (error) {
        console.error('❌ Error deleting video from localStorage:', error);
      }
    }
  };

  const toggleFeatured = async (videoId: number) => {
    const newVideos = videos.map(video => ({
      ...video,
      isFeatured: video.id === videoId ? !video.isFeatured : false
    }));
    setVideos(newVideos);
    
    // Guardar en localStorage
    try {
      const videoContent = { videos: newVideos };
      const success = await saveContent('videos', videoContent);
      if (success) {
        console.log('💾 Featured video updated in localStorage successfully');
      } else {
        console.error('❌ Failed to update featured video in localStorage');
      }
    } catch (error) {
      console.error('❌ Error updating featured video in localStorage:', error);
    }
  };

  const extractYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  // Función deshabilitada para evitar carga automática de thumbnails
  // const getYouTubeThumbnail = (url: string): string => {
  //   // NUNCA cargar thumbnails automáticamente
  //   return '';
  // };

  if (showForm && editingVideo) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingVideo(null);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
            >
              ← Volver a Videos
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🎬</span>
              <div>
                <h1 className="text-3xl font-bold">
                  {editingVideo.id && videos.find(v => v.id === editingVideo.id) ? 'Editar Video' : 'Nuevo Video'}
                </h1>
                <p className="text-gray-400">Gestiona los videos de YouTube y locales</p>
                <div className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs font-medium inline-block mt-2">
                  💡 Los videos se reproducen solo bajo demanda del usuario
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información Básica */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título del Video *
                </label>
                <input
                  type="text"
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="Mi Nuevo Video"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL de YouTube *
                </label>
                <input
                  type="url"
                  value={editingVideo.url}
                  onChange={(e) => setEditingVideo(prev => prev ? { ...prev, url: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                />
                <p className="text-xs text-gray-500 mt-1">
                  O usa el componente de abajo para subir un video local
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={editingVideo.description}
                  onChange={(e) => setEditingVideo(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-vertical"
                  placeholder="Descripción del video..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingVideo.isFeatured}
                    onChange={(e) => setEditingVideo(prev => prev ? { ...prev, isFeatured: e.target.checked } : null)}
                    className="mr-3 w-4 h-4 text-primary bg-gray-800 border-gray-700 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-gray-300">⭐ Video Destacado (aparecerá primero)</span>
                </label>
              </div>
            </div>

            {/* Carga de Video Local */}
            <div className="mt-6">
              <VideoUpload
                onVideoChange={(videoUrl) => {
                  if (videoUrl) {
                    setEditingVideo(prev => prev ? { ...prev, url: videoUrl } : null);
                  }
                }}
                currentVideo={editingVideo.url && editingVideo.url.startsWith('data:video') ? editingVideo.url : ''}
                label="Video Local (MP4)"
                placeholder="Selecciona un archivo de video MP4"
                maxSize={5}
              />
            </div>

            {/* Debug Info */}
            {editingVideo.url && editingVideo.url.startsWith('data:video') && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Debug Info:</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>URL Length: {editingVideo.url.length} characters</p>
                  <p>URL Type: Base64 Video</p>
                  <p>Preview: {editingVideo.url.substring(0, 100)}...</p>
                </div>
              </div>
            )}

            {/* Información del Video - SIN vista previa automática */}
            {editingVideo.url && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Información del Video</h3>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center border-2 border-gray-600">
                    <div className="text-center space-y-3">
                      <div className="text-6xl mb-2">🎬</div>
                      <div className="space-y-2">
                        <p className="text-gray-300 text-lg font-medium">
                          {editingVideo.url.startsWith('data:video') ? 'Video Local Cargado' : 'Video de YouTube'}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {editingVideo.title || 'Sin título'}
                        </p>
                        <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-medium inline-block">
                          ✅ Sin carga automática - Mejor rendimiento
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <h4 className="text-xl font-bold">{editingVideo.title || 'Sin título'}</h4>
                    <p className="text-gray-400">{editingVideo.description || 'Sin descripción'}</p>
                    <div className="text-xs text-gray-500 bg-gray-900 p-2 rounded">
                      <p><strong>Tipo:</strong> {editingVideo.url.startsWith('data:video') ? 'Video Local (Base64)' : 'YouTube'}</p>
                      <p><strong>URL:</strong> {editingVideo.url.substring(0, 80)}...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={saveVideo}
                disabled={!editingVideo.title || !editingVideo.url}
                className="flex-1 bg-primary hover:bg-primary-light disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                💾 Guardar Video
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingVideo(null);
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
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
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎬</span>
              <div>
                <h1 className="text-3xl font-bold">Editor de Videos</h1>
                <p className="text-gray-400">Gestiona los videos de YouTube y locales</p>
                <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-medium inline-block mt-2">
                  ⚡ Sistema optimizado - Sin carga automática
                </div>
              </div>
            </div>
            <button
              onClick={addVideo}
              className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg transition-colors"
            >
              ➕ Nuevo Video
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          {/* Lista de Videos */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              📋 Videos ({videos.length})
            </h2>
            
            {videos.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400 text-lg">No hay videos registrados</p>
                <p className="text-gray-500 text-sm mt-2">Haz clic en "Nuevo Video" para agregar el primero</p>
              </div>
            ) : (
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="bg-gray-800 rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Placeholder - NO cargar thumbnails automáticamente */}
                      <div className="lg:w-1/4">
                        <div className="w-full h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-600">
                          <div className="text-center">
                            <div className="text-2xl mb-1">🎬</div>
                            <div className="text-xs text-gray-400">
                              {video.url.startsWith('data:video') ? 'Video Local' : 'YouTube'}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Sin carga automática
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Información */}
                      <div className="lg:w-2/4 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{video.title}</h3>
                          {video.isFeatured && (
                            <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                              ⭐ Destacado
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{video.description}</p>
                        <p className="text-gray-400 text-xs break-all">{video.url}</p>
                      </div>
                      
                      {/* Acciones */}
                      <div className="lg:w-1/4 flex flex-col gap-2">
                        <button
                          onClick={() => editVideo(video)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => toggleFeatured(video.id)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            video.isFeatured 
                              ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                              : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                          }`}
                        >
                          {video.isFeatured ? '⭐ Quitar Destacado' : '⭐ Destacar'}
                        </button>
                        <button
                          onClick={() => deleteVideo(video.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

export default VideoEditor;
