import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, X, Heart, Eye, PenTool, CheckCircle2, BookOpen, Feather } from 'lucide-react';
import { poems } from '../data/poems';
import GlobalCTA from '../components/GlobalCTA';

const categories = ['All', 'Fantasies', 'Celebrations', 'Sad', 'Love'];

export default function Poetry({ onOpenQuote }) {
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
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-16">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <Feather size={13} />
          <span>The Written Anthology</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl text-slate-100 font-semibold mb-4"
        >
          Words From The Deep & Beyond
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
        >
          Poetry, reflective verse, and narrative prose. Explore the anthology or commission bespoke poetry crafted for personal milestones, wedding vows, spoken word, and brand storytelling.
        </motion.p>
      </div>

      {/* Category Filter Bar */}
      <div className="sticky top-20 z-40 bg-[#070A0F]/90 backdrop-blur-md py-4 border-b border-white/5 mb-12 flex justify-center">
        <div className="flex items-center gap-1.5 md:gap-3 flex-wrap justify-center bg-slate-900/60 p-1.5 rounded-full border border-white/10 shadow-lg">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                activeCategory === category 
                  ? 'text-ink-dark font-bold' 
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
      >
        <AnimatePresence mode="popLayout">
          {filteredPoems.map((poem, index) => (
            <motion.div
              layout
              key={poem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => setSelectedPoem(poem)}
              className="glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5 group cursor-pointer h-[290px] border border-white/10 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded bg-white/5 text-gold border border-gold/20 font-semibold">
                    {poem.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Clock size={11} />
                    <span>{poem.readTime}</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-slate-100 group-hover:text-gold transition-colors duration-300 font-semibold mb-3">
                  {poem.title}
                </h3>
                
                <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed font-serif italic">
                  "{poem.snippet}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">{poem.date}</span>
                <span className="flex items-center gap-1 text-xs uppercase tracking-widest text-gold font-bold group-hover:text-gold-light transition-colors">
                  <Eye size={13} />
                  <span>Read Full Poem</span>
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPoems.length === 0 && (
        <div className="text-center py-20 mb-20">
          <p className="text-slate-400 font-serif italic text-lg">
            "Silence rests where words have yet to blossom."
          </p>
          <span className="text-xs text-slate-500 block mt-2">No poems found in this category.</span>
        </div>
      )}

      {/* Bespoke Writing & Poetry Commissions Section */}
      <section className="mb-24 p-8 md:p-14 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-3">
              <PenTool size={14} />
              <span>Custom Commissions & Commercial Copy</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-100 font-semibold mb-4 leading-tight">
              Commission Bespoke Words for Your Story
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
              Looking for tailored verses that capture an intimate moment, a wedding ceremony, or an evocative poetic campaign for your brand? I craft custom literature tailored specifically to your emotional nuances and creative vision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 mb-8">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span>Wedding Vows & Anniversary Poetry</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span>Brand Manifestos & Spoken Word Ads</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span>Short Stories & Video Scripting</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span>Combined Video + VO + Poem Packages</span>
              </div>
            </div>

            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="px-8 py-3.5 rounded-full bg-gold text-ink-dark hover:bg-gold-light hover:scale-105 transition-all duration-300 font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-gold/20 cursor-pointer"
            >
              <span>Commission a Bespoke Piece</span>
              <Sparkles size={14} />
            </button>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm p-8 rounded-2xl bg-slate-900/90 border border-gold/30 shadow-2xl relative">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-2">Excerpt From Vishal</div>
              <p className="font-serif italic text-lg text-slate-200 leading-relaxed mb-4">
                "Years of hardship, patience and pain,<br/>
                Those quiet nights and loud rains.<br/>
                That all has been easy with the love you give,<br/>
                If you are with me it’s easier to live."
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
                <span>— From 'This Wedding Day'</span>
                <Heart size={14} className="text-gold" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Distraction-Free Reading Modal */}
      <AnimatePresence>
        {selectedPoem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030508]/90 backdrop-blur-md"
            onClick={() => setSelectedPoem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B0F17] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col relative shadow-2xl"
            >
              {/* Gold Accent Top Bar */}
              <div className="h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light w-full" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedPoem(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10 cursor-pointer"
                aria-label="Close poem"
              >
                <X size={16} />
              </button>

              {/* Scrollable Contents */}
              <div className="flex-grow overflow-y-auto custom-scrollbar p-8 md:p-12">
                
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-slate-400 font-sans tracking-wide mb-6">
                  <span className="px-3 py-1 rounded bg-gold/15 text-gold border border-gold/30 uppercase tracking-widest text-[10px] font-bold">
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
                <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-bold mb-8">
                  {selectedPoem.title}
                </h2>

                {/* Poem Text Body */}
                <div className="poetry-font text-lg md:text-xl text-slate-200 leading-loose tracking-wide whitespace-pre-line border-l-2 border-gold/40 pl-6 md:pl-8 py-2 max-w-prose">
                  {selectedPoem.content}
                </div>

              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/10 bg-[#070A0F] py-4 px-8 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={() => {
                    setSelectedPoem(null);
                    if (onOpenQuote) onOpenQuote();
                  }}
                  className="inline-flex items-center gap-1.5 text-gold hover:text-gold-light font-bold uppercase tracking-wider text-[11px]"
                >
                  <Sparkles size={12} />
                  <span>Inquire for Similar Writing</span>
                </button>
                <span>© Vishal Soami</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Global CTA */}
      <GlobalCTA 
        onOpenQuote={onOpenQuote}
        title="Need an Unforgettable Poem or Script?"
        subtitle="Bring your sentiments to life. Commission custom literature for weddings, books, or brand campaigns."
      />

    </div>
  );
}
