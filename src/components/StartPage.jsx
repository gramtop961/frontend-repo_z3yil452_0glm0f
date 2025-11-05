import React from 'react';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

function GreenAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl"
        animate={{ x: [0, 80, -40, 0], y: [0, -40, 60, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-6rem] left-1/3 h-80 w-80 rounded-full bg-green-500/20 blur-3xl"
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -20, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-16 top-16 h-64 w-64 rounded-full bg-emerald-300/25 blur-3xl"
        animate={{ x: [0, -30, 20, 0], y: [0, 40, -30, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/30" />
    </div>
  );
}

export default function StartPage() {
  return (
    <div className="relative min-h-screen bg-white text-emerald-900">
      <GreenAnimation />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Interactive Portfolio
          </span>
          <h1 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-tight text-emerald-900">
            Explore my world of projects in a terminal experience
          </h1>
          <p className="mt-4 text-lg text-emerald-800/80">
            A clean, green aesthetic with an interactive, bash-like terminal to browse projects, skills, and achievements.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a
              href="#/terminal"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:bg-emerald-800 transition"
            >
              <Rocket size={18} /> View more
            </a>
            <a
              href="#/terminal"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-5 py-2.5 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-50 transition"
            >
              Jump to terminal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
