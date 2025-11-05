import React from 'react';

export default function TitleBar({ title = 'Portfolio — bash', path = '~' }) {
  return (
    <div className="select-none rounded-t-xl bg-[#e9e9eb] dark:bg-zinc-800 border border-b-0 border-zinc-300/70 dark:border-zinc-700/70 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#28c840] border border-black/10" />
        <span className="ml-3 text-xs text-zinc-600 dark:text-zinc-300">{title}</span>
      </div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{path}</div>
    </div>
  );
}
