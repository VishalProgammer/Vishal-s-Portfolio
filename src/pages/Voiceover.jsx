import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, Play, Pause, Sparkles, Volume2, Globe, Radio, 
  CheckCircle2, Music, ExternalLink, Headphones, Sliders, ShieldCheck, Clock 
} from 'lucide-react';
import { fetchSampleLinks, fallbackData } from '../utils/linksParser';
import GlobalCTA from '../components/GlobalCTA';

const languageFilters = ['All Samples', 'Hindi Voiceover', 'English Voiceover'];

export default function Voiceover({ onOpenQuote }) {
  const [voiceovers, setVoiceovers] = useState(fallbackData.voiceOvers);
  const [activeFilter, setActiveFilter] = useState('All Samples');
  const [activePlayer, setActivePlayer] = useState(null);
  const [wordCount, setWordCount] = useState(150);
  const [selectedUsage, setSelectedUsage] = useState('Digital Ad / Social');
  const [isCustomRateMode, setIsCustomRateMode] = useState(false);
  const [customRateInput, setCustomRateInput] = useState('');
  const [customRateCurrency, setCustomRateCurrency] = useState('USD');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSampleLinks();
        if (data && data.voiceOvers && data.voiceOvers.length > 0) {
          setVoiceovers(data.voiceOvers);
        }
      } catch (err) {
        console.error('Failed to load voiceover links:', err);
      }
    }
    loadData();
  }, []);

  // Filter based on language
  const filteredVoiceovers = voiceovers.filter((vo) => {
    if (activeFilter === 'Hindi Voiceover') return vo.language === 'Hindi';
    if (activeFilter === 'English Voiceover') return vo.language === 'English';
    return true;
  });

  // Calculate estimated reading time & price approximation
  const estimatedSeconds = Math.ceil((wordCount / 130) * 60);
  const estimatedMinutes = (estimatedSeconds / 60).toFixed(1);
  const estimatedPriceUSD = Math.max(45, Math.round(wordCount * 0.35));
  const estimatedPriceINR = Math.max(2500, Math.round(wordCount * 22));

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <Mic size={13} />
          <span>Bilingual Voice Artist (English & Hindi)</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl text-slate-100 font-semibold mb-5 leading-tight"
        >
          Resonant Vocal Presence That Moves Audiences
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
        >
          Delivering evocative, broadcast-ready voiceovers across corporate commercials, storytelling narration, character dubbing, and audiobooks. Flawlessly balanced in native Hindi and neutral global English.
        </motion.p>

        {/* Vocal Persona Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5">
            <Volume2 size={13} className="text-gold" />
            <span>Tone: Deep, Warm & Soulful</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5">
            <Globe size={13} className="text-gold" />
            <span>Accents: Native Hindi & Neutral Global English</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5">
            <Radio size={13} className="text-gold" />
            <span>Studio: Acoustically Treated Booth</span>
          </span>
        </motion.div>
      </div>

      {/* Language Filter Bar */}
      <div className="sticky top-20 z-40 bg-[#070A0F]/90 backdrop-blur-md py-4 border-b border-white/5 mb-12 flex justify-center">
        <div className="flex items-center gap-1.5 md:gap-3 flex-wrap justify-center bg-slate-900/60 p-1.5 rounded-full border border-white/10 shadow-lg">
          {languageFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? 'text-ink-dark font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeVoiceFilterIndicator"
                  className="absolute inset-0 bg-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Voiceover Samples Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
        <AnimatePresence mode="popLayout">
          {filteredVoiceovers.map((vo, idx) => {
            const isPlaying = activePlayer === vo.id;

            return (
              <motion.div
                key={vo.id || idx}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-gold/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden group"
              >
                {/* Background soft glow when playing */}
                {isPlaying && (
                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gold/15 blur-[60px] pointer-events-none" />
                )}

                <div>
                  {/* Top metadata badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                        vo.language === 'Hindi'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                      }`}
                    >
                      {vo.language} Voiceover
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-sans">
                      {vo.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-xl text-slate-100 font-semibold mb-2 group-hover:text-gold transition-colors">
                    {vo.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
                    {vo.description}
                  </p>

                  {/* Tone Pill */}
                  <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-300">
                    <Volume2 size={12} className="text-gold" />
                    <span><strong>Tone:</strong> {vo.tone}</span>
                  </div>

                  {/* Soundwave Animation & Player Bar */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Headphones size={13} className="text-gold" />
                        <span>SoundCloud Master Stem</span>
                      </div>
                      <div className="flex items-end gap-1 h-5 px-2">
                        <span className="w-1 bg-gold rounded-full wave-bar" />
                        <span className="w-1 bg-gold rounded-full wave-bar" />
                        <span className="w-1 bg-gold rounded-full wave-bar" />
                        <span className="w-1 bg-gold rounded-full wave-bar" />
                        <span className="w-1 bg-gold rounded-full wave-bar" />
                      </div>
                    </div>

                    {/* Embedded SoundCloud Widget iframe */}
                    <div className="rounded-lg overflow-hidden border border-white/5">
                      <iframe
                        width="100%"
                        height="120"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={vo.embedUrl}
                        title={vo.title}
                        className="bg-slate-950"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <a
                    href={vo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-gold transition-colors"
                  >
                    <span>Open in SoundCloud</span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    onClick={() => onOpenQuote && onOpenQuote()}
                    className="px-4 py-2 rounded-full bg-gold/15 hover:bg-gold text-gold hover:text-ink-dark font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-gold/30 hover:border-gold cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Book Voice</span>
                    <Sparkles size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Voiceover Rate Estimator & Script Calculator */}
      <section className="mb-24 p-8 md:p-12 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-2">
              <Sliders size={14} />
              <span>Instant Scope & Timing Estimator</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-semibold mb-4">
              Estimate Your Voiceover Project
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Drag the slider to your script's estimated word count. Voiceover tracks are timed around standard broadcast delivery (~130 words per minute).
            </p>

            {/* Word count slider */}
            <div className="mb-6 bg-slate-900/60 p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Script Word Count</span>
                <span className="text-lg font-bold text-gold">{wordCount} Words</span>
              </div>
              <input
                type="range"
                min="30"
                max="1000"
                step="10"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>30 words (Quick Ad)</span>
                <span>500 words (Explainer)</span>
                <span>1000 words (Audiobook / Long)</span>
              </div>
            </div>

            {/* Usage Rights selector */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">
                Intended Usage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Digital Ad / Social',
                  'Corporate Explainer',
                  'Dubbing / Character',
                  'Audiobook / Story',
                  'Podcast Intro',
                  'Broadcast TV/Radio'
                ].map((usage) => (
                  <button
                    key={usage}
                    type="button"
                    onClick={() => setSelectedUsage(usage)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                      selectedUsage === usage
                        ? 'bg-gold/15 text-gold border-gold/40'
                        : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {usage}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Output Display Card */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-gold/30 relative shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Estimated Audio Run Time</div>
                <div className="text-xl font-bold text-slate-100 flex items-center gap-1.5">
                  <Clock size={16} className="text-gold" />
                  <span>~{estimatedMinutes} min ({estimatedSeconds}s)</span>
                </div>
              </div>

              {/* Pricing Display / Custom Rate Mode */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    {isCustomRateMode ? 'Your Proposed Custom Rate' : 'Estimated Investment'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCustomRateMode(!isCustomRateMode)}
                    className="text-[11px] text-gold hover:underline font-semibold flex items-center gap-1"
                  >
                    <Sliders size={12} />
                    <span>{isCustomRateMode ? 'Use Calculated Rate' : 'Propose Custom Rate'}</span>
                  </button>
                </div>

                {!isCustomRateMode ? (
                  <div>
                    <div className="flex items-baseline gap-3">
                      <div className="text-4xl font-serif font-bold text-gold">
                        ${estimatedPriceUSD}
                      </div>
                      <div className="text-xl font-serif text-slate-400">
                        / ₹{estimatedPriceINR.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Standard commercial rights for {selectedUsage}, broadcast WAV master, and 2 revision passes.
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-black/40 border border-gold/40 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <select
                        value={customRateCurrency}
                        onChange={(e) => setCustomRateCurrency(e.target.value)}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-gold border border-white/10 outline-none"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="INR">INR (₹)</option>
                      </select>
                      <input
                        type="text"
                        value={customRateInput}
                        onChange={(e) => setCustomRateInput(e.target.value)}
                        placeholder={customRateCurrency === 'USD' ? 'e.g. 75 or 0.25/word' : 'e.g. 4500 or 15/word'}
                        className="flex-grow px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-100 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Propose your target budget or per-word rate for this {wordCount}-word project.
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2.5 mb-8 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-gold" />
                  <span>Delivered in 24-bit 48kHz WAV + MP3 format</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-gold" />
                  <span>Noise-free, de-breathed, and studio mastered stems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-gold" />
                  <span>Bilingual: Hindi or English script interpretation</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const rateToPass = isCustomRateMode && customRateInput.trim() 
                    ? `${customRateCurrency === 'USD' ? '$' : '₹'}${customRateInput.trim()} for ${wordCount} words`
                    : `$${estimatedPriceUSD} / ₹${estimatedPriceINR} (${wordCount} words)`;
                  if (onOpenQuote) onOpenQuote(rateToPass, 'voiceover');
                }}
                className="w-full py-3.5 rounded-full bg-gold text-ink-dark hover:bg-gold-light transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-gold/20 cursor-pointer"
              >
                <span>{isCustomRateMode ? 'Submit Custom Offer' : 'Book This Voiceover Scope'}</span>
                <Sparkles size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Acoustic & Studio Specs */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-2">
            <Radio size={14} />
            <span>Studio Standards</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-semibold mb-3">
            Acoustic Setup & Delivery Standards
          </h2>
          <p className="text-slate-400 text-sm">
            Treated recording environment engineered for zero room reverb, crisp transients, and zero audible floor noise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 border border-gold/20">
              <Mic size={18} />
            </div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-1">
              Condenser Mic
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Large-diaphragm studio condenser microphone capturing rich chest resonance and high-frequency nuance.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 border border-gold/20">
              <ShieldCheck size={18} />
            </div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-1">
              Acoustic Isolation
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fully treated isolation recording space maintaining a noise floor lower than -60dB for pristine clarity.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 border border-gold/20">
              <Headphones size={18} />
            </div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-1">
              Mastered Stems
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Files delivered processed with subtle EQ, transparent compression, and gating, or 100% raw if preferred.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 border border-gold/20">
              <Clock size={18} />
            </div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-1">
              Rapid Turnaround
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard delivery within 24 to 48 hours. Express same-day delivery available for urgent commercial ads.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Global CTA */}
      <GlobalCTA
        onOpenQuote={onOpenQuote}
        title="Need a Voice That Gives Your Script Soul & Authority?"
        subtitle="Send your script or sample lines for a custom 15-second vocal audition in Hindi or English."
      />

    </div>
  );
}
