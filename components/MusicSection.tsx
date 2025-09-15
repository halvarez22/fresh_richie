import React from 'react';
import { AppleMusicIcon } from './icons/AppleMusicIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import OptimizedImage from './OptimizedImage';

const MusicSection: React.FC = () => {
  const streamingLinks = [
    {
      name: 'Apple Music',
      url: 'https://music.apple.com/mx/artist/fresh-richie/1649396663',
      icon: <AppleMusicIcon className="w-8 h-8" />,
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/intl-es/artist/7sbL1QUMiVmBUCDeLvhmtV',
      icon: <SpotifyIcon className="w-8 h-8" />,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UC0PTxtms1tiYRPnt0AQfLMQ',
      icon: <YouTubeIcon className="w-8 h-8" />,
    },
  ];

  return (
    <section id="music" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-wider text-primary">
          Música
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          Escucha mi nuevo sencillo "Ya No Somos Nada" en tu plataforma favorita.
        </p>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-12 animate-fade-in-up">
          <div className="flex-shrink-0">
            <OptimizedImage 
              src="/imagen_2.jpg" 
              alt="Ya No Somos Nada Album Art" 
              className="w-80 h-80 rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105 object-cover" 
            />
          </div>
          <div className="flex flex-col items-center md:items-start gap-6">
            <h3 className="text-3xl font-bold">Ya No Somos Nada</h3>
            <p className="text-xl text-gray-300">Fresh Richie</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {streamingLinks.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gray-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-primary"
                  aria-label={`Listen on ${platform.name}`}
                >
                  {platform.icon}
                  <span>{platform.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;