import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES_DATA } from '../../data/products';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  Sparkles,
  Zap,
  Check,
  Star
} from 'lucide-react';

export const CatalogView: React.FC = () => {
  const { 
    activeTab, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery, 
    triggerSoundEffect 
  } = useApp();

  // Filters State
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [selectedArchetypes, setSelectedArchetypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<'featured' | 'bestselling' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync tab with category or filter if bestsellers/new-arrivals clicked
  const isBestsellerTab = activeTab === 'bestsellers';
  const isNewArrivalTab = activeTab === 'new-arrivals';

  const toggleRarity = (rarity: string) => {
    setSelectedRarities(prev => 
      prev.includes(rarity) ? prev.filter(r => r !== rarity) : [...prev, rarity]
    );
    triggerSoundEffect('FILTER!');
  };

  const toggleArchetype = (arch: string) => {
    setSelectedArchetypes(prev => 
      prev.includes(arch) ? prev.filter(a => a !== arch) : [...prev, arch]
    );
    triggerSoundEffect('FILTER!');
  };

  const clearAllFilters = () => {
    setSelectedRarities([]);
    setSelectedArchetypes([]);
    setMaxPrice(1500);
    setActiveCategory(null);
    setSearchQuery('');
    triggerSoundEffect('FILTERS RESET!');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Category filter
      if (activeCategory && prod.category !== activeCategory) {
        return false;
      }
      // Tab filter
      if (isBestsellerTab && !prod.bestseller) {
        return false;
      }
      if (isNewArrivalTab && !prod.newArrival) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesTag = prod.tagline.toLowerCase().includes(query);
        const matchesPower = prod.powerType.toLowerCase().includes(query);
        const matchesCat = prod.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesTag && !matchesPower && !matchesCat) {
          return false;
        }
      }
      // Rarity filter
      if (selectedRarities.length > 0 && !selectedRarities.includes(prod.rarity)) {
        return false;
      }
      // Archetype filter
      if (selectedArchetypes.length > 0 && !selectedArchetypes.includes(prod.archetype)) {
        return false;
      }
      // Price filter
      if (prod.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'bestselling') return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.powerLevel || 0) - (a.powerLevel || 0);
    });
  }, [activeCategory, isBestsellerTab, isNewArrivalTab, searchQuery, selectedRarities, selectedArchetypes, maxPrice, sortBy]);

  const currentCategoryData = CATEGORIES_DATA.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#FFFDF0] pb-24 halftone-bg">
      
      {/* Category Comic Header Banner */}
      <div className="relative border-b-3 border-black bg-[#FFE600] py-10 px-4 sm:px-6 shadow-[0px_4px_0px_#000000]">
        <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-code font-black text-black bg-white px-2.5 py-0.5 rounded border border-black mb-2 uppercase tracking-wider">
              <Star className="h-3.5 w-3.5 fill-current text-[#FF2A2A]" />
              <span>
                {currentCategoryData ? `ARSENAL SECTION // ${currentCategoryData.number}` : isBestsellerTab ? 'TOP SELLING WONDERS' : isNewArrivalTab ? 'FRESHLY ARRIVED IN STOCK' : 'THE COMPLETE 46 POWER VAULT'}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl text-black tracking-wide leading-tight">
              {currentCategoryData ? currentCategoryData.name : isBestsellerTab ? 'BESTSELLING SUPERPOWERS' : isNewArrivalTab ? 'NEW POWER ARRIVALS' : 'SUPRANOVA POWER CATALOG'}
            </h1>
            <p className="text-sm font-medium text-black/85 mt-2 max-w-2xl bg-white/70 p-2.5 rounded-lg border-2 border-black">
              {currentCategoryData ? currentCategoryData.description : 'Real superhero and villain artifacts! Bottled elixirs, hypnotic monocles, teleportation bands, and companion bio-beetles.'}
            </p>
          </div>

          {/* Matches Counter Badge */}
          <div className="bg-white border-3 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000000] text-center min-w-[170px]">
            <div className="font-display text-4xl text-[#FF2A2A]">
              {filteredProducts.length}
            </div>
            <div className="text-xs font-mono-code font-bold text-black">
              POWERS IN STOCK
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        
        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b-2 border-black">
          <button
            onClick={() => {
              setActiveCategory(null);
              triggerSoundEffect('ALL POWERS!');
            }}
            className={`px-4 py-2 text-xs font-display rounded-xl border-2 border-black whitespace-nowrap transition-all ${
              activeCategory === null
                ? 'bg-[#FFE600] text-black shadow-[3px_3px_0px_#000000] translate-y-[-1px]'
                : 'bg-white text-black hover:bg-[#FAF6E8]'
            }`}
          >
            ★ ALL CATEGORIES (46)
          </button>
          {CATEGORIES_DATA.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                triggerSoundEffect(`${cat.name}!`);
              }}
              className={`px-4 py-2 text-xs font-display rounded-xl border-2 border-black whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#FFE600] text-black shadow-[3px_3px_0px_#000000] translate-y-[-1px]'
                  : 'bg-white text-black hover:bg-[#FAF6E8]'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Top Control Bar: Search, Mobile Filter Toggle, Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white p-3 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000000]">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-black/70" />
            <input
              type="text"
              placeholder="Search by superpower name, effect, or archetype..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF6E8] border-2 border-black rounded-xl pl-9 pr-8 py-2 text-xs text-black font-mono-code font-bold placeholder-black/50 focus:outline-none focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-black hover:text-[#FF2A2A] text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-[#FFE600] border-2 border-black px-3 py-2 rounded-xl text-xs font-mono-code font-bold text-black shadow-[2px_2px_0px_#000000]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-black" />
              <span>FILTERS</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-black">
              <span className="hidden sm:inline">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  triggerSoundEffect('SORTED!');
                }}
                className="bg-[#FAF6E8] border-2 border-black rounded-xl px-3 py-2 text-xs text-black font-bold focus:outline-none"
              >
                <option value="featured">Featured / Power Level</option>
                <option value="bestselling">Bestsellers</option>
                <option value="newest">New Arrivals</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ================= DESKTOP FILTER SIDEBAR ================= */}
          <aside className="hidden lg:block space-y-6">
            <div className="rounded-2xl border-3 border-black bg-white p-5 shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                <div className="font-display text-xl text-black tracking-wider flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#FF2A2A]" />
                  <span>VAULT FILTERS</span>
                </div>
                {(selectedRarities.length > 0 || selectedArchetypes.length > 0 || maxPrice < 1500) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] font-mono-code font-bold text-[#FF2A2A] hover:underline"
                  >
                    RESET ALL
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono-code font-bold text-black mb-2">
                  <span>MAX PRICE:</span>
                  <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="1500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#FF2A2A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono-code font-bold text-black/60 mt-1">
                  <span>$150</span>
                  <span>$1500</span>
                </div>
              </div>

              {/* Rarity Filter */}
              <div className="mb-6">
                <div className="text-xs font-mono-code font-bold text-black uppercase mb-2 border-b border-black pb-1">
                  CLASSIFICATION RARITY
                </div>
                <div className="space-y-1.5">
                  {['Omega-Class', 'Legendary', 'Epic', 'Rare', 'Common'].map((rarity) => (
                    <button
                      key={rarity}
                      onClick={() => toggleRarity(rarity)}
                      className={`flex w-full items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold border-2 transition-all ${
                        selectedRarities.includes(rarity)
                          ? 'bg-[#FFE600] border-black text-black shadow-[2px_2px_0px_#000000]'
                          : 'border-transparent text-black/80 hover:bg-[#FAF6E8]'
                      }`}
                    >
                      <span>{rarity}</span>
                      {selectedRarities.includes(rarity) && <Check className="h-3 w-3 stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Archetype Filter */}
              <div>
                <div className="text-xs font-mono-code font-bold text-black uppercase mb-2 border-b border-black pb-1">
                  ORIGIN ARCHETYPE
                </div>
                <div className="space-y-1.5">
                  {[
                    { id: 'tech', label: 'Tech-Enhanced' },
                    { id: 'mutant', label: 'Mutant / Bio' },
                    { id: 'mystic', label: 'Mystic / Aether' }
                  ].map((arch) => (
                    <button
                      key={arch.id}
                      onClick={() => toggleArchetype(arch.id)}
                      className={`flex w-full items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold border-2 transition-all ${
                        selectedArchetypes.includes(arch.id)
                          ? 'bg-[#FFE600] border-black text-black shadow-[2px_2px_0px_#000000]'
                          : 'border-transparent text-black/80 hover:bg-[#FAF6E8]'
                      }`}
                    >
                      <span>{arch.label}</span>
                      {selectedArchetypes.includes(arch.id) && <Check className="h-3 w-3 stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* ================= PRODUCT GRID (Columns 2-4) ================= */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border-3 border-black bg-white p-12 text-center shadow-[6px_6px_0px_#000000]">
                <Zap className="mx-auto h-12 w-12 text-[#FF2A2A] mb-3" />
                <h3 className="font-display text-3xl text-black">
                  OUCH! NO MATCHES FOUND!
                </h3>
                <p className="text-xs font-mono-code font-bold text-black/70 mt-1 max-w-sm mx-auto">
                  No supernatural artifacts match these parameters. Try clearing your filters or changing your budget!
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 rounded-xl bg-[#FFE600] px-5 py-2.5 text-xs font-display text-black border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-[#FF2A2A] hover:text-white transition-colors"
                >
                  RESET VAULT FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 border-l-3 border-black font-mono-code font-bold">
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <div className="font-display text-2xl text-black">
                VAULT FILTERS
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-black hover:text-[#FF2A2A] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Max Price */}
            <div>
              <div className="text-xs text-black mb-2">
                MAX PRICE: <strong className="text-[#FF2A2A]">${maxPrice}</strong>
              </div>
              <input
                type="range"
                min="150"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FF2A2A]"
              />
            </div>

            {/* Rarity */}
            <div>
              <div className="text-xs text-black mb-2 uppercase border-b border-black pb-1">
                RARITY
              </div>
              {['Omega-Class', 'Legendary', 'Epic', 'Rare', 'Common'].map(r => (
                <button
                  key={r}
                  onClick={() => toggleRarity(r)}
                  className={`block w-full text-left py-1 text-xs ${
                    selectedRarities.includes(r) ? 'text-[#FF2A2A] font-bold' : 'text-black/70'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-[#FFE600] text-black font-display text-base border-2 border-black shadow-[3px_3px_0px_#000000]"
            >
              APPLY FILTERS ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
