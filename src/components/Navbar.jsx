import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Video, Mic, PenTool, Sparkles, MessageCircle } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsOpen(false);
    });
    return () => cancelAnimationFrame(handle);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Video Editing', path: '/video-editing', badge: 'Hot' },
    { name: 'Voiceovers', path: '/voiceover', badge: 'En/Hi' },
    { name: 'Poetry', path: '/poetry' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-3.5 glass-navbar shadow-2xl shadow-black/40' 
        : 'py-5 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        
        {/* Logo & Brand Identity */}
        <NavLink to="/" className="flex items-center gap-3 group focus:outline-none">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/30 text-gold shadow-lg shadow-gold/10"
          >
            <Sparkles size={18} />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-wider text-slate-100 group-hover:text-gold transition-colors duration-300">
              VISHAL SOAMI
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 -mt-0.5">
              Words • Video • Voice
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `relative py-1.5 text-xs tracking-widest uppercase font-sans font-semibold transition-colors duration-300 flex items-center gap-1.5 ${
                  isActive ? 'text-gold' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-gold/15 text-gold border border-gold/30 font-bold uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Button & Quick Quote */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenQuote}
            className="px-5 py-2 rounded-full bg-gold text-ink-dark hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-gold/20 cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Get a Quote</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#070A0F]/95 border-b border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-2 border-b border-white/5 pb-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => 
                      `flex items-center justify-between text-sm tracking-wider uppercase font-semibold py-2.5 px-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-gold/15 text-gold border border-gold/30' 
                          : 'text-slate-300 hover:bg-white/5'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onOpenQuote) onOpenQuote();
                  }}
                  className="w-full text-center px-5 py-3 rounded-xl bg-gold text-ink-dark font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
                >
                  <Sparkles size={14} />
                  <span>Get a Quote / Estimate</span>
                </button>

                <a
                  href="https://wa.me/918708042829"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-5 py-3 rounded-xl border border-emerald-500/40 text-emerald-400 font-semibold text-xs uppercase tracking-wider hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Direct Chat</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
