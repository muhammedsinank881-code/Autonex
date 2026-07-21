import React, { useState, useMemo } from 'react';
import FeatureHeader from './FeatureHeader';
import SidebarFilter from './SidebarFilter';
import ProductGridHeader from './ProductGridHeader';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

const sampleProducts = [
  { id: 1, title: "AKKON - For Dodge Grand Caravan Black Headlights Lamps", price: 129.99, brand: "AKKON", category: "Headlights & Lighting", inStock: true, onSale: false, rating: 4.0, reviews: 3, badge: null },
  { id: 2, title: "A-Premium 48 Row Aluminum Radiator 2011-2015 Jeep", price: 490.99, brand: "AutoShack", category: "Engine cooling system", inStock: true, onSale: true, rating: 4.2, reviews: 5, badge: { text: "15%", color: "bg-cyan-500" } },
  { id: 3, title: "Anzo USA - FORD F-150 03-07 FULL LED PROJECTOR", price: 117.25, brand: "Spyder", category: "Headlights & Lighting", inStock: true, onSale: true, rating: 5.0, reviews: 1, badge: { text: "HOT", color: "bg-blue-600" } },
  { id: 4, title: "TYC Left Headlight Assembly Compatible with 2016-2019 Pilot", price: 184.50, brand: "AKKON", category: "Headlights & Lighting", inStock: false, onSale: false, rating: 4.5, reviews: 12, badge: null },
  { id: 5, title: "Dorman 917-219 Engine Variable Valve Timing Solenoid", price: 42.99, brand: "AutoShack", category: "Engine", inStock: true, onSale: true, rating: 3.8, reviews: 45, badge: { text: "SALE", color: "bg-green-600" } },
  { id: 6, title: "Bosch ICON 26A ClearMax 365 Wiper Blade - 26\"", price: 26.98, brand: "Goodyear", category: "Car Accessories", inStock: true, onSale: false, rating: 4.7, reviews: 189, badge: null },
  { id: 7, title: "Denso 471-1008 New Compressor with Clutch", price: 215.00, brand: "AutoShack", category: "Air Condition", inStock: true, onSale: false, rating: 4.4, reviews: 8, badge: null },
  { id: 8, title: "Brembo P85085N Rear Ceramic Brake Pad Set", price: 55.20, brand: "AutoShack", category: "Brakes", inStock: true, onSale: true, rating: 4.9, reviews: 22, badge: { text: "NEW", color: "bg-purple-600" } },
  { id: 9, title: "Mobil 1 Advanced Full Synthetic Motor Oil 5W-30, 5 Qt", price: 28.97, brand: "Castrol", category: "Engine oil", inStock: true, onSale: false, rating: 4.8, reviews: 1530, badge: null },
  { id: 10, title: "NGK 6619 Iridium IX Spark Plug LFR6AIX-11 - 4 PCS", price: 34.16, brand: "AutoShack", category: "Engine", inStock: true, onSale: false, rating: 4.6, reviews: 67, badge: null },
  { id: 11, title: "K&N High-Flow Engine Air Filter for Toyota Camry", price: 49.99, brand: "AutoShack", category: "Filters", inStock: true, onSale: false, rating: 4.8, reviews: 210, badge: null },
  { id: 12, title: "Philips X-tremeVision Pro150 H11 Headlight Bulbs", price: 39.99, brand: "AKKON", category: "Headlights & Lighting", inStock: true, onSale: true, rating: 4.5, reviews: 88, badge: { text: "HOT", color: "bg-blue-600" } },
  { id: 13, title: "WeatherTech All-Weather Floor Mats Front & Rear", price: 179.95, brand: "Goodyear", category: "Car Accessories", inStock: true, onSale: false, rating: 4.9, reviews: 305, badge: null },
  { id: 14, title: "ACDelco Professional AGM Automotive Battery", price: 239.99, brand: "AutoShack", category: "Oils and fluids", inStock: false, onSale: true, rating: 4.6, reviews: 54, badge: { text: "NEW", color: "bg-purple-600" } },
  { id: 15, title: "Rain-X Latitude Water Repellency Wiper Blade 24\"", price: 18.99, brand: "Goodyear", category: "Car Accessories", inStock: true, onSale: false, rating: 4.7, reviews: 980, badge: null },
  { id: 16, title: "Power Stop Front & Rear Brake Kit with Rotors", price: 312.50, brand: "AutoShack", category: "Brakes", inStock: true, onSale: true, rating: 4.8, reviews: 77, badge: { text: "10%", color: "bg-cyan-500" } },
  { id: 17, title: "Castrol EDGE Full Synthetic Motor Oil 0W-20", price: 31.49, brand: "Castrol", category: "Engine oil", inStock: true, onSale: false, rating: 4.9, reviews: 1240, badge: null },
  { id: 18, title: "FRAM Extra Guard Engine Oil Filter PH7317", price: 7.49, brand: "Castrol", category: "Filters", inStock: true, onSale: false, rating: 4.7, reviews: 860, badge: null },
  { id: 19, title: "Optima RedTop High Performance Starting Battery", price: 279.99, brand: "AutoShack", category: "Oils and fluids", inStock: true, onSale: true, rating: 4.4, reviews: 145, badge: { text: "SALE", color: "bg-green-600" } },
  { id: 20, title: "MagnaFlow Stainless Steel Performance Exhaust System", price: 699.00, brand: "Spyder", category: "Body", inStock: true, onSale: false, rating: 4.8, reviews: 39, badge: null },
  { id: 21, title: "Gates Micro-V Serpentine Drive Belt", price: 29.95, brand: "Goodyear", category: "Engine", inStock: true, onSale: false, rating: 4.6, reviews: 198, badge: null },
  { id: 22, title: "Bilstein B6 Performance Front Shock Absorber", price: 119.99, brand: "Yokohama", category: "Steering", inStock: true, onSale: true, rating: 4.9, reviews: 61, badge: { text: "HOT", color: "bg-blue-600" } },
  { id: 23, title: "Mishimoto Performance Aluminum Radiator", price: 285.99, brand: "AutoShack", category: "Engine cooling system", inStock: true, onSale: false, rating: 4.7, reviews: 27, badge: null },
  { id: 24, title: "DEPO Black Housing LED Tail Lights for Honda Civic", price: 249.99, brand: "Spyder", category: "Headlights & Lighting", inStock: true, onSale: true, rating: 4.5, reviews: 15, badge: { text: "NEW", color: "bg-purple-600" } },
  { id: 25, title: "Valeo Premium Clutch Kit for Volkswagen Golf", price: 192.99, brand: "Yokohama", category: "Gearbox", inStock: false, onSale: false, rating: 4.4, reviews: 42, badge: null },
  { id: 26, title: "Moog Front Lower Control Arm with Ball Joint", price: 74.95, brand: "Yokohama", category: "Steering", inStock: true, onSale: false, rating: 4.6, reviews: 103, badge: null },
  { id: 27, title: "HELLA Twin Tone Electric Horn Kit", price: 35.99, brand: "Goodyear", category: "Car Accessories", inStock: true, onSale: true, rating: 4.8, reviews: 410, badge: { text: "SALE", color: "bg-green-600" } },
  { id: 28, title: "NOCO Boost Plus GB40 1000A Jump Starter", price: 99.95, brand: "Goodyear", category: "Tools & Equipment", inStock: true, onSale: false, rating: 4.9, reviews: 5400, badge: null },
  { id: 29, title: "Chemical Guys Car Wash Starter Kit", price: 69.99, brand: "Goodyear", category: "Tools & Equipment", inStock: true, onSale: false, rating: 4.7, reviews: 910, badge: null },
  { id: 30, title: "Armor All Complete Car Care Cleaning Kit", price: 44.95, brand: "Goodyear", category: "Tools & Equipment", inStock: true, onSale: true, rating: 4.5, reviews: 380, badge: { text: "15%", color: "bg-cyan-500" } }
];

