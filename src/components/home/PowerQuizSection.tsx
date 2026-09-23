import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../../data/quiz';
import { PRODUCTS } from '../../data/products';
import { 
  Sparkles, 
  RotateCcw, 
  ShoppingBag,
  Star,
  CheckCircle2,
  Wand2
} from 'lucide-react';

export const PowerQuizSection: React.FC = () => {
  const { 
    setSelectedProduct, 
    addToCart, 
    setActiveTab, 
    triggerSoundEffect,
    setQuizCardBorderStyle,
    quizCardBorderStyle 
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
    triggerSoundEffect('ENERGY PULSE! ✦', undefined, undefined, '#4A90E2');
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
      // Map affinity to dynamic product border
      if (affinity === 'electricity') {
        setQuizCardBorderStyle('electric');
      } else if (affinity === 'time' || affinity === 'teleportation') {
        setQuizCardBorderStyle('mystic');
      } else {
        setQuizCardBorderStyle('tech');
      }
      triggerSoundEffect('POWER AFFINITY UNLOCKED! ★', undefined, undefined, '#FFC800');
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
    setQuizCardBorderStyle('default');
    setAffinityCounts({
      teleportation: 0,
      time: 0,
      electricity: 0,
      flight: 0,
      stealth: 0
    });
    triggerSoundEffect('RECALIBRATING! ✦', undefined, undefined, '#4A90E2');
  };

  // Determine winning affinity
  const getWinningAffinity = () => {
    let max = -1;
    let winning = 'teleportation';
    for (const [key, count] of Object.entries(affinityCounts)) {
      if (count > max) {
        max = count;
      }
      if (count === max) {
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
    <section id="power-quiz" className="relative border-b-2 border-[#2F3E46] bg-[#FDFBF0] py-16 sm:py-24 overflow-hidden halftone-bg">
      
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#4A90E2]/30 bg-[#EBF3FC] px-4 py-1 text-xs font-stability font-semibold text-[#4A90E2] shadow-[2px_2px_0px_#4A90E2] mb-3 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 fill-current text-[#FFC800]" />
            <span>SUPER POWER LABS · WHIMSICAL APTITUDE EXAM</span>
          </div>
          <h2 className="font-comfort text-4xl sm:text-5xl text-[#2F3E46] tracking-tight leading-tight">
            Which Power Harmonizes with You?
          </h2>
          <p className="text-[#5C676D] font-clean text-sm sm:text-base mt-2 max-w-lg mx-auto bg-white/80 p-3 rounded-2xl border border-[#2F3E46]/30">
            Answer 5 friendly daily scenarios to discover your gentle power archetype and adapt your shop card border style!
          </p>
        </div>

        {/* QUIZ INTERACTION BOX */}
        <div className="rounded-3xl border-3 border-[#2F3E46] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#2F3E46]">
          
          {!quizFinished ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-stability font-bold text-[#2F3E46] mb-2">
                  <span>QUESTION {currentStep + 1} OF {QUIZ_QUESTIONS.length}</span>
                  <span className="bg-[#FFF6D6] px-2.5 py-0.5 rounded-full border border-[#2F3E46] text-[#4A90E2] font-mono-code">
                    {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% COMPLETE
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-[#F5F3E8] border border-[#2F3E46] overflow-hidden">
                  <div
                    className="h-full bg-[#4A90E2] rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h3 className="font-comfort text-2xl sm:text-3xl text-[#2F3E46] leading-tight">
                  {currentQ.question}
                </h3>
                <p className="text-xs sm:text-sm font-clean text-[#5C676D] mt-1.5">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.powerAffinity)}
                    className="group flex items-start gap-4 rounded-2xl border-2 border-[#2F3E46] bg-[#FDFBF0] p-4 text-left shadow-[3px_3px_0px_#2F3E46] hover:bg-[#EBF3FC] hover:border-[#4A90E2] hover:shadow-[0_0_15px_rgba(74,144,226,0.2),4px_4px_0px_#4A90E2] transition-all cursor-pointer"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-[#2F3E46] text-2xl group-hover:scale-105 transition-transform shadow-[2px_2px_0px_#2F3E46]">
                      {option.icon}
                    </div>
                    <div>
                      <div className="text-base font-expressive text-[#2F3E46] group-hover:text-[#4A90E2] transition-colors leading-snug">
                        {option.label}
                      </div>
                      <div className="text-xs text-[#5C676D] font-clean mt-1 leading-relaxed">
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
              <div className="text-center border-b-2 border-[#F5F3E8] pb-8">
                <div className="inline-block bg-[#FFF6D6] text-[#2F3E46] font-stability text-xs px-4 py-1.5 rounded-full border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] uppercase tracking-wider mb-3">
                  ★ OFFICIAL APTITUDE PROFILE DECODED ★
                </div>
                <h3 className="font-comfort text-4xl sm:text-5xl text-[#2F3E46] tracking-tight leading-tight">
                  {result.powerName}
                </h3>
                <div className="text-sm font-clean font-bold text-[#4A90E2] mt-1">
                  RESONANCE ARCHETYPE: {result.archetype}
                </div>
                <p className="text-[#5C676D] font-clean text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed bg-[#FDFBF0] p-4 rounded-2xl border border-[#2F3E46]/30">
                  {result.description}
                </p>

                {/* Dynamic Product Card Border Feedback Notice */}
                <div className="mt-4 inline-flex items-center gap-2 bg-[#EBF3FC] px-4 py-2 rounded-2xl border border-[#4A90E2]/40 text-xs font-stability font-semibold text-[#4A90E2]">
                  <Wand2 className="h-4 w-4" />
                  <span>
                    Dynamic Product Borders Active: <strong>{quizCardBorderStyle.toUpperCase()}</strong> line-work applied to all catalog cards!
                  </span>
                </div>

                {/* Radar Mini Stat Breakdown */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-mono-code font-bold">
                  <span className="bg-[#FDFBF0] px-3 py-1.5 rounded-xl border border-[#2F3E46] shadow-[1px_1px_0px_#2F3E46]">
                    SPEED: <strong className="text-[#4A90E2]">{result.stats.speed}/100</strong>
                  </span>
                  <span className="bg-[#FDFBF0] px-3 py-1.5 rounded-xl border border-[#2F3E46] shadow-[1px_1px_0px_#2F3E46]">
                    HARMONY: <strong className="text-[#FFC800]">{result.stats.power}/100</strong>
                  </span>
                  <span className="bg-[#FDFBF0] px-3 py-1.5 rounded-xl border border-[#2F3E46] shadow-[1px_1px_0px_#2F3E46]">
                    CALM: <strong className="text-[#2F3E46]">{result.stats.intelligence}/100</strong>
                  </span>
                  <span className="bg-[#FDFBF0] px-3 py-1.5 rounded-xl border border-[#2F3E46] shadow-[1px_1px_0px_#2F3E46]">
                    STEALTH: <strong className="text-[#4A90E2]">{result.stats.stealth}/100</strong>
                  </span>
                </div>
              </div>

              {/* Recommended 3 Products Matching the Power */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-comfort text-2xl text-[#2F3E46] tracking-tight flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#FFC800] fill-current" />
                    <span>Recommended Artifacts For Your Profile</span>
                  </h4>
                  <button
                    onClick={handleRestart}
                    className="text-xs font-stability font-bold text-[#2F3E46] hover:text-[#4A90E2] flex items-center gap-1 transition-colors bg-[#FDFBF0] px-3 py-1.5 rounded-xl border border-[#2F3E46] cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="rounded-2xl border-2 border-[#2F3E46] bg-white p-4 shadow-[3px_3px_0px_#2F3E46] flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#FAF6E8] mb-3 border border-[#2F3E46]/30">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-[#FFF6D6] px-2 py-0.5 rounded-full text-[10px] font-stability font-bold text-[#2F3E46] border border-[#2F3E46]">
                            {prod.rarity}
                          </div>
                        </div>

                        <div className="text-[10px] font-stability font-bold text-[#4A90E2] uppercase">
                          {prod.categoryLabel}
                        </div>
                        <h5 className="font-expressive text-xl text-[#2F3E46] leading-snug">
                          {prod.name}
                        </h5>
                        <p className="text-xs text-[#5C676D] font-clean line-clamp-2 mt-0.5">
                          {prod.tagline}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#F5F3E8] flex items-center justify-between">
                        <span className="bg-[#FFF6D6] px-2.5 py-0.5 rounded-full border border-[#2F3E46] font-mono-code text-sm font-bold text-[#2F3E46]">
                          ${prod.price}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => setSelectedProduct(prod)}
                            className="text-xs font-clean font-semibold text-[#5C676D] px-2.5 py-1.5 rounded-lg hover:text-[#2F3E46] cursor-pointer"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={(e) => addToCart(prod, 1, undefined, e)}
                            className="flex items-center gap-1 text-xs font-stability font-bold bg-[#FFC800] text-[#2F3E46] px-3 py-1.5 rounded-xl border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] hover:bg-[#4A90E2] hover:text-white cursor-pointer"
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
                    triggerSoundEffect('EXPLORING CATALOG! ✦', undefined, undefined, '#4A90E2');
                  }}
                  className="rounded-2xl bg-[#FFC800] px-8 py-3.5 font-stability text-base font-bold text-[#2F3E46] border-2 border-[#2F3E46] shadow-[4px_4px_0px_#2F3E46] hover:bg-[#4A90E2] hover:text-white hover:shadow-[5px_5px_0px_#2F3E46] transition-all cursor-pointer"
                >
                  SHOP MY RECOMMENDED ARSENAL →
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
