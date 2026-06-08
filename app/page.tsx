import Link from 'next/link';
import { TerminalWindow } from '@/components/terminal-window';

// ─── data ────────────────────────────────────────────────────────────────────

const features = [
  {
    n: '01',
    title: 'End-to-end encryption',
    body: 'AES-256-GCM. Key derivation via PBKDF2-SHA256 at 600,000 iterations. Your plaintext never leaves the machine.',
  },
  {
    n: '02',
    title: 'Recovery phrase only',
    body: '12 BIP-39 words is your entire identity. No account. No email. No password reset. Lose it and we genuinely cannot help you.',
  },
  {
    n: '03',
    title: 'Smart project matching',
    body: 'On restore, projects are matched by Git remote URL → package name → folder name. Files land in the right place automatically.',
  },
  {
    n: '04',
    title: 'Zero knowledge server',
    body: 'The server stores an encrypted blob and a vault ID derived from your phrase. It has no key. It cannot read your secrets.',
  },
  {
    n: '05',
    title: 'Cloud-first, machine-agnostic',
    body: 'New laptop, new job, CI server. Three commands and every .env file is back exactly where it belongs.',
  },
  {
    n: '06',
    title: 'Full project restore',
    body: 'One command. Every project. Every .env variant — .env.local, .env.production, all of it, restored automatically.',
  },
];

const steps = [
  {
    n: '01',
    cmd: 'vaultenv init',
    what: 'Generates a 12-word BIP-39 recovery phrase. Derives your vault ID locally via SHA-256. Registers the vault. Phrase never sent to server.',
    lines: [
      '$ vaultenv init',
      '  Generating recovery phrase...',
      '  forest maple orbit candle velvet ',
      '  river puzzle anchor thunder mirror galaxy pebble',
      '  ⚠  SAVE THIS PHRASE SECURELY.',
      '  ✓ Vault created: 2928e364...',
    ],
  },
  {
    n: '02',
    cmd: 'vaultenv backup',
    what: 'Walks the directory tree from CWD. Finds all .env* files. Encrypts the payload client-side. Uploads the ciphertext blob.',
    lines: [
      '$ cd ~/projects && vaultenv backup',
      '  Scanning for .env files...',
      '  Found 8 projects · 14 files',
      '  Encrypting — AES-256-GCM ✓',
      '  Uploading — 6.2 KB compressed',
      '  ✓ bkp_8f97b2da86b4 — done',
    ],
  },
  {
    n: '03',
    cmd: 'vaultenv restore',
    what: 'Downloads the latest encrypted backup. Decrypts locally. Matches each project by fingerprint. Writes files to disk.',
    lines: [
      '$ vaultenv restore',
      '  Downloading latest backup...',
      '  Decrypting — AES-256-GCM ✓',
      '  Found 8 projects in backup',
      '  ✓ my-api/.env',
      '  ✓ frontend/.env.local',
      '  ✓ backend/.env.production',
      '  Restored 14 files · 8 projects',
    ],
  },
];

const protected_ = [
  'Recovery phrase never leaves your device',
  'AES-256-GCM encryption on every backup',
  'PBKDF2-SHA256 key derivation · 600k iterations',
  'Unique random IV and salt per backup',
  'GCM auth tags prevent ciphertext tampering',
  'Server never stores or sees plaintext',
];

const notProtected = [
  'Client-side malware on your device',
  'Physical access to an unlocked machine',
  'A recovery phrase you share or lose',
];

const cliCommands = [
  { cmd: 'vaultenv init', desc: 'Create vault & generate recovery phrase' },
  { cmd: 'vaultenv backup', desc: 'Backup all .env files in current tree' },
  { cmd: 'vaultenv restore', desc: 'Restore latest backup on any machine' },
  { cmd: 'vaultenv list', desc: 'List all backups for this vault' },
  { cmd: 'vaultenv view', desc: 'View backup contents after decryption' },
];

// ─── sub-components ──────────────────────────────────────────────────────────

