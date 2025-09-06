
import React from 'react';
import XIcon from './icons/XIcon';
import InstagramIcon from './icons/InstagramIcon';
import MailIcon from './icons/MailIcon';

const SocialLinks: React.FC = () => {
  const socialMedia = [
    {
      name: 'X (Twitter)',
      href: 'https://twitter.com/freshrichie',
      icon: <XIcon />,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/freshrichie',
      icon: <InstagramIcon />,
    },
    {
      name: 'Email',
      href: 'mailto:contact@freshrichie.art',
      icon: <MailIcon />,
    },
  ];

  return (
    <>
      {socialMedia.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow on ${social.name}`}
          className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
        >
          {social.icon}
        </a>
      ))}
    </>
  );
};

export default SocialLinks;
