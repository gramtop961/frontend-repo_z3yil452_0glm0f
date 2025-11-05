import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import TerminalPage from './components/TerminalPage';

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isTerminal = route.startsWith('#/terminal');

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      <main>
        {isTerminal ? (
          <TerminalPage />
        ) : (
          <>
            <Hero />
            <About />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
