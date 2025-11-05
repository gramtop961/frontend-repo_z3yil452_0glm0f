import { Github, Home, Terminal } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30 border-b border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#/" className="font-semibold tracking-tight text-gray-900 dark:text-white text-lg">
          Suhas Uppala
        </a>
        <nav className="flex items-center gap-2">
          <a
            href="#/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </a>
          <a
            href="#/terminal"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <Terminal className="w-4 h-4" />
            <span className="text-sm">Terminal</span>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
