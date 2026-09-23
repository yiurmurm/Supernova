import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';

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
    quizCardBorderStyle 
  } = useApp();

  const [isHovered, setIsHovered] = useState(false);
  const [whisperTip, setWhisperTip] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const friendlyPhrases = ['GENTLE POWER', 'COZY PICK', 'EASY TO WEAR', 'CALM FOCUS', 'WARM SIP'];
    const randomPhrase = friendlyPhrases[Math.floor(Math.random() * friendlyPhrases.length)];
    setWhisperTip(randomPhrase);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setWhisperTip(null);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, undefined, e);
  };

  const handleQuickWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id, e);
  };

  // Border style class based on Power Quiz result
  const borderClass = 
    quizCardBorderStyle === 'electric' ? 'border-[#4A90E2] ring-1 ring-[#4A90E2]/40' :
    quizCardBorderStyle === 'mystic' ? 'border-dashed border-[#FFC800]' :
    quizCardBorderStyle === 'tech' ? 'border-double border-4 border-[#2F3E46]' :
    'border-2 border-[#2F3E46]';

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative cursor-pointer rounded-2xl bg-white p-4 shadow-[3px_3px_0px_#2F3E46] transition-all duration-200 hover:-translate-y-1 hover:border-[#4A90E2] hover:shadow-[0_0_18px_rgba(74,144,226,0.22),4px_4px_0px_#2F3E46] ${borderClass} ${
        featured ? 'sm:col-span-2' : ''
      }`}
    >
      {/* Whimsical Floating Callout Badge */}
      {whisperTip && (
        <div className="pointer-events-none absolute -top-3 -right-2 z-30 transition-opacity">
          <div className="bg-[#FFF6D6] text-[#2F3E46] font-handwritten text-xs px-2.5 py-0.5 rounded-full border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] rotate-3 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-[#FFC800]" />
            <span>{whisperTip}</span>
          </div>
        </div>
      )}

      {/* Card Visual Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#FAF6E8] border border-[#2F3E46]/40 mb-3">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
        />

        {/* Subtle diffused halftone overlay */}
        <div className="pointer-events-none absolute inset-0 halftone-bg opacity-15" />

        {/* Rarity & Classification Tag */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
          <span className={`text-[10px] font-stability font-bold px-2 py-0.5 rounded-full border border-[#2F3E46] shadow-[1px_1px_0px_#2F3E46] ${
            product.rarity === 'Omega-Class' ? 'bg-[#FFC800] text-[#2F3E46]' :
            product.rarity === 'Legendary' ? 'bg-[#EBF3FC] text-[#4A90E2]' :
            product.rarity === 'Epic' ? 'bg-white text-[#2F3E46]' : 'bg-[#FDFBF0] text-[#5C676D]'
          }`}>
            {product.rarity}
          </span>
          {product.badge && (
            <span className="text-[9px] font-clean font-semibold bg-white/90 text-[#2F3E46] px-1.5 py-0.2 rounded-full border border-[#2F3E46]/30">
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick Wishlist Button */}
        <button
          onClick={handleQuickWishlist}
          className={`absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-[#2F3E46] transition-colors cursor-pointer ${
            isFavorited ? 'bg-[#FFC800] text-[#2F3E46]' : 'bg-white/90 text-[#5C676D] hover:bg-white hover:text-[#2F3E46]'
          }`}
          title={isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`h-3.5 w-3.5 ${isFavorited ? 'fill-current text-[#2F3E46]' : ''}`} />
        </button>
      </div>

      {/* Card Info */}
      <div className="space-y-1.5">
        
        {/* Category & Power Type */}
        <div className="flex items-center justify-between text-[11px] font-stability font-semibold text-[#5C676D]">
          <span className="uppercase text-[#4A90E2]">{product.categoryLabel}</span>
          <span className="bg-[#EBF3FC] px-2 py-0.5 rounded-full text-[10px] text-[#2F3E46]">{product.powerType}</span>
        </div>

        {/* Product Name (Cooper / Expressive Font) */}
        <h4 className="font-expressive text-xl text-[#2F3E46] group-hover:text-[#4A90E2] transition-colors leading-tight">
          {product.name}
        </h4>

        {/* Product Description (Calibri / Clean Font) */}
        <p className="font-clean text-xs text-[#5C676D] line-clamp-2 leading-relaxed h-8">
          {product.description || product.tagline}
        </p>

        {/* Gentle Output Gauge */}
        <div className="pt-1.5">
          <div className="flex items-center justify-between text-[10px] font-clean font-semibold text-[#5C676D] mb-1">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-[#FFC800] fill-current" />
              <span>Resonance Level</span>
            </span>
            <span className="text-[#4A90E2] font-mono-code font-bold">
              {product.powerLevel} PL
            </span>
          </div>
          <div className="h-2 w-full bg-[#F5F3E8] rounded-full overflow-hidden border border-[#2F3E46]/30">
            <div
              className="h-full bg-[#4A90E2] rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (product.powerLevel / 10000) * 100)}%` }}
            />
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 pt-2.5 border-t border-[#F5F3E8] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#FFF6D6] px-2.5 py-0.5 rounded-full border border-[#2F3E46] font-mono-code text-sm font-bold text-[#2F3E46]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] font-clean text-[#5C676D]/70 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedProduct(product)}
              className="text-xs font-clean font-semibold text-[#5C676D] hover:text-[#2F3E46] px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Inspect
            </button>
            <button
              onClick={handleQuickAdd}
              className="flex items-center gap-1 rounded-xl bg-[#FFC800] px-3 py-1.5 text-xs font-stability font-bold text-[#2F3E46] border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] hover:bg-[#4A90E2] hover:text-white transition-all cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>EQUIP</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
