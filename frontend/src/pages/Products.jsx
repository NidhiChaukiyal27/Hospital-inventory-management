import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProductTable from "../components/ProductTable";

import {
  getProducts,
} from "../services/productService";

function Products() {
  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const res =
          await getProducts();

        setProducts(
          res.data.products
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <DashboardLayout>

      <Breadcrumb />

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Products
        </h1>

        {user?.role === "admin" && (
          <button
            onClick={() =>
              alert("Add Product clicked")
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            Add Product
          </button>
        )}

      </div>

      {loading ? (
        <div className="text-xl">
          Loading...
        </div>
      ) : (
        <ProductTable
          products={products}
        />
      )}

    </DashboardLayout>
  );
}

export default Products;