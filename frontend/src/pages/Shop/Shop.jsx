import React, { useState, useMemo, useEffect } from 'react';
import FeatureHeader from '../Shop/FeatureHeader.jsx';
import SidebarFilter from '../Shop/SidebarFilter.jsx';
import ProductGridHeader from '../Shop/ProductGridHeader.jsx';
import ProductCard from '../Shop/ProductCard.jsx';
import Pagination from '../Shop/Pagination.jsx';
import { sampleProducts } from '../../product/products.js';
import { ShieldCheck, Car, Plus, Trash2, CheckCircle2, Sparkles, X } from 'lucide-react';

const MAKES = ["Ford", "Toyota", "Honda", "Chevrolet", "BMW", "Jeep", "Dodge", "Nissan", "Hyundai", "Subaru"];

export default function ProductListingPage({ pageTitle = "Shop", defaultCategory = null }) {
  // --- Garage State ---
  const [garage, setGarage] = useState(() => {
    const saved = localStorage.getItem("autonex_garage");
    return saved
      ? JSON.parse(saved)
      : [{ id: "1", year: "2021", make: "Ford", model: "F-150", isActive: true }];
  });

  const [showGarageModal, setShowGarageModal] = useState(false);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [garageFilterEnabled, setGarageFilterEnabled] = useState(true);

  // Sync Garage to localStorage
  useEffect(() => {
    localStorage.setItem("autonex_garage", JSON.stringify(garage));
  }, [garage]);

  const activeVehicle = useMemo(() => garage.find((v) => v.isActive), [garage]);

  // --- Garage Operations ---
  const handleAddVehicle = (e, keepFormOpen = false) => {
    if (e) e.preventDefault();
    if (!selectedMake || !selectedModel) return;

    const newVehicle = {
      id: Date.now().toString(),
      year: selectedYear,
      make: selectedMake,
      model: selectedModel,
      isActive: garage.length === 0,
    };

    setGarage((prev) => [newVehicle, ...prev]);
    setSelectedMake("");
    setSelectedModel("");

    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 3000);

    if (!keepFormOpen) {
      setIsAddingVehicle(false);
    }
  };

  const handleSetActiveVehicle = (id) => {
    setGarage(garage.map((v) => ({ ...v, isActive: v.id === id })));
  };

  const handleDeleteVehicle = (id, e) => {
    e.stopPropagation();
    const updated = garage.filter((v) => v.id !== id);
    if (updated.length > 0 && !updated.some((v) => v.isActive)) {
      updated[0].isActive = true;
    }
    setGarage(updated);
  };

  // --- Filter States ---
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 860 });
  const [statusFilters, setStatusFilters] = useState({ inStock: false, onSale: false });

  // Grid Header Controlled States
  const [sortOption, setSortOption] = useState('default');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic Filtering Pipeline
  const filteredProducts = useMemo(() => {
    let result = sampleProducts.filter((product) => {
      // Vehicle compatibility filter (if garage filter active)
      if (garageFilterEnabled && activeVehicle) {
        const matchesVehicle = product.compatibleVehicles?.some(
          (make) => make.toLowerCase() === activeVehicle.make.toLowerCase() || make.toLowerCase() === "universal"
        );
        const titleMatches = product.title.toLowerCase().includes(activeVehicle.make.toLowerCase());
        const isUniversalCategory = ["Tools & Equipment", "Car Accessories", "Engine oil"].includes(product.category);

        if (!matchesVehicle && !titleMatches && !isUniversalCategory) return false;
      }

      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) return false;
      } else if (defaultCategory) {
        if (product.category !== defaultCategory) return false;
      }

      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      if (product.price < priceRange.min || product.price > priceRange.max) return false;
      if (statusFilters.inStock && !product.inStock) return false;
      if (statusFilters.onSale && !product.onSale) return false;
      return true;
    });

    if (sortOption === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [defaultCategory, selectedCategories, selectedBrands, priceRange, statusFilters, sortOption, activeVehicle, garageFilterEnabled]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const activePage = currentPage > totalPages ? Math.max(1, totalPages) : currentPage;

  const indexOfLastProduct = activePage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  
  const currentProducts = filteredProducts
    .slice(indexOfFirstProduct, indexOfLastProduct)
    .map(p => ({
      ...p,
      price: typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price
    }));

  const resetToFirstPage = () => setCurrentPage(1);

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans antialiased overflow-x-hidden">
      {/* Page Title & Mobile Garage Toggle Header */}
      <div className="py-4 sm:py-8 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">{pageTitle}</h1>
          
          {/* My Garage Toggle Button */}
          <button
            onClick={() => setShowGarageModal(!showGarageModal)}
            className="w-full sm:w-auto bg-[#006bc0] hover:bg-[#005aa3] text-white font-semibold px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Car size={16} />
            <span>{showGarageModal ? "Close Garage" : "My Garage"}</span>
            {garage.length > 0 && (
              <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                {garage.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Expanded Garage Section */}
        {showGarageModal && (
          <div className="my-4 sm:my-6 bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-6 space-y-4 sm:space-y-6 shadow-sm transition-all">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#006bc0]" />
                <h2 className="text-xs sm:text-base font-bold text-slate-900">Manage Your Garage</h2>
              </div>
              <button
                onClick={() => setIsAddingVehicle(!isAddingVehicle)}
                className="text-xs bg-[#006bc0] hover:bg-[#005aa3] text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> {isAddingVehicle ? "Cancel" : "Add Vehicle"}
              </button>
            </div>

            {/* Add Vehicle Form */}
            {isAddingVehicle && (
              <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-xs">
                {showSuccessMsg && (
                  <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span>Vehicle added! Add another below or click 'Done'.</span>
                  </div>
                )}
                <form onSubmit={(e) => handleAddVehicle(e, true)} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Year</label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-[#006bc0] focus:outline-none"
                      >
                        {Array.from({ length: 30 }, (_, i) => 2026 - i).map((yr) => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Make</label>
                      <select
                        value={selectedMake}
                        onChange={(e) => setSelectedMake(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-[#006bc0] focus:outline-none"
                        required
                      >
                        <option value="">Select Make</option>
                        {MAKES.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Model</label>
                      <input
                        type="text"
                        placeholder="e.g. Civic, F-150"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-[#006bc0] focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingVehicle(false)}
                      className="px-3 py-1.5 text-xs text-slate-500 font-medium hover:bg-slate-100 rounded-lg"
                    >
                      Done
                    </button>
                    <button
                      type="submit"
                      className="bg-[#006bc0] hover:bg-[#005aa3] text-white font-semibold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1"
                    >
                      <Plus size={14} /> Save & Add Another
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Saved Vehicles Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {garage.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSetActiveVehicle(item.id)}
                  className={`cursor-pointer rounded-xl p-3 border transition-all flex items-center justify-between ${
                    item.isActive
                      ? "bg-blue-50/80 border-[#006bc0] ring-1 ring-[#006bc0]"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#006bc0] uppercase tracking-wider">{item.year}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.make} {item.model}</h4>
                    {item.isActive && (
                      <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-1 mt-0.5">
                        <CheckCircle2 size={12} /> Active Vehicle
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleDeleteVehicle(item.id, e)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <FeatureHeader />

        {/* Active Vehicle Fitment Notice */}
        {activeVehicle && (
          <div className="my-3 sm:my-4 p-2.5 sm:p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-slate-700">
              <Car size={16} className="text-[#006bc0] shrink-0" />
              <span>
                Filtering: <strong className="text-slate-900">{activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</strong>
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 shrink-0">
                <ShieldCheck size={12} /> Fitment Verified
              </span>
            </div>
            <button
              onClick={() => setGarageFilterEnabled(!garageFilterEnabled)}
              className="text-[#006bc0] hover:underline font-medium text-xs whitespace-nowrap self-end sm:self-auto"
            >
              {garageFilterEnabled ? "Show All Products" : "Filter By My Vehicle"}
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-16 sm:pb-24">
          <aside className="w-full lg:w-1/4 shrink-0">
            <SidebarFilter 
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              statusFilters={statusFilters}
              setStatusFilters={setStatusFilters}
              onFilterChange={resetToFirstPage}
            />
          </aside>

          <main className="w-full lg:w-3/4">
            <ProductGridHeader 
              totalResults={filteredProducts.length} 
              indexOfFirstProduct={indexOfFirstProduct}
              indexOfLastProduct={indexOfLastProduct}
              sortOption={sortOption}
              setSortOption={setSortOption}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={(limit) => { setItemsPerPage(limit); resetToFirstPage(); }}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            {currentProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6 mt-4 sm:mt-6" 
                : "flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6"
              }>
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20 border border-dashed border-slate-200 rounded-lg mt-6">
                <p className="text-slate-400 text-xs sm:text-sm">No products found matching those filter selections.</p>
              </div>
            )}

            <Pagination 
              currentPage={activePage} 
              totalPages={totalPages} 
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)} 
            />
          </main>
        </div>
      </div>
    </div>
  );
}