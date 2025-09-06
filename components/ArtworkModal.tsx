import React, { useState, useCallback } from 'react';
import type { Track } from '../types';
import { generateSongStory } from '../services/geminiService';

interface MusicModalProps {
  track: Track;
  onClose: () => void;
}

const MusicModal: React.FC<MusicModalProps> = ({ track, onClose }) => {
  const [story, setStory] = useState<string>('');
  const [isLoadingStory, setIsLoadingStory] = useState<boolean>(false);
  const [storyError, setStoryError] = useState<string>('');

  const handleGetStory = useCallback(async () => {
    setIsLoadingStory(true);
    setStoryError('');
    setStory('');
    try {
      const result = await generateSongStory(track.title, track.description);
      setStory(result);
    } catch (error) {
      setStoryError('Failed to generate story. Please try again.');
      console.error(error);
    } finally {
      setIsLoadingStory(false);
    }
  }, [track.title, track.description]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={track.youtubeUrl + "?autoplay=1"}
            title={`YouTube video player for ${track.title}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex-grow">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">{track.title}</h2>
            <p className="text-emerald-400 font-semibold mb-4">{track.releaseType}, {track.year}</p>
            <p className="text-slate-300 leading-relaxed">{track.description}</p>
            
            <div className="mt-6">
              <button
                onClick={handleGetStory}
                disabled={isLoadingStory}
                className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isLoadingStory ? 'Interpreting...' : 'Get AI Story Behind The Song'}
              </button>
            </div>

            {isLoadingStory && <div className="text-center mt-4 text-slate-400">The AI is listening...</div>}
            {storyError && <div className="text-red-400 mt-4">{storyError}</div>}
            {story && (
              <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <h4 className="font-bold text-emerald-300 mb-2">An Interpretation</h4>
                <p className="text-slate-300 italic">"{story}"</p>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-300"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicModal;
