import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { 
  X, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Gift, 
  Trash2, 
  Plus,
  Compass
} from 'lucide-react';

export const HeroProfileModal: React.FC = () => {
  const { 
    user, 
    setUser, 
    linkGoogleAccount, 
    unequipPower, 
    updateSecretHideout, 
    setPowerLevelSlider,
    isProfileOpen, 
    setIsProfileOpen, 
    triggerSoundEffect,
    selectedCompanion 
  } = useApp();

  const [activeTab, setActiveProfileTab] = useState<'pass' | 'equipped' | 'hideout' | 'giftcard'>('pass');
  
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
    triggerSoundEffect('IDENTITY PASS UPDATED! ✦', undefined, undefined, '#4A90E2');
  };

  const handleAddHideout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHideoutAddress) return;
    updateSecretHideout(newHideoutAddress, 37.7749, -122.4194);
    setNewHideoutAddress('');
    triggerSoundEffect('HIDEOUT NOTED! 📍', undefined, undefined, '#4A90E2');
  };

  const handleRedeemGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftCardCode) return;
    setUser(prev => ({
      ...prev,
      giftCardBalance: prev.giftCardBalance + 50
    }));
    setGiftFeedback('+$50 Gentle Balance credited to your lab pass!');
    setGiftCardCode('');
    triggerSoundEffect('BALANCE APPLIED! 🎁', undefined, undefined, '#FFC800');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F3E46]/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      
      {/* Identity Pass Card Container */}
      <div className="relative w-full max-w-3xl rounded-3xl border-3 border-[#2F3E46] bg-[#FDFBF0] p-6 sm:p-8 shadow-[6px_6px_0px_#2F3E46] my-auto">
        
        {/* Pass Top Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-[#2F3E46] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 rounded-2xl border-2 border-[#2F3E46] bg-white overflow-hidden shadow-[2px_2px_0px_#2F3E46]">
              <img
                src={user.avatar}
                alt={user.heroAlias}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {/* Cooper / Expressive font for User Alias */}
                <h3 className="font-expressive text-3xl text-[#2F3E46] tracking-wide leading-none">
                  {user.heroAlias}
                </h3>
                <span className="text-[10px] font-stability font-bold px-2 py-0.5 rounded-full border border-[#2F3E46] bg-[#EBF3FC] text-[#4A90E2]">
                  OFFICIAL PASS
                </span>
              </div>
              <p className="text-xs font-clean text-[#5C676D] mt-1">
                Power Level: <strong className="font-stability text-[#4A90E2]">{user.powerLevelRank}</strong> ({user.powerLevelScore}%)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#2F3E46] bg-white text-[#2F3E46] hover:bg-[#FFF6D6] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b-2 border-[#F5F3E8] pb-3 mb-6 text-xs font-stability font-bold">
          <button
            onClick={() => setActiveProfileTab('pass')}
            className={`px-3.5 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeTab === 'pass' ? 'bg-[#FFC800] text-[#2F3E46] border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]' : 'border-transparent text-[#5C676D] hover:bg-white'
            }`}
          >
            ★ IDENTITY PASS
          </button>
          <button
            onClick={() => setActiveProfileTab('equipped')}
            className={`px-3.5 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeTab === 'equipped' ? 'bg-[#FFC800] text-[#2F3E46] border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]' : 'border-transparent text-[#5C676D] hover:bg-white'
            }`}
          >
            EQUIPPED ({user.equippedPowers.length})
          </button>
          <button
            onClick={() => setActiveProfileTab('hideout')}
            className={`px-3.5 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeTab === 'hideout' ? 'bg-[#FFC800] text-[#2F3E46] border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]' : 'border-transparent text-[#5C676D] hover:bg-white'
            }`}
          >
            SAVED BASES ({user.savedAddresses.length})
          </button>
          <button
            onClick={() => setActiveProfileTab('giftcard')}
            className={`px-3.5 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeTab === 'giftcard' ? 'bg-[#FFC800] text-[#2F3E46] border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]' : 'border-transparent text-[#5C676D] hover:bg-white'
            }`}
          >
            LAB BALANCE (${user.giftCardBalance})
          </button>
        </div>

        {/* TAB 1: SIMPLIFIED IDENTITY PASS */}
        {activeTab === 'pass' && (
          <div className="space-y-6">
            
            {/* Identity Pass Card Graphic */}
            <div className="rounded-2xl border-2 border-[#2F3E46] bg-white p-5 shadow-[3px_3px_0px_#2F3E46] grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Photo & Hand-sketched Stamp */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#F5F3E8] rounded-xl border border-[#2F3E46]/30 text-center">
                <div className="relative h-20 w-20 rounded-2xl border-2 border-[#2F3E46] bg-white p-1 shadow-[2px_2px_0px_#2F3E46] mb-2">
                  <img src={user.avatar} alt="Hero portrait" className="h-full w-full rounded-xl object-cover" />
                </div>
                {/* Cooper Alias */}
                <div className="font-expressive text-lg text-[#2F3E46] leading-tight">
                  {user.heroAlias}
                </div>
                <div className="text-[11px] font-clean italic text-[#5C676D]">
                  &ldquo;{user.secretIdentity}&rdquo;
                </div>
                
                {/* Soft Manga Seal */}
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#EBF3FC] px-2.5 py-0.5 text-[10px] font-stability font-bold text-[#4A90E2] border border-[#4A90E2]/30">
                  <span>★ CERTIFIED VISITOR</span>
                </div>
              </div>

              {/* Form & Pass Info */}
              <div className="md:col-span-2 space-y-4">
                
                {/* INTERACTIVE POWER LEVEL SLIDER REQUIREMENT */}
                <div className="bg-[#FFF6D6] p-4 rounded-xl border-2 border-[#2F3E46]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-stability text-xs font-bold text-[#2F3E46] flex items-center gap-1.5">
                      <Sliders className="h-3.5 w-3.5 text-[#4A90E2]" />
                      <span>POWER LEVEL RESONANCE GAUGE</span>
                    </span>
                    <span className="font-expressive text-sm text-[#4A90E2] font-bold bg-white px-2.5 py-0.5 rounded-full border border-[#2F3E46]">
                      {user.powerLevelRank} ({user.powerLevelScore}%)
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={user.powerLevelScore}
                    onChange={(e) => {
                      setPowerLevelSlider(Number(e.target.value));
                      triggerSoundEffect('CLICK!', undefined, undefined, '#4A90E2');
                    }}
                    className="w-full h-3 cursor-pointer appearance-none rounded-full bg-white border border-[#2F3E46] accent-[#4A90E2]"
                  />

                  <div className="flex justify-between text-[10px] font-clean font-semibold text-[#5C676D] mt-1.5">
                    <span>Mundane</span>
                    <span>Trainee</span>
                    <span>Heroic Junior</span>
                    <span>Gentle Legend</span>
                    <span>Cosmic Friend</span>
                  </div>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSaveProfile} className="space-y-3 font-clean">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-stability font-semibold text-[#2F3E46] mb-1">
                        HERO ALIAS (COOPER DISPLAY)
                      </label>
                      <input
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        className="w-full bg-[#FAF6E8] border-2 border-[#2F3E46] rounded-xl px-3 py-2 text-xs font-expressive text-[#2F3E46]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-stability font-semibold text-[#2F3E46] mb-1">
                        SECRET CIVILIAN NAME
                      </label>
                      <input
                        type="text"
                        value={secretId}
                        onChange={(e) => setSecretId(e.target.value)}
                        className="w-full bg-[#FAF6E8] border-2 border-[#2F3E46] rounded-xl px-3 py-2 text-xs text-[#2F3E46]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#5C676D]">
                      Email: <strong className="text-[#2F3E46]">{user.email}</strong>
                    </span>
                    <button
                      type="submit"
                      className="rounded-xl bg-[#FFC800] px-4 py-2 text-xs font-stability font-bold text-[#2F3E46] border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] hover:bg-[#4A90E2] hover:text-white transition-all cursor-pointer"
                    >
                      UPDATE PASS
                    </button>
                  </div>
                </form>

              </div>
            </div>

            {/* GOOGLE ACCOUNT SYNC FRAMED BY SOFT MANGA-STYLE CIRCLE */}
            <div className="relative rounded-2xl border-2 border-[#2F3E46] bg-white p-5 shadow-[3px_3px_0px_#2F3E46] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Soft Manga-Style Circle Frame */}
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EBF3FC] border-2 border-[#4A90E2] p-1 shadow-[2px_2px_0px_#4A90E2]">
                  <span className="font-bold text-xl text-[#4A90E2]">G</span>
                  {/* Whimsical orbit dot */}
                  <span className="absolute -top-1 right-0 h-3 w-3 rounded-full bg-[#FFC800] border border-[#2F3E46]" />
                </div>
                <div>
                  <h4 className="font-stability font-bold text-base text-[#2F3E46]">
                    Google Identity Synchronization
                  </h4>
                  <p className="font-clean text-xs text-[#5C676D]">
                    {user.isGoogleLinked ? 'Connected: Secure one-tap login & synchronized hideout lockboxes.' : 'Link your Google account for safe cloud pass backups.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  linkGoogleAccount();
                  triggerSoundEffect('GOOGLE IDENTITY SYNCED! ✦', undefined, undefined, '#4A90E2');
                }}
                className="rounded-xl border-2 border-[#2F3E46] bg-white px-4 py-2.5 text-xs font-stability font-bold text-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] hover:bg-[#EBF3FC] transition-colors cursor-pointer flex items-center gap-2 shrink-0"
              >
                <ShieldCheck className="h-4 w-4 text-[#4A90E2]" />
                <span>{user.isGoogleLinked ? 'LINKED (SYNC REFRESH)' : 'LINK GOOGLE IDENTITY'}</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: EQUIPPED ARTIFACTS */}
        {activeTab === 'equipped' && (
          <div className="space-y-4">
            {equippedProducts.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border-2 border-[#2F3E46] font-clean text-sm text-[#5C676D]">
                No power artifacts currently equipped. Browse the catalog to load your pockets!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {equippedProducts.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-xl border-2 border-[#2F3E46] bg-white shadow-[2px_2px_0px_#2F3E46]">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover border border-[#2F3E46]" />
                      <div>
                        <div className="font-expressive text-sm text-[#2F3E46]">{p.name}</div>
                        <div className="text-[11px] font-clean text-[#5C676D]">{p.categoryLabel}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => unequipPower(p.id)}
                      className="text-xs font-clean text-[#5C676D] hover:text-red-500 p-1 cursor-pointer"
                      title="Unequip"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED BASES (CALIBRI / CLEAN DETAILS) */}
        {activeTab === 'hideout' && (
          <div className="space-y-4 font-clean">
            <div className="grid grid-cols-1 gap-3">
              {user.savedAddresses.map(addr => (
                <div key={addr.id} className="p-4 rounded-xl border-2 border-[#2F3E46] bg-white shadow-[2px_2px_0px_#2F3E46] flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#4A90E2]" />
                      <strong className="font-stability text-sm text-[#2F3E46]">{addr.name}</strong>
                      {addr.isSecretHideout && (
                        <span className="text-[10px] font-stability font-bold bg-[#FFF6D6] px-2 py-0.5 rounded-full border border-[#2F3E46]">
                          PRIMARY HIDEOUT
                        </span>
                      )}
                    </div>
                    {/* Address details in Calibri / Clean */}
                    <p className="font-clean text-xs text-[#5C676D] mt-1 pl-6">
                      {addr.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add new base form */}
            <form onSubmit={handleAddHideout} className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Enter new hideout street or postal coordinates..."
                value={newHideoutAddress}
                onChange={(e) => setNewHideoutAddress(e.target.value)}
                className="flex-1 bg-white border-2 border-[#2F3E46] rounded-xl px-3 py-2 text-xs text-[#2F3E46]"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#FFC800] px-4 py-2 font-stability text-xs font-bold text-[#2F3E46] border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>SAVE BASE</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: GIFT CARD */}
        {activeTab === 'giftcard' && (
          <div className="space-y-4 font-clean">
            <div className="p-5 rounded-2xl border-2 border-[#2F3E46] bg-[#FFF6D6] shadow-[2px_2px_0px_#2F3E46] flex items-center justify-between">
              <div>
                <div className="text-xs font-stability font-bold text-[#2F3E46]">CURRENT LAB BALANCE</div>
                <div className="font-expressive text-3xl text-[#2F3E46] mt-0.5">${user.giftCardBalance}.00</div>
              </div>
              <Gift className="h-8 w-8 text-[#4A90E2]" />
            </div>

            <form onSubmit={handleRedeemGift} className="space-y-2">
              <label className="block text-xs font-stability font-semibold text-[#2F3E46]">
                REDEEM VOUCHER OR FRIENDSHIP CODE
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. COZY-TEA-2026"
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value)}
                  className="flex-1 bg-white border-2 border-[#2F3E46] rounded-xl px-3 py-2 text-xs text-[#2F3E46]"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#4A90E2] px-4 py-2 font-stability text-xs font-bold text-white border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] cursor-pointer"
                >
                  REDEEM
                </button>
              </div>
              {giftFeedback && (
                <div className="text-xs font-clean text-[#4A90E2] bg-[#EBF3FC] p-2 rounded-lg border border-[#4A90E2]/30 mt-2">
                  {giftFeedback}
                </div>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
