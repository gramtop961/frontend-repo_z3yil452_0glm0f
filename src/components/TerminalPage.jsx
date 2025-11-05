import React, { useMemo, useState, useRef, useCallback } from 'react';
import TitleBar from './TitleBar';
import FolderTree from './FolderTree';
import Terminal from './Terminal';
import StatusBar from './StatusBar';

export default function TerminalPage() {
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
          content: [
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

  const [currentPath, setCurrentPath] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(320); // px
  const draggingRef = useRef(false);

  const onMouseMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const min = 200;
    const max = 560;
    const next = Math.min(max, Math.max(min, e.clientX - (window.innerWidth - Math.min(window.innerWidth, 1024)) / 2 - 32));
    setSidebarWidth(next);
  }, []);

  const onMouseUp = useCallback(() => {
    draggingRef.current = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const startDrag = useCallback(() => {
    draggingRef.current = true;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [onMouseMove, onMouseUp]);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-950 text-emerald-950 dark:text-emerald-100">
      <div className="mx-auto flex h-full max-w-6xl flex-col px-4 sm:px-8 py-6 sm:py-8 gap-6">
        <div className="shrink-0">
          <h2 className="text-3xl font-semibold tracking-tight">Terminal</h2>
          <p className="text-emerald-800/80 dark:text-emerald-200/80 mt-1">Use bash-like commands to explore my projects and details.</p>
        </div>

        <div className="flex min-h-0 flex-1 rounded-xl overflow-hidden shadow-lg shadow-emerald-600/10 border border-emerald-200/70 dark:border-emerald-900/60 bg-white dark:bg-zinc-950">
          <div className="flex w-full min-h-0 flex-col">
            <TitleBar title="bash — portfolio" path={currentPath.length ? '~/'+ currentPath.join('/') : '~'} />
            <div className="flex min-h-0 flex-1">
              {/* Sidebar */}
              <aside className="hidden md:flex min-h-0 flex-col border-r border-emerald-100/60 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-zinc-900/40"
                style={{ width: sidebarWidth }}>
                <FolderTree fsRoot={fsRoot} currentPath={currentPath} onNavigate={setCurrentPath} />
              </aside>

              {/* Resizer handle */}
              <div
                className="hidden md:block w-1 cursor-col-resize bg-transparent hover:bg-emerald-500/20"
                onMouseDown={startDrag}
                aria-label="Resize sidebar"
              />

              {/* Terminal area */}
              <main className="flex-1 min-h-0 flex">
                <div className="flex h-full min-h-0 w-full p-0">
                  <Terminal fsRoot={fsRoot} currentPath={currentPath} setCurrentPath={setCurrentPath} />
                </div>
              </main>
            </div>
            <StatusBar currentPath={currentPath} />
          </div>
        </div>
      </div>
    </div>
  );
}
