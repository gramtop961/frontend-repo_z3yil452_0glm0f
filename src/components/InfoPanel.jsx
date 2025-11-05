import React, { useMemo } from 'react';
import { Folder, FileText, Keyboard, Sparkles } from 'lucide-react';

function Preview({ node, path }) {
  if (!node) {
    return (
      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        Select an item from the tree to preview it here.
      </div>
    );
  }
  if (node.type === 'dir') {
    return (
      <div>
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 mb-2">
          <Folder size={16} />
          <span className="font-medium">Directory</span>
        </div>
        <div className="text-xs text-zinc-600 dark:text-zinc-400">Path: ~/{path.join('/') || ''}</div>
        <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
          Use the sidebar to explore projects. Run <span className="px-1 py-0.5 rounded bg-emerald-100/60 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">tree</span> or{' '}
          <span className="px-1 py-0.5 rounded bg-emerald-100/60 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">ls</span> to list contents.
        </p>
      </div>
    );
  }
  // file
  return (
    <div>
      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 mb-2">
        <FileText size={16} />
        <span className="font-medium">File Preview</span>
      </div>
      <div className="text-xs text-zinc-600 dark:text-zinc-400">Path: ~/{path.join('/')}</div>
      <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-white/70 dark:bg-zinc-900/60 p-3 text-sm text-zinc-800 dark:text-zinc-100 border border-emerald-200/60 dark:border-emerald-900/60 custom-scrollbar max-h-56 overflow-auto">
        {typeof node.content === 'string' ? node.content : JSON.stringify(node.content, null, 2)}
      </pre>
    </div>
  );
}

export default function InfoPanel({ fsRoot, currentPath }) {
  const node = useMemo(() => {
    let n = fsRoot;
    for (const part of currentPath) {
      if (!n || n.type !== 'dir') return null;
      n = n.children[part];
    }
    return n || fsRoot;
  }, [fsRoot, currentPath]);

  return (
    <aside className="hidden lg:flex min-h-0 w-[340px] shrink-0 flex-col border-l border-emerald-100/60 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-zinc-900/40">
      <div className="p-3 border-b border-emerald-100/60 dark:border-emerald-900/60">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-zinc-900/70 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300">
          <Sparkles size={14} /> Quick View
        </div>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-4 custom-scrollbar">
        <div className="rounded-lg border border-emerald-200/60 dark:border-emerald-900/60 bg-white/60 dark:bg-zinc-950/60 p-3">
          <Preview node={node} path={currentPath} />
        </div>

        <div className="rounded-lg border border-emerald-200/60 dark:border-emerald-900/60 bg-white/60 dark:bg-zinc-950/60 p-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 mb-2">
            <Keyboard size={16} />
            <span className="font-medium">Shortcuts</span>
          </div>
          <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
            <li><span className="font-mono text-emerald-600 dark:text-emerald-400">Arrow Up/Down</span> — command history</li>
            <li><span className="font-mono text-emerald-600 dark:text-emerald-400">help</span> — list commands</li>
            <li><span className="font-mono text-emerald-600 dark:text-emerald-400">tree</span> — folder structure</li>
            <li><span className="font-mono text-emerald-600 dark:text-emerald-400">cat &lt;file&gt;</span> — open file</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
