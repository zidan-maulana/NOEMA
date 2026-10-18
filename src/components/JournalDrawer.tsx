import React from "react";
import { Bookmark, Pin, ArrowUpDown, Search } from "lucide-react";
import { ReadingHistoryItem } from "../types";
import { JournalCard } from "./JournalCard";

interface JournalDrawerProps {
  history: ReadingHistoryItem[];
  filteredAndSortedHistory: ReadingHistoryItem[];
  selectedHistoryId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: "terbaru" | "terlama" | "tersemat";
  setSortBy: (sort: "terbaru" | "terlama" | "tersemat") => void;
  onSelect: (item: ReadingHistoryItem) => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onExport: (item: ReadingHistoryItem) => void;
  onRemove: (id: string, e: React.MouseEvent) => void;
}

export const JournalDrawer: React.FC<JournalDrawerProps> = ({
  history,
  filteredAndSortedHistory,
  selectedHistoryId,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  onSelect,
  onTogglePin,
  onExport,
  onRemove,
}) => {
  return (
    <div id="journal-drawer" className="mb-6 p-4 sm:p-5 bg-[#FAF6F0] border border-[#EADCC9] rounded-xl shadow-xs transition-all duration-300 fade-in-up">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#EADCC9]/40" id="journal-header">
        <div className="flex items-center space-x-1.5 text-[#2E251E]" id="journal-heading">
          <Bookmark className="w-3.5 h-3.5 text-[#C27E5A]" id="bookmark-deco" />
          <h3 className="font-serif font-medium text-xs tracking-wide" id="journal-title">Jurnal Membaca Anda</h3>
        </div>
        
        <div className="flex items-center space-x-2 xs:space-x-3 text-[10px]" id="journal-controls">
          {history.length > 0 && (
            <>
              {/* Simple sort selection pill */}
              <div className="flex items-center space-x-1 xs:space-x-1.5 text-[#8C7D70] font-sans" id="sort-controls">
                {sortBy === "tersemat" ? (
                  <Pin className="w-3 h-3 text-[#C27E5A] fill-[#C27E5A]" id="sort-icon" />
                ) : (
                  <ArrowUpDown className="w-3 h-3 text-[#C27E5A]" id="sort-icon" />
                )}
                <span className="font-semibold text-[9px] uppercase tracking-wider">Urut:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-[#2E251E] font-serif focus:outline-none cursor-pointer pr-1 transition-colors hover:text-[#C27E5A] text-[11px]"
                  id="sort-select"
                >
                  <option value="tersemat">Tersemat</option>
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                </select>
              </div>
              <span className="text-[#EADCC9]" id="journal-meta-sep">|</span>
            </>
          )}
          <span className="font-serif italic text-[#8C7D70]/90" id="journal-count-text">{history.length} Catatan</span>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-1.5" id="journal-empty-state">
          <p className="text-xs sm:text-[13px] font-serif italic text-[#8A7968]/90">
            Belum ada pembacaan yang disimpan.
          </p>
        </div>
      ) : (
        <>
          {/* Search Input Block */}
          <div className="relative mb-3.5" id="journal-search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari dalam catatan..."
              className="w-full pl-8 pr-8 py-1.5 bg-[#FDFBF7] border border-[#EADCC9]/70 rounded-lg text-xs font-serif text-[#2E251E] placeholder:text-[#8C7D70]/60 focus:outline-none focus:border-[#C27E5A]/60 focus:shadow-[0_0_8px_rgba(194,126,90,0.04)] transition-all"
              id="journal-search-input"
            />
            <Search className="w-3.5 h-3.5 text-[#8C7D70]/50 absolute left-2.5 top-1/2 -translate-y-1/2" id="journal-search-icon" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-[#8C7D70]/60 hover:text-[#2E251E] leading-none focus:outline-none px-1"
                title="Bersihkan"
                id="clear-search-btn"
              >
                &times;
              </button>
            )}
          </div>
          
          {filteredAndSortedHistory.length === 0 ? (
            <div className="py-6 text-center" id="journal-empty-search">
              <p className="text-xs font-serif italic text-[#8C7D70]/90">Tidak ditemukan catatan yang selaras.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1" id="journal-list">
              {filteredAndSortedHistory.map((item) => (
                <JournalCard
                  key={item.id}
                  item={item}
                  isSelected={selectedHistoryId === item.id}
                  onSelect={onSelect}
                  onTogglePin={onTogglePin}
                  onExport={onExport}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
