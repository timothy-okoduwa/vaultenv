'use client';

import { useEffect, useState } from 'react';

interface TerminalLine {
  text: string;
  delay: number;
}

const SESSION: TerminalLine[] = [
  { text: '$ npm install -g vaultenv-cli', delay: 0 },
  { text: '  added 64 packages in 4s', delay: 500 },
  { text: '', delay: 200 },
  { text: '$ vaultenv init', delay: 400 },
  { text: '  Generating recovery phrase...', delay: 300 },
  { text: '  mgrff cage sadness unit liar slab', delay: 600 },
  { text: '', delay: 100 },
  { text: '  ⚠  SAVE THIS PHRASE. We cannot recover it.', delay: 200 },
  { text: '  ✓ Vault created: 11111111...', delay: 400 },
  { text: '', delay: 200 },
  { text: '$ cd ~/projects && vaultenv backup', delay: 500 },
  { text: '  Found 8 projects, 14 .env files', delay: 700 },
  { text: '  Encrypting — AES-256-GCM ✓', delay: 300 },
  { text: '  Uploading — 6.2 KB compressed ✓', delay: 500 },
  { text: '  ✓ Backup complete: bkp_11111111...', delay: 500 },
];

function getLineClass(text: string): string {
  if (text.startsWith('$')) return 'text-zinc-100';
  if (text.includes('✓')) return 'text-green-400';
  if (text.includes('⚠')) return 'text-amber-400';
  if (text.includes('cliff') || text.includes('cage sadness') || text.includes('unit liar') || text.includes('slab')) return 'text-amber-300';
  if (text === '') return 'text-transparent select-none';
  return 'text-zinc-500';
}

export function TerminalWindow() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (visibleCount >= SESSION.length) return;
    const delay = SESSION[visibleCount]?.delay ?? 300;
    const t = setTimeout(() => setVisibleCount((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [visibleCount]);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-none border border-zinc-800 bg-[#0a0a0a]">
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-zinc-800/60 bg-zinc-900/40 px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-amber-500/70" />
        <div className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-3 font-mono text-[11px] tracking-wider text-zinc-600">
          timothy@mbp  ~/projects
        </span>
      </div>

      {/* body */}
      <div className="min-h-[240px] overflow-x-auto p-5">
        <pre className="font-mono text-[13px] leading-[1.85]">
          {SESSION.slice(0, visibleCount).map((line, i) => (
            <div key={i} className={getLineClass(line.text)}>
              {line.text || '\u00a0'}
            </div>
          ))}
          {visibleCount < SESSION.length && (
            <span className={blink ? 'text-green-400' : 'text-transparent'}>▊</span>
          )}
          {visibleCount >= SESSION.length && (
            <span className={blink ? 'text-green-400' : 'text-transparent'}>▊</span>
          )}
        </pre>
      </div>
    </div>
  );
}