import { useEffect, useState } from "react";
import { Package, Building2, Truck, ClipboardList } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import KpiCard from "../components/KpiCard";
import AllocationBarChart from "../components/AllocationBarChart";
import AllocationPieChart from "../components/AllocationPieChart";

import { getCentralDashboard } from "../services/dashboardService";
import RecentAllocations from "../components/RecentAllocations";

import { getAllocations } from "../services/allocationService";

function Dashboard() {
  const [allocations, setAllocations] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchAllocations();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getCentralDashboard();
      setDashboard(res.data.dashboard);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllocations = async () => {
    try {
      const res = await getAllocations();
      setAllocations(res.data.allocations.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="empty-state">Loading dashboard…</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Breadcrumb />

      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Central stock, allocations and requisitions at a glance.</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="kpi-grid">
          <KpiCard
            title="Total Products"
            value={dashboard.totalProducts}
            icon={<Package size={20} />}
            color="border-yellow-500"
          />

          <KpiCard
            title="Hospitals"
            value={dashboard.totalHospitals}
            icon={<Building2 size={20} />}
            color="border-green-500"
          />

          <KpiCard
            title="Allocations"
            value={dashboard.totalAllocations}
            icon={<Truck size={20} />}
            color="border-blue-500"
          />

          <KpiCard
            title="Requisitions"
            value={dashboard.totalRequisitions}
            icon={<ClipboardList size={20} />}
            color="border-red-500"
          />
        </div>

        <div className="chart-grid-2">
          <AllocationBarChart data={dashboard.allocationStatus} />
          <AllocationPieChart data={dashboard.allocationStatus} />
        </div>

        <RecentAllocations allocations={allocations} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
