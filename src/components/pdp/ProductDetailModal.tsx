import React, { useState, useRef, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Zap, 
  ShieldCheck, 
  RotateCw, 
  Sparkles, 
  Star, 
  Check, 
  Truck, 
  CornerDownRight, 
  Compass,
  Swords,
  ArrowRightLeft,
  ChevronDown,
  TrendingUp,
  Award
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    user, 
    equipPower,
    triggerSoundEffect 
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const [isEquippedNotice, setIsEquippedNotice] = useState(false);

  // Power Comparison Feature State
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [comparisonProductId, setComparisonProductId] = useState<string>('');

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Determine comparison target: fallback to another product in the same or complementary category
  const comparisonProduct: Product | undefined = useMemo(() => {
    if (!selectedProduct) return undefined;
    if (comparisonProductId && comparisonProductId !== selectedProduct.id) {
      return PRODUCTS.find(p => p.id === comparisonProductId);
    }
    // Default rival: pick first different product from same category or different category
    return (
      PRODUCTS.find(p => p.category === selectedProduct.category && p.id !== selectedProduct.id) ||
      PRODUCTS.find(p => p.id !== selectedProduct.id)
    );
  }, [selectedProduct, comparisonProductId]);

  if (!selectedProduct) return null;

  const currentVariant = selectedVariant || selectedProduct.variants?.[0] || 'Standard Issue Model';
  const isFavorited = isInWishlist(selectedProduct.id);
  const isEquipped = user.equippedPowers.includes(selectedProduct.id);

  // Pokemon Card 3D Tilt on Mouse Move
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;
    setCardRotation({ x: rotX, y: rotY });
  };

  const handleCardMouseLeave = () => {
    setCardRotation({ x: 0, y: 0 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    addToCart(selectedProduct, quantity, currentVariant, e);
  };

  const handleAddChallengerToCart = (e: React.MouseEvent) => {
    if (comparisonProduct) {
      addToCart(comparisonProduct, 1, undefined, e);
      triggerSoundEffect('CHALLENGER ADDED TO BELT! ⚡', e.clientX, e.clientY, '#FF0055');
    }
  };

  const handleEquip = (e: React.MouseEvent) => {
    equipPower(selectedProduct.id, e);
    setIsEquippedNotice(true);
    setTimeout(() => setIsEquippedNotice(false), 2500);
  };

  const handleSwapPrimaryWithChallenger = () => {
    if (comparisonProduct) {
      const prevPrimary = selectedProduct;
      setSelectedProduct(comparisonProduct);
      setComparisonProductId(prevPrimary.id);
      triggerSoundEffect('POWER ROLES SWAPPED! ✦', undefined, undefined, '#FF0055');
    }
  };

  const handleToggleCompare = () => {
    const nextState = !isCompareMode;
    setIsCompareMode(nextState);
    if (nextState) {
      triggerSoundEffect('VERSUS COMPARISON ENGAGED! ⚔️', undefined, undefined, '#FF0055');
    } else {
      triggerSoundEffect('DIAGNOSTIC MODE RESUMED! ✦');
    }
  };

  // Radar Chart Calculations for 5 stats (Speed, Power, Intelligence, Stealth, Durability)
  const statsA = selectedProduct.stats;
  const statsB = comparisonProduct ? comparisonProduct.stats : statsA;

  const statKeys = [
    { key: 'speed', label: 'SPEED', valA: statsA.speed, valB: statsB.speed },
    { key: 'power', label: 'POWER', valA: statsA.power, valB: statsB.power },
    { key: 'intelligence', label: 'INTEL', valA: statsA.intelligence, valB: statsB.intelligence },
    { key: 'stealth', label: 'STEALTH', valA: statsA.stealth, valB: statsB.stealth },
    { key: 'durability', label: 'DURABILITY', valA: statsA.durability, valB: statsB.durability }
  ];

  // Map 5 points onto a 220x220 polygon
  const radius = 78;
  const centerX = 110;
  const centerY = 110;

  // Primary product polygon points (Cyan #00F0FF)
  const polygonPointsA = statKeys.map((s, idx) => {
    const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
    const r = (s.valA / 100) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Challenger product polygon points (Magenta #FF0055)
  const polygonPointsB = statKeys.map((s, idx) => {
    const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
    const r = (s.valB / 100) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Calculate advantages
  const winsA = statKeys.filter(s => s.valA > s.valB).length;
  const winsB = statKeys.filter(s => s.valB > s.valA).length;
  const ties = statKeys.filter(s => s.valA === s.valB).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl rounded-2xl border-4 border-black bg-[#0B0A10] p-4 sm:p-8 shadow-[10px_10px_0px_#000000,14px_14px_0px_#00F0FF] my-auto">
        
        {/* Top Header Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black font-display text-lg ${
              isCompareMode ? 'bg-[#FF0055] text-white shadow-[2px_2px_0px_#000000]' : 'bg-[#00F0FF] text-black shadow-[2px_2px_0px_#000000]'
            }`}>
              {isCompareMode ? <Swords className="h-5 w-5 animate-pulse" /> : <Zap className="h-5 w-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl sm:text-2xl text-white tracking-wide">
                  {isCompareMode ? 'VERSUS PROTOCOL: DUAL POWER COMPARISON' : 'GENE-X PRODUCT INSPECTOR'}
                </span>
                <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded border border-black bg-[#161521] text-[#00F0FF]">
                  {selectedProduct.rarity}
                </span>
              </div>
              <p className="text-[10px] font-mono-code text-zinc-400">
                {isCompareMode ? 'CROSS-EXAMINE DUAL SUPERPOWERS VIA OVERLAY RADAR MATRIX' : 'EXAMINE FOIL SPECIFICATIONS & BIOMETRIC STATS'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* POWER COMPARISON TOGGLE BUTTON */}
            <button
              onClick={handleToggleCompare}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border-2 border-black font-display text-xs tracking-wider transition-all ${
                isCompareMode
                  ? 'bg-[#FF0055] text-white shadow-[3px_3px_0px_#000000]'
                  : 'bg-[#161521] text-zinc-300 hover:text-white hover:border-[#00F0FF] shadow-[2px_2px_0px_#000000]'
              }`}
              title="Toggle Side-by-Side Power Comparison"
            >
              <Swords className="h-4 w-4" />
              <span>{isCompareMode ? 'EXIT VERSUS MODE' : '⚔️ COMPARE POWER'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#161521] text-zinc-300 hover:text-white hover:bg-[#FF0055] transition-colors"
              title="Close Inspector"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ======================== MODE 1: COMPARISON VIEW ======================== */}
        {/* ========================================================================= */}
        {isCompareMode && comparisonProduct ? (
          <div className="space-y-6">
            
            {/* Top Selector Strip: Challenger Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#161521] p-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000]">
              <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-300">
                <span className="text-[#FF0055] font-bold">CHALLENGER SELECTION:</span>
                <span className="hidden md:inline text-zinc-500">Compare against any other artifact in the vault:</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={comparisonProduct.id}
                  onChange={(e) => {
                    setComparisonProductId(e.target.value);
                    triggerSoundEffect('CHALLENGER SELECTED! ⚡', undefined, undefined, '#FF0055');
                  }}
                  className="bg-[#0B0A10] border border-[#2A2938] text-white text-xs font-mono-code px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#FF0055] max-w-[280px] truncate"
                >
                  {PRODUCTS.filter(p => p.id !== selectedProduct.id).map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.categoryLabel.toUpperCase()}] {p.name} ({p.powerLevel} PL - ${p.price})
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleSwapPrimaryWithChallenger}
                  className="flex items-center gap-1 bg-[#0B0A10] hover:bg-[#2A2938] text-xs font-mono-code text-[#00F0FF] px-2.5 py-1.5 rounded-lg border border-black transition-colors"
                  title="Swap primary and challenger roles"
                >
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Swap</span>
                </button>
              </div>
            </div>

            {/* Comparison Cards: Product A vs Product B */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              
              {/* Product A Card (Primary - Cyan) */}
              <div className="md:col-span-5 rounded-xl border-3 border-black bg-[#161521] p-4 shadow-[4px_4px_0px_#000000,6px_6px_0px_#00F0FF] relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-[#00F0FF] text-black font-mono-code text-[10px] font-bold px-2 py-0.5 rounded border border-black">
                  PRIMARY SPECIMEN
                </div>

                <div className="flex gap-4 items-center">
                  <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 border-black bg-black">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono-code text-[#00F0FF] uppercase truncate">
                      {selectedProduct.categoryLabel} · {selectedProduct.powerType}
                    </div>
                    <h3 className="font-display text-xl text-white tracking-wide truncate">
                      {selectedProduct.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-mono-code text-lg font-bold text-[#F59E0B]">
                        ${selectedProduct.price}
                      </span>
                      <span className="text-xs font-mono-code text-[#00F0FF] font-bold">
                        {selectedProduct.powerLevel} PL
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#2A2938] flex items-center justify-between text-xs font-mono-code">
                  <span className="text-zinc-400">Duration: <strong className="text-white">{selectedProduct.duration}</strong></span>
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-1 bg-[#00F0FF] text-black font-display text-xs px-2.5 py-1 rounded border border-black shadow-[2px_2px_0px_#000000] hover:bg-[#F59E0B]"
                  >
                    <ShoppingBag className="h-3 w-3" />
                    <span>Equip to Belt</span>
                  </button>
                </div>
              </div>

              {/* Center VS Explosive Comic Badge */}
              <div className="md:col-span-1 flex flex-col items-center justify-center my-[-8px] md:my-0 z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F59E0B] text-black font-display text-xl border-3 border-black shadow-[3px_3px_0px_#000000] rotate-[-6deg] animate-pulse">
                  VS
                </div>
                <div className="hidden md:block text-[9px] font-mono-code text-zinc-500 mt-1">
                  MATCHUP
                </div>
              </div>

              {/* Product B Card (Challenger - Magenta) */}
              <div className="md:col-span-5 rounded-xl border-3 border-black bg-[#161521] p-4 shadow-[4px_4px_0px_#000000,6px_6px_0px_#FF0055] relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-[#FF0055] text-white font-mono-code text-[10px] font-bold px-2 py-0.5 rounded border border-black">
                  CHALLENGER
                </div>

                <div className="flex gap-4 items-center">
                  <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 border-black bg-black">
                    <img
                      src={comparisonProduct.image}
                      alt={comparisonProduct.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono-code text-[#FF0055] uppercase truncate">
                      {comparisonProduct.categoryLabel} · {comparisonProduct.powerType}
                    </div>
                    <h3 className="font-display text-xl text-white tracking-wide truncate">
                      {comparisonProduct.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-mono-code text-lg font-bold text-[#F59E0B]">
                        ${comparisonProduct.price}
                      </span>
                      <span className="text-xs font-mono-code text-[#FF0055] font-bold">
                        {comparisonProduct.powerLevel} PL
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#2A2938] flex items-center justify-between text-xs font-mono-code">
                  <span className="text-zinc-400">Duration: <strong className="text-white">{comparisonProduct.duration}</strong></span>
                  <button
                    onClick={handleAddChallengerToCart}
                    className="flex items-center gap-1 bg-[#FF0055] text-white font-display text-xs px-2.5 py-1 rounded border border-black shadow-[2px_2px_0px_#000000] hover:bg-[#FF0033]"
                  >
                    <ShoppingBag className="h-3 w-3" />
                    <span>Equip Challenger</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Visual Radar Overlay Matrix & Comparative Breakdown */}
            <div className="rounded-xl border-3 border-black bg-[#161521] p-5 shadow-[6px_6px_0px_#000000]">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#2A2938]">
                <div>
                  <div className="text-xs font-mono-code text-[#F59E0B] uppercase flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>OVERLAY RADAR TELEMETRY // 5 AXES OF COMBAT READINESS</span>
                  </div>
                  <h4 className="font-display text-xl text-white tracking-wide mt-0.5">
                    DIAGNOSTIC STAT COMPARISON & OVERLAY
                  </h4>
                </div>

                {/* Score Tally Indicator */}
                <div className="flex items-center gap-3 text-xs font-mono-code">
                  <div className="bg-[#0B0A10] px-3 py-1.5 rounded-lg border border-black">
                    <span className="text-[#00F0FF] font-bold">{selectedProduct.name.split(' ')[0]}</span> leads: <strong className="text-white">{winsA}</strong>
                  </div>
                  <div className="bg-[#0B0A10] px-3 py-1.5 rounded-lg border border-black">
                    <span className="text-[#FF0055] font-bold">{comparisonProduct.name.split(' ')[0]}</span> leads: <strong className="text-white">{winsB}</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* SVG Dual-Polygon Radar Overlay (Columns 1-5) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative">
                    <svg width="220" height="220" viewBox="0 0 220 220" className="overflow-visible">
                      {/* Outer & inner concentric reference rings */}
                      <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#2A2938" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.75} fill="none" stroke="#2A2938" strokeWidth="1" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.5} fill="none" stroke="#2A2938" strokeWidth="1" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.25} fill="none" stroke="#2A2938" strokeWidth="1" />

                      {/* 5 Axis spokes */}
                      {statKeys.map((s, idx) => {
                        const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                        const x = centerX + radius * Math.cos(angle);
                        const y = centerY + radius * Math.sin(angle);
                        return (
                          <line
                            key={s.key}
                            x1={centerX}
                            y1={centerY}
                            x2={x}
                            y2={y}
                            stroke="#2A2938"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* PRIMARY PRODUCT POLYGON (Cyan #00F0FF) */}
                      <polygon
                        points={polygonPointsA}
                        fill="rgba(0, 240, 255, 0.24)"
                        stroke="#00F0FF"
                        strokeWidth="2.5"
                      />

                      {/* CHALLENGER PRODUCT POLYGON (Magenta #FF0055) */}
                      <polygon
                        points={polygonPointsB}
                        fill="rgba(255, 0, 85, 0.24)"
                        stroke="#FF0055"
                        strokeWidth="2.5"
                      />

                      {/* Primary Vertices (Cyan) */}
                      {statKeys.map((s, idx) => {
                        const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                        const r = (s.valA / 100) * radius;
                        const x = centerX + r * Math.cos(angle);
                        const y = centerY + r * Math.sin(angle);
                        return (
                          <circle
                            key={`a-${s.key}`}
                            cx={x}
                            cy={y}
                            r="4.5"
                            fill="#00F0FF"
                            stroke="#000000"
                            strokeWidth="1.5"
                          />
                        );
                      })}

                      {/* Challenger Vertices (Magenta) */}
                      {statKeys.map((s, idx) => {
                        const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                        const r = (s.valB / 100) * radius;
                        const x = centerX + r * Math.cos(angle);
                        const y = centerY + r * Math.sin(angle);
                        return (
                          <circle
                            key={`b-${s.key}`}
                            cx={x}
                            cy={y}
                            r="4.5"
                            fill="#FF0055"
                            stroke="#000000"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Radar Color Key Legend */}
                  <div className="flex items-center gap-6 mt-4 text-xs font-mono-code">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#00F0FF] border border-black shadow-sm" />
                      <span className="text-[#00F0FF] font-bold truncate max-w-[130px]">{selectedProduct.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#FF0055] border border-black shadow-sm" />
                      <span className="text-[#FF0055] font-bold truncate max-w-[130px]">{comparisonProduct.name}</span>
                    </div>
                  </div>
                </div>

                {/* Comparative Stat Delta Rows (Columns 6-12) */}
                <div className="lg:col-span-7 space-y-3">
                  {statKeys.map((s) => {
                    const delta = s.valA - s.valB;
                    const aWins = delta > 0;
                    const bWins = delta < 0;
                    return (
                      <div
                        key={s.key}
                        className="rounded-lg bg-[#0B0A10] p-3 border border-[#2A2938]"
                      >
                        <div className="flex items-center justify-between text-xs font-mono-code mb-1.5">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span>{s.label}</span>
                            {aWins && (
                              <span className="text-[10px] text-[#00F0FF] bg-[#00F0FF]/15 px-1.5 rounded">
                                +{delta} {selectedProduct.name.split(' ')[0]} ADVANTAGE
                              </span>
                            )}
                            {bWins && (
                              <span className="text-[10px] text-[#FF0055] bg-[#FF0055]/15 px-1.5 rounded">
                                +{Math.abs(delta)} {comparisonProduct.name.split(' ')[0]} ADVANTAGE
                              </span>
                            )}
                            {delta === 0 && (
                              <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 rounded">
                                BALANCED MATCH
                              </span>
                            )}
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="text-[#00F0FF] font-bold">{s.valA}%</span>
                            <span className="text-zinc-600">vs</span>
                            <span className="text-[#FF0055] font-bold">{s.valB}%</span>
                          </div>
                        </div>

                        {/* Dual Comparative Progress Bars */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-2 w-full bg-[#161521] rounded overflow-hidden border border-black">
                            <div
                              className="h-full bg-[#00F0FF] transition-all duration-300"
                              style={{ width: `${s.valA}%` }}
                            />
                          </div>
                          <div className="h-2 w-full bg-[#161521] rounded overflow-hidden border border-black">
                            <div
                              className="h-full bg-[#FF0055] transition-all duration-300"
                              style={{ width: `${s.valB}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Overall Power Level Delta */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-[#00F0FF]/15 via-[#161521] to-[#FF0055]/15 border border-black font-mono-code text-xs">
                    <div>
                      <span className="text-zinc-400">TOTAL ENERGY DELTA:</span>{' '}
                      <strong className="text-white">
                        {selectedProduct.powerLevel} PL vs {comparisonProduct.powerLevel} PL
                      </strong>
                    </div>
                    <div className="font-bold text-[#F59E0B]">
                      {selectedProduct.powerLevel >= comparisonProduct.powerLevel
                        ? `+${selectedProduct.powerLevel - comparisonProduct.powerLevel} PL (Primary Lead)`
                        : `+${comparisonProduct.powerLevel - selectedProduct.powerLevel} PL (Challenger Lead)`}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Back to Single Specimen Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsCompareMode(false)}
                className="px-5 py-2.5 rounded-xl bg-[#161521] text-zinc-300 hover:text-white border-2 border-black shadow-[3px_3px_0px_#000000] font-mono-code text-xs transition-colors"
              >
                ← Return to Single Specimen Detailed Specs
              </button>
            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* ==================== MODE 2: SINGLE SPECIMEN VIEW ======================= */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ================= LEFT: POKEMON FOIL CARD INSPECTOR (Columns 1-5) ================= */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              <div className="text-xs font-mono-code text-zinc-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
                <span>HOLOGRAPHIC FOIL INSPECTOR · MOVE CURSOR TO TILT</span>
              </div>

              {/* 3D Tilted Pokemon Card */}
              <div
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="relative w-full max-w-sm rounded-2xl border-4 border-black bg-[#161521] p-3 shadow-[6px_6px_0px_#000000] cursor-grab transition-transform duration-100 ease-out select-none"
                style={{
                  transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
                  background: 'linear-gradient(145deg, #1f1d2e 0%, #161521 100%)'
                }}
              >
                {/* Foil Card Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-lg text-white tracking-wide">
                      {selectedProduct.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono-code text-xs font-bold text-[#F59E0B]">
                    <span>HP</span>
                    <span className="text-white text-sm">{selectedProduct.powerLevel}</span>
                  </div>
                </div>

                {/* Card Foil Artwork Box */}
                <div className="relative aspect-square w-full rounded-xl border-3 border-black overflow-hidden bg-black mb-3">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  
                  {/* Holographic foil sheen */}
                  <div className="holo-card-overlay absolute inset-0 opacity-40 animate-pulse" />

                  {/* Rarity Stamp */}
                  <div className="absolute top-2 left-2 bg-black/85 px-2 py-0.5 rounded text-[10px] font-mono-code text-[#00F0FF] border border-black">
                    {selectedProduct.rarity}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-black/85 px-2 py-0.5 rounded text-[10px] font-mono-code text-[#F59E0B] border border-black">
                    {selectedProduct.categoryLabel}
                  </div>
                </div>

                {/* Pokemon Style Attack / Ability Moves */}
                <div className="space-y-2 border-t-2 border-black pt-2 text-xs">
                  <div className="bg-[#0B0A10] p-2 rounded border border-black">
                    <div className="flex items-center justify-between font-mono-code text-[11px] text-[#00F0FF] font-bold">
                      <span>ACTION 1: RESONANT SURGE</span>
                      <span className="text-[#F59E0B]">120 DMG</span>
                    </div>
                    <div className="text-[11px] text-zinc-300 mt-0.5">
                      Channels {selectedProduct.powerType} into localized radius.
                    </div>
                  </div>

                  <div className="bg-[#0B0A10] p-2 rounded border border-black">
                    <div className="flex items-center justify-between font-mono-code text-[11px] text-[#FF0055] font-bold">
                      <span>OVERCHARGE ABILITY</span>
                      <span className="text-white">{selectedProduct.stats.power * 2} PL</span>
                    </div>
                    <div className="text-[11px] text-zinc-300 mt-0.5">
                      {selectedProduct.duration}
                    </div>
                  </div>
                </div>

                {/* Card Footer Stamp */}
                <div className="mt-2 pt-2 border-t border-[#2A2938] flex items-center justify-between text-[10px] font-mono-code text-zinc-400">
                  <span>SECTOR 0 // NO. {selectedProduct.id.slice(-4).toUpperCase()}</span>
                  <span>★ 3042 FOIL 1ST ED</span>
                </div>
              </div>

              {/* Quick Equip / Unequip Toggle */}
              <div className="w-full max-w-sm mt-4 space-y-2">
                <button
                  onClick={handleEquip}
                  className={`w-full py-2.5 px-4 rounded-xl border-2 border-black font-display text-sm tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isEquipped
                      ? 'bg-[#10B981] text-black shadow-[3px_3px_0px_#000000]'
                      : 'bg-[#161521] text-white hover:bg-[#8B5CF6] hover:text-black shadow-[3px_3px_0px_#000000]'
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  <span>{isEquipped ? '✓ POWER CURRENTLY EQUIPPED IN DOSSIER' : '⚡ EQUIP TO ACTIVE HERO LOADOUT'}</span>
                </button>

                {/* Compare CTA under Pokemon card */}
                <button
                  onClick={handleToggleCompare}
                  className="w-full py-2 px-4 rounded-xl border border-black bg-[#161521] text-xs font-mono-code text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Swords className="h-3.5 w-3.5" />
                  <span>Compare with rival power in radar matrix →</span>
                </button>
              </div>

            </div>

            {/* ================= RIGHT: SPECIFICATIONS & PURCHASE MODULE (Columns 6-12) ================= */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header info */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code text-[#00F0FF] mb-1">
                  <span>{selectedProduct.categoryLabel}</span>
                  <span>·</span>
                  <span className="text-[#F59E0B]">{selectedProduct.rarity}</span>
                  <span>·</span>
                  <span>{selectedProduct.magicType}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
                  {selectedProduct.name}
                </h2>
                <p className="text-sm font-medium text-zinc-300 mt-1">
                  {selectedProduct.tagline}
                </p>

                {/* Price & Rating Bar */}
                <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-[#2A2938]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono-code text-3xl font-bold text-[#F59E0B]">
                      ${selectedProduct.price}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="font-mono-code text-sm text-zinc-500 line-through">
                        ${selectedProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#161521] px-2.5 py-1 rounded border border-[#2A2938] text-xs font-mono-code text-zinc-300">
                    <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="font-bold">{selectedProduct.rating}</span>
                    <span className="text-zinc-500">({selectedProduct.reviewCount} transmissions)</span>
                  </div>

                  <div className="text-xs font-mono-code text-[#10B981] flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Licensed Gene-X Safe</span>
                  </div>
                </div>
              </div>

              {/* Radar Chart & Stat Breakdown */}
              <div className="rounded-xl border-2 border-black bg-[#161521] p-4 shadow-[3px_3px_0px_#000000]">
                <div className="text-xs font-mono-code text-[#00F0FF] uppercase mb-3 flex items-center justify-between">
                  <span>SUPERPOWER STAT RADAR (SCALE 0 - 100)</span>
                  <button
                    onClick={handleToggleCompare}
                    className="text-[#F59E0B] hover:underline flex items-center gap-1"
                  >
                    <Swords className="h-3 w-3" />
                    <span>Overlay rival power</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* SVG Polygon Radar */}
                  <div className="flex justify-center">
                    <svg width="180" height="180" viewBox="0 0 220 220" className="overflow-visible">
                      {/* Concentric rings */}
                      <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#2A2938" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.65} fill="none" stroke="#2A2938" strokeWidth="1" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.3} fill="none" stroke="#2A2938" strokeWidth="1" />
                      
                      {/* Stat Polygon */}
                      <polygon
                        points={polygonPointsA}
                        fill="rgba(0, 240, 255, 0.25)"
                        stroke="#00F0FF"
                        strokeWidth="2.5"
                      />

                      {/* Stat Points */}
                      {statKeys.map((s, idx) => {
                        const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                        const r = (s.valA / 100) * radius;
                        const x = centerX + r * Math.cos(angle);
                        const y = centerY + r * Math.sin(angle);
                        return (
                          <circle key={s.key} cx={x} cy={y} r="4.5" fill="#F59E0B" stroke="#000000" strokeWidth="1.5" />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Stat Progress Bars */}
                  <div className="space-y-1.5 text-xs font-mono-code">
                    {statKeys.map((s) => (
                      <div key={s.key}>
                        <div className="flex justify-between text-[11px] text-zinc-300">
                          <span>{s.label}</span>
                          <span className="text-[#00F0FF]">{s.valA}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#0B0A10] rounded-full overflow-hidden border border-black">
                          <div
                            className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF0055]"
                            style={{ width: `${s.valA}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Core Specifications Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code">
                <div className="bg-[#161521] p-2.5 rounded border border-[#2A2938]">
                  <div className="text-zinc-500 text-[10px]">POWER TYPE</div>
                  <div className="text-white font-bold truncate">{selectedProduct.powerType}</div>
                </div>
                <div className="bg-[#161521] p-2.5 rounded border border-[#2A2938]">
                  <div className="text-zinc-500 text-[10px]">DURATION</div>
                  <div className="text-white font-bold truncate">{selectedProduct.duration}</div>
                </div>
                <div className="bg-[#161521] p-2.5 rounded border border-[#2A2938]">
                  <div className="text-zinc-500 text-[10px]">MAGIC TYPE</div>
                  <div className="text-white font-bold truncate">{selectedProduct.magicType}</div>
                </div>
                <div className="bg-[#161521] p-2.5 rounded border border-[#2A2938]">
                  <div className="text-zinc-500 text-[10px]">ORIGIN</div>
                  <div className="text-white font-bold truncate">{selectedProduct.originDimension || 'Sector 7'}</div>
                </div>
              </div>

              {/* Description & How it Works */}
              <div className="space-y-3 text-xs text-zinc-300 leading-relaxed border-t border-[#2A2938] pt-4">
                <div>
                  <strong className="text-white font-display text-sm tracking-wide block mb-1">
                    POWER OVERVIEW:
                  </strong>
                  <p>{selectedProduct.description}</p>
                </div>

                <div>
                  <strong className="text-[#00F0FF] font-mono-code text-xs block mb-1">
                    HOW IT WORKS:
                  </strong>
                  <p>{selectedProduct.howItWorks}</p>
                </div>

                <div>
                  <strong className="text-[#F59E0B] font-mono-code text-xs block mb-1">
                    LABORATORY SPECS:
                  </strong>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                    {selectedProduct.powerSpecs.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#161521] p-3 rounded border border-[#2A2938] text-[11px] text-zinc-400 italic">
                  “{selectedProduct.storyLore}”
                </div>
              </div>

              {/* Purchase Module: Variant, Quantity, Add to Cart */}
              <div className="border-t-2 border-black pt-4 space-y-4">
                
                {/* Variant Selector */}
                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-mono-code text-zinc-400 mb-1">
                      SELECT PHYSICAL CALIBRATION / VARIANT:
                    </label>
                    <select
                      value={currentVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="w-full bg-[#161521] border border-black rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                    >
                      {selectedProduct.variants.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Quantity and CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center rounded-lg border-2 border-black bg-[#161521]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm text-zinc-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono-code text-xs font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-sm text-zinc-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  {/* ADD TO BAG */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#00F0FF] py-3.5 px-6 font-display text-base text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#F59E0B] hover:shadow-[6px_6px_0px_#000000] transition-all"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>ADD TO UTILITY BELT</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(selectedProduct.id, e)}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black transition-colors ${
                      isFavorited
                        ? 'bg-[#FF0055] text-white'
                        : 'bg-[#161521] text-zinc-300 hover:text-[#FF0055]'
                    }`}
                    title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Shipping & Return Micro-info */}
                <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-400 pt-2">
                  <span className="flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5 text-[#00F0FF]" />
                    <span>Instant Teleport Dispatch Available</span>
                  </span>
                  <span>30-Day Astral Containment Guarantee</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
