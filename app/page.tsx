import Link from 'next/link';
import { TerminalWindow } from '@/components/terminal-window';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: '🔒',
    title: 'End-to-End Encryption',
    description: 'AES-256-GCM. Keys never leave your device.',
  },
  {
    icon: '🌱',
    title: 'Recovery Phrase Only',
    description: '12-word BIP-39 phrase. Lose it and we can\'t help you, by design.',
  },
  {
    icon: '☁️',
    title: 'Cloud-First',
    description: 'Access your env files from anywhere.',
  },
  {
    icon: '🧠',
    title: 'Smart Matching',
    description: 'Projects matched by Git remote, package name, or folder name.',
  },
  {
    icon: '📦',
    title: 'Full Project Restore',
    description: 'One command restores everything.',
  },
  {
    icon: '🕳️',
    title: 'Zero Knowledge',
    description: 'The server never sees your plaintext secrets.',
  },
];

const commands = [
  {
    step: '1',
    cmd: 'vaultenv init',
    description: 'Generates your 12-word recovery phrase and creates your vault.',
  },
  {
    step: '2',
    cmd: 'vaultenv backup',
    description: 'Finds and encrypts all .env files in your project tree.',
  },
  {
    step: '3',
    cmd: 'vaultenv restore',
    description: 'On a new machine, restores everything automatically.',
  },
];

const installCommands = [
  { pkg: 'npm', cmd: 'npm install -g vaultenv-cli' },
  { pkg: 'yarn', cmd: 'yarn global add vaultenv-cli' },
  { pkg: 'pnpm', cmd: 'pnpm add -g vaultenv-cli' },
];

const cliCommands = [
  { cmd: 'vaultenv init', desc: 'Create vault & recovery phrase' },
  { cmd: 'vaultenv backup', desc: 'Backup all .env files' },
  { cmd: 'vaultenv restore', desc: 'Restore latest backup' },
  { cmd: 'vaultenv list', desc: 'List backup history' },
];

const protectedItems = [
  'Recovery phrase never leaves device',
  'Encryption keys derived locally',
  'Server never sees plaintext',
  'AES-256-GCM encryption',
  'Unique IV per backup',
  'Auth tags on every ciphertext',
];

const notProtectedItems = [
  'Client-side malware',
  'Recovery phrase compromise',
  'Physical device access',
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Hero */}
      <section className="border-b border-zinc-800 px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <Badge className="mb-6">Open Source · CLI Tool</Badge>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
            Backup your .env files across machines
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            End-to-end encrypted. No accounts. No passwords. Just your 12-word recovery phrase.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com/timothy-okoduwa/vaultenv" target="_blank" rel="noopener noreferrer">
                Star on GitHub
              </a>
            </Button>
          </div>
          <div className="mt-12">
            <TerminalWindow />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-zinc-800 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-2xl font-bold text-green-400 sm:text-3xl">Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="border-zinc-800 bg-zinc-950">
                <CardContent className="p-6">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="mt-3 font-semibold text-zinc-100">{f.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Three Commands */}
      <section className="border-b border-zinc-800 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-2xl font-bold text-green-400 sm:text-3xl">Three Commands</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {commands.map((c) => (
              <div key={c.step} className="space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-500/50 bg-green-500/10 font-mono text-green-400">
                  {c.step}
                </div>
                <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-black p-4">
                  <code className="font-mono text-sm text-green-400">$ {c.cmd}</code>
                </div>
                <p className="text-sm text-zinc-400">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="border-b border-zinc-800 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-2xl font-bold text-green-400 sm:text-3xl">Get Started</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {installCommands.map((i) => (
                <div key={i.pkg} className="w-full overflow-x-auto rounded-lg border border-zinc-800 bg-black p-4 sm:w-auto sm:min-w-[320px]">
                  <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">{i.pkg}</p>
                  <code className="font-mono text-sm text-green-400">{i.cmd}</code>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-zinc-400">
                    <th className="p-4 font-medium">Command</th>
                    <th className="p-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {cliCommands.map((c) => (
                    <tr key={c.cmd} className="border-b border-zinc-800 last:border-0">
                      <td className="p-4 font-mono text-green-400">{c.cmd}</td>
                      <td className="p-4 text-zinc-300">{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="border-b border-zinc-800 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-2xl font-bold text-green-400 sm:text-3xl">Security</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-green-500/30 bg-zinc-950">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-green-400">What&apos;s Protected</h3>
                <ul className="space-y-2">
                  {protectedItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-green-400">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-red-500/30 bg-zinc-950">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-red-400">What&apos;s NOT Protected</h3>
                <ul className="space-y-2">
                  {notProtectedItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-red-400">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-4">
        <p className="mx-auto max-w-5xl text-center font-mono text-xs text-zinc-500 sm:text-sm">
          AES-256-GCM | PBKDF2-SHA256 | 600,000 iterations | BIP-39 (12 words)
        </p>
      </div>

      {/* Footer */}
      <footer className="px-4 py-8 sm:px-6">
        <p className="mx-auto max-w-5xl text-center text-sm text-zinc-500">
          © 2025 VaultEnv ·{' '}
          <a href="https://opensource.org/licenses/MIT" className="hover:text-green-400">
            MIT License
          </a>
          {' · '}
          <a href="https://github.com/timothy-okoduwa/vaultenv" className="hover:text-green-400">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
