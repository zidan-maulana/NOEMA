import React from "react";
import { AnalysisResult } from "../types";
import { shouldShowThoughtTrace, getThoughtTraces } from "../utils/thoughtTracesFallback";

interface HermeneuticSectionProps {
  result: AnalysisResult;
  revealedLayers: number;
  originalText: string;
}

export const HermeneuticSection: React.FC<HermeneuticSectionProps> = ({
  result,
  revealedLayers,
  originalText,
}) => {
  // If the input was restrained (not enough semantic density)
  if (result.hasEnoughDensity === false) {
    return (
      <div className="max-w-2xl mx-auto mt-8 text-center space-y-4 layer-reveal" id="restrained-result-view">
        <div className="px-6 sm:px-10 py-5 bg-[#FCFAF7] border border-[#EADCC9]/55 rounded-xl shadow-[0_1px_4px_rgba(46,37,30,0.02)] hover:shadow-[0_4px_14px_rgba(185,139,104,0.04)] hover:bg-[#FDFDFB] transition-all duration-500 ease-out" id="restrained-card">
          <div className="text-[8.5px] font-sans uppercase tracking-[0.2em] text-[#867565] mb-4 font-bold pb-1.5 border-b border-[#EADCC9]/20 flex items-center justify-center space-x-1.5 opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B98B68]/40"></span>
            <span className="sans tracking-wider text-[8px]">Restorasi Gagasan</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B98B68]/40"></span>
          </div>
          <p className="font-serif italic text-sm sm:text-base text-[#5E5145] leading-[1.8] px-2" id="restrained-text">
            “{result.restrainedMessage || "Fragmen ini belum memiliki kepadatan makna yang cukup untuk ditelusuri."}”
          </p>
        </div>
        <p className="text-[10px] font-sans text-[#8A7968]/70 italic tracking-wide">
          Saran: Masukkan gagasan yang lebih utuh atau konsep yang lebih padat.
        </p>
      </div>
    );
  }

  // Only displayed once all 4 layers are completely revealed
  if (revealedLayers < 4) {
    return null;
  }

  const traces = getThoughtTraces(result);

  return (
    <div className="max-w-2xl mx-auto space-y-8" id="hermeneutic-full-unfolded">
      
      {/* 1. Untaian Gagasan (Decoded Concepts) */}
      {result.vocabList && result.vocabList.length > 0 && (
        <div 
          className="pt-6 border-t border-[#EADCC9]/50 space-y-4 layer-reveal delay-200" 
          id="vocabulary-box"
        >
          <div className="pb-1" id="vocab-title-bar">
            <h4 className="font-sans uppercase text-[8.5px] tracking-[0.22em] font-bold text-[#8C7D70]" id="vocab-title">
              Untaian Gagasan
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4.5 text-left" id="vocab-list">
            {result.vocabList.map((entry, vIdx) => (
              <div key={vIdx} className="space-y-1 border-l border-[#EADCC9]/30 pl-3.5" id={`vocab-entry-${vIdx}`}>
                <span className="font-serif italic font-semibold text-[13.5px] sm:text-sm text-[#2E251E] block" id={`vocab-term-${vIdx}`}>
                  {entry.term}
                </span>
                <p className="font-serif text-xs sm:text-[13px] text-[#5E5145] leading-relaxed" id={`vocab-definition-${vIdx}`}>
                  {entry.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Pembacaan Kedua (Hermeneutic Reflection) */}
      <div 
        className="pt-6 border-t border-[#EADCC9]/50 space-y-5 mt-8 layer-reveal delay-300 text-left"
        id="second-reading-box"
      >
        <div className="pb-1" id="second-reading-title-bar">
          <h4 className="font-sans uppercase text-[8.5px] tracking-[0.22em] font-bold text-[#8C7D70]" id="second-reading-title">
            Pembacaan Kedua
          </h4>
        </div>

        <div className="space-y-4 text-left" id="second-reading-list">
          <div className="space-y-1 border-l border-[#B98B68]/30 pl-3.5" id="second-reading-q1">
            <span className="font-sans text-[8px] uppercase tracking-[0.1em] font-bold text-[#8C7D70]">
              I. Dekonstruksi Inti Pemikiran
            </span>
            <p className="font-serif text-xs sm:text-[13px] text-[#5E5145] leading-relaxed italic">
              “Jika pemikiran tentang &lsquo;{result.coreMeaning}&rsquo; ini benar, prasangka atau asumsi lama apa yang selama ini diam-diam membatasi cara kita melihat kenyataan?”
            </p>
          </div>

          <div className="space-y-1 border-l border-[#B98B68]/30 pl-3.5" id="second-reading-q2">
            <span className="font-sans text-[8px] uppercase tracking-[0.1em] font-bold text-[#8C7D70]">
              II. Relevansi Eksistensial
            </span>
            <p className="font-serif text-xs sm:text-[13px] text-[#5E5145] leading-relaxed italic">
              “Mengingat bahwa &lsquo;{result.whyThisMatters}&rsquo;, bagian mana dari kebiasaan atau sudut pandang harian kita yang paling terusik oleh gagasan ini?”
            </p>
          </div>

          <div className="space-y-1 border-l border-[#B98B68]/30 pl-3.5" id="second-reading-q3">
            <span className="font-sans text-[8px] uppercase tracking-[0.1em] font-bold text-[#8C7D70]">
              III. Poros Refleksi
            </span>
            <p className="font-serif text-xs sm:text-[13px] text-[#5E5145] leading-relaxed italic">
              “Menanggapi gugatan radikal: &lsquo;{result.thinkDeeper}&rsquo;, ke arah mana pemahaman baru kita harus mulai melangkah?”
            </p>
          </div>
        </div>
      </div>

      {/* 3. Jejak Pemikiran (Deep Semantic Cross-Linking) */}
      {shouldShowThoughtTrace(result) && (
        <div 
          className="pt-6 border-t border-[#EADCC9]/55 space-y-3.5 mt-8 layer-reveal delay-350 text-left"
          id="thought-trace-box"
        >
          <div className="pb-0.5 text-left" id="thought-trace-title-bar">
            <h4 className="font-sans uppercase text-[8.5px] tracking-[0.22em] font-bold text-[#8C7D70]" id="thought-trace-title">
              Jejak Pemikiran
            </h4>
          </div>

          <div className="text-left space-y-2.5" id="thought-trace-content">
            <p className="font-serif italic text-xs text-[#8C7D70]/90 leading-relaxed">
              Pemikiran ini beresonansi dengan:
            </p>
            
            <div className="space-y-2" id="thought-trace-list">
              {traces.map((trace, tIdx) => (
                <div key={tIdx} className="flex items-start text-xs font-serif leading-relaxed" id={`thought-trace-entry-${tIdx}`}>
                  <span className="text-[#C27E5A]/60 mr-2 select-none font-sans mt-0.5">•</span>
                  <div className="text-pretty" id={`thought-trace-text-wrapper-${tIdx}`}>
                    <span className="font-semibold text-[#2E251E] mr-1.5" id={`thought-trace-thinker-${tIdx}`}>
                      {trace.thinker}
                    </span>
                    <span className="text-[#8C7D70]/60 text-[10px] font-sans select-none mr-1.5">—</span>
                    <span className="text-[#5E5145]/75 italic" id={`thought-trace-resonance-${tIdx}`}>
                      {trace.resonance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Rujukan Paragraf Asli */}
      <div 
        className="pt-6 border-t border-[#EADCC9]/35 space-y-2 mt-8 layer-reveal delay-400"
        id="source-quote-box"
      >
        <span className="text-[8.5px] font-sans text-[#8C7D70] uppercase tracking-[0.22em] block font-semibold">Rujukan Paragraf Asli</span>
        <p className="text-xs sm:text-[13px] font-serif italic text-[#6E5E50] leading-[1.65] max-w-2xl text-pretty block">
          &ldquo;{originalText}&rdquo;
        </p>
      </div>

    </div>
  );
};
