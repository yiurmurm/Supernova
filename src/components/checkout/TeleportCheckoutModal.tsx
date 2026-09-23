import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  Radio, 
  Zap, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  Compass,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const TeleportCheckoutModal: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    user, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    createOrder,
    setActiveTab,
    triggerSoundEffect 
  } = useApp();

  const [deliveryMode, setDeliveryMode] = useState<'teleport' | 'sonic' | 'subterranean'>('teleport');
  const [selectedAddress, setSelectedAddress] = useState(user.savedAddresses[0]?.address || 'Sector 7 Bunker, Neo-Citadel');
  const [customAddress, setCustomAddress] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'google_pay' | 'mana' | 'quantum_card'>('google_pay');

  if (!isCheckoutOpen) return null;

  const total = Math.max(0, cartSubtotal - discountAmount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAddress = isCustomMode ? customAddress : selectedAddress;
    
    createOrder(
      deliveryMode, 
      finalAddress || 'Sector 7 Bunker', 
      { lat: 37.7749, lng: -122.4194 }
    );

    setIsCheckoutOpen(false);
    setActiveTab('orders');
    triggerSoundEffect('ORDER TELEPORT DISPATCHED! 🚀');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      
      <div className="relative w-full max-w-3xl rounded-2xl border-4 border-black bg-[#0B0A10] p-6 sm:p-8 shadow-[10px_10px_0px_#000000,14px_14px_0px_#00F0FF] my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00F0FF] text-black border-2 border-black">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-white tracking-wide">
                TELEPORT DISPATCH PROTOCOL
              </h3>
              <p className="text-xs font-mono-code text-zinc-400">
                AUTHORIZE DIMENSIONAL SHIPMENT TO SECRET COORDINATES
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded border border-[#2A2938] text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-6">
          
          {/* Step 1: Delivery Mode Selection */}
          <div>
            <div className="text-xs font-mono-code text-[#00F0FF] uppercase mb-3 flex items-center gap-1.5">
              <span>STEP 1: SELECT TRANSPORT METHOD</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'teleport',
                  title: 'Teleport Drop',
                  time: 'Instantaneous (0.1s)',
                  desc: 'Quantum gateway directly to your hideout.',
                  badge: 'FASTEST'
                },
                {
                  id: 'sonic',
                  title: 'Sonic Air Drop',
                  time: '15 Minutes',
                  desc: 'High-altitude stealth drone drop parachute.',
                  badge: 'AERIAL'
                },
                {
                  id: 'subterranean',
                  title: 'Mole Carrier',
                  time: '45 Minutes',
                  desc: 'Underground pneumatic tube for stealth evasion.',
                  badge: 'COVERT'
                }
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => {
                    setDeliveryMode(m.id as any);
                    triggerSoundEffect('CLICK!');
                  }}
                  className={`p-3.5 text-left rounded-xl border-2 border-black transition-all ${
                    deliveryMode === m.id
                      ? 'bg-[#161521] border-[#00F0FF] shadow-[4px_4px_0px_#00F0FF]'
                      : 'bg-[#161521]/60 border-[#2A2938] hover:border-zinc-500'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-display text-sm text-white">{m.title}</span>
                    <span className="text-[9px] font-mono-code bg-[#0B0A10] px-1.5 py-0.5 rounded text-[#F59E0B] border border-black">
                      {m.badge}
                    </span>
                  </div>
                  <div className="text-xs font-mono-code text-[#00F0FF]">{m.time}</div>
                  <div className="text-[11px] text-zinc-400 mt-1 leading-tight">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Secret Hideout Destination Coordinates */}
          <div className="border-t border-[#2A2938] pt-4">
            <div className="text-xs font-mono-code text-[#00F0FF] uppercase mb-3 flex items-center justify-between">
              <span>STEP 2: DESTINATION BASE COORDINATES</span>
              <span className="text-zinc-500 text-[10px]">GPS FREQUENCY 99.4</span>
            </div>

            <div className="space-y-2">
              {user.savedAddresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 border-black cursor-pointer transition-all ${
                    !isCustomMode && selectedAddress === addr.address
                      ? 'bg-[#161521] border-[#F59E0B] shadow-[3px_3px_0px_#F59E0B]'
                      : 'bg-[#161521]/60 border-[#2A2938]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="address"
                      checked={!isCustomMode && selectedAddress === addr.address}
                      onChange={() => {
                        setIsCustomMode(false);
                        setSelectedAddress(addr.address);
                      }}
                      className="accent-[#F59E0B]"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{addr.name}</span>
                        {addr.isSecretHideout && (
                          <span className="text-[9px] font-mono-code bg-[#FF0055]/20 text-[#FF0055] px-1 rounded">
                            SECURE HIDEOUT
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono-code text-zinc-400">{addr.address}</div>
                    </div>
                  </div>
                  <MapPin className="h-4 w-4 text-zinc-500" />
                </label>
              ))}

              {/* Custom Coordinate Entry */}
              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-mono-code text-zinc-300 cursor-pointer mb-2">
                  <input
                    type="radio"
                    name="address"
                    checked={isCustomMode}
                    onChange={() => setIsCustomMode(true)}
                    className="accent-[#F59E0B]"
                  />
                  <span>Dispatch to New Sector Coordinates:</span>
                </label>
                {isCustomMode && (
                  <input
                    type="text"
                    required={isCustomMode}
                    placeholder="Enter coordinates or covert drop address..."
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    className="w-full bg-[#161521] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="border-t border-[#2A2938] pt-4">
            <div className="text-xs font-mono-code text-[#00F0FF] uppercase mb-3">
              STEP 3: SECURE PAYMENT GATEWAY
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'google_pay', name: 'Google Pay', icon: '★ Google Pay 1-Click' },
                { id: 'mana', name: 'Mana Balance', icon: `Mana Reserve ($${user.giftCardBalance})` },
                { id: 'quantum_card', name: 'Cosmic Card', icon: '•••• 4242 (Encrypted)' }
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPaymentMethod(p.id as any)}
                  className={`p-3 rounded-lg border-2 border-black text-xs font-mono-code transition-all text-left ${
                    paymentMethod === p.id
                      ? 'bg-[#161521] border-[#00F0FF] text-white shadow-[2px_2px_0px_#00F0FF]'
                      : 'bg-[#161521]/60 text-zinc-400 border-[#2A2938]'
                  }`}
                >
                  <div className="font-bold">{p.name}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{p.icon}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary & Final Submit */}
          <div className="rounded-xl border-2 border-black bg-[#161521] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono-code text-zinc-400">
                {cart.length} Superpower Items · Free Dimensional Shipping
              </div>
              <div className="text-xl font-mono-code font-bold text-[#F59E0B]">
                Total: ${total}
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#00F0FF] px-8 py-3.5 font-display text-base text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#F59E0B] transition-all"
            >
              <Lock className="h-4 w-4" />
              <span>AUTHORIZE & TELEPORT</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
