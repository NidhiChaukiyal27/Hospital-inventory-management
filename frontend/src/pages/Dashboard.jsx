import {
  useEffect,
  useState,
} from "react";
import {
  FaBoxes,
  FaHospital,
  FaTruck,
  FaClipboardList,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import KpiCard from "../components/KpiCard";

import {
  getCentralDashboard,
} from "../services/dashboardService";



function Dashboard() {
  const [dashboard,
    setDashboard] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const res =
          await getCentralDashboard();

        setDashboard(
          res.data.dashboard
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-xl">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Breadcrumb />

      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <KpiCard
            title="Total Products"
            value={dashboard.totalProducts}
            icon={<FaBoxes />}
            color="border-yellow-500"
          />

          <KpiCard
            title="Hospitals"
            value={dashboard.totalHospitals}
            icon={<FaHospital />}
            color="border-green-500"
          />

          <KpiCard
            title="Allocations"
            value={dashboard.totalAllocations}
            icon={<FaTruck />}
            color="border-blue-500"
          />

          <KpiCard
            title="Requisitions"
            value={dashboard.totalRequisitions}
            icon={<FaClipboardList />}
            color="border-red-500"
          />

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;