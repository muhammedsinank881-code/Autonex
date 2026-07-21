import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/home/Home";
import Shop from "./pages/Shop/Shop"

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop/>}/>
      </Route>
    </Routes>
  );
}

export default App;
