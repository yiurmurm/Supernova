import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Send, 
  Compass, 
  Bike, 
  Feather, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const LocalDeliveryPage: React.FC = () => {
  const { 
    user, 
    updateSecretHideout, 
    orders, 
    triggerSoundEffect, 
    selectedCompanion 
  } = useApp();

  const [searchAddress, setSearchAddress] = useState(user.savedAddresses[0]?.address || '742 Evergreen Terrace, Sector 7');
  const [selectedTransport, setSelectedTransport] = useState<'scooter' | 'gentle_flight'>('scooter');
  const [courierProgress, setCourierProgress] = useState(38); // 0 to 100%
  const [isPlayingTracker, setIsPlayingTracker] = useState(true);
  const [pinNotice, setPinNotice] = useState<string | null>(null);

  // Animated dispatch tracker movement
  useEffect(() => {
    if (!isPlayingTracker) return;
    const interval = setInterval(() => {
      setCourierProgress(prev => {
        if (prev >= 98) return 15; // loop gently
        return prev + 1;
      });
    }, 450);
    return () => clearInterval(interval);
  }, [isPlayingTracker]);

  const handleGpsPin = () => {
    // Simulated GPS pin
    const randomLat = 37.7749 + (Math.random() * 0.02 - 0.01);
    const randomLng = -122.4194 + (Math.random() * 0.02 - 0.01);
    const autoAddress = 'Hideout Haven #' + Math.floor(100 + Math.random() * 900) + ', Sector 7';
    setSearchAddress(autoAddress);
    updateSecretHideout(autoAddress, randomLat, randomLng);
    setPinNotice('GPS Hideout Locked! Sector Coordinates Transmitted.');
    triggerSoundEffect('GPS HIDEOUT PINNED! 📍', undefined, undefined, '#4A90E2');
    setTimeout(() => setPinNotice(null), 3500);
  };

  const handleGoogleAutoFill = () => {
    const googleAddr = '450 Lexington Ave, Suite 2100, New York';
    setSearchAddress(googleAddr);
    updateSecretHideout(googleAddr, 40.7516, -73.9754);
    setPinNotice('Shipping address synced from Google Identity pass.');
    triggerSoundEffect('GOOGLE IDENTITY AUTO-FILLED! ✦', undefined, undefined, '#FFC800');
    setTimeout(() => setPinNotice(null), 3500);
  };

  // Map route points calculation
  // Start: (15%, 70%) -> Mid: (50%, 40%) -> End: (85%, 25%)
  const courierX = 15 + (courierProgress / 100) * 70;
  const courierY = 70 - Math.sin((courierProgress / 100) * Math.PI) * 45;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 space-y-8 halftone-bg">
      
      {/* Page Header Manga Panel */}
      <div className="rounded-3xl border-2 border-[#2F3E46] bg-white p-6 sm:p-8 shadow-[4px_4px_0px_#2F3E46]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3FC] px-3 py-1 text-xs font-stability font-semibold text-[#4A90E2] border border-[#4A90E2]/30 mb-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>SUPER EASY & LOCAL DISPATCH</span>
            </div>
            <h1 className="font-comfort text-3xl sm:text-4xl font-bold text-[#2F3E46]">
              Local Hideout Delivery Map
            </h1>
            <p className="font-clean text-sm text-[#5C676D] mt-1 max-w-2xl">
              Easy-on-the-eyes vector map navigation. Watch your courier on a friendly electric scooter or gentle gliding cape drop off potions right to your doorway!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#FFF6D6] px-4 py-2.5 rounded-2xl border-2 border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]">
              <span className="text-xl animate-mascot-float">{selectedCompanion.avatarEmoji}</span>
              <div>
                <span className="text-[10px] font-stability font-bold text-[#2F3E46] block">
                  {selectedCompanion.name}
                </span>
                <span className="text-xs font-handwritten text-[#4A90E2]">
                  Guiding your delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LOCATION SOURCE CONTROLS ================= */}
        <div className="mt-8 pt-6 border-t-2 border-[#F5F3E8] space-y-4">
          
          {/* Prominent Address Search Bar with Hand-drawn Map Pin Icon */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF6D6] border-2 border-[#2F3E46] text-[#2F3E46]">
                <MapPin className="h-5 w-5 text-[#FFC800] fill-current" />
              </div>
            </div>
            <input
              type="text"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              placeholder="Search or enter your secret hideout street address..."
              className="w-full bg-[#FDFBF0] border-2 border-[#2F3E46] rounded-2xl pl-16 pr-4 py-3.5 text-sm font-clean font-medium text-[#2F3E46] placeholder-[#5C676D]/60 shadow-[3px_3px_0px_#2F3E46] focus:outline-none focus:border-[#4A90E2]"
            />
          </div>

          {/* Buttons: Expressive GPS Pin & Google Auto-Fill */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Button 1: Expressive Font Pin My Hideout */}
            <button
              onClick={handleGpsPin}
              className="flex items-center gap-2 rounded-2xl bg-[#FFC800] px-5 py-3 font-expressive text-base text-[#2F3E46] border-2 border-[#2F3E46] shadow-[3px_3px_0px_#2F3E46] hover:bg-[#4A90E2] hover:text-white transition-all cursor-pointer"
            >
              <Navigation className="h-4 w-4" />
              <span>PIN MY HIDEOUT (Using GPS)</span>
            </button>

            {/* Button 2: Auto-Fill Shipping Via Google Account */}
            <button
              onClick={handleGoogleAutoFill}
              className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-stability text-xs font-bold text-[#2F3E46] border-2 border-[#2F3E46] shadow-[3px_3px_0px_#2F3E46] hover:bg-[#EBF3FC] transition-all cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-[#4A90E2]" />
              <span>AUTO-FILL SHIPPING (Via Google Account)</span>
            </button>

            {/* Courier Mode Toggle */}
            <div className="ml-auto flex items-center gap-1.5 bg-[#F5F3E8] p-1 rounded-2xl border-2 border-[#2F3E46]">
              <button
                onClick={() => {
                  setSelectedTransport('scooter');
                  triggerSoundEffect('SCOOTER PICKED! 🛵');
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-stability font-bold transition-all cursor-pointer ${
                  selectedTransport === 'scooter' ? 'bg-[#FFC800] text-[#2F3E46] shadow-sm' : 'text-[#5C676D]'
                }`}
              >
                <Bike className="h-3.5 w-3.5" />
                <span>Scooter</span>
              </button>
              <button
                onClick={() => {
                  setSelectedTransport('gentle_flight');
                  triggerSoundEffect('GENTLE GLIDE! 🪶');
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-stability font-bold transition-all cursor-pointer ${
                  selectedTransport === 'gentle_flight' ? 'bg-[#4A90E2] text-white shadow-sm' : 'text-[#5C676D]'
                }`}
              >
                <Feather className="h-3.5 w-3.5" />
                <span>Gentle Glider</span>
              </button>
            </div>

          </div>

          {pinNotice && (
            <div className="text-xs font-clean font-semibold text-[#4A90E2] bg-[#EBF3FC] p-3 rounded-xl border border-[#4A90E2]/30 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{pinNotice}</span>
            </div>
          )}

        </div>
      </div>

      {/* ================= INTERACTIVE MAP WIDGET ================= */}
      {/* Softened tiles with 'Parchment Gray' (#F5F3E8) and 'Softer Muted Blue' (#4A90E2) */}
      <div className="rounded-3xl border-3 border-[#2F3E46] bg-[#F5F3E8] p-4 sm:p-6 shadow-[5px_5px_0px_#2F3E46] relative overflow-hidden">
        
        {/* Soft Map Top Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-white/95 p-3 rounded-2xl border-2 border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46]">
          <div className="flex items-center gap-2 text-xs font-stability font-bold text-[#2F3E46]">
            <Compass className="h-4 w-4 text-[#4A90E2]" />
            <span>DISPATCH ROUTE: CITADEL APOTHECARY ➔ YOUR SECURE BASE</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-clean text-[#5C676D]">
            <span>ETA: <strong className="text-[#2F3E46]">14 Minutes</strong></span>
            <span>•</span>
            <span>Progress: <strong className="text-[#4A90E2] font-mono-code">{courierProgress}%</strong></span>
            <button
              onClick={() => setIsPlayingTracker(!isPlayingTracker)}
              className="text-[11px] font-stability font-bold text-[#2F3E46] bg-[#FFF6D6] px-2.5 py-1 rounded-lg border border-[#2F3E46] hover:bg-[#FFC800] transition-colors cursor-pointer"
            >
              {isPlayingTracker ? 'Pause Sim' : 'Resume Sim'}
            </button>
          </div>
        </div>

        {/* The Soft Comic Map Canvas Container */}
        <div className="relative aspect-[16/9] w-full min-h-[380px] rounded-2xl border-2 border-[#2F3E46] bg-[#F5F3E8] overflow-hidden select-none">
          
          {/* Subtle diffused dots texture on map */}
          <div className="pointer-events-none absolute inset-0 halftone-bg opacity-40" />

          {/* SVG Map Lines, Rivers, Softened Vector Roads */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            {/* Soft Muted Blue River (#4A90E2) */}
            <path
              d="M 0,220 C 180,240 320,180 500,200 C 680,220 850,260 1200,210"
              fill="none"
              stroke="#EBF3FC"
              strokeWidth="48"
            />
            <path
              d="M 0,220 C 180,240 320,180 500,200 C 680,220 850,260 1200,210"
              fill="none"
              stroke="#4A90E2"
              strokeOpacity="0.25"
              strokeWidth="38"
            />

            {/* Soft Vector Street Grid */}
            <line x1="80" y1="0" x2="80" y2="600" stroke="#2F3E46" strokeOpacity="0.08" strokeWidth="2" />
            <line x1="220" y1="0" x2="220" y2="600" stroke="#2F3E46" strokeOpacity="0.08" strokeWidth="2" />
            <line x1="420" y1="0" x2="420" y2="600" stroke="#2F3E46" strokeOpacity="0.08" strokeWidth="2" />
            <line x1="620" y1="0" x2="620" y2="600" stroke="#2F3E46" strokeOpacity="0.08" strokeWidth="2" />
            <line x1="820" y1="0" x2="820" y2="600" stroke="#2F3E46" strokeOpacity="0.08" strokeWidth="2" />

            <line x1="0" y1="100" x2="1200" y2="100" stroke="#2F3E46" strokeOpacity="0.08" strokeWidth="2" />
            <line x1="0" y1="280" x2="1200" y2="280" stroke="#2F3E46" strokeOpacity="0.08" strokeWidth="2" />
            <line x1="0" y1="420" x2="1200" y2="420" stroke="#2F3E46" strokeOpacity="0.08" strokeWidth="2" />

            {/* Courier Dispatch Path (Curved Dotted Blue Line) */}
            <path
              d="M 160,340 Q 550,110 980,130"
              fill="none"
              stroke="#4A90E2"
              strokeWidth="4"
              strokeDasharray="8 8"
            />
          </svg>

          {/* Point 1: Super Power Labs Apothecary Citadel (Origin) */}
          <div className="absolute left-[12%] top-[68%] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative rounded-2xl border-2 border-[#2F3E46] bg-white p-3 shadow-[3px_3px_0px_#2F3E46] text-center">
              <span className="text-xl">🏛️</span>
              <div className="font-stability text-xs font-bold text-[#2F3E46]">Central Labs</div>
              <div className="text-[10px] font-clean text-[#5C676D]">Apothecary Depot</div>
            </div>
          </div>

          {/* Landmark 1: The Old Clocktower Haven */}
          <div className="absolute left-[44%] top-[25%] -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:block">
            <div className="rounded-xl border border-[#2F3E46]/30 bg-white/80 px-2 py-1 text-center shadow-xs">
              <span className="text-sm">🕰️ Clocktower Haven</span>
            </div>
          </div>

          {/* Landmark 2: Tea Garden Sanctum */}
          <div className="absolute left-[70%] top-[60%] -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:block">
            <div className="rounded-xl border border-[#2F3E46]/30 bg-white/80 px-2 py-1 text-center shadow-xs">
              <span className="text-sm">☕ Tea Garden Sanctum</span>
            </div>
          </div>

          {/* Point 2: User's Secret Base Hideout (Destination) */}
          <div className="absolute left-[85%] top-[24%] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative rounded-2xl border-2 border-[#2F3E46] bg-[#FFC800] p-3 shadow-[3px_3px_0px_#2F3E46] text-center animate-bounce">
              <MapPin className="h-6 w-6 text-[#2F3E46] mx-auto fill-current" />
              <div className="font-expressive text-xs font-bold text-[#2F3E46]">Your Hideout</div>
              <div className="text-[10px] font-clean text-[#2F3E46]/80 truncate max-w-[110px]">
                {searchAddress.split(',')[0]}
              </div>
            </div>
          </div>

          {/* ================= REAL-TIME MOVING COURIER CHARACTER ================= */}
          <div
            className="absolute z-30 transition-all duration-300 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${courierX}%`,
              top: `${courierY}%`
            }}
          >
            <div className="flex flex-col items-center">
              {/* Courier Speech Bubble */}
              <div className="rounded-xl border-2 border-[#2F3E46] bg-white px-2.5 py-1 text-[11px] font-handwritten text-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] mb-1.5 whitespace-nowrap">
                {selectedTransport === 'scooter' ? '🛵 Beep beep! Hot tea & potions aboard!' : '🪶 Gliding smoothly over the river!'}
              </div>

              {/* Character Avatar on Scooter / Glider */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF6D6] border-2 border-[#2F3E46] shadow-[3px_3px_0px_#2F3E46] text-2xl">
                {selectedTransport === 'scooter' ? '🛵' : '🦸'}
                {/* Companion hitching a ride */}
                <span className="absolute -top-1.5 -right-1.5 text-sm animate-pulse">
                  {selectedCompanion.avatarEmoji}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Dispatch Controls Bar */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-clean text-[#5C676D]">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#4A90E2]" />
            <span>Gentle Courier Protocol: Speed-governed to 25mph for zero-shake potion safety.</span>
          </div>
          <div className="font-mono-code text-[11px] text-[#2F3E46]">
            GPS Coordinates: 37.7749° N, 122.4194° W • Sector 7
          </div>
        </div>

      </div>

    </div>
  );
};
