export interface ToneConfig {
  animationDuration: string;
  containerSpacing: string;
  cardBg: string;
  textStyle: string;
  borderAccent: string;
  buttonStyle: string;
}

export type ToneKey =
  | "philosophical"
  | "academic"
  | "emotional"
  | "reflective"
  | "analytical"
  | "poetic"
  | "default";

export const TONE_CONFIGS: Record<ToneKey, ToneConfig> = {
  philosophical: {
    animationDuration: "1400ms",
    containerSpacing: "space-y-7",
    cardBg:
      "bg-[#FCFAF7] border border-[#DCCBB8]/70 shadow-[0_2px_8px_rgba(46,37,30,0.02)] hover:bg-[#FFFDFB] hover:border-[#B48464]/65 hover:shadow-[0_16px_36px_-6px_rgba(74,62,49,0.08),_0_6px_16px_-4px_rgba(74,62,49,0.04)] focus-within:bg-[#FFFDFB] focus-within:border-[#B48464]/75",
    textStyle:
      "font-serif text-[#2C231B] text-[15.5px] sm:text-[16.5px] leading-[1.85] italic tracking-[0.01em]",
    borderAccent: "border-[#D0B18B]/25",
    buttonStyle: "hover:bg-[#FAF5ED] border-[#DCCBB8] hover:border-[#B48464]",
  },
  academic: {
    animationDuration: "600ms",
    containerSpacing: "space-y-4.5",
    cardBg:
      "bg-[#FCFAF7] border border-[#DCCBB8]/60 shadow-[0_2px_6px_rgba(46,37,30,0.025)] hover:bg-[#FFFDFB] hover:border-[#8E8071]/70 hover:shadow-[0_12px_28px_-4px_rgba(46,37,30,0.06),_0_4px_10px_-2px_rgba(46,37,30,0.03)]",
    textStyle:
      "font-serif text-[#332A21] text-[14.5px] sm:text-[15.5px] leading-[1.7] font-normal",
    borderAccent: "border-[#A49482]/20",
    buttonStyle: "hover:bg-[#FAF8F5] border-[#EADCC9] hover:border-[#8E8071]",
  },
  emotional: {
    animationDuration: "1050ms",
    containerSpacing: "space-y-6",
    cardBg:
      "bg-[#FCFAF7] border border-[#E8D4C0] shadow-[0_2px_8px_rgba(74,62,49,0.02)] hover:bg-[#FFFAF5] hover:border-[#D5A086]/70 hover:shadow-[0_16px_32px_-6px_rgba(110,80,60,0.08),_0_6px_14px_-4px_rgba(110,80,60,0.04)]",
    textStyle:
      "font-serif text-[#362B21] text-[15px] sm:text-[16px] leading-[1.8] tracking-[0.015em] font-medium",
    borderAccent: "border-[#D5A086]/30",
    buttonStyle: "hover:bg-[#FFFDFB] border-[#EBE0D5] hover:border-[#D5A086]",
  },
  reflective: {
    animationDuration: "900ms",
    containerSpacing: "space-y-6",
    cardBg:
      "bg-[#FCFAF7] border border-[#EADCC9]/80 shadow-[0_2px_8px_rgba(46,37,30,0.02)] hover:bg-[#FFFDFB] hover:border-[#B88968]/70 hover:shadow-[0_16px_36px_-6px_rgba(74,62,49,0.08),_0_6px_16px_-4px_rgba(74,62,49,0.04)]",
    textStyle:
      "font-serif text-[#332A21] text-[15px] sm:text-[16px] leading-[1.8]",
    borderAccent: "border-[#EADCC9]/20",
    buttonStyle: "hover:bg-[#FAF6F0] border-[#DECFC0]/80 hover:border-[#B88968]/70",
  },
  analytical: {
    animationDuration: "500ms",
    containerSpacing: "space-y-4",
    cardBg:
      "bg-[#FCFAF7] border border-[#DFCFC0]/85 shadow-[0_1px_4px_rgba(0,0,0,0.015)] hover:bg-[#FAF9F5] hover:border-[#968778]/75 hover:shadow-[0_8px_20px_rgba(46,37,30,0.04)]",
    textStyle:
      "font-mono text-xs sm:text-[13px] text-[#241F1A] leading-relaxed tracking-tight",
    borderAccent: "border-[#EADCC9]/45",
    buttonStyle: "hover:bg-[#F8F6F2] border-[#DFCFC0] hover:border-[#968778]",
  },
  poetic: {
    animationDuration: "1200ms",
    containerSpacing: "space-y-6",
    cardBg:
      "bg-[#FCFAF7] border border-[#EADCC9]/90 shadow-[0_2px_8px_rgba(46,37,30,0.02)] hover:bg-[#FFFDF7] hover:border-[#C0A85C]/65 hover:shadow-[0_16px_36px_-6px_rgba(150,140,110,0.07),_0_6px_16px_-4px_rgba(150,140,110,0.03)]",
    textStyle:
      "font-serif text-[#28211A] text-[15px] sm:text-[16px] leading-[1.85] italic tracking-[0.025em]",
    borderAccent: "border-[#DECFA0]/30",
    buttonStyle: "hover:bg-[#FDFCF7] border-[#DECFA0] hover:border-[#C0A85C]",
  },
  default: {
    animationDuration: "900ms",
    containerSpacing: "space-y-6",
    cardBg:
      "bg-[#FCFAF7] border border-[#EADCC9]/80 shadow-[0_2px_8px_rgba(46,37,30,0.02)] hover:bg-[#FFFDFB] hover:border-[#B88968]/70 hover:shadow-[0_16px_36px_-6px_rgba(74,62,49,0.08),_0_6px_16px_-4px_rgba(74,62,49,0.04)]",
    textStyle:
      "font-serif text-[#332A21] text-[15px] sm:text-[16px] leading-[1.8]",
    borderAccent: "border-[#EADCC9]/20",
    buttonStyle: "hover:bg-[#FAF6F0] border-[#DECFC0]/80 hover:border-[#B88968]/70",
  },
};
