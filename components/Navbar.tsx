import React, { useState, useEffect } from 'react';
import { useScrollNavigation } from '../src/hooks/useScrollNavigation';

interface NavbarProps {
  onNavigate?: (page: 'home' | 'events' | 'news') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use the enhanced scroll navigation hook
  const { navigateToSection, navigateToPage, isScrolling } = useScrollNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (href: string) => {
    console.log('🖱️ Navbar: Enhanced navigation called with href:', href);
    
    // Close mobile menu immediately when navigation starts
    if (isMenuOpen) {
      setIsMenuOpen(false);
      console.log('📱 Navbar: Mobile menu closed');
    }
    
    if (href.startsWith('/')) {
      // Handle page navigation (events, news, home)
      const page = href === '/events' ? 'events' : href === '/news' ? 'news' : 'home';
      console.log('🖱️ Navbar: Navigating to page:', page);
      navigateToPage(page, onNavigate);
    } else {
      // Handle section navigation (anchors)
      const sectionId = href.substring(1); // Remove the #
      console.log('🖱️ Navbar: Navigating to section:', sectionId);
      
      // First ensure we're on the home page, then navigate to section
      if (onNavigate) {
        console.log('🖱️ Navbar: Ensuring we are on home page first');
        navigateToPage('home', onNavigate);
        // Small delay to ensure page navigation completes before section navigation
        setTimeout(() => {
          console.log('🖱️ Navbar: Now navigating to section after delay:', sectionId);
          navigateToSection(sectionId);
        }, 200); // Increased delay slightly for better reliability
      } else {
        // Direct section navigation if no page navigation needed
        console.log('🖱️ Navbar: Direct section navigation (no page change needed)');
        navigateToSection(sectionId);
      }
    }
  };

  const navLinks = [
    { href: '#music', label: 'Música' },
    { href: '#videos', label: 'Videos' },
    { href: '#bio', label: 'Biografía' },
    { href: '#gallery', label: 'Galería' },
    { href: '/events', label: 'Eventos' },
    { href: '/news', label: 'Noticias' },
    { href: '#newsletter', label: 'Únete al\nMovimiento', multiline: true },
    { href: '#contact', label: 'Contacto' },
  ];

  console.log('🧭 Navbar: Rendering enhanced navbar, isScrolled:', isScrolled, 'isScrolling:', isScrolling);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a 
              href="#" 
              onClick={(e) => {
                console.log('🏠 Navbar: Fresh Richie logo clicked');
                e.preventDefault();
                navigateToPage('home', onNavigate);
              }}
              className="text-3xl font-anton tracking-wider text-white uppercase transition-colors hover:text-primary-light"
            >
              Fresh Richie
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    console.log('🖱️ Navbar link clicked:', link.label, 'href:', link.href);
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                  className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest transition-colors duration-300"
                >
                  {link.multiline ? (
                    <span className="text-center leading-tight">
                      {link.label.split('\n').map((line, index) => (
                        <span key={index} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  ) : (
                    link.label
                  )}
                </a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  console.log('📱 Mobile navbar link clicked:', link.label, 'href:', link.href);
                  e.preventDefault();
                  handleNavigation(link.href);
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium uppercase tracking-widest transition-colors duration-300"
              >
                {link.multiline ? (
                  <span className="text-center leading-tight">
                    {link.label.split('\n').map((line, index) => (
                      <span key={index} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                ) : (
                  link.label
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;