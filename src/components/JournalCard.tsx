import React from "react";
import { Pin, Download, Trash2 } from "lucide-react";
import { ReadingHistoryItem } from "../types";
import { getDomainLabel } from "../utils/thoughtTracesFallback";

interface JournalCardProps {
  item: ReadingHistoryItem;
  isSelected: boolean;
  onSelect: (item: ReadingHistoryItem) => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onExport: (item: ReadingHistoryItem) => void;
  onRemove: (id: string, e: React.MouseEvent) => void;
}

export const JournalCard: React.FC<JournalCardProps> = ({
  item,
  isSelected,
  onSelect,
  onTogglePin,
  onExport,
  onRemove,
}) => {
  return (
    <div
      id={`history-item-${item.id}`}
      onClick={() => onSelect(item)}
      className={`relative p-3 rounded-lg border text-left transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between group min-h-[88px] h-auto ${
        isSelected
          ? "bg-[#2E251E] text-[#FAF6F0] border-[#2E251E] shadow-xs"
          : "bg-[#FBF9F6] text-[#2E251E] border-[#EADCC9]/55 hover:border-[#B98B68]/70 hover:bg-[#FAF7F2] hover:shadow-[0_4px_14px_rgba(185,139,104,0.04)]"
      }`}
    >
      <div className="flex-1 overflow-hidden" id={`history-inner-${item.id}`}>
        <div className="flex items-start justify-between" id="history-top">
          <div className="flex items-center space-x-1.5 overflow-hidden flex-1 mr-2" id="card-meta">
            {item.isPinned && (
              <Pin className="w-2.5 h-2.5 text-[#B98B68] shrink-0 fill-[#B98B68]" id={`history-pinned-badge-${item.id}`} />
            )}
            <span
              className={`text-[8.5px] font-sans uppercase tracking-[0.12em] font-bold transition-colors duration-500 truncate ${
                isSelected ? "text-[#D4C3B3]" : "text-[#8C7D70] group-hover:text-[#5E5145]"
              }`}
              id={`history-domain-${item.id}`}
            >
              {getDomainLabel(item.result)}
            </span>
          </div>

          {/* Card action panel - elegant small hover buttons container */}
          <div className="flex items-center space-x-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            {/* Pin Toggle Button */}
            <button
              type="button"
              onClick={(e) => onTogglePin(item.id, e)}
              className={`p-0.5 rounded transition-all duration-300 ease-out whitespace-nowrap leading-none opacity-0 group-hover:opacity-100 ${
                isSelected
                  ? item.isPinned
                    ? "text-[#C27E5A] hover:bg-[#43362C]/70"
                    : "text-[#E5D7CA] hover:bg-[#43362C]/70"
                  : item.isPinned
                  ? "text-[#C27E5A] hover:bg-[#EADCC9]/50"
                  : "text-[#8C7D70] hover:bg-[#EADCC9]/50"
              }`}
              title={item.isPinned ? "Lepas sematan" : "Sematkan catatan"}
            >
              <Pin className="w-2.5 h-2.5" style={{ fill: item.isPinned ? "currentColor" : "none" }} />
            </button>

            {/* Export Card Button */}
            <button
              type="button"
              onClick={() => onExport(item)}
              className={`p-0.5 rounded transition-all duration-300 ease-out whitespace-nowrap leading-none ${
                isSelected
                  ? "text-[#E5D7CA] hover:bg-[#43362C]/70"
                  : "text-[#8C7D70] opacity-0 group-hover:opacity-100 hover:bg-[#EADCC9]/50"
              }`}
              title="Ekspor sebagai Markdown (.md)"
            >
              <Download className="w-2.5 h-2.5" />
            </button>

            {/* Delete Card Button */}
            <button
              type="button"
              onClick={(e) => onRemove(item.id, e)}
              className={`p-0.5 rounded transition-all duration-300 ease-out whitespace-nowrap leading-none ${
                isSelected
                  ? "hover:bg-[#43362C] text-[#E5D7CA]"
                  : "hover:bg-[#EADCC9]/50 text-[#8C7D70] opacity-0 group-hover:opacity-100"
              }`}
              title="Hapus catatan"
            >
              <Trash2 className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Display custom title if provided, fallback to style/author header */}
        <h4
          className={`text-xs font-serif font-semibold mt-1 leading-tight tracking-wide truncate ${
            isSelected ? "text-[#FAF6F0]" : "text-[#2E251E]"
          }`}
        >
          {item.customTitle || `${item.result.context?.styleOrAuthor || "Selisik Membaca"}`}
        </h4>

        <p
          className={`text-[10.5px] line-clamp-1 italic font-serif leading-relaxed mt-1 transition-colors duration-500 opacity-80 ${
            isSelected ? "text-[#E5D7CA]" : "text-[#5E5145] group-hover:text-[#2E251E]"
          }`}
          id={`history-snippet-${item.id}`}
        >
          “{item.originalText}”
        </p>
      </div>
    </div>
  );
};
