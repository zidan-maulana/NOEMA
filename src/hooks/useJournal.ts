import { useState, useEffect, useMemo, useCallback } from "react";
import { User } from "firebase/auth";
import { ReadingHistoryItem, AnalysisResult } from "../types";
import { 
  fetchUserJournal, 
  saveJournalInCloud, 
  deleteJournalInCloud, 
  mergeGuestJournalToCloud 
} from "../firebase";
import { exportJournalToMarkdown } from "../utils/markdownExporter";

const GUEST_STORAGE_KEY = "noema_guest_reading_history";
const LEGACY_STORAGE_KEY = "noema_reading_history";

// [1] SAFE LOCAL STORAGE WRAPPER
// Melindungi aplikasi dari crash jika browser dalam mode incognito ketat atau storage penuh (QuotaExceededError)
function safeSetLocalStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn("[Noema Storage]: Gagal menulis ke localStorage (storage penuh/incognito):", e);
  }
}

function safeGetLocalStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn("[Noema Storage]: Gagal membaca dari localStorage:", e);
    return null;
  }
}

export function useJournal(user: User | null) {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [showHistoryPanel, setShowHistoryPanel] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"terbaru" | "terlama" | "tersemat">("tersemat");
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [editedTitleVal, setEditedTitleVal] = useState<string>("");

  // Load journal from localStorage for Guest mode
  const loadLocalJournal = useCallback(() => {
    try {
      const storedGuest = safeGetLocalStorage(GUEST_STORAGE_KEY);
      if (storedGuest) {
        setHistory(JSON.parse(storedGuest));
      } else {
        setHistory([]);
      }
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch {}
    } catch (e) {
      console.error("Gagal memuat riwayat lokal:", e);
      setHistory([]);
    }
  }, []);

  // Sync user journal upon login without losing guest history
  const syncUserJournal = useCallback(async (currentUser: User) => {
    try {
      let guestItems: ReadingHistoryItem[] = [];
      const storedGuest = safeGetLocalStorage(GUEST_STORAGE_KEY);
      if (storedGuest) {
        guestItems = JSON.parse(storedGuest);
      }

      // Merge guest items with cloud items seamlessly
      const mergedItems = await mergeGuestJournalToCloud(currentUser.uid, guestItems);
      setHistory(mergedItems.slice(0, 20));

      // Clean up guest local storage after successful cloud merge
      if (storedGuest) {
        try {
          localStorage.removeItem(GUEST_STORAGE_KEY);
        } catch {}
      }
    } catch (err) {
      console.error("Gagal menyelaraskan jurnal:", err);
      // Fallback: fetch cloud only
      const cloudItems = await fetchUserJournal(currentUser.uid);
      cloudItems.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      setHistory(cloudItems.slice(0, 20));
    }
  }, []);

  // Synchronize on user auth changes
  useEffect(() => {
    if (user) {
      syncUserJournal(user);
    } else {
      loadLocalJournal();
    }
  }, [user, syncUserJournal, loadLocalJournal]);

  // Add new reading result to journal
  const addEntry = useCallback(
    (originalText: string, result: AnalysisResult) => {
      const newItem: ReadingHistoryItem = {
        id: crypto.randomUUID(),
        originalText,
        result,
        timestamp: new Date().toISOString(),
      };

      setHistory((prev) => {
        const updated = [newItem, ...prev].slice(0, 20);
        if (!user) {
          safeSetLocalStorage(GUEST_STORAGE_KEY, JSON.stringify(updated));
        }
        return updated;
      });

      setSelectedHistoryId(newItem.id);

      if (user) {
        saveJournalInCloud(user.uid, newItem).catch((err) =>
          console.error("Gagal menyimpan ke Firestore:", err)
        );
      }

      return newItem;
    },
    [user]
  );

  // Toggle pinned status of an entry
  const togglePin = useCallback(
    (id: string) => {
      let updatedItem: ReadingHistoryItem | null = null;

      setHistory((prev) => {
        const updated = prev.map((item) => {
          if (item.id === id) {
            updatedItem = { ...item, isPinned: !item.isPinned };
            return updatedItem;
          }
          return item;
        });

        if (!user) {
          safeSetLocalStorage(GUEST_STORAGE_KEY, JSON.stringify(updated));
        }
        return updated;
      });

      if (user && updatedItem) {
        saveJournalInCloud(user.uid, updatedItem).catch((err) =>
          console.error("Gagal memperbarui status pin di cloud:", err)
        );
      }
    },
    [user]
  );

  // Remove an entry from history
  const removeEntry = useCallback(
    (id: string) => {
      setHistory((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        if (!user) {
          safeSetLocalStorage(GUEST_STORAGE_KEY, JSON.stringify(updated));
        }
        return updated;
      });

      if (selectedHistoryId === id) {
        setSelectedHistoryId(null);
      }

      if (user) {
        deleteJournalInCloud(user.uid, id).catch((err) =>
          console.error("Gagal menghapus catatan di cloud:", err)
        );
      }
    },
    [user, selectedHistoryId]
  );

  // Update custom title of an entry
  const updateTitle = useCallback(
    (id: string, newTitle: string) => {
      let updatedItem: ReadingHistoryItem | null = null;

      // Sanitasi judul: maksimal 80 karakter, hilangkan kontrol karakter dan baris baru
      const sanitizedTitle = (newTitle || "")
        .trim()
        .replace(/[\r\n\t]/g, " ")
        .replace(/[\x00-\x1F\x7F]/g, "")
        .substring(0, 80);

      setHistory((prev) => {
        const updated = prev.map((item) => {
          if (item.id === id) {
            updatedItem = { ...item, customTitle: sanitizedTitle || undefined };
            return updatedItem;
          }
          return item;
        });

        if (!user) {
          safeSetLocalStorage(GUEST_STORAGE_KEY, JSON.stringify(updated));
        }
        return updated;
      });

      setEditingTitleId(null);

      if (user && updatedItem) {
        saveJournalInCloud(user.uid, updatedItem).catch((err) =>
          console.error("Gagal memperbarui judul di cloud:", err)
        );
      }
    },
    [user]
  );

  // Export entry to markdown
  const exportEntry = useCallback((item: ReadingHistoryItem, domainLabel?: string) => {
    exportJournalToMarkdown(item, domainLabel);
  }, []);

  // Filter & sort memoized list
  const filteredAndSortedHistory = useMemo(() => {
    return [...history]
      .filter((item) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        const textMatch = item.originalText.toLowerCase().includes(query);
        const coreMatch = item.result.coreMeaning?.toLowerCase().includes(query) || false;
        const authorMatch = item.result.context?.styleOrAuthor?.toLowerCase().includes(query) || false;
        const eraMatch = item.result.context?.movementOrEra?.toLowerCase().includes(query) || false;
        const customTitleMatch = item.customTitle?.toLowerCase().includes(query) || false;

        return textMatch || coreMatch || authorMatch || eraMatch || customTitleMatch;
      })
      .sort((a, b) => {
        if (sortBy === "tersemat") {
          const pinA = a.isPinned ? 1 : 0;
          const pinB = b.isPinned ? 1 : 0;
          if (pinA !== pinB) return pinB - pinA;
          return b.timestamp.localeCompare(a.timestamp);
        }
        if (sortBy === "terbaru") {
          return b.timestamp.localeCompare(a.timestamp);
        }
        if (sortBy === "terlama") {
          return a.timestamp.localeCompare(b.timestamp);
        }
        return 0;
      });
  }, [history, searchQuery, sortBy]);

  return {
    history,
    setHistory,
    selectedHistoryId,
    setSelectedHistoryId,
    showHistoryPanel,
    setShowHistoryPanel,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    editingTitleId,
    setEditingTitleId,
    editedTitleVal,
    setEditedTitleVal,
    addEntry,
    togglePin,
    removeEntry,
    updateTitle,
    exportEntry,
    filteredAndSortedHistory,
  };
}
