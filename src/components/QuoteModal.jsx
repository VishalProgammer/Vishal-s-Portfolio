import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Video, Mic, PenTool, Sparkles, MessageCircle, AlertCircle, DollarSign, SlidersHorizontal, Tag } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = 'aa9cf493-d59f-4bf2-aa31-0dc31dd19a51';

export default function QuoteModal({ isOpen, onClose, preselectedService = null, initialCustomRate = null }) {
  const [services, setServices] = useState(preselectedService ? [preselectedService] : ['video']);
  const [currency, setCurrency] = useState('USD'); // USD or INR
  const [budgetMode, setBudgetMode] = useState(initialCustomRate ? 'custom' : 'tier'); // 'tier' or 'custom'
  const [customAmount, setCustomAmount] = useState(initialCustomRate || '');
  const [customRateType, setCustomRateType] = useState('Fixed Total Project');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    timeline: 'Within 3-5 days',
    tierBudget: '$150 - $300',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleService = (id) => {
    setServices((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    if (curr === 'INR') {
      setFormData((prev) => ({ ...prev, tierBudget: '₹5,000 - ₹15,000' }));
    } else {
      setFormData((prev) => ({ ...prev, tierBudget: '$150 - $300' }));
    }
  };

  const getEffectiveBudget = () => {
    if (budgetMode === 'custom') {
      const sym = currency === 'USD' ? '$' : '₹';
      return customAmount.trim() 
        ? `${sym}${customAmount.trim()} (${customRateType})` 
        : `Custom rate (To be discussed)`;
    }
    return formData.tierBudget;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your name and email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    const effectiveBudget = getEffectiveBudget();

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        subject: `[Quote Request] ${formData.name} - Services: ${services.join(', ')} (${budgetMode === 'custom' ? 'Custom Offer' : 'Preset Tier'})`,
        message: `
Services Requested: ${services.join(', ')}
Pricing Mode: ${budgetMode === 'custom' ? 'Custom Client Price/Rate' : 'Standard Tier'}
Budget / Proposed Rate: ${currency} ${effectiveBudget}
Timeline: ${formData.timeline}
Project Brief: ${formData.details || 'Not specified'}
        `,
        from_name: 'Vishal Portfolio — Quick Quote'
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.message || 'Failed to send quote request.');
      }
    } catch {
      setErrorMsg('Could not transmit request. Try reaching out via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const effectiveBudget = getEffectiveBudget();
    const text = encodeURIComponent(
      `Hi Vishal! I would like to inquire about a project.\nServices: ${services.join(', ')}\nBudget/Proposed Rate: ${effectiveBudget} (${currency})\nTimeline: ${formData.timeline}`
    );
    window.open(`https://wa.me/918708042829?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030508]/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#0B0F17] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar relative shadow-2xl"
        >
          {/* Top Decorative Strip */}
          <div className="h-1.5 bg-gradient-to-r from-[#9A7B1C] via-[#D4AF37] to-[#F3E5AB] w-full" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10 cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="p-6 md:p-8">
            {!isSuccess ? (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest mb-1.5 font-medium">
                    <Sparkles size={12} />
                    <span>Project Estimator & Custom Quoting</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-slate-100 font-semibold">
                    Let's Build Something Exceptional
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed">
                    Select your services, choose from standard tiers or propose your own custom rate/budget.
                  </p>
                </div>

                {/* Vertical Selection */}
                <div className="mb-5">
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 font-sans block mb-2 font-medium">
                    Choose Service(s)
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggleService('video')}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        services.includes('video')
                          ? 'border-gold bg-gold/10 text-gold-light'
                          : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <Video size={18} className="mb-2 text-gold" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Video Editing</div>
                        <div className="text-[10px] text-slate-400">Shorts, Reels, Ads</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleService('voiceover')}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        services.includes('voiceover')
                          ? 'border-gold bg-gold/10 text-gold-light'
                          : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <Mic size={18} className="mb-2 text-gold" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Voiceover</div>
                        <div className="text-[10px] text-slate-400">Hindi / English</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleService('poetry')}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        services.includes('poetry')
                          ? 'border-gold bg-gold/10 text-gold-light'
                          : 'border-white/5 bg-slate-900/50 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <PenTool size={18} className="mb-2 text-gold" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Poetry & Copy</div>
                        <div className="text-[10px] text-slate-400">Custom Written</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Currency & Pricing Mode Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 mb-5 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Currency:</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange('USD')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                          currency === 'USD' ? 'bg-gold text-ink-dark' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        USD ($)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange('INR')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                          currency === 'INR' ? 'bg-gold text-ink-dark' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        INR (₹)
                      </button>
                    </div>
                  </div>

                  {/* Pricing Mode Toggle: Tier vs Custom */}
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setBudgetMode('tier')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                        budgetMode === 'tier' ? 'bg-white/15 text-slate-100' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Preset Tiers
                    </button>
                    <button
                      type="button"
                      onClick={() => setBudgetMode('custom')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                        budgetMode === 'custom' ? 'bg-gold text-ink-dark font-bold' : 'text-gold hover:text-gold-light'
                      }`}
                    >
                      <SlidersHorizontal size={11} />
                      <span>Custom Rate</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-200 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@agency.com"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-200 text-sm focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  {/* Flexible Budget Section: Preset Tiers vs Custom Rate Entry */}
                  <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                        <Tag size={12} className="text-gold" />
                        <span>{budgetMode === 'custom' ? 'Proposed Custom Rate / Price' : 'Estimated Budget Tier'}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setBudgetMode(budgetMode === 'custom' ? 'tier' : 'custom')}
                        className="text-[10px] text-gold hover:underline"
                      >
                        {budgetMode === 'custom' ? 'Switch to Preset Tiers' : 'Enter Custom Price Instead'}
                      </button>
                    </div>

                    {budgetMode === 'tier' ? (
                      <select
                        value={formData.tierBudget}
                        onChange={(e) => setFormData({ ...formData, tierBudget: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-200 text-sm focus:border-gold outline-none"
                      >
                        {currency === 'USD' ? (
                          <>
                            <option value="$100 - $250">$100 - $250 (Single Project)</option>
                            <option value="$250 - $600">$250 - $600 (Reels Package / Full VO)</option>
                            <option value="$600 - $1,500">$600 - $1,500 (Monthly Retainer)</option>
                            <option value="$1,500+">$1,500+ (High Volume / Commercial)</option>
                          </>
                        ) : (
                          <>
                            <option value="₹4,000 - ₹10,000">₹4,000 - ₹10,000 (Single Project)</option>
                            <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000 (Reels / VO Pack)</option>
                            <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Monthly Retainer)</option>
                            <option value="₹50,000+">₹50,000+ (Brand Campaign)</option>
                          </>
                        )}
                      </select>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                        {/* Custom Price Input */}
                        <div className="sm:col-span-6 relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                            {currency === 'USD' ? '$' : '₹'}
                          </div>
                          <input
                            type="text"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder={currency === 'USD' ? 'e.g. 175 or 45/reel' : 'e.g. 8000 or 2500/video'}
                            className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-900 border border-gold/40 text-slate-100 text-sm focus:border-gold outline-none font-sans"
                          />
                        </div>

                        {/* Custom Rate Model */}
                        <div className="sm:col-span-6">
                          <select
                            value={customRateType}
                            onChange={(e) => setCustomRateType(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-slate-200 text-xs focus:border-gold outline-none"
                          >
                            <option value="Fixed Total Project">Fixed Total Project</option>
                            <option value="Per Video / Reel">Per Video / Reel</option>
                            <option value="Per Minute of Audio">Per Minute of Audio</option>
                            <option value="Per Word (Voice/Poetry)">Per Word (VO/Poetry)</option>
                            <option value="Monthly Retainer">Monthly Retainer</option>
                          </select>
                        </div>

                        <div className="sm:col-span-12 text-[11px] text-slate-400">
                          Active Proposal: <strong className="text-gold">{getEffectiveBudget()}</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-medium">
                      Desired Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-200 text-sm focus:border-gold outline-none"
                    >
                      <option value="24-48 Hours (Rush)">24-48 Hours (Rush)</option>
                      <option value="Within 3-5 days">Within 3-5 days</option>
                      <option value="1-2 Weeks">1-2 Weeks</option>
                      <option value="Ongoing Monthly">Ongoing Monthly Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-medium">
                      Project Details / Specific Deliverables (Optional)
                    </label>
                    <textarea
                      rows="2"
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Share video format, script word count, or reference links..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-200 text-sm focus:border-gold outline-none resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-red-400 text-xs flex items-center gap-1.5 p-2 bg-red-400/10 rounded-lg border border-red-400/20">
                      <AlertCircle size={14} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle size={15} />
                      <span>Send Offer on WhatsApp</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gold text-ink-dark hover:bg-gold-light transition-all text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-gold/20 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Submitting Quote...</span>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Submit Quote Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-5">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-2xl text-slate-100 font-semibold mb-2">
                  Quote Request Received!
                </h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
                  Thank you, <span className="text-gold">{formData.name}</span>. Your proposed rate of <strong className="text-slate-200">{getEffectiveBudget()}</strong> has been submitted. I will review and reply within 12 hours.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-gold text-ink-dark font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
