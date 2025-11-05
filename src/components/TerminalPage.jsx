import { useEffect, useRef, useState } from 'react';
import { Clock, CornerDownLeft } from 'lucide-react';

const PROMPT = '$';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString();
}

function Line({ children }) {
  return <div className="leading-6 text-emerald-100/90">{children}</div>;
}

export default function TerminalPage() {
  const [history, setHistory] = useState([
    'Welcome to the web terminal. Type "help" to see available commands.'
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const time = useClock();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands = {
    help: () => (
      'Commands: help, clear, whoami, echo <text>, ls, about' 
    ),
    clear: () => {
      setHistory([]);
      return null;
    },
    whoami: () => 'Suhas Uppala',
    echo: (args) => args.join(' '),
    ls: () => 'projects  notes  playground',
    about: () => 'Frontend engineer crafting interactive, performant web experiences.'
  };

  function runCommand(raw) {
    const line = raw.trim();
    if (!line) return;
    const [cmd, ...args] = line.split(/\s+/);
    const fn = commands[cmd];
    if (!fn) {
      setHistory((h) => [...h, `${PROMPT} ${line}`, `Command not found: ${cmd}`]);
      return;
    }
    const result = fn(args);
    if (result === null) return; // clear already handled
    if (typeof result === 'string') {
      setHistory((h) => [...h, `${PROMPT} ${line}`, result]);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    runCommand(input);
    setInput('');
  }

  return (
    <section className="pt-14 min-h-screen bg-neutral-950 text-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-xl overflow-hidden border border-emerald-400/20 bg-gradient-to-b from-neutral-900/60 to-neutral-900/80">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 h-10 border-b border-emerald-400/10 bg-neutral-900/70">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-3 text-sm text-emerald-100/80">Terminal — Suhas Uppala</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-100/60">
              <Clock className="w-3.5 h-3.5" /> {time}
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-4 font-mono text-sm min-h-[50vh] custom-scrollbar">
            {history.map((line, i) => (
              <Line key={i}>{line}</Line>
            ))}
            <form onSubmit={onSubmit} className="flex items-center gap-2 mt-1">
              <span className="text-emerald-300">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-emerald-50 placeholder:text-emerald-100/40"
                placeholder="type a command and press enter"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-600/20 text-emerald-200 hover:bg-emerald-600/30 border border-emerald-500/30"
              >
                <CornerDownLeft className="w-4 h-4" /> Enter
              </button>
            </form>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-4 h-9 border-t border-emerald-400/10 text-xs text-emerald-100/70 bg-neutral-900/70">
            <span>Type "help" for commands</span>
            <span>~/portfolio</span>
          </div>
        </div>
      </div>
    </section>
  );
}
