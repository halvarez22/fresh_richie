import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import MusicSection from './components/MusicSection';
import VideoSection from './components/VideoSection';
import BioSection from './components/BioSection';
import GallerySection from './components/GallerySection';
import NewsletterSection from './components/NewsletterSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <main>
        <Header />
        <MusicSection />
        <VideoSection />
        <BioSection />
        <GallerySection />
        <NewsletterSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;