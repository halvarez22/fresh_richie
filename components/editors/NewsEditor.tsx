import React, { useState, useEffect } from 'react';
import { useContent } from '../../src/hooks/useContent';
import { NewsItem } from '../../src/types/content';

interface NewsEditorProps {
  onBack: () => void;
}

const NewsEditor: React.FC<NewsEditorProps> = ({ onBack }) => {
  const { content, saveContent } = useContent();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (content?.news) {
      setNews(content.news);
    }
  }, [content]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const success = await saveContent('news', news);
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

  const addNews = () => {
    const newNews: NewsItem = {
      id: Date.now(),
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      category: 'music'
    };
    setEditingNews(newNews);
    setShowForm(true);
  };

  const editNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setShowForm(true);
  };

  const saveNews = () => {
    if (!editingNews) return;

    const newsIndex = news.findIndex(n => n.id === editingNews.id);
    if (newsIndex >= 0) {
      // Actualizar noticia existente
      const newNews = [...news];
      newNews[newsIndex] = editingNews;
      setNews(newNews);
    } else {
      // Agregar nueva noticia
      setNews(prev => [...prev, editingNews]);
    }
    
    setShowForm(false);
    setEditingNews(null);
  };

  const deleteNews = (newsId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      setNews(prev => prev.filter(n => n.id !== newsId));
    }
  };

  const moveNews = (fromIndex: number, toIndex: number) => {
    const newNews = [...news];
    const [movedNews] = newNews.splice(fromIndex, 1);
    newNews.splice(toIndex, 0, movedNews);
    setNews(newNews);
  };

  if (showForm && editingNews) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingNews(null);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
            >
              ← Volver a Noticias
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">📰</span>
              <div>
                <h1 className="text-3xl font-bold">
                  {editingNews.id && news.find(n => n.id === editingNews.id) ? 'Editar Noticia' : 'Nueva Noticia'}
                </h1>
                <p className="text-gray-400">Crea contenido para mantener a tus fans informados</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8">
            <div className="space-y-6">
              {/* Información Básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título de la Noticia *
                  </label>
                  <input
                    type="text"
                    value={editingNews.title}
                    onChange={(e) => setEditingNews(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Nuevo Sencillo Disponible"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Categoría
                  </label>
                  <select
                    value={editingNews.category}
                    onChange={(e) => setEditingNews(prev => prev ? { ...prev, category: e.target.value } : null)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="music">Música</option>
                    <option value="personal">Personal</option>
                    <option value="events">Eventos</option>
                    <option value="announcement">Anuncio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={editingNews.date}
                    onChange={(e) => setEditingNews(prev => prev ? { ...prev, date: e.target.value } : null)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL de la Imagen
                  </label>
                  <input
                    type="text"
                    value={editingNews.image}
                    onChange={(e) => setEditingNews(prev => prev ? { ...prev, image: e.target.value } : null)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="/noticia1.jpg"
                  />
                </div>
              </div>

              {/* Contenido */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contenido de la Noticia *
                </label>
                <textarea
                  value={editingNews.content}
                  onChange={(e) => setEditingNews(prev => prev ? { ...prev, content: e.target.value } : null)}
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-vertical"
                  placeholder="Escribe aquí el contenido completo de la noticia..."
                />
                <p className="text-sm text-gray-400 mt-2">
                  {editingNews.content.length} caracteres
                </p>
              </div>

              {/* Vista Previa */}
              {editingNews.title && editingNews.content && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Vista Previa</h3>
                  <div className="bg-gray-800 rounded-lg p-6">
                    {editingNews.image && (
                      <img
                        src={editingNews.image}
                        alt="Vista previa"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-xl font-bold">{editingNews.title}</h4>
                      <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                        {editingNews.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      {new Date(editingNews.date).toLocaleDateString('es-ES')}
                    </p>
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {editingNews.content}
                    </p>
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={saveNews}
                  disabled={!editingNews.title || !editingNews.content}
                  className="flex-1 bg-primary hover:bg-primary-light disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  💾 Guardar Noticia
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingNews(null);
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
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
              <span className="text-4xl">📰</span>
              <div>
                <h1 className="text-3xl font-bold">Editor de Noticias</h1>
                <p className="text-gray-400">Gestiona las noticias y actualizaciones</p>
              </div>
            </div>
            <button
              onClick={addNews}
              className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg transition-colors"
            >
              ➕ Nueva Noticia
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          {/* Lista de Noticias */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              📋 Noticias ({news.length})
            </h2>
            
            {news.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400 text-lg">No hay noticias publicadas</p>
                <p className="text-gray-500 text-sm mt-2">Haz clic en "Nueva Noticia" para crear la primera</p>
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((newsItem, index) => (
                  <div key={newsItem.id} className="bg-gray-800 rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Imagen */}
                      <div className="lg:w-1/4">
                        {newsItem.image ? (
                          <img
                            src={newsItem.image}
                            alt={newsItem.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Sin imagen</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Información */}
                      <div className="lg:w-2/4 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{newsItem.title}</h3>
                          <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                            {newsItem.category}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-2">
                          📅 {new Date(newsItem.date).toLocaleDateString('es-ES')}
                        </p>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {newsItem.content}
                        </p>
                      </div>
                      
                      {/* Acciones */}
                      <div className="lg:w-1/4 flex flex-col gap-2">
                        <button
                          onClick={() => editNews(newsItem)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          ✏️ Editar
                        </button>
                        <div className="flex gap-2">
                          {index > 0 && (
                            <button
                              onClick={() => moveNews(index, index - 1)}
                              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-2 rounded-lg transition-colors text-sm"
                            >
                              ⬆️
                            </button>
                          )}
                          {index < news.length - 1 && (
                            <button
                              onClick={() => moveNews(index, index + 1)}
                              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-2 rounded-lg transition-colors text-sm"
                            >
                              ⬇️
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => deleteNews(newsItem.id)}
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

export default NewsEditor;
