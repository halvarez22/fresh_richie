import React from 'react';
import OptimizedImage from './OptimizedImage';

const BioSection: React.FC = () => {
  return (
    <section id="bio" className="pt-24 pb-20 bg-secondary min-h-[70vh] border-t-4 border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal con fondo y bordes */}
        <div className="bg-gray-900/80 rounded-3xl p-5 lg:p-8 border border-gray-700 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-8">
            {/* Imagen */}
            <div className="lg:w-2/5 w-full animate-fade-in-up">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <OptimizedImage 
                  src="/imagen_3.jpg" 
                  alt="Fresh Richie"
                  className="w-full h-64 lg:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            {/* Contenido de texto */}
            <div className="lg:w-3/5 w-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-anton uppercase tracking-wider text-primary leading-tight">
                  Biografía
                </h2>
                
                <div className="space-y-3 text-gray-300 text-base leading-relaxed">
                  <p className="text-justify">
                    Con una energía que electriza y un sonido que rompe barreras, Fresh Richie se está posicionando como una de las voces más prometedoras del género urbano latino. Nacido para hacer vibrar al público, su música es una celebración de la vida, las fiestas y las historias que se viven en la noche.
                  </p>
                  <p className="text-justify">
                    Desde sus inicios, Fresh Richie ha fusionado los ritmos contagiosos del reggaetón con influencias de trap y dembow, creando un estilo único y auténtico. Sus letras, cargadas de carisma y honestidad, conectan directamente con una audiencia joven que busca himnos para sus mejores momentos.
                  </p>
                  <p className="text-justify">
                    Cada canción es un viaje, cada video una experiencia visual impactante. Prepárate para unirte al movimiento de un artista que no solo hace música, sino que crea una atmósfera de fiesta y libertad sin fin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;