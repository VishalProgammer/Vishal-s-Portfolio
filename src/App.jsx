import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import Home from './pages/Home';
import VideoEditing from './pages/VideoEditing';
import Voiceover from './pages/Voiceover';
import Poetry from './pages/Poetry';
import Contact from './pages/Contact';

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
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteConfig, setQuoteConfig] = useState({ service: null, customRate: null });

  const handleOpenQuote = (customRate = null, service = null) => {
    setQuoteConfig({ service, customRate });
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setQuoteConfig({ service: null, customRate: null });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070A0F] text-slate-100 font-sans selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      <ScrollToTop />
      
      {/* Sticky Header Nav with Quote Action */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content Area with Page Transitions */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home onOpenQuote={handleOpenQuote} />} />
            <Route path="/video-editing" element={<VideoEditing onOpenQuote={handleOpenQuote} />} />
            <Route path="/voiceover" element={<Voiceover onOpenQuote={handleOpenQuote} />} />
            <Route path="/poetry" element={<Poetry onOpenQuote={handleOpenQuote} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onOpenQuote={() => handleOpenQuote()} />

      {/* Global Interactive Quote Modal with Custom Rate & Service Pre-fill */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={handleCloseQuote} 
        preselectedService={quoteConfig.service} 
        initialCustomRate={quoteConfig.customRate} 
      />
    </div>
  );
}
