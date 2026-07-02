import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
function Hospitals() {
  return (
    <DashboardLayout>
        <Breadcrumb />
      <h1 className="text-3xl font-bold">
        Hospitals
      </h1>
    </DashboardLayout>
  );
}

export default Hospitals;