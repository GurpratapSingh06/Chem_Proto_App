import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMaterials } from '../services/api';
import { Plus, Info } from 'lucide-react';

const Ingredients = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await getMaterials();
                setMaterials(response.data);
            } catch (error) {
                console.error("Error fetching materials:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMaterials();
    }, []);

    if (loading) return null;

    const activeItem = materials[activeIndex];

    return (
        <section id="ingredients" className="section-padding relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-[10px] font-bold tracking-[0.3em] text-lab-orange uppercase mb-3 px-1">Chemical Components</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-labfont">Ingredients & Chemistry</h3>
                        <div className="h-1 w-16 bg-lab-orange rounded-full mx-auto" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Left Side: List of Icons */}
                    <div className="md:col-span-4 space-y-3">
                        {materials.map((item, idx) => (
                            <motion.button
                                key={item.id}
                                onClick={() => setActiveIndex(idx)}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`w-full flex items-center gap-4 p-3 rounded-2xl border transition-all duration-300 ${
                                    activeIndex === idx 
                                    ? 'bg-white dark:bg-slate-800 border-lab-orange shadow-xl shadow-orange-100 dark:shadow-orange-900/20 ring-1 ring-lab-orange/20' 
                                    : 'glass-panel border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                                    activeIndex === idx ? 'bg-lab-orange/10' : 'bg-slate-100 dark:bg-slate-800'
                                }`}>
                                    <img src={item.image} alt="" className="w-8 h-8 object-contain" />
                                </div>
                                <span className={`text-xs font-bold truncate ${
                                    activeIndex === idx ? 'text-lab-orange' : 'text-slate-600 dark:text-slate-400'
                                }`}>
                                    {item.name}
                                </span>
                                {activeIndex === idx && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-lab-orange" />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Right Side: Details View (Matching specific image style) */}
                    <div className="md:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.98, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
                            >
                                {/* Decorative circle */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-lab-orange/5 rounded-full -mr-24 -mt-24" />

                                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-6 shrink-0 shadow-inner flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                        <img src={activeItem.image} alt={activeItem.name} className="w-full h-full object-contain" />
                                    </div>
                                    
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{activeItem.name}</h4>
                                            <p className="text-lab-orange font-mono text-sm font-semibold tracking-tight uppercase">Formula: {activeItem.formula}</p>
                                        </div>
                                        
                                        <div className="space-y-4">
                                           <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light transition-colors">
                                              {activeItem.description.split('.')[0]}.
                                           </p>
                                           <div className="space-y-3">
                                              {activeItem.description.split('. ').slice(1).map((point, pidx) => (
                                                 <div key={pidx} className="flex gap-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed group">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-lab-orange/40 mt-1.5 shrink-0 group-hover:bg-lab-orange transition-colors" />
                                                    {point.trim()}
                                                 </div>
                                              ))}
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ingredients;
