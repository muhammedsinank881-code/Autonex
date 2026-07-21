import React from 'react';

export default function SidebarFilter({
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  statusFilters,
  setStatusFilters,
  onFilterChange
}) {
  const categories = [
    "Air Condition", "Bearings", "Body", "Brakes", "Car Accessories", 
    "Engine", "Engine cooling system", "Engine oil", "Filters", "Gearbox",
    "Headlights & Lighting", "Oils and fluids", "Repair Kits", "Steering", 
    "Tires & Wheels", "Tools & Equipment"
  ];

  const colors = [
    { name: "Black", class: "bg-black", count: 8 },
    { name: "Blue", class: "bg-blue-600", count: 5 },
    { name: "Brown", class: "bg-amber-700", count: 5 },
    { name: "Gray", class: "bg-slate-400", count: 3 },
    { name: "Green", class: "bg-emerald-500", count: 3 },
    { name: "Red", class: "bg-red-500", count: 5 },
    { name: "Yellow", class: "bg-yellow-400", count: 6 },
  ];

  const brands = [
    { name: "AKKON", count: 2 },
    { name: "AutoShack", count: 4 },
    { name: "Castrol", count: 2 },
    { name: "Goodyear", count: 6 },
    { name: "Spyder", count: 7 },
    { name: "Yokohama", count: 3 }
  ];

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      return updated;
    });
    onFilterChange?.();
  };

  const handleBrandToggle = (brandName) => {
    setSelectedBrands((prev) => {
      const updated = prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName];
      return updated;
    });
    onFilterChange?.();
  };

  const handleStatusToggle = (key) => {
    setStatusFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    onFilterChange?.();
  };

  // Min slider control logic
  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange.max - 10);
    setPriceRange(prev => ({ ...prev, min: value }));
    onFilterChange?.();
  };

  // Max slider control logic
  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange.min + 10);
    setPriceRange(prev => ({ ...prev, max: value }));
    onFilterChange?.();
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 860 });
    setStatusFilters({ inStock: false, onSale: false });
    onFilterChange?.();
  };

  // Calculates the colored highlight bar width and offset dynamically
  const minPercent = (priceRange.min / 860) * 100;
  const maxPercent = (priceRange.max / 860) * 100;

  return (
    <div className="space-y-7 pr-2 select-none">
      {/* Header with Clear Action */}
      <div className="flex items-center justify-between   mb-3.5">
        
        {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange.min > 0 || priceRange.max < 860 || statusFilters.inStock || statusFilters.onSale) && (
          <button 
            onClick={handleResetFilters}
            className="text-[11px] text-red-500 hover:text-red-600 font-semibold tracking-tight transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Product Categories */}
      <div>
        <h3 className="font-bold text-sm text-slate-900 mb-3.5 pb-2 ">Product Categories</h3>
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
          {categories.map((cat, idx) => (
            <label key={idx} className="flex items-center gap-3 text-xs text-slate-600 cursor-pointer hover:text-blue-600 transition-colors">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 w-3.5 h-3.5 cursor-pointer" 
              />
              <span className={`flex-1 ${selectedCategories.includes(cat) ? "text-blue-600 font-medium" : ""}`}>{cat}</span>
              {(cat === "Headlights & Lighting" || cat === "Tires & Wheels") && (
                <span className="text-slate-400 text-[10px] font-bold">+</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Dynamic Double Price Slider */}
      <div>
        <h3 className="font-bold text-sm text-slate-900 mb-3.5 pb-2 border-b border-slate-100">Filter by price</h3>
        <div className="px-0.5">
          
          {/* Custom Track Container */}
          <div className="relative w-full h-1 bg-slate-200 rounded-lg mb-5 mt-4">
            {/* Visual highlight range bar */}
            <div 
              className="absolute h-full bg-blue-600 rounded-lg"
              style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            ></div>

            {/* Hidden Input Layer for Minimum range */}
            <input 
              type="range" 
              min="0" 
              max="860" 
              value={priceRange.min}
              onChange={handleMinPriceChange}
              className="absolute w-full h-1 top-0 left-0 appearance-none bg-transparent pointer-events-none cursor-pointer accent-blue-600 z-20
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:pointer-events-auto"
            />

            {/* Hidden Input Layer for Maximum range */}
            <input 
              type="range" 
              min="0" 
              max="860" 
              value={priceRange.max}
              onChange={handleMaxPriceChange}
              className="absolute w-full h-1 top-0 left-0 appearance-none bg-transparent pointer-events-none cursor-pointer accent-blue-600 z-20
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:pointer-events-auto"
            />
          </div>

          {/* Numeric Entry Box Outputs */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-full text-center border border-slate-200 rounded py-1 text-xs bg-white text-slate-700 font-medium shadow-sm">
              ${priceRange.min}
            </div>
            <span className="text-slate-400 text-xs">-</span>
            <div className="w-full text-center border border-slate-200 rounded py-1 text-xs bg-white text-slate-700 font-medium shadow-sm">
              ${priceRange.max}
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            Price range: <strong className="text-slate-700 font-semibold">${priceRange.min} — ${priceRange.max}</strong>
          </div>
        </div>
      </div>

      {/* Filter by Color */}
      <div>
        <h3 className="font-bold text-sm text-slate-900 mb-3.5 pb-2 border-b border-slate-100">Filter by Color</h3>
        <div className="space-y-2.5">
          {colors.map((color, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs text-slate-600 cursor-pointer hover:text-blue-600 transition-colors">
              <div className="flex items-center gap-2.5">
                <span className={`w-3.5 h-3.5 rounded-full ${color.class} inline-block border border-black/5`}></span>
                <span>{color.name}</span>
              </div>
              <span className="text-[10px] text-slate-400">({color.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-bold text-sm text-slate-900 mb-3.5 pb-2 border-b border-slate-100">Brands</h3>
        <div className="space-y-2.5">
          {brands.map((brand, idx) => (
            <label key={idx} className="flex items-center justify-between text-xs text-slate-600 cursor-pointer hover:text-blue-600 transition-colors">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandToggle(brand.name)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 w-3.5 h-3.5 cursor-pointer" 
                />
                <span className={selectedBrands.includes(brand.name) ? "text-blue-600 font-medium" : ""}>{brand.name}</span>
              </div>
              <span className="text-[10px] text-slate-400">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Status */}
      <div>
        <h3 className="font-bold text-sm text-slate-900 mb-3.5 pb-2 border-b border-slate-100">Product Status</h3>
        <div className="space-y-2.5">
          <label className="flex items-center gap-3 text-xs text-slate-600 cursor-pointer hover:text-blue-600 transition-colors">
            <input 
              type="checkbox" 
              checked={statusFilters.inStock}
              onChange={() => handleStatusToggle('inStock')}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 w-3.5 h-3.5 cursor-pointer" 
            />
            <span className={statusFilters.inStock ? "text-blue-600 font-medium" : ""}>In Stock</span>
          </label>
          <label className="flex items-center gap-3 text-xs text-slate-600 cursor-pointer hover:text-blue-600 transition-colors">
            <input 
              type="checkbox" 
              checked={statusFilters.onSale}
              onChange={() => handleStatusToggle('onSale')}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 w-3.5 h-3.5 cursor-pointer" 
            />
            <span className={statusFilters.onSale ? "text-blue-600 font-medium" : ""}>On Sale</span>
          </label>
        </div>
      </div>
    </div>
  );
}