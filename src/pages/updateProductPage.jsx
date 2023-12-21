import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

function UpdateProductPage({ selectedProduct }) {
  const navigate = useNavigate();
  const { productId } = useParams();

  //const [updatedProductData,setUpdatedProductData] = useState({company_name:"", importer_exporter: "", products: ""});
  const [companyName, setCompanyName] = useState("");
  const [importerExporter, setImporterExporter] = useState("");
  const [products, setProducts] = useState("");

  const updateData = {
    company_name: companyName,
    importer_exporter: importerExporter,
    products: products,
  };

  useEffect(() => {
    setCompanyName(selectedProduct.company_name);
    setImporterExporter(selectedProduct.importer_exporter);
    setProducts(selectedProduct.products);
  }, []);

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    console.log(event);
    fetch(`http://localhost:5678/products/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((result) => {
        //onUpdateProduct(result);
        console.log("Product updated:", result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteProduct = () => {
    fetch(`http://localhost:5678/products/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Delete request failed");
        }
        return null;
      })
      .then(() => {
        // Redirect back to the ProductsPage after deletion
        navigate("/products");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="update-navbar">
        <nav>
          <NavLink to="/products" className="update-nav-link">
            Products Page
          </NavLink>
          <NavLink to="/products/create" className="update-nav-link">
            Create Product
          </NavLink>
        </nav>
      </div>

      <div className="update=form">
        <h2>Update Product</h2>
        <form onSubmit={handleUpdateProduct}>
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="company_name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label>Importer/Exporter:</label>
            <input
              type="text"
              name="importer_exporter"
              value={importerExporter}
              onChange={(e) => setImporterExporter(e.target.value)}
            />
          </div>
          <div>
            <label>Products:</label>
            <input
              type="text"
              name="products"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
            />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={handleDeleteProduct}>
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProductPage;
