import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMedia } from '../services/api';
import { ZoomIn, X, FileText } from 'lucide-react';

const Diagrams = () => {
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await getMedia();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };
    fetchMedia();
  }, []);

  if (!data) return null;

  return (
    <section id="diagrams" className="py-20 px-4 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-lab-orange uppercase mb-3">Technical Visualization</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-labfont italic">Process Diagrams</h3>
            <div className="h-1 w-16 bg-lab-orange rounded-full" />
          </motion.div>
          <p className="text-slate-500 max-w-md text-sm font-light leading-relaxed">
            Detailed block and flow representations of the liquid soap preparation architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.diagrams.map((diagram, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group"
            >
              <div 
                onClick={() => setSelectedImage(diagram)}
                className="relative aspect-[16/10] rounded-[2rem] overflow-hidden glass-card cursor-zoom-in group-hover:shadow-lab-orange/10 group-hover:border-lab-orange/30 transition-all duration-500"
              >
                <img 
                  src={diagram.image} 
                  alt={diagram.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-lab-orange/0 group-hover:bg-lab-orange/5 transition-colors duration-500" />
                <div className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur rounded-2xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                  <ZoomIn className="text-lab-orange" size={20} />
                </div>
                <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl shadow-md border border-white/20">
                    <FileText size={16} className="text-lab-orange" />
                    <span className="font-bold text-slate-800 text-sm tracking-tight">{diagram.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-slate-900 text-white rounded-full hover:bg-lab-orange transition-colors"
              >
                <X size={24} />
              </button>
              <div className="w-full h-full p-2">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title} 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="p-8 text-center bg-white border-t border-slate-50">
                   <h4 className="text-2xl font-bold text-slate-900">{selectedImage.title}</h4>
                   <p className="text-slate-500 mt-2 font-light">Interactive Technical Reference Diagram</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Diagrams;
