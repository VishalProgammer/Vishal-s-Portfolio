import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Feather, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Please write your name.";
    if (!formData.email.trim()) {
      tempErrors.email = "An address is needed.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please write a valid email address.";
    }
    if (!formData.message.trim()) tempErrors.message = "The parchment is empty. Write a message.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Construct mailto link to send the email
    const subject = formData.subject ? formData.subject : `Portfolio Message from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:vishalwriterofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;

    // Simulate parchment transmission (1.5s delay)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-16">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest mb-3 font-medium">
          <Feather size={14} />
          <span>Correspondence</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-slate-100 font-medium mb-3">
          Send a Letter
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto">
          Have a query, collaboration idea, or a poem to share? Set your thoughts onto this digital parchment.
        </p>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl">
        {/* Subtle decorative gold line across top */}
        <div className="h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light w-full" />
        
        {/* Glowing orb background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

        <div className="p-8 md:p-12 relative z-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="name" className="text-xs uppercase tracking-wider text-slate-400 font-sans">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="border-b border-slate-700 bg-transparent py-2.5 text-slate-200 placeholder:text-slate-600 focus:border-gold outline-none transition-colors duration-300 font-serif text-base"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-400 mt-1 flex items-center gap-1 absolute bottom-[-18px]">
                        <AlertCircle size={10} />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider text-slate-400 font-sans">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. email@example.com"
                      className="border-b border-slate-700 bg-transparent py-2.5 text-slate-200 placeholder:text-slate-600 focus:border-gold outline-none transition-colors duration-300 font-serif text-base"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 mt-1 flex items-center gap-1 absolute bottom-[-18px]">
                        <AlertCircle size={10} />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs uppercase tracking-wider text-slate-400 font-sans">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Speaking Inquiries"
                    className="border-b border-slate-700 bg-transparent py-2.5 text-slate-200 placeholder:text-slate-600 focus:border-gold outline-none transition-colors duration-300 font-serif text-base"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2 relative pt-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-wider text-slate-400 font-sans">
                    Your Letter
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your words here..."
                    className="border-b border-slate-700 bg-transparent py-2.5 text-slate-200 placeholder:text-slate-600 focus:border-gold outline-none transition-colors duration-300 font-serif text-lg leading-relaxed resize-none custom-scrollbar"
                  />
                  {errors.message && (
                    <span className="text-[10px] text-red-400 mt-1 flex items-center gap-1 absolute bottom-[-18px]">
                      <AlertCircle size={10} />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-gold text-ink-dark hover:bg-gold-light hover:scale-105 disabled:scale-100 disabled:bg-slate-700 disabled:text-slate-400 transition-all duration-300 font-sans font-semibold text-sm tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-gold/15 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Feather size={16} className="animate-spin" />
                        <span>Sending Parchment...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Letter</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-12 px-4"
              >
                <motion.div
                  initial={{ rotate: -15, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6"
                >
                  <CheckCircle2 size={32} />
                </motion.div>

                <h3 className="font-serif text-2xl md:text-3xl text-slate-100 font-semibold mb-4">
                  The Letter is Sent
                </h3>
                
                <p className="text-slate-400 text-sm md:text-base max-w-md leading-relaxed mb-8">
                  "Your words have been sealed and set afloat. The wind shall carry them, and I will reply as soon as the tide permits."
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-gold/30 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-ink-dark transition-all duration-300"
                >
                  Write Another Letter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
    </div>
  );
}
