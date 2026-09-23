import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Send, ShieldCheck, Sparkles, Heart, Coffee, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsHelpOpen, triggerSoundEffect } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    triggerSoundEffect('DISPATCH SUBSCRIBED! ✦', undefined, undefined, '#4A90E2');
    setEmail('');
  };

  return (
    <footer className="relative border-t-2 border-[#2F3E46] bg-[#F5F3E8] pt-14 pb-12 halftone-bg text-[#2F3E46]">
      
      {/* Top Gentle Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#4A90E2]/40 border-b border-[#2F3E46]/20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Main Grid: Rounded Comic Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b-2 border-[#2F3E46]/20">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFC800] text-[#2F3E46] border-2 border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]">
                <Zap className="h-6 w-6 fill-current" />
              </div>
              <div>
                <span className="font-stability font-extrabold text-2xl tracking-tight text-[#2F3E46] block leading-none">
                  SUPER POWER LABS
                </span>
                <span className="text-[11px] font-clean text-[#5C676D]">
                  Everyday power, made simple & gentle
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm font-clean text-[#5C676D] max-w-sm leading-relaxed bg-white p-4 rounded-2xl border-2 border-[#2F3E46] shadow-[3px_3px_0px_#2F3E46]">
              Cozy, certified abilities bottled, worn, and summoned with gentle care. Certified soft on the eyes, friendly for everyday life, and safe around house plants.
            </p>

            {/* Newsletter Dispatch */}
            <div className="pt-1">
              <div className="text-xs font-stability font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[#2F3E46]">
                <Heart className="h-3.5 w-3.5 text-[#4A90E2] fill-current" />
                <span>Join the Cozy Dispatch Missive</span>
              </div>
              {isSubscribed ? (
                <div className="text-xs text-[#2F3E46] bg-[#EBF3FC] border-2 border-[#4A90E2] p-3 rounded-xl font-clean shadow-[2px_2px_0px_#4A90E2]">
                  ✓ Dispatch Connected: Welcome to the Super Power Labs neighborhood!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="friend.alias@tea.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white border-2 border-[#2F3E46] rounded-xl px-3 py-2 text-xs text-[#2F3E46] placeholder-[#5C676D]/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#FFC800] text-[#2F3E46] font-stability font-bold px-4 py-2 text-xs rounded-xl border-2 border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] hover:bg-[#4A90E2] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>ENLIST</span>
                    <Send className="h-3 w-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="space-y-3 font-clean">
            <h4 className="font-stability font-bold text-xs uppercase tracking-wider text-[#2F3E46]">
              Apothecary Lines
            </h4>
            <ul className="space-y-2 text-xs text-[#5C676D]">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#4A90E2] hover:underline cursor-pointer">
                  Hand-Sketched Amulets
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#4A90E2] hover:underline cursor-pointer">
                  Warm Reading Spectacles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#4A90E2] hover:underline cursor-pointer">
                  Honeyed Elixir Bottles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#4A90E2] hover:underline cursor-pointer">
                  Pocket Bio-Familiars
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3 font-clean">
            <h4 className="font-stability font-bold text-xs uppercase tracking-wider text-[#2F3E46]">
              Cozy Features
            </h4>
            <ul className="space-y-2 text-xs text-[#5C676D]">
              <li>
                <button onClick={() => setActiveTab('delivery')} className="hover:text-[#4A90E2] hover:underline cursor-pointer flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#FFC800]" />
                  <span>Local Scooter Map</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-[#4A90E2] hover:underline cursor-pointer">
                  Whimsical Aptitude Quiz
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('orders')} className="hover:text-[#4A90E2] hover:underline cursor-pointer">
                  Track Delivery Progress
                </button>
              </li>
              <li>
                <button onClick={() => setIsHelpOpen(true)} className="hover:text-[#4A90E2] hover:underline cursor-pointer">
                  Apothecary FAQ & Oracle
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3 font-clean">
            <h4 className="font-stability font-bold text-xs uppercase tracking-wider text-[#2F3E46]">
              Peace of Mind
            </h4>
            <div className="space-y-2 text-xs text-[#5C676D]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#4A90E2]" />
                <span>Zero radiation guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coffee className="h-4 w-4 text-[#FFC800]" />
                <span>Tea-safe packaging</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#4A90E2]" />
                <span>Approved Comics Code</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-clean text-[#5C676D]">
          <div>
            © 2026 SUPER POWER LABS INC. · All powers certified gentle & easy-on-the-eyes.
          </div>
          <div className="flex items-center gap-3">
            <span>Volume 1, Issue #1</span>
            <span>•</span>
            <span className="font-handwritten text-sm text-[#2F3E46]">&ldquo;Stay cozy, heroes!&rdquo;</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
