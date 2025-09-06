import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-2/5">
            <div className="relative animate-subtle-pulse">
              <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg blur opacity-60"></div>
              <img
                src="/524200705_1545546396814758_7884327807306567601_n.jpg" // ✅ FOTO ESPECÍFICA DEL ARTISTA: Fresh Richie
                alt="Musician Fresh Richie"
                className="artist-image relative shadow-2xl"
                width={500}
                height={600}
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/5">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">The Artist</h2>
            <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
              <p>
                Soy Fresh Richie, un artista mexicano 🇲🇽 que explora las profundidades del amor y la soledad en la era digital. Con influencias de trap oscuro, reggaetón y una lírica introspectiva, mi música busca sanar tanto como romper.
              </p>
              <p>
                Inspirado por artistas como Kendrick Lamar, Bad Bunny, Travis Scott y Kanye West, mi voz captura los altibajos de la vida y el amor verdadero. Siempre en un LIMINAL SPACE, navego entre mundos, sin pertenecer completamente a ninguno.
              </p>
              <p>
                Mi música es un reflejo de esa búsqueda constante, entre el amor, el dolor y la sanación, en un lugar donde los límites se desvanecen. Con 58 oyentes mensuales en Spotify, cada canción es una pieza de mi historia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
