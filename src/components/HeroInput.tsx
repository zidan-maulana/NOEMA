import React, { useRef } from "react";
import { Info } from "lucide-react";
import { PRESETS, Preset } from "../presets";

interface HeroInputProps {
  text: string;
  setText: (val: string) => void;
  isLoading: boolean;
  error: string | null;
  errorType: "quota" | "server" | "input" | null;
  activePresetIndex: number;
  onSelectPreset: (preset: Preset, index: number) => void;
  onReset: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const HeroInput: React.FC<HeroInputProps> = ({
  text,
  setText,
  isLoading,
  error,
  errorType,
  activePresetIndex,
  onSelectPreset,
  onReset,
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="space-y-6 sm:space-y-8 fade-in-up" id="main-above-fold-workspace">
      
      {/* Landing Hero Headline Block */}
      <div className="text-center space-y-3.5" id="landing-hero-block">
        <h1 className="font-serif text-[26px] sm:text-[34px] text-[#2E251E] leading-[1.3] sm:leading-[1.35] font-medium tracking-wide text-pretty" id="hero-headline">
          Teman berpikir untuk buku yang selama ini kamu tutup di halaman sepuluh.
        </h1>
        <p className="font-serif italic text-[#8A7968]/95 text-xs sm:text-[13.5px] tracking-wide max-w-lg mx-auto" id="hero-subheadline">
          Bawa paragraf yang masih mengendap di pikiranmu.
        </p>
      </div>

      {/* Paragraph Analysis Form */}
      <form onSubmit={onSubmit} className="space-y-4" id="paragraph-form">
        <div className="flex flex-col bg-[#FAF6F0] rounded-xl border border-[#D8C7B4] focus-within:border-[#B88968] transition-all duration-200 shadow-2xs group" id="textarea-wrapper">
          
          <textarea
            ref={textareaRef}
            value={text}
            id="reading-textarea"
            disabled={isLoading}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Tuliskan di sini paragraf yang ingin diselisik…"
            className="w-full h-[180px] sm:h-[200px] px-6 pt-3.5 pb-4 bg-transparent text-[#2E251E] placeholder:text-[#9A8B7B]/85 text-sm sm:text-base font-serif leading-[1.8] resize-none focus:outline-none overflow-y-auto no-scrollbar"
          />

          <div className="flex items-center justify-between px-5 py-2.5 bg-[#FAF6F0]/50 border-t border-[#EADCC9]/30 rounded-b-xl" id="textarea-footer-row">
            <div className={`text-[10px] font-sans tracking-wide transition-colors duration-200 ${text.length > 4000 ? "text-[#B86A4D] font-medium" : "text-[#8A7968]/75"}`} id="characters-count">
              {text.length} / 4000
            </div>

            {text.trim().length > 0 && !isLoading && (
              <button
                type="button"
                id="clear-textarea-btn"
                onClick={onReset}
                className="text-[10px] font-sans text-[#8A7968] hover:text-[#C27E5A] transition-colors py-0.5 px-1.5 bg-[#F3EDE3] border border-[#EADCC9]/55 hover:bg-[#FAF6F0] rounded cursor-pointer leading-none"
              >
                Bersihkan
              </button>
            )}
          </div>
        </div>

        {/* Subtle Inline Try An Example buttons */}
        <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 py-1" id="try-examples-line">
          <span className="text-[8px] font-sans uppercase tracking-[0.18em] font-bold text-[#8C7D70]/80">Coba Rujukan Paragraf:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              id={`try-example-link-${idx}`}
              onClick={() => onSelectPreset(p, idx)}
              className={`font-serif text-xs italic underline decoration-[#D8C7B4] decoration-1 underline-offset-4 hover:text-[#2E251E] hover:decoration-[#C27E5A] transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                activePresetIndex === idx ? "text-[#C27E5A] font-semibold" : "text-[#5E5145]"
              }`}
            >
              {p.author}
            </button>
          ))}
        </div>

        {/* Error / Quota Notifications */}
        {error && errorType === "quota" ? (
          <div className="max-w-2xl mx-auto mt-6 text-center space-y-4 layer-reveal" id="quota-error-view">
            <div className="px-6 sm:px-10 py-5 bg-[#FCFAF7] border border-[#EADCC9]/55 rounded-xl shadow-[0_1px_4px_rgba(46,37,30,0.02)] hover:shadow-[0_4px_14px_rgba(185,139,104,0.04)] hover:bg-[#FDFDFB] transition-all duration-500 ease-out text-center" id="quota-card">
              <div className="text-[8.5px] font-sans uppercase tracking-[0.2em] text-[#867565] mb-4 font-bold pb-1.5 border-b border-[#EADCC9]/20 flex items-center justify-center space-x-1.5 opacity-80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B98B68]/40"></span>
                <span className="sans tracking-wider text-[8px]">JEDA PEMBACAAN</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B98B68]/40"></span>
              </div>
              <p className="font-serif italic text-sm sm:text-base text-[#5E5145] leading-[1.8] px-2" id="quota-error-text">
                “{error}”
              </p>
            </div>
          </div>
        ) : error ? (
          <div
            className="p-4 sm:p-5 rounded-2xl border text-center transition-all duration-500 bg-[#FAF6F0] border-[#EADCC9] text-[#4A3B32] mt-4 shadow-2xs"
            id="error-alert"
          >
            <p className="font-serif italic text-xs sm:text-[13px] leading-[1.8] text-[#5C4E43] max-w-xl mx-auto">
              “{error}”
            </p>
          </div>
        ) : null}

        {/* Submit Button Tray */}
        <div className="flex justify-center" id="submit-tray">
          <button
            type="submit"
            id="analyze-submit-btn"
            disabled={isLoading || !text.trim() || text.length > 4000}
            className={`py-3 px-8 font-serif font-medium text-xs tracking-wide rounded-full flex items-center justify-center border min-w-[220px] ${
              isLoading || !text.trim() || text.length > 4000
                ? "bg-[#EADCC9] text-[#FAF6F0]/50 border-[#EADCC9] cursor-not-allowed shadow-none"
                : "bg-[#2E251E] text-[#FAF6F0] border-[#2E251E] hover:bg-[#43362C] hover:border-[#43362C] shadow-sm hover:shadow-md cursor-pointer"
            }`}
            style={{
              transition: "background-color 350ms cubic-bezier(0.22, 1, 0.36, 1), color 350ms cubic-bezier(0.22, 1, 0.36, 1), border-color 350ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 350ms cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          >
            <span id="btn-label" className="font-serif leading-none">
              {isLoading ? "Menyelisik gagasan..." : "Bantu Memahami"}
            </span>
          </button>
        </div>
      </form>

    </div>
  );
};
