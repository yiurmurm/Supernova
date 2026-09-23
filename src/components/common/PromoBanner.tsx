import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PromoBanner: React.FC = () => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const { triggerSoundEffect } = useApp();

  const promos = [
    {
      title: "ELECTRIC AWAKENING SALE",
      subtitle: "Use code HERO2026 for 15% off all kinetic elixirs & forcefield jewelry",
      badge: "ACTIVE PROTOCOL",
      code: "HERO2026"
    },
    {
      title: "DARK MAGIC & SINGULARITY COLLECTION",
      subtitle: "PortalRings & VoidLenses restocked from Sector 0 Forge",
      badge: "LIMITED DROP",
      code: "SUPERNOVA"
    },
    {
      title: "REALITY BEYOND EXPEDITION",
      subtitle: "Complimentary Subterranean Transport on all orders over $300",
      badge: "FREE DISPATCH",
      code: "HERO2026"
    }
  ];

  if (isDismissed) return null;

  const current = promos[currentPromoIndex];

  const handleNext = () => {
    setCurrentPromoIndex((prev) => (prev + 1) % promos.length);
    triggerSoundEffect('CLICK!');
  };

  return (
    <aside aria-label="Promotional Announcement" className="relative z-40 bg-[#161521] border-b border-[#2A2938] px-4 py-2 text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left Indicator */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span className="font-mono-code uppercase tracking-wider text-[#00F0FF]">
            {current.badge}
          </span>
        </div>

        {/* Center Carousel */}
        <div className="flex flex-1 items-center justify-center gap-3 text-center">
          <span className="font-display tracking-wider text-[#F59E0B] text-sm">
            {current.title}
          </span>
          <span className="hidden md:inline text-zinc-400">·</span>
          <span className="text-zinc-300 hidden sm:inline">
            {current.subtitle}
          </span>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(current.code);
              triggerSoundEffect('CODE COPIED!');
            }}
            className="ml-2 font-mono-code text-[11px] text-[#00F0FF] underline hover:text-white transition-colors"
            title="Click to copy promo code"
          >
            [{current.code}]
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleNext}
            className="text-zinc-400 hover:text-white transition-colors text-xs font-mono-code px-1"
            title="Next Alert"
          >
            NEXT →
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-zinc-500 hover:text-white transition-colors text-sm px-1 leading-none"
            title="Dismiss Announcement"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
};
