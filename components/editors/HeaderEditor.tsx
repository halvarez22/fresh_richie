import React, { useState, useEffect } from 'react';
import { useContent } from '../../src/hooks/useContent';

interface HeaderEditorProps {
  onBack: () => void;
}

const HeaderEditor: React.FC<HeaderEditorProps> = ({ onBack }) => {
  const { content, updateContent } = useContent();
  const [tagline, setTagline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (content?.header?.tagline) {
      setTagline(content.header.tagline);
    }
  }, [content]);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Simular guardado (en una implementación real, aquí harías la llamada a la API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el contenido local
      if (updateContent) {
        updateContent({
          ...content,
          header: {
            ...content?.header,
            tagline: tagline.trim()
          }
        });
      }

      setMessage('✅ Tagline actualizado exitosamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error al actualizar el tagline');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTagline('La Nueva Era del Urbano Latino');
    setMessage('🔄 Tagline restaurado al valor original');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header del Editor */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium mb-6"
          >
            ← Volver al Dashboard
          </button>
          
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
            <h1 className="text-3xl font-bold mb-2 text-primary">🎵 Editor del Header</h1>
            <p className="text-gray-400 text-lg">
              Personaliza el tagline que aparece debajo de "Fresh Richie"
            </p>
          </div>
        </div>

        {/* Editor Principal */}
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-white">📝 Editar Tagline</h2>
          
          {/* Vista Previa */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Vista Previa:</h3>
            <div className="bg-black border border-gray-600 rounded-lg p-8 text-center">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-anton uppercase tracking-widest text-white mb-4">
                Fresh Richie
              </h1>
              <p className="text-lg md:text-2xl font-semibold tracking-wider uppercase text-gray-300">
                {tagline || 'La Nueva Era del Urbano Latino'}
              </p>
            </div>
          </div>

          {/* Campo de Edición */}
          <div className="space-y-6">
            <div>
              <label htmlFor="tagline" className="block text-lg font-semibold mb-3 text-white">
                Tagline (Frase debajo de "Fresh Richie")
              </label>
              <input
                id="tagline"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Ej: La Nueva Era del Urbano Latino"
                className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded-lg text-white text-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                maxLength={100}
              />
              <p className="text-sm text-gray-400 mt-2">
                {tagline.length}/100 caracteres
              </p>
            </div>

            {/* Sugerencias */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-300">💡 Sugerencias:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'La Nueva Era del Urbano Latino',
                  'El Futuro del Reggaeton',
                  'Música que Transforma',
                  'El Rey del Urbano',
                  'Revolución Musical',
                  'El Sonido de la Calle'
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setTagline(suggestion)}
                    className="p-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-left transition-colors text-gray-300 hover:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSave}
            disabled={isLoading || !tagline.trim()}
            className="bg-primary hover:bg-primary-light disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg transition-colors font-bold text-lg flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Guardar Cambios</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg transition-colors font-bold text-lg flex items-center justify-center space-x-2"
          >
            <span>🔄</span>
            <span>Restaurar Original</span>
          </button>
        </div>

        {/* Mensaje de Estado */}
        {message && (
          <div className="mt-6 text-center">
            <div className={`inline-block px-6 py-3 rounded-lg font-semibold ${
              message.includes('✅') ? 'bg-green-900/30 text-green-300 border border-green-500/50' :
              message.includes('❌') ? 'bg-red-900/30 text-red-300 border border-red-500/50' :
              'bg-blue-900/30 text-blue-300 border border-blue-500/50'
            }`}>
              {message}
            </div>
          </div>
        )}

        {/* Información Adicional */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-300">ℹ️ Información Importante</h3>
          <ul className="text-blue-200 space-y-2 text-sm">
            <li>• El tagline aparecerá debajo del nombre "Fresh Richie" en la página principal</li>
            <li>• Se recomienda mantener frases cortas y impactantes</li>
            <li>• Los cambios se reflejarán inmediatamente en el sitio</li>
            <li>• Puedes restaurar el valor original en cualquier momento</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderEditor;
