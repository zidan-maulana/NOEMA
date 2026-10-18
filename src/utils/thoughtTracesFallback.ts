import { AnalysisResult } from "../types";

export interface ThoughtTraceItem {
  thinker: string;
  resonance: string;
}

/**
 * Resolves domain label: prioritizes AI-inferred domainLabel, falls back to legacy keyword heuristics.
 */
export const getDomainLabel = (result: AnalysisResult): string => {
  if (result.domainLabel && result.domainLabel.trim().length > 0) {
    return result.domainLabel;
  }
  const author = (result.context?.styleOrAuthor || "").toLowerCase();
  const era = (result.context?.movementOrEra || "").toLowerCase();
  const fullText = `${author} ${era}`;

  if (
    fullText.includes("filsafat") ||
    fullText.includes("eksistensial") ||
    fullText.includes("fenomenologi") ||
    fullText.includes("nietzsche") ||
    fullText.includes("heidegger") ||
    fullText.includes("kierkegaard") ||
    fullText.includes("filosofis") ||
    fullText.includes("sartre") ||
    fullText.includes("camus") ||
    fullText.includes("foucault") ||
    fullText.includes("dasein") ||
    fullText.includes("stoisisme") ||
    fullText.includes("stoic")
  ) {
    return "Pembacaan filosofis";
  }

  if (
    fullText.includes("puisi") ||
    fullText.includes("sastra") ||
    fullText.includes("simbolik") ||
    fullText.includes("liris") ||
    fullText.includes("metafora") ||
    fullText.includes("literatur") ||
    fullText.includes("romantik") ||
    fullText.includes("realisme magis")
  ) {
    return "Pembacaan sastra";
  }

  if (
    fullText.includes("psikologi") ||
    fullText.includes("psikoanalisis") ||
    fullText.includes("trauma") ||
    fullText.includes("freud") ||
    fullText.includes("jung") ||
    fullText.includes("lacan") ||
    fullText.includes("kognitif") ||
    fullText.includes("introspektif") ||
    fullText.includes("psikologis")
  ) {
    return "Pembacaan psikologis";
  }

  if (
    fullText.includes("sosial") ||
    fullText.includes("politik") ||
    fullText.includes("marx") ||
    fullText.includes("adorno") ||
    fullText.includes("butler") ||
    fullText.includes("teori kritis") ||
    fullText.includes("sosiologi") ||
    fullText.includes("sosiologis") ||
    fullText.includes("strukturalisme") ||
    fullText.includes("pascamodern") ||
    fullText.includes("postmodern")
  ) {
    return "Pembacaan sosial";
  }

  return "Pembacaan reflektif";
};

/**
 * Checks if thought traces should be displayed for the given result
 */
export function shouldShowThoughtTrace(result: AnalysisResult | null): boolean {
  if (!result) return false;
  if (result.hasEnoughDensity === false) return false;
  if (result.thoughtTraces && result.thoughtTraces.length > 0) return true;

  const styleAndAuthor = (result.context?.styleOrAuthor || "").toLowerCase();
  const movementOrEra = (result.context?.movementOrEra || "").toLowerCase();
  const coreMeaning = (result.coreMeaning || "").toLowerCase();
  const whyThisMatters = (result.whyThisMatters || "").toLowerCase();
  const thinkDeeper = (result.thinkDeeper || "").toLowerCase();

  const combinedText = `${styleAndAuthor} ${movementOrEra} ${coreMeaning} ${whyThisMatters} ${thinkDeeper}`.toLowerCase();

  const technicalKeywords = [
    "tutorial", "panduan", "cara memprogram", "install", "setup", "config",
    "resep", "keuangan", "saham", "investasi", "marketing", "bisnis", "programming",
    "coding", "komputer", "software", "aplikasi", "developer", "instruksi", "langkah-langkah",
    "praktis", "teknikal", "api", "database", "excel"
  ];

  const hasTechnicalIndicator = technicalKeywords.some((keyword) => combinedText.includes(keyword));
  if (hasTechnicalIndicator) {
    return false;
  }

  const domain = getDomainLabel(result);
  const okDomains = ["Pembacaan filosofis", "Pembacaan sastra", "Pembacaan psikologis", "Pembacaan sosial"];

  const contemplativeKeywords = [
    "makna", "eksistensi", "filsafat", "psikoanalisis", "jiwa", "kesepian", "sunyi",
    "kematian", "hidup", "penderitaan", "absurd", "bebas", "kuasa", "alienasi",
    "kebebasan", "stoisisme", "spiritual", "hening", "merenung", "refleksi", "estetik",
    "moral", "etika", "bahasa", "metafora", "penulis", "sastra", "tragedi", "kontemplasi"
  ];

  const hasContemplativeIndicator = contemplativeKeywords.some((keyword) => combinedText.includes(keyword));

  return okDomains.includes(domain) || hasContemplativeIndicator;
}

