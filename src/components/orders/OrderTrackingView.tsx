import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  RotateCw, 
  Truck
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
    { id: 2, label: "Coordinates Calibrated", desc: "Locking on secret receiver base" },
    { id: 3, label: "In Teleport Transit", desc: "Spatial wormhole active in Sub-Sector 7" },
    { id: 4, label: "Materialized at Base", desc: "Package deposited inside containment lockbox" }
  ];

  const handleReorder = (item: any) => {
    addToCart(item.product, 1, item.selectedVariant);
    triggerSoundEffect('ITEM RE-STOCKED TO BELT!');
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#FFFDF0] py-20 px-4 text-center halftone-bg">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_#000000] mb-4">
          <Truck className="h-10 w-10 text-[#FF2A2A]" />
        </div>
        <h2 className="font-display text-4xl text-black">NO ORDERS DETECTED!</h2>
        <p className="text-black/70 font-mono-code font-bold text-xs mt-2">You haven&apos;t authorized any superpower shipments yet.</p>
        <button
          onClick={() => setActiveTab('shop')}
          className="mt-6 rounded-2xl bg-[#FFE600] px-8 py-3.5 font-display text-base text-black border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FF2A2A] hover:text-white transition-all cursor-pointer"
        >
          EXPLORE POWERS NOW
        </button>
      </div>
    );
  }

  const currentStep = currentOrder.trackingStep || 2;

  return (
    <div className="min-h-screen bg-[#FFFDF0] py-12 px-4 sm:px-6 halftone-bg">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-black pb-6">
          <div>
            <div className="text-xs font-mono-code font-bold text-black mb-1 flex items-center gap-1.5 uppercase">
              <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000000]">
                TELEPORT COURIER RADAR · LOG ISSUE #42
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-black tracking-wide leading-tight">
              TELEPORT DISPATCH DOSSIER
            </h1>
          </div>

          <div className="flex items-center gap-2 font-mono-code font-bold text-xs text-black">
            <span>SELECT DOSSIER:</span>
            <select
              value={currentOrder.id}
              onChange={(e) => {
                const found = orders.find(o => o.id === e.target.value);
                if (found) setActiveTrackingOrder(found);
              }}
              className="bg-white border-2 border-black rounded-xl px-3 py-1.5 text-xs text-black font-mono-code font-bold focus:outline-none"
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
        <div className="rounded-3xl border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_#000000]">
          
          {/* Order Header Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-6 mb-8">
            <div>
              <div className="font-display text-3xl text-black">
                ORDER REF: <span className="text-[#FF2A2A]">{currentOrder.id}</span>
              </div>
              <div className="text-xs font-mono-code font-bold text-black/70 mt-1">
                AUTHORIZED ON {currentOrder.date} · MODE: {currentOrder.deliveryMode.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#FAF6E8] px-4 py-2 rounded-xl border-2 border-black text-right shadow-[2px_2px_0px_#000000]">
                <div className="text-[10px] font-mono-code font-bold text-black/60">DISPATCH PASSCODE</div>
                <div className="text-sm font-mono-code font-black text-[#FF2A2A]">
                  {currentOrder.teleportPassCode}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFE600] border-2 border-black text-black shadow-[2px_2px_0px_#000000]">
                <QrCode className="h-7 w-7 text-black" />
              </div>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {steps.map((st) => {
                const isPassed = st.id <= currentStep;
                const isCurrent = st.id === currentStep;
                return (
                  <div
                    key={st.id}
                    className={`rounded-2xl border-3 border-black p-4 transition-all ${
                      isCurrent
                        ? 'bg-[#FFE600] shadow-[4px_4px_0px_#000000] -translate-y-1'
                        : isPassed
                        ? 'bg-[#FAF6E8]'
                        : 'bg-white/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono-code font-bold text-[11px] text-black">
                        PHASE 0{st.id}
                      </span>
                      {isPassed ? (
                        <CheckCircle2 className="h-5 w-5 text-[#00D06C]" />
                      ) : (
                        <Clock className="h-5 w-5 text-black/40" />
                      )}
                    </div>
                    <div className="font-display text-lg text-black leading-tight">
                      {st.label}
                    </div>
                    <div className="text-xs text-black/75 font-medium mt-1 leading-relaxed">
                      {st.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination Coordinates Radar Screen */}
          <div className="rounded-2xl border-3 border-black bg-[#FAF6E8] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[3px_3px_0px_#000000]">
            <div className="space-y-1">
              <div className="text-xs font-mono-code font-bold text-[#FF2A2A] uppercase flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>RECEIVING BASE DESTINATION</span>
              </div>
              <div className="font-display text-2xl text-black">
                {currentOrder.destinationAddress}
              </div>
              <div className="text-xs font-mono-code font-bold text-black/70">
                LAT: {currentOrder.coordinates.lat} · LNG: {currentOrder.coordinates.lng} · ELEVATION: 420m (Subterranean)
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#FFE600] shadow-[2px_2px_0px_#000000]">
                <Zap className="h-6 w-6 text-black fill-current" />
              </div>
              <div className="text-right font-mono-code font-bold">
                <div className="text-[10px] text-black/60">ESTIMATED DROP</div>
                <div className="text-sm font-black text-[#FF2A2A]">T-MINUS 00:04:12</div>
              </div>
            </div>
          </div>

        </div>

        {/* Order Items Breakdown */}
        <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000000]">
          <h3 className="font-display text-2xl text-black tracking-wide mb-4">
            MANIFEST ITEMS IN SHIPMENT
          </h3>

          <div className="space-y-3 font-mono-code font-bold">
            {currentOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-black bg-[#FAF6E8]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-xl bg-black overflow-hidden border-2 border-black">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-display text-lg text-black leading-tight">
                      {item.product.name}
                    </div>
                    <div className="text-[11px] text-black/60">
                      Qty: {item.quantity} · {item.selectedVariant || 'Standard Issue'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono-code text-base font-black text-black">
                    ${item.product.price * item.quantity}
                  </span>
                  <button
                    onClick={() => handleReorder(item)}
                    className="flex items-center gap-1 text-xs bg-[#FFE600] px-3 py-1.5 rounded-xl border border-black text-black hover:bg-[#FF2A2A] hover:text-white transition-colors"
                  >
                    <RotateCw className="h-3 w-3" />
                    <span>Re-equip</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t-2 border-black flex justify-between font-mono-code font-bold text-sm text-black">
            <span>TOTAL TELEPORT MANIFEST VALUE:</span>
            <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black text-xl font-black">${currentOrder.total}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
