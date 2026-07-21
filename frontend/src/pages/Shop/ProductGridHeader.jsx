import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

export default function ProductGridHeader({ 
  totalResults, 
  indexOfFirstProduct, 
  indexOfLastProduct,
  sortOption,
  setSortOption,
  itemsPerPage,
  setItemsPerPage,
  viewMode,
  setViewMode
}) {
  // Dynamically calculate accurate bounds matching the active pagination index window
  const currentMin = totalResults === 0 ? 0 : indexOfFirstProduct + 1;
  const currentMax = Math.min(indexOfLastProduct, totalResults);

  const sortOptions = [
    { value: "default", label: "Default sorting" },
    { value: "rating", label: "Sort by average rating" },
    { value: "price-low-high", label: "Sort by price: low to high" },
    { value: "price-high-low", label: "Sort by price: high to low" }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 mb-6 select-none">
      
      {/* Total items display text (Image 1 style matching your typography) */}
      <div className="text-[13px] text-slate-500 font-medium">
        Showing {currentMin}–{currentMax} of {totalResults} results
      </div>

      {/* Control Tools Container Frame (Image 2 styles and layout arrangement) */}
      <div className="flex items-center gap-2.5 self-end sm:self-auto">
        
        {/* Sort selector label wrapper */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 text-xs font-normal">Sort:</span>
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white text-slate-800 outline-none focus:border-blue-500 transition-colors cursor-pointer min-w-[155px]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sizing dropdown limiter component */}
        <select 
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white text-slate-800 outline-none focus:border-blue-500 transition-colors cursor-pointer"
        >
          <option value={12}>12 Items</option>
          <option value={24}>24 Items</option>
          <option value={30}>30 Items</option>
        </select>

        {/* Border grid-view utility toggler layout frames */}
        <div className="flex items-center gap-1 pl-1">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md border transition-all ${viewMode === 'grid' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'}`}
          >
            <LayoutGrid size={14} className="stroke-[2.5]" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md border transition-all ${viewMode === 'list' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'}`}
          >
            <List size={14} className="stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}