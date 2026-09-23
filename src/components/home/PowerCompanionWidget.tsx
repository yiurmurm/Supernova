import React from 'react';
import { useApp, MASCOT_COMPANIONS } from '../../context/AppContext';
import { Heart, Sparkles, Check, MessageSquare } from 'lucide-react';

export const PowerCompanionWidget: React.FC = () => {
  const { 
    selectedCompanion, 
    setSelectedCompanion, 
    companionTip, 
    setCompanionTip, 
    triggerSoundEffect 
  } = useApp();

  const handleSelect = (comp: typeof MASCOT_COMPANIONS[0]) => {
    setSelectedCompanion(comp);
    setCompanionTip(comp.tips[0]);
    triggerSoundEffect(`${comp.name.toUpperCase()} JOINED! 🐾`, undefined, undefined, '#4A90E2');
  };

  return (
    <section className="relative border-b-2 border-[#2F3E46] bg-[#FDFBF0] py-10 sm:py-14 halftone-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Manga Panel Card */}
        <div className="rounded-3xl border-2 border-[#2F3E46] bg-white p-6 sm:p-8 shadow-[4px_4px_0px_#2F3E46]">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-2 border-[#F5F3E8]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3FC] px-3 py-1 text-xs font-stability font-semibold text-[#4A90E2] border border-[#4A90E2]/30">
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span>INTERACTIVE BREAK 1 // CHOOSE YOUR POWER COMPANION</span>
              </div>
              <h3 className="font-comfort text-2xl sm:text-3xl font-bold text-[#2F3E46]">
                Adopt a Whimsical Familiar
              </h3>
              <p className="font-clean text-sm text-[#5C676D]">
                Your selected pet mascot hovers nearby as you browse, whispering cozy tips and calming advice!
              </p>
            </div>

            {/* Currently Active Mascot Speech Preview */}
            <div className="relative rounded-2xl border-2 border-[#2F3E46] bg-[#FFF6D6] p-4 shadow-[3px_3px_0px_#2F3E46] max-w-md w-full">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-[#2F3E46] text-2xl animate-mascot-float">
                  {selectedCompanion.avatarEmoji}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-expressive text-sm font-bold text-[#2F3E46]">
                      {selectedCompanion.name}
                    </span>
                    <span className="text-[10px] font-clean text-[#4A90E2] bg-white px-2 py-0.5 rounded-full border border-[#2F3E46]/20">
                      Active Guide
                    </span>
                  </div>
                  <p className="font-handwritten text-base text-[#2F3E46] mt-0.5 leading-snug">
                    &ldquo;{companionTip || selectedCompanion.greeting}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pet Companions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {MASCOT_COMPANIONS.map((comp) => {
              const isSelected = selectedCompanion.id === comp.id;
              return (
                <div
                  key={comp.id}
                  onClick={() => handleSelect(comp)}
                  className={`group relative rounded-2xl border-2 p-5 transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'border-[#4A90E2] bg-[#EBF3FC] shadow-[3px_3px_0px_#4A90E2] ring-2 ring-[#4A90E2]/30'
                      : 'border-[#2F3E46]/30 bg-[#FDFBF0] hover:border-[#2F3E46] hover:bg-white shadow-[2px_2px_0px_#2F3E46]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border-2 border-[#2F3E46] text-3xl shadow-[2px_2px_0px_#2F3E46] group-hover:scale-105 transition-transform">
                      {comp.avatarEmoji}
                    </div>
                    {isSelected ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4A90E2] text-white">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="text-xs font-clean text-[#5C676D] group-hover:text-[#2F3E46]">
                        Adopt →
                      </span>
                    )}
                  </div>

                  <h4 className="font-expressive text-lg text-[#2F3E46] leading-tight">
                    {comp.name}
                  </h4>
                  <div className="text-[11px] font-clean text-[#4A90E2] font-semibold mt-0.5">
                    {comp.species}
                  </div>
                  <p className="font-clean text-xs text-[#5C676D] mt-2 leading-relaxed">
                    {comp.perk}
                  </p>

                  <div className="mt-3 pt-2 border-t border-[#2F3E46]/10 flex items-center gap-1 text-[11px] font-handwritten text-[#2F3E46]/80 italic">
                    <MessageSquare className="h-3 w-3 text-[#FFC800] shrink-0" />
                    <span className="truncate">&ldquo;{comp.greeting}&rdquo;</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
