import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProductTable from "../components/ProductTable";

import { getProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Breadcrumb />

      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Item catalog and current central stock.</p>
        </div>

        {user?.role === "admin" && (
          <button onClick={() => alert("Add Product clicked")} className="btn btn-primary">
            Add Product
          </button>
        )}
      </div>

      {loading ? (
        <div className="empty-state">Loading products…</div>
      ) : (
        <div className="card-flush" style={{ padding: 18 }}>
          <ProductTable products={products} />
        </div>
      )}
    </DashboardLayout>
  );
}

export default Products;