export default function ProductListingPage() {
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 860 });
  const [statusFilters, setStatusFilters] = useState({ inStock: false, onSale: false });

  // Grid Header Controlled States
  const [sortOption, setSortOption] = useState('default');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Dynamic Filtering & Sorting Data Pipeline block
  const filteredProducts = useMemo(() => {
    let result = sampleProducts.filter((product) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      if (product.price < priceRange.min || product.price > priceRange.max) return false;
      if (statusFilters.inStock && !product.inStock) return false;
      if (statusFilters.onSale && !product.onSale) return false;
      return true;
    });

    // Handle sort options mapping selection values to logic mathematical operations
    if (sortOption === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategories, selectedBrands, priceRange, statusFilters, sortOption]);

  // 2. Adjust Pagination boundaries safely based on active subset
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const activePage = currentPage > totalPages ? Math.max(1, totalPages) : currentPage;

  // 3. Slice the current page window
  const indexOfLastProduct = activePage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  
  const currentProducts = filteredProducts
    .slice(indexOfFirstProduct, indexOfLastProduct)
    .map(p => ({
      ...p,
      price: `$${p.price.toFixed(2)}`
    }));

  // Utility resets when criteria filters mutate
  const resetToFirstPage = () => setCurrentPage(1);

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans antialiased">
      <div className="py-8 text-center border-b border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Shop</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureHeader />

        <div className="flex flex-col lg:flex-row gap-8 pb-24">
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
            
            {/* Fully connected and interactive Grid Header control deck */}
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
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6" 
                : "flex flex-col gap-4 mt-6"
              }>
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-lg mt-6">
                <p className="text-slate-400 text-sm">No products found matching those filter selections.</p>
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