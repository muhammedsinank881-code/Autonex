import { Outlet } from "react-router-dom";
import Navbar from "../components/layout.jsx/Navbar.jsx";
import Footer from "../components/layout.jsx/Footer.jsx";
import HeroSection from "../pages/home/HeroSection/HeroSection.jsx";
import AllCategorySidebar from "../pages/home/AllCategoryPage.jsx";
import { useState } from "react";

const MainLayout = () => {
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  return (
    <div className="w-full min-h-screen flex flex-col ">
      <div className="sticky top-0 z-50 ">
        <Navbar onClick onOpenCategory={() => setCategoryDrawerOpen(true)} />
        {categoryDrawerOpen && (
          <>
            {/* Drawer */}
            <div className="w-[320px] h-[calc(100vh-var(--navbar-height))] flex flex-col bg-slate-50">
              <AllCategorySidebar
                onClose={() => setCategoryDrawerOpen(false)}
              />
            </div>
          </>
        )}
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
