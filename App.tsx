import React, { useState } from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import Navbar from './components/Navbar';
import Header from './components/Header';
import MusicSection from './components/MusicSection';
import VideoSection from './components/VideoSection';
import BioSection from './components/BioSection';
import GallerySection from './components/GallerySection';
import NewsletterSection from './components/NewsletterSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAdminModeChange = (isAdmin: boolean) => {
    setIsAdminMode(isAdmin);
  };

  return (
    <AuthProvider>
      <div className="bg-black">
        {/* Solo mostrar Navbar cuando NO estemos en modo administrativo */}
        {!isAdminMode && <Navbar />}
        <main>
          <Header onAdminModeChange={handleAdminModeChange} />
          {/* Solo mostrar secciones cuando NO estemos en modo administrativo */}
          {!isAdminMode && (
            <>
              <MusicSection />
              <VideoSection />
              <BioSection />
              <GallerySection />
              <NewsletterSection />
              <ContactForm />
            </>
          )}
        </main>
        {/* Solo mostrar Footer cuando NO estemos en modo administrativo */}
        {!isAdminMode && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;