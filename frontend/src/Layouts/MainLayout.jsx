import { Outlet } from "react-router-dom";
import Navbar from "../components/layout.jsx/Navbar.jsx";
import Footer from "../components/layout.jsx/Footer.jsx";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1 max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;