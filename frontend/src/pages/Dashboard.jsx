import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";

function Dashboard() {
  return (
    <DashboardLayout>
      <Breadcrumb />

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>
    </DashboardLayout>
  );
}

export default Dashboard;