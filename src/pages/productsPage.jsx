import { useEffect, useState } from "react";
import CreateProductPage from "./CreateProductPage";
import UpdateProductPage from "./updateProductPage";
import { NavLink } from "react-router-dom";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [newProductData, setNewProductData] = useState({});
  const [updatedProductData, setUpdatedProductData] = useState({});

  console.log("product data", products);

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

  const handleAddProduct = () => {
    fetch("http://localhost:5678/products/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductData), // Replace with your product data
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("New product added:", result);
        
        setProducts([...products, result]);
      })
      .catch((error) => {
        
        console.error(error);
      });
  };

  
  const handleUpdateProduct = (order_id) => {
    fetch(`http://localhost:5678/products/products/${order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductData),
    })
      .then((response) => response.json())
      .then((result) => {
        setProducts(
          products.map((product) => {
            if (product.order_id === productId) {
              return result;
            } else {
              return product;
            }
          })
        );

        console.log("Product updated:", result);
      })
      .catch((error) => {
        
        console.error(error);
      });
  };

  
  const handleDeleteProduct = (order_id) => {
    if (productId) {
      fetch(`http://localhost:5678/products/products/${order_id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Delet request failed");
          }
          return null;
        })
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.order_id !== order_id)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCreateProductData = (newData) => {
    setNewProductData(newData);
  };

  const handleUpdateProductData = (updatedData) => {
    setUpdatedProductData(updatedData);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleProductCardClick = (order_id) => {
    setProductId(order_id);
  };

  return (
    <>
      <h1 className="header">Vandelay Industries</h1>
      <button onClick={handleAddProduct}>Add Product</button>
      <div className="productsInfo">
        {products.map((products, index) => {
          return (
            <NavLink
              key={index}
              to={`/products/update/${products.order_id}`}
              className="product-card-link"
            >
              <div
                className="productsCard"
                
                onClick={() => handleProductCardClick(products.order_id)}
              >
                <span>{products.company_name}</span>
                <span>Product: {products.products}</span>
                <span>Our compay slogan: {products.company_slogan}</span>
                <span>Importer or Exporter: {products.importer_exporter}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div>
      
        <button onClick={() => handleDeleteProduct(productId)}>Delete</button>
      </div>

       
    </>
  );
}

export default ProductsPage;
