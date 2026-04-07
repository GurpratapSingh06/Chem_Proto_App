import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const Acknowledgement = () => {
  return (
    <section id="acknowledgement" className="section-padding relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-[3rem] p-10 md:p-16 space-y-6"
        >
          <div className="inline-flex items-center justify-center p-3 bg-lab-orange/10 text-lab-orange rounded-full mb-3">
            <Award size={40} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-labfont uppercase tracking-tight">Acknowledgement</h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed italic px-4">
            "We would like to express our deepest gratitude to our guide Dr. Abhijeet Patil and the Department of Chemical Engineering for their guidance and support throughout the chemical prototyping project. This interactive simulation is a result of collaborative research and technical exploration."
          </p>

          <div className="pt-8 flex flex-col items-center gap-1">
            <p className="text-slate-400 dark:text-slate-500 font-bold tracking-[0.2em] uppercase text-[10px]">Project Submission</p>
            <p className="text-slate-900 dark:text-white font-bold text-base">2025-2026 Academic Year</p>
            <div className="h-0.5 w-12 bg-lab-orange rounded-full mt-3" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Acknowledgement;
