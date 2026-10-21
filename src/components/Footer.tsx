import React from "react";
import { Instagram } from "lucide-react";
import logo from "../assets/noema-logo.png";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent pb-8 sm:pb-12 mt-10 sm:mt-16 select-none" id="app-footer">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6" id="footer-container">
        
        {/* SECTION A — GIANT LOGO PRESENCE (Centered, fully visible and uncropped) */}
        <div className="w-full flex justify-center" id="footer-monumental-logo-container">
          <img 
            src={logo} 
            alt="Noema Logo Monument" 
            className="w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[500px] md:max-w-[620px] h-auto object-contain opacity-[0.9] hover:opacity-100 transition-opacity duration-500 ease-out" 
            id="footer-giant-logo" 
          />
        </div>

        {/* SECTION B — Copyright and Subtle Social Signature */}
        <div className="flex items-center justify-center space-x-2.5 sm:space-x-3 text-[#8A7968]/75" id="footer-metadata-row">
          <span className="font-serif text-[10px] sm:text-[11px] tracking-[0.22em] uppercase" id="footer-copyright">
            &copy; 2026 NOEMA
          </span>
          <span className="h-2 w-px bg-[#8A7968]/35" id="footer-meta-divider"></span>
          <a 
            href="https://www.instagram.com/sijidan__?igsh=YW5pbHQ0dnkyYW96" 
            className="text-[#8A7968]/70 hover:text-[#5E5145] transition-all duration-300 transform hover:scale-[1.05]"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Noema"
            id="footer-ig-link"
          >
            <Instagram className="w-3 h-3 sm:w-[13px] sm:h-[13px] stroke-[1.4]" />
          </a>
        </div>

      </div>
    </footer>
  );
};
