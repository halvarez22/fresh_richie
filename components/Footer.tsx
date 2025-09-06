
import React from 'react';
import SocialLinks from './SocialLinks';
import NewsletterSignup from './NewsletterSignup';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6 text-center">
        <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:text-left">
                 <p className="text-lg font-serif font-bold text-white tracking-wider">Fresh Richie</p>
                 <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
            </div>

            <NewsletterSignup />

            <div className="md:text-right">
                <p className="font-semibold text-white mb-2">Follow Me</p>
                <div className="flex justify-center md:justify-end items-center space-x-4">
                    <SocialLinks />
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;