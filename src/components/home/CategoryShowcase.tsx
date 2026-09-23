import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA } from '../../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { setActiveTab, setActiveCategory, triggerSoundEffect } = useApp();

  const handleCategoryClick = (categoryId: string, name: string) => {
    setActiveCategory(categoryId);
    setActiveTab('shop');
    triggerSoundEffect(`${name} ARSENAL OPENED!`);
  };

  return (
    <section className="relative border-b border-[#2A2938] bg-[#0B0A10] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A2938] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#00F0FF] mb-2 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE FIVE CORE ARSENALS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
              CHOOSE YOUR POWER
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl">
              Five distinct pathways to unlock latent superhuman capabilities. Select your faction medium to explore specialized artifacts.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveCategory(null);
              setActiveTab('shop');
            }}
            className="text-xs font-mono-code text-[#00F0FF] hover:text-[#F59E0B] transition-colors flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>VIEW ALL 46 POWERS</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* 5 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id, cat.name)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border-3 border-black bg-[#161521] shadow-[5px_5px_0px_#000000] hover:shadow-[7px_7px_0px_${cat.accentColor}] transition-all duration-300 hover:-translate-y-1 ${
                idx === 0 || idx === 1 ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Category Image with Overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Halftone Overlay */}
                <div className="pointer-events-none absolute inset-0 halftone-bg opacity-25" />

                {/* Dark Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161521] via-[#161521]/40 to-transparent" />

                {/* Category Number Badge */}
                <div className="absolute top-3 left-3 bg-black/80 border border-white/20 px-2.5 py-1 rounded text-[11px] font-mono-code font-bold text-white shadow-sm">
                  {cat.number}
                </div>

                {/* Item Count */}
                <div className="absolute top-3 right-3 bg-black/80 border border-white/20 px-2.5 py-1 rounded text-[11px] font-mono-code text-zinc-300 shadow-sm">
                  {cat.count} Powers
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="text-xs font-mono-code uppercase tracking-wider mb-1" style={{ color: cat.accentColor }}>
                  {cat.tagline}
                </div>
                <h3 className="font-display text-2xl text-white tracking-wider group-hover:text-[#00F0FF] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm font-semibold text-zinc-200 mt-1 mb-2 italic">
                  “{cat.headline}”
                </p>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                {/* Action CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-[#2A2938]">
                  <span className="text-xs font-mono-code text-zinc-400 group-hover:text-white transition-colors">
                    EXPLORE COLLECTION →
                  </span>
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded border border-black shadow-[2px_2px_0px_#000000] text-black transition-transform group-hover:translate-x-1"
                    style={{ backgroundColor: cat.accentColor }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
