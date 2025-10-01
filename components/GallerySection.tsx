import React from 'react';
import OptimizedImage from './OptimizedImage';

const GallerySection: React.FC = () => {
  const images = [
    '/imagen portada.jpg',
    '/imagen_2.jpg',
    '/imagen_3.jpg',
    '/imagen_4.jpg',
  ];

  return (
    <section id="gallery" className="pt-24 pb-20 bg-black min-h-[70vh] border-t-4 border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-wider text-primary">
          Galería
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          Momentos capturados en el estudio y en el escenario.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 animate-fade-in-up">
          {images.map((src, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <OptimizedImage 
                src={src} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;