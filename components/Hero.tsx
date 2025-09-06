import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="h-screen flex items-center justify-center relative bg-cover bg-top bg-no-repeat" style={{ backgroundImage: "url('/483939531_18378690256116843_3987826781693523548_n.jpg')" }}> {/* ✅ FOTO PRINCIPAL FRESH RICHIE: Cara del artista visible */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative text-center text-white px-6 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-serif font-black mb-4 tracking-tight">
          Sounds from the Soul
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-300">
          Independent singer-songwriter crafting stories into songs. Written, produced, and promoted from the heart.
        </p>
        <a href="#music" className="mt-8 inline-block bg-emerald-500 text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105">
          Listen Now
        </a>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a href="#music" aria-label="Scroll to music section">
          <svg className="w-6 h-6 text-white animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
