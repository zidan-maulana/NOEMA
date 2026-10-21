import React from "react";
import { Check, X, Edit3, Copy, ChevronDown } from "lucide-react";
import { AnalysisResult, ReadingHistoryItem } from "../types";
import { TONE_CONFIGS, ToneKey } from "../utils/toneConfigs";
import { getDomainLabel } from "../utils/thoughtTracesFallback";

interface AnalysisCardsProps {
  result: AnalysisResult;
  revealedLayers: number;
  selectedHistoryItem?: ReadingHistoryItem;
  copied: boolean;
  editingTitleId: string | null;
  editedTitleVal: string;
  setEditingTitleId: (id: string | null) => void;
  setEditedTitleVal: (val: string) => void;
  onUpdateTitle: (id: string, val: string) => void;
  onCopyAnalysis: () => void;
  onRevealNext: () => void;
}

export const AnalysisCards: React.FC<AnalysisCardsProps> = ({
  result,
  revealedLayers,
  selectedHistoryItem,
  copied,
  editingTitleId,
  editedTitleVal,
  setEditingTitleId,
  setEditedTitleVal,
  onUpdateTitle,
  onCopyAnalysis,
  onRevealNext,
}) => {
  const activeTone = (result.inferredTone || "default") as ToneKey;
  const toneConfig = TONE_CONFIGS[activeTone] || TONE_CONFIGS.default;

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6" id="analytical-result-view">
      
      {/* Visual separator / Transition label */}
      <div className="flex items-center space-x-3 text-[#EADCC9]/50 py-1 layer-reveal delay-100" id="results-divider">
        <span className="h-[1px] bg-[#EADCC9]/45 flex-1"></span>
        <span className="text-[8px] font-sans uppercase tracking-[0.24em] text-[#837262] font-semibold">Lapisan Makna</span>
        <span className="h-[1px] bg-[#EADCC9]/45 flex-1"></span>
      </div>

      {/* Flat text-only intellectual alignment line */}
      <div className="text-[11px] sm:text-[11.5px] font-serif text-[#8A7968] py-1.5 border-b border-[#EADCC9]/35 pb-2 mb-1 layer-reveal delay-200" id="context-banner">
        <div 
          className="italic leading-relaxed line-clamp-2" 
          id="style-labels"
          title={`Gaya tulisan: ${getDomainLabel(result)} | ${result.context?.styleOrAuthor || "Reflektif"} • ${result.context?.movementOrEra || "Kontemporer"}`}
        >
          Gaya tulisan: <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#B98B68]/8 text-[#5E5145] text-[8.5px] font-sans uppercase tracking-[0.12em] not-italic font-bold mx-1.5 align-middle select-none">{getDomainLabel(result)}</span> <span className="font-semibold text-[#2E251E] not-italic">{result.context?.styleOrAuthor || "Reflektif"}</span> &bull; <span className="text-[#8C7D70] not-italic text-[9px] font-sans tracking-[0.16em] uppercase ml-1.5 font-semibold">{result.context?.movementOrEra || "Kontemporer"}</span>
        </div>
      </div>

      {/* Inline renaming and copy action panel for active reading */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-serif bg-[#FCFAF7]/80 border border-[#EADCC9]/50 rounded-xl px-4 py-3 layer-reveal delay-250 mt-4" id="active-item-controls">
        <div className="flex-1 min-w-0 xs:min-w-[240px] w-full">
          {selectedHistoryItem ? (
            editingTitleId === selectedHistoryItem.id ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdateTitle(selectedHistoryItem.id, editedTitleVal);
                }}  
                className="flex items-center space-x-2 w-full"
                id="active-rename-form"
              >
                <input
                  type="text"
                  value={editedTitleVal}
                  onChange={(e) => setEditedTitleVal(e.target.value)}
                  placeholder="Beri judul pembacaan ini..."
                  className="flex-1 bg-[#FAF6F0] border border-[#B98B68]/60 rounded-md px-2.5 py-1 text-xs font-serif text-[#2E251E] focus:outline-none focus:border-[#C27E5A] opacity-90 transition-all font-medium placeholder:italic placeholder:text-[#8C7D70]/60"
                  maxLength={100}
                  autoFocus
                  id="inline-title-input"
                />
                <button type="submit" className="p-1 rounded text-[#C27E5A] hover:text-[#B98B68] shrink-0 cursor-pointer" title="Simpan">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <button type="button" onClick={() => setEditingTitleId(null)} className="p-1 rounded text-[#8C7D70] hover:bg-gray-100 shrink-0 cursor-pointer" title="Batal">
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-[#8C7D70] font-sans text-[8px] uppercase tracking-[0.16em] font-bold shrink-0">Judul Arsip:</span>
                <span className="font-serif italic font-semibold text-[#2E251E] truncate max-w-[130px] xs:max-w-[200px] sm:max-w-[280px]" id="active-title-label">
                  {selectedHistoryItem.customTitle || "Belum dijuduli"}
                </span>
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingTitleId(selectedHistoryItem.id);
                    setEditedTitleVal(selectedHistoryItem.customTitle || "");
                  }}
                  className="p-1 text-[#C27E5A] hover:text-[#B98B68] rounded transition-colors cursor-pointer"
                  title="Ubah judul"
                  id="active-rename-btn"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            )
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-[#8C7D70] font-sans text-[8px] uppercase tracking-[0.16em] font-bold shrink-0">Arsip Pembacaan</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2.5 shrink-0" id="active-card-actions">
          <button
            type="button"
            onClick={onCopyAnalysis}
            className="py-1 px-2.5 text-[#C27E5A] hover:text-[#B98B68] text-[9.5px] font-sans uppercase tracking-[0.14em] font-bold flex items-center space-x-1.5 hover:bg-[#FAF6F0] rounded-md transition-all border border-transparent hover:border-[#EADCC9]/50 cursor-pointer"
            title="Salin seluruh pembacaan ke papan klip"
            id="active-copy-btn"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#B98B68]" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#C27E5A]" />
                <span>Salin Pembacaan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Cards (Strictly Structured Flow with Tone Styling) */}
      <div className={`${toneConfig.containerSpacing} !mt-4`} id="layered-cards-container">
        
        {/* Card 1: Core Meaning (Always visible first) */}
        <div 
          className={`p-4 sm:p-6 rounded-xl transition-all duration-700 ease-out hover:-translate-y-1 sm:hover:-translate-y-1.5 layer-reveal delay-300 ${toneConfig.cardBg}`} 
          style={{ animationDuration: toneConfig.animationDuration }}
          id="card-layer-1"
        >
          <div className="text-[9.5px] font-sans uppercase tracking-[0.2em] text-[#867565] mb-3 font-bold pb-1.5 border-b border-[#EADCC9]/20 flex items-center justify-between">
            <span>I. Inti Pemikiran</span>
            <span className="text-[9px] text-[#A69482] font-normal italic lowercase font-serif">layer i</span>
          </div>
          <p className={`${toneConfig.textStyle} italic`} id="c1-content">
            “{result.coreMeaning}”
          </p>
        </div>

        {/* Card 2: In Human Language */}
        {revealedLayers >= 2 && (
          <div 
            className={`p-4 sm:p-6 rounded-xl transition-all duration-700 ease-out hover:-translate-y-1 sm:hover:-translate-y-1.5 layer-reveal delay-100 ${toneConfig.cardBg}`} 
            style={{ animationDuration: toneConfig.animationDuration }}
            id="card-layer-2"
          >
            <div className="text-[9.5px] font-sans uppercase tracking-[0.2em] text-[#867565] mb-3 font-bold pb-1.5 border-b border-[#EADCC9]/20 flex items-center justify-between">
              <span>II. Terjemahan Gagasan</span>
              <span className="text-[9px] text-[#A69482] font-normal italic lowercase font-serif">layer ii</span>
            </div>
            <p className={toneConfig.textStyle} id="c2-content">
              {result.inHumanLanguage}
            </p>
          </div>
        )}

        {/* Card 3: Why This Matters */}
        {revealedLayers >= 3 && (
          <div 
            className={`p-4 sm:p-6 rounded-xl transition-all duration-700 ease-out hover:-translate-y-1 sm:hover:-translate-y-1.5 layer-reveal delay-100 ${toneConfig.cardBg}`} 
            style={{ animationDuration: toneConfig.animationDuration }}
            id="card-layer-3"
          >
            <div className="text-[9.5px] font-sans uppercase tracking-[0.2em] text-[#867565] mb-3 font-bold pb-1.5 border-b border-[#EADCC9]/20 flex items-center justify-between">
              <span>III. Mengapa Ini Penting</span>
              <span className="text-[9px] text-[#A69482] font-normal italic lowercase font-serif">layer iii</span>
            </div>
            <p className={toneConfig.textStyle} id="c3-content">
              {result.whyThisMatters}
            </p>
          </div>
        )}

        {/* Card 4: Think Deeper */}
        {revealedLayers >= 4 && (
          <div 
            className={`p-4 sm:p-6 rounded-xl transition-all duration-700 ease-out hover:-translate-y-1 sm:hover:-translate-y-1.5 layer-reveal delay-100 ${toneConfig.cardBg}`} 
            style={{ animationDuration: toneConfig.animationDuration }}
            id="card-layer-4"
          >
            <div className="text-[9.5px] font-sans uppercase tracking-[0.2em] text-[#867565] mb-3 font-bold pb-1.5 border-b border-[#EADCC9]/20 flex items-center justify-between">
              <span>IV. Refleksi Lanjutan</span>
              <span className="text-[9px] text-[#A69482] font-normal italic lowercase font-serif">layer iv</span>
            </div>
            <div className={`pl-3.5 sm:pl-5 border-l-2 ${toneConfig.borderAccent} italic ${toneConfig.textStyle}`} id="c4-content">
              {result.thinkDeeper}
            </div>
          </div>
        )}

      </div>

      {/* Tranquil Progressive Reveal Action Button */}
      {revealedLayers < 4 && (
        <div className="flex justify-center pt-3 layer-reveal delay-200" id="progressive-reveal-trigger-block">
          <button
            type="button"
            onClick={onRevealNext}
            className="group py-2.5 sm:py-2 px-5 sm:px-6 font-serif text-[12.5px] italic text-[#5E5145] hover:text-[#2E251E] bg-[#FCFAF7] hover:bg-[#FAF6F0] border border-[#DECFC0]/80 hover:border-[#B88968]/70 rounded-full flex items-center space-x-2 transition-all duration-500 ease-out cursor-pointer shadow-3xs"
            id="reveal-next-layer-btn"
          >
            <span>
              {revealedLayers === 1 && "Telusuri Lapisan II: Terjemahan Gagasan"}
              {revealedLayers === 2 && "Telusuri Lapisan III: Mengapa Ini Penting"}
              {revealedLayers === 3 && "Telusuri Lapisan IV: Refleksi Lanjutan"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#C27E5A] transition-transform duration-500 ease-out group-hover:translate-y-0.5" id="reveal-chevron-icon" />
          </button>
        </div>
      )}

    </div>
  );
};
