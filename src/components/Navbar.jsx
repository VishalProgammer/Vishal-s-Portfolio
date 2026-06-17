import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Feather } from 'lucide-react';

export default function Navbar() {
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
    { name: 'Poetry', path: '/poetry' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-4 glass-navbar shadow-lg shadow-black/10' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group focus:outline-none">
          <motion.div
            whileHover={{ rotate: -15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 text-gold"
          >
            <Feather size={18} />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-medium tracking-widest text-slate-100 group-hover:text-gold transition-colors duration-300">
              VISHAL SOAMI
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80 -mt-0.5">
              Writer & Poet
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `relative py-2 text-sm tracking-widest uppercase font-sans font-medium transition-colors duration-300 ${
                  isActive ? 'text-gold' : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <NavLink 
            to="/contact" 
            className="px-5 py-2.5 rounded-full border border-gold/40 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-ink-dark transition-all duration-300 font-medium font-sans"
          >
            Send Letter
          </NavLink>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-100 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-ink-dark/95 border-b border-white/5 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `text-base tracking-widest uppercase font-sans font-medium transition-colors py-2 border-b border-white/5 ${
                      isActive ? 'text-gold' : 'text-slate-400'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink 
                to="/contact" 
                className="w-full text-center px-5 py-3 rounded-full border border-gold/40 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-ink-dark transition-all duration-300 font-medium font-sans"
              >
                Send Letter
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
