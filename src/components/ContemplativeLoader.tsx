import React from "react";
import { BookOpen } from "lucide-react";

interface ContemplativeLoaderProps {
  loadingStep: number;
  loadingPhrases: string[];
}

export const ContemplativeLoader: React.FC<ContemplativeLoaderProps> = ({
  loadingStep,
  loadingPhrases,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-12 text-center space-y-8 layer-reveal" id="reading-loader-view">
      {/* Contemplative Thinking Presence - Mind unfolding meaning */}
      <div className="relative w-32 h-32 mx-auto flex items-center justify-center mb-4" id="loader-animation-container">
        {/* Soft warm ivory glow radial backdrop with a hint of warm sunset apricot and terracotta */}
        <div className="absolute inset-4 bg-gradient-to-tr from-[#FDF0E5]/45 via-[#FCFAF7]/90 to-[#B98B68]/15 rounded-full mental-glow" id="loader-ambient-glow"></div>
        
        {/* Outer faint thin ring: very slow rotation, gentle thought-wave pulse */}
        <div className="absolute inset-0 rounded-full border border-[#C8A27A]/25 thinking-ring-outer" id="loader-ring-outer"></div>
        
        {/* Middle dashed ring: Counter-flow rotation, staggered mid thought-wave pulse */}
        <div className="absolute inset-3 rounded-full border border-dashed border-[#B98B68]/30 thinking-ring-mid" id="loader-ring-mid" style={{ animationDelay: '1.2s' }}></div>

        {/* Inner ultra-faint ring: clockwise rotation, staggered inner thought-wave pulse */}
        <div className="absolute inset-6 rounded-full border border-[#C8A27A]/20 thinking-ring-inner" id="loader-ring-inner" style={{ animationDelay: '2.4s' }}></div>

        {/* Centerpiece core: soft organic ivory button with breathing scaling and a quiet warm glow */}
        <div className="absolute w-[52px] h-[52px] rounded-full flex items-center justify-center border border-[#C8A27A]/30 thinking-core shadow-[0_4px_24px_rgba(185,139,104,0.15)]" id="loader-core">
          <BookOpen className="w-[18px] h-[18px] text-[#B98B68] thinking-icon" id="loader-icon" />
        </div>
      </div>
      
      {/* Elegant thinking text with a delicate shimmer line */}
      <div className="space-y-4 max-w-md mx-auto thinking-text-drift" id="loader-text-block">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8A7968]/90 font-bold" id="loader-sublabel">
          Menimbang kata demi kata
        </p>
        
        {/* A delicate divider with a quiet contemplative shimmer */}
        <div className="w-16 h-[1px] bg-[#EADCC9]/60 mx-auto contemplative-shimmer-line" id="loader-divider-line"></div>
        
        <p className="font-serif text-sm sm:text-base italic text-[#2E251E] leading-relaxed px-4" id="loader-phrase">
          “{loadingPhrases[loadingStep]}”
        </p>
      </div>

      {/* Subtle elegant ghost lines mirroring Noema's custom dividers */}
      <div className="pt-2 space-y-3 max-w-md mx-auto opacity-30" id="loader-ghost-matrix">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#EADCC9]/55 to-transparent contemplative-shimmer-line"></div>
        <div className="flex flex-col space-y-1.5 px-6">
          <div className="h-1 w-12 bg-[#EADCC9]/30 rounded mx-auto ambient-breath"></div>
          <div className="h-1.5 w-48 bg-[#EADCC9]/15 rounded mx-auto ambient-breath" style={{ animationDelay: '0.8s' }}></div>
        </div>
      </div>
    </div>
  );
};
