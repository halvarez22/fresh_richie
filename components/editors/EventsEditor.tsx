import React, { useState, useEffect } from 'react';
import { useContent } from '../../src/hooks/useContent';
import { Event } from '../../src/types/content';

interface EventsEditorProps {
  onBack: () => void;
}

const EventsEditor: React.FC<EventsEditorProps> = ({ onBack }) => {
  const { content, saveContent } = useContent();
  const [events, setEvents] = useState<Event[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (content?.events) {
      setEvents(content.events);
    }
  }, [content]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const success = await saveContent('events', events);
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

  const addEvent = () => {
    const newEvent: Event = {
      id: Date.now(),
      title: '',
      date: '',
      location: '',
      description: '',
      image: '',
      ticketLink: '',
      status: 'upcoming'
    };
    setEditingEvent(newEvent);
    setShowForm(true);
  };

  const editEvent = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const saveEvent = () => {
    if (!editingEvent) return;

    const eventIndex = events.findIndex(e => e.id === editingEvent.id);
    if (eventIndex >= 0) {
      // Actualizar evento existente
      const newEvents = [...events];
      newEvents[eventIndex] = editingEvent;
      setEvents(newEvents);
    } else {
      // Agregar nuevo evento
      setEvents(prev => [...prev, editingEvent]);
    }
    
    setShowForm(false);
    setEditingEvent(null);
  };

  const deleteEvent = (eventId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const toggleEventStatus = (eventId: number) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            status: event.status === 'upcoming' ? 'past' : 'upcoming' 
          }
        : event
    ));
  };

  if (showForm && editingEvent) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingEvent(null);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
            >
              ← Volver a Eventos
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">📅</span>
              <div>
                <h1 className="text-3xl font-bold">
                  {editingEvent.id && events.find(e => e.id === editingEvent.id) ? 'Editar Evento' : 'Nuevo Evento'}
                </h1>
                <p className="text-gray-400">Completa la información del evento</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información Básica */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título del Evento *
                </label>
                <input
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="Concierto en CDMX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha *
                </label>
                <input
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent(prev => prev ? { ...prev, date: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ubicación *
                </label>
                <input
                  type="text"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent(prev => prev ? { ...prev, location: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="Foro Sol, Ciudad de México"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  value={editingEvent.status}
                  onChange={(e) => setEditingEvent(prev => prev ? { ...prev, status: e.target.value as 'upcoming' | 'past' | 'cancelled' } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                >
                  <option value="upcoming">Próximo</option>
                  <option value="past">Pasado</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-vertical"
                  placeholder="Presentación del nuevo álbum con invitados especiales..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL de la Imagen
                </label>
                <input
                  type="text"
                  value={editingEvent.image}
                  onChange={(e) => setEditingEvent(prev => prev ? { ...prev, image: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="/evento1.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Link de Boletos
                </label>
                <input
                  type="url"
                  value={editingEvent.ticketLink || ''}
                  onChange={(e) => setEditingEvent(prev => prev ? { ...prev, ticketLink: e.target.value } : null)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="https://ticketmaster.com/fresh-richie"
                />
              </div>
            </div>

            {/* Vista Previa */}
            {editingEvent.image && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Vista Previa</h3>
                <div className="bg-gray-800 rounded-lg p-4">
                  <img
                    src={editingEvent.image}
                    alt="Vista previa"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-bold">{editingEvent.title}</h4>
                  <p className="text-gray-400">{editingEvent.location}</p>
                  <p className="text-gray-400">{new Date(editingEvent.date).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={saveEvent}
                disabled={!editingEvent.title || !editingEvent.date || !editingEvent.location}
                className="flex-1 bg-primary hover:bg-primary-light disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                💾 Guardar Evento
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingEvent(null);
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
              <span className="text-4xl">📅</span>
              <div>
                <h1 className="text-3xl font-bold">Editor de Eventos</h1>
                <p className="text-gray-400">Gestiona los eventos y conciertos</p>
              </div>
            </div>
            <button
              onClick={addEvent}
              className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg transition-colors"
            >
              ➕ Nuevo Evento
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          {/* Lista de Eventos */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              📋 Eventos ({events.length})
            </h2>
            
            {events.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400 text-lg">No hay eventos registrados</p>
                <p className="text-gray-500 text-sm mt-2">Haz clic en "Nuevo Evento" para agregar el primero</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-gray-800 rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Imagen */}
                      <div className="lg:w-1/4">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
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
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === 'upcoming' ? 'bg-green-600 text-green-100' :
                            event.status === 'past' ? 'bg-gray-600 text-gray-100' :
                            'bg-red-600 text-red-100'
                          }`}>
                            {event.status === 'upcoming' ? 'Próximo' :
                             event.status === 'past' ? 'Pasado' : 'Cancelado'}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-1">📍 {event.location}</p>
                        <p className="text-gray-400 mb-2">📅 {new Date(event.date).toLocaleDateString('es-ES')}</p>
                        <p className="text-gray-300 text-sm">{event.description}</p>
                        {event.ticketLink && (
                          <a
                            href={event.ticketLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-primary hover:text-primary-light text-sm"
                          >
                            🎫 Ver boletos →
                          </a>
                        )}
                      </div>
                      
                      {/* Acciones */}
                      <div className="lg:w-1/4 flex flex-col gap-2">
                        <button
                          onClick={() => editEvent(event)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => toggleEventStatus(event.id)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          {event.status === 'upcoming' ? '✅ Marcar como Pasado' : '🔄 Marcar como Próximo'}
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
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

export default EventsEditor;
