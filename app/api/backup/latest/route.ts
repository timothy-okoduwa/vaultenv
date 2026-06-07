import { getFirebaseAdmin } from '@/lib/firebase-admin';
import { authenticateVault } from '@/lib/vault-auth';

export async function GET(request: Request) {
  try {
    const vaultId = await authenticateVault(request);
    if (!vaultId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = getFirebaseAdmin();

    const snapshot = await db
      .collection('backups')
      .where('vaultId', '==', vaultId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return Response.json({ error: 'No backups found' }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    await db.collection('events').add({
      type: 'backup.downloaded',
      vaultId,
      backupId: doc.id,
      metadata: {},
      createdAt: new Date(),
    });

    return Response.json({
      backupId: doc.id,
      encryptedData: data.encryptedData,
      sizeBytes: data.sizeBytes,
      projectCount: data.projectCount,
      createdAt: data.createdAt.toDate().toISOString(),
    });
  } catch (error) {
    console.error('Get latest backup error:', error);
    return Response.json({ error: 'Failed to get backup' }, { status: 500 });
  }
}
