import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool, Sparkles } from 'lucide-react';
import { poems } from '../data/poems';

// Custom Typewriter Hook for premium typing animation
function useTypewriter(text, speed = 50, delay = 500) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    let intervalId = null;
    
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (i < text.length) {
          const char = text.charAt(i);
          setDisplayText((prev) => prev + char);
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, speed, delay]);

  return displayText;
}

export default function Home() {
  const typedGreeting = useTypewriter("Words from the heart inspire the soul.", 40, 400);
  
  // Select 3 featured poems
  const featuredPoems = poems.slice(0, 3);

  // Parent container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom ease-out
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-16 overflow-hidden"
    >
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center min-h-[70vh]">
        
        {/* Bio & Intro */}
        <motion.div 
          variants={itemVariants} 
          className="md:col-span-7 flex flex-col justify-center gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs uppercase tracking-widest w-fit">
            <PenTool size={12} />
            <span>Welcome to the Sanctuary</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-slate-100 font-medium leading-tight min-h-[90px] md:min-h-[144px]">
            <span className="typewriter-cursor">{typedGreeting}</span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 font-sans leading-relaxed max-w-xl">
            Greetings, I am <span className="text-gold font-medium">Vishal</span>. Welcome to my portfolio. I am a 20-year-old writer. I have been writing as a hobby for quite some time, and now I wish to help others through my words. Poems, Short Stories, and many other things I can help you with. Let's turn your ideas into creative pieces of art.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link
              to="/poetry"
              className="px-6 py-3 rounded-full bg-gold text-ink-dark hover:bg-gold-light hover:scale-105 transition-all duration-300 font-medium tracking-wider text-sm flex items-center gap-2 group shadow-lg shadow-gold/10"
            >
              <span>Explore My Poetry</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-sm tracking-wider"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>

        {/* Profile Image Portrait */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-5 flex justify-center"
        >
          <div className="relative group">
            {/* Elegant artistic outline frames */}
            <div className="absolute -inset-4 rounded-3xl border border-gold/20 scale-95 group-hover:scale-100 group-hover:border-gold/40 transition-all duration-700 pointer-events-none" />
            <div className="absolute -inset-2 rounded-3xl border border-white/5 group-hover:rotate-3 transition-all duration-700 pointer-events-none" />
            
            {/* Main Image Container */}
            <div className="w-72 h-96 md:w-80 md:h-[450px] rounded-2xl overflow-hidden glass-panel relative">
              <img
                src="https://i.pinimg.com/736x/da/97/8e/da978e6cddd7ce1bf3985dcfa3e9e508.jpg"
                alt="Vishal Soami Portrait"
                className="w-full h-full object-cover grayscale brightness-90 contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold/80 block">Vishal Soami</span>
                <span className="text-xs text-slate-400 font-serif italic block mt-1">"The ink remembers what the heart forgets."</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Featured Poetry Section */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-24 md:mt-36 border-t border-white/5 pt-20 relative"
      >
        {/* Soft background glowing orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest mb-2 font-medium">
              <Sparkles size={12} />
              <span>Selected Works</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-medium">
              Featured Poetry
            </h2>
          </div>
          <Link
            to="/poetry"
            className="group flex items-center gap-2 text-gold hover:text-gold-light text-sm tracking-wider uppercase font-medium mt-4 md:mt-0 transition-colors"
          >
            <span>View All Poems</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Poetry Teasers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {featuredPoems.map((poem, index) => (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-gold/30 hover:-translate-y-2 transition-all duration-300 h-80 group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded bg-white/5 text-slate-400 border border-white/5">
                    {poem.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{poem.date}</span>
                </div>
                <h3 className="font-serif text-xl text-slate-200 group-hover:text-gold transition-colors duration-300 font-medium mb-3">
                  {poem.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-4 leading-relaxed font-serif italic">
                  "{poem.snippet}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <Link
                  to={`/poetry`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-medium group-hover:text-gold-light transition-colors"
                >
                  <span>Read Poem</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Decorative divider/quote */}
      <div className="my-24 border-b border-white/5 max-w-lg mx-auto" />
    </motion.div>
  );
}
