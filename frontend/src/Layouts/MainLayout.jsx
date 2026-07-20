import { Outlet } from "react-router-dom";
import Navbar from "../components/layout.jsx/Navbar.jsx";
import Footer from "../components/layout.jsx/Footer.jsx";
import HeroSection from "../pages/home/HeroSection/HeroSection.jsx";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col ">
      <div className="sticky top-0 z-50 ">
        <Navbar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;