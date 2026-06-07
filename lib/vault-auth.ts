import { getFirebaseAdmin } from './firebase-admin';

export async function authenticateVault(request: Request): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const vaultId = authHeader.replace('Bearer ', '').trim();
  if (!vaultId || vaultId.length < 10) return null;

  const { db } = getFirebaseAdmin();
  const vaultDoc = await db.collection('vaults').doc(vaultId).get();
  if (!vaultDoc.exists) return null;

  return vaultId;
}
