import { useState, useEffect, useCallback, useRef } from "react";
import { AnalysisResult, ReadingHistoryItem } from "../types";
import { Preset } from "../presets";

export const LOADING_PHRASES = [
  "Membaca pelan-pelan, agar makna tidak tergesa disimpulkan...",
  "Menimbang susunan gagasan di balik kalimat...",
  "Mencari inti pikiran yang paling jernih...",
  "Menerjemahkan kerumitan menjadi bahasa yang lebih dekat...",
  "Menandai bagian yang diam-diam penting...",
  "Menyusun pemahaman selapis demi selapis...",
  "Menyiapkan satu pertanyaan yang layak direnungkan...",
];

export function useGeminiAnalysis() {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<"quota" | "server" | "input" | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [revealedLayers, setRevealedLayers] = useState<number>(1);
  const [activePresetIndex, setActivePresetIndex] = useState<number>(-1);
  const [copied, setCopied] = useState<boolean>(false);

  // Cycle loading step phrases periodically every 3 seconds
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 3000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle selecting a preset paragraph
  const handleSelectPreset = useCallback((preset: Preset, index: number) => {
    setText(preset.text);
    setActivePresetIndex(index);
    setError(null);
    setErrorType(null);
  }, []);

  // Reset editor and result
  const handleReset = useCallback(() => {
    setText("");
    setResult(null);
    setRevealedLayers(1);
    setError(null);
    setErrorType(null);
    setActivePresetIndex(-1);
  }, []);

  // Load a saved item from history to view
  const loadFromHistory = useCallback((item: ReadingHistoryItem) => {
    setText(item.originalText);
    setResult(item.result);
    setRevealedLayers(1);
    setActivePresetIndex(-1);
    setError(null);
    setErrorType(null);
  }, []);

  // Reveal next layer in progressive disclosure
  const revealNextLayer = useCallback(() => {
    setRevealedLayers((prev) => Math.min(prev + 1, 4));
  }, []);

  // Copy analysis to clipboard
  const copyAnalysis = useCallback(() => {
    if (!result) return;
    const clipboardContent = `[Original Passage / Teks Asli]\n${text}\n\n[Core Meaning / Inti Pemikiran]\n${result.coreMeaning}\n\n[In Human Language / Terjemahan Gagasan]\n${result.inHumanLanguage}\n\n[Why This Matters / Mengapa Ini Penting]\n${result.whyThisMatters}\n\n[Think Deeper / Refleksi Lanjutan]\n${result.thinkDeeper}`;
    navigator.clipboard.writeText(clipboardContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text, result]);

  const isSubmittingRef = useRef<boolean>(false);

  // Submit paragraph for analysis
  const analyzeText = useCallback(
    async (
      uid?: string,
      onSuccess?: (newResult: AnalysisResult, originalText: string) => void
    ) => {
      // Concurrency Lock: Mencegah double-click atau race condition
      if (isSubmittingRef.current || isLoading) {
        return;
      }

      if (!text.trim()) {
        setErrorType("input");
        setError("Silakan masukkan paragraf yang ingin diselisik terlebih dahulu.");
        return;
      }

      if (text.length > 4000) {
        setErrorType("input");
        setError("Paragraf terlalu panjang untuk dibaca dalam satu waktu (maksimal 4.000 karakter).");
        return;
      }

      // Deteksi status koneksi offline
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setErrorType("server");
        setError("Koneksi internet terputus. Pastikan perangkatmu terhubung sebelum melanjutkan pembacaan.");
        return;
      }

      isSubmittingRef.current = true;
      setIsLoading(true);
      setError(null);
      setErrorType(null);
      setResult(null);
      setRevealedLayers(1);

      // Chaos Guard: Timeout 28 detik sebelum serverless Vercel mencapai batas 30 detik
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 28000);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, uid }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          let message = "";

          if (response.status === 400 || response.status === 413) {
            message = errorData.error || "Paragraf terlalu panjang untuk dibaca dalam satu waktu.";
            setErrorType("input");
          } else if (response.status === 429) {
            setErrorType("quota");
            message = errorData.error || "Tunggu sebentar sebelum memulai pembacaan berikutnya.";
          } else {
            setErrorType("server");
            message =
              errorData.error ||
              "Pembacaan belum dapat dilanjutkan. Noema perlu jeda sejenak sebelum melanjutkan.";
          }

          throw new Error(message);
        }

        const data: AnalysisResult = await response.json();
        setResult(data);

        if (onSuccess) {
          onSuccess(data, text);
        }
      } catch (err: any) {
        clearTimeout(timeoutId);
        console.error("[Noema Analysis Error]:", err);
        setResult(null);

        if (err.name === "AbortError") {
          setErrorType("server");
          setError("Waktu pembacaan terlampaui. Noema membutuhkan waktu lebih cepat untuk merespon, silakan coba beberapa saat lagi.");
        } else if (typeof navigator !== "undefined" && !navigator.onLine) {
          setErrorType("server");
          setError("Koneksi internet terputus saat Noema menelusuri gagasan. Periksa kembali sambungan internetmu.");
        } else {
          setError(
            err?.message ||
              "Pembacaan belum dapat dilanjutkan. Noema perlu jeda sejenak sebelum melanjutkan."
          );
        }
      } finally {
        setIsLoading(false);
        isSubmittingRef.current = false;
      }
    },
    [text, isLoading]
  );

  return {
    text,
    setText,
    isLoading,
    loadingStep,
    error,
    errorType,
    result,
    setResult,
    revealedLayers,
    setRevealedLayers,
    activePresetIndex,
    setActivePresetIndex,
    copied,
    handleSelectPreset,
    handleReset,
    loadFromHistory,
    revealNextLayer,
    copyAnalysis,
    analyzeText,
    loadingPhrases: LOADING_PHRASES,
  };
}
