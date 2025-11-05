import React, { useEffect, useState } from 'react';
import StartPage from './components/StartPage';
import TerminalPage from './components/TerminalPage';

function useHashRoute() {
  const [route, setRoute] = useState(() => (window.location.hash.replace('#', '') || '/'));
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();
  if (route.startsWith('/terminal')) return <TerminalPage />;
  return <StartPage />;
}
