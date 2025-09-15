import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <section id="videos" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-wider text-primary">
          Videos
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          Mira los videos oficiales y contenido exclusivo.
        </p>
        <div className="mt-12 animate-fade-in-up">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl border-4 border-primary/50">
            <iframe
              src="https://www.youtube.com/embed/QBHW1Hxy4uI"
              title="Fresh Richie - YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
        <a
          href="https://www.youtube.com/channel/UC0PTxtms1tiYRPnt0AQfLMQ"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block border-2 border-primary hover:bg-primary text-white font-bold tracking-widest uppercase py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Ver más en YouTube
        </a>
      </div>
    </section>
  );
};

export default VideoSection;