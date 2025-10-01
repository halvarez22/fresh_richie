import React, { useState, useEffect } from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { useScrollNavigation } from './src/hooks/useScrollNavigation';
import urlHashManager from './src/utils/urlHashManager';
import Navbar from './components/Navbar';
import Header from './components/Header';
import MusicSection from './components/MusicSection';
import VideoSection from './components/VideoSection';
import BioSection from './components/BioSection';
import GallerySection from './components/GallerySection';
import NewsletterSection from './components/NewsletterSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import EventsPage from './components/EventsPage';
import NewsPage from './components/NewsPage';
import DebugPanel from './components/DebugPanel';


const App: React.FC = () => {
  console.log('🏗️ App.tsx: Component rendering with enhanced navigation');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'events' | 'news'>('home');
  
  // Use enhanced scroll navigation
  const { navigateToSection } = useScrollNavigation();
  
  console.log('🏗️ App.tsx: Initial state - isAdminMode:', isAdminMode, 'currentPage:', currentPage);

  // CRITICAL: Force scroll to top immediately on component mount
  useEffect(() => {
    console.log('🏠 App.tsx: CRITICAL - Forcing immediate scroll to top on mount');
    window.scrollTo(0, 0);
    // Also clear any hash that might interfere
    if (window.location.hash && !['#music', '#videos', '#bio', '#gallery', '#newsletter', '#contact'].includes(window.location.hash)) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []); // Run immediately on mount

  const handleAdminModeChange = (isAdmin: boolean) => {
    console.log('👤 App.tsx: handleAdminModeChange called with:', isAdmin);
    setIsAdminMode(isAdmin);
    console.log('👤 App.tsx: isAdminMode changed to:', isAdmin);
  };

  // Monitorear cambios en currentPage
  useEffect(() => {
    console.log('🔍 App.tsx: useEffect triggered - currentPage changed to:', currentPage);
  }, [currentPage]);

  // Monitorear cambios en isAdminMode
  useEffect(() => {
    console.log('🔍 App.tsx: useEffect triggered - isAdminMode changed to:', isAdminMode);
  }, [isAdminMode]);

  // Handle initial page load - ALWAYS start at top
  useEffect(() => {
    console.log('🏠 App.tsx: Initial page load - ensuring we start at the top');
    
    // ALWAYS scroll to top on initial load, regardless of hash
    window.scrollTo(0, 0);
    console.log('🏠 App.tsx: Forced scroll to top on initial load');
    
    // Only after ensuring we're at top, handle hash navigation if present
    const hash = window.location.hash.substring(1);
    if (hash && ['music', 'videos', 'bio', 'gallery', 'newsletter', 'contact'].includes(hash)) {
      console.log('🚀 App.tsx: Found valid hash on load, will navigate after delay:', hash);
      // Longer delay to ensure page is fully loaded and positioned at top first
      setTimeout(() => {
        console.log('🚀 App.tsx: Now navigating to hash section:', hash);
        navigateToSection(hash);
      }, 500); // Increased delay to ensure proper initialization
    }
  }, []); // Empty dependency array - run only once on mount

  // Handle browser navigation (back/forward buttons) - separate effect
  useEffect(() => {
    console.log('🔙 App.tsx: Setting up browser navigation handling');
    
    const cleanup = urlHashManager.handleBrowserNavigation((hash) => {
      console.log('🔙 App.tsx: Browser navigation to hash:', hash);
      if (hash) {
        // Navigate to home first if not already there
        if (currentPage !== 'home') {
          setCurrentPage('home');
          setTimeout(() => {
            navigateToSection(hash);
          }, 200);
        } else {
          navigateToSection(hash);
        }
      } else {
        // No hash, go to home and scroll to top
        if (currentPage !== 'home') {
          setCurrentPage('home');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    return cleanup;
  }, [navigateToSection, currentPage]);

  const navigateTo = (page: 'home' | 'events' | 'news') => {
    console.log('🚀 App.tsx: navigateTo called with page:', page);
    console.log('🚀 App.tsx: currentPage before change:', currentPage);
    console.log('🚀 App.tsx: calling setCurrentPage with:', page);
    setCurrentPage(page);
    console.log('🚀 App.tsx: setCurrentPage called, waiting for state update...');
    
    // If navigating to home, ensure we scroll to top
    if (page === 'home') {
      console.log('🏠 App.tsx: Navigating to home - will scroll to top');
      setTimeout(() => {
        window.scrollTo(0, 0);
        console.log('🏠 App.tsx: Forced scroll to top for home navigation');
      }, 100);
    }
    
    // Usar setTimeout para ver el estado después de que React lo actualice
    setTimeout(() => {
      console.log('🚀 App.tsx: currentPage after setTimeout:', currentPage);
    }, 0);
    // Actualizar URL sin recargar la página
    const url = page === 'home' ? '/' : `/${page}`;
    console.log('🚀 App.tsx: updating URL to:', url);
    window.history.pushState({}, '', url);
    console.log('🚀 App.tsx: URL updated, history state:', window.history.state);
  };

  const renderCurrentPage = () => {
    console.log('🔄 App.tsx: renderCurrentPage called, currentPage:', currentPage);
    switch (currentPage) {
      case 'events':
        console.log('🔄 App.tsx: Rendering EventsPage');
        return <EventsPage onNavigate={navigateTo} />;
      case 'news':
        console.log('🔄 App.tsx: Rendering NewsPage');
        return <NewsPage onNavigate={navigateTo} />;
      default:
        console.log('🔄 App.tsx: Rendering HomePage');
        return (
          <>
            <Header onAdminModeChange={handleAdminModeChange} />
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
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="bg-black">
        {/* Solo mostrar Navbar cuando NO estemos en modo administrativo */}
        {!isAdminMode && (() => {
          console.log('🧭 App.tsx: Rendering Navbar, isAdminMode:', isAdminMode, 'currentPage:', currentPage);
          return <Navbar onNavigate={navigateTo} />;
        })()}
        <main>
          {renderCurrentPage()}
        </main>
        {/* Solo mostrar Footer cuando NO estemos en modo administrativo */}
        {!isAdminMode && (currentPage === 'home' || currentPage === 'events' || currentPage === 'news') && <Footer />}
        <DebugPanel />
      </div>
    </AuthProvider>
  );
};

export default App;