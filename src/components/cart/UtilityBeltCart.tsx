import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export const UtilityBeltCart: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    discountAmount, 
    appliedCoupon, 
    applyCoupon, 
    updateQuantity, 
    removeFromCart, 
    utilityBeltCapacity, 
    isCartOpen, 
    setIsCartOpen, 
    setIsCheckoutOpen,
    setSelectedProduct,
    triggerSoundEffect 
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res.message);
    setCouponInput('');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    triggerSoundEffect('WARPING TO TELEPORT CHECKOUT! 🚀');
  };

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#0B0A10] h-full flex flex-col border-l-4 border-black shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-5 border-b-2 border-black bg-[#161521] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-xl text-white tracking-wider">
                UTILITY BELT LOADOUT
              </h3>
              <p className="text-[10px] font-mono-code text-zinc-400">
                TACTICAL GEAR CONTAINER // {cartCount} {cartCount === 1 ? 'SLOT' : 'SLOTS'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2A2938] text-zinc-400 hover:text-white hover:bg-[#2A2938]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic Capacity Percentage Meter */}
        <div className="bg-[#161521] px-5 py-3 border-b border-[#2A2938]">
          <div className="flex items-center justify-between text-xs font-mono-code mb-1.5">
            <span className="text-zinc-300 flex items-center gap-1">
              <Zap className="h-3 w-3 text-[#00F0FF]" />
              <span>UTILITY BELT CAPACITY:</span>
            </span>
            <span className={`font-bold ${utilityBeltCapacity > 85 ? 'text-[#FF0055]' : 'text-[#00F0FF]'}`}>
              {utilityBeltCapacity}% FULL
            </span>
          </div>
          <div className="h-2 w-full bg-[#0B0A10] rounded-full overflow-hidden border border-black">
            <div
              className={`h-full transition-all duration-300 ${
                utilityBeltCapacity > 85
                  ? 'bg-[#FF0055]'
                  : utilityBeltCapacity > 50
                  ? 'bg-[#F59E0B]'
                  : 'bg-[#00F0FF]'
              }`}
              style={{ width: `${utilityBeltCapacity}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-zinc-600 mb-3" />
              <div className="font-display text-xl text-white">
                YOUR UTILITY BELT IS EMPTY
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                No superhuman abilities or artifacts currently slotted into your active holster.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVariant || 'default'}`}
                className="relative rounded-xl border-2 border-black bg-[#161521] p-3 shadow-[3px_3px_0px_#000000] flex gap-3"
              >
                {/* Item Thumbnail */}
                <div 
                  onClick={() => setSelectedProduct(item.product)}
                  className="relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-black border border-black"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono-code text-[#00F0FF] uppercase">
                      {item.product.categoryLabel}
                    </div>
                    <h4 
                      onClick={() => setSelectedProduct(item.product)}
                      className="font-display text-base text-white hover:text-[#00F0FF] cursor-pointer tracking-wide truncate max-w-[190px]"
                    >
                      {item.product.name}
                    </h4>
                    {item.selectedVariant && (
                      <div className="text-[10px] font-mono-code text-zinc-400 truncate max-w-[190px]">
                        {item.selectedVariant}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#2A2938]">
                    {/* Stepper */}
                    <div className="flex items-center rounded border border-black bg-[#0B0A10]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono-code text-xs text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-mono-code text-sm font-bold text-[#F59E0B]">
                      ${item.product.price * item.quantity}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-zinc-500 hover:text-[#FF0055] p-1"
                      title="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code & Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t-2 border-black bg-[#161521] space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (HERO2026 / SUPERNOVA)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-[#0B0A10] border border-[#2A2938] rounded-lg px-3 py-1.5 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-[#00F0FF]"
                />
                <button
                  type="submit"
                  className="bg-[#2A2938] hover:bg-[#00F0FF] hover:text-black text-white font-mono-code text-xs px-3 py-1.5 rounded-lg border border-black transition-colors"
                >
                  APPLY
                </button>
              </div>
              {couponFeedback && (
                <div className="text-[10px] font-mono-code text-[#00F0FF]">
                  {couponFeedback}
                </div>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1 text-xs font-mono-code border-t border-[#2A2938] pt-2">
              <div className="flex justify-between text-zinc-400">
                <span>SUBTOTAL:</span>
                <span>${cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#10B981]">
                  <span>PROMO CODE [{appliedCoupon}]:</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>TELEPORT DISPATCH:</span>
                <span className="text-[#00F0FF]">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#2A2938]">
                <span>TOTAL:</span>
                <span className="text-[#F59E0B] font-mono-code text-lg">${finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00F0FF] py-3.5 font-display text-base text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#F59E0B] hover:shadow-[6px_6px_0px_#000000] transition-all"
            >
              <span>TELEPORT CHECKOUT</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
