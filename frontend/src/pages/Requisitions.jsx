import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Breadcrumb from "../components/Breadcrumb";
import RequisitionTable from "../components/RequisitionTable";

import { getRequisitions } from "../services/requisitionService";

const STATUSES = ["ALL", "PENDING", "APPROVED", "REJECTED"];

function Requisitions() {
  const [requisitions, setRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchRequisitions();
  }, []);

  const fetchRequisitions = async () => {
    try {
      const res = await getRequisitions();
      setRequisitions(res.data.requisitions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequisitions =
    filter === "ALL" ? requisitions : requisitions.filter((req) => req.status === filter);

  return (
    <DashboardLayout>
      <Breadcrumb />

      <div className="page-header">
        <div>
          <h1 className="page-title">Requisitions</h1>
          <p className="page-subtitle">Hospital-raised requests, reviewed by central admin.</p>
        </div>

        {user?.role === "hospital_staff" && (
          <button onClick={() => alert("Create Requisition clicked")} className="btn btn-primary">
            Create Requisition
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
        <div className="empty-state">Loading requisitions…</div>
      ) : (
        <div className="card-flush" style={{ padding: 18 }}>
          <RequisitionTable requisitions={filteredRequisitions} />
        </div>
      )}
    </DashboardLayout>
  );
}

export default Requisitions;
