import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ProductsPage({ setSelectedProduct }) {
  // State to store the list of products
  const [products, setProducts] = useState([]);

  // Function to fetch products from the server
  const handleGetProducts = () => {
    fetch("http://localhost:5678/products/products")
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetch products when the component mounts
  useEffect(() => {
    handleGetProducts();
  }, []);

  // Function to handle click on a product card
  const handleProductCardClick = (order_id) => {
    // Find the selected product based on order_id
    const selectedProduct = products.find(
      (product) => product.order_id === order_id
    );
    if (selectedProduct) {
      // Set the selected product in the parent component
      setSelectedProduct(selectedProduct);
      console.log("Selected Product Data", selectedProduct);
    }
  };

  return (
    <>
      {/* Navigation bar for creating a new product */}
      <div>
        <nav>
          <NavLink to="/products/create" className="nav-link">
            Create Product
          </NavLink>
        </nav>
      </div>

      {/* Page Header */}
      <h1 className="header">Vandelay Industries</h1>
      <h2>(Click on product to update)</h2>

      {/* Container for displaying products */}
      <div className="products-page-container">
        <div className="productsInfo">
          {/* Map through the list of products to create product cards */}
          {products.map((products, index) => {
            return (
              <NavLink
                key={index}
                to={`/products/update/${products.order_id}`}
                className="product-card-link"
              >
                {/* Product card click event */}
                <div
                  className="productsCard"
                  onClick={() => handleProductCardClick(products.order_id)}
                >
                  <span>{products.company_name}</span>
                  <span>Product: {products.products}</span>
                  <span>Our compay slogan: {products.company_slogan}</span>
                  <span>
                    Importer or Exporter: {products.importer_exporter}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
