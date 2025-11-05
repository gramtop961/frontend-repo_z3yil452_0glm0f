import React from 'react';

export default function TitleBar({ title = 'Portfolio — bash', path = '~' }) {
  return (
    <div className="select-none rounded-t-xl bg-emerald-50 dark:bg-zinc-900 border border-b-0 border-emerald-200/70 dark:border-zinc-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#28c840] border border-black/10" />
        <span className="ml-3 text-xs text-emerald-700 dark:text-emerald-200">{title}</span>
      </div>
      <div className="text-xs text-emerald-700/80 dark:text-emerald-300/80">{path}</div>
    </div>
  );
}
