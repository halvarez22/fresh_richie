import React from 'react';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';
import { PinterestIcon } from './icons/PinterestIcon';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'YouTube', url: 'https://www.youtube.com/channel/UC0PTxtms1tiYRPnt0AQfLMQ', icon: <YouTubeIcon className="w-6 h-6" /> },
    { name: 'Instagram', url: 'https://www.instagram.com/freshrichie.vhs/', icon: <InstagramIcon className="w-6 h-6" /> },
    { name: 'TikTok', url: 'https://www.tiktok.com/@ricardoslameahhside', icon: <TikTokIcon className="w-6 h-6" /> },
    { name: 'Spotify', url: 'https://open.spotify.com/intl-es/artist/7sbL1QUMiVmBUCDeLvhmtV', icon: <SpotifyIcon className="w-6 h-6" /> },
    { name: 'Pinterest', url: 'https://mx.pinterest.com/raap1015/fresh-richie-type-shit/', icon: <PinterestIcon className="w-6 h-6" /> },
  ];

  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          {socialLinks.map((item) => (
            <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-500">
          &copy; {new Date().getFullYear()} Fresh Richie. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;