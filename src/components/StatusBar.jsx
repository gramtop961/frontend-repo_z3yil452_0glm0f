import React, { useEffect, useState } from 'react';

export default function StatusBar({ currentPath }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="rounded-b-xl bg-emerald-50 dark:bg-zinc-900 border border-t-0 border-emerald-200/70 dark:border-zinc-800 px-3 py-2 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-200">
      <div className="truncate">{currentPath.length ? '~/' + currentPath.join('/') : '~'}</div>
      <div className="hidden sm:block">Type `help` to see available commands</div>
      <div>{time.toLocaleTimeString()}</div>
    </div>
  );
}
