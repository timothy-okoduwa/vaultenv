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
      await vaultRef.set({
        createdAt: new Date(),
        lastBackupAt: null,
      });

      await db.collection('events').add({
        type: 'vault.created',
        vaultId: providedVaultId,
        backupId: null,
        metadata: {
          ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown',
        },
        createdAt: new Date(),
      });
    }

    return Response.json({ vaultId: providedVaultId }, { status: existing.exists ? 200 : 201 });
  } catch (error) {
    console.error('Create vault error:', error);
    return Response.json({ error: 'Failed to create vault' }, { status: 500 });
  }
}
