import React from 'react';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

function GridFlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,rgba(0,0,0,0.6)_60%,transparent)]">
      <div className="absolute inset-0 opacity-20 dark:opacity-30" style={{ backgroundImage: `linear-gradient(rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.15) 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
      <motion.div
        className="absolute inset-0 opacity-25"
        animate={{ backgroundPositionX: ['0%', '100%'], backgroundPositionY: ['0%', '100%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundImage: 'radial-gradient(closest-side, rgba(16,185,129,0.25), transparent 70%)', backgroundSize: '60% 60%' }}
      />
    </div>
  );
}

function GreenGlobe() {
  return (
    <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[60vmin] w-[60vmin]">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(16,185,129,0.4), rgba(52,211,153,0.2), rgba(16,185,129,0.4))',
          filter: 'blur(24px)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-emerald-300/40"
        animate={{ scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function StartPage() {
  return (
    <div className="relative h-screen overflow-hidden bg-white dark:bg-zinc-950 text-emerald-900 dark:text-emerald-100">
      {/* Spline cover background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <GridFlowBackground />
      <GreenGlobe />

      {/* Gradient overlay to improve contrast, non-blocking */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/70 dark:border-emerald-400/30 dark:bg-emerald-950/40 px-3 py-1 text-emerald-700 dark:text-emerald-200 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Interactive Portfolio
          </span>
          <h1 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
            Explore my world of projects in a terminal experience
          </h1>
          <p className="mt-4 text-lg text-emerald-100/90">
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
