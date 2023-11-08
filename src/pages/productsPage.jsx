import { useEffect, useState } from "react";
import CreateProductPage from "./CreateProductPage";
import UpdateProductPage from "./updateProductPage";

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
        // Update your product list, for example:
        setProducts([...products, result]);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  // Function to update a product
  const handleUpdateProduct = (productId) => {
    fetch(`http://localhost:5678/products/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductData), // Replace with your updated product data
    })
      .then((response) => response.json())
      .then((result) => {
        setProducts(
          products.map((product) => {
            if (product.id === productId) {
              return result;
            } else {
              return product;
            }
          })
        );

        console.log("Product updated:", result);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  // Function to delete a product
  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:5678/products/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        setProducts(products.filter((product) => product.id !== products));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreateProductData = (newData) => {
    setNewProductData(newData);
  };

  const handleUpdateProductData = (updatedData) => {
    setUpdatedProductData(updatedData);
  }

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
      <h1 className="header">Vandelay Industries</h1>
      <button onClick={handleAddProduct}>Add Product</button>
      <div className="productsInfo">
        {products.map((products, index) => {
          return (
            <div
              key={index}
              className="productsCard"
              order-id={products.order_id}
            >
              <span>{products.company_name}</span>
              <span>Product: {products.products}</span>
              <span>Our compay slogan: {products.company_slogan}</span>
              <span>Importer or Exporter: {products.importer_exporter}</span>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => handleUpdateProduct(products.products)}>
          Update
        </button>
        <button onClick={() => handleDeleteProduct(products)}>Delete</button>
      </div>

      <CreateProductPage onAddProduct={handleAddProduct} />
      <UpdateProductPage onUpdateProduct={handleUpdateProductData} />
    </>
  );
}

export default ProductsPage;
