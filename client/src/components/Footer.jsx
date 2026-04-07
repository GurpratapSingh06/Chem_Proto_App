import React from 'react';
import { Beaker, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-4 mt-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-10">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-[12px] font-bold tracking-[0.1em] uppercase text-slate-400">
            <a href="#home" className="hover:text-lab-orange transition-colors">Home</a>
            <a href="#ingredients" className="hover:text-lab-orange transition-colors">Chemicals</a>
            <a href="#procedure" className="hover:text-lab-orange transition-colors">Procedure</a>
            <a href="#animation" className="hover:text-lab-orange transition-colors">Simulation</a>
            <a href="#reactions" className="hover:text-lab-orange transition-colors">Reactions</a>
            <a href="#diagrams" className="hover:text-lab-orange transition-colors">Diagrams</a>
            <a href="#quiz" className="hover:text-lab-orange transition-colors">Quiz</a>
            <a href="#media" className="hover:text-lab-orange transition-colors">Media</a>
            <a href="#advantages" className="hover:text-lab-orange transition-colors">Advantages</a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl transition-all border border-slate-700 shadow-sm"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-tight">Back to Top</span>
          </button>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-medium text-[10px] tracking-[0.05em] uppercase">
            <p>© 2025-2026 Chemical Prototyping Project | Department of Chemical Engineering</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
