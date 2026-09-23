import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  Zap, 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      
      <div className="relative w-full max-w-3xl rounded-3xl border-4 border-black bg-white p-6 sm:p-8 shadow-[10px_10px_0px_#000000] my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFE600] text-black border-3 border-black shadow-[3px_3px_0px_#000000]">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <div>
              <h3 className="font-display text-3xl text-black tracking-wide leading-none">
                TELEPORT DISPATCH PROTOCOL
              </h3>
              <p className="text-xs font-mono-code font-bold text-black/70 mt-1">
                AUTHORIZE DIMENSIONAL SHIPMENT TO SECRET COORDINATES
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-[#FAF6E8] text-black hover:bg-[#FF2A2A] hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-6">
          
          {/* Step 1: Delivery Mode Selection */}
          <div>
            <div className="text-xs font-mono-code font-bold text-black uppercase mb-3 flex items-center gap-1.5">
              <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black">STEP 1: SELECT TRANSPORT METHOD</span>
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
                  className={`p-3.5 text-left rounded-2xl border-3 border-black transition-all cursor-pointer ${
                    deliveryMode === m.id
                      ? 'bg-[#FFE600] shadow-[4px_4px_0px_#000000] -translate-y-0.5'
                      : 'bg-[#FAF6E8] hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-display text-base text-black">{m.title}</span>
                    <span className="text-[9px] font-mono-code font-bold bg-white px-1.5 py-0.5 rounded text-[#FF2A2A] border border-black">
                      {m.badge}
                    </span>
                  </div>
                  <div className="text-xs font-mono-code font-bold text-black">{m.time}</div>
                  <div className="text-[11px] text-black/80 font-medium mt-1 leading-tight">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Secret Hideout Destination Coordinates */}
          <div className="border-t-2 border-black pt-4">
            <div className="text-xs font-mono-code font-bold text-black uppercase mb-3 flex items-center justify-between">
              <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black">STEP 2: DESTINATION BASE COORDINATES</span>
              <span className="text-black/60 text-[10px]">GPS FREQUENCY 99.4</span>
            </div>

            <div className="space-y-2 font-mono-code font-bold">
              {user.savedAddresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border-2 border-black cursor-pointer transition-all ${
                    !isCustomMode && selectedAddress === addr.address
                      ? 'bg-[#FAF6E8] border-black shadow-[3px_3px_0px_#000000]'
                      : 'bg-white'
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
                      className="accent-[#FF2A2A]"
                    />
                    <div>
                      <div className="text-xs font-bold text-black flex items-center gap-2">
                        <span>{addr.name}</span>
                        {addr.isSecretHideout && (
                          <span className="text-[9px] bg-[#FF2A2A] text-white px-1.5 py-0.2 rounded border border-black">
                            SECURE HIDEOUT
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-black/70">{addr.address}</div>
                    </div>
                  </div>
                  <MapPin className="h-4 w-4 text-black" />
                </label>
              ))}

              {/* Custom Coordinate Entry */}
              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-mono-code font-bold text-black cursor-pointer mb-2">
                  <input
                    type="radio"
                    name="address"
                    checked={isCustomMode}
                    onChange={() => setIsCustomMode(true)}
                    className="accent-[#FF2A2A]"
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
                    className="w-full bg-[#FAF6E8] border-2 border-black rounded-xl px-3 py-2 text-xs text-black font-mono-code font-bold"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="border-t-2 border-black pt-4">
            <div className="text-xs font-mono-code font-bold text-black uppercase mb-3">
              <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black">STEP 3: SECURE PAYMENT GATEWAY</span>
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
                  className={`p-3 rounded-2xl border-2 border-black text-xs font-mono-code font-bold transition-all text-left cursor-pointer ${
                    paymentMethod === p.id
                      ? 'bg-[#FFE600] text-black shadow-[3px_3px_0px_#000000]'
                      : 'bg-[#FAF6E8] text-black/80 hover:bg-white'
                  }`}
                >
                  <div className="font-bold">{p.name}</div>
                  <div className="text-[10px] text-black/70 mt-0.5">{p.icon}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary & Final Submit */}
          <div className="rounded-2xl border-3 border-black bg-[#FAF6E8] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_#000000]">
            <div>
              <div className="text-[11px] font-mono-code font-bold text-black/70">
                {cart.length} Superpower Items · Free Dimensional Shipping
              </div>
              <div className="text-2xl font-mono-code font-black text-black">
                Total: <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black">${total}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-[#FFE600] px-8 py-3.5 font-display text-lg text-black border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FF2A2A] hover:text-white transition-all cursor-pointer"
            >
              <Lock className="h-5 w-5" />
              <span>AUTHORIZE & TELEPORT</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
