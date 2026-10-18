import { ReadingHistoryItem } from "../types";

// [1] SANITASI TEKS UNTUK DOKUMEN MARKDOWN
// Mencegah XSS atau script injection ketika file .md dibuka di markdown viewer eksternal (Obsidian, VS Code, Notion)
function sanitizeMarkdown(val?: string): string {
  if (!val) return "";
  return val
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Hapus script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "") // Hapus iframe tags
    .replace(/javascript\s*:/gi, "blocked-script:")                     // Hapus skema URI javascript:
    .replace(/data:text\/html/gi, "blocked-html:");
}

/**
 * Exports a reading journal entry as an aesthetically formatted Markdown (.md) document
 */
export function exportJournalToMarkdown(item: ReadingHistoryItem, domainLabel?: string) {
  const r = item.result;

  const safeOriginal = sanitizeMarkdown(item.originalText);
  const safeTitle = sanitizeMarkdown(item.customTitle || "Tanpa Judul");
  const safeStyle = sanitizeMarkdown(r.context?.styleOrAuthor || "Tidak diketahui");
  const safeEra = sanitizeMarkdown(r.context?.movementOrEra || "Tidak diketahui");
  const safeDomain = sanitizeMarkdown(domainLabel || r.domainLabel || "Pembacaan reflektif");
  const safeCore = sanitizeMarkdown(r.coreMeaning);
  const safeHuman = sanitizeMarkdown(r.inHumanLanguage);
  const safeWhy = sanitizeMarkdown(r.whyThisMatters);
  const safeDeeper = sanitizeMarkdown(r.thinkDeeper);

  let md = `# Noema - Catatan Membaca\n\n`;
  md += `> **Rujukan Paragraf Asli:**\n`;
  md += `> ${safeOriginal}\n\n`;
  md += `***\n\n`;

  md += `## 📚 Identitas Pembacaan\n`;
  md += `- **Judul Catatan:** ${safeTitle}\n`;
  md += `- **Gaya & Penulis:** ${safeStyle}\n`;
  md += `- **Gerakan & Era:** ${safeEra}\n`;
  md += `- **Nuansa Pembacaan:** ${safeDomain}\n`;
  md += `- **Waktu Pembacaan:** ${new Date(item.timestamp).toLocaleString("id-ID")}\n\n`;
  md += `***\n\n`;

  md += `## I. Inti Pemikiran (Core Meaning)\n`;
  md += `> ${safeCore}\n\n`;

  md += `## II. Terjemahan Gagasan (In Human Language)\n`;
  md += `${safeHuman}\n\n`;

  md += `## III. Mengapa Ini Penting (Why This Matters)\n`;
  md += `${safeWhy}\n\n`;

  md += `## IV. Refleksi Lanjutan (Think Deeper)\n`;
  md += `${safeDeeper}\n\n`;

  if (r.vocabList && r.vocabList.length > 0) {
    md += `## 💡 Untaian Gagasan (Key Vocabularies)\n`;
    r.vocabList.forEach((v) => {
      md += `- **${sanitizeMarkdown(v.term)}**: ${sanitizeMarkdown(v.definition)}\n`;
    });
    md += `\n`;
  }

  md += `## 🕊️ Pembacaan Kedua (Refleksi Hermeneutis)\n`;
  md += `1. **Dekonstruksi Inti Pemikiran:** Jika pemikiran tentang '${safeCore}' ini benar, prasangka atau asumsi lama apa yang selama ini diam-diam membatasi cara kita melihat kenyataan?\n`;
  md += `2. **Relevansi Eksistensial:** Mengingat bahwa '${safeWhy}', bagian mana dari kebiasaan atau sudut pandang harian kita yang paling terusik oleh gagasan ini?\n`;
  md += `3. **Poros Refleksi:** Menanggapi gugatan radikal: '${safeDeeper}', ke arah mana pemahaman baru kita harus mulai melangkah?\n\n`;

  md += `---\n*Dianalisis dengan Noema (Deep Reading Assistant)*`;

  // Trigger file download in browser
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  const cleanTitle = (item.customTitle || "Catatan_Noema")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .substring(0, 30);

  link.href = url;
  link.setAttribute("download", `noema_${cleanTitle || "catatan"}.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
