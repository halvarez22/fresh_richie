import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class ImageUploadService {
  /**
   * Sube una imagen a Firebase Storage
   * @param file - Archivo de imagen a subir
   * @param path - Ruta donde guardar la imagen (ej: 'events/', 'gallery/', etc.)
   * @returns Promise con el resultado de la subida
   */
  static async uploadImage(file: File, path: string = 'images/'): Promise<UploadResult> {
    try {
      // Validar el archivo
      if (!file.type.startsWith('image/')) {
        return {
          success: false,
          error: 'El archivo debe ser una imagen'
        };
      }

      // Validar tamaño (5MB máximo)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return {
          success: false,
          error: 'La imagen es demasiado grande. Máximo 5MB'
        };
      }

      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}_${randomId}.${fileExtension}`;
      
      // Crear referencia en Storage
      const imageRef = ref(storage, `${path}${fileName}`);
      
      // Subir el archivo
      const snapshot = await uploadBytes(imageRef, file);
      
      // Obtener URL de descarga
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        success: true,
        url: downloadURL
      };
      
    } catch (error) {
      console.error('Error uploading image:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido al subir la imagen'
      };
    }
  }

  /**
   * Elimina una imagen de Firebase Storage
   * @param imageUrl - URL de la imagen a eliminar
   * @returns Promise con el resultado de la eliminación
   */
  static async deleteImage(imageUrl: string): Promise<UploadResult> {
    try {
      // Extraer la ruta del archivo desde la URL
      const url = new URL(imageUrl);
      const pathMatch = url.pathname.match(/\/o\/(.+)\?/);
      
      if (!pathMatch) {
        return {
          success: false,
          error: 'URL de imagen inválida'
        };
      }
      
      const filePath = decodeURIComponent(pathMatch[1]);
      const imageRef = ref(storage, filePath);
      
      await deleteObject(imageRef);
      
      return {
        success: true
      };
      
    } catch (error) {
      console.error('Error deleting image:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido al eliminar la imagen'
      };
    }
  }

  /**
   * Valida si una URL es de Firebase Storage
   * @param url - URL a validar
   * @returns true si es una URL de Firebase Storage
   */
  static isFirebaseUrl(url: string): boolean {
    return url.includes('firebasestorage.googleapis.com') || url.includes('firebase');
  }

  /**
   * Convierte una imagen a base64 (para casos donde Firebase no esté disponible)
   * @param file - Archivo de imagen
   * @returns Promise con el base64 de la imagen
   */
  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
