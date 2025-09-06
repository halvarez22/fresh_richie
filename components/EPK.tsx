
import React from 'react';

const EPK: React.FC = () => {
  return (
    <section id="epk" className="py-20 sm:py-28 bg-slate-950">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Press Kit</h2>
          <p className="text-lg text-slate-400 mt-2">For press, promoters, and booking inquiries.</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-10">
                
                <div>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-4 border-b-2 border-emerald-400/30 pb-2">Short Bio</h3>
                    <p className="text-slate-300 leading-relaxed">
                        Fresh Richie is an independent singer-songwriter who crafts stories into songs. Handling everything from writing and production to promotion, his music is an authentic expression of his creative vision. His sound blends heartfelt lyrics with modern production, creating a sound that is both intimate and expansive.
                    </p>
                </div>
                
                <div>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-4 border-b-2 border-emerald-400/30 pb-2">Key Links</h3>
                    <ul className="space-y-3">
                        <li><a href="#music" className="text-slate-300 hover:text-white transition-colors">Listen on Spotify</a></li>
                        <li><a href="#music" className="text-slate-300 hover:text-white transition-colors">Watch on YouTube</a></li>
                        <li><a href="https://instagram.com/freshrichie" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">Follow on Instagram</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-4 border-b-2 border-emerald-400/30 pb-2">Hi-Res Photos</h3>
                    <p className="text-slate-300 mb-4">Download a .zip file of high-resolution promotional photos for media use.</p>
                    <a href="#" className="inline-block bg-slate-700 text-white font-bold py-2 px-6 rounded-full hover:bg-slate-600 transition-colors">Download Photos (.zip)</a> {/* 🔄 REEMPLAZAR CON ENLACE REAL: URL del archivo ZIP con fotos en alta resolución */}
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-4 border-b-2 border-emerald-400/30 pb-2">Contact</h3>
                     <p className="text-slate-300">
                        <strong>Booking:</strong> <a href="mailto:booking@freshrichie.art" className="hover:text-white">booking@freshrichie.art</a>
                    </p>
                    <p className="text-slate-300">
                        <strong>Press:</strong> <a href="mailto:press@freshrichie.art" className="hover:text-white">press@freshrichie.art</a>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default EPK;
