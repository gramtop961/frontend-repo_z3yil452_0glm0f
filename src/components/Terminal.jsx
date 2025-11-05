import React, { useEffect, useRef, useState } from 'react';

// Simple virtual filesystem
// Each node: { type: 'dir', children: { name: node } } or { type: 'file', content: string }

function joinPath(parts) {
  return parts.length ? '~/' + parts.join('/') : '~';
}

function getNode(fsRoot, path) {
  let node = fsRoot;
  for (const part of path) {
    if (!node || node.type !== 'dir') return null;
    node = node.children[part];
  }
  return node || null;
}

function listDir(node) {
  if (!node || node.type !== 'dir') return [];
  return Object.keys(node.children).map((name) => {
    const child = node.children[name];
    return child.type === 'dir' ? name + '/' : name;
  });
}

function tree(node, prefix = '') {
  if (!node || node.type !== 'dir') return '';
  const names = Object.keys(node.children);
  return names
    .map((name, idx) => {
      const child = node.children[name];
      const isLast = idx === names.length - 1;
      const line = `${prefix}${isLast ? '└── ' : '├── '}${name}${child.type === 'dir' ? '/' : ''}`;
      const sub = child.type === 'dir' ? tree(child, `${prefix}${isLast ? '    ' : '│   '}`) : '';
      return sub ? line + '\n' + sub : line;
    })
    .join('\n');
}

export default function Terminal({ fsRoot, currentPath, setCurrentPath }) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to my terminal-style portfolio! Type `help` to begin.' },
  ]);
  const [input, setInput] = useState('');
  const [cursor, setCursor] = useState(0);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function addOutput(text) {
    setHistory((h) => [...h, { type: 'output', text }]);
  }

  function addInput(text) {
    setHistory((h) => [...h, { type: 'input', text }]);
  }

  function resolvePath(arg) {
    if (!arg || arg.trim() === '') return [...currentPath];
    let parts = arg.split('/').filter(Boolean);
    let newPath = arg.startsWith('/') || arg.startsWith('~/') ? [] : [...currentPath];
    for (const p of parts) {
      if (p === '.') continue;
      if (p === '..') newPath.pop();
      else newPath.push(p);
    }
    return newPath;
  }

  function handleCommand(commandLine) {
    const [cmd, ...rest] = commandLine.trim().split(/\s+/);
    const arg = rest.join(' ');
    const here = getNode(fsRoot, currentPath);

    switch (cmd) {
      case 'help':
        addOutput(
          [
            'Available commands:',
            '  ls [path]        - list directory contents',
            '  cd [path]        - change directory',
            '  pwd              - print working directory',
            '  tree             - show folder tree from here',
            '  cat <file>       - print file content',
            '  open <file>      - alias of cat',
            '  about            - about me',
            '  projects         - project highlights',
            '  clear            - clear the terminal',
          ].join('\n')
        );
        break;
      case 'pwd':
        addOutput(joinPath(currentPath));
        break;
      case 'ls': {
        const target = arg ? getNode(fsRoot, resolvePath(arg)) : here;
        if (!target) addOutput(`ls: cannot access '${arg}': No such file or directory`);
        else if (target.type === 'file') addOutput(arg);
        else addOutput(listDir(target).join('\n'));
        break;
      }
      case 'cd': {
        const next = resolvePath(arg || '~');
        const node = getNode(fsRoot, next);
        if (!node) addOutput(`cd: no such file or directory: ${arg}`);
        else if (node.type !== 'dir') addOutput(`cd: not a directory: ${arg}`);
        else setCurrentPath(next);
        break;
      }
      case 'tree': {
        const content = tree(here);
        addOutput(['.', content].filter(Boolean).join('\n'));
        break;
      }
      case 'cat':
      case 'open': {
        if (!arg) {
          addOutput(`${cmd}: missing file operand`);
          break;
        }
        const node = getNode(fsRoot, resolvePath(arg));
        if (!node) addOutput(`${cmd}: ${arg}: No such file`);
        else if (node.type !== 'file') addOutput(`${cmd}: ${arg}: Is a directory`);
        else addOutput(node.content);
        break;
      }
      case 'about': {
        const node = getNode(fsRoot, resolvePath('about.txt'));
        addOutput(node?.content || 'About file not found.');
        break;
      }
      case 'projects': {
        const projDir = getNode(fsRoot, resolvePath('projects'));
        if (!projDir || projDir.type !== 'dir') {
          addOutput('No projects found.');
        } else {
          const lines = Object.keys(projDir.children).map((p) => `- ${p}`);
          addOutput(['Highlighted projects:', ...lines].join('\n'));
        }
        break;
      }
      case 'clear':
        setHistory([]);
        break;
      case 'echo':
        addOutput(arg);
        break;
      default:
        if (cmd.trim().length === 0) return;
        addOutput(`command not found: ${cmd}`);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = input.replace(/\s+$/,'');
    addInput(`$ ${trimmed}`);
    setCmdHistory((h) => (trimmed ? [...h, trimmed] : h));
    setCmdIndex(-1);
    handleCommand(trimmed);
    setInput('');
    setCursor(0);
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
      if (cmdHistory[next] !== undefined) {
        setCmdIndex(next);
        setInput(cmdHistory[next]);
        setCursor(cmdHistory[next].length);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cmdIndex + 1;
      if (next >= cmdHistory.length) {
        setCmdIndex(-1);
        setInput('');
        setCursor(0);
      } else {
        setCmdIndex(next);
        setInput(cmdHistory[next]);
        setCursor(cmdHistory[next].length);
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 border border-zinc-300/70 dark:border-zinc-700/70">
      <div ref={scrollRef} className="flex-1 overflow-auto px-4 py-3 font-mono text-sm text-zinc-800 dark:text-zinc-100">
        {history.map((item, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-6">
            {item.type === 'input' ? (
              <span className="text-emerald-600 dark:text-emerald-400">{item.text}</span>
            ) : (
              item.text
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="border-t border-zinc-200/70 dark:border-zinc-800/70 px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-emerald-600 dark:text-emerald-400">{joinPath(currentPath)} $</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setCursor(e.target.selectionStart || 0);
            }}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
            placeholder="Type a command... (try: help)"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </form>
    </div>
  );
}
