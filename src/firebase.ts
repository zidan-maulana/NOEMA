import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut,
  User
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  collection, 
  writeBatch
} from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);

// Authentication Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Sign-in and Sign-out functions with seamless Redirect fallback
export async function loginWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    // Jika popup diblokir oleh browser, alihkan otomatis ke mode redirect
    if (error?.code === "auth/popup-blocked") {
      console.warn("[Noema Auth]: Popup diblokir browser, mengalihkan ke signInWithRedirect...");
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    console.error("Gagal melakukan autentikasi Google:", error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Gagal keluar dari sesi:", error);
    throw error;
  }
}

// Error handling as per SKILL.md
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Helper functions for Journal Firestore Sync
export async function syncLocalToFirestore(userId: string, localItems: any[]): Promise<void> {
  const batch = writeBatch(db);
  const userJournalGroup = `users/${userId}/journal`;
  
  try {
    for (const item of localItems) {
      // Create a doc ref for users/{userId}/journal/{id}
      const docRef = doc(db, userJournalGroup, item.id);
      batch.set(docRef, {
        id: item.id,
        originalText: item.originalText,
        result: item.result,
        timestamp: item.timestamp,
        isPinned: item.isPinned || false,
        customTitle: item.customTitle || ""
      });
    }
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userJournalGroup);
  }
}

export async function fetchUserJournal(userId: string): Promise<any[]> {
  const path = `users/${userId}/journal`;
  try {
    const colRef = collection(db, path);
    const querySnapshot = await getDocs(colRef);
    const items: any[] = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function mergeGuestJournalToCloud(userId: string, guestItems: any[]): Promise<any[]> {
  try {
    const existingCloud = await fetchUserJournal(userId);
    if (!guestItems || guestItems.length === 0) {
      return existingCloud;
    }

    const cloudIdSet = new Set(existingCloud.map((item) => item.id));
    const newItemsToSync = guestItems.filter((item) => !cloudIdSet.has(item.id));

    if (newItemsToSync.length > 0) {
      await syncLocalToFirestore(userId, newItemsToSync);
    }

    const merged = [...newItemsToSync, ...existingCloud];
    merged.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    return merged.slice(0, 20);
  } catch (error) {
    console.error("Gagal menggabungkan riwayat tamu ke cloud:", error);
    return await fetchUserJournal(userId);
  }
}

export async function saveJournalInCloud(userId: string, item: any): Promise<void> {
  const path = `users/${userId}/journal/${item.id}`;
  try {
    const docRef = doc(db, `users/${userId}/journal`, item.id);
    await setDoc(docRef, {
      id: item.id,
      originalText: item.originalText,
      result: item.result,
      timestamp: item.timestamp,
      isPinned: item.isPinned || false,
      customTitle: item.customTitle || ""
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteJournalInCloud(userId: string, id: string): Promise<void> {
  const path = `users/${userId}/journal/${id}`;
  try {
    const docRef = doc(db, `users/${userId}/journal`, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
