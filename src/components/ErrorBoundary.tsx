import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Noema ErrorBoundary]:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center px-6 py-12 text-center selection:bg-[#EEDBC5] selection:text-[#3C3026]">
          <div className="max-w-md w-full bg-[#FCFAF7] border border-[#EADCC9]/70 rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(46,37,30,0.04)] space-y-6">
            <div className="inline-flex items-center space-x-2 text-[8.5px] font-sans uppercase tracking-[0.22em] text-[#8C7D70] font-bold border-b border-[#EADCC9]/40 pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B98B68]/40"></span>
              <span>Pemulihan Ruang Baca</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B98B68]/40"></span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#2E251E] font-medium leading-snug">
                Terjadi jeda tak terduga dalam penelusuran.
              </h2>
              <p className="font-serif italic text-xs sm:text-[13.5px] text-[#5E5145] leading-[1.8]">
                “Pikiran yang jernih selalu dapat dimulai kembali. Noema siap menyertaimu membaca dari awal.”
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="py-2.5 px-6 font-serif text-xs font-medium text-[#FAF6F0] bg-[#2E251E] hover:bg-[#43362C] rounded-full border border-[#2E251E] transition-all duration-300 shadow-sm cursor-pointer"
              >
                Muat Ulang Ruang Baca
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
