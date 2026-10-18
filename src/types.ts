export interface AnalysisResult {
  hasEnoughDensity?: boolean;
  restrainedMessage?: string;
  inferredTone?: "philosophical" | "academic" | "emotional" | "reflective" | "analytical" | "poetic";
  coreMeaning: string;
  inHumanLanguage: string;
  whyThisMatters: string;
  thinkDeeper: string;
  context: {
    styleOrAuthor: string;
    movementOrEra: string;
  };
  vocabList: {
    term: string;
    definition: string;
  }[];
  domainLabel?: string;
  thoughtTraces?: {
    thinker: string;
    resonance: string;
  }[];
  language?: "id" | "en";
}

export interface ReadingHistoryItem {
  id: string;
  originalText: string;
  result: AnalysisResult;
  timestamp: string;
  isPinned?: boolean;
  customTitle?: string;
}
