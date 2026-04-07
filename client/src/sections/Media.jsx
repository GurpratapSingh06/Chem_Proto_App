import React from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Video } from 'lucide-react';

const MediaSection = () => {
  return (
    <section id="media" className="py-20 px-4 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-lab-orange uppercase mb-3">Media Gallery</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-labfont italic">Lab Photos & Videos</h3>
            <div className="h-1 w-16 bg-lab-orange rounded-full mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-lab-orange/5 rounded-full blur-3xl" />
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden glass-card group-hover:shadow-lab-orange/10 transition-all duration-500">
              <video
                className="w-full h-full object-cover"
                poster="" /* Place holder for video thumbnail*/
                controls
              >
                <source src={`${import.meta.env.BASE_URL}chem_AI.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none group-hover:bg-black/0 transition-all duration-500">
                <div className="bg-white/90 backdrop-blur p-5 rounded-full shadow-2xl scale-110 group-hover:scale-100 transition-all">
                  <Play className="text-lab-orange fill-lab-orange" size={32} />
                </div>
              </div>
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
                <Video size={14} />
                <span>AI Generated Lab Simulation</span>
              </div>
            </div>
            <p className="mt-6 text-slate-500 italic text-center font-light leading-relaxed px-4 text-xs">
              "The process"
            </p>
          </motion.div>

          {/* Image Grid Placeholder */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative aspect-square rounded-[2rem] overflow-hidden glass-panel hover:shadow-xl transition-all"
              >
                <img
                  src={`https://images.unsplash.com/photo-${1581093588401 + i}-4c14b301716b?auto=format&fit=crop&q=80&w=600`}
                  alt="Lab activity"
                  className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute bottom-3 left-3 p-2 bg-white/90 backdrop-blur rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                  <ImageIcon size={14} className="text-slate-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
