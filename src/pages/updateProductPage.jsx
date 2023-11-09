
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateProductPage({ onUpdateProduct, onDeleteProduct }) {
  const { productId } = useParams();

  const [updatedProductData, setUpdatedProductData] = useState({
    company_name: "",
    importer_exporter: "",
    products: "",
  });
  //const [companyName, setCompanyName] = useState("");
  //const [importerExporter, setImporterExporter] = useState("");
  //const [products, setProducts] = useState("");

  //input states
  //the PUT object that gets sent back for updating

  //your input states will go into here

  console.log("product id", productId);

  // Fetch the current product data when the component mounts
  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:5678/products/${productId}`, { method: "GET" })
        .then((response) => response.json())
        .then((result) => {
          setUpdatedProductData({
            company_name: result.company_name,
            importer_exporter: result.importer_exporter,
            products: result.products,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [productId]);

  const handleUpdateProduct = () => {
    const updateData = {
      company_name: updatedProductData.company_name,
      importer_exporter: updatedProductData.importer_exporter,
      products: updatedProductData.products,
    };

    fetch(`http://localhost:5678/products/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
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

  const handleDeleteProduct = () => {
    onDeleteProduct(productId);
  };

  const handleInputChange = (e, inputName) => {
    const value = e.target.value;
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [inputName]: value,
    }));
  };


  return (
    <div>
            <h2>Update Product</h2>
            <form>
                <div>
                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="company_name"
                        value={updatedProductData.company_name}
                        onChange={(e) => handleInputChange(e, "company_name")}
                    />
                </div>
                <div>
                    <label>Importer/Exporter:</label>
                    <input
                        type="text"
                        name="importer_exporter"
                        value={updatedProductData.importer_exporter}
                        onChange={(e) => handleInputChange(e, "importer_exporter")}
                    />
                </div>
                <div>
                    <label>Products:</label>
                    <input
                        type="text"
                        name="products"
                        value={updatedProductData.products}
                        onChange={(e) => handleInputChange(e, "products")}
                    />
                </div>
                <button onClick={handleUpdateProduct}>Update</button>
                <button onClick={handleDeleteProduct}>Delete</button>
            </form>
        </div>
  );
}

export default UpdateProductPage;
