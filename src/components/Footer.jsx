import { NavLink } from 'react-router-dom';
import { Mail, ChevronUp, MessageCircle, Sparkles, Video, Globe, Music, ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenQuote }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#030508] border-t border-white/10 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle background ambient glows */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Top Tier: Brand Statement & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-white/10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-3">
              <Sparkles size={14} />
              <span>Multimedia Creative Studio</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-slate-100 font-medium leading-snug max-w-xl">
              Storytelling engineered across rhythm, frames, and voice.
            </h3>
            <p className="text-sm text-slate-400 mt-2 max-w-lg leading-relaxed">
              Serving creators, brands, digital agencies, and bespoke private commissions across India and worldwide.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:justify-end">
            <button
              onClick={onOpenQuote}
              className="px-6 py-3.5 rounded-full bg-gold text-ink-dark hover:bg-gold-light hover:scale-105 transition-all duration-300 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-gold/15 cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowUpRight size={16} />
            </button>
            <a
              href="https://wa.me/918708042829"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Middle Tier: Vertical Navigation & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Col 1: About */}
          <div>
            <div className="font-serif text-lg font-bold text-slate-200 tracking-wider mb-3">
              VISHAL SOAMI
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Specialized in high-retention vertical short-form editing, bilingual Hindi/English voiceovers, and poetic copywriting.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Accepting New Clients This Month</span>
            </div>
          </div>

          {/* Col 2: Services / Verticals */}
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-3">
              Core Verticals
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <NavLink to="/video-editing" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span>Video Editing (Shorts & Reels)</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/voiceover" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span>Voiceovers (Hindi & English)</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/poetry" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span>Poetry & Bespoke Writing</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span>Combined Production Packages</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Workflow & Specs */}
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-3">
              Standard Specifications
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Turnaround: 24 to 48 Hours</li>
              <li>Audio Formats: 24-bit WAV / 320kbps MP3</li>
              <li>Video Formats: 4K / 1080p 9:16 & 16:9</li>
              <li>Billing: INR (₹) & USD ($) Supported</li>
            </ul>
          </div>

          {/* Col 4: Direct Inquiries */}
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-3">
              Direct Inquiries
            </div>
            <a
              href="mailto:vishalwriterofficial@gmail.com"
              className="inline-flex items-center gap-2 text-xs text-gold hover:text-gold-light transition-colors mb-3 break-all"
            >
              <Mail size={14} />
              <span>vishalwriterofficial@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://youtube.com/@vishalsoami"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold hover:border-gold/40 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://soundcloud.com/daisuke-801945923"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold hover:border-gold/40 transition-colors"
                aria-label="SoundCloud"
              >
                <Music size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold hover:border-gold/40 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Vishal Soami. Wordsmith, Video Editor & Voiceover Artist. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-gold transition-colors"
          >
            <span>Back to top</span>
            <ChevronUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
