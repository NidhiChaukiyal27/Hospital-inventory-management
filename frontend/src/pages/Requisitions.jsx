import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
function Requisitions() {
  return (
    <DashboardLayout>
      <Breadcrumb />
      <h1 className="text-3xl font-bold">
        Requisitions
      </h1>
    </DashboardLayout>
  );
}

export default Requisitions;