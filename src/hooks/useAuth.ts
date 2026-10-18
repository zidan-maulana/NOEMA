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
      setUser(loggedUser);
      return loggedUser;
    } catch (err) {
      console.error("Login gagal:", err);
      setSyncMessage("Gagal menghubungkan");
      setTimeout(() => setSyncMessage(null), 3000);
      throw err;
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
