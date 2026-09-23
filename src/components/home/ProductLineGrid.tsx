import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../catalog/ProductCard';
import { Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

export const ProductLineGrid: React.FC = () => {
  const { setActiveTab, setActiveCategory, triggerSoundEffect } = useApp();

  // Selected products for Line 1: Jewelry
  const jewelryProducts = PRODUCTS.filter(p => 
    ['acc-quantum-ring', 'acc-solar-core', 'acc-aegis-cuff', 'acc-portalring'].includes(p.id)
  );

  // Line 2: Eyewear
  const eyewearProducts = PRODUCTS.filter(p => 
    ['eyewear-chrono-slow', 'eyewear-thermal-x', 'eyewear-mind-lock', 'eyewear-cognivision'].includes(p.id)
  );

  // Line 3: Potions
  const potionProducts = PRODUCTS.filter(p => 
    ['potion-velocity', 'potion-titanium-skin', 'potion-phantom-mist', 'potion-voltaris'].includes(p.id)
  );

  // Line 4: Insects & Sprays
  const bioProducts = PRODUCTS.filter(p => 
    ['insect-electro-beetle', 'spray-pheromone-flight', 'spray-chameleon-cloak', 'insect-arachnid'].includes(p.id)
  );

  const handleViewCategory = (catId: string) => {
    setActiveCategory(catId);
    setActiveTab('shop');
    triggerSoundEffect('WARPING TO LINE! ⚡');
  };

  return (
    <section className="relative border-b border-[#2A2938] bg-[#0B0A10] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-20">
        
        {/* ================= LINE 1: SUPER POWER JEWELRY ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b-2 border-black pb-4">
            <div>
              <div className="text-xs font-mono-code text-[#F59E0B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
                <span>FEATURED LINE 01 // DIMENSIONAL FORGE</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
                SUPER POWER JEWELRY & ARTIFACTS
              </h3>
            </div>
            <button
              onClick={() => handleViewCategory('accessories')}
              className="text-xs font-mono-code text-[#F59E0B] hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>VIEW ALL JEWELRY (10)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jewelryProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

        {/* Speed Line Divider */}
        <div className="speed-lines my-12" />

        {/* ================= LINE 2: SUPER POWER EYEWEAR ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b-2 border-black pb-4">
            <div>
              <div className="text-xs font-mono-code text-[#00F0FF] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#00F0FF]" />
                <span>FEATURED LINE 02 // TACTICAL OPTICS</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
                SUPER POWER EYEWEAR & VISIONS
              </h3>
            </div>
            <button
              onClick={() => handleViewCategory('eyewear')}
              className="text-xs font-mono-code text-[#00F0FF] hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>VIEW ALL EYEWEAR (10)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eyewearProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

        {/* Speed Line Divider */}
        <div className="speed-lines my-12" />

        {/* ================= LINE 3: SUPER POWER POTIONS ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b-2 border-black pb-4">
            <div>
              <div className="text-xs font-mono-code text-[#8B5CF6] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" />
                <span>FEATURED LINE 03 // ALCHEMICAL CELL</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
                SUPER POWER POTIONS & SERUMS
              </h3>
            </div>
            <button
              onClick={() => handleViewCategory('potions')}
              className="text-xs font-mono-code text-[#8B5CF6] hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>VIEW ALL POTIONS (9)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {potionProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

        {/* Speed Line Divider */}
        <div className="speed-lines my-12" />

        {/* ================= LINE 4: INSECTS & SPRAYS ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b-2 border-black pb-4">
            <div>
              <div className="text-xs font-mono-code text-[#FF0055] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#FF0055]" />
                <span>FEATURED LINE 04 // BIO-SWARMS & MISTS</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
                SUPER POWER INSECTS & BIO-SPRAYS
              </h3>
            </div>
            <button
              onClick={() => handleViewCategory('insects')}
              className="text-xs font-mono-code text-[#FF0055] hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>VIEW ALL BIO-POWERS (17)</span>
              <ArrowRight className="h-4 w-4" />
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
