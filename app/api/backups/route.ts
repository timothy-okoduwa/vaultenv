import { getFirebaseAdmin } from '@/lib/firebase-admin';
import { authenticateVault } from '@/lib/vault-auth';

export async function GET(request: Request) {
  try {
    const vaultId = await authenticateVault(request);
    if (!vaultId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    const { db } = getFirebaseAdmin();

    const snapshot = await db
      .collection('backups')
      .where('vaultId', '==', vaultId)
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    const backups = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        backupId: doc.id,
        sizeBytes: data.sizeBytes,
        projectCount: data.projectCount,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });

    return Response.json({ backups, total: backups.length, limit, offset });
  } catch (error) {
    console.error('List backups error:', error);
    return Response.json({ error: 'Failed to list backups' }, { status: 500 });
  }
}
