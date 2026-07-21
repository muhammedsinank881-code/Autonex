import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/home/Home";
import Shop from "./pages/Shop/Shop"
import ProductDetailsPage from "./pages/Shop/ProductDetailsPage";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/cart/CheckoutPage";
import AuthPage from "./pages/Login/AuthPage";
import Wishlist from "./pages/cart/Wishlist";
import MyGaragePage from "./pages/garage/MyGaragePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop />
          }
        />
        <Route
          path="/category/tires-wheels"
          element={
            <Shop pageTitle="Tires & Wheels" defaultCategory="Tires & Wheels" />
          }
        />
        <Route
          path="/category/headlights-lighting"
          element={
            <Shop
              pageTitle="Headlights & Lighting"
              defaultCategory="Headlights & Lighting"
            />
          }
        />
        <Route path="/product/:sku" element={<ProductDetailsPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/cart/checkout" element={<CheckoutPage/>}/> 
        <Route path="/account" element={<AuthPage/>}/>
        <Route path="/wish-list" element={<Wishlist/>}/>

        <Route path="/MyGaragePage" element={<MyGaragePage/>}/>


      </Route>
    </Routes>
  );
}

export default App;
