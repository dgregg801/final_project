import { HomePage, ProductsPage, CreateProductPage, UpdateProductPage } from "./pages";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/products/create" element={<CreateProductPage/>}/>
        <Route path ="/products/update/:productId" element={UpdateProductPage}/>
      </Routes>
    </BrowserRouter>
  );
}


