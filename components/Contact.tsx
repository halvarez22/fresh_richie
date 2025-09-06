import React from 'react';
import SocialLinks from './SocialLinks';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Let's Connect
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
          I'm always open for collaborations, booking inquiries, or just to hear from you. Whether you're an artist, a venue, or a fan, feel free to reach out.
        </p>
        <a 
          href="mailto:contact@freshrichie.art" 
          className="inline-block bg-emerald-500 text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105 mb-12 text-lg"
        >
          Get in Touch
        </a>
        <div className="flex justify-center items-center space-x-6">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
};

export default Contact;
