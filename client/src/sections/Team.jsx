import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const Team = () => {
  const members = [
    {
      name: 'Aditya Patil',
      role: 'Roll No. 317',
      id: '202401040312',
      image: '/Aditya.png' // Add path like '/aditya.png' after placing it in client/public/
    },
    {
      name: 'Gurpratap Singh',
      role: 'Roll No. 321',
      id: '202401040323',
      image: '/Gurpratap.png' // Add path like '/gurpratap.png'
    },
    {
      name: 'Khush Patil',
      role: 'Roll No. 324',
      id: '202401040324',
      image: '/khushh.jpeg' // Add path like '/khush.png'
    },
    {
      name: 'Manas Wadile',
      role: 'Roll No. 326',
      id: '202401040330',
      image: 'manas.jpeg' // Add path like '/manas.png'
    }
  ];

  return (
    <section id="team" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-lab-orange uppercase mb-3 px-1">The Team </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 font-labfont uppercase tracking-tight">Team Members</h3>
            <div className="h-1 w-16 bg-lab-orange rounded-full mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group glass-card rounded-[2rem] p-6 text-center hover:border-lab-orange/40 transition-all duration-500"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-lab-orange/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />
                <div className="relative w-full h-full rounded-full border-2 border-white dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} strokeWidth={1.5} />
                  )}
                </div>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 tracking-tight transition-colors duration-500">{member.name}</h4>
              <p className="text-lab-orange font-mono text-[10px] mb-3">{member.id}</p>
              <p className="text-slate-500 dark:text-slate-400 font-light text-xs transition-colors duration-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
