import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  RotateCw, 
  Truck, 
  ShieldCheck,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { 
    orders, 
    activeTrackingOrder, 
    setActiveTrackingOrder, 
    addToCart, 
    setActiveTab, 
    triggerSoundEffect 
  } = useApp();

  const currentOrder = activeTrackingOrder || orders[0];

  const steps = [
    { id: 1, label: "Vault Extraction", desc: "Superpower sealed in cryogenic container" },
    { id: 2, label: "Quantum Coordinates Calibrated", desc: "Locking on receiver coordinates" },
    { id: 3, label: "In Teleport Transit", desc: "Spatial wormhole active in Sub-Sector 7" },
    { id: 4, label: "Materialized at Base", desc: "Package deposited inside containment lockbox" }
  ];

  const handleReorder = (item: any) => {
    addToCart(item.product, 1, item.selectedVariant);
    triggerSoundEffect('ITEM RE-STOCKED TO BELT!');
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#0B0A10] py-20 px-4 text-center">
        <Truck className="mx-auto h-16 w-16 text-zinc-600 mb-4" />
        <h2 className="font-display text-3xl text-white">NO ORDERS DETECTED</h2>
        <p className="text-zinc-400 text-xs mt-2">You haven&apos;t authorized any teleport shipments yet.</p>
        <button
          onClick={() => setActiveTab('shop')}
          className="mt-6 rounded bg-[#00F0FF] px-6 py-2.5 font-display text-sm text-black border border-black shadow-[3px_3px_0px_#000000]"
        >
          EXPLORE POWERS NOW
        </button>
      </div>
    );
  }

  const currentStep = currentOrder.trackingStep || 2;

  return (
    <div className="min-h-screen bg-[#0B0A10] py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2938] pb-6">
          <div>
            <div className="text-xs font-mono-code text-[#00F0FF] mb-1 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              <span>QUANTUM CARRIER MONITORING CONSOLE</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
              ORDER TELEPORT DOSSIER
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs text-zinc-400">SELECT ORDER:</span>
            <select
              value={currentOrder.id}
              onChange={(e) => {
                const found = orders.find(o => o.id === e.target.value);
                if (found) setActiveTrackingOrder(found);
              }}
              className="bg-[#161521] border border-black rounded px-3 py-1.5 text-xs text-white font-mono-code"
            >
              {orders.map(o => (
                <option key={o.id} value={o.id}>
                  {o.id} ({o.date})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Delivery Tracker Box */}
        <div className="rounded-2xl border-4 border-black bg-[#161521] p-6 sm:p-8 shadow-[8px_8px_0px_#000000,12px_12px_0px_#00F0FF]">
          
          {/* Order Header Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A2938] pb-6 mb-8">
            <div>
              <div className="font-display text-2xl text-white">
                ORDER REF: <span className="text-[#00F0FF]">{currentOrder.id}</span>
              </div>
              <div className="text-xs font-mono-code text-zinc-400 mt-1">
                AUTHORIZED ON {currentOrder.date} · MODE: {currentOrder.deliveryMode.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#0B0A10] px-3.5 py-1.5 rounded-lg border border-black text-right">
                <div className="text-[10px] font-mono-code text-zinc-400">TELEPORT PASSCODE</div>
                <div className="text-xs font-mono-code font-bold text-[#F59E0B]">
                  {currentOrder.teleportPassCode}
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B0A10] border border-black text-white">
                <QrCode className="h-6 w-6 text-[#00F0FF]" />
              </div>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((st) => {
                const isPassed = st.id <= currentStep;
                const isCurrent = st.id === currentStep;
                return (
                  <div
                    key={st.id}
                    className={`rounded-xl border-2 border-black p-4 transition-all ${
                      isCurrent
                        ? 'bg-[#00F0FF]/15 border-[#00F0FF] shadow-[3px_3px_0px_#00F0FF]'
                        : isPassed
                        ? 'bg-[#0B0A10] border-zinc-700'
                        : 'bg-[#0B0A10]/40 border-[#2A2938] opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono-code text-[11px] text-zinc-400">
                        PHASE 0{st.id}
                      </span>
                      {isPassed ? (
                        <CheckCircle2 className="h-4 w-4 text-[#00F0FF]" />
                      ) : (
                        <Clock className="h-4 w-4 text-zinc-600" />
                      )}
                    </div>
                    <div className="font-display text-base text-white leading-tight">
                      {st.label}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {st.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination Coordinates Radar Screen */}
          <div className="rounded-xl border-2 border-black bg-[#0B0A10] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs font-mono-code text-[#F59E0B] uppercase flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>RECEIVING BASE DESTINATION</span>
              </div>
              <div className="font-display text-lg text-white">
                {currentOrder.destinationAddress}
              </div>
              <div className="text-xs font-mono-code text-zinc-400">
                LAT: {currentOrder.coordinates.lat} · LNG: {currentOrder.coordinates.lng} · ELEVATION: 420m (Subterranean)
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#00F0FF] bg-[#00F0FF]/10 animate-pulse">
                <Zap className="h-6 w-6 text-[#00F0FF]" />
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono-code text-zinc-500">ESTIMATED DROP</div>
                <div className="font-mono-code text-sm font-bold text-[#00F0FF]">T-MINUS 00:04:12</div>
              </div>
            </div>
          </div>

        </div>

        {/* Order Items Breakdown */}
        <div className="rounded-2xl border-4 border-black bg-[#161521] p-6 shadow-[6px_6px_0px_#000000]">
          <h3 className="font-display text-xl text-white tracking-wide mb-4">
            MANIFEST ITEMS IN SHIPMENT
          </h3>

          <div className="space-y-3">
            {currentOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl border border-[#2A2938] bg-[#0B0A10]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-black overflow-hidden border border-black">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-display text-base text-white">
                      {item.product.name}
                    </div>
                    <div className="text-[10px] font-mono-code text-zinc-400">
                      Qty: {item.quantity} · {item.selectedVariant || 'Standard Issue'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono-code text-sm font-bold text-[#F59E0B]">
                    ${item.product.price * item.quantity}
                  </span>
                  <button
                    onClick={() => handleReorder(item)}
                    className="flex items-center gap-1 text-xs font-mono-code text-[#00F0FF] hover:underline"
                  >
                    <RotateCw className="h-3 w-3" />
                    <span>Re-equip</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#2A2938] flex justify-between font-mono-code text-sm text-white">
            <span>TOTAL TELEPORT MANIFEST VALUE:</span>
            <span className="text-[#F59E0B] font-bold text-lg">${currentOrder.total}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
