
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Music from './components/Music';
import Shows from './components/Shows';
import News from './components/News';
import Store from './components/Store';
import About from './components/About';
import EPK from './components/EPK';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MusicModal from './components/MusicModal';
import VideoSection from './components/VideoSection';
import { TRACKS, SHOWS, NEWS_POSTS } from './constants';
import type { Track } from './types';

const App: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleOpenModal = useCallback((track: Track) => {
    setSelectedTrack(track);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTrack(null);
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Music tracks={TRACKS} onTrackClick={handleOpenModal} />
        <VideoSection />
        <Shows shows={SHOWS} />
        <News posts={NEWS_POSTS} />
        <Store />
        <About />
        <EPK />
        <Contact />
      </main>
      <Footer />
      {selectedTrack && (
        <MusicModal track={selectedTrack} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;