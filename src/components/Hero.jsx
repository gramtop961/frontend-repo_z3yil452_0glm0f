import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] w-full pt-14 overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/M2rj0DQ6tP7dSzSz/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Green radar tint and sweep overlay (does not block interaction) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-emerald-600/10" />
        {/* Radar sweep ring */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/30"
          style={{ width: 560, height: 560 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(16,185,129,0.18),rgba(16,185,129,0)_60%)] blur-sm" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Suhas Uppala
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-xl">
            Building interactive, performant web experiences. Explore a radar‑inspired globe and a clean, modern interface.
          </p>
        </div>
      </div>
    </section>
  );
}
