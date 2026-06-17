import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Poetry from './pages/Poetry';
import Contact from './pages/Contact';
import { useEffect } from 'react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-ink-dark text-slate-100 font-sans selection:bg-gold/30 selection:text-gold-light">
      <ScrollToTop />
      
      {/* Sticky Header Nav */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/poetry" element={<Poetry />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
