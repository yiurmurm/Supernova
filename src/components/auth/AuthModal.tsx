import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HERO_LAB_IMAGE } from '../../data/products';
import { 
  X, 
  Zap, 
  ArrowRight
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
      setFeedback('Secret telegraph cipher beamed to your inbox.');
      triggerSoundEffect('SIGNAL SENT!');
      return;
    }

    // Set user profile
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      heroAlias: heroAlias || prev.heroAlias || 'Kid Comet'
    }));

    triggerSoundEffect('OPERATIVE AUTHENTICATED! ⚡');
    setIsAuthOpen(false);
  };

  const handleGoogleAuth = () => {
    linkGoogleAccount();
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border-4 border-black bg-white shadow-[10px_10px_0px_#000000] my-auto grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Comic Cover Style Artwork */}
        <div className="relative hidden md:flex flex-col justify-between p-8 bg-[#FFE600] border-r-4 border-black overflow-hidden halftone-bg">
          <img
            src={HERO_LAB_IMAGE}
            alt="Supranova Laboratory"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
          />

          {/* Top Brand Banner */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black font-display text-lg border-2 border-black shadow-[2px_2px_0px_#000000]">
                <Zap className="h-5 w-5 fill-current text-[#FF2A2A]" />
              </div>
              <span className="font-display text-2xl tracking-wider text-black">
                SUPRANOVA
              </span>
            </div>
            <span className="bg-white text-black font-mono-code font-black text-[10px] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000000]">
              VOL. 1 #42
            </span>
          </div>

          {/* Center Sound Burst */}
          <div className="relative z-10 my-auto text-center">
            <div className="inline-block bg-[#FF2A2A] text-white font-display text-4xl px-6 py-2 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000000] -rotate-3 uppercase tracking-wider">
              WHAM!
            </div>
          </div>

          {/* Bottom Lore */}
          <div className="relative z-10 space-y-1 bg-white/95 p-4 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000000]">
            <div className="text-[10px] font-mono-code font-black text-[#FF2A2A] uppercase">
              ★ OFFICIAL HERO CLEARANCE ★
            </div>
            <h3 className="font-display text-2xl text-black tracking-wide leading-tight">
              UNLOCK YOUR SECRET POWERS
            </h3>
            <p className="text-xs font-medium text-black/80 leading-relaxed">
              Everyday superpowers bottled, bound, and delivered via quantum courier. Access secret issue catalog items today!
            </p>
          </div>
        </div>

        {/* Right Side: Form Controls */}
        <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
          
          <div>
            {/* Top Close & Mode Title */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-mono-code font-black text-[#FF2A2A] uppercase bg-[#FFE600] px-2 py-0.5 rounded border border-black">
                  CITADEL CLEARANCE PORTAL
                </span>
                <h3 className="font-display text-3xl text-black tracking-wide mt-1.5 leading-none">
                  {mode === 'login' ? 'SIGN IN OPERATIVE' : mode === 'signup' ? 'REGISTER NEW HERO' : 'RECOVER CIPHER KEY'}
                </h3>
              </div>
              <button
                onClick={() => setIsAuthOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-[#FAF6E8] text-black hover:bg-[#FF2A2A] hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Google 1-Click Sync Button */}
            <button
              onClick={handleGoogleAuth}
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-2xl border-3 border-black bg-white px-4 py-3 text-xs font-mono-code font-black text-black shadow-[3px_3px_0px_#000000] hover:bg-[#FFE600] transition-all mb-4 cursor-pointer"
            >
              <span className="font-bold text-base">G</span>
              <span>CONTINUE WITH GOOGLE IDENTITY</span>
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="h-0.5 flex-1 bg-black/20" />
              <span className="text-[10px] font-mono-code font-bold text-black/60 uppercase">OR ENCRYPTED CIPHER</span>
              <div className="h-0.5 flex-1 bg-black/20" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 font-mono-code font-bold">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] text-black mb-1">
                    HERO / OPERATIVE ALIAS
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kid Comet"
                    value={heroAlias}
                    onChange={(e) => setHeroAlias(e.target.value)}
                    className="w-full bg-[#FAF6E8] border-2 border-black rounded-xl px-3 py-2 text-xs text-black"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] text-black mb-1">
                  SECURE COMMS EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="agent@supranova.comic"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF6E8] border-2 border-black rounded-xl px-3 py-2 text-xs text-black"
                />
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] text-black">
                      QUANTUM PASSCODE
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[10px] text-[#FF2A2A] hover:underline"
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
                    className="w-full bg-[#FAF6E8] border-2 border-black rounded-xl px-3 py-2 text-xs text-black"
                  />
                </div>
              )}

              {feedback && (
                <div className="text-xs font-mono-code font-bold text-[#00D06C] bg-green-50 p-2.5 rounded-xl border-2 border-black">
                  {feedback}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#FFE600] py-3.5 text-sm font-display text-black border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FF2A2A] hover:text-white transition-all cursor-pointer"
              >
                <span>{mode === 'login' ? 'ACCESS CITADEL DOSSIER' : mode === 'signup' ? 'CLAIM SUPERPOWER IDENTITY' : 'TRANSMIT RECOVERY BEACON'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Footer Switching & Guest Browsing */}
          <div className="pt-6 border-t-2 border-black mt-6 flex flex-col gap-2 text-center text-xs font-mono-code font-bold">
            {mode === 'login' ? (
              <p className="text-black/80">
                New to the Citadel?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-black text-[#FF2A2A] hover:underline cursor-pointer"
                >
                  Create Hero Account
                </button>
              </p>
            ) : (
              <p className="text-black/80">
                Already registered?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-black text-[#0066FF] hover:underline cursor-pointer"
                >
                  Sign In Operative
                </button>
              </p>
            )}

            <button
              onClick={() => setIsAuthOpen(false)}
              className="text-[11px] text-black/60 hover:text-black transition-colors cursor-pointer"
            >
              ← Continue as Guest Civilian
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
