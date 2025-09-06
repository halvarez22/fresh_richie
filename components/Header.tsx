
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '#music', label: 'Music' },
    { href: '#videos', label: 'Videos' },
    { href: '#shows', label: 'Shows' },
    { href: '#news', label: 'News' },
    { href: '#store', label: 'Store' },
    { href: '#about', label: 'About' },
    { href: '#epk', label: 'Press Kit' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMenuOpen ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold text-white tracking-wider">
          Fresh Richie
        </a>
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>
      {isMenuOpen && (
          <nav className="md:hidden bg-slate-900/95 pb-4">
              <ul className="flex flex-col items-center space-y-4">
                  {navLinks.map((link) => (
                      <li key={link.href}>
                          <a href={link.href} onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium tracking-wide text-lg">
                              {link.label}
                          </a>
                      </li>
                  ))}
              </ul>
          </nav>
      )}
    </header>
  );
};

export default Header;