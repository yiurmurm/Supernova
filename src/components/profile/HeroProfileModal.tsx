import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { 
  X, 
  User, 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Flame, 
  Gift, 
  LogOut, 
  Plus, 
  Trash2,
  Lock,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const HeroProfileModal: React.FC = () => {
  const { 
    user, 
    setUser, 
    linkGoogleAccount, 
    toggleHeroVillainMode, 
    unequipPower, 
    updateSecretHideout, 
    isProfileOpen, 
    setIsProfileOpen, 
    setActiveTab,
    triggerSoundEffect 
  } = useApp();

  const [activeTab, setActiveProfileTab] = useState<'dossier' | 'equipped' | 'hideout' | 'giftcard'>('dossier');
  
  // Edit profile states
  const [alias, setAlias] = useState(user.heroAlias);
  const [secretId, setSecretId] = useState(user.secretIdentity);
  const [newHideoutAddress, setNewHideoutAddress] = useState('');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [giftFeedback, setGiftFeedback] = useState<string | null>(null);

  if (!isProfileOpen) return null;

  const equippedProducts = PRODUCTS.filter(p => user.equippedPowers.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      heroAlias: alias,
      secretIdentity: secretId
    }));
    triggerSoundEffect('DOSSIER ENCRYPTED & SAVED!');
  };

  const handleAddHideout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHideoutAddress) return;
    updateSecretHideout(newHideoutAddress, 37.7749, -122.4194);
    setNewHideoutAddress('');
    triggerSoundEffect('NEW SECURE BASE REGISTERED!');
  };

  const handleRedeemGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftCardCode) return;
    setUser(prev => ({
      ...prev,
      giftCardBalance: prev.giftCardBalance + 100
    }));
    setGiftFeedback('+$100 Mana Balance credited to your account!');
    setGiftCardCode('');
    triggerSoundEffect('MANA GIFT APPLIED! ★');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      
      <div className="relative w-full max-w-3xl rounded-2xl border-4 border-black bg-[#0B0A10] p-6 sm:p-8 shadow-[10px_10px_0px_#000000,14px_14px_0px_#00F0FF] my-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-xl border-2 border-black bg-[#161521] overflow-hidden shadow-[2px_2px_0px_#000000]">
              <img
                src={user.avatar}
                alt={user.heroAlias}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl text-white tracking-wide">
                  {user.heroAlias}
                </h3>
                <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded border border-black ${
                  user.mode === 'villain' ? 'bg-[#FF0033] text-white' : 'bg-[#00F0FF] text-black'
                }`}>
                  {user.mode.toUpperCase()} MODE
                </span>
              </div>
              <p className="text-xs font-mono-code text-zinc-400">
                POWER LEVEL SCORE: <strong className="text-[#F59E0B]">{user.powerLevelScore} PL</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded border border-[#2A2938] text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center gap-2 border-b border-[#2A2938] pb-3 mb-6 overflow-x-auto text-xs font-display">
          {[
            { id: 'dossier', label: 'HERO IDENTITY' },
            { id: 'equipped', label: `EQUIPPED ARSENAL (${user.equippedPowers.length})` },
            { id: 'hideout', label: 'SECRET BASES' },
            { id: 'giftcard', label: `MANA BALANCE ($${user.giftCardBalance})` }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveProfileTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg border-2 border-black whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-[#00F0FF] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-[#161521] text-zinc-300 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Hero Identity */}
        {activeTab === 'dossier' && (
          <div className="space-y-6">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-code text-zinc-400 mb-1">
                    HERO / OPERATIVE ALIAS
                  </label>
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className="w-full bg-[#161521] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-code text-zinc-400 mb-1">
                    CIVILIAN SECRET IDENTITY
                  </label>
                  <input
                    type="text"
                    value={secretId}
                    onChange={(e) => setSecretId(e.target.value)}
                    className="w-full bg-[#161521] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-zinc-400 mb-1">
                  SECURE COMMS EMAIL
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full bg-[#161521]/50 border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-zinc-500 cursor-not-allowed"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={toggleHeroVillainMode}
                  className="flex items-center gap-1.5 text-xs font-mono-code px-3 py-2 rounded border border-black bg-[#161521] hover:text-[#FF0055]"
                >
                  <Flame className="h-4 w-4 text-[#FF0055]" />
                  <span>Switch Alignment ({user.mode === 'hero' ? 'Become Villain' : 'Redeem to Hero'})</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#00F0FF] text-black font-display text-xs border border-black shadow-[2px_2px_0px_#000000]"
                >
                  UPDATE DOSSIER
                </button>
              </div>
            </form>

            {/* Google Authentication Status */}
            <div className="rounded-xl border border-[#2A2938] bg-[#161521] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-black font-bold">
                  G
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Google Identity Authentication</div>
                  <div className="text-[10px] font-mono-code text-zinc-400">
                    {user.isGoogleLinked ? 'Linked and Verified ✓' : 'Not linked'}
                  </div>
                </div>
              </div>

              {!user.isGoogleLinked ? (
                <button
                  onClick={linkGoogleAccount}
                  className="px-3 py-1.5 rounded bg-white text-black text-xs font-mono-code font-bold hover:bg-zinc-200"
                >
                  Link Google
                </button>
              ) : (
                <span className="text-xs font-mono-code text-[#10B981] flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>SYNCHRONIZED</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Equipped Powers */}
        {activeTab === 'equipped' && (
          <div className="space-y-4">
            <div className="text-xs font-mono-code text-zinc-400">
              Active abilities currently synchronized with your Gene-X bio-implant:
            </div>

            {equippedProducts.length === 0 ? (
              <div className="py-8 text-center text-zinc-500 text-xs">
                No powers equipped. Click &quot;Equip&quot; on any product inspector card to slot an ability.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {equippedProducts.map(p => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-black bg-[#161521] shadow-[2px_2px_0px_#000000]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded overflow-hidden bg-black border border-black">
                        <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-display text-sm text-white">{p.name}</div>
                        <div className="text-[10px] font-mono-code text-[#00F0FF]">{p.powerLevel} PL · {p.powerType}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => unequipPower(p.id)}
                      className="text-zinc-500 hover:text-[#FF0055] text-xs font-mono-code"
                      title="Unequip power"
                    >
                      Unequip
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Secret Bases */}
        {activeTab === 'hideout' && (
          <div className="space-y-4">
            <div className="space-y-2">
              {user.savedAddresses.map(addr => (
                <div
                  key={addr.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-black bg-[#161521]"
                >
                  <div>
                    <div className="font-bold text-xs text-white flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-[#F59E0B]" />
                      <span>{addr.name}</span>
                      {addr.isSecretHideout && (
                        <span className="text-[9px] font-mono-code bg-[#FF0055]/20 text-[#FF0055] px-1 rounded">
                          SECRET
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono-code text-zinc-400 mt-0.5">{addr.address}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddHideout} className="pt-2 border-t border-[#2A2938] space-y-2">
              <label className="block text-xs font-mono-code text-[#00F0FF]">
                REGISTER NEW BASE / SANCTUARY COORDINATES:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. Sub-Level 9, Orbital Spire Alpha, Neo-Tokyo"
                  value={newHideoutAddress}
                  onChange={(e) => setNewHideoutAddress(e.target.value)}
                  className="flex-1 bg-[#161521] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white"
                />
                <button
                  type="submit"
                  className="bg-[#F59E0B] text-black font-display text-xs px-4 py-2 rounded-lg border border-black"
                >
                  SAVE BASE
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 4: Mana Gift Balance */}
        {activeTab === 'giftcard' && (
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-black bg-[#161521] p-5 text-center shadow-[4px_4px_0px_#000000]">
              <div className="text-xs font-mono-code text-zinc-400 uppercase">AVAILABLE MANA CREDIT</div>
              <div className="font-mono-code text-4xl font-bold text-[#F59E0B] mt-1">
                ${user.giftCardBalance}.00
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Usable across all teleport orders and alchemical replenishment vials.
              </p>
            </div>

            <form onSubmit={handleRedeemGift} className="space-y-2 pt-2">
              <label className="block text-xs font-mono-code text-zinc-300">
                REDEEM MANA VOUCHER / ASTRAL TOKEN CODE:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code (e.g. MANA-100)"
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value)}
                  className="flex-1 bg-[#161521] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white uppercase"
                />
                <button
                  type="submit"
                  className="bg-[#00F0FF] text-black font-display text-xs px-4 py-2 rounded-lg border border-black"
                >
                  REDEEM
                </button>
              </div>
              {giftFeedback && (
                <div className="text-xs font-mono-code text-[#10B981] mt-1">
                  ✓ {giftFeedback}
                </div>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
