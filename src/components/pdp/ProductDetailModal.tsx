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
  Sparkles, 
  Star, 
  Truck, 
  Swords,
  ArrowRightLeft,
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
      triggerSoundEffect('CHALLENGER ADDED TO BELT! ⚡', e.clientX, e.clientY, '#FF2A2A');
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
      triggerSoundEffect('POWER ROLES SWAPPED! ✦', undefined, undefined, '#FF2A2A');
    }
  };

  const handleToggleCompare = () => {
    const nextState = !isCompareMode;
    setIsCompareMode(nextState);
    if (nextState) {
      triggerSoundEffect('VERSUS COMPARISON ENGAGED! ⚔️', undefined, undefined, '#FF2A2A');
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

  // Primary product polygon points (Hero Blue #0066FF)
  const polygonPointsA = statKeys.map((s, idx) => {
    const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
    const r = (s.valA / 100) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Challenger product polygon points (Comic Red #FF2A2A)
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto font-sans">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl rounded-3xl border-4 border-black bg-white p-4 sm:p-8 shadow-[10px_10px_0px_#000000] my-auto">
        
        {/* Top Header Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl border-3 border-black font-display text-xl ${
              isCompareMode ? 'bg-[#FF2A2A] text-white shadow-[3px_3px_0px_#000000]' : 'bg-[#FFE600] text-black shadow-[3px_3px_0px_#000000]'
            }`}>
              {isCompareMode ? <Swords className="h-6 w-6" /> : <Zap className="h-6 w-6 fill-current stroke-black stroke-2" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl sm:text-3xl text-black tracking-wide">
                  {isCompareMode ? 'VERSUS PROTOCOL: POWER COMPARISON' : 'GENUINE SUPERPOWER SPEC SHEET'}
                </span>
                <span className="text-[11px] font-mono-code font-bold px-2 py-0.5 rounded border border-black bg-[#FFE600] text-black">
                  {selectedProduct.rarity}
                </span>
              </div>
              <p className="text-[11px] font-mono-code font-bold text-black/70">
                {isCompareMode ? 'SIDE-BY-SIDE RADAR COMBAT BREAKDOWN' : 'AUTHENTIC MAIL-ORDER CATALOGUE DOSSIER'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* POWER COMPARISON TOGGLE BUTTON */}
            <button
              onClick={handleToggleCompare}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-black font-display text-xs tracking-wider transition-all ${
                isCompareMode
                  ? 'bg-[#FF2A2A] text-white shadow-[3px_3px_0px_#000000]'
                  : 'bg-[#FFE600] text-black hover:bg-[#FF2A2A] hover:text-white shadow-[2px_2px_0px_#000000]'
              }`}
              title="Toggle Side-by-Side Power Comparison"
            >
              <Swords className="h-4 w-4" />
              <span>{isCompareMode ? 'EXIT VERSUS' : '⚔️ COMPARE POWER'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#FAF6E8] text-black hover:bg-[#FF2A2A] hover:text-white transition-colors"
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FAF6E8] p-3 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000000]">
              <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-black">
                <span className="bg-[#FF2A2A] text-white px-2 py-0.5 rounded border border-black">CHALLENGER SELECTION:</span>
                <span className="hidden md:inline text-black/70">Pick any rival power to compare stats:</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={comparisonProduct.id}
                  onChange={(e) => {
                    setComparisonProductId(e.target.value);
                    triggerSoundEffect('CHALLENGER SELECTED! ⚡', undefined, undefined, '#FF2A2A');
                  }}
                  className="bg-white border-2 border-black text-black text-xs font-mono-code font-bold px-3 py-1.5 rounded-xl focus:outline-none max-w-[280px] truncate"
                >
                  {PRODUCTS.filter(p => p.id !== selectedProduct.id).map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.categoryLabel.toUpperCase()}] {p.name} ({p.powerLevel} PL - ${p.price})
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleSwapPrimaryWithChallenger}
                  className="flex items-center gap-1 bg-[#FFE600] hover:bg-black hover:text-white text-xs font-mono-code font-bold text-black px-3 py-1.5 rounded-xl border-2 border-black transition-colors"
                  title="Swap primary and challenger roles"
                >
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                  <span>Swap</span>
                </button>
              </div>
            </div>

            {/* Comparison Cards: Product A vs Product B */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              
              {/* Product A Card (Primary - Hero Blue) */}
              <div className="md:col-span-5 rounded-2xl border-3 border-black bg-white p-4 shadow-[4px_4px_0px_#000000] relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-xl border-2 border-black overflow-hidden bg-black">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-[#0066FF] text-white text-[9px] font-mono-code font-bold px-1.5 rounded border border-black">
                      PRIMARY
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono-code font-bold text-[#0066FF] uppercase truncate">
                      {selectedProduct.categoryLabel} · {selectedProduct.powerType}
                    </div>
                    <h3 className="font-display text-2xl text-black tracking-wide truncate">
                      {selectedProduct.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-mono-code text-xl font-black text-black">
                        ${selectedProduct.price}
                      </span>
                      <span className="text-xs font-mono-code text-[#0066FF] font-bold">
                        {selectedProduct.powerLevel} PL
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-mono-code font-bold">
                  <span className="text-black/70">Duration: <strong className="text-black">{selectedProduct.duration}</strong></span>
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-1 bg-[#FFE600] text-black font-display text-xs px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#FF2A2A] hover:text-white"
                  >
                    <ShoppingBag className="h-3 w-3" />
                    <span>Equip Primary</span>
                  </button>
                </div>
              </div>

              {/* Center VS Burst Badge */}
              <div className="md:col-span-1 flex justify-center py-2 md:py-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF2A2A] text-white font-display text-lg border-3 border-black shadow-[3px_3px_0px_#000000] rotate-12">
                  VS
                </div>
              </div>

              {/* Product B Card (Challenger - Comic Red) */}
              <div className="md:col-span-5 rounded-2xl border-3 border-black bg-[#FAF6E8] p-4 shadow-[4px_4px_0px_#000000] relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-xl border-2 border-black overflow-hidden bg-black">
                    <img
                      src={comparisonProduct.image}
                      alt={comparisonProduct.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-[#FF2A2A] text-white text-[9px] font-mono-code font-bold px-1.5 rounded border border-black">
                      RIVAL
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono-code font-bold text-[#FF2A2A] uppercase truncate">
                      {comparisonProduct.categoryLabel} · {comparisonProduct.powerType}
                    </div>
                    <h3 className="font-display text-2xl text-black tracking-wide truncate">
                      {comparisonProduct.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-mono-code text-xl font-black text-black">
                        ${comparisonProduct.price}
                      </span>
                      <span className="text-xs font-mono-code text-[#FF2A2A] font-bold">
                        {comparisonProduct.powerLevel} PL
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-mono-code font-bold">
                  <span className="text-black/70">Duration: <strong className="text-black">{comparisonProduct.duration}</strong></span>
                  <button
                    onClick={handleAddChallengerToCart}
                    className="flex items-center gap-1 bg-[#FF2A2A] text-white font-display text-xs px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-black"
                  >
                    <ShoppingBag className="h-3 w-3" />
                    <span>Equip Rival</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Visual Radar Overlay Matrix & Comparative Breakdown */}
            <div className="rounded-2xl border-3 border-black bg-white p-5 shadow-[5px_5px_0px_#000000]">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-black">
                <div>
                  <div className="text-xs font-mono-code font-bold text-black uppercase flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#FF2A2A]" />
                    <span>OVERLAY RADAR CHART // 5 AXES OF COMBAT READINESS</span>
                  </div>
                  <h4 className="font-display text-2xl text-black tracking-wide mt-0.5">
                    DIAGNOSTIC STAT COMPARISON & OVERLAY
                  </h4>
                </div>

                {/* Score Tally Indicator */}
                <div className="flex items-center gap-3 text-xs font-mono-code font-bold">
                  <div className="bg-[#FAF6E8] px-3 py-1.5 rounded-xl border-2 border-black">
                    <span className="text-[#0066FF] font-bold">{selectedProduct.name.split(' ')[0]}</span> leads: <strong className="text-black">{winsA}</strong>
                  </div>
                  <div className="bg-[#FAF6E8] px-3 py-1.5 rounded-xl border-2 border-black">
                    <span className="text-[#FF2A2A] font-bold">{comparisonProduct.name.split(' ')[0]}</span> leads: <strong className="text-black">{winsB}</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* SVG Dual-Polygon Radar Overlay (Columns 1-5) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative">
                    <svg width="220" height="220" viewBox="0 0 220 220" className="overflow-visible">
                      {/* Outer & inner concentric reference rings */}
                      <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#000000" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.75} fill="none" stroke="#000000" strokeWidth="1" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.5} fill="none" stroke="#000000" strokeWidth="1" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.25} fill="none" stroke="#000000" strokeWidth="1" />

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
                            stroke="#000000"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* PRIMARY PRODUCT POLYGON (Hero Blue #0066FF) */}
                      <polygon
                        points={polygonPointsA}
                        fill="rgba(0, 102, 255, 0.25)"
                        stroke="#0066FF"
                        strokeWidth="3"
                      />

                      {/* CHALLENGER PRODUCT POLYGON (Comic Red #FF2A2A) */}
                      <polygon
                        points={polygonPointsB}
                        fill="rgba(255, 42, 42, 0.25)"
                        stroke="#FF2A2A"
                        strokeWidth="3"
                      />

                      {/* Primary Vertices (Blue) */}
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
                            fill="#0066FF"
                            stroke="#000000"
                            strokeWidth="1.5"
                          />
                        );
                      })}

                      {/* Challenger Vertices (Red) */}
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
                            fill="#FF2A2A"
                            stroke="#000000"
                            strokeWidth="1.5"
                          />
                        );
                      })}

                      {/* Labels on perimeter */}
                      {statKeys.map((s, idx) => {
                        const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                        const labelRadius = radius + 22;
                        const x = centerX + labelRadius * Math.cos(angle);
                        const y = centerY + labelRadius * Math.sin(angle);
                        return (
                          <text
                            key={`label-${s.key}`}
                            x={x}
                            y={y + 4}
                            textAnchor="middle"
                            className="font-mono-code text-[10px] font-black fill-black"
                          >
                            {s.label}
                          </text>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Legend Indicator */}
                  <div className="mt-4 flex items-center gap-4 text-xs font-mono-code font-bold">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#0066FF] border border-black shadow-sm" />
                      <span className="text-[#0066FF] truncate max-w-[130px]">{selectedProduct.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#FF2A2A] border border-black shadow-sm" />
                      <span className="text-[#FF2A2A] truncate max-w-[130px]">{comparisonProduct.name}</span>
                    </div>
                  </div>
                </div>

                {/* Comparative Stat Delta Rows (Columns 6-12) */}
                <div className="lg:col-span-7 space-y-3 font-mono-code font-bold">
                  {statKeys.map((s) => {
                    const delta = s.valA - s.valB;
                    const aWins = delta > 0;
                    const bWins = delta < 0;
                    return (
                      <div
                        key={s.key}
                        className="rounded-xl bg-[#FAF6E8] p-3 border-2 border-black"
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-black flex items-center gap-1.5">
                            <span>{s.label}</span>
                            {aWins && (
                              <span className="text-[10px] text-white bg-[#0066FF] px-1.5 py-0.5 rounded border border-black">
                                +{delta} {selectedProduct.name.split(' ')[0]} LEAD
                              </span>
                            )}
                            {bWins && (
                              <span className="text-[10px] text-white bg-[#FF2A2A] px-1.5 py-0.5 rounded border border-black">
                                +{Math.abs(delta)} {comparisonProduct.name.split(' ')[0]} LEAD
                              </span>
                            )}
                            {delta === 0 && (
                              <span className="text-[10px] text-black bg-[#FFE600] px-1.5 py-0.5 rounded border border-black">
                                TIED STATS
                              </span>
                            )}
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="text-[#0066FF] font-bold">{s.valA}%</span>
                            <span className="text-black/50">vs</span>
                            <span className="text-[#FF2A2A] font-bold">{s.valB}%</span>
                          </div>
                        </div>

                        {/* Dual Comparative Progress Bars */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-black">
                            <div
                              className="h-full bg-[#0066FF] transition-all duration-300"
                              style={{ width: `${s.valA}%` }}
                            />
                          </div>
                          <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-black">
                            <div
                              className="h-full bg-[#FF2A2A] transition-all duration-300"
                              style={{ width: `${s.valB}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Overall Power Level Delta */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFE600] border-2 border-black text-xs">
                    <div>
                      <span className="text-black/80">OVERALL POWER OUTPUT:</span>{' '}
                      <strong className="text-black">
                        {selectedProduct.powerLevel} PL vs {comparisonProduct.powerLevel} PL
                      </strong>
                    </div>
                    <div className="font-black text-[#FF2A2A]">
                      {selectedProduct.powerLevel >= comparisonProduct.powerLevel
                        ? `+${selectedProduct.powerLevel - comparisonProduct.powerLevel} PL (Primary Lead)`
                        : `+${comparisonProduct.powerLevel - selectedProduct.powerLevel} PL (Rival Lead)`}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Back to Single Specimen Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsCompareMode(false)}
                className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000000] font-mono-code font-bold text-xs transition-colors"
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
              
              <div className="text-xs font-mono-code font-bold text-black mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#FF2A2A]" />
                <span>OFFICIAL TRADING CARD · MOVE CURSOR TO TILT FOIL</span>
              </div>

              {/* 3D Tilted Pokemon Card */}
              <div
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="relative w-full max-w-sm rounded-2xl border-4 border-black bg-white p-3 shadow-[6px_6px_0px_#000000] cursor-grab transition-transform duration-100 ease-out select-none"
                style={{
                  transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`
                }}
              >
                {/* Foil Card Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2 bg-[#FAF6E8] p-2 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-xl text-black tracking-wide">
                      {selectedProduct.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono-code text-xs font-bold text-black">
                    <span>HP</span>
                    <span className="bg-[#FFE600] px-1.5 py-0.2 rounded border border-black text-[#FF2A2A] font-black">{selectedProduct.powerLevel}</span>
                  </div>
                </div>

                {/* Card Artwork Box */}
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
                  <div className="absolute top-2 left-2 bg-[#FFE600] px-2 py-0.5 rounded text-[10px] font-mono-code font-bold text-black border border-black">
                    {selectedProduct.rarity}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-white px-2 py-0.5 rounded text-[10px] font-mono-code font-bold text-black border border-black">
                    {selectedProduct.categoryLabel}
                  </div>
                </div>

                {/* Comic / Manga Style Attack / Ability Moves */}
                <div className="space-y-2 border-t-2 border-black pt-2 text-xs">
                  <div className="bg-[#FAF6E8] p-2 rounded-lg border-2 border-black">
                    <div className="flex items-center justify-between font-mono-code text-[11px] text-black font-bold">
                      <span>★ MOVE 1: RESONANT SURGE</span>
                      <span className="bg-[#FFE600] px-1.5 rounded border border-black text-[#FF2A2A]">120 DMG</span>
                    </div>
                    <div className="text-[11px] text-black/80 mt-0.5 font-medium">
                      Channels {selectedProduct.powerType} into localized radius.
                    </div>
                  </div>

                  <div className="bg-[#FAF6E8] p-2 rounded-lg border-2 border-black">
                    <div className="flex items-center justify-between font-mono-code text-[11px] text-black font-bold">
                      <span>⚡ OVERCHARGE SPECIAL</span>
                      <span className="text-[#FF2A2A]">{selectedProduct.stats.power * 2} PL</span>
                    </div>
                    <div className="text-[11px] text-black/80 mt-0.5 font-medium">
                      {selectedProduct.duration}
                    </div>
                  </div>
                </div>

                {/* Card Footer Stamp */}
                <div className="mt-2 pt-2 border-t border-black/40 flex items-center justify-between text-[10px] font-mono-code font-bold text-black/70">
                  <span>ISSUE NO. {selectedProduct.id.slice(-4).toUpperCase()}</span>
                  <span>★ OFFICIAL COMIC FOIL 1ST ED</span>
                </div>
              </div>

              {/* Quick Equip / Unequip Toggle */}
              <div className="w-full max-w-sm mt-4 space-y-2">
                <button
                  onClick={handleEquip}
                  className={`w-full py-2.5 px-4 rounded-xl border-2 border-black font-display text-sm tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isEquipped
                      ? 'bg-[#00D06C] text-black shadow-[3px_3px_0px_#000000]'
                      : 'bg-[#FFE600] text-black hover:bg-[#FF2A2A] hover:text-white shadow-[3px_3px_0px_#000000]'
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  <span>{isEquipped ? '✓ POWER CURRENTLY EQUIPPED ON BELT' : '⚡ EQUIP TO HERO LOADOUT'}</span>
                </button>

                {/* Compare CTA under Pokemon card */}
                <button
                  onClick={handleToggleCompare}
                  className="w-full py-2 px-4 rounded-xl border-2 border-black bg-white text-xs font-mono-code font-bold text-black hover:bg-[#FFE600] flex items-center justify-center gap-1.5 transition-colors shadow-[2px_2px_0px_#000000]"
                >
                  <Swords className="h-3.5 w-3.5 text-[#FF2A2A]" />
                  <span>Compare with rival power in radar matrix →</span>
                </button>
              </div>

            </div>

            {/* ================= RIGHT: SPECIFICATIONS & PURCHASE MODULE (Columns 6-12) ================= */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header info */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-black mb-1">
                  <span className="uppercase text-[#FF2A2A]">{selectedProduct.categoryLabel}</span>
                  <span>·</span>
                  <span className="bg-[#FFE600] px-1.5 rounded border border-black text-[10px]">{selectedProduct.rarity}</span>
                  <span>·</span>
                  <span>{selectedProduct.magicType}</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl text-black tracking-wide leading-tight">
                  {selectedProduct.name}
                </h2>
                <p className="text-sm font-bold text-black/80 mt-1 bg-[#FFF7B2] p-2 rounded-lg border border-black font-mono-code">
                  &ldquo;{selectedProduct.tagline}&rdquo;
                </p>

                {/* Price & Rating Bar */}
                <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t-2 border-black">
                  <div className="flex items-baseline gap-2">
                    <span className="bg-[#FFE600] px-3 py-1 rounded-xl border-2 border-black font-mono-code text-3xl font-black text-black shadow-[3px_3px_0px_#000000]">
                      ${selectedProduct.price}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="font-mono-code text-base text-black/50 line-through">
                        ${selectedProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#FAF6E8] px-3 py-1.5 rounded-xl border-2 border-black text-xs font-mono-code font-bold text-black">
                    <Star className="h-4 w-4 fill-[#FFE600] text-black" />
                    <span>{selectedProduct.rating} / 5.0</span>
                    <span className="text-black/60">({selectedProduct.reviewCount} hero reviews)</span>
                  </div>

                  <div className="text-xs font-mono-code font-bold text-[#0066FF] flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-black">
                    <ShieldCheck className="h-4 w-4" />
                    <span>100% Genuine Superpower</span>
                  </div>
                </div>
              </div>

              {/* Radar Chart & Stat Breakdown */}
              <div className="rounded-2xl border-3 border-black bg-[#FAF6E8] p-4 shadow-[4px_4px_0px_#000000]">
                <div className="text-xs font-mono-code font-bold text-black uppercase mb-3 flex items-center justify-between border-b-2 border-black pb-2">
                  <span>SUPERPOWER BATTLE STATS (SCALE 0 - 100)</span>
                  <button
                    onClick={handleToggleCompare}
                    className="text-[#FF2A2A] hover:underline flex items-center gap-1 font-bold"
                  >
                    <Swords className="h-3.5 w-3.5" />
                    <span>Compare with rival</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* SVG Polygon Radar */}
                  <div className="flex justify-center">
                    <svg width="180" height="180" viewBox="0 0 220 220" className="overflow-visible">
                      {/* Concentric rings */}
                      <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#000000" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.65} fill="none" stroke="#000000" strokeWidth="1" />
                      <circle cx={centerX} cy={centerY} r={radius * 0.3} fill="none" stroke="#000000" strokeWidth="1" />
                      
                      {/* Stat Polygon */}
                      <polygon
                        points={polygonPointsA}
                        fill="rgba(0, 102, 255, 0.25)"
                        stroke="#0066FF"
                        strokeWidth="3"
                      />

                      {/* Stat Points */}
                      {statKeys.map((s, idx) => {
                        const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                        const r = (s.valA / 100) * radius;
                        const x = centerX + r * Math.cos(angle);
                        const y = centerY + r * Math.sin(angle);
                        return (
                          <circle key={s.key} cx={x} cy={y} r="5" fill="#FFE600" stroke="#000000" strokeWidth="2" />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Stat Progress Bars */}
                  <div className="space-y-2 text-xs font-mono-code font-bold">
                    {statKeys.map((s) => (
                      <div key={s.key}>
                        <div className="flex justify-between text-[11px] text-black mb-0.5">
                          <span>{s.label}</span>
                          <span className="text-[#0066FF]">{s.valA}%</span>
                        </div>
                        <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-black">
                          <div
                            className="h-full bg-[#FFE600] border-r border-black"
                            style={{ width: `${s.valA}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Core Specifications Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code font-bold">
                <div className="bg-white p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]">
                  <div className="text-black/60 text-[10px]">POWER TYPE</div>
                  <div className="text-black truncate">{selectedProduct.powerType}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]">
                  <div className="text-black/60 text-[10px]">DURATION</div>
                  <div className="text-black truncate">{selectedProduct.duration}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]">
                  <div className="text-black/60 text-[10px]">MAGIC TYPE</div>
                  <div className="text-black truncate">{selectedProduct.magicType}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]">
                  <div className="text-black/60 text-[10px]">LAB ORIGIN</div>
                  <div className="text-black truncate">{selectedProduct.originDimension || 'Sector 7'}</div>
                </div>
              </div>

              {/* Description & How it Works */}
              <div className="space-y-3 text-xs text-black/90 font-medium leading-relaxed border-t-2 border-black pt-4">
                <div>
                  <strong className="text-black font-display text-base tracking-wide block mb-1">
                    WHAT THIS POWER DOES:
                  </strong>
                  <p>{selectedProduct.description}</p>
                </div>

                <div>
                  <strong className="text-[#FF2A2A] font-mono-code font-bold text-xs block mb-1">
                    HOW TO USE IT:
                  </strong>
                  <p>{selectedProduct.howItWorks}</p>
                </div>

                <div>
                  <strong className="text-black font-mono-code font-bold text-xs block mb-1">
                    LABORATORY FORMULA SPECS:
                  </strong>
                  <ul className="list-disc pl-4 space-y-1 text-black/80 font-mono-code">
                    {selectedProduct.powerSpecs.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Purchase Module: Variant, Quantity, Add to Cart */}
              <div className="border-t-3 border-black pt-4 space-y-4">
                
                {/* Variant Selector */}
                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-mono-code font-bold text-black mb-1">
                      CHOOSE MODEL / EDITIONS:
                    </label>
                    <select
                      value={currentVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="w-full bg-[#FAF6E8] border-2 border-black rounded-xl px-3 py-2 text-xs font-mono-code font-bold text-black focus:outline-none"
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
                  <div className="flex items-center rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-base font-bold text-black hover:bg-[#FAF6E8]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono-code text-sm font-bold text-black">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-base font-bold text-black hover:bg-[#FAF6E8]"
                    >
                      +
                    </button>
                  </div>

                  {/* ADD TO BAG */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#FFE600] py-3.5 px-6 font-display text-lg text-black border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FF2A2A] hover:text-white hover:shadow-[6px_6px_0px_#000000] transition-all"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>ADD TO UTILITY BELT</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(selectedProduct.id, e)}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black transition-colors ${
                      isFavorited
                        ? 'bg-[#FF2A2A] text-white shadow-sm'
                        : 'bg-white text-black hover:bg-[#FFE600]'
                    }`}
                    title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Shipping & Return Micro-info */}
                <div className="flex items-center justify-between text-[11px] font-mono-code font-bold text-black/70 pt-2 border-t border-black/20">
                  <span className="flex items-center gap-1">
                    <Truck className="h-4 w-4 text-[#FF2A2A]" />
                    <span>Speedy Teleport or Supersonic Mail Dispatch</span>
                  </span>
                  <span>100% Comic Money-Back Guarantee</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
