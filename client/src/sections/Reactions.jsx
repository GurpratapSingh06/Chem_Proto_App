import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, ArrowRight, Zap, FlaskConical } from 'lucide-react';

const Reactions = () => {
  const equations = [
    {
      title: 'Word Equation',
      equation: 'Castor Oil + NaOH → Sodium Ricinoleate (Soap) + Glycerol',
      style: 'text-2xl md:text-3xl font-bold'
    },
    {
      title: 'Chemical Equation',
      equation: 'C₃H₅(OOCC₁₇H₃₃)₃ + 3NaOH → 3C₁₇H₃₃COONa + C₃H₅(OH)₃',
      style: 'text-xl md:text-2xl font-mono'
    }
  ];

  const explanations = [
    { formula: 'C₃H₅(OOCC₁₇H₃₃)₃', name: 'Castor oil (triglyceride of ricinoleic acid)' },
    { formula: 'NaOH', name: 'Sodium Hydroxide' },
    { formula: 'C₁₇H₃₃COONa', name: 'Sodium ricinoleate (soap)' },
    { formula: 'C₃H₅(OH)₃', name: 'Glycerol' }
  ];

  return (
    <section id="reactions" className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-lab-orange uppercase mb-3">Chemical Transformation</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-labfont uppercase tracking-tight transition-colors duration-500">Saponification of Castor Oil</h3>
            <p className="text-slate-500 max-w-3xl mx-auto text-sm font-light leading-relaxed">
              Castor oil mainly consists of triglycerides of ricinoleic acid. When it reacts with sodium hydroxide (NaOH), it undergoes saponification to form sodium ricinoleate (soap) and glycerol.
            </p>
              <div className="glass-card rounded-3xl p-8 border-l-4 border-l-lab-orange">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-lab-orange/10 rounded-lg">
                    <FlaskConical className="text-lab-orange" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Saponification Process</h4>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6">
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 border border-slate-100 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
                      <span className="text-2xl font-bold text-lab-orange">Fat</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300 transition-colors">Triglyceride</p>
                  </div>
                  <ArrowRight className="text-slate-400 dark:text-slate-600 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 border border-slate-100 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
                      <span className="text-2xl font-bold text-lab-orange">Alkali</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300 transition-colors">NaOH</p>
                  </div>
                  <ArrowRight className="text-slate-400 dark:text-slate-600 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 border border-slate-100 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
                      <span className="text-2xl font-bold text-lab-orange">Soap</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300 transition-colors">Sodium Ricinoleate</p>
                  </div>
                  <ArrowRight className="text-slate-400 dark:text-slate-600 w-8 h-8 md:w-10 md:h-10" />
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 border border-slate-100 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
                      <span className="text-2xl font-bold text-lab-orange">Glycerol</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300 transition-colors">By-product</p>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          {equations.map((eq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-[2.5rem] p-8 md:p-10 text-center"
            >
              <h4 className="text-lab-orange text-[10px] font-bold uppercase tracking-[0.3em] mb-4">{eq.title}</h4>
              <div className={`${eq.style.replace('text-2xl', 'text-xl').replace('text-3xl', 'text-2xl')} text-slate-900 dark:text-slate-100 tracking-tight leading-relaxed transition-colors duration-500`}>
                {eq.equation.split('→').map((side, sidx) => (
                  <React.Fragment key={sidx}>
                    {sidx > 0 && <span className="text-lab-orange mx-4 block md:inline">→</span>}
                    <span>{side}</span>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {explanations.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="glass-panel rounded-2xl p-5 hover:border-lab-orange/30 transition-all group"
            >
              <div className="text-lab-orange font-mono font-bold mb-2 text-base group-hover:scale-105 transition-transform">{item.formula}</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] font-light leading-snug transition-colors">{item.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reactions;
