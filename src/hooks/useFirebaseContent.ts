import { useState, useEffect, useCallback } from 'react';
import { ContentData } from '../types/content';
import { firebaseService } from '../services/firebaseService';

export const useFirebaseContent = () => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  // Cargar contenido inicial
  const loadContent = useCallback(async () => {
    console.log('🔄 useFirebaseContent: Starting content load...');
    const startTime = performance.now();
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Verificar conexión primero
      const isConnected = await firebaseService.testConnection();
      setIsOnline(isConnected);
      
      if (!isConnected) {
        // Fallback a localStorage si Firebase no está disponible
        console.log('⚠️ useFirebaseContent: Firebase offline, using localStorage fallback');
        const savedContent = localStorage.getItem('fresh-richie-content');
        if (savedContent) {
          const data: ContentData = JSON.parse(savedContent);
          setContent(data);
          const loadTime = performance.now() - startTime;
          console.log(`✅ useFirebaseContent: Fallback content loaded in ${loadTime.toFixed(2)}ms`);
          return;
        }
      }
      
      // Cargar desde Firebase
      let data = await firebaseService.loadContent();
      
      // Si no hay datos en Firebase, crear contenido por defecto
      if (!data) {
        console.log('📄 useFirebaseContent: No content found, creating default...');
        data = await firebaseService.initializeDefaultContent();
      }
      
      setContent(data);
      
      // Guardar copia en localStorage como backup
      localStorage.setItem('fresh-richie-content', JSON.stringify(data));
      
      const totalTime = performance.now() - startTime;
      console.log(`✅ useFirebaseContent: Content loaded successfully in ${totalTime.toFixed(2)}ms`);
      
    } catch (err) {
      const errorTime = performance.now() - startTime;
      console.error(`❌ useFirebaseContent: Error after ${errorTime.toFixed(2)}ms:`, err);
      
      // Intentar cargar desde localStorage como último recurso
      try {
        const savedContent = localStorage.getItem('fresh-richie-content');
        if (savedContent) {
          const data: ContentData = JSON.parse(savedContent);
          setContent(data);
          setError('Usando datos locales - Firebase no disponible');
          console.log('🔄 useFirebaseContent: Loaded from localStorage backup');
        } else {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } catch (backupError) {
        setError('Error al cargar contenido');
        console.error('❌ useFirebaseContent: Backup load failed:', backupError);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Actualizar contenido completo
  const updateContent = useCallback(async (newContent: ContentData): Promise<boolean> => {
    const startTime = performance.now();
    try {
      console.log('💾 useFirebaseContent: Saving content...', {
        hasVideos: !!newContent.videos,
        videosLength: newContent.videos?.videos?.length || 0,
        hasEvents: !!newContent.events,
        eventsLength: newContent.events?.length || 0
      });
      
      // Validar contenido
      if (!newContent || typeof newContent !== 'object') {
        throw new Error('Contenido inválido para guardar');
      }
      
      // Guardar en Firebase
      const success = await firebaseService.saveContent(newContent);
      
      if (success) {
        // Actualizar estado local
        setContent(newContent);
        
        // Guardar backup en localStorage
        localStorage.setItem('fresh-richie-content', JSON.stringify(newContent));
        
        const saveTime = performance.now() - startTime;
        console.log(`✅ useFirebaseContent: Content saved successfully in ${saveTime.toFixed(2)}ms`);
        
        setError(null);
        return true;
      } else {
        throw new Error('Error al guardar en Firebase');
      }
      
    } catch (err) {
      const errorTime = performance.now() - startTime;
      console.error(`❌ useFirebaseContent: Save failed after ${errorTime.toFixed(2)}ms:`, err);
      
      // Guardar solo en localStorage como fallback
      try {
        localStorage.setItem('fresh-richie-content', JSON.stringify(newContent));
        setContent(newContent);
        setError('Guardado localmente - Firebase no disponible');
        console.log('🔄 useFirebaseContent: Saved to localStorage as fallback');
        return true;
      } catch (localError) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido al guardar';
        setError(errorMessage);
        return false;
      }
    }
  }, []);

  // Guardar sección específica
  const saveContent = useCallback(async (section: keyof ContentData, data: any): Promise<boolean> => {
    console.log(`💾 useFirebaseContent: Saving section "${section}"...`);
    
    if (!content) {
      console.error('❌ useFirebaseContent: No content available to update');
      return false;
    }
    
    try {
      // Validar datos específicos por sección
      if (section === 'videos' && data) {
        if (!data.videos || !Array.isArray(data.videos)) {
          console.error('❌ useFirebaseContent: Invalid videos data structure');
          return false;
        }
        console.log(`📹 useFirebaseContent: Saving ${data.videos.length} videos`);
      }
      
      // Actualizar sección en Firebase
      const success = await firebaseService.updateSection(section, data);
      
      if (success) {
        // Actualizar estado local
        const updatedContent = {
          ...content,
          [section]: data
        };
        setContent(updatedContent);
        
        // Actualizar localStorage
        localStorage.setItem('fresh-richie-content', JSON.stringify(updatedContent));
        
        console.log(`✅ useFirebaseContent: Section "${section}" saved successfully`);
        setError(null);
        return true;
      } else {
        throw new Error(`Error al guardar sección ${section} en Firebase`);
      }
      
    } catch (err) {
      console.error(`❌ useFirebaseContent: Error saving section "${section}":`, err);
      
      // Fallback a localStorage
      try {
        const updatedContent = {
          ...content,
          [section]: data
        };
        setContent(updatedContent);
        localStorage.setItem('fresh-richie-content', JSON.stringify(updatedContent));
        setError(`Sección ${section} guardada localmente - Firebase no disponible`);
        return true;
      } catch (localError) {
        setError(`Error al guardar sección ${section}`);
        return false;
      }
    }
  }, [content]);

  // Configurar listener en tiempo real
  useEffect(() => {
    if (!content) return;
    
    console.log('🔄 useFirebaseContent: Setting up real-time listener...');
    
    const unsubscribe = firebaseService.subscribeToChanges((updatedContent) => {
      console.log('🔄 useFirebaseContent: Real-time update received');
      setContent(updatedContent);
      localStorage.setItem('fresh-richie-content', JSON.stringify(updatedContent));
    });
    
    return () => {
      console.log('🔄 useFirebaseContent: Cleaning up real-time listener');
      unsubscribe();
    };
  }, [content]);

  // Cargar contenido al montar el componente
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Funciones de utilidad
  const exportData = useCallback(async (): Promise<boolean> => {
    try {
      const backupData = await firebaseService.createBackup();
      if (!backupData) return false;
      
      const dataBlob = new Blob([backupData], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fresh-richie-firebase-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('📤 useFirebaseContent: Data exported successfully');
      return true;
    } catch (err) {
      console.error('❌ useFirebaseContent: Export failed:', err);
      return false;
    }
  }, []);

  const verifyDataIntegrity = useCallback((): { isValid: boolean; reason: string } => {
    try {
      if (!content) return { isValid: false, reason: 'No data available' };
      
      // Verificaciones básicas
      if (!content || typeof content !== 'object') {
        return { isValid: false, reason: 'Invalid data structure' };
      }
      
      // Verificar estructura de videos si existe
      if (content.videos && (!content.videos.videos || !Array.isArray(content.videos.videos))) {
        return { isValid: false, reason: 'Invalid videos structure' };
      }
      
      console.log('✅ useFirebaseContent: Data integrity check passed');
      return { isValid: true, reason: 'Data is valid' };
    } catch (err) {
      console.error('❌ useFirebaseContent: Data integrity check failed:', err);
      return { isValid: false, reason: 'Integrity check error' };
    }
  }, [content]);

  return {
    content,
    isLoading,
    error,
    isOnline,
    loadContent,
    updateContent,
    saveContent,
    exportData,
    verifyDataIntegrity
  };
};