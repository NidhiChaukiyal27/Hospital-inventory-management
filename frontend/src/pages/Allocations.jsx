import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
function Allocations() {
  return (
    <DashboardLayout>
    <Breadcrumb />
      <h1 className="text-3xl font-bold">
        Allocations
      </h1>
    </DashboardLayout>
  );
}

export default Allocations;