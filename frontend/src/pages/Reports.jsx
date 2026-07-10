import { useEffect, useMemo, useState } from "react";
import { Truck, Package, Building2, PieChart, Trophy, AlertTriangle } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import KpiCard from "../components/KpiCard";
import AllocationBarChart from "../components/AllocationBarChart";
import AllocationPieChart from "../components/AllocationPieChart";

import { getAllocationReport } from "../services/reportService";

function Reports() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hospitalFilter, setHospitalFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await getAllocationReport();
      setAllocations(res.data.allocations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hospitals = useMemo(() => {
    return [...new Set(allocations.map((a) => a.hospital?.name))];
  }, [allocations]);

  const filteredAllocations = allocations.filter((allocation) => {
    const hospitalMatch = hospitalFilter === "ALL" || allocation.hospital?.name === hospitalFilter;
    const statusMatch = statusFilter === "ALL" || allocation.status === statusFilter;
    return hospitalMatch && statusMatch;
  });

  const totalQtySent = filteredAllocations.reduce((sum, allocation) => {
    return sum + allocation.items.reduce((s, item) => s + item.qty_sent, 0);
  }, 0);

  const totalQtyReceived = filteredAllocations.reduce((sum, allocation) => {
    return sum + allocation.items.reduce((s, item) => s + item.qty_received, 0);
  }, 0);

  const fulfillmentRate = totalQtySent === 0 ? 0 : ((totalQtyReceived / totalQtySent) * 100).toFixed(1);

  const rejectionRate =
    filteredAllocations.length === 0
      ? 0
      : ((filteredAllocations.filter((a) => a.status === "REJECTED").length / filteredAllocations.length) * 100).toFixed(1);

  const allocationStatus = filteredAllocations.reduce((acc, allocation) => {
    const status = allocation.status;
    const existing = acc.find((item) => item._id === status);

    if (existing) {
      existing.count++;
    } else {
      acc.push({ _id: status, count: 1 });
    }

    return acc;
  }, []);

  const hospitalStats = {};

  filteredAllocations.forEach((allocation) => {
    const hospital = allocation.hospital?.name;

    if (!hospitalStats[hospital]) {
      hospitalStats[hospital] = { allocations: 0, sent: 0, received: 0 };
    }

    hospitalStats[hospital].allocations++;

    allocation.items.forEach((item) => {
      hospitalStats[hospital].sent += item.qty_sent;
      hospitalStats[hospital].received += item.qty_received;
    });
  });

  const productStats = {};

  filteredAllocations.forEach((allocation) => {
    allocation.items.forEach((item) => {
      const product = item.product?.item_name;

      if (!productStats[product]) {
        productStats[product] = { sent: 0, received: 0 };
      }

      productStats[product].sent += item.qty_sent;
      productStats[product].received += item.qty_received;
    });
  });

  const mostActiveHospital = Object.keys(hospitalStats).reduce(
    (a, b) => (!a || hospitalStats[b].allocations > hospitalStats[a].allocations ? b : a),
    ""
  );

  const mostRequestedProduct = Object.keys(productStats).reduce(
    (a, b) => (!a || productStats[b].sent > productStats[a].sent ? b : a),
    ""
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="empty-state">Loading reports…</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Breadcrumb />

      <div className="page-header">
        <div>
          <h1 className="page-title">Reports &amp; Analytics</h1>
          <p className="page-subtitle">Filter allocation data and review network performance.</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: 14, marginBottom: 12 }}>Filters</h3>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ minWidth: 200 }}>
            <label style={{ fontSize: 11.5, fontWeight: 600, display: "block", marginBottom: 5 }}>Hospital</label>
            <select className="select" value={hospitalFilter} onChange={(e) => setHospitalFilter(e.target.value)}>
              <option value="ALL">All Hospitals</option>
              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>

          <div style={{ minWidth: 200 }}>
            <label style={{ fontSize: 11.5, fontWeight: 600, display: "block", marginBottom: 5 }}>Status</label>
            <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PARTIAL">Partial</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 18 }}>
        <KpiCard title="Allocations" value={filteredAllocations.length} icon={<Truck size={20} />} color="border-blue-500" />
        <KpiCard title="Qty Sent" value={totalQtySent} icon={<Package size={20} />} color="border-yellow-500" />
        <KpiCard title="Qty Received" value={totalQtyReceived} icon={<Building2 size={20} />} color="border-green-500" />
        <KpiCard title="Fulfillment" value={`${fulfillmentRate}%`} icon={<PieChart size={20} />} color="border-red-500" />
      </div>

      <div className="chart-grid-2" style={{ marginBottom: 18 }}>
        <AllocationBarChart data={allocationStatus} />
        <AllocationPieChart data={allocationStatus} />
      </div>

      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginBottom: 18 }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Trophy size={16} color="var(--yolk-deep)" />
            <h3 style={{ fontSize: 13.5 }}>Most Active Hospital</h3>
          </div>
          <p style={{ fontSize: 22, fontWeight: 600, fontFamily: "var(--font-display)" }}>{mostActiveHospital || "-"}</p>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Package size={16} color="var(--blue)" />
            <h3 style={{ fontSize: 13.5 }}>Most Requested Product</h3>
          </div>
          <p style={{ fontSize: 22, fontWeight: 600, fontFamily: "var(--font-display)" }}>{mostRequestedProduct || "-"}</p>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={16} color="var(--red)" />
            <h3 style={{ fontSize: 13.5 }}>Rejection Rate</h3>
          </div>
          <p style={{ fontSize: 22, fontWeight: 600, fontFamily: "var(--font-display)" }}>{rejectionRate}%</p>
        </div>
      </div>

      <div className="card-flush" style={{ padding: 18, marginBottom: 18 }}>
        <h3 style={{ fontSize: 15, marginBottom: 14 }}>Hospital Performance</h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Allocations</th>
                <th>Qty Sent</th>
                <th>Qty Received</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(hospitalStats).map(([hospital, data]) => (
                <tr key={hospital}>
                  <td style={{ fontWeight: 600 }}>{hospital}</td>
                  <td>{data.allocations}</td>
                  <td>{data.sent}</td>
                  <td>{data.received}</td>
                </tr>
              ))}
              {Object.keys(hospitalStats).length === 0 && (
                <tr>
                  <td colSpan={4} className="empty-state">
                    No data for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-flush" style={{ padding: 18 }}>
        <h3 style={{ fontSize: 15, marginBottom: 14 }}>Product Consumption</h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty Sent</th>
                <th>Qty Received</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(productStats).map(([product, data]) => (
                <tr key={product}>
                  <td style={{ fontWeight: 600 }}>{product}</td>
                  <td>{data.sent}</td>
                  <td>{data.received}</td>
                </tr>
              ))}
              {Object.keys(productStats).length === 0 && (
                <tr>
                  <td colSpan={3} className="empty-state">
                    No data for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Reports;
