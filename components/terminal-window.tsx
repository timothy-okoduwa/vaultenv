'use client';

import { useEffect, useState } from 'react';

const lines = [
  '$ npm install -g vaultenv-cli',
  '$ vaultenv init',
  '  Generating recovery phrase...',
  '  ✓ Vault created: abc123...',
  '$ cd ~/projects && vaultenv backup',
  '  Found 8 projects',
  '  ✓ Backup complete: bkp_8f97b2da86b4',
];

export function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-800 bg-black">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-zinc-500">terminal</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-green-400">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <span className={showCursor ? 'opacity-100' : 'opacity-0'}>▊</span>
      </pre>
    </div>
  );
}
