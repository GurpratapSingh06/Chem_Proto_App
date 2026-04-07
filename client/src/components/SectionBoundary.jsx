import React from 'react';
import { motion } from 'framer-motion';

const SectionBoundary = () => {
  return (
    <div className="relative w-full h-32 overflow-hidden pointer-events-none -mt-16 z-10">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-[200%] h-full left-0"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,20 2880,60 L2880,120 L0,120 Z"
          fill="currentColor"
          className="text-lab-orange/10 dark:text-lab-orange/5"
          animate={{
            x: [0, -1440],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.path
          d="M0,80 C240,110 480,50 720,80 C960,110 1200,50 1440,80 C1680,110 1920,50 2160,80 C2400,110 2640,50 2880,80 L2880,120 L0,120 Z"
          fill="currentColor"
          className="text-lab-orange/5 dark:text-lab-orange/2"
          animate={{
            x: [-1440, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
      
      {/* Floating chemical "bubbles" */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-lab-orange/20 dark:bg-lab-orange/10 backdrop-blur-[2px]"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              bottom: "-20px",
            }}
            animate={{
              y: [0, -120],
              opacity: [0, 0.6, 0],
              x: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
      
      {/* Subtle line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lab-orange/20 to-transparent" />
    </div>
  );
};

export default SectionBoundary;
