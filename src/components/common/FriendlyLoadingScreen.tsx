import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Coffee } from 'lucide-react';

export const FriendlyLoadingScreen: React.FC = () => {
  const { isLoadingScreen, setIsLoadingScreen, loadingMessage, selectedCompanion } = useApp();

  if (!isLoadingScreen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F5F3E8] halftone-bg p-6 text-center select-none transition-opacity duration-300">
      
      {/* Soft Background Halftone Texture */}
      <div className="pointer-events-none absolute inset-0 halftone-bg opacity-70" />

      {/* Decorative Whimsical Corner Flourishes */}
      <div className="absolute top-6 left-6 flex items-center gap-2 text-xs font-mono-code text-[#2F3E46]/60">
        <span className="font-stability font-bold tracking-wider">SUPER POWER LABS</span>
        <span>•</span>
        <span className="font-clean italic">Issue #1</span>
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-2 text-xs font-clean text-[#2F3E46]/60">
        <Coffee className="h-4 w-4 text-[#4A90E2]" />
        <span>Brewing warm tea & gentle powers...</span>
      </div>

      {/* Central Manga Bubble Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        
        {/* Companion Float Animation */}
        <div className="mb-4 flex flex-col items-center animate-mascot-float">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white border-2 border-[#2F3E46] shadow-[3px_3px_0px_#2F3E46] text-3xl">
            {selectedCompanion?.avatarEmoji || '✨'}
          </div>
          <span className="mt-2 font-expressive text-sm text-[#2F3E46]">
            {selectedCompanion?.name || 'Friendly Familiar'}
          </span>
        </div>

        {/* Clean Soft-Bordered Manga Speech Bubble with Gentle Pulse */}
        <div className="relative rounded-3xl border-3 border-[#2F3E46] bg-white p-7 shadow-[6px_6px_0px_#2F3E46] animate-pulse-bubble w-full">
          
          {/* Subtle pop sparklines */}
          <div className="absolute -top-3 -right-2 text-[#FFC800] text-xl font-bold select-none">
            ✦
          </div>
          <div className="absolute -bottom-2 -left-2 text-[#4A90E2] text-xl font-bold select-none">
            ✦
          </div>

          <div className="flex items-center justify-center gap-2 mb-2 text-[#4A90E2]">
            <Sparkles className="h-4 w-4" />
            <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#2F3E46]/70">
              COMFORT & CALM DISPATCH
            </span>
          </div>

          {/* Cooper / Expressive friendly loading message */}
          <h2 className="font-expressive text-3xl sm:text-4xl text-[#2F3E46] tracking-wide leading-tight">
            {loadingMessage || 'STABLE-LOADING...'}
          </h2>

          <p className="font-clean italic text-xs text-[#5C676D] mt-2">
            Softening comic lines • Synchronizing tea temperatures • Calibrating gentle levitation
          </p>

          {/* Gentle Loading Bar */}
          <div className="mt-5 w-full bg-[#F5F3E8] border-2 border-[#2F3E46] rounded-full h-3 overflow-hidden p-0.5">
            <div className="h-full bg-[#4A90E2] rounded-full w-2/3 animate-pulse transition-all" />
          </div>

          {/* Speech Bubble Tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-r-3 border-b-3 border-[#2F3E46] rotate-45" />
        </div>

        {/* Friendly Skip / Dismiss */}
        <button
          onClick={() => setIsLoadingScreen(false)}
          className="mt-8 text-xs font-clean text-[#5C676D] hover:text-[#2F3E46] underline cursor-pointer"
        >
          Skip into Super Power Labs →
        </button>

      </div>

      {/* Bottom Quiet Footer */}
      <div className="absolute bottom-6 text-[11px] font-clean text-[#2F3E46]/50">
        Certified easy-on-the-eyes • Whimsical Golden Age & Manga Linework
      </div>

    </div>
  );
};
