import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
function Products() {
  return (
    <DashboardLayout>
        <Breadcrumb />
        <h1 className="text-3xl font-bold">
            Products
        </h1>
    </DashboardLayout>
  );
}

export default Products;