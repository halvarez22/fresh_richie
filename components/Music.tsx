import React, { useState, useMemo } from 'react';
import type { Track } from '../types';

interface MusicProps {
  tracks: Track[];
  onTrackClick: (track: Track) => void;
}

const Music: React.FC<MusicProps> = ({ tracks, onTrackClick }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const releaseTypes = useMemo(() => {
    const uniqueTypes = new Set(tracks.map((t) => t.releaseType));
    return ['All', ...Array.from(uniqueTypes)];
  }, [tracks]);

  const filteredTracks = useMemo(() => {
    if (activeFilter === 'All') {
      return tracks;
    }
    return tracks.filter((track) => track.releaseType === activeFilter);
  }, [tracks, activeFilter]);

  return (
    <section id="music" className="py-20 sm:py-28 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Music</h2>
          <p className="text-lg text-slate-400 mt-2">My latest releases. Click to listen.</p>
        </div>

        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-12 animate-fade-in-up">
          {releaseTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              aria-pressed={activeFilter === type}
              className={`px-5 py-2 text-sm sm:text-base rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${
                activeFilter === type
                  ? 'bg-emerald-500 text-slate-900 shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredTracks.map((track, index) => (
            <div
              key={track.id}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer animate-fade-in-up aspect-square"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              onClick={() => onTrackClick(track)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && onTrackClick(track)}
            >
              <img
                src={track.coverArtUrl}
                alt={track.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                width={500}
                height={500}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">{track.title}</h3>
                <p className="text-emerald-300 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out" style={{transitionDelay: '50ms'}}>{track.releaseType}</p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTracks.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <p className="text-slate-400 text-lg">No music found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Music;