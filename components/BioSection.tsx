import React from 'react';

const BioSection: React.FC = () => {
  return (
    <section id="bio" className="py-20 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3 w-full animate-fade-in-up">
            <img 
              src="./images/imagen_3.jpg" 
              alt="Fresh Richie"
              className="rounded-lg shadow-2xl object-cover w-full h-full"
            />
          </div>
          <div className="lg:w-2/3 w-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-wider text-primary">
              Biografía
            </h2>
            <div className="mt-6 space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Con una energía que electriza y un sonido que rompe barreras, Fresh Richie se está posicionando como una de las voces más prometedoras del género urbano latino. Nacido para hacer vibrar al público, su música es una celebración de la vida, las fiestas y las historias que se viven en la noche.
              </p>
              <p>
                Desde sus inicios, Fresh Richie ha fusionado los ritmos contagiosos del reggaetón con influencias de trap y dembow, creando un estilo único y auténtico. Sus letras, cargadas de carisma y honestidad, conectan directamente con una audiencia joven que busca himnos para sus mejores momentos.
              </p>
              <p>
                Cada canción es un viaje, cada video una experiencia visual impactante. Prepárate para unirte al movimiento de un artista que no solo hace música, sino que crea una atmósfera de fiesta y libertad sin fin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;