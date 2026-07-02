import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
function Reports() {
  return (
    <DashboardLayout>
        <Breadcrumb />
        <h1 className="text-3xl font-bold">
            Reports
        </h1>
    </DashboardLayout>
  );
}

export default Reports;