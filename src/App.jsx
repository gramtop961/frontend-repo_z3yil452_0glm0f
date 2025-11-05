import React, { useEffect, useState } from 'react';
import StartPage from './components/StartPage';
import TerminalPage from './components/TerminalPage';
import ThemeSwitch from './components/ThemeSwitch';

function useHashRoute() {
  const [route, setRoute] = useState(() => (window.location.hash.replace('#', '') || '/'));
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return route;
}

function ScrollbarStyles() {
  return (
    <style>{`
      .custom-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(100,116,139,0.6) transparent; }
      .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(100,116,139,0.6); border-radius: 9999px; border: 3px solid transparent; background-clip: padding-box; }
      .custom-scrollbar.dark::-webkit-scrollbar-thumb { background-color: rgba(148,163,184,0.6); }
    `}</style>
  );
}

export default function App() {
  const route = useHashRoute();
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <ScrollbarStyles />
      <ThemeSwitch />
      {route.startsWith('/terminal') ? <TerminalPage /> : <StartPage />}
    </div>
  );
}
