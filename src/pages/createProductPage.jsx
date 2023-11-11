import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function CreateProductPage() {
  const [newProductData, setNewProductData] = useState({
    company_name: "",
    products: "",
    company_slogan: "",
    importer_exporter: "",
  });

  const handleAddProduct = () => {
    fetch("http://localhost:5678/products/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("New product added:", result);

        // Pass the new product data to the parent component
        setNewProductData({
          company_name: "",
          products: "",
          company_slogan: "",
          importer_exporter: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <nav className="create-navbar">
        <ul className="create-nav-list">
          <li className="create-nav-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products">Products</NavLink>
          </li>
        </ul>
      </nav>

      <div>
        <input
          type="text"
          placeholder="Company Name"
          value={newProductData.company_name}
          onChange={(e) =>
            setNewProductData({
              ...newProductData,
              company_name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Products"
          value={newProductData.products}
          onChange={(e) =>
            setNewProductData({ ...newProductData, products: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Company Slogan"
          value={newProductData.company_slogan}
          onChange={(e) =>
            setNewProductData({
              ...newProductData,
              company_slogan: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Importer/Exporter"
          value={newProductData.importer_exporter}
          onChange={(e) =>
            setNewProductData({
              ...newProductData,
              importer_exporter: e.target.value,
            })
          }
        />

        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </>
  );
}

export default CreateProductPage;
