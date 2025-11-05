import React, { useMemo, useState } from 'react';
import TitleBar from './components/TitleBar';
import FolderTree from './components/FolderTree';
import Terminal from './components/Terminal';
import StatusBar from './components/StatusBar';
import Spline from '@splinetool/react-spline';
import { Github, Linkedin, Mail, Trophy } from 'lucide-react';

export default function App() {
  // Virtual filesystem — simplified per request: only projects folder + single files for about, skills, achievements
  const fsRoot = useMemo(
    () => ({
      type: 'dir',
      children: {
        'about.txt': {
          type: 'file',
          content:
            "I'm Suhas Uppala — a developer passionate about AI/ML and full‑stack apps. I craft interactive, high‑performance experiences with clean design and accessible UX.\n\nContact:\n- GitHub: https://github.com/suhasuppala1805\n- Email: suhasuppala1805@gmail.com\n- LinkedIn: https://www.linkedin.com/in/suhas-uppala",
        },
        'skills.txt': {
          type: 'file',
          content:
            '- Programming: C, C++, Java, R, Python, SQL, JavaScript\n- Web: HTML, CSS, React (Vite), Tailwind, MERN\n- Backend: FastAPI, Node\n- ML/DS: scikit-learn, Pandas, TensorFlow, Keras, NLP, Recommender Systems\n- Data Viz: Power BI, Tableau, R\n- Tools: Git, GitHub, Docker\n- Databases: MySQL, MongoDB, SQLite\n- OS: Windows, Linux',
        },
        'achievements.txt': {
          type: 'file',
          content:
            [
              'Achievements & Roles:',
              '- Winner — GDGC Solution Challenge 2025 (SportAI; RAG, ML, OpenCV, Flutter).',
              '- Smart India Hackathon 2024 — Finalist (Top 2.4% nationwide; Ministry of Communication).',
              '- 2nd Prize — Project Contest & Consolation in Paper Presentation at Convergence 2K25.',
              '- 3rd Place — Project Expo among 100+ teams (CSE‑AIML & IoT, VNRVJIET).',
              '- Selected — Amazon ML Summer School.',
              '',
              'Leadership:',
              '- Non‑Technical Head — CSI Student Chapter, VNR VJIET (1000+ members).',
              '- Superior Design Head — Krithomedh, AIML Club, VNR VJIET (300+ members).',
            ].join('\n'),
        },
        projects: {
          type: 'dir',
          children: {
            'live-object-detection': {
              type: 'dir',
              children: {
                'README.md': {
                  type: 'file',
                  content:
                    'Live Object Detection\n- YOLOv5-based real-time detection on live streams.\n- NLP-driven text commands for targeted tracking.\n- Flask interface with live visualization.',
                },
              },
            },
            'sportai-athlete-platform': {
              type: 'dir',
              children: {
                'README.md': {
                  type: 'file',
                  content:
                    'SportAI – AI-Powered Athlete Management\n- Real-time monitoring using Flutter, FastAPI, OpenCV.\n- 90% posture detection accuracy; 40% injury reduction for 100+ users.\n- Injury prediction (Random Forest across 7 metrics) — 85% early detection.\n- RAG-based AI coaching with LangChain & Gemini API (~1000+ daily requests).',
                },
              },
            },
            'books-hub': {
              type: 'dir',
              children: {
                'README.md': {
                  type: 'file',
                  content:
                    'Books Hub — Personalized Library Manager\n- Full‑stack app for cataloging, borrowing, and returns.\n- Secure auth, efficient database management.\n- Dynamic search, filtering, and accessible UI.',
                },
              },
            },
            'anomaly-detection-cctv': {
              type: 'dir',
              children: {
                'README.md': {
                  type: 'file',
                  content:
                    'Anomaly Detection in CCTV Footage\n- LRCN‑based system for analyzing CCTV streams.\n- Detects suspicious activity and triggers real‑time alerts.\n- Generates date‑wise anomaly reports.',
                },
              },
            },
          },
        },
      },
    }),
    []
  );

  const [currentPath, setCurrentPath] = useState([]); // array of strings from root '~'

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-50">
      {/* Hero with Spline 3D scene */}
      <section className="relative h-[50vh] sm:h-[60vh] w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Overlay content */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end sm:items-center justify-center">
          <div className="mx-auto max-w-6xl px-4 sm:px-8 w-full">
            <div className="pointer-events-none select-none">
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-3">Suhas Uppala</h1>
              <p className="text-zinc-200 max-w-2xl">AI/ML and full‑stack developer crafting interactive, delightful products.</p>
              <div className="mt-4 flex gap-3 text-zinc-100/90 flex-wrap">
                <a className="pointer-events-auto inline-flex items-center gap-2 bg-zinc-900/70 backdrop-blur px-3 py-1.5 rounded-full hover:bg-zinc-900/90 transition" href="https://github.com/suhasuppala1805" target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub
                </a>
                <a className="pointer-events-auto inline-flex items-center gap-2 bg-zinc-900/70 backdrop-blur px-3 py-1.5 rounded-full hover:bg-zinc-900/90 transition" href="mailto:suhasuppala1805@gmail.com">
                  <Mail size={16} /> Email
                </a>
                <a className="pointer-events-auto inline-flex items-center gap-2 bg-zinc-900/70 backdrop-blur px-3 py-1.5 rounded-full hover:bg-zinc-900/90 transition" href="https://www.linkedin.com/in/suhas-uppala" target="_blank" rel="noreferrer">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
              <div className="mt-3 flex gap-3 text-xs text-zinc-200/90 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-zinc-900/60 px-2 py-1 rounded-full"><Trophy size={14} /> GDGC Solution Challenge Winner</span>
                <span className="inline-flex items-center gap-1 bg-zinc-900/60 px-2 py-1 rounded-full"><Trophy size={14} /> SIH 2024 Finalist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Portfolio window */}
      <div className="p-4 sm:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Terminal Portfolio</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">Use bash-like commands to explore my projects and details.</p>
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
    </div>
  );
}
