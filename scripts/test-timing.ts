import { processAnalysis } from "../api/analyze";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function runBenchmark() {
  console.log("Memulai uji waktu respon Gemini 3.8 Flash...");
  const sample = "Manusia itu dihukum untuk bebas; karena begitu ia terlempar ke dalam dunia, ia bertanggung jawab atas semua yang dilakukannya.";
  
  const start = Date.now();
  try {
    const result = await processAnalysis(sample, "benchmark-test", "127.0.0.1");
    const duration = Date.now() - start;
    console.log(`\nSelesai dalam: ${(duration / 1000).toFixed(2)} detik`);
    console.log("Inferred Tone:", result.inferredTone);
    console.log("Domain:", result.domainLabel);
    console.log("Core Meaning length (chars):", result.coreMeaning?.length);
    console.log("Vocab items count:", result.vocabList?.length);
    console.log("Thought traces count:", result.thoughtTraces?.length);
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}

runBenchmark();
