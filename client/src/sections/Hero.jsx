import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, ArrowRight } from 'lucide-react';

const FloatingBubbles = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
        style={{
          width: Math.random() * 60 + 20,
          height: Math.random() * 60 + 20,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100, 0],
          x: [0, Math.random() * 40 - 20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

const ScientificPattern = () => (
  <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="50" cy="50" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-200/40 dark:bg-sky-900/20 rounded-full blur-[120px] -ml-64 -mt-64" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-200/40 dark:bg-orange-900/20 rounded-full blur-[120px] -mr-64 -mb-64" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 dark:bg-slate-800/20 rounded-full blur-[100px]" />
        
        {/* Campus Background Image */}
        <div className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.1] mix-blend-overlay overflow-hidden">
          <img 
            src={`${import.meta.env.BASE_URL}mitaoe.png`} 
            alt="Campus Background" 
            className="w-full h-full object-cover grayscale brightness-125"
          />
        </div>
      </div>

      <ScientificPattern />
      <FloatingBubbles />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="flex justify-center mb-8"
        >
          <div className="p-5 bg-lab-orange rounded-3xl shadow-2xl shadow-orange-500/30 transform -rotate-6">
            <Beaker size={52} className="text-white" />
          </div>
        </motion.div>

        <div className="relative inline-block mb-6">
          <div className="absolute -inset-4 bg-white/40 blur-2xl rounded-full z-0" />
          <h1 className="relative z-10 text-6xl md:text-8xl font-bold text-slate-900 dark:text-white tracking-tight font-labfont transition-colors duration-500">
            Liquid Soap <span className="text-lab-orange">Preparation</span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-500">
          An interactive laboratory experience exploring the chemical process of soap making through digital simulation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('ingredients').scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-lab-orange transition-all duration-300 shadow-2xl shadow-slate-900/10"
          >
            Start Experience
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('advantages').scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md text-slate-800 dark:text-white border border-white/50 dark:border-slate-700/50 px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/80 dark:hover:bg-slate-700 transition-all duration-300 shadow-xl"
          >
            View Applications
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-slate-300 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
