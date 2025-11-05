import React, { useEffect, useState } from 'react';

export default function StatusBar({ currentPath }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="rounded-b-xl bg-[#f7f7f8] dark:bg-zinc-900 border border-t-0 border-zinc-300/70 dark:border-zinc-700/70 px-3 py-2 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
      <div className="truncate">{currentPath.length ? '~/' + currentPath.join('/') : '~'}</div>
      <div className="hidden sm:block">Type `help` to see available commands</div>
      <div>{time.toLocaleTimeString()}</div>
    </div>
  );
}
