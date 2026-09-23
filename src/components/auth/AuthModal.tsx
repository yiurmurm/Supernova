import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HERO_LAB_IMAGE } from '../../data/products';
import { 
  X, 
  Zap, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthOpen, 
    setIsAuthOpen, 
    linkGoogleAccount, 
    setUser, 
    triggerSoundEffect 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [heroAlias, setHeroAlias] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setFeedback('Sub-space reset transmission beamed to your inbox.');
      triggerSoundEffect('SIGNAL SENT!');
      return;
    }

    // Set user profile
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      heroAlias: heroAlias || prev.heroAlias || 'Agent Nova-01'
    }));

    triggerSoundEffect('OPERATIVE AUTHENTICATED! ⚡');
    setIsAuthOpen(false);
  };

  const handleGoogleAuth = () => {
    linkGoogleAccount();
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border-4 border-black bg-[#0B0A10] shadow-[10px_10px_0px_#000000,14px_14px_0px_#00F0FF] my-auto grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Artwork & Worldbuilding Lore */}
        <div className="relative hidden md:flex flex-col justify-between p-8 bg-black border-r-2 border-black overflow-hidden">
          <img
            src={HERO_LAB_IMAGE}
            alt="Supranova Laboratory"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Top Brand */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#00F0FF] text-black font-display text-lg border border-black shadow-[2px_2px_0px_#FFFFFF]">
              <Zap className="h-4 w-4" />
            </div>
            <span className="font-display text-xl tracking-wider text-white">
              SUPRANOVA
            </span>
          </div>

          {/* Bottom Quote */}
          <div className="relative z-10 space-y-2">
            <div className="text-[10px] font-mono-code text-[#F59E0B] uppercase">
              OPERATIVE SECURITY CLEARANCE 7
            </div>
            <h3 className="font-display text-2xl text-white tracking-wide">
              UNLEASH YOUR GENE-X POTENTIAL
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Every day magic, bottled, worn, and summoned. Gain access to classified alchemical drops and direct quantum courier teleportation.
            </p>
          </div>
        </div>

        {/* Right Side: Form Controls */}
        <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#161521]">
          
          <div>
            {/* Top Close & Mode Title */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-mono-code text-[#00F0FF] uppercase">
                  CITADEL CLEARANCE PORTAL
                </span>
                <h3 className="font-display text-2xl text-white tracking-wide">
                  {mode === 'login' ? 'SIGN IN OPERATIVE' : mode === 'signup' ? 'REGISTER NEW HERO' : 'RECOVER CIPHER KEY'}
                </h3>
              </div>
              <button
                onClick={() => setIsAuthOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#2A2938] text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Google 1-Click Sync Button */}
            <button
              onClick={handleGoogleAuth}
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2.5 text-xs font-mono-code font-bold text-black shadow-[3px_3px_0px_#000000] hover:bg-zinc-100 transition-all mb-4"
            >
              <span className="font-bold text-base">G</span>
              <span>CONTINUE WITH GOOGLE IDENTITY</span>
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-[#2A2938]" />
              <span className="text-[10px] font-mono-code text-zinc-500">OR ENCRYPTED CREDENTIALS</span>
              <div className="h-px flex-1 bg-[#2A2938]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] font-mono-code text-zinc-400 mb-1">
                    HERO / OPERATIVE ALIAS
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Vanguard"
                    value={heroAlias}
                    onChange={(e) => setHeroAlias(e.target.value)}
                    className="w-full bg-[#0B0A10] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono-code text-zinc-400 mb-1">
                  SECURE COMMS EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="agent@supranova.labs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0A10] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-mono-code text-zinc-400">
                      QUANTUM PASSCODE
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[10px] font-mono-code text-[#00F0FF] hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0B0A10] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              )}

              {feedback && (
                <div className="text-xs font-mono-code text-[#10B981] bg-[#10B981]/10 p-2 rounded border border-[#10B981]/30">
                  {feedback}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00F0FF] py-3 text-xs font-display text-black border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-[#F59E0B] transition-all"
              >
                <span>{mode === 'login' ? 'ACCESS CITADEL DOSSIER' : mode === 'signup' ? 'CLAIM SUPERPOWER IDENTITY' : 'TRANSMIT RECOVERY BEACON'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Footer Switching & Guest Browsing */}
          <div className="pt-6 border-t border-[#2A2938] mt-6 flex flex-col gap-2 text-center text-xs">
            {mode === 'login' ? (
              <p className="text-zinc-400">
                New to Sector 7?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-bold text-[#F59E0B] hover:underline"
                >
                  Create Hero Account
                </button>
              </p>
            ) : (
              <p className="text-zinc-400">
                Already registered?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-bold text-[#00F0FF] hover:underline"
                >
                  Sign In Operative
                </button>
              </p>
            )}

            <button
              onClick={() => setIsAuthOpen(false)}
              className="text-[11px] font-mono-code text-zinc-500 hover:text-white transition-colors"
            >
              ← Continue as Guest Civilian
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
