import { useState, useEffect } from 'react';
import { ContentData } from '../types/content';
import { useFirebaseContent } from './useFirebaseContent';

// Hook híbrido que usa Firebase cuando está disponible, localStorage como fallback
export const useHybridContent = () => {
  const [useFirebase, setUseFirebase] = useState(false);
  
  // Detectar si Firebase está configurado
  useEffect(() => {
    const firebaseEnabled = import.meta.env.VITE_USE_FIREBASE === 'true' && 
                           import.meta.env.VITE_FIREBASE_PROJECT_ID;
    setUseFirebase(firebaseEnabled);
    
    console.log('🔄 useHybridContent: Firebase mode:', firebaseEnabled ? 'enabled' : 'disabled');
  }, []);

  // Hook de Firebase
  const firebaseHook = useFirebaseContent();
  
  // Hook de localStorage (el original)
  const [content, setContent] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!useFirebase) {
      loadLocalContent();
    }
  }, [useFirebase]);

  const loadLocalContent = async () => {
    console.log('🔄 useHybridContent: Loading from localStorage...');
    const startTime = performance.now();
    
    try {
      setIsLoading(true);
      
      // Primero intentar cargar desde localStorage (cambios guardados)
      const savedContent = localStorage.getItem('fresh-richie-content');
      if (savedContent) {
        console.log('📦 useHybridContent: Found saved content in localStorage');
        try {
          const data: ContentData = JSON.parse(savedContent);
          console.log('📦 useHybridContent: Successfully parsed localStorage content:', {
            hasVideos: !!data.videos,
            videosLength: data.videos?.videos?.length || 0,
            hasEvents: !!data.events,
            eventsLength: data.events?.length || 0
          });
          setContent(data);
          setError(null);
          setIsLoading(false);
          const loadTime = performance.now() - startTime;
          console.log(`✅ useHybridContent: Content loaded from localStorage in ${loadTime.toFixed(2)}ms`);
          return;
        } catch (parseError) {
          console.error('❌ useHybridContent: Error parsing localStorage content:', parseError);
          localStorage.removeItem('fresh-richie-content');
        }
      }
      
      // Si no hay contenido guardado, cargar desde el archivo JSON
      console.log('🌐 useHybridContent: Fetching content from /content.json...');
      const fetchStartTime = performance.now();
      
      const response = await fetch('/content.json', {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      const fetchTime = performance.now() - fetchStartTime;
      console.log(`🌐 useHybridContent: Fetch completed in ${fetchTime.toFixed(2)}ms, status: ${response.status}`);
      
      if (!response.ok) {
        throw new Error(`Error al cargar el contenido: ${response.status} ${response.statusText}`);
      }
      
      const parseStartTime = performance.now();
      const data: ContentData = await response.json();
      const parseTime = performance.now() - parseStartTime;
      
      console.log(`📄 useHybridContent: JSON parsed in ${parseTime.toFixed(2)}ms`, {
        hasVideos: !!data.videos,
        videosLength: data.videos?.videos?.length || 0,
        hasEvents: !!data.events,
        eventsLength: data.events?.length || 0
      });
      
      setContent(data);
      setError(null);
      
      const totalTime = performance.now() - startTime;
      console.log(`✅ useHybridContent: Total content load completed in ${totalTime.toFixed(2)}ms`);
      
    } catch (err) {
      const errorTime = performance.now() - startTime;
      console.error(`❌ useHybridContent: Error after ${errorTime.toFixed(2)}ms:`, err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
      const finalTime = performance.now() - startTime;
      console.log(`🏁 useHybridContent: Hook completed in ${finalTime.toFixed(2)}ms`);
    }
  };

  const updateLocalContent = async (newContent: ContentData) => {
    const startTime = performance.now();
    try {
      console.log('💾 useHybridContent: Saving content to localStorage:', {
        hasVideos: !!newContent.videos,
        videosLength: newContent.videos?.videos?.length || 0,
        hasEvents: !!newContent.events,
        eventsLength: newContent.events?.length || 0
      });
      
      if (!newContent || typeof newContent !== 'object') {
        throw new Error('Contenido inválido para guardar');
      }
      
      const currentContent = localStorage.getItem('fresh-richie-content');
      if (currentContent) {
        localStorage.setItem('fresh-richie-content-backup', currentContent);
        console.log('📦 useHybridContent: Backup created successfully');
      }
      
      setContent(newContent);
      
      const contentString = JSON.stringify(newContent);
      localStorage.setItem('fresh-richie-content', contentString);
      
      const savedContent = localStorage.getItem('fresh-richie-content');
      if (!savedContent || savedContent !== contentString) {
        throw new Error('Error de verificación: el contenido no se guardó correctamente');
      }
      
      const saveTime = performance.now() - startTime;
      console.log(`✅ useHybridContent: Content saved successfully in ${saveTime.toFixed(2)}ms`);
      console.log('💾 useHybridContent: Saved content size:', Math.round(contentString.length / 1024), 'KB');
      
      setError(null);
      return true;
    } catch (err) {
      const errorTime = performance.now() - startTime;
      console.error(`❌ useHybridContent: Save failed after ${errorTime.toFixed(2)}ms:`, err);
      
      const backup = localStorage.getItem('fresh-richie-content-backup');
      if (backup) {
        try {
          const backupData = JSON.parse(backup);
          setContent(backupData);
          localStorage.setItem('fresh-richie-content', backup);
          console.log('🔄 useHybridContent: Restored from backup successfully');
        } catch (backupError) {
          console.error('❌ useHybridContent: Backup restoration failed:', backupError);
        }
      }
      
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al guardar';
      setError(errorMessage);
      return false;
    }
  };

  const saveLocalContent = async (section: keyof ContentData, data: any) => {
    console.log(`💾 useHybridContent: Saving section "${section}" with data:`, {
      dataType: typeof data,
      isArray: Array.isArray(data),
      hasVideos: data?.videos?.length || 0,
      hasEvents: data?.length || 0
    });
    
    if (!content) {
      console.error('❌ useHybridContent: No content available to update');
      return false;
    }
    
    try {
      if (section === 'videos' && data) {
        if (!data.videos || !Array.isArray(data.videos)) {
          console.error('❌ useHybridContent: Invalid videos data structure');
          return false;
        }
        console.log(`📹 useHybridContent: Saving ${data.videos.length} videos`);
      }
      
      const updatedContent = {
        ...content,
        [section]: data
      };
      
      const success = await updateLocalContent(updatedContent);
      
      if (success) {
        console.log(`✅ useHybridContent: Section "${section}" saved successfully`);
      } else {
        console.error(`❌ useHybridContent: Failed to save section "${section}"`);
      }
      
      return success;
    } catch (err) {
      console.error(`❌ useHybridContent: Error saving section "${section}":`, err);
      return false;
    }
  };

  // Funciones de utilidad para localStorage
  const verifyLocalDataIntegrity = () => {
    try {
      const savedContent = localStorage.getItem('fresh-richie-content');
      if (!savedContent) return { isValid: false, reason: 'No data found' };
      
      const data = JSON.parse(savedContent);
      
      if (!data || typeof data !== 'object') {
        return { isValid: false, reason: 'Invalid data structure' };
      }
      
      if (data.videos && (!data.videos.videos || !Array.isArray(data.videos.videos))) {
        return { isValid: false, reason: 'Invalid videos structure' };
      }
      
      console.log('✅ useHybridContent: Data integrity check passed');
      return { isValid: true, reason: 'Data is valid' };
    } catch (err) {
      console.error('❌ useHybridContent: Data integrity check failed:', err);
      return { isValid: false, reason: 'Parse error' };
    }
  };
  
  const clearLocalCorruptedData = () => {
    try {
      localStorage.removeItem('fresh-richie-content');
      localStorage.removeItem('fresh-richie-content-backup');
      console.log('🧹 useHybridContent: Corrupted data cleared');
      return true;
    } catch (err) {
      console.error('❌ useHybridContent: Failed to clear corrupted data:', err);
      return false;
    }
  };
  
  const exportLocalData = () => {
    try {
      if (!content) return null;
      
      const dataBlob = new Blob([JSON.stringify(content, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fresh-richie-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('📤 useHybridContent: Data exported successfully');
      return true;
    } catch (err) {
      console.error('❌ useHybridContent: Export failed:', err);
      return false;
    }
  };

  // Retornar el hook apropiado según la configuración
  if (useFirebase) {
    console.log('🔥 useHybridContent: Using Firebase mode');
    return {
      ...firebaseHook,
      mode: 'firebase' as const
    };
  } else {
    console.log('💾 useHybridContent: Using localStorage mode');
    return {
      content,
      isLoading,
      error,
      isOnline: true, // localStorage siempre está "online"
      loadContent: loadLocalContent,
      updateContent: updateLocalContent,
      saveContent: saveLocalContent,
      exportData: exportLocalData,
      verifyDataIntegrity: verifyLocalDataIntegrity,
      clearCorruptedData: clearLocalCorruptedData,
      mode: 'localStorage' as const
    };
  }
};

// Alias para mantener compatibilidad
export const useContent = useHybridContent;