/**
 * Returns thought traces: prioritizes AI-generated thoughtTraces, falls back to legacy matching.
 */
export function getThoughtTraces(result: AnalysisResult): ThoughtTraceItem[] {
  if (result.thoughtTraces && result.thoughtTraces.length > 0) {
    return result.thoughtTraces.slice(0, 2);
  }

  const styleAndAuthor = (result.context?.styleOrAuthor || "").toLowerCase();
  const movementOrEra = (result.context?.movementOrEra || "").toLowerCase();
  const coreMeaning = (result.coreMeaning || "").toLowerCase();
  const whyThisMatters = (result.whyThisMatters || "").toLowerCase();
  const thinkDeeper = (result.thinkDeeper || "").toLowerCase();

  const combinedText = `${styleAndAuthor} ${movementOrEra} ${coreMeaning} ${whyThisMatters} ${thinkDeeper}`.toLowerCase();
  const traces: ThoughtTraceItem[] = [];

  if (
    combinedText.includes("eksistensial") ||
    combinedText.includes("absurd") ||
    combinedText.includes("nihil") ||
    combinedText.includes("kematian") ||
    combinedText.includes("bebas") ||
    combinedText.includes("pilihan") ||
    combinedText.includes("sartre") ||
    combinedText.includes("camus") ||
    combinedText.includes("kierkegaard") ||
    combinedText.includes("heidegger") ||
    combinedText.includes("dasein") ||
    combinedText.includes("nietzsche")
  ) {
    traces.push({
      thinker: "Albert Camus",
      resonance: "absurditas dan keteguhan memeluk makna hidup di dasar kesunyian semesta.",
    });
    traces.push({
      thinker: "Jean-Paul Sartre",
      resonance: "tanggung jawab radikal atas kebebasan diri merajut esensi eksistensi.",
    });
    traces.push({
      thinker: "Søren Kierkegaard",
      resonance: "lompatan keyakinan untuk mengatasi kecemasan batin eksistensial.",
    });
  }

  if (
    combinedText.includes("stoik") ||
    combinedText.includes("stoisisme") ||
    combinedText.includes("stoic") ||
    combinedText.includes("seneca") ||
    combinedText.includes("aurelius") ||
    combinedText.includes("epictetus") ||
    combinedText.includes("kendali") ||
    combinedText.includes("tenang") ||
    combinedText.includes("takdir")
  ) {
    traces.push({
      thinker: "Marcus Aurelius",
      resonance: "ketenangan lewat dikotomi kendali diri dan penerimaan tulus atas takdir.",
    });
    traces.push({
      thinker: "Seneca",
      resonance: "keberanian memandang kefanaan hidup sebagai pemandu batas berharga.",
    });
  }

  if (
    combinedText.includes("psikologi") ||
    combinedText.includes("psikoanalisis") ||
    combinedText.includes("trauma") ||
    combinedText.includes("jiwa") ||
    combinedText.includes("freud") ||
    combinedText.includes("jung") ||
    combinedText.includes("lacan") ||
    combinedText.includes("hasrat") ||
    combinedText.includes("bawah sadar") ||
    combinedText.includes("introspeksi")
  ) {
    traces.push({
      thinker: "Viktor Frankl",
      resonance: "pencarian makna hidup sebagai jangkar pengaman kepedihan terekstrem.",
    });
    traces.push({
      thinker: "Carl Jung",
      resonance: "integrasi sisi gelap diri demi mencapai keutuhan dan keselarasan batin.",
    });
  }

  if (
    combinedText.includes("sosial") ||
    combinedText.includes("kuasa") ||
    combinedText.includes("politik") ||
    combinedText.includes("foucault") ||
    combinedText.includes("marx") ||
    combinedText.includes("pascamodern") ||
    combinedText.includes("kritis") ||
    combinedText.includes("alienasi") ||
    combinedText.includes("adorno") ||
    combinedText.includes("strukturalisme")
  ) {
    traces.push({
      thinker: "Michel Foucault",
      resonance: "relasi kuasa tak kasat mata yang menyisip senyap dalam laku hidup harian.",
    });
    traces.push({
      thinker: "Theodor Adorno",
      resonance: "kesadaran kritis yang perlahan tumpul akibat tawaran kesenangan semu.",
    });
  }

  if (
    combinedText.includes("sastra") ||
    combinedText.includes("puisi") ||
    combinedText.includes("penulis") ||
    combinedText.includes("metafora") ||
    combinedText.includes("romantik") ||
    combinedText.includes("liris") ||
    combinedText.includes("dostoevsky") ||
    combinedText.includes("kafka")
  ) {
    traces.push({
      thinker: "Franz Kafka",
      resonance: "keterasingan individu yang terperangkap labirin dunia modern tak terpahami.",
    });
    traces.push({
      thinker: "Fyodor Dostoevsky",
      resonance: "pergulatan moral batin antara keputusasaan dan kerinduan spiritual.",
    });
  }

  if (
    combinedText.includes("spiritual") ||
    combinedText.includes("hening") ||
    combinedText.includes("sunyi") ||
    combinedText.includes("sepi") ||
    combinedText.includes("tuhan") ||
    combinedText.includes("mistik") ||
    combinedText.includes("meditasi") ||
    combinedText.includes("rumi")
  ) {
    traces.push({
      thinker: "Jalaluddin Rumi",
      resonance: "peleburan sekat ego fana ke dalam tarikan cinta kosmis maha luas.",
    });
    traces.push({
      thinker: "Meister Eckhart",
      resonance: "kesunyian radikal tempat terbitnya pemahaman spiritual yang murni.",
    });
  }

  if (traces.length < 2) {
    const domain = getDomainLabel(result);
    if (domain === "Pembacaan filosofis") {
      traces.push({
        thinker: "Baruch Spinoza",
        resonance: "keselarasan dinamika duniawi dalam dekapan hukum alam yang kekal.",
      });
      traces.push({
        thinker: "Arthur Schopenhauer",
        resonance: "kontemplasi estetis sebagai obat pereda sementara dari rasa letih hidup.",
      });
    } else if (domain === "Pembacaan sastra") {
      traces.push({
        thinker: "Walter Benjamin",
        resonance: "aura karya seni masa lalu yang menyimpan daya pikat kontemplatif abadi.",
      });
      traces.push({
        thinker: "Jorge Luis Borges",
        resonance: "pesona labirin pustaka dan takdir penelusuran kebenaran tak bertepi.",
      });
    } else {
      traces.push({
        thinker: "Socrates",
        resonance: "kebijaksanaan awal yang bermula dari keberanian mengakui ketidaktahuan diri.",
      });
      traces.push({
        thinker: "Arthur Schopenhauer",
        resonance: "kontemplasi tenang pembebas batin dari belenggu kehendak duniawi.",
      });
    }
  }

  return traces.slice(0, 2);
}
