import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Globe, Link, BookOpen, ChevronUp } from 'lucide-react';

const quotes = [
  "Poetry is the search for syllables to shoot at the barriers of the unknown and the unknowable.",
  "Poetry is not a turning loose of emotion, but an escape from emotion.",
  "To write a poem is to break the silence of the universe in a way that matters.",
  "Poetry is thoughts that breathe, and words that burn.",
  "Words are, of course, the most powerful drug used by mankind."
];

export default function Footer() {
  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Globe size={18} />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <Link size={18} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail size={18} />, url: 'mailto:vishalwriterofficial@gmail.com', label: 'Email' },
    { icon: <BookOpen size={18} />, url: 'https://medium.com', label: 'Substack' }
  ];

  return (
    <footer className="w-full bg-ink-deep border-t border-white/5 py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative subtle background circle */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 relative z-10">
        
        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-gold hover:border-gold/30 hover:-translate-y-1 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} />
        </button>

        {/* Poetic Quote */}
        <div className="text-center max-w-2xl px-4">
          <p className="font-serif italic text-lg md:text-xl text-slate-300 leading-relaxed">
            "{quote}"
          </p>
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold mt-3 block">
            — Vishal Soami
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 my-2">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold hover:border-gold/30 hover:scale-110 transition-all duration-300"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Navigation & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-white/5 pt-8 text-xs text-slate-500 font-sans tracking-wider gap-4">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="hover:text-slate-300 transition-colors">Home</NavLink>
            <NavLink to="/poetry" className="hover:text-slate-300 transition-colors">Poetry</NavLink>
            <NavLink to="/contact" className="hover:text-slate-300 transition-colors">Contact</NavLink>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Vishal Soami. All rights reserved. Made with dev-poetry.
          </div>
        </div>

      </div>
    </footer>
  );
}
