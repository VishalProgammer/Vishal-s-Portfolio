import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, X, Heart, Eye } from 'lucide-react';
import { poems } from '../data/poems';

const categories = ['All', 'Fantasies', 'Celebrations', 'Sad', 'Love'];

export default function Poetry() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPoem, setSelectedPoem] = useState(null);

  // Filter poems based on active category
  const filteredPoems = activeCategory === 'All' 
    ? poems 
    : poems.filter(poem => poem.category === activeCategory);

  // Scroll lock for body when modal is open
  useEffect(() => {
    if (selectedPoem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPoem]);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-16">
      
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest mb-3 font-medium">
          <Sparkles size={14} />
          <span>The Anthology</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-slate-100 font-medium mb-4">
          Words from the Deep
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Filter through different states of mind, dreams, and reflections. 
          Click on any poem card to open a quiet, distraction-free reading experience.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="sticky top-20 z-40 bg-ink-dark/85 backdrop-blur-md py-4 border-b border-white/5 mb-12 flex justify-center">
        <div className="flex items-center gap-1 md:gap-3 flex-wrap justify-center bg-slate-900/60 p-1.5 rounded-full border border-white/5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-widest font-sans font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'text-ink-dark font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 bg-gold rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Poems Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPoems.map((poem) => (
            <motion.div
              layout
              key={poem.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedPoem(poem)}
              className="glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 group cursor-pointer h-[280px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                    {poem.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <Clock size={10} />
                    <span>{poem.readTime}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl text-slate-100 group-hover:text-gold transition-colors duration-300 font-medium mb-3">
                  {poem.title}
                </h3>
                
                <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed font-serif italic">
                  "{poem.snippet}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">{poem.date}</span>
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gold font-medium group-hover:text-gold-light transition-colors">
                  <Eye size={12} />
                  <span>Open Text</span>
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPoems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-slate-500 font-serif italic text-lg">
            "Silence rests where words have yet to blossom."
          </p>
          <span className="text-xs text-slate-600 block mt-2">No poems found in this category.</span>
        </motion.div>
      )}

      {/* Distraction-Free Reading Modal */}
      <AnimatePresence>
        {selectedPoem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/90 backdrop-blur-md"
            onClick={() => setSelectedPoem(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col relative shadow-2xl"
            >
              {/* Gold Accent Top Bar */}
              <div className="h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light w-full" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedPoem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
                aria-label="Close poem"
              >
                <X size={16} />
              </button>

              {/* Scrollable Contents */}
              <div className="flex-grow overflow-y-auto custom-scrollbar p-8 md:p-12">
                
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-slate-400 font-sans tracking-wide mb-6">
                  <span className="px-2.5 py-0.5 rounded bg-gold/10 text-gold border border-gold/20 uppercase tracking-widest text-[10px]">
                    {selectedPoem.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-500" />
                    <span>{selectedPoem.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-slate-500" />
                    <span>{selectedPoem.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-semibold mb-8">
                  {selectedPoem.title}
                </h2>

                {/* Poem Text Body */}
                <div className="poetry-font text-lg md:text-xl text-slate-200 leading-loose tracking-wide whitespace-pre-line border-l border-gold/30 pl-6 md:pl-8 py-2 max-w-prose">
                  {selectedPoem.content}
                </div>

              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/5 bg-ink-dark/50 py-5 px-8 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1 select-none">
                  <Heart size={14} className="text-gold" />
                  <span>Inspired by the elements</span>
                </div>
                <span>© Vishal Soami</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
