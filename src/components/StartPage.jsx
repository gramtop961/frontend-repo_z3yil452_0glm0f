import React, { useEffect } from 'react';
import { Rocket } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function GridFlowBackground() {
  // Two-layer green grid that drifts linearly
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Thin grid lines */}
      <motion.div
        className="absolute inset-0 opacity-40 dark:opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.22) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        animate={{ backgroundPositionX: ['0px', '64px'], backgroundPositionY: ['0px', '64px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      {/* Soft glow sweep */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,0.2), transparent 60%)' }}
        animate={{ backgroundPositionX: ['0%', '100%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function GreenGlobeInteractive() {
  // Cursor-reactive green globe with subtle parallax and float
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const translateX = useTransform(sx, (v) => `${v * 0.04}px`);
  const translateY = useTransform(sy, (v) => `${v * 0.04}px`);

  useEffect(() => {
    function onMove(e) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(e.clientX - cx);
      my.set(e.clientY - cy);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <motion.div
      className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 h-[60vmin] w-[60vmin]"
      style={{ translateX, translateY }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(16,185,129,0.6), rgba(52,211,153,0.2) 40%, transparent 60%)',
          filter: 'blur(10px)'
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-emerald-300/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      {/* Lat/long lines */}
      <div className="absolute inset-6 rounded-full opacity-60">
        <div className="absolute inset-0 rounded-full" style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, transparent 34%, rgba(16,185,129,0.35) 35%, transparent 36%), repeating-radial-gradient(circle at 50% 50%, rgba(16,185,129,0.25) 0, rgba(16,185,129,0.25) 1px, transparent 1px, transparent 14%)'
        }} />
      </div>
    </motion.div>
  );
}

export default function StartPage() {
  return (
    <div className="relative h-screen overflow-hidden bg-white dark:bg-zinc-950 text-emerald-900 dark:text-emerald-100">
      {/* Green grid background (no 3D scene) */}
      <GridFlowBackground />
      <GreenGlobeInteractive />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6 pt-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/70 dark:border-emerald-400/30 dark:bg-emerald-950/40 px-3 py-1 text-emerald-700 dark:text-emerald-200 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Interactive Portfolio
          </span>
          <h1 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-tight">
            Explore my world of projects in a terminal experience
          </h1>
          <p className="mt-4 text-lg text-emerald-900/80 dark:text-emerald-100/80">
            A clean, green aesthetic with an interactive, bash-like terminal to browse projects, skills, and achievements.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a
              href="#/terminal"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-600 active:bg-emerald-700 transition"
            >
              <Rocket size={18} /> View more
            </a>
            <a
              href="#/terminal"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-white/80 backdrop-blur px-5 py-2.5 text-emerald-900 hover:border-emerald-400 hover:bg-white transition"
            >
              Jump to terminal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
