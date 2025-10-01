import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db, COLLECTION_NAME } from '../config/firebase';
import { ContentData } from '../types/content';

class FirebaseService {
  private docRef = doc(db, COLLECTION_NAME, 'main');

  // Cargar contenido desde Firebase
  async loadContent(): Promise<ContentData | null> {
    try {
      console.log('🔥 FirebaseService: Loading content from Firestore...');
      const startTime = performance.now();
      
      const docSnap = await getDoc(this.docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as ContentData;
        const loadTime = performance.now() - startTime;
        
        console.log(`✅ FirebaseService: Content loaded in ${loadTime.toFixed(2)}ms`, {
          hasVideos: !!data.videos,
          videosLength: data.videos?.videos?.length || 0,
          hasEvents: !!data.events,
          eventsLength: data.events?.length || 0,
          lastUpdated: data.lastUpdated
        });
        
        return data;
      } else {
        console.log('📄 FirebaseService: No document found, will create default');
        return null;
      }
    } catch (error) {
      console.error('❌ FirebaseService: Error loading content:', error);
      throw error;
    }
  }

  // Guardar contenido completo en Firebase
  async saveContent(content: ContentData): Promise<boolean> {
    try {
      console.log('🔥 FirebaseService: Saving content to Firestore...');
      const startTime = performance.now();
      
      const contentWithTimestamp = {
        ...content,
        lastUpdated: serverTimestamp(),
        version: Date.now() // Para control de versiones
      };
      
      await setDoc(this.docRef, contentWithTimestamp);
      
      const saveTime = performance.now() - startTime;
      console.log(`✅ FirebaseService: Content saved in ${saveTime.toFixed(2)}ms`);
      
      return true;
    } catch (error) {
      console.error('❌ FirebaseService: Error saving content:', error);
      return false;
    }
  }

  // Actualizar sección específica
  async updateSection(section: keyof ContentData, data: any): Promise<boolean> {
    try {
      console.log(`🔥 FirebaseService: Updating section "${section}"...`);
      const startTime = performance.now();
      
      const updateData = {
        [section]: data,
        lastUpdated: serverTimestamp(),
        [`${section}UpdatedAt`]: serverTimestamp()
      };
      
      await updateDoc(this.docRef, updateData);
      
      const updateTime = performance.now() - startTime;
      console.log(`✅ FirebaseService: Section "${section}" updated in ${updateTime.toFixed(2)}ms`);
      
      return true;
    } catch (error) {
      console.error(`❌ FirebaseService: Error updating section "${section}":`, error);
      return false;
    }
  }

  // Escuchar cambios en tiempo real
  subscribeToChanges(callback: (content: ContentData) => void): () => void {
    console.log('🔥 FirebaseService: Setting up real-time listener...');
    
    const unsubscribe = onSnapshot(this.docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as ContentData;
        console.log('🔄 FirebaseService: Real-time update received');
        callback(data);
      }
    }, (error) => {
      console.error('❌ FirebaseService: Real-time listener error:', error);
    });

    return unsubscribe;
  }

  // Crear documento inicial con datos por defecto
  async initializeDefaultContent(): Promise<ContentData> {
    console.log('🔥 FirebaseService: Creating default content...');
    
    const defaultContent: ContentData = {
      header: {
        tagline: "La Nueva Era del Urbano Latino"
      },
      videos: {
        videos: []
      },
      events: [],
      news: [],
      gallery: {
        images: [
          '/imagen portada.jpg',
          '/imagen_2.jpg', 
          '/imagen_3.jpg',
          '/imagen_4.jpg'
        ]
      },
      bio: {
        content: "Con una energía que electriza y un sonido que rompe barreras, Fresh Richie se está posicionando como una de las voces más prometedoras del género urbano latino."
      },
      lastUpdated: serverTimestamp(),
      version: Date.now()
    };

    await this.saveContent(defaultContent);
    console.log('✅ FirebaseService: Default content created');
    
    return defaultContent;
  }

  // Verificar conexión con Firebase
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔥 FirebaseService: Testing connection...');
      await getDoc(this.docRef);
      console.log('✅ FirebaseService: Connection successful');
      return true;
    } catch (error) {
      console.error('❌ FirebaseService: Connection failed:', error);
      return false;
    }
  }

  // Crear backup manual
  async createBackup(): Promise<string | null> {
    try {
      const content = await this.loadContent();
      if (!content) return null;
      
      const backup = {
        ...content,
        backupCreatedAt: new Date().toISOString(),
        backupVersion: Date.now()
      };
      
      return JSON.stringify(backup, null, 2);
    } catch (error) {
      console.error('❌ FirebaseService: Error creating backup:', error);
      return null;
    }
  }
}

// Exportar instancia singleton
export const firebaseService = new FirebaseService();
export default firebaseService;