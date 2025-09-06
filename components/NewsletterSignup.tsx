
import React from 'react';

const NewsletterSignup: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here.
    alert('Thank you for subscribing!');
  };

  return (
    <div className="text-center">
      <h3 className="font-semibold text-white mb-2">Join the Mailing List</h3>
      <p className="text-slate-400 text-sm mb-4">Get exclusive updates, new music, and tour news.</p>
      <form onSubmit={handleSubmit} className="flex max-w-sm mx-auto">
        <label htmlFor="email-address" className="sr-only">Email address</label>
        <input
          type="email"
          name="email-address"
          id="email-address"
          autoComplete="email"
          required
          className="flex-auto min-w-0 appearance-none rounded-l-md border-0 bg-white/5 px-3 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-emerald-500 text-slate-900 font-bold py-2 px-4 rounded-r-md hover:bg-emerald-400 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
