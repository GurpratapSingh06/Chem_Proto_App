import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Droplets, CheckCircle2 } from 'lucide-react';

const Advantages = () => {
  const benefits = [
    { 
      icon: <Shield size={18} />, 
      title: "Hygienic", 
      text: "Minimizes cross-contamination." 
    },
    { 
      icon: <Droplets size={18} />, 
      title: "Moisturizing", 
      text: "Glycerol keeps skin soft." 
    },
    { 
      icon: <Zap size={18} />, 
      title: "Efficient", 
      text: "Fast-acting cleaning power." 
    },
    { 
      icon: <Heart size={18} />, 
      title: "Skin Friendly", 
      text: "Balanced pH for daily use." 
    }
  ];

  return (
    <section id="advantages" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Compact Advantage Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] font-bold tracking-[0.3em] text-lab-orange uppercase mb-3 px-1">Core Benefits</h2>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 font-labfont uppercase tracking-tight">Advantages & Applications</h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-lab-orange/5 text-lab-orange rounded-xl flex items-center justify-center mb-3 group-hover:bg-lab-orange group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed transition-colors">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Conclusion & Takeaways */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-50 dark:border-slate-800 space-y-8 h-full"
            >
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-lab-orange" size={22} />
                  Conclusion
                </h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  The preparation of liquid soap involves the combination of various chemicals such as SLS, glycerol, sodium hydroxide, castor oil, and distilled water. The process includes dissolution, mixing, saponification, and stabilization steps. Sodium hydroxide reacts with castor oil to form soap and glycerol, while SLS enhances cleaning and foaming properties. Glycerol improves skin hydration, and water acts as a solvent. The final product obtained is a uniform, effective, and skin-friendly liquid soap suitable for daily use.
                </p>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 font-sans">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">🔑 Key Takeaways</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    "Liquid soap uses chemical & physical processes",
                    "Saponification is the main reaction",
                    "SLS provides cleaning and foaming",
                    "Glycerol keeps skin moisturized",
                    "Castor oil improves texture & quality",
                    "Proper mixing & cooling are essential",
                    "Safety precautions for NaOH are vital",
                    "The final product is efficient & economical"
                  ].map((takeaway, tidx) => (
                    <div key={tidx} className="flex gap-3 text-[11px] text-slate-600 dark:text-slate-400 items-start">
                      <span className="text-lab-orange mt-0.5">•</span>
                      {takeaway}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Advantages;
