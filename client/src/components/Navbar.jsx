import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Apply theme on load/change
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Chemicals', href: '#ingredients' },
    { name: 'Procedure', href: '#procedure' },
    { name: 'Simulation', href: '#animation' },
    { name: 'Reactions', href: '#reactions' },
    { name: 'Diagrams', href: '#diagrams' },
    { name: 'Quiz', href: '#quiz' },
    { name: 'Media', href: '#media' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md py-3 shadow-sm border-b border-white/20 dark:border-slate-800/20' : 'bg-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="p-1.5 bg-lab-orange rounded-lg">
            <Beaker size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Chem_proto<span className="text-lab-orange">_Project</span>
          </span>
        </motion.div>

        {/* Actions (Desktop + Mobile Toggle) */}
        <div className="flex items-center gap-3">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 mr-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 dark:text-slate-300 hover:text-lab-orange dark:hover:text-lab-orange text-[13px] font-semibold transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lab-orange transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href="#advantages"
              className="text-slate-600 dark:text-slate-300 hover:text-lab-orange dark:hover:text-lab-orange text-[13px] font-semibold transition-colors relative group py-2"
            >
              Advantages
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lab-orange transition-all group-hover:w-full" />
            </a>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/20 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/50 text-lab-orange hover:scale-110 transition-all shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-lab-orange"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-800 dark:text-slate-100 hover:text-lab-orange dark:hover:text-lab-orange"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
