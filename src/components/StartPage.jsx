import React, { useEffect } from 'react';
import { Rocket, ArrowRight, Github, Mail } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function GridFlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
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
      <div className="absolute inset-6 rounded-full opacity-60">
        <div className="absolute inset-0 rounded-full" style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, transparent 34%, rgba(16,185,129,0.35) 35%, transparent 36%), repeating-radial-gradient(circle at 50% 50%, rgba(16,185,129,0.25) 0, rgba(16,185,129,0.25) 1px, transparent 1px, transparent 14%)'
        }} />
      </div>
    </motion.div>
  );
}

function ParallaxRings() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute -left-40 -top-40 h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.18), transparent 60%)' }}
        animate={{ x: [0, 10, 0], y: [0, -10, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 bottom-20 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.18), transparent 60%)' }}
        animate={{ x: [0, -8, 0], y: [0, 8, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function FloatingBadges() {
  const items = [
    { label: 'AI/ML', delay: 0 },
    { label: 'FastAPI', delay: 0.2 },
    { label: 'React', delay: 0.4 },
    { label: 'Tailwind', delay: 0.6 },
  ];
  return (
    <div className="pointer-events-none absolute left-6 bottom-10 flex flex-col gap-3">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 py-1 text-xs text-emerald-700 dark:text-emerald-300 shadow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [10, 0, 0, 2, 0] }}
          transition={{ delay: it.delay + 0.4, duration: 1.2 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {it.label}
        </motion.div>
      ))}
    </div>
  );
}

export default function StartPage() {
  return (
    <div className="relative h-screen overflow-hidden bg-white dark:bg-zinc-950 text-emerald-900 dark:text-emerald-100">
      <GridFlowBackground />
      <ParallaxRings />
      <GreenGlobeInteractive />
      <FloatingBadges />

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
          <div className="mt-8 flex flex-wrap items-center gap-4">
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
              Jump to terminal <ArrowRight size={16} />
            </a>
            <a
              href="https://github.com/suhasuppala1805" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-white/80 backdrop-blur px-5 py-2.5 text-emerald-900 hover:border-emerald-400 hover:bg-white transition"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="mailto:suhasuppala1805@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-white/80 backdrop-blur px-5 py-2.5 text-emerald-900 hover:border-emerald-400 hover:bg-white transition"
            >
              <Mail size={16} /> Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
