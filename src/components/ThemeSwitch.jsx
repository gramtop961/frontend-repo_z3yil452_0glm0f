import React, { useEffect, useState } from 'react';
import { Moon, Sun, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

// Draggable floating theme switch that can be layered front/back
export default function ThemeSwitch() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [front, setFront] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      className={`fixed top-4 right-4 ${front ? 'z-50' : 'z-10'}`}
      style={{ touchAction: 'none' }}
      aria-label="Theme switch"
    >
      <div className="flex items-center gap-2 rounded-full border border-zinc-200/70 dark:border-zinc-800/70 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-2 py-1 shadow-md">
        <button
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className="inline-flex items-center gap-1 rounded-full bg-zinc-900 text-white dark:bg-emerald-500 dark:text-zinc-900 px-2.5 py-1 text-xs font-medium hover:opacity-90 transition"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />} {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button
          onClick={() => setFront((f) => !f)}
          title={front ? 'Send behind content' : 'Bring to front'}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <Layers size={14} /> {front ? 'Front' : 'Back'}
        </button>
      </div>
    </motion.div>
  );
}
