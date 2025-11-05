import React from 'react';

function TreeNode({ node, path, currentPath, onNavigate }) {
  const isDir = node.type === 'dir';
  const isActive = currentPath.join('/') === path.join('/');

  return (
    <div>
      <button
        className={`w-full text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
          isActive ? 'bg-zinc-100 dark:bg-zinc-800' : ''
        }`}
        onClick={() => isDir && onNavigate(path)}
      >
        <span className="mr-2">{isDir ? '📁' : '📄'}</span>
        <span className="text-sm text-zinc-700 dark:text-zinc-300">{path[path.length - 1] || '~'}</span>
      </button>
      {isDir && node.children && (
        <div className="ml-5 border-l border-zinc-200/70 dark:border-zinc-700/70 pl-2">
          {Object.keys(node.children).map((name) => (
            <TreeNode
              key={name}
              node={node.children[name]}
              path={[...path, name]}
              currentPath={currentPath}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FolderTree({ fsRoot, currentPath, onNavigate }) {
  return (
    <div className="h-full overflow-auto p-3 text-sm custom-scrollbar">
      <TreeNode node={fsRoot} path={[]} currentPath={currentPath} onNavigate={onNavigate} />
    </div>
  );
}