function StepTerminal({ lines }: { lines: string[] }) {
  return (
    <div className="overflow-hidden rounded-none border border-zinc-800 bg-[#0a0a0a]">
      <div className="flex items-center gap-1.5 border-b border-zinc-800/60 bg-zinc-900/30 px-3 py-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
      </div>
      <div className="p-4">
        <pre className="font-mono text-[12px] leading-[1.9]">
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith('$')
                  ? 'text-zinc-100'
                  : line.includes('✓')
                    ? 'text-green-400'
                    : line.includes('⚠')
                      ? 'text-amber-400'
                      : line.includes('cliff') || line.includes('tent ordinary')
                        ? 'text-amber-300'
                        : 'text-zinc-500'
              }
            >
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function Home() {
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
          <div
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
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#how-it-works"
              className="hidden text-[13px] text-zinc-500 transition-colors hover:text-zinc-200 sm:block"
            >
              how it works
            </a>
            <a
              href="#security"
              className="hidden text-[13px] text-zinc-500 transition-colors hover:text-zinc-200 sm:block"
            >
              security
            </a>
            <a
              href="https://github.com/timothy-okoduwa/vaultenv"
              target="_blank"
              rel="noreferrer"
              className="hidden text-[13px] text-zinc-500 transition-colors hover:text-zinc-200 sm:block"
            >
              github
            </a>
            <Link
              href="/dashboard"
              className="border border-green-500/40 bg-green-500/10 px-4 py-1.5 text-[13px] text-green-400 transition-colors hover:bg-green-500/20"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              dashboard →
            </Link>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="border-b border-zinc-800/60 px-6 pb-0 pt-16 sm:px-10 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            {/* overline */}
            <p
              className="mb-6 text-[11px] uppercase tracking-[0.2em] text-zinc-600"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Open Source · CLI Tool · MIT License
            </p>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
              {/* left: text */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1
                    className="mb-6 text-[clamp(40px,6vw,72px)] font-semibold leading-[1.04] tracking-[-0.04em] text-zinc-50"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Backup your{' '}
                    <span className="text-green-400 underline decoration-green-900 underline-offset-4">
                      .env files
                    </span>
                    {' '}across machines.
                  </h1>

                  <p className="mb-8 max-w-md text-[16px] leading-[1.75] text-zinc-400">
                    End-to-end encrypted. No accounts. No passwords. Just your
                    12-word recovery phrase — and three commands.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center justify-center bg-green-500 px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-green-400"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Get started free
                    </Link>
                    <a
                      href="https://github.com/timothy-okoduwa/vaultenv"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center border border-zinc-700 px-6 py-3 text-[14px] text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      ★ Star on GitHub
                    </a>
                  </div>

                  {/* install strip */}
                  <div
                    className="mt-8 flex items-center justify-between border border-zinc-800 bg-zinc-900/40 px-4 py-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <span className="text-[13px] text-zinc-400">
                      <span className="text-green-400">$</span>{' '}
                      npm install -g vaultenv-cli
                    </span>
                    <span className="text-[11px] text-zinc-700">copy</span>
                  </div>

                  {/* spec row */}
                  <div
                    className="mt-6  mb-10 flex gap-6 border-t border-zinc-800/60 pt-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {[
                      { val: 'AES-256', sub: 'GCM' },
                      { val: '600k', sub: 'PBKDF2 iters' },
                      { val: 'BIP-39', sub: '12 words' },
                    ].map((s) => (
                      <div key={s.val}>
                        <div className="text-[18px] font-semibold text-zinc-100">{s.val}</div>
                        <div className="text-[11px] text-zinc-600">{s.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* right: terminal (bleeds to bottom border) */}
              <div className="flex flex-col">
                <TerminalWindow />
                <p
                  className="mt-2 text-center text-[11px] text-zinc-700"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  live session · recovery phrase stays on-device
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────────────────── */}
        <section className="border-b border-zinc-800/60 px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-baseline justify-between">
              <h2
                className="text-[13px] uppercase tracking-[0.15em] text-zinc-500"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Why vaultenv
              </h2>
              <span
                className="text-[11px] text-zinc-800"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                06 features
              </span>
            </div>

            <div className="divide-y divide-zinc-800/60">
              {features.map((f) => (
                <div
                  key={f.n}
                  className="grid grid-cols-1 gap-4 py-7 transition-colors hover:bg-zinc-900/20 sm:grid-cols-[64px_1fr_2fr] sm:gap-8"
                >
                  <span
                    className="text-[12px] text-zinc-700"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {f.n}
                  </span>
                  <h3
                    className="text-[15px] font-medium text-zinc-200"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-[14px] leading-[1.7] text-zinc-500">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
        <section
          id="how-it-works"
          className="border-b border-zinc-800/60 bg-[#060606] px-6 py-20 sm:px-10"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p
                className="mb-1 text-[11px] uppercase tracking-[0.2em] text-zinc-700"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                How it works
              </p>
              <h2
                className="text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-[-0.03em] text-zinc-100"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Three commands. That's it.
              </h2>
            </div>

            <div className="space-y-0 divide-y divide-zinc-800/60">
              {steps.map((s) => (
                <div key={s.n} className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-2 lg:gap-16">
                  <div>
                    <div
                      className="mb-4 text-[11px] uppercase tracking-[0.15em] text-zinc-700"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Step {s.n}
                    </div>
                    <div
                      className="mb-4 text-[22px] font-medium text-green-400"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      $ {s.cmd}
                    </div>
                    <p className="text-[14px] leading-[1.75] text-zinc-400">{s.what}</p>
                  </div>
                  <StepTerminal lines={s.lines} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GET STARTED ─────────────────────────────────────────────────── */}
        <section className="border-b border-zinc-800/60 px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p
                className="mb-1 text-[11px] uppercase tracking-[0.2em] text-zinc-700"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Install
              </p>
              <h2
                className="text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-[-0.03em] text-zinc-100"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Get started in seconds.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* install */}
              <div>
                <p
                  className="mb-4 text-[12px] uppercase tracking-[0.12em] text-zinc-600"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  npm
                </p>
                <div
                  className="mb-3 border border-zinc-800 bg-zinc-900/40 px-5 py-4 font-mono text-[14px] text-green-400"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  npm install -g vaultenv-cli
                </div>
                <p
                  className="mb-3 text-[12px] uppercase tracking-[0.12em] text-zinc-600"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  then
                </p>
                <div
                  className="border border-zinc-800 bg-zinc-900/40 px-5 py-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {['vaultenv init', 'vaultenv backup', 'vaultenv restore'].map((cmd) => (
                    <div key={cmd} className="py-1 text-[13px] text-zinc-300">
                      <span className="text-zinc-700">$ </span>
                      {cmd}
                    </div>
                  ))}
                </div>
              </div>

              {/* commands table */}
              <div>
                <p
                  className="mb-4 text-[12px] uppercase tracking-[0.12em] text-zinc-600"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Commands
                </p>
                <div className="divide-y divide-zinc-800/60 border border-zinc-800">
                  {cliCommands.map((c) => (
                    <div
                      key={c.cmd}
                      className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <code
                        className="text-[13px] text-green-400"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {c.cmd}
                      </code>
                      <span className="text-[13px] text-zinc-500">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECURITY ────────────────────────────────────────────────────── */}
        <section
          id="security"
          className="border-b border-zinc-800/60 bg-[#060606] px-6 py-20 sm:px-10"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p
                className="mb-1 text-[11px] uppercase tracking-[0.2em] text-zinc-700"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Security model
              </p>
              <h2
                className="text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-[-0.03em] text-zinc-100"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                What we protect.
                <br />
                What we don't.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
              {/* protected */}
              <div className="lg:pr-16">
                <p
                  className="mb-5 text-[11px] uppercase tracking-[0.15em] text-green-600"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  ✓ Protected
                </p>
                <div className="divide-y divide-zinc-800/40">
                  {protected_.map((item) => (
                    <div key={item} className="flex items-start gap-4 py-3.5">
                      <span
                        className="mt-0.5 shrink-0 text-[12px] text-green-700"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        ✓
                      </span>
                      <span className="text-[14px] leading-snug text-zinc-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* divider */}
              <div className="hidden bg-zinc-800/60 lg:block" />

              {/* not protected */}
              <div className="lg:pl-16">
                <p
                  className="mb-5 text-[11px] uppercase tracking-[0.15em] text-red-700"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  ✗ Not protected
                </p>
                <div className="divide-y divide-zinc-800/40">
                  {notProtected.map((item) => (
                    <div key={item} className="flex items-start gap-4 py-3.5">
                      <span
                        className="mt-0.5 shrink-0 text-[12px] text-red-800"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        ✗
                      </span>
                      <span className="text-[14px] leading-snug text-zinc-400">{item}</span>
                    </div>
                  ))}
                </div>

                {/* tech specs */}
                <div
                  className="mt-10 border border-zinc-800 bg-zinc-900/30 px-5 py-5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-zinc-700">
                    Technical spec
                  </p>
                  {[
                    ['Algorithm', 'AES-256-GCM'],
                    ['KDF', 'PBKDF2-SHA256'],
                    ['Iterations', '600,000'],
                    ['Phrase format', 'BIP-39 · 12 words'],
                    ['IV', '96-bit · random per backup'],
                    ['Auth', 'GCM tag · 128-bit'],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b border-zinc-800/40 py-2.5 last:border-0"
                    >
                      <span className="text-[12px] text-zinc-600">{k}</span>
                      <span className="text-[12px] text-green-500">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="border-b border-zinc-800/60 px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2
                  className="mb-4 text-[clamp(32px,5vw,56px)] font-semibold leading-[1.06] tracking-[-0.04em] text-zinc-100"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Stop losing your{' '}
                  <span className="text-green-400">.env</span> files.
                </h2>
                <p className="text-[15px] leading-[1.7] text-zinc-400">
                  Install in 10 seconds. First backup in under a minute.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center bg-green-500 px-8 py-4 text-[15px] font-semibold text-black transition-colors hover:bg-green-400"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Open dashboard →
                </Link>
                <a
                  href="https://github.com/timothy-okoduwa/vaultenv"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center border border-zinc-700 px-8 py-4 text-[14px] text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  View source on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="px-6 py-6 sm:px-10">
          <div
            className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-[11px] uppercase tracking-[0.15em] text-zinc-800">
              AES-256-GCM · PBKDF2-SHA256 · 600,000 iterations · BIP-39
            </span>
            <span className="text-[12px] text-zinc-700">
              © 2026 VaultEnv · <a
                href="https://timothy-okoduwa.vercel.app"
                className="hover:text-zinc-400"
              >by timothy okoduwa ·</a> {' '}
              <a
                href="https://opensource.org/licenses/MIT"
                className="hover:text-zinc-400"
              >
                MIT
              </a>
              {' · '}
              <a
                href="https://github.com/timothy-okoduwa/vaultenv"
                className="hover:text-zinc-400"
              >
                GitHub
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}