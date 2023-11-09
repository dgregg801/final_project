import React, { useState } from "react";


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
    <div>
      <input
        type="text"
        placeholder="Company Name"
        value={newProductData.company_name}
        onChange={(e) =>
          setNewProductData({ ...newProductData, company_name: e.target.value })
        }
      />
      {/* Define other input fields in a similar manner */}
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default CreateProductPage;
