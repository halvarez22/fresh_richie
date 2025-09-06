
import React from 'react';
import type { NewsPost } from '../types';

interface NewsProps {
    posts: NewsPost[];
}

const News: React.FC<NewsProps> = ({ posts }) => {
  return (
    <section id="news" className="py-20 sm:py-28 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Latest News</h2>
          <p className="text-lg text-slate-400 mt-2">Updates from the studio, the road, and more.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="bg-slate-800/50 rounded-lg overflow-hidden shadow-lg flex flex-col group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
            >
              <div className="overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-emerald-400 mb-2">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <h3 className="text-xl font-bold text-white mb-3 flex-grow">{post.title}</h3>
                <p className="text-slate-300 mb-4">{post.excerpt}</p>
                <a href="#" className="font-semibold text-emerald-400 hover:text-emerald-300 self-start">Read More &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
