import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import AllocationTable from "../components/AllocationTable";
import CreateAllocationModal from "../components/CreateAllocationModal";

import { getAllocations } from "../services/allocationService";

const STATUSES = ["ALL", "CONFIRMED", "IN_TRANSIT", "PARTIAL", "REJECTED"];

function Allocations() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      const res = await getAllocations();
      setAllocations(res.data.allocations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAllocations =
    filter === "ALL" ? allocations : allocations.filter((allocation) => allocation.status === filter);

  return (
    <DashboardLayout>
      <Breadcrumb />

      <div className="page-header">
        <div>
          <h1 className="page-title">Allocations</h1>
          <p className="page-subtitle">
            {allocations.length} allocation{allocations.length !== 1 ? "s" : ""} across your network.
          </p>
        </div>

        {user?.role === "admin" && (
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus size={14} /> Create Allocation
          </button>
        )}
      </div>

      <div className="tabs">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`tab${filter === status ? " active" : ""}`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="empty-state">Loading allocations…</div>
      ) : (
        <div className="card-flush" style={{ padding: 18 }}>
          <AllocationTable allocations={filteredAllocations} />
        </div>
      )}

      {showModal && (
        <CreateAllocationModal onClose={() => setShowModal(false)} onCreated={fetchAllocations} />
      )}
    </DashboardLayout>
  );
}

export default Allocations;
