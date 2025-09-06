
import React, { useState, useMemo } from 'react';
import type { Show } from '../types';

interface ShowsProps {
  shows: Show[];
}

const Shows: React.FC<ShowsProps> = ({ shows }) => {
  const [showPast, setShowPast] = useState(false);

  const { upcomingShows, pastShows } = useMemo(() => {
    const upcoming = shows.filter((s) => s.status !== 'Past').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const past = shows.filter((s) => s.status === 'Past').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { upcomingShows: upcoming, pastShows: past };
  }, [shows]);

  const showsToDisplay = showPast ? pastShows : upcomingShows;

  return (
    <section id="shows" className="py-20 sm:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Shows</h2>
          <p className="text-lg text-slate-400 mt-2">Catch me live in your city.</p>
        </div>

        <div className="flex justify-center border-b border-slate-700 mb-8">
            <button onClick={() => setShowPast(false)} className={`px-6 py-3 font-semibold transition-colors duration-300 ${!showPast ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400'}`}>Upcoming</button>
            <button onClick={() => setShowPast(true)} className={`px-6 py-3 font-semibold transition-colors duration-300 ${showPast ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400'}`}>Past</button>
        </div>

        <div className="max-w-4xl mx-auto">
            {showsToDisplay.length > 0 ? (
                <ul className="space-y-4">
                    {showsToDisplay.map((show) => (
                        <li key={show.id} className="flex flex-col sm:flex-row items-center justify-between bg-slate-800/50 p-4 rounded-lg transition-shadow hover:shadow-xl animate-fade-in-up">
                            <div className="text-center sm:text-left mb-4 sm:mb-0">
                                <p className="text-lg font-bold text-white">{new Date(show.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                <p className="text-slate-300">{show.venue} - {show.city}</p>
                            </div>
                            <div>
                                {show.status === 'On Sale' && show.ticketLink && (
                                    <a href={show.ticketLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-500 text-slate-900 font-bold py-2 px-6 rounded-full hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105">
                                        Tickets
                                    </a>
                                )}
                                {show.status === 'Sold Out' && (
                                    <span className="inline-block bg-red-500 text-white font-bold py-2 px-6 rounded-full cursor-not-allowed">
                                        Sold Out
                                    </span>
                                )}
                                 {show.status === 'Past' && (
                                    <span className="inline-block bg-slate-700 text-slate-400 font-bold py-2 px-6 rounded-full cursor-not-allowed">
                                        Past Show
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-slate-400 py-8">No {showPast ? 'past' : 'upcoming'} shows scheduled right now. Check back soon!</p>
            )}
        </div>
      </div>
    </section>
  );
};

export default Shows;
