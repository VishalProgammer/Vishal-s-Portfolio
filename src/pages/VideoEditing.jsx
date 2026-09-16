import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Play, Sparkles, Filter, ExternalLink, Clock, Layers, 
  CheckCircle2, Film, Zap, Music, Sliders, X, MessageCircle 
} from 'lucide-react';
import { fetchSampleLinks, fallbackData } from '../utils/linksParser';
import GlobalCTA from '../components/GlobalCTA';

const videoCategories = ['All', 'Commercial Ads', 'Podcasts', 'Explainer Reels', 'Vlogs'];

export default function VideoEditing({ onOpenQuote }) {
  const [videos, setVideos] = useState(fallbackData.videoEdits);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSampleLinks();
        if (data && data.videoEdits && data.videoEdits.length > 0) {
          setVideos(data.videoEdits);
        }
      } catch (err) {
        console.error('Failed to load video links:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter videos based on category
  const filteredVideos = activeCategory === 'All'
    ? videos
    : videos.filter((v) => v.category === activeCategory);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <Video size={13} />
          <span>High-Retention Video Editing</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl text-slate-100 font-semibold mb-5 leading-tight"
        >
          Visuals That Stop The Scroll & Convert
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
        >
          Specialized in high-energy vertical reels, YouTube shorts, commercial advertisements, and explainer videos. Engineered with sharp pacing, sound design, and psychological hooks to maximize engagement.
        </motion.p>

        {/* Quick Metrics Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5"
        >
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xl font-bold text-gold">9:16 & 16:9</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Custom Formats</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xl font-bold text-gold">24-48h</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Turnaround Time</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xl font-bold text-gold">4K / 60fps</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Export Quality</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xl font-bold text-gold">100%</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Custom SFX & Subs</div>
          </div>
        </motion.div>
      </div>

      {/* Category Filter Bar */}
      <div className="sticky top-20 z-40 bg-[#070A0F]/90 backdrop-blur-md py-4 border-b border-white/5 mb-12 flex justify-center">
        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap justify-center bg-slate-900/60 p-1.5 rounded-full border border-white/10 shadow-lg">
          {videoCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'text-ink-dark font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeVideoCategoryIndicator"
                  className="absolute inset-0 bg-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Video Portfolio Grid (9:16 Shorts Responsive Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id || idx}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-300 group flex flex-col justify-between shadow-xl"
            >
              {/* 9:16 Responsive Player Card */}
              <div className="relative aspect-[9/16] w-full bg-black/80 overflow-hidden">
                {video.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1&controls=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover border-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <Film size={32} className="text-gold mb-3 animate-pulse" />
                    <span className="text-xs text-slate-400">Loading Preview...</span>
                  </div>
                )}

                {/* Category Badge overlay */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-gold text-[10px] uppercase font-bold tracking-widest border border-gold/30">
                    {video.category}
                  </span>
                </div>

                {/* Expand / Direct Link overlay button */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveModalVideo(video)}
                    className="p-2 rounded-full bg-black/70 backdrop-blur-md text-slate-200 hover:text-gold transition-colors border border-white/10"
                    title="Open Cinema View"
                  >
                    <Zap size={13} />
                  </button>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-black/70 backdrop-blur-md text-slate-200 hover:text-gold transition-colors border border-white/10"
                    title="Open on YouTube"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Video Info Details */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-lg text-slate-100 font-semibold group-hover:text-gold transition-colors mb-2 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4 font-sans">
                    {video.description}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {video.tags?.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenQuote && onOpenQuote()}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-gold hover:text-ink-dark text-slate-300 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 hover:border-gold cursor-pointer"
                  >
                    <span>Inquire About Style</span>
                    <Sparkles size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Editing Toolkit & Creative Capabilities */}
      <section className="mb-24 p-8 md:p-12 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-2">
            <Sliders size={14} />
            <span>Editing Suite & Workflow</span>
          </div>
          <h2 className="font-serif text-2xl md:text-4xl text-slate-100 font-semibold mb-3">
            Industry-Standard Creative Infrastructure
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Every cut is engineered using leading post-production software and calibrated for peak retention, clean typography, and acoustic presence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 border border-gold/20">
              <Zap size={20} />
            </div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide mb-1.5">
              Hook Optimization
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              First 3-second retention hooks, frame zooms, and kinetic visuals to reduce viewer drop-off.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 border border-gold/20">
              <Music size={20} />
            </div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide mb-1.5">
              Multi-Layered SFX
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom swooshes, risers, hits, ambient layering, and rhythmic audio cuts tuned to beat drops.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 border border-gold/20">
              <Layers size={20} />
            </div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide mb-1.5">
              Kinetic Subtitles
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamic animated word-by-word captions with custom fonts, emoji integration, and emphasis colors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 border border-gold/20">
              <Film size={20} />
            </div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide mb-1.5">
              Cinema Grade
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Color balancing, film LUT profiles, skin tone optimization, and high-bitrate export.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing / Packages Guide */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-2">
            <Sparkles size={14} />
            <span>Transparent Pricing Tiers</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-semibold mb-3">
            Video Production Packages
          </h2>
          <p className="text-slate-400 text-sm">
            Tailored rates for creators, brands, and agency pipelines in both INR (₹) and USD ($).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tier 1 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                Single Reel / Ad Cut
              </div>
              <div className="text-3xl font-serif text-slate-100 font-bold mb-1">
                $45 <span className="text-sm font-sans text-slate-400 font-normal">/ ₹2,999</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">Ideal for quick promotions, product reels, or standalone shorts.</p>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Up to 60 seconds vertical cut (9:16)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Dynamic animated subtitles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Sound design & SFX mix</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>24-Hour delivery available</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="w-full py-3 rounded-full border border-white/20 hover:border-gold hover:text-gold text-slate-200 text-xs uppercase tracking-widest font-bold transition-all"
            >
              Order Single Cut
            </button>
          </div>

          {/* Tier 2 (Featured) */}
          <div className="glass-panel p-8 rounded-2xl border-2 border-gold relative flex flex-col justify-between shadow-2xl shadow-gold/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-ink-dark text-[10px] font-bold uppercase tracking-widest shadow-md">
              Most Popular
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-gold font-bold mb-2 mt-2">
                Creator Growth Bundle
              </div>
              <div className="text-3xl font-serif text-slate-100 font-bold mb-1">
                $290 <span className="text-sm font-sans text-slate-400 font-normal">/ ₹19,999</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">8 high-retention reels per month with dedicated visual branding.</p>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>8 Premium Reels / Shorts per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Viral Hook consulting & re-edits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Custom motion graphics & b-roll curation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Dedicated Slack / WhatsApp channel</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="w-full py-3 rounded-full bg-gold text-ink-dark hover:bg-gold-light text-xs uppercase tracking-widest font-bold transition-all shadow-lg shadow-gold/20"
            >
              Book Growth Pack
            </button>
          </div>

          {/* Tier 3 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                Agency / Brand Retainer
              </div>
              <div className="text-3xl font-serif text-slate-100 font-bold mb-1">
                Custom <span className="text-sm font-sans text-slate-400 font-normal">Scope</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">High volume ad creatives, podcast series, and full video pipelines.</p>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Unlimited revision cycles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Multi-platform exports (9:16, 16:9, 1:1)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Combined Voiceover + Video integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-gold shrink-0" />
                  <span>Dedicated weekly sprint delivery</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="w-full py-3 rounded-full border border-white/20 hover:border-gold hover:text-gold text-slate-200 text-xs uppercase tracking-widest font-bold transition-all"
            >
              Discuss Agency Retainer
            </button>
          </div>
        </div>
      </section>

      {/* Cinema Modal View */}
      <AnimatePresence>
        {activeModalVideo && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={() => setActiveModalVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/5 bg-[#070A0F]">
                <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {activeModalVideo.title}
                </div>
                <button
                  onClick={() => setActiveModalVideo(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="aspect-[9/16] w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeModalVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeModalVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-4 bg-[#070A0F] border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{activeModalVideo.category}</span>
                <button
                  onClick={() => {
                    setActiveModalVideo(null);
                    if (onOpenQuote) onOpenQuote();
                  }}
                  className="px-4 py-1.5 rounded-full bg-gold text-ink-dark font-bold text-[11px] uppercase tracking-wider hover:bg-gold-light"
                >
                  Inquire Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Global CTA */}
      <GlobalCTA 
        onOpenQuote={onOpenQuote}
        title="Have Raw Footage? Let’s Turn It Into High-Performing Content."
        subtitle="Share your raw clips or creative brief. Get an edited sample or complete package turnaround within 48 hours."
      />

    </div>
  );
}
