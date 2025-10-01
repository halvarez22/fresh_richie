import React, { useState } from 'react';
import { useContent } from '../src/hooks/useHybridContent';

interface DataManagerProps {
  onClose?: () => void;
}

const DataManager: React.FC<DataManagerProps> = ({ onClose }) => {
  const { 
    content, 
    verifyDataIntegrity, 
    clearCorruptedData, 
    exportData, 
    loadContent,
    isOnline,
    mode
  } = useContent();
  
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{ isValid: boolean; reason: string } | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleIntegrityCheck = async () => {
    setIsChecking(true);
    try {
      const result = verifyDataIntegrity();
      setCheckResult(result);
      console.log('🔍 DataManager: Integrity check result:', result);
    } catch (err) {
      console.error('❌ DataManager: Integrity check failed:', err);
      setCheckResult({ isValid: false, reason: 'Check failed' });
    } finally {
      setIsChecking(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('⚠️ ¿Estás seguro de que quieres limpiar todos los datos? Esta acción no se puede deshacer.')) {
      return;
    }
    
    setIsClearing(true);
    try {
      const success = clearCorruptedData();
      if (success) {
        alert('✅ Datos limpiados exitosamente. La página se recargará.');
        window.location.reload();
      } else {
        alert('❌ Error al limpiar los datos.');
      }
    } catch (err) {
      console.error('❌ DataManager: Clear data failed:', err);
      alert('❌ Error al limpiar los datos.');
    } finally {
      setIsClearing(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const success = exportData();
      if (success) {
        alert('✅ Datos exportados exitosamente. Revisa tu carpeta de descargas.');
      } else {
        alert('❌ Error al exportar los datos.');
      }
    } catch (err) {
      console.error('❌ DataManager: Export failed:', err);
      alert('❌ Error al exportar los datos.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleReloadData = async () => {
    try {
      await loadContent();
      alert('✅ Datos recargados exitosamente.');
    } catch (err) {
      console.error('❌ DataManager: Reload failed:', err);
      alert('❌ Error al recargar los datos.');
    }
  };

  const getDataStats = () => {
    if (!content) return null;
    
    return {
      videos: content.videos?.videos?.length || 0,
      events: content.events?.length || 0,
      hasHeader: !!content.header,
      hasBio: !!content.bio,
      hasGallery: !!content.gallery,
      totalSize: Math.round(JSON.stringify(content).length / 1024)
    };
  };

  const stats = getDataStats();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
            >
              ← Volver
            </button>
          )}
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">🛠️</span>
            <div>
              <h1 className="text-3xl font-bold">Gestor de Datos</h1>
              <p className="text-gray-400">Herramientas de mantenimiento y backup</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Estadísticas de Datos */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📊 Estadísticas de Datos
            </h2>
            
            {stats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{stats.videos}</div>
                  <div className="text-sm text-gray-400">Videos</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{stats.events}</div>
                  <div className="text-sm text-gray-400">Eventos</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{stats.totalSize}</div>
                  <div className="text-sm text-gray-400">KB Total</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {[stats.hasHeader, stats.hasBio, stats.hasGallery].filter(Boolean).length}/3
                  </div>
                  <div className="text-sm text-gray-400">Secciones</div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-4">
                No hay datos disponibles
              </div>
            )}
          </div>

          {/* Verificación de Integridad */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🔍 Verificación de Integridad
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button
                onClick={handleIntegrityCheck}
                disabled={isChecking}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {isChecking ? '🔍 Verificando...' : '🔍 Verificar Integridad'}
              </button>
              
              {checkResult && (
                <div className={`flex-1 p-4 rounded-lg ${
                  checkResult.isValid 
                    ? 'bg-green-900/50 border border-green-500 text-green-300' 
                    : 'bg-red-900/50 border border-red-500 text-red-300'
                }`}>
                  <div className="font-semibold">
                    {checkResult.isValid ? '✅ Datos íntegros' : '❌ Datos corruptos'}
                  </div>
                  <div className="text-sm mt-1">{checkResult.reason}</div>
                </div>
              )}
            </div>
          </div>

          {/* Herramientas de Backup */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              💾 Herramientas de Backup
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleExportData}
                disabled={isExporting || !content}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {isExporting ? '📤 Exportando...' : '📤 Exportar Datos'}
              </button>
              
              <button
                onClick={handleReloadData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                🔄 Recargar Datos
              </button>
              
              <button
                onClick={handleClearData}
                disabled={isClearing}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {isClearing ? '🧹 Limpiando...' : '🧹 Limpiar Todo'}
              </button>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              <p>• <strong>Exportar:</strong> Descarga un backup completo en formato JSON</p>
              <p>• <strong>Recargar:</strong> Recarga los datos desde localStorage o archivo base</p>
              <p>• <strong>Limpiar:</strong> Elimina todos los datos guardados (irreversible)</p>
            </div>
          </div>

          {/* Información del Sistema */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              ⚙️ Información del Sistema
            </h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Modo de almacenamiento:</span>
                <span className={`font-semibold ${mode === 'firebase' ? 'text-orange-400' : 'text-blue-400'}`}>
                  {mode === 'firebase' ? '🔥 Firebase' : '💾 localStorage'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estado de conexión:</span>
                <span className={isOnline ? 'text-green-400' : 'text-red-400'}>
                  {isOnline ? '✅ Online' : '❌ Offline'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Backup automático:</span>
                <span className="text-green-400">✅ Habilitado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Verificación de integridad:</span>
                <span className="text-green-400">✅ Disponible</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Carga bajo demanda:</span>
                <span className="text-green-400">✅ Optimizado</span>
              </div>
              {mode === 'firebase' && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Sincronización tiempo real:</span>
                  <span className="text-green-400">✅ Activa</span>
                </div>
              )}
            </div>
            
            {/* Indicador de modo */}
            <div className="mt-4 p-3 rounded-lg bg-gray-800 border-l-4 border-primary">
              <div className="text-sm">
                <div className="font-semibold text-primary mb-1">
                  {mode === 'firebase' ? '🔥 Modo Firebase Activo' : '💾 Modo localStorage Activo'}
                </div>
                <div className="text-gray-400">
                  {mode === 'firebase' 
                    ? 'Datos sincronizados en la nube con Firebase Firestore'
                    : 'Datos almacenados localmente en el navegador'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManager;