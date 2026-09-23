import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_DATA } from '../../data/products';
import { 
  Zap, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  HelpCircle,
  Compass,
  MapPin,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cartCount, 
    user, 
    setIsCartOpen, 
    setIsProfileOpen, 
    setIsHelpOpen, 
    activeTab, 
    setActiveTab, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery, 
    triggerSoundEffect, 
    selectedCompanion, 
    companionTip, 
    triggerLoadingScreen 
  } = useApp();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCalloutTip, setShowCalloutTip] = useState(true);

  const handleNav = (tab: typeof activeTab, category: string | null = null) => {
    setActiveTab(tab);
    setActiveCategory(category);
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    triggerSoundEffect('SWOOSH!', undefined, undefined, '#4A90E2');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#2F3E46] bg-[#FDFBF0] shadow-[0px_3px_0px_#2F3E46] transition-colors duration-200">
      
      {/* Top Friendly Notification Banner */}
      <div className="bg-[#EBF3FC] border-b border-[#2F3E46]/15 py-1 px-4 text-center text-xs font-clean text-[#2F3E46] flex items-center justify-center gap-3">
        <span className="flex items-center gap-1 font-stability font-semibold">
          <Sparkles className="h-3 w-3 text-[#4A90E2]" />
          <span>SUPER POWER LABS</span>
        </span>
        <span className="hidden sm:inline text-[#2F3E46]/40">•</span>
        <span className="hidden sm:inline font-comfort italic">
          Everyday power, made simple & gentle
        </span>
        <span className="text-[#2F3E46]/40">•</span>
        <button
          onClick={() => triggerLoadingScreen(2200, 'STABLE-LOADING...')}
          className="text-[11px] font-mono-code font-bold text-[#4A90E2] hover:text-[#2F3E46] underline flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="h-2.5 w-2.5" />
          <span>Preview Loading Pulse</span>
        </button>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* ================= ZONE 1: BRAND LOGO (STABILITY) ================= */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('home')}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-[#2F3E46] bg-[#FFC800] text-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] group-hover:scale-105 transition-transform">
              <Zap className="h-5 w-5 fill-current stroke-[#2F3E46] stroke-2" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-stability font-extrabold text-xl tracking-tight text-[#2F3E46]">
                  SUPER POWER LABS
                </span>
                <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded-full border border-[#2F3E46] bg-[#EBF3FC] text-[#4A90E2]">
                  VOL. 1
                </span>
              </div>
              <p className="hidden text-[11px] font-clean italic text-[#5C676D] sm:block -mt-0.5">
                Friendly powers for everyday life
              </p>
            </div>
          </button>
        </div>

        {/* ================= ZONE 2: PRIMARY NAVIGATION ================= */}
        <nav className="hidden lg:flex items-center gap-2 text-xs font-stability font-bold">
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeTab === 'home' 
                ? 'bg-[#FFC800] text-[#2F3E46] border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]' 
                : 'border-transparent text-[#2F3E46] hover:bg-white hover:border-[#2F3E46]'
            }`}
          >
            HOME
          </button>

          <button
            onClick={() => handleNav('shop')}
            className={`px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeTab === 'shop' && !activeCategory 
                ? 'bg-[#FFC800] text-[#2F3E46] border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]' 
                : 'border-transparent text-[#2F3E46] hover:bg-white hover:border-[#2F3E46]'
            }`}
          >
            CATALOG
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              onMouseEnter={() => setIsCategoryOpen(true)}
              className="flex items-center gap-1 text-[#2F3E46] hover:text-[#4A90E2] py-2 px-2.5 rounded-xl hover:bg-white border-2 border-transparent hover:border-[#2F3E46] transition-all cursor-pointer"
            >
              <span>POWER LINES</span>
              <ChevronDown className="h-3 w-3 transition-transform duration-200" />
            </button>

            {isCategoryOpen && (
              <div
                onMouseLeave={() => setIsCategoryOpen(false)}
                className="absolute left-0 top-full mt-1 w-64 rounded-2xl border-2 border-[#2F3E46] bg-white p-2 shadow-[4px_4px_0px_#2F3E46] z-50"
              >
                <div className="px-2 py-1 text-[11px] font-stability font-bold text-[#2F3E46] border-b border-[#F5F3E8] mb-1 bg-[#FFF6D6] rounded-lg">
                  4 Friendly Mediums
                </div>
                {CATEGORIES_DATA.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleNav('shop', cat.id)}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-xs rounded-xl hover:bg-[#EBF3FC] transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="font-expressive text-sm text-[#2F3E46] group-hover:text-[#4A90E2]">
                        {cat.name}
                      </div>
                      <div className="text-[10px] text-[#5C676D] font-clean">
                        {cat.tagline}
                      </div>
                    </div>
                    <span className="font-mono-code text-[10px] bg-[#FDFBF0] text-[#2F3E46] px-1.5 py-0.5 rounded-full border border-[#2F3E46]/30">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('delivery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeTab === 'delivery' 
                ? 'bg-[#4A90E2] text-white border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]' 
                : 'border-transparent text-[#2F3E46] hover:bg-white hover:border-[#2F3E46]'
            }`}
          >
            <MapPin className="h-3.5 w-3.5 text-[#FFC800]" />
            <span>DELIVERY MAP</span>
          </button>

          <button
            onClick={() => handleNav('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeTab === 'quiz' 
                ? 'bg-[#FFC800] text-[#2F3E46] border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]' 
                : 'bg-white border-[#2F3E46]/40 text-[#2F3E46] hover:border-[#2F3E46]'
            }`}
          >
            <Compass className="h-3.5 w-3.5 text-[#4A90E2]" />
            <span>APTITUDE QUIZ</span>
          </button>
        </nav>

        {/* ================= ZONE 3: SEARCH WITH MASCOT COMPANION ================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Bar with Mascot Hover */}
          <div className="relative flex items-center">
            
            {/* The Mascot Avatar hovering beside Search */}
            <div 
              onClick={() => setShowCalloutTip(!showCalloutTip)}
              className="relative -mr-3 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-white border-2 border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] text-base cursor-pointer animate-mascot-float"
              title={`${selectedCompanion.name}: Click for advice!`}
            >
              {selectedCompanion.avatarEmoji}
            </div>

            {/* Input */}
            <div className="flex items-center gap-1.5 bg-white border-2 border-[#2F3E46] rounded-2xl pl-4 pr-3 py-1.5 shadow-[2px_2px_0px_#2F3E46]">
              <Search className="h-3.5 w-3.5 text-[#5C676D]" />
              <input
                type="text"
                placeholder="Search calm powers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setActiveTab('shop');
                }}
                className="w-28 sm:w-44 bg-transparent text-xs text-[#2F3E46] placeholder-[#5C676D]/60 focus:outline-none font-clean"
              />
            </div>

            {/* Whimsical Mascot Speech Callout Bubble (Temporary / Click to dismiss) */}
            {showCalloutTip && companionTip && (
              <div className="absolute top-full right-0 mt-2 z-50 w-52 sm:w-60 rounded-2xl border-2 border-[#2F3E46] bg-[#FFF6D6] p-3 shadow-[3px_3px_0px_#2F3E46]">
                <div className="flex items-start justify-between gap-1">
                  <span className="font-stability text-[10px] font-bold uppercase tracking-wider text-[#4A90E2]">
                    {selectedCompanion.name}
                  </span>
                  <button 
                    onClick={() => setShowCalloutTip(false)}
                    className="text-[#5C676D] hover:text-[#2F3E46] text-[10px] font-bold"
                  >
                    ✕
                  </button>
                </div>
                <p className="font-handwritten text-sm text-[#2F3E46] mt-0.5 leading-snug">
                  &ldquo;{companionTip}&rdquo;
                </p>
                {/* Speech tail */}
                <div className="absolute -top-2 right-12 w-3 h-3 bg-[#FFF6D6] border-t-2 border-l-2 border-[#2F3E46] rotate-45" />
              </div>
            )}
          </div>

          {/* Support Witch / Oracle */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#2F3E46] bg-white text-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] hover:bg-[#FFF6D6] transition-colors cursor-pointer"
            title="Apothecary Helpline & FAQ"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* User Dossier Profile Button */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border-2 border-[#2F3E46] bg-white p-1 text-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] hover:bg-[#FFF6D6] transition-colors cursor-pointer"
            title="User Identity Dossier"
          >
            <div className="relative h-7 w-7 rounded-lg overflow-hidden border border-[#2F3E46] bg-[#EBF3FC]">
              <img
                src={user.avatar}
                alt={user.heroAlias}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden md:inline font-expressive text-xs px-1 truncate max-w-[90px]">
              {user.heroAlias}
            </span>
          </button>

          {/* Utility Belt Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-xl border-2 border-[#2F3E46] bg-[#FFC800] px-3 py-1.5 text-[#2F3E46] shadow-[3px_3px_0px_#2F3E46] hover:bg-[#4A90E2] hover:text-white transition-all font-stability font-bold text-xs cursor-pointer"
            title="Open Utility Belt"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">BELT</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2F3E46] text-[10px] font-mono-code font-bold text-white">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#2F3E46] bg-white text-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] lg:hidden cursor-pointer"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>

      </div>

      {/* ================= MOBILE EXPANDED DRAWER ================= */}
      {isMobileMenuOpen && (
        <div className="border-t-2 border-[#2F3E46] bg-[#F5F3E8] p-4 lg:hidden font-stability font-bold">
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-[#2F3E46] bg-white text-left text-sm"
            >
              <span>HOME</span>
              <span className="text-xs text-[#FFC800]">★</span>
            </button>

            <button
              onClick={() => handleNav('shop')}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-[#2F3E46] bg-white text-left text-sm"
            >
              <span>POWER ARSENAL (46 NOVELTIES)</span>
              <span className="text-xs text-[#4A90E2]">→</span>
            </button>

            <button
              onClick={() => handleNav('delivery')}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-[#2F3E46] bg-[#EBF3FC] text-left text-sm"
            >
              <span>LOCAL DELIVERY MAP</span>
              <MapPin className="h-4 w-4 text-[#4A90E2]" />
            </button>

            <button
              onClick={() => handleNav('quiz')}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-[#2F3E46] bg-[#FFF6D6] text-left text-sm"
            >
              <span>TAKE APTITUDE QUIZ</span>
              <span className="text-xs text-[#2F3E46]">⚡</span>
            </button>

            <button
              onClick={() => triggerLoadingScreen(2000, 'STABLE-LOADING...')}
              className="flex items-center justify-between p-3 rounded-xl border-2 border-[#2F3E46] bg-white text-left text-sm text-[#4A90E2]"
            >
              <span>PREVIEW LOADING ANIMATION</span>
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
