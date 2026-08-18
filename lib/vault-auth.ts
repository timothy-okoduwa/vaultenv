import { getFirebaseAdmin } from './firebase-admin';

export async function authenticateVault(request: Request): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const rawAuth = authHeader.replace('Bearer ', '').trim();
  if (!rawAuth || rawAuth.length < 10) return null;

  let vaultId = rawAuth;
  let token: string | null = null;

  if (rawAuth.includes(':')) {
    const parts = rawAuth.split(':');
    vaultId = parts[0];
    token = parts.slice(1).join(':');
  }

  const { db } = getFirebaseAdmin();
  const vaultDoc = await db.collection('vaults').doc(vaultId).get();
  if (!vaultDoc.exists) return null;

  const vaultData = vaultDoc.data();
  const activeSessionToken = vaultData?.activeSessionToken;

  if (activeSessionToken) {
    if (!token || token !== activeSessionToken) {
      return null;
    }
  }

  return vaultId;
}

