import React, { useMemo, useState } from 'react';
import TitleBar from './components/TitleBar';
import FolderTree from './components/FolderTree';
import Terminal from './components/Terminal';
import StatusBar from './components/StatusBar';

export default function App() {
  const fsRoot = useMemo(
    () => ({
      type: 'dir',
      children: {
        'about.txt': {
          type: 'file',
          content:
            "Hi, I'm Your Name — a frontend-focused full‑stack developer. I design and build fast, accessible web apps with React, TypeScript, and Python backends.\n\nWhat I care about:\n- Clean design and great UX\n- Performance and accessibility\n- Clear, maintainable code\n\nUse `projects` to see highlights or browse the folders with `ls`, `cd`, and `tree`.",
        },
        'skills.txt': {
          type: 'file',
          content:
            '- Languages: JavaScript/TypeScript, Python, SQL\n- Frontend: React, Vite, Tailwind, Framer Motion\n- Backend: FastAPI, Node, REST\n- Cloud/Tools: Docker, Vercel, Git, CI/CD',
        },
        projects: {
          type: 'dir',
          children: {
            'terminal-portfolio': {
              type: 'dir',
              children: {
                'README.md': {
                  type: 'file',
                  content:
                    '# Terminal Portfolio\nA mac-style, terminal-themed portfolio where visitors explore using bash-like commands. Built with React, Tailwind, and lots of polish.',
                },
              },
            },
            'realtime-chat': {
              type: 'dir',
              children: {
                'README.md': {
                  type: 'file',
                  content:
                    '# Realtime Chat\nSocket-powered chat app with rooms, message status, and playful UI.',
                },
              },
            },
            'ai-notes': {
              type: 'dir',
              children: {
                'README.md': {
                  type: 'file',
                  content:
                    '# AI Notes\nA smart notes app that summarizes, tags, and links ideas using LLMs. Fast and minimal.',
                },
              },
            },
          },
        },
        'contact.txt': {
          type: 'file',
          content:
            'Email: you@example.com\nLinkedIn: linkedin.com/in/your-handle\nGitHub: github.com/your-handle',
        },
      },
    }),
    []
  );

  const [currentPath, setCurrentPath] = useState([]); // array of strings from root '~'

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Terminal Portfolio</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">Explore using familiar bash commands in a mac-style window.</p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg shadow-black/5">
          <TitleBar title="bash — portfolio" path={currentPath.length ? '~/' + currentPath.join('/') : '~'} />
          <div className="grid grid-cols-12 gap-0 bg-white dark:bg-zinc-950 border-x border-zinc-300/70 dark:border-zinc-700/70">
            <aside className="hidden md:block col-span-3 border-r border-zinc-200/70 dark:border-zinc-800/70 bg-[#fbfbfc] dark:bg-zinc-950/40">
              <FolderTree fsRoot={fsRoot} currentPath={currentPath} onNavigate={setCurrentPath} />
            </aside>
            <main className="col-span-12 md:col-span-9">
              <Terminal fsRoot={fsRoot} currentPath={currentPath} setCurrentPath={setCurrentPath} />
            </main>
          </div>
          <StatusBar currentPath={currentPath} />
        </div>
      </div>
    </div>
  );
}
