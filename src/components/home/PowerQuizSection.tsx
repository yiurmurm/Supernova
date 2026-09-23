import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../../data/quiz';
import { PRODUCTS } from '../../data/products';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  ShoppingBag,
  Zap,
  ShieldCheck,
  Star
} from 'lucide-react';

export const PowerQuizSection: React.FC = () => {
  const { 
    setSelectedProduct, 
    addToCart, 
    setActiveTab, 
    setActiveCategory, 
    triggerSoundEffect 
  } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [affinityCounts, setAffinityCounts] = useState<Record<string, number>>({
    teleportation: 0,
    time: 0,
    electricity: 0,
    flight: 0,
    stealth: 0
  });

  const handleSelectOption = (affinity: string) => {
    triggerSoundEffect('ENERGY PULSE! ✦');
    const nextAnswers = [...selectedAnswers, affinity];
    setSelectedAnswers(nextAnswers);

    const updatedCounts = {
      ...affinityCounts,
      [affinity]: (affinityCounts[affinity] || 0) + 1
    };
    setAffinityCounts(updatedCounts);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setQuizFinished(true);
      triggerSoundEffect('SUPERPOWER UNLOCKED! ★', undefined, undefined, '#FFD700');
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
    setAffinityCounts({
      teleportation: 0,
      time: 0,
      electricity: 0,
      flight: 0,
      stealth: 0
    });
    triggerSoundEffect('RECALIBRATING!');
  };

  // Determine winning affinity
  const getWinningAffinity = () => {
    let max = -1;
    let winning = 'teleportation';
    for (const [key, count] of Object.entries(affinityCounts)) {
      if (count > max) {
        max = count;
        winning = key;
      }
    }
    return winning;
  };

  const winningKey = getWinningAffinity();
  const result = QUIZ_RESULTS[winningKey] || QUIZ_RESULTS.teleportation;
  const recommendedProducts = PRODUCTS.filter(p => result.recommendedProductIds.includes(p.id));

  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <section id="power-quiz" className="relative border-b border-[#2A2938] bg-[#161521] py-16 sm:py-24 overflow-hidden">
      
      {/* Decorative Halftone Background */}
      <div className="pointer-events-none absolute inset-0 halftone-bg opacity-20" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-3 py-1 text-xs font-mono-code text-[#F59E0B] mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>PERSONALITY & RESONANCE DIAGNOSTIC</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider">
            WHAT&apos;S YOUR SUPERPOWER?
          </h2>
          <p className="text-zinc-400 text-sm mt-2 max-w-lg mx-auto">
            Answer 5 questions. We&apos;ll find your perfect power.
          </p>
        </div>

        {/* QUIZ INTERACTION BOX */}
        <div className="rounded-2xl border-4 border-black bg-[#0B0A10] p-6 sm:p-10 shadow-[8px_8px_0px_#000000,12px_12px_0px_#F59E0B]">
          
          {!quizFinished ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-mono-code text-zinc-400 mb-2">
                  <span>QUESTION {currentStep + 1} OF {QUIZ_QUESTIONS.length}</span>
                  <span className="text-[#F59E0B] font-bold">
                    {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% COMPLETE
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#161521] border border-black overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00F0FF] via-[#FF0055] to-[#F59E0B] transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
                  {currentQ.question}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.powerAffinity)}
                    className="group flex items-start gap-4 rounded-xl border-2 border-black bg-[#161521] p-4 text-left shadow-[4px_4px_0px_#000000] hover:border-[#F59E0B] hover:shadow-[6px_6px_0px_#F59E0B] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B0A10] border border-zinc-700 text-xl group-hover:scale-110 transition-transform">
                      {option.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-[#F59E0B] transition-colors leading-snug">
                        {option.label}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {option.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* QUIZ RESULT STATE */
            <div className="space-y-8 animate-fadeIn">
              
              {/* Power Banner Announcement */}
              <div className="text-center border-b border-[#2A2938] pb-8">
                <div className="inline-block bg-[#F59E0B] text-black font-display text-xs px-3 py-1 rounded border border-black shadow-[2px_2px_0px_#FFFFFF] uppercase tracking-wider mb-3">
                  DIAGNOSTIC CALIBRATION COMPLETE
                </div>
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF0055] to-[#F59E0B] tracking-wider">
                  {result.powerName}
                </h3>
                <div className="text-sm sm:text-base font-mono-code text-[#00F0FF] font-semibold mt-1">
                  Archetype: {result.archetype}
                </div>
                <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
                  {result.description}
                </p>

                {/* Radar Mini Stat Breakdown */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono-code">
                  <span className="bg-[#161521] px-3 py-1 rounded border border-[#2A2938]">
                    SPEED: <strong className="text-[#00F0FF]">{result.stats.speed}/100</strong>
                  </span>
                  <span className="bg-[#161521] px-3 py-1 rounded border border-[#2A2938]">
                    POWER: <strong className="text-[#FF0055]">{result.stats.power}/100</strong>
                  </span>
                  <span className="bg-[#161521] px-3 py-1 rounded border border-[#2A2938]">
                    INTELLIGENCE: <strong className="text-[#F59E0B]">{result.stats.intelligence}/100</strong>
                  </span>
                  <span className="bg-[#161521] px-3 py-1 rounded border border-[#2A2938]">
                    STEALTH: <strong className="text-[#10B981]">{result.stats.stealth}/100</strong>
                  </span>
                </div>
              </div>

              {/* Recommended 3 Products Matching the Power */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#F59E0B] fill-current" />
                    <span>RECOMMENDED ARSENAL FOR YOUR POWER</span>
                  </h4>
                  <button
                    onClick={handleRestart}
                    className="text-xs font-mono-code text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="rounded-xl border-2 border-black bg-[#161521] p-4 shadow-[4px_4px_0px_#000000] flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black mb-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono-code text-[#00F0FF]">
                            {prod.rarity}
                          </div>
                        </div>

                        <div className="text-[10px] font-mono-code text-zinc-400 uppercase">
                          {prod.categoryLabel}
                        </div>
                        <h5 className="font-display text-lg text-white tracking-wide">
                          {prod.name}
                        </h5>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5">
                          {prod.tagline}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#2A2938] flex items-center justify-between">
                        <span className="font-mono-code text-base font-bold text-[#F59E0B]">
                          ${prod.price}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedProduct(prod)}
                            className="text-xs font-mono-code text-zinc-300 hover:text-white px-2 py-1 rounded bg-[#0B0A10] border border-zinc-700"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={(e) => addToCart(prod, 1, undefined, e)}
                            className="flex items-center gap-1 text-xs font-display bg-[#00F0FF] text-black px-2.5 py-1 rounded border border-black hover:bg-[#F59E0B]"
                          >
                            <ShoppingBag className="h-3 w-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Master CTA: SHOP MY POWER */}
              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    setActiveTab('shop');
                    triggerSoundEffect('FILTERING BY YOUR POWER! ✦');
                  }}
                  className="rounded-xl bg-[#F59E0B] px-8 py-4 font-display text-xl text-black border-3 border-black shadow-[6px_6px_0px_#000000] hover:bg-[#00F0FF] hover:shadow-[8px_8px_0px_#000000] transition-all"
                >
                  SHOP MY POWER →
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
