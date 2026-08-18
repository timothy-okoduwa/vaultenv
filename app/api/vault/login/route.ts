import { randomUUID } from 'crypto';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { db } = getFirebaseAdmin();

    const body = (await request.json().catch(() => ({}))) as { vaultId?: string };
    const { vaultId: providedVaultId } = body;

    if (!providedVaultId || !/^[a-f0-9]{64}$/.test(providedVaultId)) {
      return Response.json({ error: 'Valid vaultId is required' }, { status: 400 });
    }

    const vaultRef = db.collection('vaults').doc(providedVaultId);
    const existing = await vaultRef.get();

    if (!existing.exists) {
      return Response.json(
        { error: 'Vault not found. Please run vaultenv init to create a new vault.' },
        { status: 404 }
      );
    }

    const sessionToken = randomUUID();

    await vaultRef.update({
      activeSessionToken: sessionToken,
      lastLoginAt: new Date(),
    });

    await db.collection('events').add({
      type: 'vault.logged_in',
      vaultId: providedVaultId,
      backupId: null,
      metadata: {
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
      createdAt: new Date(),
    });

    return Response.json({ vaultId: providedVaultId, token: sessionToken }, { status: 200 });
  } catch (error) {
    console.error('Vault login error:', error);
    return Response.json({ error: 'Failed to log in to vault' }, { status: 500 });
  }
}
