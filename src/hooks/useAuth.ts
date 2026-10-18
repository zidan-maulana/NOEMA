import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, loginWithGoogle, logoutUser } from "../firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    setIsSyncing(true);
    setSyncMessage("Menghubungkan...");
    try {
      const loggedUser = await loginWithGoogle();
      if (loggedUser) {
        setUser(loggedUser);
        setSyncMessage(null);
      }
      return loggedUser;
    } catch (err: any) {
      console.error("[Noema Auth Error]:", err);
      let errorMsg = "Gagal menghubungkan";

      if (err?.code === "auth/unauthorized-domain") {
        errorMsg = "Domain belum diotorisasi";
        const currentDomain = typeof window !== "undefined" ? window.location.hostname : "domain Anda";
        alert(
          `Domain ini (${currentDomain}) belum ditambahkan ke daftar 'Authorized Domains' di Firebase Authentication.\n\nLangkah perbaikan:\n1. Buka Firebase Console (https://console.firebase.google.com/)\n2. Pilih proyek Firebase Noema\n3. Buka menu Authentication > Settings > Authorized domains\n4. Klik 'Add domain' dan masukkan: ${currentDomain}`
        );
      } else if (err?.code === "auth/popup-closed-by-user") {
        errorMsg = null;
      }

      setSyncMessage(errorMsg);
      setTimeout(() => setSyncMessage(null), 4000);
    } finally {
      setIsSyncing(false);
    }
  };

  const logout = async () => {
    setIsSyncing(true);
    setSyncMessage("Keluar...");
    try {
      await logoutUser();
      setUser(null);
      setSyncMessage("Telah keluar");
      setTimeout(() => setSyncMessage(null), 3000);
    } catch (err) {
      console.error("Logout gagal:", err);
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    user,
    authLoading,
    isSyncing,
    setIsSyncing,
    syncMessage,
    setSyncMessage,
    login,
    logout,
  };
}
