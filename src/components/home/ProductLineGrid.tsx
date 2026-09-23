import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../catalog/ProductCard';
import { Sparkles, ArrowRight, Eye, Sparkle, FlaskConical, Bug } from 'lucide-react';

export const ProductLineGrid: React.FC = () => {
  const { setActiveTab, setActiveCategory, triggerSoundEffect } = useApp();

  // Line 1: Super Power Jewelry
  const jewelryProducts = PRODUCTS.filter(p => 
    ['acc-quantum-ring', 'acc-solar-core', 'acc-aegis-cuff', 'acc-portalring'].includes(p.id)
  );

  // Line 2: Super Power Eye Wear
  const eyewearProducts = PRODUCTS.filter(p => 
    ['eyewear-chrono-slow', 'eyewear-thermal-x', 'eyewear-mind-lock', 'eyewear-cognivision'].includes(p.id)
  );

  // Line 3: Super Power Potions
  const potionProducts = PRODUCTS.filter(p => 
    ['potion-velocity', 'potion-titanium-skin', 'potion-phantom-mist', 'potion-voltaris'].includes(p.id)
  );

  // Line 4: Super Power Insects & Spray
  const bioProducts = PRODUCTS.filter(p => 
    ['insect-electro-beetle', 'spray-pheromone-flight', 'spray-chameleon-cloak', 'insect-arachnid'].includes(p.id)
  );

  const handleViewCategory = (catId: string) => {
    setActiveCategory(catId);
    setActiveTab('shop');
    triggerSoundEffect('LINE SELECTED! ✦', undefined, undefined, '#4A90E2');
  };

  return (
    <section className="relative border-b-2 border-[#2F3E46] bg-[#FDFBF0] py-14 sm:py-20 halftone-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16">
        
        {/* ================= LINE 1: SUPER POWER JEWELRY ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 bg-white border-2 border-[#2F3E46] p-5 rounded-3xl shadow-[3px_3px_0px_#2F3E46]">
            <div>
              <div className="text-xs font-stability font-semibold text-[#4A90E2] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkle className="h-3.5 w-3.5 fill-current text-[#FFC800]" />
                <span>PRODUCT LINE 1 // HAND-SKETCHED AMULETS & BANDS</span>
              </div>
              <h3 className="font-comfort text-2xl sm:text-3xl font-bold text-[#2F3E46]">
                Super Power Jewelry & Amulets
              </h3>
              <p className="font-clean text-xs sm:text-sm text-[#5C676D] mt-1">
                Gentle rings and woven bracelets that harmonize with your natural pulse.
              </p>
            </div>
            <button
              onClick={() => handleViewCategory('accessories')}
              className="text-xs font-stability font-bold text-[#2F3E46] bg-[#FFF6D6] hover:bg-[#FFC800] px-3.5 py-2 rounded-xl border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] flex items-center gap-1 self-start sm:self-auto transition-colors cursor-pointer"
            >
              <span>SEE ALL JEWELRY (10)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jewelryProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

        {/* Subtle pale blue speed lines divider */}
        <div className="pale-speed-lines my-10" />

        {/* ================= LINE 2: SUPER POWER EYEWEAR ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 bg-white border-2 border-[#2F3E46] p-5 rounded-3xl shadow-[3px_3px_0px_#2F3E46]">
            <div>
              <div className="text-xs font-stability font-semibold text-[#4A90E2] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-[#4A90E2]" />
                <span>PRODUCT LINE 2 // WHIMSICAL GOGGLES & SPECTACLES</span>
              </div>
              <h3 className="font-comfort text-2xl sm:text-3xl font-bold text-[#2F3E46]">
                Super Power Eyewear
              </h3>
              <p className="font-clean text-xs sm:text-sm text-[#5C676D] mt-1">
                Warm amber lenses, gentle thermal scanning, and soft-focus reading spectacles.
              </p>
            </div>
            <button
              onClick={() => handleViewCategory('eyewear')}
              className="text-xs font-stability font-bold text-[#2F3E46] bg-[#EBF3FC] hover:bg-[#4A90E2] hover:text-white px-3.5 py-2 rounded-xl border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] flex items-center gap-1 self-start sm:self-auto transition-colors cursor-pointer"
            >
              <span>SEE ALL EYEWEAR (10)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eyewearProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

        {/* Subtle pale blue speed lines divider */}
        <div className="pale-speed-lines my-10" />

        {/* ================= LINE 3: SUPER POWER POTIONS ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 bg-white border-2 border-[#2F3E46] p-5 rounded-3xl shadow-[3px_3px_0px_#2F3E46]">
            <div>
              <div className="text-xs font-stability font-semibold text-[#4A90E2] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FlaskConical className="h-3.5 w-3.5 text-[#FFC800]" />
                <span>PRODUCT LINE 3 // BOTTLED ELIXIRS LIKE INKWELLS</span>
              </div>
              <h3 className="font-comfort text-2xl sm:text-3xl font-bold text-[#2F3E46]">
                Super Power Potions
              </h3>
              <p className="font-clean text-xs sm:text-sm text-[#5C676D] mt-1">
                Hand-blown glass vials sealed with organic beeswax and flavored with honey.
              </p>
            </div>
            <button
              onClick={() => handleViewCategory('potions')}
              className="text-xs font-stability font-bold text-[#2F3E46] bg-[#FFF6D6] hover:bg-[#FFC800] px-3.5 py-2 rounded-xl border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] flex items-center gap-1 self-start sm:self-auto transition-colors cursor-pointer"
            >
              <span>SEE ALL POTIONS (10)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {potionProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

        {/* Subtle pale blue speed lines divider */}
        <div className="pale-speed-lines my-10" />

        {/* ================= LINE 4: INSECTS & SPRAYS ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 bg-white border-2 border-[#2F3E46] p-5 rounded-3xl shadow-[3px_3px_0px_#2F3E46]">
            <div>
              <div className="text-xs font-stability font-semibold text-[#4A90E2] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Bug className="h-3.5 w-3.5 text-[#4A90E2]" />
                <span>PRODUCT LINE 4 // TINY CUTE BUGS & POCKET MISTS</span>
              </div>
              <h3 className="font-comfort text-2xl sm:text-3xl font-bold text-[#2F3E46]">
                Super Power Insects & Pocket Sprays
              </h3>
              <p className="font-clean text-xs sm:text-sm text-[#5C676D] mt-1">
                Friendly symbiotic bio-familiars and gentle lavender scented levitation sprays.
              </p>
            </div>
            <button
              onClick={() => handleViewCategory('insects')}
              className="text-xs font-stability font-bold text-[#2F3E46] bg-[#EBF3FC] hover:bg-[#4A90E2] hover:text-white px-3.5 py-2 rounded-xl border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] flex items-center gap-1 self-start sm:self-auto transition-colors cursor-pointer"
            >
              <span>SEE ALL BIO-FAMILIARS (16)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bioProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
