import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, viewMode = 'grid' }) {
  // Safe fallbacks to prevent crashes if data properties are missing
  const rating = product?.rating ?? 0;
  const reviews = product?.reviews ?? 0;
  const title = product?.title ?? '';
  const price = product?.price ?? '$0.00';

  const productSku = product?.sku ?? 'unknown';
  const targetUrl = `/product/${productSku}`;

  // --- 1. LIST VIEW FORMAT (Exactly your preferred layout) ---
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl p-4 border border-slate-100 flex flex-row items-center gap-5 hover:shadow-md transition-all duration-200 group relative w-full">
        
        {/* Absolute Badging for List View */}
        {product?.badge && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className={`${product.badge.color || 'bg-[#0062bd]'} text-white font-bold text-[11px] px-2 py-0.5 rounded shadow-xs pointer-events-auto`}>
              {typeof product.badge === 'object' ? product.badge.text : product.badge}
            </span>
          </div>
        )}

        {/* Image Container asset - Restrained to row proportions */}
        <Link to={targetUrl} className="shrink-0 block">
          <div className="w-40 h-40 border border-slate-200/60 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0">
            <div className="w-11/12 h-11/12 bg-slate-50 rounded-md flex items-center justify-center text-slate-300 text-xs font-medium border border-slate-100">
              Product Asset Image
            </div>
          </div>
        </Link>

        {/* Meta Content details - Flex layout fills remaining width */}
        <div className="flex-1 flex flex-col justify-between py-1 h-40">
          
          <div>
            {/* Title layout heading */}
            <Link to={targetUrl} className="block hover:text-[#006bc0] transition-colors">
              <h4 className="text-sm font-normal text-slate-900 leading-snug mb-2">
                {title}
              </h4>
            </Link>

            {/* Ratings block layout */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={13} 
                    className={`${i < Math.floor(rating) ? 'fill-current text-[#f5b300]' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-900 ml-1">{rating.toFixed(2)}</span>
              <span className="text-xs text-slate-400 font-normal">({reviews})</span>
            </div>

            {/* Price layout blocks - Styled Emerald Green to match image */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-lg font-bold text-[#00a062] tracking-tight">{price}</span>
              {product?.oldPrice && (
                <span className="text-xs text-slate-400 line-through font-normal">{product.oldPrice}</span>
              )}
            </div>
          </div>

          {/* Layout actions with side-by-side heart button */}
          <div className="flex items-center gap-3 max-w-sm w-full">
            {/* Solid Corporate Blue Action Button */}
            <button 
              className="flex-1 text-center py-2 px-4 rounded-md text-xs font-semibold tracking-wide transition-colors bg-[#006bc0] hover:bg-[#005aa3] text-white"
            >
              {title.includes('Radiator Direct') ? 'Select options' : product?.isAlternateButton ? 'Buy product' : 'Add to cart'}
            </button>

            {/* Row-specific isolated heart button trigger */}
            <button className="text-slate-400 hover:text-red-500 transition-colors p-2 bg-slate-50 hover:bg-slate-100 rounded-md border border-slate-200 shrink-0">
              <Heart size={18} className="stroke-[2]" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- 2. GRID VIEW FORMAT (Your original layout completely untouched) ---
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col justify-between relative hover:shadow-md transition-all duration-200 group">
      
      {/* Absolute Badging / Top Actions Container */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        {product?.badge ? (
          <span className={`${product.badge.color || 'bg-[#0062bd]'} text-white font-bold text-[11px] px-2 py-0.5 rounded shadow-xs pointer-events-auto`}>
            {typeof product.badge === 'object' ? product.badge.text : product.badge}
          </span>
        ) : <div />}
        <button className="text-slate-400 hover:text-red-500 transition-colors pointer-events-auto p-1 bg-white/80 backdrop-blur-xs rounded-full">
          <Heart size={18} className="stroke-[2]" />
        </button>
      </div>

      {/* Image Container asset */}
      <Link to={targetUrl} className="w-full block">
        <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center overflow-hidden">
          <div className="w-11/12 h-11/12 bg-slate-50 rounded-md flex items-center justify-center text-slate-300 text-xs font-medium border border-slate-100">
            Product Asset Image
          </div>
        </div>
      </Link>

      {/* Meta Content details */}
      <div className="flex-1 flex flex-col justify-end">
        
        {/* Ratings block layout */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-amber-400 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={13} 
                className={`${i < Math.floor(rating) ? 'fill-current text-[#f5b300]' : 'text-slate-200'}`} 
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-900 ml-1">{rating.toFixed(2)}</span>
          <span className="text-xs text-slate-400 font-normal">({reviews})</span>
        </div>

        {/* Title layout heading */}
        <Link to={targetUrl} className="block hover:text-[#006bc0] transition-colors">
          <h4 className="text-sm font-normal text-slate-900 line-clamp-2 leading-snug mb-3 min-h-[40px]">
            {title}
          </h4>
        </Link>

        {/* Price layout blocks - Styled Emerald Green to match image */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-[#00a062] tracking-tight">{price}</span>
          {product?.oldPrice && (
            <span className="text-xs text-slate-400 line-through font-normal">{product.oldPrice}</span>
          )}
        </div>

        {/* Solid Corporate Blue Action Button */}
        <button 
          className="w-full text-center py-2 px-4 rounded-md text-xs font-semibold tracking-wide transition-colors bg-[#006bc0] hover:bg-[#005aa3] text-white"
        >
          {title.includes('Radiator Direct') ? 'Select options' : product?.isAlternateButton ? 'Buy product' : 'Add to cart'}
        </button>

      </div>
    </div>
  );
}