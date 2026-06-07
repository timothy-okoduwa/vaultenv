'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { deriveVaultId } from '@/lib/crypto';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

export default function DashboardPage() {
  const [phrase, setPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [vaultId, setVaultId] = useState<string | null>(null);
  const [backups, setBackups] = useState<BackupRecord[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const words = phrase.trim().split(/\s+/);
    if (words.length !== 12) {
      toast.error('Please enter a valid 12-word recovery phrase.');
      return;
    }

    setLoading(true);
    try {
      const id = await deriveVaultId(phrase);
      const res = await fetch('/api/backups?limit=50', {
        headers: { Authorization: `Bearer ${id}` },
      });

      if (res.status === 401) {
        toast.error('Vault not found. Check your recovery phrase or run vaultenv init first.');
        setVaultId(null);
        setBackups([]);
        return;
      }

      if (!res.ok) {
        toast.error('Failed to load backups.');
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

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <header className="border-b border-zinc-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="font-mono text-lg font-bold text-green-400">
            VaultEnv
          </Link>
          <Link href="/" className="text-sm text-zinc-400 hover:text-green-400">
            ← Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {!vaultId ? (
          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-green-400">View Your Vault</CardTitle>
              <CardDescription>
                Enter your recovery phrase to view your vault
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phrase">Recovery Phrase (12 words)</Label>
                  <textarea
                    id="phrase"
                    value={phrase}
                    onChange={(e) => setPhrase(e.target.value)}
                    placeholder="word1 word2 word3 ..."
                    rows={3}
                    className="flex min-h-[88px] w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  />
                </div>
                <p className="text-xs text-zinc-500">
                  Your phrase never leaves your browser. We derive your vault ID locally.
                </p>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? 'Loading...' : 'View Vault'}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-green-400">Your Vault</h1>
                <p className="mt-1 font-mono text-sm text-zinc-400">
                  ID: {vaultId.slice(0, 8)}...{vaultId.slice(-8)}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setVaultId(null);
                  setBackups([]);
                  setPhrase('');
                }}
              >
                Lock Vault
              </Button>
            </div>

            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Backup History</CardTitle>
                <CardDescription>
                  Restore backups using the CLI: <code className="text-green-400">vaultenv restore</code>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {backups.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-zinc-400">No backups yet.</p>
                    <p className="mt-2 text-sm text-zinc-500">
                      Run <code className="text-green-400">vaultenv backup</code> to create your first backup.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Projects</TableHead>
                          <TableHead>Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {backups.map((b) => (
                          <TableRow key={b.backupId}>
                            <TableCell className="whitespace-nowrap">
                              {new Date(b.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{b.projectCount}</Badge>
                            </TableCell>
                            <TableCell>{formatSize(b.sizeBytes)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
