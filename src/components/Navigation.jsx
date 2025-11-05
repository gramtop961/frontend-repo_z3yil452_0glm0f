import React from 'react';
import { Home, TerminalSquare } from 'lucide-react';

export default function Navigation() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <nav className="mx-auto mt-3 w-[min(96%,1120px)] rounded-full border border-emerald-200/60 bg-white/80 backdrop-blur dark:border-emerald-900/60 dark:bg-zinc-900/70 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 text-sm">
          <a href="#/" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-zinc-800 transition">
            <Home size={16} />
            <span>Home</span>
          </a>
          <div className="flex items-center gap-2">
            <a href="#/terminal" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition">
              <TerminalSquare size={16} />
              <span>Terminal</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
