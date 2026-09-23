import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HERO_LAB_IMAGE } from '../../data/products';
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Dna, 
  Layers, 
  Compass,
  CheckCircle2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { 
    setActiveTab, 
    setActiveCategory, 
    powerSurge, 
    setPowerSurge, 
    triggerSoundEffect, 
    user 
  } = useApp();

  // Mini-Widget quick state
  const [selectedArchetype, setSelectedArchetype] = useState<'tech' | 'mutant' | 'mystic'>('tech');

  const handleArchetypeSelect = (arch: 'tech' | 'mutant' | 'mystic') => {
    setSelectedArchetype(arch);
    triggerSoundEffect(`${arch.toUpperCase()} ARCHETYPE ENGAGED!`);
  };

  const handleExplorePowers = () => {
    setActiveTab('shop');
    triggerSoundEffect('WARPING TO ARSENAL! ⚡');
  };

  const handleTakeQuiz = () => {
    setActiveTab('quiz');
    triggerSoundEffect('QUIZ INITIALIZED! ★');
  };

  return (
    <section className="relative overflow-hidden border-b border-[#2A2938] bg-[#0B0A10] py-12 lg:py-20">
      
      {/* Background Screentone & Glow reacting to Power Surge */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 manga-screentone"
        style={{ opacity: 0.15 + (powerSurge / 200) }}
      />
      <div 
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[140px] transition-all duration-700"
        style={{ 
          backgroundColor: user.mode === 'villain' ? '#FF0033' : '#00F0FF',
          opacity: 0.08 + (powerSurge / 500) 
        }}
      />
      <div 
        className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full blur-[140px] transition-all duration-700"
        style={{ 
          backgroundColor: user.mode === 'villain' ? '#8B5CF6' : '#FF0055',
          opacity: 0.08 + (powerSurge / 500) 
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Z-Pattern Hero Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#2A2938]/60">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono-code text-xs font-bold tracking-wider text-zinc-300 uppercase">
              SUPER-CELL // POWER LABS · GENE-X DIRECTIVE 3042
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono-code text-zinc-400">
            <span>CORE STATUS:</span>
            <span className="text-[#00F0FF] font-bold">OPTIMAL</span>
            <span className="text-zinc-600">|</span>
            <span>POWER SURGE:</span>
            <span className="text-[#F59E0B] font-bold">{powerSurge}% OVERCLOCK</span>
          </div>
        </div>

        {/* Z-Pattern Core Layout: Left Content, Right Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Headline & Story (Columns 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-3.5 py-1 text-xs text-[#00F0FF] font-mono-code">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
              <span>THE FIRST COMMERCIALLY LICENSED SUPERPOWER EXCHANGE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl text-white tracking-wide leading-none drop-shadow-[3px_3px_0px_#000000]">
              WHAT IF YOU COULD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF0055] to-[#F59E0B]">
                BUY A SUPERPOWER?
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-zinc-300 font-medium leading-relaxed max-w-2xl">
              Everyday magic, bottled, worn, and summoned. From 500,000-volt electro-elixirs to wormhole rings and tachyon foresight visors—claim your latent ability today.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleExplorePowers}
                className="group relative flex items-center gap-2 rounded-lg bg-[#00F0FF] px-7 py-4 font-display text-lg tracking-wider text-black border-2 border-black shadow-[5px_5px_0px_#000000] hover:bg-[#F59E0B] hover:shadow-[7px_7px_0px_#000000] active:translate-y-1 transition-all"
              >
                <span>EXPLORE YOUR POWERS</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleTakeQuiz}
                className="flex items-center gap-2 rounded-lg bg-[#161521] px-6 py-4 font-display text-lg tracking-wider text-white border-2 border-black hover:border-[#F59E0B] shadow-[5px_5px_0px_#000000] hover:text-[#F59E0B] transition-all"
              >
                <Compass className="h-5 w-5 text-[#F59E0B]" />
                <span>DISCOVER YOUR POWER</span>
              </button>
            </div>

            {/* Interactive Break 1: Power Quiz Mini-Widget */}
            <div className="pt-4 border-t border-[#2A2938]">
              <div className="text-xs font-mono-code text-zinc-400 mb-2.5 flex items-center justify-between">
                <span className="text-[#F59E0B] font-bold">INTERACTIVE MINI-WIDGET:</span>
                <span>Select archetype to preview catalog filter</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'tech', label: 'Tech-Enhanced', desc: 'HUDs & Cyborg Relics', icon: Zap },
                  { id: 'mutant', label: 'Mutant & Bio', desc: 'Cellular & Insects', icon: Dna },
                  { id: 'mystic', label: 'Mystic Aether', desc: 'Portals & Elixirs', icon: Sparkles }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedArchetype === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleArchetypeSelect(item.id as any)}
                      className={`p-3 text-left rounded-lg border transition-all ${
                        isSelected 
                          ? 'border-[#00F0FF] bg-[#00F0FF]/15 shadow-[3px_3px_0px_#000000]' 
                          : 'border-[#2A2938] bg-[#161521] hover:border-zinc-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className={`h-4 w-4 ${isSelected ? 'text-[#00F0FF]' : 'text-zinc-400'}`} />
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-[#00F0FF]" />}
                      </div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-zinc-400 leading-tight">
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: 3D Interactive Hero Showcase Visual (Columns 8-12) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border-4 border-black bg-[#161521] overflow-hidden shadow-[8px_8px_0px_#000000,12px_12px_0px_#00F0FF] group">
              
              {/* Generated Laboratory Visual */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={HERO_LAB_IMAGE}
                  alt="Supranova Superpower Laboratory"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Comic Halftone Dot Overlay */}
                <div className="pointer-events-none absolute inset-0 halftone-bg opacity-30" />

                {/* Floating Item Badge 1: Potion */}
                <div className="absolute top-4 left-4 rounded-lg border-2 border-black bg-[#0B0A10]/90 px-3 py-1.5 shadow-[3px_3px_0px_#000000] backdrop-blur-sm animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#8B5CF6] animate-ping" />
                    <span className="font-mono-code text-[11px] font-bold text-[#8B5CF6]">
                      VOLTARIS VIAL // 500kV
                    </span>
                  </div>
                </div>

                {/* Floating Item Badge 2: Eyewear */}
                <div className="absolute bottom-4 right-4 rounded-lg border-2 border-black bg-[#0B0A10]/90 px-3 py-1.5 shadow-[3px_3px_0px_#000000] backdrop-blur-sm animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="flex items-center gap-2">
                    <Eye className="h-3.5 w-3.5 text-[#00F0FF]" />
                    <span className="font-mono-code text-[11px] font-bold text-[#00F0FF]">
                      COGNIVISION HUD // 1000fps
                    </span>
                  </div>
                </div>

                {/* Center Power Surge Pulse Ring */}
                <div 
                  className="pointer-events-none absolute inset-0 border-2 border-[#00F0FF] transition-opacity duration-300"
                  style={{ opacity: powerSurge > 75 ? 0.6 : 0 }}
                />
              </div>

              {/* Showcase Card Details */}
              <div className="p-4 bg-[#161521] border-t-2 border-black">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono-code text-zinc-400">
                      FACTION VAULT 01 · SECTOR 7
                    </div>
                    <div className="font-display text-xl text-white tracking-wider">
                      SUPERNOVA LABS ARCHIVE
                    </div>
                  </div>
                  <button
                    onClick={handleExplorePowers}
                    className="font-display text-xs bg-[#FF0055] hover:bg-[#FF0033] text-white px-3 py-1.5 rounded border border-black shadow-[2px_2px_0px_#000000] transition-colors"
                  >
                    UNLEASH GENE-X →
                  </button>
                </div>

                {/* Power Surge Interactive Slider */}
                <div className="mt-3 pt-3 border-t border-[#2A2938] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-[#00F0FF]" />
                    <span className="text-[11px] font-mono-code text-zinc-300">Power Surge Slider:</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={powerSurge}
                    onChange={(e) => setPowerSurge(Number(e.target.value))}
                    className="flex-1 accent-[#00F0FF] cursor-pointer"
                  />
                  <span className="font-mono-code text-xs text-[#00F0FF] font-bold w-10 text-right">
                    {powerSurge}%
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Comic Halftone Badge */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 bg-[#F59E0B] text-black font-display text-xs px-3 py-1 rounded border-2 border-black shadow-[3px_3px_0px_#000000] rotate-[-4deg]">
              ✦ CERTIFIED GOD-TIER ARTIFACTS
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
