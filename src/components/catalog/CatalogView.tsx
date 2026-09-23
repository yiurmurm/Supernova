import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES_DATA } from '../../data/products';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Sparkles,
  Zap,
  Check
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
      return (b.powerLevel || 0) - (a.powerLevel || 0); // featured
    });
  }, [activeCategory, isBestsellerTab, isNewArrivalTab, searchQuery, selectedRarities, selectedArchetypes, maxPrice, sortBy]);

  const currentCategoryData = CATEGORIES_DATA.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#0B0A10] pb-24">
      
      {/* Category Hero Banner */}
      <div className="relative border-b-2 border-black bg-[#161521] py-10 px-4 sm:px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 halftone-bg opacity-20" />
        <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono-code text-[#00F0FF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {currentCategoryData ? `ARSENAL CATEGORY // ${currentCategoryData.number}` : isBestsellerTab ? 'TOP TIER VANGUARD' : isNewArrivalTab ? 'JUST SYNTHESIZED' : 'COMPLETE VAULT'}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
              {currentCategoryData ? currentCategoryData.name : isBestsellerTab ? 'BESTSELLER POWERS' : isNewArrivalTab ? 'NEW POWER ARRIVALS' : 'ALL SUPERPOWERS'}
            </h1>
            <p className="text-sm text-zinc-300 mt-2 max-w-2xl">
              {currentCategoryData ? currentCategoryData.description : 'Explore all 46 laboratory-grade superpower elixirs, cybernetic eyewear, dimensional rings, and bio-capsules.'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-[#0B0A10] border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_#000000] text-center min-w-[160px]">
            <div className="font-display text-3xl text-[#F59E0B]">
              {filteredProducts.length}
            </div>
            <div className="text-xs font-mono-code text-zinc-400">
              POWERS MATCHED
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        
        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-[#2A2938]">
          <button
            onClick={() => {
              setActiveCategory(null);
              triggerSoundEffect('ALL POWERS!');
            }}
            className={`px-4 py-2 text-xs font-display rounded-lg border-2 border-black whitespace-nowrap transition-all ${
              activeCategory === null
                ? 'bg-[#00F0FF] text-black shadow-[3px_3px_0px_#000000]'
                : 'bg-[#161521] text-zinc-300 hover:text-white'
            }`}
          >
            ALL CATEGORIES (46)
          </button>
          {CATEGORIES_DATA.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                triggerSoundEffect(`${cat.name}!`);
              }}
              className={`px-4 py-2 text-xs font-display rounded-lg border-2 border-black whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'text-black shadow-[3px_3px_0px_#000000]'
                  : 'bg-[#161521] text-zinc-300 hover:text-white'
              }`}
              style={{
                backgroundColor: activeCategory === cat.id ? cat.accentColor : undefined
              }}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Top Control Bar: Search, Mobile Filter Toggle, Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-[#161521] p-3 rounded-xl border-2 border-black">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by power name, elemental effect, or archetype..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0A10] border border-[#2A2938] rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00F0FF]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-[#0B0A10] border border-zinc-700 px-3 py-2 rounded-lg text-xs font-mono-code text-white"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#00F0FF]" />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-300">
              <span className="hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  triggerSoundEffect('SORTED!');
                }}
                className="bg-[#0B0A10] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
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
            <div className="rounded-xl border-2 border-black bg-[#161521] p-5 shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2938] mb-4">
                <div className="font-display text-lg text-white tracking-wider flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#00F0FF]" />
                  <span>VAULT FILTERS</span>
                </div>
                {(selectedRarities.length > 0 || selectedArchetypes.length > 0 || maxPrice < 1500) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[10px] font-mono-code text-[#FF0055] hover:underline"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono-code text-zinc-300 mb-2">
                  <span>MAX PRICE:</span>
                  <span className="text-[#F59E0B] font-bold">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="1500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#F59E0B]"
                />
                <div className="flex justify-between text-[10px] font-mono-code text-zinc-500 mt-1">
                  <span>$150</span>
                  <span>$1500</span>
                </div>
              </div>

              {/* Rarity Filter */}
              <div className="mb-6">
                <div className="text-xs font-mono-code text-[#00F0FF] uppercase mb-2">
                  POWER RARITY
                </div>
                <div className="space-y-1.5">
                  {['Omega-Class', 'Legendary', 'Epic', 'Rare', 'Common'].map((rarity) => (
                    <button
                      key={rarity}
                      onClick={() => toggleRarity(rarity)}
                      className={`flex w-full items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                        selectedRarities.includes(rarity)
                          ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold'
                          : 'text-zinc-400 hover:bg-[#2A2938] hover:text-white'
                      }`}
                    >
                      <span>{rarity}</span>
                      {selectedRarities.includes(rarity) && <Check className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Archetype Filter */}
              <div>
                <div className="text-xs font-mono-code text-[#00F0FF] uppercase mb-2">
                  ARCHETYPE GENE
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
                      className={`flex w-full items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                        selectedArchetypes.includes(arch.id)
                          ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold'
                          : 'text-zinc-400 hover:bg-[#2A2938] hover:text-white'
                      }`}
                    >
                      <span>{arch.label}</span>
                      {selectedArchetypes.includes(arch.id) && <Check className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* ================= PRODUCT GRID (Columns 2-4) ================= */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="rounded-xl border-2 border-black bg-[#161521] p-12 text-center shadow-[4px_4px_0px_#000000]">
                <Zap className="mx-auto h-12 w-12 text-zinc-500 mb-3" />
                <h3 className="font-display text-2xl text-white">
                  NO POWERS DETECTED
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  No supernatural artifacts match your current filter parameters. Try loosening your price or clearing filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 rounded bg-[#00F0FF] px-4 py-2 text-xs font-display text-black border border-black shadow-[2px_2px_0px_#000000]"
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-[#161521] h-full p-6 overflow-y-auto space-y-6 border-l-2 border-black">
            <div className="flex items-center justify-between border-b border-[#2A2938] pb-4">
              <div className="font-display text-xl text-white">
                VAULT FILTERS
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Max Price */}
            <div>
              <div className="text-xs font-mono-code text-zinc-300 mb-2">
                MAX PRICE: <strong className="text-[#F59E0B]">${maxPrice}</strong>
              </div>
              <input
                type="range"
                min="150"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F59E0B]"
              />
            </div>

            {/* Rarity */}
            <div>
              <div className="text-xs font-mono-code text-[#00F0FF] mb-2 uppercase">
                RARITY
              </div>
              {['Omega-Class', 'Legendary', 'Epic', 'Rare', 'Common'].map(r => (
                <button
                  key={r}
                  onClick={() => toggleRarity(r)}
                  className={`block w-full text-left py-1 text-xs ${
                    selectedRarities.includes(r) ? 'text-[#00F0FF] font-bold' : 'text-zinc-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 rounded-lg bg-[#00F0FF] text-black font-display text-sm border-2 border-black shadow-[3px_3px_0px_#000000]"
            >
              APPLY FILTERS ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
