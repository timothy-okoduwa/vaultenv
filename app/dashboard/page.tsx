'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { deriveVaultId } from '@/lib/crypto';

interface BackupRecord {
  backupId: string;
  sizeBytes: number;
  projectCount: number;
  createdAt: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function DashboardPage() {
  const [phrase, setPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [vaultId, setVaultId] = useState<string | null>(null);
  const [backups, setBackups] = useState<BackupRecord[]>([]);

  const wordCount = phrase.trim() ? phrase.trim().split(/\s+/).length : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (wordCount !== 12) {
      toast.error('Recovery phrase must be exactly 12 words.');
      return;
    }

    setLoading(true);
    try {
      const id = await deriveVaultId(phrase.trim());
      const loginRes = await fetch('/api/vault/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vaultId: id }),
      });

      if (loginRes.status === 404) {
        toast.error('Vault not found. Run vaultenv init first.');
        setVaultId(null);
        setBackups([]);
        return;
      }

      if (!loginRes.ok) {
        toast.error('Failed to log in to vault. Try again.');
        return;
      }

      const loginData = (await loginRes.json()) as { vaultId: string; token: string };

      const res = await fetch('/api/backups?limit=50', {
        headers: { Authorization: `Bearer ${id}:${loginData.token}` },
      });

      if (res.status === 401) {
        toast.error('Session expired or unauthorized.');
        setVaultId(null);
        setBackups([]);
        return;
      }

      if (!res.ok) {
        toast.error('Failed to load backups. Try again.');
        return;
      }

      const data = (await res.json()) as { backups: BackupRecord[] };
      setVaultId(id);
      setBackups(data.backups);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleLock() {
    setVaultId(null);
    setBackups([]);
    setPhrase('');
  }

  const totalSize = backups.reduce((s, b) => s + b.sizeBytes, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
        :root {
          --font-display: 'IBM Plex Mono', monospace;
          --font-body: 'IBM Plex Sans', sans-serif;
        }
      `}</style>

      <div
        className="min-h-screen bg-[#070707] text-zinc-100"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* ── NAV ─────────────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-800/60 bg-[#070707]/90 px-6 py-3 backdrop-blur-md sm:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-[15px] font-medium text-zinc-100"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <svg
              className="text-green-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            vaultenv
          </Link>

          <div className="flex items-center gap-4">
            {vaultId && (
              <span
                className="hidden text-[11px] text-zinc-700 sm:block"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="text-green-600">●</span>{' '}
                {vaultId.slice(0, 8)}...{vaultId.slice(-6)}
              </span>
            )}
            <Link
              href="/"
              className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-300"
            >
              ← back
            </Link>
          </div>
        </nav>

        <main className="mx-auto max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
          {!vaultId ? (
            /* ── LOCKED STATE ─────────────────────────────────────────────── */
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
              {/* left: form */}
              <div>
                <div className="mb-8">
                  <p
                    className="mb-2 text-[11px] uppercase tracking-[0.2em] text-zinc-700"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Dashboard
                  </p>
                  <h1
                    className="mb-3 text-[clamp(28px,5vw,42px)] font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-100"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Unlock your vault.
                  </h1>
                  <p className="text-[14px] leading-[1.7] text-zinc-500">
                    Enter your 12-word recovery phrase. Your vault ID is
                    derived locally — the phrase never leaves your browser.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <div
                      className="mb-2 flex items-center justify-between"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      <label
                        htmlFor="phrase"
                        className="text-[11px] uppercase tracking-[0.12em] text-zinc-600"
                      >
                        Recovery phrase
                      </label>
                      <span
                        className={`text-[11px] ${
                          wordCount === 12 ? 'text-green-500' : 'text-zinc-700'
                        }`}
                      >
                        {wordCount}/12
                      </span>
                    </div>
                    <textarea
                      id="phrase"
                      value={phrase}
                      onChange={(e) => setPhrase(e.target.value)}
                      placeholder="forest maple orbit candle velvet river puzzle anchor thunder mirror galaxy pebble"
                      rows={3}
                      spellCheck={false}
                      autoComplete="off"
                      className="w-full border border-zinc-800 bg-zinc-900/50 px-4 py-3 font-mono text-[13px] leading-[1.8] text-zinc-200 placeholder-zinc-800 outline-none transition-colors focus:border-zinc-600"
                      style={{ fontFamily: 'var(--font-display)', resize: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || wordCount !== 12}
                    className="w-full bg-green-500 py-3.5 text-[14px] font-semibold text-black transition-colors hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {loading ? 'Deriving vault ID...' : 'Unlock vault →'}
                  </button>

                  <p
                    className="text-center text-[11px] text-zinc-800"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    vaultId = SHA256(phrase) · phrase never sent to server
                  </p>
                </form>
              </div>

              {/* right: info panel */}
              <div
                className="space-y-0 divide-y divide-zinc-800/60 border border-zinc-800/60 p-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <p className="pb-4 text-[11px] uppercase tracking-[0.15em] text-zinc-700">
                  Don't have a vault yet?
                </p>
                {[
                  '$ npm install -g vaultenv-cli',
                  '$ vaultenv init',
                  '$ vaultenv backup',
                ].map((cmd) => (
                  <div key={cmd} className="py-3 text-[13px] text-zinc-500">
                    {cmd}
                  </div>
                ))}
                <div className="pt-6">
                  <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-zinc-700">
                    What this page shows
                  </p>
                  <p className="text-[13px] leading-[1.75] text-zinc-600">
                    Backup metadata only — dates, project counts, sizes.
                    File contents are encrypted and never displayed here.
                    Restore using the CLI.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* ── UNLOCKED STATE ───────────────────────────────────────────── */
            <div className="space-y-8">
              {/* header */}
              <div className="flex flex-col gap-4 border-b border-zinc-800/60 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span
                      className="text-[11px] uppercase tracking-[0.15em] text-green-600"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      vault unlocked
                    </span>
                  </div>
                  <h1
                    className="text-[28px] font-semibold tracking-[-0.02em] text-zinc-100"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Backup history
                  </h1>
                  <p
                    className="mt-1 text-[12px] text-zinc-700"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {vaultId.slice(0, 16)}...{vaultId.slice(-8)}
                  </p>
                </div>
                <button
                  onClick={handleLock}
                  className="self-start border border-zinc-800 px-5 py-2.5 text-[13px] text-zinc-500 transition-colors hover:border-red-900/60 hover:text-red-500 sm:self-auto"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  lock vault
                </button>
              </div>

              {/* stats */}
              <div className="grid grid-cols-2 gap-px border border-zinc-800/60 bg-zinc-800/30 sm:grid-cols-4">
                {[
                  { label: 'Total backups', val: String(backups.length) },
                  { label: 'Latest projects', val: String(backups[0]?.projectCount ?? 0) },
                  { label: 'Total stored', val: formatSize(totalSize) },
                  { label: 'Last backup', val: timeAgo(backups[0]?.createdAt ?? '') },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#070707] px-5 py-5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <p className="mb-2 text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                      {s.label}
                    </p>
                    <p className="text-[22px] font-medium text-zinc-100">{s.val}</p>
                  </div>
                ))}
              </div>

              {/* table */}
              {backups.length === 0 ? (
                <div className="border border-zinc-800/60 py-20 text-center">
                  <p
                    className="text-[14px] text-zinc-600"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    No backups yet.
                  </p>
                  <p className="mt-2 text-[13px] text-zinc-700">
                    Run{' '}
                    <code
                      className="text-green-600"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      vaultenv backup
                    </code>{' '}
                    to create your first backup.
                  </p>
                </div>
              ) : (
                <div className="border border-zinc-800/60">
                  {/* table header */}
                  <div
                    className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-zinc-800/60 bg-zinc-900/30 px-5 py-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {['Backup ID', 'Projects', 'Size', 'When'].map((h, i) => (
                      <span
                        key={h}
                        className={`text-[10px] uppercase tracking-[0.12em] text-zinc-700 ${
                          i > 0 ? 'text-right' : ''
                        }`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* rows */}
                  {backups.map((b, i) => (
                    <div
                      key={b.backupId}
                      className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-zinc-800/40 px-5 py-4 transition-colors last:border-0 hover:bg-zinc-900/20"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="truncate text-[13px] text-zinc-400"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {b.backupId}
                        </span>
                        {i === 0 && (
                          <span
                            className="shrink-0 border border-green-900/60 bg-green-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-green-600"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            latest
                          </span>
                        )}
                      </div>
                      <span
                        className="text-right text-[13px] text-zinc-500"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {b.projectCount}
                      </span>
                      <span
                        className="text-right text-[12px] text-zinc-600"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {formatSize(b.sizeBytes)}
                      </span>
                      <div className="text-right" style={{ fontFamily: 'var(--font-display)' }}>
                        <div className="text-[12px] text-zinc-500">{timeAgo(b.createdAt)}</div>
                        <div className="text-[11px] text-zinc-700">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* restore hint */}
              <div
                className="flex flex-col gap-3 border-l-2 border-green-900/60 bg-zinc-900/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <p className="text-[13px] text-zinc-500">
                  To restore on a new machine:
                </p>
                <code className="border border-zinc-800 bg-[#070707] px-4 py-2 text-[13px] text-green-400">
                  vaultenv restore
                </code>
              </div>

              {/* security note */}
              <p
                className="text-[12px] text-zinc-700"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Backup contents are AES-256-GCM encrypted on your device.
                This dashboard shows metadata only — file values are never
                transmitted or displayed here.
              </p>
            </div>
          )}
        </main>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-zinc-800/40 px-6 py-5 sm:px-10">
          <div
            className="mx-auto flex max-w-4xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-[11px] uppercase tracking-[0.15em] text-zinc-800">
              AES-256-GCM · PBKDF2-SHA256 · 600,000 iterations
            </span>
            <span className="text-[11px] text-zinc-800">
              by timothy okoduwa · MIT
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}