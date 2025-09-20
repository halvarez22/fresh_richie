import { useState, useEffect } from 'react';
import { ContentData } from '../types/content';

export const useContent = () => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      
      // Primero intentar cargar desde localStorage (cambios guardados)
      const savedContent = localStorage.getItem('fresh-richie-content');
      if (savedContent) {
        const data: ContentData = JSON.parse(savedContent);
        setContent(data);
        setError(null);
        setIsLoading(false);
        return;
      }
      
      // Si no hay contenido guardado, cargar desde el archivo JSON
      const response = await fetch('/content.json');
      if (!response.ok) {
        throw new Error('Error al cargar el contenido');
      }
      const data: ContentData = await response.json();
      setContent(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (newContent: ContentData) => {
    try {
      // En una implementación real, esto enviaría los datos a un backend
      // Por ahora, solo actualizamos el estado local
      setContent(newContent);
      
      // Simular guardado en localStorage para persistencia
      localStorage.setItem('fresh-richie-content', JSON.stringify(newContent));
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
      return false;
    }
  };

  const saveContent = async (section: keyof ContentData, data: any) => {
    if (!content) return false;
    
    const updatedContent = {
      ...content,
      [section]: data
    };
    
    return await updateContent(updatedContent);
  };

  return {
    content,
    isLoading,
    error,
    loadContent,
    updateContent,
    saveContent
  };
};
