// UpdateProduct.js
import React, { useState, useEffect } from "react";

function UpdateProductPage({ productId, onUpdateProduct }) {
  
    const [updatedProductData, setUpdatedProductData] = useState({});

  // Fetch the current product data when the component mounts
  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:5678/products/products/${productId}`)
        .then((response) => response.json())
        .then((result) => {
          setUpdatedProductData(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [productId]);

  const handleUpdateProduct = () => {
    fetch(`http://localhost:5678/products/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductData),
    })
      .then((response) => response.json())
      .then((result) => {
        onUpdateProduct(result);
        console.log("Product updated:", result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* Input fields for updating the product */}
      {/* Add a submit button and call handleUpdateProduct on button click */}
    </div>
  );
}

export default UpdateProductPage;
