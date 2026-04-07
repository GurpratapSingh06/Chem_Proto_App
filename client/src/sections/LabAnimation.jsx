import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  Beaker, Flame, Thermometer, Filter, CheckCircle2,
  Play, RefreshCw, Layers, Droplets, RotateCw,
} from 'lucide-react';

/* ─── colour tokens (no custom Tailwind needed) ─── */
const C = {
  bg: '#0d1526',
  card: 'rgba(22,36,65,0.85)',
  border: 'rgba(255,255,255,0.08)',
  orange: '#f97316',
  orangeBg: 'rgba(249,115,22,0.12)',
  orangeBd: 'rgba(249,115,22,0.35)',
};

/* ─── reusable beaker primitive (pure SVG) ─── */
const BeakerSVG = ({
  x = 0, y = 0, w = 120, h = 180,
  liquidColor = '#3b82f6',
  liquidFraction = 0.7,
  animateFill = false,
  fillDelay = 1.2,
}) => {
  const lh = h * liquidFraction;
  const ly = y + h - lh;
  const br = w * 0.18;

  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="rgba(255,255,255,0.03)" />
      {animateFill ? (
        <motion.rect
          x={x + 3} width={w - 6} fill={liquidColor}
          initial={{ height: 0, y: y + h }}
          animate={{ height: lh, y: ly }}
          transition={{ duration: 2.2, ease: 'easeInOut', delay: fillDelay }}
        />
      ) : (
        lh > 0 && <rect x={x + 3} y={ly} width={w - 6} height={lh} fill={liquidColor} />
      )}
      <rect x={x} y={y} width={w} height={h}
        fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
      <rect x={x} y={y + h} width={w} height={br} rx={br / 2}
        fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
      <line x1={x + 6} y1={y + 8} x2={x + 6} y2={y + h - 10}
        stroke="rgba(255,255,255,0.15)" strokeWidth="3.5" strokeLinecap="round" />
      {[0.28, 0.44, 0.60, 0.76, 0.92].map((f, i) => {
        const my = y + h * (1 - f);
        return <line key={i}
          x1={x} y1={my} x2={x + (i % 2 === 0 ? 14 : 9)} y2={my}
          stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />;
      })}
    </g>
  );
};

