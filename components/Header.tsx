import React from 'react';
import OptimizedImage from './OptimizedImage';

const Header: React.FC = () => {
  return (
    <header className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/imagen portada.jpg')" }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="relative z-10 p-5 text-white animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-anton uppercase tracking-widest text-shadow-lg">
          Fresh Richie
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-semibold tracking-wider uppercase text-gray-300">
          La Nueva Era del Urbano Latino
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#music"
            className="inline-block bg-primary hover:bg-primary-light text-white font-bold tracking-widest uppercase py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Escucha Ahora
          </a>
          <a
            href="#contact"
            className="inline-block border-2 border-primary hover:bg-primary text-white font-bold tracking-widest uppercase py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Contacto
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;