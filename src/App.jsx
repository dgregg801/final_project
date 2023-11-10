import { HomePage, ProductsPage, CreateProductPage, UpdateProductPage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import "./App.css";


export default function App() {

  const [selectedProduct, setSelectedProduct] = useState({});
  console.log('selected product on app page', selectedProduct);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage setSelectedProduct={setSelectedProduct} />}/>
        <Route path="/products/create" element={<CreateProductPage />}/>
        <Route path ="/products/update/:productId" element={<UpdateProductPage selectedProduct={selectedProduct} />}/>
      </Routes>
    </BrowserRouter>
  );
}