/* ════════════════════════════════════════════════════════
   MixingPourScene — self-contained pouring + receiving beaker
   Source beaker: upright at (170, 24, 67×88), rim at (165, 18, 77×12)
   Pivot (bottom-right corner): (237, 112)
   Tilt: −50° CCW → left rim (spout) swings downward
   Pouring lip = bottom-left of rim (165, 30)
   After −50° around (237,112):
     dx=165−237=−72  dy=30−112=−82
     x'=237+(−72·cos50°)−(−82·sin50°) ≈ 128
     y'=112+(−72·(−sin50°))+(−82·cos50°) ≈ 114
   Stream: M 128 114 Q 139 131 150 148
════════════════════════════════════════════════════════ */
const MixingPourScene = ({ color = '#fbbf24', showBadge = false }) => {
  // Drive rotation via native SVG transform attribute (NOT CSS)
  const gRef = useRef(null);
  const deg = useMotionValue(0);
  const beakerTransform = useTransform(deg, v => `rotate(${v}, 237, 112)`);

  useEffect(() => {
    // Animate the rotation
    const controls = animate(deg, -50, { duration: 1.0, ease: 'easeInOut' });
    // Subscribe to transform changes and update the DOM attribute directly
    const unsub = beakerTransform.on('change', v => {
      if (gRef.current) gRef.current.setAttribute('transform', v);
    });
    return () => { controls.stop; unsub(); };
  }, []);

  // Droplet waypoints along the stream (lip → main beaker mouth)
  const dropPts = [
    { x: 128, y: 114 },
    { x: 134, y: 124 },
    { x: 142, y: 136 },
    { x: 150, y: 148 },
  ];

  return (
    <svg viewBox="0 0 300 330" width="300" height="330" fill="none">

      {/* ═══ RECEIVING (MAIN) BEAKER ═══ */}
      {/* liquid fill — rendered BEFORE walls so walls paint on top */}
      <motion.rect
        x={78} width={144} rx="0"
        fill={color}
        initial={{ height: 0, y: 310 }}
        animate={{ height: 155, y: 155 }}
        transition={{ duration: 2.2, ease: 'easeInOut', delay: 1.2 }}
      />
      {/* beaker structure (walls, graduation, base) */}
      <BeakerSVG x={75} y={128} w={150} h={182}
        liquidColor={color}
        liquidFraction={0}
      />

      {/* splash particles at surface — delayed to match fill */}
      {[0, 1, 2, 3].map(i => (
        <motion.circle key={i}
          cx={106 + i * 24} cy={155} r="4" fill={color}
          initial={{ opacity: 0 }}
          animate={{ cy: [155, 130 - i * 7], opacity: [1, 0], r: [4, 1] }}
          transition={{ repeat: Infinity, duration: 0.65, delay: 1.2 + i * 0.13, ease: 'easeOut' }}
        />
      ))}
      {/* ripple at liquid surface */}
      <motion.ellipse cx="150" cy="153" rx="70" ry="6"
        fill="rgba(255,255,255,0.14)"
        initial={{ opacity: 0 }}
        animate={{ ry: [5, 10, 5], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.1, delay: 1.2 }}
      />

      {/* ═══ SOURCE (POURING) BEAKER ═══
           Native SVG transform attribute via ref — rotate(angle, 237, 112)
           Uses viewBox coords directly, no CSS coordinate issues */}
      <g ref={gRef}>
        {/* liquid draining — rendered BEFORE walls */}
        <motion.rect x={174} y={28} width={59} height={80} rx="2"
          fill={color}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0.03 }}
          transition={{ duration: 3.0, ease: 'easeInOut', delay: 0.4 }}
          style={{ transformOrigin: '206px 108px' }}
        />
        {/* beaker body */}
        <rect x={170} y={24} width={67} height={88} rx="4"
          fill="rgba(13,21,38,0.92)"
          stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" />
        {/* rim */}
        <rect x={165} y={18} width={77} height={12} rx="5"
          fill="rgba(13,21,38,0.95)"
          stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        {/* graduation line */}
        <line x1={177} y1={30} x2={177} y2={104}
          stroke="rgba(255,255,255,0.1)" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* ═══ STREAM from lip → main beaker mouth ═══ */}
      <motion.path
        d="M 128 114 Q 139 131 150 148"
        stroke={color} strokeWidth="8" strokeLinecap="round" fill="transparent"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.95 }}
      />

      {/* ═══ ANIMATED DROPLETS along stream ═══ */}
      {[0, 0.3, 0.6].map((del, i) => (
        <motion.circle key={i} r={i === 0 ? 5 : 3.5} fill={color}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            cx: [dropPts[0].x, dropPts[1].x, dropPts[2].x, dropPts[3].x],
            cy: [dropPts[0].y, dropPts[1].y, dropPts[2].y, dropPts[3].y],
          }}
          transition={{ duration: 0.6, delay: 1.0 + del, repeat: Infinity, ease: 'easeIn' }}
        />
      ))}

      {/* ═══ SUCCESS BADGE (Final Product only) ═══ */}
      {showBadge && (
        <motion.g
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, type: 'spring', stiffness: 220 }}
          style={{ transformOrigin: '270px 40px' }}
        >
          <circle cx="270" cy="40" r="20"
            fill="rgba(34,197,94,0.16)"
            stroke="rgba(34,197,94,0.6)" strokeWidth="2" />
          <text x="270" y="46" textAnchor="middle" fontSize="18" fill="#22c55e" fontWeight="800">✓</text>
        </motion.g>
      )}
    </svg>
  );
};

