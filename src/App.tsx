/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from "react";
import { useAuth } from "./hooks/useAuth";
import { useJournal } from "./hooks/useJournal";
import { useGeminiAnalysis } from "./hooks/useGeminiAnalysis";
import { Navbar } from "./components/Navbar";
import { HeroInput } from "./components/HeroInput";
import { ContemplativeLoader } from "./components/ContemplativeLoader";
import { JournalDrawer } from "./components/JournalDrawer";
import { AnalysisCards } from "./components/AnalysisCards";
import { HermeneuticSection } from "./components/HermeneuticSection";
import { Footer } from "./components/Footer";
import { ReadingHistoryItem } from "./types";

export default function App() {
  // [1] AUTHENTICATION & CLOUD SYNC
  const { user, authLoading, isSyncing, syncMessage, login, logout } = useAuth();

  // [2] READING JOURNAL MANAGEMENT
  const {
    history,
    selectedHistoryId,
    setSelectedHistoryId,
    showHistoryPanel,
    setShowHistoryPanel,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    editingTitleId,
    setEditingTitleId,
    editedTitleVal,
    setEditedTitleVal,
    addEntry,
    togglePin,
    removeEntry,
    updateTitle,
    exportEntry,
    filteredAndSortedHistory,
  } = useJournal(user);

  // [3] GEMINI DEEP READING ANALYSIS ENGINE
  const {
    text,
    setText,
    isLoading,
    loadingStep,
    error,
    errorType,
    result,
    revealedLayers,
    activePresetIndex,
    copied,
    handleSelectPreset,
    handleReset: resetAnalysis,
    loadFromHistory,
    revealNextLayer,
    copyAnalysis,
    analyzeText,
    loadingPhrases,
  } = useGeminiAnalysis();

  // Handle selecting an entry from the journal drawer
  const handleSelectHistoryItem = useCallback(
    (item: ReadingHistoryItem) => {
      loadFromHistory(item);
      setSelectedHistoryId(item.id);
    },
    [loadFromHistory, setSelectedHistoryId]
  );

  // Handle global reset (e.g. clicking logo or clear button)
  const handleReset = useCallback(() => {
    resetAnalysis();
    setSelectedHistoryId(null);
  }, [resetAnalysis, setSelectedHistoryId]);

  // Handle paragraph analysis form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      analyzeText(user?.uid, (newResult, originalText) => {
        // Hanya simpan ke catatan jika teks memiliki kepadatan makna (bukan fragmen absurd/restrained)
        if (newResult.hasEnoughDensity !== false) {
          const item = addEntry(originalText, newResult);
          setSelectedHistoryId(item.id);
        }
      });
    },
    [analyzeText, user, addEntry, setSelectedHistoryId]
  );

  // Get active history item if one is selected
  const activeHistoryItem = history.find((item) => item.id === selectedHistoryId);

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#EEDBC5] selection:text-[#3C3026]" id="app-root">
      
      {/* Top Header Navigation */}
      <Navbar
        user={user}
        authLoading={authLoading}
        isSyncing={isSyncing}
        syncMessage={syncMessage}
        historyCount={history.length}
        showHistoryPanel={showHistoryPanel}
        onReset={handleReset}
        onLogin={login}
        onLogout={logout}
        onToggleHistory={() => setShowHistoryPanel((prev) => !prev)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10" id="main-content">
        
        {/* Expandable History Drawer */}
        {showHistoryPanel && (
          <JournalDrawer
            history={history}
            filteredAndSortedHistory={filteredAndSortedHistory}
            selectedHistoryId={selectedHistoryId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onSelect={handleSelectHistoryItem}
            onTogglePin={(id, e) => {
              e.stopPropagation();
              togglePin(id);
            }}
            onExport={(item) => exportEntry(item)}
            onRemove={(id, e) => {
              e.stopPropagation();
              removeEntry(id);
            }}
          />
        )}

        {/* Input & Form Workspace (Always Visible Above Fold) */}
        <HeroInput
          text={text}
          setText={setText}
          isLoading={isLoading}
          error={error}
          errorType={errorType}
          activePresetIndex={activePresetIndex}
          onSelectPreset={handleSelectPreset}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />

        {/* Contemplative Thinking Loader Animation */}
        {isLoading && (
          <ContemplativeLoader
            loadingStep={loadingStep}
            loadingPhrases={loadingPhrases}
          />
        )}

        {/* Analysis Results: 4 Layered Cards */}
        {result && !isLoading && result.hasEnoughDensity !== false && (
          <AnalysisCards
            result={result}
            revealedLayers={revealedLayers}
            selectedHistoryItem={activeHistoryItem}
            copied={copied}
            editingTitleId={editingTitleId}
            editedTitleVal={editedTitleVal}
            setEditingTitleId={setEditingTitleId}
            setEditedTitleVal={setEditedTitleVal}
            onUpdateTitle={(id, val) => updateTitle(id, val)}
            onCopyAnalysis={copyAnalysis}
            onExportActive={(item) => exportEntry(item)}
            onRevealNext={revealNextLayer}
          />
        )}

        {/* Hermeneutic Deep Reading Section (Untaian Gagasan, Pembacaan Kedua, Jejak Pemikiran, Rujukan Asli) */}
        {result && !isLoading && (
          <HermeneuticSection
            result={result}
            revealedLayers={revealedLayers}
            originalText={text}
          />
        )}

      </main>

      {/* Monumental Cinematic Footer */}
      <Footer />

    </div>
  );
}
