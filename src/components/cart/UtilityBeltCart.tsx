import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FFFDF0] h-full flex flex-col border-l-4 border-black shadow-[ -8px_0px_0px_#000000]">
        
        {/* Drawer Header */}
        <div className="p-5 border-b-3 border-black bg-[#FFE600] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-black tracking-wide leading-none">
                HERO UTILITY BELT
              </h3>
              <p className="text-[10px] font-mono-code font-bold text-black/80 mt-1">
                EQUIPPED INVENTORY // {cartCount} {cartCount === 1 ? 'HOLSTER SLOT' : 'HOLSTER SLOTS'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-white text-black hover:bg-[#FF2A2A] hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Capacity Percentage Meter */}
        <div className="bg-[#FAF6E8] px-5 py-3 border-b-2 border-black">
          <div className="flex items-center justify-between text-xs font-mono-code font-bold mb-1.5">
            <span className="text-black flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-[#FF2A2A] fill-current" />
              <span>BELT WEIGHT CAPACITY:</span>
            </span>
            <span className={`font-black ${utilityBeltCapacity > 85 ? 'text-[#FF2A2A]' : 'text-black'}`}>
              {utilityBeltCapacity}% FULL
            </span>
          </div>
          <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-black">
            <div
              className={`h-full transition-all duration-300 ${
                utilityBeltCapacity > 85
                  ? 'bg-[#FF2A2A]'
                  : utilityBeltCapacity > 50
                  ? 'bg-[#FFE600]'
                  : 'bg-[#00D06C]'
              }`}
              style={{ width: `${utilityBeltCapacity}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white border-3 border-black shadow-[4px_4px_0px_#000000] mb-3">
                <ShoppingBag className="h-8 w-8 text-[#FF2A2A]" />
              </div>
              <div className="font-display text-2xl text-black">
                YOUR UTILITY BELT IS EMPTY!
              </div>
              <p className="text-xs font-mono-code font-bold text-black/70 mt-1 max-w-xs mx-auto">
                No superhuman abilities or artifacts currently slotted into your active belt holsters.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVariant || 'default'}`}
                className="relative rounded-2xl border-3 border-black bg-white p-3.5 shadow-[4px_4px_0px_#000000] flex gap-3"
              >
                {/* Item Thumbnail */}
                <div 
                  onClick={() => setSelectedProduct(item.product)}
                  className="relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-black border-2 border-black"
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
                    <div className="text-[10px] font-mono-code font-bold text-[#FF2A2A] uppercase">
                      {item.product.categoryLabel}
                    </div>
                    <h4 
                      onClick={() => setSelectedProduct(item.product)}
                      className="font-display text-lg text-black hover:text-[#FF2A2A] cursor-pointer tracking-wide truncate max-w-[190px] leading-tight"
                    >
                      {item.product.name}
                    </h4>
                    {item.selectedVariant && (
                      <div className="text-[10px] font-mono-code text-black/60 truncate max-w-[190px]">
                        {item.selectedVariant}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/20">
                    {/* Stepper */}
                    <div className="flex items-center rounded-lg border-2 border-black bg-[#FAF6E8]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-black hover:bg-black hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono-code text-xs font-bold text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-black hover:bg-black hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-mono-code text-base font-black text-black">
                      ${item.product.price * item.quantity}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-black/60 hover:text-[#FF2A2A] p-1"
                      title="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code & Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t-3 border-black bg-white space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2 font-mono-code font-bold">
                <input
                  type="text"
                  placeholder="Coupon Code (HERO2026 / COMIC10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-[#FAF6E8] border-2 border-black rounded-xl px-3 py-1.5 text-xs text-black uppercase placeholder-black/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#FFE600] hover:bg-black hover:text-white text-black font-display text-xs px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] transition-colors"
                >
                  APPLY
                </button>
              </div>
              {couponFeedback && (
                <div className="text-[11px] font-mono-code font-bold text-[#FF2A2A]">
                  {couponFeedback}
                </div>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1 text-xs font-mono-code font-bold border-t-2 border-black pt-2 text-black">
              <div className="flex justify-between text-black/70">
                <span>SUBTOTAL:</span>
                <span>${cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#0066FF]">
                  <span>DISCOUNT [{appliedCoupon}]:</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-black/70">
                <span>TELEPORT DISPATCH:</span>
                <span className="text-[#00D06C]">FREE SPECIAL ISSUE</span>
              </div>
              <div className="flex justify-between text-base font-black text-black pt-2 border-t-2 border-black">
                <span>TOTAL:</span>
                <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black font-mono-code text-xl font-black">${finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#FFE600] py-3.5 font-display text-lg text-black border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FF2A2A] hover:text-white hover:shadow-[6px_6px_0px_#000000] transition-all cursor-pointer"
            >
              <span>PROCEED TO TELEPORT CHECKOUT</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
