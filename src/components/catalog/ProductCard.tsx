import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Eye, Zap, Shield, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { 
    setSelectedProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    user,
    triggerSoundEffect 
  } = useApp();

  const [isHovered, setIsHovered] = useState(false);
  const [soundBadge, setSoundBadge] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Instant comic sound effect graphic on card hover
    const soundEffects = ['ZIP!', 'KA-BOOM!', 'POP!', 'SWOOSH!', 'BAM!'];
    const randomSound = soundEffects[Math.floor(Math.random() * soundEffects.length)];
    setSoundBadge(randomSound);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setSoundBadge(null);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, undefined, e);
  };

  const handleQuickWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id, e);
  };

  const accentBorderColor = user.mode === 'villain' ? '#FF0033' : '#00F0FF';

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative cursor-pointer rounded-xl border-3 border-black bg-[#161521] p-3 sm:p-4 shadow-[4px_4px_0px_#000000] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_#000000,8px_8px_0px_${accentBorderColor}] ${
        featured ? 'sm:col-span-2' : ''
      }`}
    >
      {/* Dynamic Manga Speed Line Overlay on Card Hover */}
      {isHovered && (
        <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden z-10 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent animate-pulse" />
      )}

      {/* Floating Sound Effect Onomatopoeia Badge */}
      {soundBadge && (
        <div className="pointer-events-none absolute -top-3 -right-3 z-30 animate-comic-pop">
          <div className="bg-[#FF0055] text-white font-display text-xs px-2.5 py-0.5 rounded border border-black shadow-[2px_2px_0px_#000000] rotate-12">
            {soundBadge}
          </div>
        </div>
      )}

      {/* Card Visual Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black border-2 border-black mb-3">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Halftone Dot Overlay */}
        <div className="pointer-events-none absolute inset-0 halftone-bg opacity-30" />

        {/* Rarity & Faction Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
          <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded border border-black shadow-sm ${
            product.rarity === 'Omega-Class' ? 'bg-[#FF0055] text-white' :
            product.rarity === 'Legendary' ? 'bg-[#F59E0B] text-black' :
            product.rarity === 'Epic' ? 'bg-[#8B5CF6] text-white' : 'bg-[#00F0FF] text-black'
          }`}>
            {product.rarity}
          </span>
          {product.badge && (
            <span className="text-[9px] font-display bg-black/85 text-[#00F0FF] px-1.5 py-0.5 rounded border border-zinc-700">
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick Wishlist Button */}
        <button
          onClick={handleQuickWishlist}
          className={`absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-black transition-colors ${
            isFavorited ? 'bg-[#FF0055] text-white shadow-sm' : 'bg-black/70 text-zinc-300 hover:text-[#FF0055]'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Dynamic Holographic Overlay on hover */}
        {isHovered && <div className="absolute inset-0 holo-card-overlay opacity-30" />}
      </div>

      {/* Card Info */}
      <div className="space-y-1">
        
        {/* Category & Power Type */}
        <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-400">
          <span className="uppercase text-[#00F0FF]">{product.categoryLabel}</span>
          <span>{product.powerType}</span>
        </div>

        {/* Product Name */}
        <h4 className="font-display text-xl sm:text-2xl text-white tracking-wide group-hover:text-[#00F0FF] transition-colors leading-tight">
          {product.name}
        </h4>

        {/* Tagline / Subtitle */}
        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed h-8">
          {product.tagline}
        </p>

        {/* Product Card "Power Level" Gauge on Card Hover */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-[10px] font-mono-code text-zinc-400 mb-1">
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-[#F59E0B]" />
              <span>POWER OUTPUT</span>
            </span>
            <span className="text-[#00F0FF] font-bold">
              {isHovered ? `OVERCHARGE // ${product.powerLevel}` : `${product.powerLevel} PL`}
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#0B0A10] rounded-full overflow-hidden border border-black">
            <div
              className={`h-full transition-all duration-500 ${
                isHovered
                  ? 'bg-gradient-to-r from-[#00F0FF] via-[#FF0055] to-[#F59E0B] w-full animate-pulse'
                  : 'bg-[#00F0FF]'
              }`}
              style={{ width: isHovered ? '100%' : `${(product.powerLevel / 10000) * 100}%` }}
            />
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 pt-3 border-t border-[#2A2938] flex items-center justify-between">
          <div>
            <div className="font-mono-code text-base sm:text-lg font-bold text-[#F59E0B] leading-none">
              ${product.price}
            </div>
            {product.originalPrice && (
              <div className="text-[10px] font-mono-code text-zinc-500 line-through">
                ${product.originalPrice}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProduct(product)}
              className="text-xs font-mono-code text-zinc-300 hover:text-white px-2.5 py-1.5 rounded bg-[#0B0A10] border border-zinc-700 hover:border-zinc-500 transition-colors"
            >
              Inspect
            </button>
            <button
              onClick={handleQuickAdd}
              className="flex items-center gap-1.5 rounded bg-[#00F0FF] px-3 py-1.5 text-xs font-display text-black border border-black shadow-[2px_2px_0px_#000000] hover:bg-[#F59E0B] transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
