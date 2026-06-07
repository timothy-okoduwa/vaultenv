import { getFirebaseAdmin } from '@/lib/firebase-admin';
import { authenticateVault } from '@/lib/vault-auth';

export async function POST(request: Request) {
  try {
    const vaultId = await authenticateVault(request);
    if (!vaultId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { encryptedData, projectCount } = body;

    if (!encryptedData || typeof encryptedData !== 'string') {
      return Response.json({ error: 'encryptedData is required' }, { status: 400 });
    }

    const sizeBytes = Buffer.byteLength(encryptedData, 'utf8');
    if (sizeBytes > 512 * 1024) {
      return Response.json({ error: 'Backup too large (max 512KB)' }, { status: 413 });
    }

    const { db } = getFirebaseAdmin();

    const backupRef = await db.collection('backups').add({
      vaultId,
      encryptedData,
      sizeBytes,
      projectCount: projectCount || 0,
      createdAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    await db.collection('vaults').doc(vaultId).update({
      lastBackupAt: new Date(),
    });

    await db.collection('events').add({
      type: 'backup.created',
      vaultId,
      backupId: backupRef.id,
      metadata: { sizeBytes, projectCount },
      createdAt: new Date(),
    });

    return Response.json(
      { backupId: backupRef.id, sizeBytes, createdAt: new Date().toISOString() },
      { status: 201 }
    );
  } catch (error) {
    console.error('Backup error:', error);
    return Response.json({ error: 'Failed to create backup' }, { status: 500 });
  }
}
