import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageCircle, Clock, ShieldCheck, Globe2 } from 'lucide-react';

export default function GlobalCTA({ onOpenQuote, title, subtitle }) {
  const openWhatsApp = () => {
    window.open(
      'https://wa.me/918708042829?text=' +
        encodeURIComponent('Hi Vishal, I am interested in collaborating on a project!'),
      '_blank'
    );
  };

  return (
    <section className="relative my-16 md:my-24 overflow-hidden rounded-3xl border border-white/10 glass-panel p-8 md:p-14 text-center">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-gold/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs uppercase tracking-widest font-semibold mb-6">
        <Sparkles size={13} />
        <span>Available for Commissions & Global Retainers</span>
      </div>

      <h2 className="font-serif text-3xl md:text-5xl text-slate-100 font-semibold max-w-3xl mx-auto leading-tight mb-4">
        {title || 'Ready to Elevate Your Brand With Words, Video & Voice?'}
      </h2>

      <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
        {subtitle ||
          'Whether you need viral short-form editing, bilingual voiceovers with broadcast clarity, or bespoke poetry that connects deeply—let’s create work that leaves an impact.'}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
        <button
          onClick={onOpenQuote}
          className="px-8 py-3.5 rounded-full bg-gold text-ink-dark hover:bg-gold-light hover:scale-105 transition-all duration-300 font-semibold text-sm tracking-wider uppercase flex items-center gap-2.5 shadow-xl shadow-gold/20 cursor-pointer"
        >
          <span>Get Instant Project Quote</span>
          <ArrowRight size={16} />
        </button>

        <button
          onClick={openWhatsApp}
          className="px-7 py-3.5 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/70 transition-all duration-300 font-semibold text-sm tracking-wider uppercase flex items-center gap-2.5 cursor-pointer"
        >
          <MessageCircle size={17} />
          <span>Chat on WhatsApp</span>
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/5 max-w-3xl mx-auto text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
            <Clock size={16} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">24-48h Turnaround</div>
            <div className="text-[11px] text-slate-500">Fast delivery without quality compromise</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
            <Globe2 size={16} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">Global & Indian Clients</div>
            <div className="text-[11px] text-slate-500">Dual currency billing (INR / USD)</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">100% Satisfaction</div>
            <div className="text-[11px] text-slate-500">Included revisions until client delighted</div>
          </div>
        </div>
      </div>
    </section>
  );
}
