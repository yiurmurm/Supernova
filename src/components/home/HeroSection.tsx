import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  Coffee, 
  Heart, 
  ShieldCheck, 
  CheckCircle2,
  Clock
} from 'lucide-react';

const COZY_HERO_IMAGE = '/src/assets/images/cozy_superhero_tea_1790148108599.jpg';

export const HeroSection: React.FC = () => {
  const { 
    setActiveTab, 
    triggerSoundEffect, 
    selectedCompanion, 
    triggerLoadingScreen 
  } = useApp();

  const handleExplorePowers = () => {
    setActiveTab('shop');
    triggerSoundEffect('PAGE TURNED! ✦', undefined, undefined, '#4A90E2');
  };

  const handleTakeQuiz = () => {
    setActiveTab('quiz');
    triggerSoundEffect('APTITUDE TEST OPENED! ✦', undefined, undefined, '#FFC800');
  };

  return (
    <section className="relative overflow-hidden border-b-2 border-[#2F3E46] bg-[#FDFBF0] py-12 lg:py-16 halftone-bg">
      
      {/* Soft Halftone Paper Texture */}
      <div className="pointer-events-none absolute inset-0 halftone-bg opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Top Storyline Manga Box */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3.5 rounded-2xl border-2 border-[#2F3E46] bg-white shadow-[3px_3px_0px_#2F3E46]">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFC800] text-[#2F3E46] px-2.5 py-0.5 rounded-full text-xs font-stability font-bold border border-[#2F3E46]">
              ISSUE NO. 1
            </span>
            <span className="font-stability text-xs font-bold text-[#2F3E46] uppercase tracking-wide">
              SUPER POWER LABS DISPATCH • EASY-ON-THE-EYES HOME & OFFICE NOVELTIES
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-clean text-[#5C676D]">
            <Heart className="h-3.5 w-3.5 text-[#4A90E2] fill-current" />
            <span>Gentle Magic • Zero Radioactive Spiders Needed</span>
          </div>
        </div>

        {/* Z-Pattern Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Headline & Story Narrative (Columns 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top-Left Logo / Badge: Stability Sans-Serif */}
            <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#2F3E46] bg-[#EBF3FC] px-3.5 py-1.5 shadow-[2px_2px_0px_#2F3E46]">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#4A90E2] text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="font-stability text-xs font-bold uppercase tracking-wider text-[#2F3E46]">
                SUPER POWER LABS // RESEARCH & APOTHECARY
              </span>
            </div>

            {/* Main Headline: Baskerville Font (Evoking COMFORT / RELIABLE) */}
            <h1 className="font-comfort text-4xl sm:text-5xl lg:text-6xl text-[#2F3E46] leading-[1.12] tracking-tight">
              Your Everyday Power, <br />
              <span className="italic text-[#4A90E2] underline decoration-[#FFC800] decoration-wavy decoration-2">
                Made Simple.
              </span>
            </h1>

            {/* Sub-header: Clean Modern Italic */}
            <p className="font-clean italic text-base sm:text-lg text-[#5C676D] leading-relaxed max-w-xl bg-white/80 p-4 rounded-2xl border-2 border-[#2F3E46] shadow-[3px_3px_0px_#2F3E46]">
              Cozy, certified abilities bottled, worn, and summoned with gentle care. Whether you need a warm tea-cup reheat charm or 10 seconds of calm time-dilation, we make extraordinary powers friendly for everyday life.
            </p>

            {/* Whimsical Companion Greeting Bubble */}
            <div className="relative inline-flex items-center gap-3 rounded-2xl border-2 border-[#2F3E46] bg-[#FFF6D6] px-4 py-2.5 shadow-[2px_2px_0px_#2F3E46]">
              <span className="text-2xl animate-mascot-float">
                {selectedCompanion.avatarEmoji}
              </span>
              <div>
                <span className="font-stability text-[10px] font-bold uppercase text-[#4A90E2] block">
                  {selectedCompanion.name} says:
                </span>
                <span className="font-handwritten text-base text-[#2F3E46] leading-none">
                  &ldquo;Take your time browsing! Every vial is sweetened with clover honey.&rdquo;
                </span>
              </div>
            </div>

            {/* Action Buttons: Soft Rounded with Gentle Shadows */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleExplorePowers}
                className="group flex items-center gap-2 rounded-2xl bg-[#FFC800] px-6 py-3.5 font-stability text-base font-bold text-[#2F3E46] border-2 border-[#2F3E46] shadow-[3px_3px_0px_#2F3E46] hover:bg-[#4A90E2] hover:text-white hover:shadow-[5px_5px_0px_#2F3E46] active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>EXPLORE FRIENDLY CATALOG</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleTakeQuiz}
                className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-stability text-base font-bold text-[#2F3E46] border-2 border-[#2F3E46] shadow-[3px_3px_0px_#2F3E46] hover:bg-[#FFF6D6] active:translate-y-0.5 transition-all cursor-pointer"
              >
                <Coffee className="h-4 w-4 text-[#FFC800]" />
                <span>WHIMSICAL APTITUDE QUIZ</span>
              </button>
            </div>

            {/* Friendly Highlights / Comfort Checklist */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-clean text-[#5C676D]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#4A90E2]" />
                <span>Soft-light certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#4A90E2]" />
                <span>Zero radiation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#4A90E2]" />
                <span>Local scooter delivery</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Whimsical Friendly Illustration with Manga Border (Columns 8-12) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              
              {/* Soft decorative shadow offset */}
              <div className="absolute inset-0 rounded-3xl bg-[#FFC800] translate-x-2 translate-y-2 border-2 border-[#2F3E46]" />

              {/* Main Illustration Panel */}
              <div className="relative rounded-3xl border-3 border-[#2F3E46] bg-white overflow-hidden shadow-[4px_4px_0px_#2F3E46]">
                
                {/* Manga Frame Top Badge */}
                <div className="bg-[#F5F3E8] border-b-2 border-[#2F3E46] px-4 py-2 flex items-center justify-between text-xs font-stability font-bold text-[#2F3E46]">
                  <span className="flex items-center gap-1">
                    <Coffee className="h-3.5 w-3.5 text-[#4A90E2]" />
                    <span>COZY APOTHECARY • CHAPTER 1</span>
                  </span>
                  <span className="text-[10px] font-mono-code bg-white px-2 py-0.5 rounded-full border border-[#2F3E46]/30 text-[#4A90E2]">
                    SAFE & GENTLE
                  </span>
                </div>

                {/* Hero Artwork: Caped Hero with Mug of Tea */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6E8]">
                  <img
                    src={COZY_HERO_IMAGE}
                    alt="Whimsical cozy superhero enjoying a mug of tea"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
                  />
                  
                  {/* Subtle soft paper texture overlay */}
                  <div className="pointer-events-none absolute inset-0 halftone-bg opacity-20" />

                  {/* Soft Floating Comic Caption */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border-2 border-[#2F3E46] bg-white/95 p-3 shadow-[2px_2px_0px_#2F3E46] backdrop-blur-xs">
                    <p className="font-handwritten text-base text-[#2F3E46] leading-snug">
                      &ldquo;A warm cup of chamomile tea, a cozy cape, and just enough kinetic levitation to keep the cookies within arm&apos;s reach.&rdquo;
                    </p>
                    <div className="mt-1 flex items-center justify-between text-[10px] font-clean font-bold text-[#4A90E2]">
                      <span>— Super Power Labs Field Report</span>
                      <span>★ Approved</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Panel Strip */}
                <div className="bg-[#EBF3FC] p-3 border-t-2 border-[#2F3E46] flex items-center justify-between text-xs font-clean font-semibold text-[#2F3E46]">
                  <span>✨ 46 Certified Artifacts</span>
                  <span className="font-mono-code text-[11px] text-[#4A90E2]">
                    In-Stock for Immediate Dispatch
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Gentle Pale Blue Moving Speed Lines Divider */}
      <div className="pale-speed-lines mt-14" />

    </section>
  );
};
