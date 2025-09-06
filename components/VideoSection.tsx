import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <section id="videos" className="py-20 sm:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Videos</h2>
          <p className="text-lg text-slate-400 mt-2">Watch Fresh Richie's latest videos and performances.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Video 1 */}
          <div className="bg-slate-800/50 rounded-lg overflow-hidden shadow-lg group animate-fade-in-up">
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/EN-gZPyxTQM"
                title="Fresh Richie - YA NO SOMOS NADA?"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">YA NO SOMOS NADA?</h3>
              <p className="text-slate-300">Official music video</p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="bg-slate-800/50 rounded-lg overflow-hidden shadow-lg group animate-fade-in-up">
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/OJOmz-Dn2Og"
                title="Fresh Richie - Wipe My Tears"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Wipe My Tears</h3>
              <p className="text-slate-300">Feat. Richie - Official video</p>
            </div>
          </div>

          {/* Video 3 */}
          <div className="bg-slate-800/50 rounded-lg overflow-hidden shadow-lg group animate-fade-in-up">
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/sWzIKPgyskg"
                title="Fresh Richie - Fresh Content"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Fresh Content</h3>
              <p className="text-slate-300">Latest video content</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.youtube.com/channel/UC0PTxtms1tiYRPnt0AQfLMQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          >
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
