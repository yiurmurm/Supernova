import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA } from '../../data/products';
import { 
  Zap, 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldAlert, 
  Flame,
  HelpCircle,
  Compass
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    utilityBeltCapacity,
    wishlist,
    user,
    setIsCartOpen,
    setIsAuthOpen,
    setIsProfileOpen,
    setIsHelpOpen,
    toggleHeroVillainMode,
    activeTab,
    setActiveTab,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    powerSurge,
    setPowerSurge,
    triggerSoundEffect
  } = useApp();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleNav = (tab: typeof activeTab, category: string | null = null) => {
    setActiveTab(tab);
    setActiveCategory(category);
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    triggerSoundEffect('SWOOSH!');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2A2938] bg-[#0B0A10]/95 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* ================= ZONE 1: BRAND LOGO ================= */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('home')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className={`relative flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black font-display text-xl transition-transform group-hover:scale-105 ${
              user.mode === 'villain' ? 'bg-[#FF0033] text-white shadow-[3px_3px_0px_#000000]' : 'bg-[#00F0FF] text-black shadow-[3px_3px_0px_#000000]'
            }`}>
              <Zap className="h-6 w-6 fill-current animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl tracking-wider text-white group-hover:text-[#00F0FF] transition-colors">
                  SUPRANOVA
                </span>
                <span className={`text-[10px] font-mono-code font-bold px-1 rounded ${
                  user.mode === 'villain' ? 'bg-[#FF0033]/20 text-[#FF0033]' : 'bg-[#00F0FF]/20 text-[#00F0FF]'
                }`}>
                  {user.mode === 'villain' ? 'VILLAIN' : 'GENE-X'}
                </span>
              </div>
              <p className="hidden text-[10px] font-mono-code text-zinc-400 sm:block -mt-1 tracking-tight">
                SUPER-CELL // POWER LABS
              </p>
            </div>
          </button>
        </div>

        {/* ================= ZONE 2: PRIMARY NAVIGATION ================= */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors hover:text-[#00F0FF] ${
              activeTab === 'home' ? 'text-[#00F0FF] font-semibold border-b-2 border-[#00F0FF] pb-1' : 'text-zinc-300'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('shop')}
            className={`transition-colors hover:text-[#00F0FF] ${
              activeTab === 'shop' && !activeCategory ? 'text-[#00F0FF] font-semibold border-b-2 border-[#00F0FF] pb-1' : 'text-zinc-300'
            }`}
          >
            Shop All
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              onMouseEnter={() => setIsCategoryOpen(true)}
              className="flex items-center gap-1 text-zinc-300 hover:text-[#00F0FF] transition-colors py-2"
            >
              <span>Categories</span>
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
            </button>

            {isCategoryOpen && (
              <div
                onMouseLeave={() => setIsCategoryOpen(false)}
                className="absolute left-0 top-full mt-1 w-64 rounded-lg border-2 border-black bg-[#161521] p-2 shadow-[5px_5px_0px_#000000] z-50"
              >
                <div className="px-2 py-1 text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider border-b border-[#2A2938] mb-1">
                  5 Faction Arsenals
                </div>
                {CATEGORIES_DATA.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleNav('shop', cat.id)}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-xs rounded hover:bg-[#2A2938] transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-[#00F0FF]">
                        {cat.name}
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        {cat.tagline}
                      </div>
                    </div>
                    <span className="font-mono-code text-[10px] text-zinc-500">
                      {cat.count} items
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('bestsellers')}
            className={`transition-colors hover:text-[#00F0FF] ${
              activeTab === 'bestsellers' ? 'text-[#00F0FF] font-semibold border-b-2 border-[#00F0FF] pb-1' : 'text-zinc-300'
            }`}
          >
            Bestsellers
          </button>

          <button
            onClick={() => handleNav('new-arrivals')}
            className={`transition-colors hover:text-[#00F0FF] ${
              activeTab === 'new-arrivals' ? 'text-[#00F0FF] font-semibold border-b-2 border-[#00F0FF] pb-1' : 'text-zinc-300'
            }`}
          >
            New Arrivals
          </button>

          <button
            onClick={() => handleNav('quiz')}
            className={`flex items-center gap-1.5 transition-colors hover:text-[#F59E0B] ${
              activeTab === 'quiz' ? 'text-[#F59E0B] font-semibold border-b-2 border-[#F59E0B] pb-1' : 'text-[#F59E0B]'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Power Quiz</span>
          </button>
        </nav>

        {/* ================= ZONE 3: ACTIONS & TELEMETRY ================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Search */}
          <div className="relative">
            {isSearchExpanded ? (
              <div className="flex items-center gap-1 bg-[#161521] border border-[#2A2938] rounded-md px-2 py-1">
                <Search className="h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search powers, elixirs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setActiveTab('shop');
                    }
                  }}
                  autoFocus
                  className="w-36 sm:w-48 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => {
                    setIsSearchExpanded(false);
                    setSearchQuery('');
                  }}
                  className="text-zinc-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="p-2 text-zinc-300 hover:text-white hover:bg-[#161521] rounded-md transition-colors"
                title="Search superpower vault"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Power Surge Slider Mini Control */}
          <div className="hidden xl:flex items-center gap-2 bg-[#161521] px-2.5 py-1 rounded-md border border-[#2A2938]">
            <span className="text-[10px] font-mono-code text-zinc-400">SURGE:</span>
            <input
              type="range"
              min="10"
              max="100"
              value={powerSurge}
              onChange={(e) => {
                setPowerSurge(Number(e.target.value));
                triggerSoundEffect('VOLT!', undefined, undefined, '#00F0FF');
              }}
              className="h-1.5 w-16 cursor-pointer appearance-none rounded bg-[#2A2938] accent-[#00F0FF]"
              title={`Power Surge: ${powerSurge}%`}
            />
            <span className="font-mono-code text-[11px] text-[#00F0FF] w-7 text-right">
              {powerSurge}%
            </span>
          </div>

          {/* Hero / Villain Mode Switcher */}
          <button
            onClick={toggleHeroVillainMode}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-black transition-all ${
              user.mode === 'villain'
                ? 'bg-[#FF0033] text-white shadow-[2px_2px_0px_#000000]'
                : 'bg-[#161521] text-zinc-300 hover:text-white border-[#2A2938]'
            }`}
            title="Toggle Hero / Villain Mode (or use Konami code: ↑↑↓↓←→←→BA)"
          >
            {user.mode === 'villain' ? (
              <>
                <Flame className="h-3.5 w-3.5 animate-pulse" />
                <span className="font-display tracking-wider">VILLAIN</span>
              </>
            ) : (
              <>
                <ShieldAlert className="h-3.5 w-3.5 text-[#00F0FF]" />
                <span className="font-mono-code text-[11px]">HERO</span>
              </>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => handleNav('shop')}
            className="relative p-2 text-zinc-300 hover:text-[#FF0055] hover:bg-[#161521] rounded-md transition-colors"
            title="View Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF0055] text-[9px] font-bold text-white border border-black">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account / Hero Dossier */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-2 p-1.5 hover:bg-[#161521] rounded-md transition-colors group"
            title="Hero Identity & Secret Dossier"
          >
            <div className="relative h-7 w-7 rounded-full border border-[#00F0FF] overflow-hidden bg-[#161521]">
              <img
                src={user.avatar}
                alt={user.heroAlias}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-[11px] font-semibold text-white group-hover:text-[#00F0FF] leading-tight truncate max-w-[90px]">
                {user.heroAlias}
              </div>
              <div className="text-[9px] font-mono-code text-[#F59E0B] leading-none">
                LVL {user.powerLevelScore}
              </div>
            </div>
          </button>

          {/* Utility Belt Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#161521] hover:bg-[#2A2938] px-3 py-1.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_#00F0FF] transition-transform active:translate-y-0.5"
            title="Open Utility Belt Cart"
          >
            <ShoppingBag className="h-5 w-5 text-[#00F0FF]" />
            <div className="hidden sm:block text-left">
              <div className="text-[10px] font-mono-code text-zinc-400 leading-tight">
                BELT: {utilityBeltCapacity}%
              </div>
              <div className="text-xs font-bold text-white leading-none">
                {cartCount} {cartCount === 1 ? 'Power' : 'Powers'}
              </div>
            </div>
            {cartCount > 0 && (
              <span className="sm:hidden absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#00F0FF] text-[10px] font-bold text-black border border-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* Help Center Button */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-[#161521] rounded-md transition-colors"
            title="Support Witch & Oracle"
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-md"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2A2938] bg-[#161521] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#2A2938]">
            <button
              onClick={() => handleNav('home')}
              className="py-2 px-3 text-left text-sm font-semibold rounded bg-[#0B0A10] hover:text-[#00F0FF]"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('shop')}
              className="py-2 px-3 text-left text-sm font-semibold rounded bg-[#0B0A10] hover:text-[#00F0FF]"
            >
              Shop All (46)
            </button>
            <button
              onClick={() => handleNav('bestsellers')}
              className="py-2 px-3 text-left text-sm font-semibold rounded bg-[#0B0A10] hover:text-[#00F0FF]"
            >
              Bestsellers
            </button>
            <button
              onClick={() => handleNav('new-arrivals')}
              className="py-2 px-3 text-left text-sm font-semibold rounded bg-[#0B0A10] hover:text-[#00F0FF]"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNav('quiz')}
              className="col-span-2 py-2 px-3 text-center text-sm font-display text-[#F59E0B] rounded bg-[#0B0A10] border border-[#F59E0B]/30"
            >
              ★ Take Superpower Quiz (5 Questions)
            </button>
          </div>

          <div className="text-xs font-mono-code text-zinc-400">CATEGORIES</div>
          <div className="grid grid-cols-1 gap-1.5">
            {CATEGORIES_DATA.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleNav('shop', cat.id)}
                className="flex items-center justify-between px-3 py-2 rounded bg-[#0B0A10] text-xs text-white"
              >
                <span>{cat.name}</span>
                <span className="font-mono-code text-zinc-500 text-[10px]">{cat.count} items</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#2A2938] flex items-center justify-between text-xs">
            <span className="text-zinc-400">Power Surge: {powerSurge}%</span>
            <input
              type="range"
              min="10"
              max="100"
              value={powerSurge}
              onChange={(e) => setPowerSurge(Number(e.target.value))}
              className="w-32 accent-[#00F0FF]"
            />
          </div>
        </div>
      )}
    </header>
  );
};
