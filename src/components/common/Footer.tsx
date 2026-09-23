import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Send, ShieldCheck, Sparkles, Instagram, Music2, Bookmark } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsHelpOpen, triggerSoundEffect } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    triggerSoundEffect('DISPATCH SUBSCRIBED! 🚀');
    setEmail('');
  };

  return (
    <footer className="relative border-t-4 border-black bg-[#0B0A10] pt-16 pb-12 halftone-bg text-zinc-300">
      
      {/* Comic Halftone Accent Header Strip */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00F0FF] via-[#FF0055] to-[#F59E0B]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Main Grid: Z-Pattern Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2A2938]">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-[#00F0FF] text-black font-display text-xl border-2 border-black shadow-[2px_2px_0px_#FFFFFF]">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <span className="font-display text-2xl tracking-wider text-white">
                SUPRANOVA
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              SUPER POWERS IN REAL LIFE.<br />
              <span className="text-[#00F0FF] font-medium">“Everyday magic, bottled, worn, and summoned.”</span><br />
              Synthesizing classified gear, metaphysical elixirs, and reality-warping eyewear since Year 3042.
            </p>

            {/* Newsletter Dispatch */}
            <div className="pt-2">
              <div className="text-xs font-mono-code text-[#F59E0B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
                Join The Nova Corps Dispatch
              </div>
              {isSubscribed ? (
                <div className="text-xs font-mono-code text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 p-2 rounded">
                  ✓ Transceiver Linked: Welcome to the Vanguard, Operative.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="agent.secret@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-[#161521] border border-[#2A2938] rounded-md px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00F0FF]"
                  />
                  <button
                    type="submit"
                    className="bg-[#00F0FF] text-black font-display px-4 py-2 text-sm rounded-md border-2 border-black hover:bg-[#F59E0B] transition-colors flex items-center gap-1"
                  >
                    <span>ENLIST</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-white mb-4">
              ARSENAL
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#00F0FF] transition-colors">
                  Shop All Powers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bestsellers')} className="hover:text-[#00F0FF] transition-colors">
                  Bestseller Artifacts
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('new-arrivals')} className="hover:text-[#00F0FF] transition-colors">
                  New Arrival Serums
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="text-[#F59E0B] hover:underline font-semibold flex items-center gap-1">
                  <span>★ Power Quiz</span>
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Gift Cards (Available in Dossier)</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Tactical Support */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-white mb-4">
              SANCTUARY
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setIsHelpOpen(true)} className="hover:text-[#00F0FF] transition-colors">
                  Help Center & Oracle
                </button>
              </li>
              <li>
                <button onClick={() => setIsHelpOpen(true)} className="hover:text-[#00F0FF] transition-colors">
                  Track Teleport Dispatch
                </button>
              </li>
              <li>
                <button onClick={() => setIsHelpOpen(true)} className="hover:text-[#00F0FF] transition-colors">
                  Returns & Unbinding Ritual
                </button>
              </li>
              <li>
                <button onClick={() => setIsHelpOpen(true)} className="hover:text-[#00F0FF] transition-colors">
                  Dimensional Shipping Rates
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Subterranean Delivery Protocol</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Comms */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-white mb-4">
              COMM CHANNELS
            </h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); triggerSoundEffect('POP!'); }}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#2A2938] bg-[#161521] hover:text-[#00F0FF] hover:border-[#00F0FF] transition-colors"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#tiktok"
                onClick={(e) => { e.preventDefault(); triggerSoundEffect('POP!'); }}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#2A2938] bg-[#161521] hover:text-[#FF0055] hover:border-[#FF0055] transition-colors"
                title="TikTok"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href="#pinterest"
                onClick={(e) => { e.preventDefault(); triggerSoundEffect('POP!'); }}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#2A2938] bg-[#161521] hover:text-[#F59E0B] hover:border-[#F59E0B] transition-colors"
                title="Pinterest"
              >
                <Bookmark className="h-4 w-4" />
              </a>
            </div>
            <div className="text-[11px] font-mono-code text-zinc-400">
              CITADEL HQ: Sector 7, Vault 42<br />
              SECURE FREQUENCY: 144.82 MHz
            </div>
          </div>
        </div>

        {/* Bottom Safety Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="h-4 w-4 text-[#00F0FF]" />
            <span>
              <strong>FICTIONAL ENTERTAINMENT DISCLAIMER:</strong> For superhero/villain roleplay & creative storytelling use only. All potions, sprays, and superpowers are fictional artifacts.
            </span>
          </div>
          <div className="font-mono-code text-[11px] text-zinc-500 text-center md:text-right">
            © 3042 SUPRANOVA INC. ALL DIMENSIONAL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