/* ════════════════════════════════════════════════════════
   Main component
════════════════════════════════════════════════════════ */
const LabAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    { id: 0, label: 'Initial State', Icon: Beaker },
    { id: 1, label: 'Mixing 1', Icon: Layers },
    { id: 2, label: 'Mixing 2', Icon: Droplets },
    { id: 3, label: 'Stirring', Icon: RotateCw },
    { id: 4, label: 'Heating', Icon: Flame },
    { id: 5, label: 'Cooling', Icon: Thermometer },
    { id: 6, label: 'Filtration', Icon: Filter },
    { id: 7, label: 'Final Product', Icon: CheckCircle2 },
  ];

  const descriptions = [
    'Experimental simulation ready. Click play to begin.',
    'Adding SLS and NaOH: Creating the surfactant base in pure distilled water.',
    'Integrating Glycerol and Castor Oil: Enhancing moisturizing and lathering properties.',
    'Emulsification: High-speed mechanical stirring to achieve molecular homogeneity.',
    'Thermal activation: Applying steady heat to initiate saponification.',
    'Stabilization: Controlled thermal reduction to allow chemical structures to set.',
    'Purification: Multi-stage gravity filtration through a high-precision glass funnel.',
    'Synthesis Complete: Final product successfully formulated and analyzed.',
  ];

  useEffect(() => {
    let t;
    if (isPlaying)
      t = setInterval(() =>
        setCurrentStep(p => p < steps.length - 1 ? p + 1 : 0), 5000);
    return () => clearInterval(t);
  }, [isPlaying, steps.length]);

  return (
    <section
      id="animation"
      style={{ background: C.bg, padding: '64px 16px', position: 'relative', overflow: 'hidden' }}
    >
      {/* faint decorative rings */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: 40, left: 40, width: 240, height: 240,
          borderRadius: '50%', border: '1px solid white'
        }} />
        <div style={{
          position: 'absolute', bottom: 40, right: 40, width: 360, height: 360,
          borderRadius: '50%', border: '1px solid white'
        }} />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── heading ── */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
            color: C.orange, textTransform: 'uppercase', marginBottom: 10
          }}>
            Live Simulation
          </p>
          <h3 style={{
            fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800,
            color: '#fff', margin: '0 0 14px'
          }}>
            Interactive Lab Animation
          </h3>
          <p style={{
            color: '#94a3b8', maxWidth: 480, margin: '0 auto',
            fontSize: 15, lineHeight: 1.7
          }}>
            Witness the chemical transformation in real-time. Each stage represents
            a critical phase in the preparation process.
          </p>
        </div>

        {/* ── two-panel layout ── */}
        <div style={{
          display: 'flex', gap: 20, alignItems: 'stretch',
          flexWrap: 'wrap'
        }}>

          {/* ═══ LEFT CARD: steps list ═══ */}
          <div style={{ width: 240, flexShrink: 0 }}>
            <div style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 24,
              padding: 20,
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              backdropFilter: 'blur(16px)',
            }}>
              {/* header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Process Steps</span>
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  style={{
                    width: 34, height: 34, borderRadius: '50%', border: 'none',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isPlaying ? C.orange : '#fff',
                    color: isPlaying ? '#fff' : '#0f172a',
                    flexShrink: 0,
                  }}
                >
                  {isPlaying
                    ? <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    : <Play size={15} fill="currentColor" />}
                </button>
              </div>

              {/* step rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                {steps.slice(1).map(({ id, label, Icon }) => {
                  const active = currentStep === id;
                  return (
                    <motion.div
                      key={id}
                      onClick={() => { setIsPlaying(false); setCurrentStep(id); }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 12px', borderRadius: 12, cursor: 'pointer',
                        border: `1px solid ${active ? C.orangeBd : 'transparent'}`,
                        background: active ? C.orangeBg : 'rgba(255,255,255,0.04)',
                        color: active ? C.orange : '#94a3b8',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span style={{
                        padding: 6, borderRadius: 8, flexShrink: 0,
                        background: active ? C.orange : '#1e293b',
                        color: active ? '#fff' : '#64748b',
                        display: 'flex',
                      }}>
                        <Icon size={13} />
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>{label}</span>
                      {active && (
                        <motion.span layoutId="dot" style={{
                          width: 7, height: 7, borderRadius: '50%',
                          background: C.orange, flexShrink: 0,
                          boxShadow: `0 0 8px ${C.orange}`,
                        }} />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══ RIGHT CARD: animation ═══ */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 24,
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              backdropFilter: 'blur(16px)',
            }}>

              {/* phase label */}
              <div style={{
                padding: '18px 24px 14px',
                borderBottom: `1px solid ${C.border}`,
                flexShrink: 0,
              }}>
                <AnimatePresence mode="wait">
                  <motion.div key={`lbl-${currentStep}`}
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.25 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                  >
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                      color: '#60a5fa', textTransform: 'uppercase',
                      background: 'rgba(30,58,138,0.35)',
                      border: '1px solid rgba(96,165,250,0.2)',
                      padding: '3px 10px', borderRadius: 99, flexShrink: 0,
                    }}>
                      Phase {currentStep + 1} of 8
                    </span>
                    <span style={{
                      fontSize: 18, fontWeight: 900, color: '#fff',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {steps[currentStep].label}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* SVG canvas */}
              <div style={{
                flex: 1, position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 320,
              }}>
                <AnimatePresence mode="wait">
                  <motion.div key={`scene-${currentStep}`}
                    initial={{ opacity: 0, scale: 0.88, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -14 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 140 }}
                    style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >

                    {/* ──── STEP 0: Initial State ──── */}
                    {currentStep === 0 && (
                      <svg viewBox="0 0 260 300" width="220" height="280" fill="none">
                        <BeakerSVG x={60} y={40} w={140} h={210} liquidFraction={0} />
                        <text x="130" y="160" textAnchor="middle"
                          fill="rgba(255,255,255,0.18)" fontSize="12" fontFamily="monospace">
                          empty
                        </text>
                      </svg>
                    )}

                    {/* ──── STEPS 1 & 2: Mixing ────
                        Source beaker upright at (195,20,60×80)
                        Pivot bottom-left (195,100), tilts +55° CW
                        Stream from rotated rim ≈(218,68) → (152,153)
                    ─────────────────────────────── */}
                    {(currentStep === 1 || currentStep === 2) && (
                      <MixingPourScene
                        color={currentStep === 1 ? '#fbbf24' : '#22c55e'}
                      />
                    )}

                    {/* ──── STEP 3: Stirring ──── */}
                    {currentStep === 3 && (
                      <svg viewBox="0 0 260 340" width="240" height="310" fill="none">
                        <motion.g
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 0.95, ease: 'easeInOut' }}
                          style={{ transformOrigin: '130px 38px' }}
                        >
                          <rect x="126" y="28" width="8" height="262" rx="4"
                            fill="rgba(255,255,255,0.08)"
                            stroke="rgba(255,255,255,0.52)" strokeWidth="1.6" />
                          <line x1="128" y1="30" x2="128" y2="288"
                            stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                          <ellipse cx="130" cy="30" rx="6" ry="4"
                            fill="rgba(255,255,255,0.16)"
                            stroke="rgba(255,255,255,0.62)" strokeWidth="1.6" />
                          <ellipse cx="130" cy="288" rx="6" ry="3.5"
                            fill="rgba(255,255,255,0.16)"
                            stroke="rgba(255,255,255,0.48)" strokeWidth="1.5" />
                          {[95, 138, 182, 228].map((y, i) => (
                            <line key={i}
                              x1={i % 2 === 0 ? 126 : 129} y1={y} x2={134} y2={y}
                              stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                          ))}
                          <motion.ellipse cx="130" cy="270" rx="4" ry="2"
                            fill="transparent" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"
                            animate={{ cy: [270, 160, 270] }}
                            transition={{ repeat: Infinity, duration: 0.95, ease: 'easeInOut' }}
                          />
                        </motion.g>
                        <BeakerSVG x={60} y={100} w={140} h={200}
                          liquidColor="#3b82f6" liquidFraction={0.7} />
                        <motion.ellipse cx="130" cy="103" rx="68" ry="6"
                          fill="rgba(255,255,255,0.1)"
                          animate={{ ry: [5, 11, 5], scaleX: [1, 0.82, 1] }}
                          transition={{ repeat: Infinity, duration: 0.48 }}
                        />
                      </svg>
                    )}

                    {/* ──── STEP 4: Heating ──── */}
                    {currentStep === 4 && (
                      <svg viewBox="0 0 260 370" width="240" height="340" fill="none">
                        <BeakerSVG x={60} y={44} w={140} h={198}
                          liquidColor="#ef4444" liquidFraction={0.7} />
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                          <motion.circle key={i}
                            cx={66 + i * 14} cy={236} r={1.5 + (i % 3) * 0.8}
                            fill="rgba(255,255,255,0.28)"
                            animate={{ cy: [236, 54], opacity: [0.8, 0] }}
                            transition={{ repeat: Infinity, duration: 0.5 + i * 0.065, delay: i * 0.09, ease: 'easeOut' }}
                          />
                        ))}
                        <motion.ellipse cx="130" cy="105" rx="68" ry="5"
                          fill="rgba(255,160,0,0.18)"
                          animate={{ opacity: [0.18, 0.5, 0.18] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                        />
                        {/* Bunsen burner */}
                        <motion.ellipse cx="130" cy="270" rx="13" ry="20" fill="rgba(96,165,250,0.5)"
                          animate={{ ry: [20, 26, 18, 24, 20], rx: [13, 10, 15, 11, 13], cy: [270, 266, 272, 267, 270] }}
                          transition={{ repeat: Infinity, duration: 0.44 }} />
                        <motion.ellipse cx="130" cy="273" rx="9" ry="15" fill="rgba(251,146,60,0.9)"
                          animate={{ ry: [15, 20, 13, 18, 15], rx: [9, 7, 11, 8, 9], cy: [273, 268, 275, 270, 273] }}
                          transition={{ repeat: Infinity, duration: 0.37 }} />
                        <motion.ellipse cx="130" cy="277" rx="4.5" ry="9" fill="rgba(254,240,138,0.98)"
                          animate={{ ry: [9, 12, 8, 11, 9], cy: [277, 273, 279, 274, 277] }}
                          transition={{ repeat: Infinity, duration: 0.31 }} />
                        <motion.ellipse cx="130" cy="289" rx="18" ry="4" fill="rgba(251,146,60,0.2)"
                          animate={{ opacity: [0.2, 0.45, 0.18, 0.42, 0.2] }}
                          transition={{ repeat: Infinity, duration: 0.44 }} />
                        <rect x="122" y="289" width="16" height="28" rx="3"
                          fill="#0f172a" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                        <rect x="124" y="291" width="3" height="24" rx="1.5"
                          fill="rgba(255,255,255,0.09)" />
                        <rect x="120" y="307" width="20" height="7" rx="3"
                          fill="#0a1020" stroke="rgba(255,255,255,0.26)" strokeWidth="1.5" />
                        <rect x="126" y="309" width="3" height="4" rx="1" fill="rgba(255,255,255,0.14)" />
                        <rect x="131" y="309" width="3" height="4" rx="1" fill="rgba(255,255,255,0.14)" />
                        <rect x="106" y="316" width="48" height="10" rx="5"
                          fill="#0a1020" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                        <rect x="82" y="319" width="26" height="5" rx="2.5"
                          fill="#0a1020" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                        <circle cx="84" cy="321.5" r="4"
                          fill="#0f172a" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
                        <circle cx="84" cy="321.5" r="1.5" fill="rgba(255,255,255,0.2)" />
                      </svg>
                    )}

                    {/* ──── STEP 5: Cooling ──── */}
                    {currentStep === 5 && (
                      <svg viewBox="0 0 260 300" width="220" height="280" fill="none">
                        <BeakerSVG x={60} y={40} w={140} h={210}
                          liquidColor="#ef4444" liquidFraction={0} />
                        <motion.rect x={63} y={95} width={134} height={152} rx="0"
                          initial={{ fill: '#ef4444' }}
                          animate={{ fill: '#3b82f6' }}
                          transition={{ duration: 5, ease: 'easeInOut' }}
                          opacity="0.88"
                        />
                        <motion.ellipse cx="130" cy="97" rx="65" ry="5"
                          fill="rgba(186,230,253,0.25)"
                          animate={{ opacity: [0.2, 0.55, 0.2], ry: [4, 8, 4] }}
                          transition={{ repeat: Infinity, duration: 1.8 }}
                        />
                        {[0, 1, 2].map(i => (
                          <motion.text key={i} x={82 + i * 28} y={86}
                            textAnchor="middle" fontSize="14" fill="rgba(186,230,253,0.8)"
                            animate={{ y: [86, 62], opacity: [0.9, 0] }}
                            transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.45 }}
                          >❄</motion.text>
                        ))}
                      </svg>
                    )}

                    {/* ──── STEP 6: Filtration ──── */}
                    {currentStep === 6 && (
                      <svg viewBox="0 0 280 360" width="260" height="340" fill="none">
                        {/* ring stand */}
                        <line x1="28" y1="10" x2="28" y2="348"
                          stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
                        <rect x="8" y="338" width="40" height="10" rx="5"
                          fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
                        <line x1="28" y1="92" x2="84" y2="92"
                          stroke="rgba(255,255,255,0.2)" strokeWidth="3.5" strokeLinecap="round" />
                        <circle cx="84" cy="99" r="18"
                          fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="3.5" />
                        {/* funnel cone */}
                        <path d="M 50 52 L 140 52 L 108 128 L 82 128 Z"
                          fill="rgba(186,230,253,0.08)"
                          stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinejoin="round" />
                        <line x1="48" y1="52" x2="142" y2="52"
                          stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" />
                        <line x1="95" y1="55" x2="82" y2="126"
                          stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <line x1="95" y1="55" x2="108" y2="126"
                          stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <line x1="56" y1="57" x2="73" y2="124"
                          stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                        <motion.path d="M 60 70 L 130 70 L 106 126 L 84 126 Z"
                          fill="rgba(59,130,246,0.4)"
                          animate={{ opacity: [0.4, 0.22, 0.4] }}
                          transition={{ repeat: Infinity, duration: 2.2 }} />
                        {/* stem */}
                        <rect x="82" y="128" width="26" height="72" rx="4"
                          fill="rgba(186,230,253,0.08)"
                          stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" />
                        <line x1="86" y1="131" x2="86" y2="197"
                          stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <motion.rect x="90" y="130" width="8" height="68" rx="3"
                          fill="rgba(59,130,246,0.42)"
                          animate={{ scaleY: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
                          style={{ transformOrigin: '94px 130px' }} />
                        <motion.circle cx="95" cy="203" r="5"
                          fill="rgba(59,130,246,0.72)"
                          animate={{ cy: [203, 248], opacity: [1, 0], r: [5, 3] }}
                          transition={{ repeat: Infinity, duration: 0.82, ease: 'easeIn' }} />
                        {/* receiving beaker */}
                        <BeakerSVG x={50} y={250} w={110} h={90}
                          liquidColor="rgba(59,130,246,0.75)"
                          liquidFraction={0.65}
                          animateFill={true} fillDelay={0.5} />
                        <line x1="95" y1="200" x2="95" y2="250"
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth="1" strokeDasharray="3 3" />
                      </svg>
                    )}

                    {/* ──── STEP 7: Final Product ────
                        Uses same MixingPourScene with #93c5fd
                        Plus a success badge overlay
                    ─────────────────────────────── */}
                    {currentStep === 7 && (
                      <MixingPourScene color="#93c5fd" showBadge />
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* description bar */}
              <div style={{ padding: '0 20px 20px', flexShrink: 0 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={`desc-${currentStep}`}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                    style={{
                      background: 'rgba(0,0,0,0.35)',
                      border: `1px solid ${C.border}`,
                      borderRadius: 16, padding: '12px 20px',
                    }}
                  >
                    <p style={{
                      color: 'rgba(255,255,255,0.72)', fontStyle: 'italic',
                      fontSize: 13, textAlign: 'center', lineHeight: 1.65, margin: 0,
                    }}>
                      {descriptions[currentStep]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>{/* end flex row */}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default LabAnimation;
