import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA } from '../../data/products';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { setActiveTab, setActiveCategory, triggerSoundEffect } = useApp();

  const handleCategoryClick = (categoryId: string, name: string) => {
    setActiveCategory(categoryId);
    setActiveTab('shop');
    triggerSoundEffect(`${name.toUpperCase()} OPENED! ✦`, undefined, undefined, '#4A90E2');
  };

  return (
    <section className="relative border-b-2 border-[#2F3E46] bg-[#FDFBF0] py-14 sm:py-20 halftone-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header Manga Box */}
        <div className="mb-10 p-6 rounded-3xl border-2 border-[#2F3E46] bg-white shadow-[4px_4px_0px_#2F3E46] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-stability font-semibold text-[#4A90E2] bg-[#EBF3FC] px-3 py-1 rounded-full border border-[#4A90E2]/30 mb-2 uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              <span>CLASSIFIED MEDIUMS // DISPATCH CHRONICLES</span>
            </div>
            <h2 className="font-comfort text-3xl sm:text-4xl font-bold text-[#2F3E46] tracking-tight">
              Choose Your Gentle Power Medium
            </h2>
            <p className="font-clean text-[#5C676D] text-sm mt-1 max-w-2xl leading-relaxed">
              Whimsical jewelry, honeyed potions, warm spectacles, and friendly pocket bugs crafted with care.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveCategory(null);
              setActiveTab('shop');
            }}
            className="text-xs font-stability font-bold text-[#2F3E46] bg-[#FFC800] hover:bg-[#4A90E2] hover:text-white px-4 py-2.5 rounded-xl border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>BROWSE ENTIRE VAULT (46)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* 5 Manga Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id, cat.name)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-[#2F3E46] bg-white shadow-[3px_3px_0px_#2F3E46] hover:shadow-[0_0_18px_rgba(74,144,226,0.2),4px_4px_0px_#2F3E46] hover:border-[#4A90E2] transition-all duration-200 hover:-translate-y-1"
            >
              {/* Manga Panel Top Bar */}
              <div className="bg-[#F5F3E8] border-b border-[#2F3E46] px-3 py-1.5 flex items-center justify-between text-xs font-stability font-semibold text-[#2F3E46]">
                <span className="bg-[#FFF6D6] px-2 py-0.5 rounded-full border border-[#2F3E46]/30 text-[10px]">
                  PANEL {cat.number}
                </span>
                <span className="text-[11px] text-[#4A90E2] font-mono-code font-bold">
                  ★ {cat.count} ARTIFACTS
                </span>
              </div>

              {/* Category Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF6E8] border-b-2 border-[#2F3E46]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                
                {/* Subtle halftone */}
                <div className="pointer-events-none absolute inset-0 halftone-bg opacity-15" />

                {/* Floating On-Hover Speech Bubble */}
                <div className="absolute bottom-2 left-2 right-2 rounded-xl border border-[#2F3E46] bg-white/95 p-2 text-[11px] font-handwritten text-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] backdrop-blur-xs flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-[#FFC800] shrink-0" />
                  <span className="truncate">&ldquo;{cat.tagline}&rdquo;</span>
                </div>
              </div>

              {/* Category Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-expressive text-2xl text-[#2F3E46] group-hover:text-[#4A90E2] transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-clean text-[#4A90E2] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                
                <p className="font-clean text-xs text-[#5C676D] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-2 border-t border-[#F5F3E8] flex items-center justify-between text-[11px] font-clean font-semibold text-[#2F3E46]">
                  <span className="text-[#5C676D]">Delivery: Teleport / Scooter</span>
                  <span className="font-stability font-bold text-[#4A90E2] group-hover:underline">
                    Explore Panel
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
