import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSteps } from '../services/api';
import { ChevronDown, Beaker, Flame, Thermometer, Filter, Package, Info } from 'lucide-react';

const icons = {
  mixing: <Beaker size={24} />,
  heating: <Flame size={24} />,
  cooling: <Thermometer size={24} />,
  filtration: <Filter size={24} />,
  final: <Package size={24} />
};

const Procedure = () => {
  const [steps, setSteps] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await getSteps();
        setSteps(response.data);
      } catch (error) {
        console.error("Error fetching steps:", error);
      }
    };
    fetchSteps();
  }, []);

  return (
    <section id="procedure" className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[10px] font-bold tracking-[0.3em] text-lab-orange uppercase mb-3">The Process</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-labfont italic">Experiment Procedure</h3>
          <p className="text-slate-500 max-w-xl mx-auto text-sm font-light leading-relaxed">
            Follow our structured chemical process from raw materials to the final purified liquid soap.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-slate-200/50 hidden md:block" />

          <div className="space-y-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full z-10 hidden md:flex items-center justify-center text-lab-orange shadow-md">
                  {icons[step.animationState]}
                </div>

                <div className="flex-1 w-full">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setExpandedId(expandedId === step.id ? null : step.id)}
                    className="glass-card rounded-[2rem] p-6 md:p-8 hover:border-lab-orange/20 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-slate-200 group-hover:text-lab-orange/10 transition-colors uppercase">
                          {String(step.id).padStart(2, '0')}
                        </span>
                        <h4 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">{step.title}</h4>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedId === step.id ? 180 : 0 }}
                      >
                        <ChevronDown className="text-slate-400" size={18} />
                      </motion.div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-[13px] font-light leading-relaxed">
                      {step.description}
                    </p>

                    <AnimatePresence>
                      {expandedId === step.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-6 border-t border-slate-50 dark:border-slate-800">
                            <div className="glass-card p-4 rounded-2xl flex items-start gap-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-lab-blue rounded-lg">
                                <Info size={16} />
                              </div>
                              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                                Critical Step: Ensure consistent temperature during the {step.title.toLowerCase()} phase for optimal results.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Spacer for MD screens */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Procedure;
