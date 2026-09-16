import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Video, Mic, PenTool, ArrowRight, Sparkles, Play, Volume2, 
  CheckCircle2, Clock, Globe2, ShieldCheck, ChevronRight, MessageCircle 
} from 'lucide-react';
import { fetchSampleLinks, fallbackData } from '../utils/linksParser';
import { poems } from '../data/poems';
import GlobalCTA from '../components/GlobalCTA';

// Custom Typewriter Hook
function useTypewriter(texts, speed = 60, pause = 1800) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[textIndex % texts.length];
    let timeout;

    if (!isDeleting && displayText.length < currentFullText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
      }, speed);
    } else if (!isDeleting && displayText.length === currentFullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pause);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
      }, speed / 2);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed, pause]);

  return displayText;
}

export default function Home({ onOpenQuote }) {
  const animatedTagline = useTypewriter([
    "Crafting Words That Move Souls.",
    "Editing Videos That Stop The Scroll.",
    "Voicing Scripts With Broadcast Authority.",
    "Elevating Brands Through Triple-Threat Creativity."
  ]);

  const [sampleData, setSampleData] = useState(fallbackData);

  useEffect(() => {
    async function loadSamples() {
      try {
        const data = await fetchSampleLinks();
        if (data) setSampleData(data);
      } catch (e) {
        console.error('Error loading sample links:', e);
      }
    }
    loadSamples();
  }, []);

  const featuredVideo = sampleData.videoEdits[0];
  const featuredVo = sampleData.voiceOvers[0];
  const featuredPoem = poems[0];

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-16 overflow-hidden">
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[75vh] mb-20">
        
        {/* Left Col: Brand Pitch */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col justify-center gap-6"
        >
          {/* Creative Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs uppercase tracking-widest font-semibold w-fit">
            <Sparkles size={13} />
            <span>Wordsmith • Video Editor • Voice Artist</span>
          </div>

          {/* Main Title & Typewriter */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-100 font-bold leading-tight min-h-[110px] sm:min-h-[140px]">
            <span className="typewriter-cursor text-slate-100">{animatedTagline}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed max-w-xl">
            I am <strong className="text-gold font-semibold">Vishal Soami</strong>. I bridge emotional storytelling and modern digital media. Whether you need viral short-form video editing, bilingual Hindi/English voiceover recording, or bespoke literary writing—I deliver high-converting creative assets for brands and agencies worldwide.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 py-2 border-y border-white/5 my-1 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-gold" />
              <span>Bilingual: Hindi & English</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-gold" />
              <span>24-48h Rapid Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-gold" />
              <span>Global & Indian Clients</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="px-8 py-3.5 rounded-full bg-gold text-ink-dark hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs uppercase tracking-widest flex items-center gap-2.5 shadow-xl shadow-gold/20 cursor-pointer"
            >
              <span>Work With Me</span>
              <ArrowRight size={15} />
            </button>

            <a
              href="#portals"
              className="px-7 py-3.5 rounded-full border border-white/15 text-slate-300 hover:text-white hover:border-gold/50 hover:bg-white/5 transition-all duration-300 text-xs uppercase tracking-wider font-semibold"
            >
              Explore Portals
            </a>
          </div>
        </motion.div>

        {/* Right Col: Executive Multimedia Portrait */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-full max-w-sm">
            {/* Ambient frames */}
            <div className="absolute -inset-4 rounded-3xl border border-gold/20 scale-95 group-hover:scale-100 group-hover:border-gold/40 transition-all duration-700 pointer-events-none" />
            <div className="absolute -inset-2 rounded-3xl border border-white/5 group-hover:rotate-2 transition-all duration-700 pointer-events-none" />

            {/* Container Card */}
            <div className="w-full h-[450px] sm:h-[480px] rounded-2xl overflow-hidden glass-panel relative border border-white/10 shadow-2xl">
              <img
                src="https://i.pinimg.com/736x/da/97/8e/da978e6cddd7ce1bf3985dcfa3e9e508.jpg"
                alt="Vishal Soami"
                className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/20 to-transparent pointer-events-none" />

              {/* Badges on card */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider text-slate-200 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Hire</span>
                </span>
              </div>

              {/* Bottom Card Identity */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold block">
                  Vishal Soami
                </span>
                <span className="text-xs text-slate-300 font-serif italic block mt-1">
                  "Words breathe life into frames. Voice gives them heartbeat."
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </section>

      {/* Interactive Portal Selection (Core Requirement) */}
      <section id="portals" className="my-24 pt-12 border-t border-white/10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles size={14} />
            <span>Interactive Gateways</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-100 font-semibold mb-4">
            Select Your Creative Destination
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Choose a vertical to explore deep sample libraries, interactive audio players, vertical video reels, and tailored pricing.
          </p>
        </div>

        {/* 3 Interactive Portal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PORTAL 1: Video Editing */}
          <Link
            to="/video-editing"
            className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-gold/50 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden shadow-2xl hover:-translate-y-2 cursor-pointer"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gold/10 blur-[60px] group-hover:bg-gold/20 transition-all pointer-events-none" />
            
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 text-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video size={22} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gold">
                  Reels & Shorts
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-slate-100 font-semibold group-hover:text-gold transition-colors mb-3">
                Video Editing
              </h3>

              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                High-energy 9:16 vertical cuts, YouTube shorts, kinetic captions, and product commercials engineered for peak viewer retention.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Commercial Ads', 'Podcast Cuts', 'Explainer Reels', 'Vlog Aesthetics'].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Live Preview Teaser */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 mb-6 group-hover:border-gold/20 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-200">Featured Sample:</span>
                  <span className="text-gold text-[10px]">Shorts Embed</span>
                </div>
                <div className="text-xs text-slate-300 font-serif line-clamp-1 italic">
                  "{featuredVideo?.title || 'Coffee Ad Commercial'}"
                </div>
              </div>
            </div>

            {/* Action link */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gold group-hover:text-gold-light">
              <span>Enter Video Studio</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* PORTAL 2: Voiceover Samples */}
          <Link
            to="/voiceover"
            className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-gold/50 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden shadow-2xl hover:-translate-y-2 cursor-pointer"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500/10 blur-[60px] group-hover:bg-blue-500/20 transition-all pointer-events-none" />
            
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 text-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mic size={22} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sky-300">
                  Hindi & English
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-slate-100 font-semibold group-hover:text-gold transition-colors mb-3">
                Voiceover Samples
              </h3>

              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                Resonant, emotive vocal delivery across native Hindi and neutral global English for commercials, character dubbing, and narrative storytelling.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Hindi Narration', 'English Commercials', 'Character Dubbing', 'Broadcast Master'].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Live Preview Teaser with Soundwave */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 mb-6 group-hover:border-gold/20 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-200">Acoustic Audio Stem:</span>
                  <div className="flex items-end gap-1 h-3.5 px-1">
                    <span className="w-1 bg-gold rounded-full wave-bar" />
                    <span className="w-1 bg-gold rounded-full wave-bar" />
                    <span className="w-1 bg-gold rounded-full wave-bar" />
                    <span className="w-1 bg-gold rounded-full wave-bar" />
                  </div>
                </div>
                <div className="text-xs text-slate-300 font-serif line-clamp-1 italic">
                  "{featuredVo?.title || 'Hindi Emotional & Expressive Narration'}"
                </div>
              </div>
            </div>

            {/* Action link */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gold group-hover:text-gold-light">
              <span>Listen To Vocal Reels</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* PORTAL 3: Poetry Samples */}
          <Link
            to="/poetry"
            className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-gold/50 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden shadow-2xl hover:-translate-y-2 cursor-pointer"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gold/10 blur-[60px] group-hover:bg-gold/20 transition-all pointer-events-none" />
            
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 text-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PenTool size={22} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gold">
                  Literature & Copy
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-slate-100 font-semibold group-hover:text-gold transition-colors mb-3">
                Poetry & Writing
              </h3>

              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                Refined anthology of poems, reflections, and bespoke literary verse tailored for wedding celebrations, brand campaigns, and spoken word.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Celebrations', 'Fantasies & War', 'Love & Longing', 'Bespoke Vows'].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Live Preview Teaser */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 mb-6 group-hover:border-gold/20 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-200">Featured Verse:</span>
                  <span className="text-gold text-[10px]">Celebrations</span>
                </div>
                <div className="text-xs text-slate-300 font-serif line-clamp-1 italic">
                  "{featuredPoem?.snippet || 'This day is so wonderful...'}"
                </div>
              </div>
            </div>

            {/* Action link */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gold group-hover:text-gold-light">
              <span>Read The Anthology</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* Triple-Vertical Showreel Highlights Strip */}
      <section className="my-24 p-8 md:p-14 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-2">
              <Sparkles size={13} />
              <span>Multi-Format Showcase</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-semibold">
              Experience The Craft in Action
            </h2>
          </div>
          <button
            onClick={() => onOpenQuote && onOpenQuote()}
            className="px-6 py-2.5 rounded-full bg-gold text-ink-dark font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all flex items-center gap-1.5"
          >
            <span>Commission Production</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 3 Side-by-side Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. Video Teaser */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold flex items-center gap-1">
                  <Video size={12} />
                  <span>Video Reel</span>
                </span>
                <span className="text-[10px] text-slate-400">9:16 Shorts</span>
              </div>
              <h4 className="font-serif text-lg text-slate-100 font-semibold mb-2">
                {featuredVideo?.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                {featuredVideo?.description}
              </p>
            </div>
            <Link
              to="/video-editing"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-light"
            >
              <span>Watch Video Samples</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* 2. Voiceover Teaser */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold flex items-center gap-1">
                  <Mic size={12} />
                  <span>Voiceover Reel</span>
                </span>
                <span className="text-[10px] text-slate-400">Hindi Master</span>
              </div>
              <h4 className="font-serif text-lg text-slate-100 font-semibold mb-2">
                {featuredVo?.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                {featuredVo?.description}
              </p>
            </div>
            <Link
              to="/voiceover"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-light"
            >
              <span>Listen To Audio Tracks</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* 3. Poetry Teaser */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold flex items-center gap-1">
                  <PenTool size={12} />
                  <span>Written Verse</span>
                </span>
                <span className="text-[10px] text-slate-400">Anthology</span>
              </div>
              <h4 className="font-serif text-lg text-slate-100 font-semibold mb-2">
                {featuredPoem?.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 font-serif italic">
                "{featuredPoem?.snippet}"
              </p>
            </div>
            <Link
              to="/poetry"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-light"
            >
              <span>Read All Poetry</span>
              <ChevronRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* Trust & Client Why-Choose-Me Section */}
      <section className="my-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-2">
            <ShieldCheck size={14} />
            <span>Why Agencies & Creators Choose Vishal</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-semibold mb-3">
            Triple-Discipline Synergy
          </h2>
          <p className="text-slate-400 text-sm">
            Save time and avoid managing disjointed freelancers. Get copy, voiceover, and editing synchronized seamlessly under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-5 border border-gold/30">
              <Globe2 size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-200 mb-2">
              Bilingual Fluency & Cultural Nuance
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Native emotional resonance in Hindi paired with neutral broadcast English—perfect for Indian market campaigns and international digital agencies.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-5 border border-gold/30">
              <Clock size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-200 mb-2">
              Swift 24-48 Hour Execution
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Digital content moves at lightspeed. Get dry audio stems, commercial voiceovers, and dynamic short-form video cuts delivered on tight deadlines.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-5 border border-gold/30">
              <Sparkles size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-200 mb-2">
              All-In-One Creative Pipeline
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Write the poetic script, record the emotive voiceover, and cut the viral visual video—all coordinated without miscommunication.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Global Call To Action */}
      <GlobalCTA
        onOpenQuote={onOpenQuote}
        title="Ready to Start Your Next Project?"
        subtitle="Let's collaborate on your next reel series, commercial voiceover, or bespoke poem. Receive a custom quote within 12 hours."
      />

    </div>
  );
}
