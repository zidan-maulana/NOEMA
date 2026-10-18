import React from "react";
import { User } from "firebase/auth";
import { CircleUser, RefreshCw, LogOut, History } from "lucide-react";
import logo from "../assets/noema-logo.png";

interface NavbarProps {
  user: User | null;
  authLoading: boolean;
  isSyncing: boolean;
  historyCount: number;
  showHistoryPanel: boolean;
  onReset: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onToggleHistory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  authLoading,
  isSyncing,
  historyCount,
  showHistoryPanel,
  onReset,
  onLogin,
  onLogout,
  onToggleHistory,
}) => {
  return (
    <header className="border-b border-[#EADCC9]/45 bg-[#FAF6F0]/90 backdrop-blur sticky top-0 z-40" id="header bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between" id="header-container">
        <div className="flex items-center cursor-pointer group select-none" onClick={onReset} id="logo-trigger">
          <img 
            src={logo} 
            alt="Noema" 
            className="w-[94px] sm:w-[122px] h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
            id="logo-image" 
          />
        </div>

        <div className="flex items-center space-x-2 xs:space-x-3" id="header-actions">
          {authLoading ? (
            <span className="text-[10px] text-[#8C7D70] font-sans">Mempersiapkan...</span>
          ) : user ? (
            <div className="py-1 xs:py-1.5 px-2 xs:px-3 rounded-full bg-[#FAF6F0] border border-[#EADCC9] flex items-center space-x-1 xs:space-x-1.5 shadow-2xs" id="auth-status-container">
              <div className="flex items-center space-x-1 xs:space-x-1.5" id="user-profile">
                <CircleUser className="w-3.5 h-3.5 text-[#B98B68]" id="user-profile-icon" />
                <span className="text-[10px] xs:text-[10.5px] font-sans text-[#2E251E] font-medium tracking-wide truncate max-w-[65px] xs:max-w-[95px] sm:max-w-[150px]">
                  {user.displayName || user.email?.split("@")[0] || "Noema"}
                </span>
                {isSyncing && (
                  <RefreshCw className="w-2.5 h-2.5 text-[#C27E5A] animate-spin shrink-0 ml-0.5" id="syncing-spinner" />
                )}
              </div>
              <span className="text-[#EADCC9] text-xs select-none">|</span>
              <button
                type="button"
                onClick={onLogout}
                className="text-[#8C7D70] hover:text-[#C27E5A] transition-colors cursor-pointer flex items-center shrink-0"
                title="Putuskan tautan"
                id="auth-logout-btn"
              >
                <LogOut className="w-2.5 h-2.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLogin}
              className="py-1 xs:py-1.5 px-2 xs:px-3 rounded-full text-[10px] xs:text-[10.5px] font-serif bg-[#FAF6F0] text-[#2E251E] border border-[#EADCC9] hover:bg-[#F3EDE3] transition-colors flex items-center space-x-1 xs:space-x-1.5 cursor-pointer shadow-2xs group"
              id="auth-login-btn"
              title="Hubungkan akun"
            >
              <CircleUser className="w-3.5 h-3.5 text-[#B98B68] transition-transform duration-300 group-hover:scale-110" />
              <span>Masuk</span>
            </button>
          )}

          <button
            type="button"
            id="toggle-history-btn"
            onClick={onToggleHistory}
            className={`py-1 xs:py-1.5 px-2 xs:px-3 rounded-full text-[11px] xs:text-xs font-serif transition-colors flex items-center space-x-1 xs:space-x-1.5 border cursor-pointer ${
              showHistoryPanel 
                ? "bg-[#2E251E] text-[#FAF6F0] border-[#2E251E] shadow-sm" 
                : "bg-[#FAF6F0] text-[#2E251E] border-[#EADCC9] hover:bg-[#F3EDE3]"
            }`}
          >
            <History className="w-3 h-3 text-[#C27E5A]" id="history-toggle-icon" />
            <span id="history-toggle-label">Jurnal ({historyCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
