import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, ChevronRight, Heart } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const { triggerSoundEffect } = useApp();

  const promos = [
    {
      title: "✦ DELIGHTFUL MAIL-ORDER NOVELTIES ✦",
      subtitle: "Use code 'HERO2026' for 15% off calm focus amulets & warm tea charms!",
      badge: "COZY SPECIAL",
      code: "HERO2026"
    },
    {
      title: "✦ GENTLE SCOOTER DISPATCH ✦",
      subtitle: "Free quiet drop-off to your hideout or civilian doorstep on orders over $150!",
      badge: "LOCAL DELIVERY",
      code: "SUPERPOWER"
    }
  ];

  if (isDismissed) return null;

  const current = promos[currentPromoIndex];

  const handleNext = () => {
    setCurrentPromoIndex((prev) => (prev + 1) % promos.length);
    triggerSoundEffect('CLICK!', undefined, undefined, '#4A90E2');
  };

  return (
    <aside aria-label="Promotional Announcement" className="relative z-40 bg-[#FFF6D6] border-b-2 border-[#2F3E46] px-4 py-2 text-xs text-[#2F3E46] font-clean font-medium">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left Comic Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="bg-[#FFC800] text-[#2F3E46] px-2.5 py-0.5 rounded-full text-[10px] font-stability font-bold border border-[#2F3E46] shadow-[1px_1px_0px_#2F3E46]">
            {current.badge}
          </span>
          <span className="text-[10px] font-mono-code font-bold uppercase text-[#5C676D]">
            VOL. 1 ISSUE #1
          </span>
        </div>

        {/* Center Banner */}
        <div className="flex flex-1 items-center justify-center gap-2 text-center">
          <span className="font-stability font-bold text-[#2F3E46] text-xs uppercase tracking-wide">
            {current.title}
          </span>
          <span className="hidden md:inline text-[#2F3E46]/30">·</span>
          <span className="text-[#5C676D] hidden sm:inline text-xs">
            {current.subtitle}
          </span>
          <button
            onClick={handleNext}
            className="flex items-center gap-0.5 font-stability text-[11px] font-bold text-[#4A90E2] hover:text-[#2F3E46] underline ml-1 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        {/* Right Dismiss */}
        <button
          onClick={() => setIsDismissed(true)}
          className="text-[#5C676D] hover:text-[#2F3E46] p-1 rounded-md transition-colors cursor-pointer"
          title="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
};
